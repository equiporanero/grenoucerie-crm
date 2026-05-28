"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BullMQDriver", {
    enumerable: true,
    get: function() {
        return BullMQDriver;
    }
});
const _common = require("@nestjs/common");
const _node = /*#__PURE__*/ _interop_require_wildcard(require("@sentry/node"));
const _bullmq = require("bullmq");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _queueretentionconstants = require("../constants/queue-retention.constants");
const _messagequeuepriorityconstant = require("../message-queue-priority.constant");
const _getjobkeyutil = require("../utils/get-job-key.util");
const _metricskeystype = require("../../metrics/types/metrics-keys.type");
const _applyworkspacesentrycontextfromjobdatautil = require("../../sentry/utils/apply-workspace-sentry-context-from-job-data.util");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const V4_LENGTH = 36;
let BullMQDriver = class BullMQDriver {
    onModuleInit() {
        this.metricsService.createObservableGauge({
            metricName: 'twenty_queue_jobs_waiting_total',
            options: {
                description: 'Current number of jobs waiting in queue'
            },
            callback: async ()=>{
                let totalWaiting = 0;
                for (const [queueName, queue] of Object.entries(this.queueMap)){
                    try {
                        const waitingCount = await queue.count();
                        totalWaiting += waitingCount;
                    } catch (error) {
                        this.logger.error(`Failed to collect waiting jobs metrics for queue ${queueName}`, error);
                    }
                }
                return totalWaiting;
            }
        });
    }
    register(queueName) {
        this.queueMap[queueName] = new _bullmq.Queue(queueName, this.options);
    }
    async onModuleDestroy() {
        const workers = Object.values(this.workerMap);
        const queues = Object.values(this.queueMap);
        await Promise.all([
            ...queues.map((q)=>q.close()),
            ...workers.map((w)=>w.close())
        ]);
    }
    work(queueName, handler, options) {
        const workerOptions = {
            ...this.options,
            ...(0, _utils.isDefined)(options?.concurrency) ? {
                concurrency: options.concurrency
            } : {},
            metrics: {
                maxDataPoints: _bullmq.MetricsTime.ONE_WEEK,
                collectInterval: 60000
            }
        };
        this.workerMap[queueName] = new _bullmq.Worker(queueName, async (job)=>_node.withIsolationScope(async ()=>{
                (0, _applyworkspacesentrycontextfromjobdatautil.applyWorkspaceSentryContextFromJobData)(job.data);
                // TODO: Correctly support for job.id
                const timeStart = performance.now();
                const workspaceId = job.data?.workspaceId;
                const workspaceSuffix = workspaceId ? ` [workspace=${workspaceId}]` : '';
                this.logger.log(`Processing job ${job.id} with name ${job.name} on queue ${queueName}${workspaceSuffix}`);
                await handler({
                    data: job.data,
                    id: job.id ?? '',
                    name: job.name
                });
                const timeEnd = performance.now();
                const executionTime = timeEnd - timeStart;
                this.logger.log(`Job ${job.id} with name ${job.name} processed on queue ${queueName} in ${executionTime.toFixed(2)}ms${workspaceSuffix}`);
            }), workerOptions);
        this.workerMap[queueName].on('completed', (job)=>{
            void this.metricsService.incrementCounterForEvent({
                key: _metricskeystype.MetricsKeys.JobCompleted,
                attributes: {
                    queue: queueName,
                    job_name: job?.name ?? ''
                },
                shouldStoreInCache: false
            });
        });
        this.workerMap[queueName].on('failed', (job, error)=>{
            if (!(0, _utils.isDefined)(job) || !(0, _utils.isDefined)(error)) {
                return;
            }
            void this.metricsService.incrementCounterForEvent({
                key: _metricskeystype.MetricsKeys.JobFailed,
                attributes: {
                    queue: queueName,
                    job_name: job.name,
                    error_type: error.name
                },
                shouldStoreInCache: false
            });
        });
    }
    async addCron({ queueName, jobName, data, options, jobId }) {
        if (!this.queueMap[queueName]) {
            throw new Error(`Queue ${queueName} is not registered, make sure you have added it as a queue provider`);
        }
        const queueOptions = {
            priority: options?.priority,
            repeat: options?.repeat,
            removeOnComplete: {
                age: _queueretentionconstants.QUEUE_RETENTION.completedMaxAge,
                count: _queueretentionconstants.QUEUE_RETENTION.completedMaxCount
            },
            removeOnFail: {
                age: _queueretentionconstants.QUEUE_RETENTION.failedMaxAge,
                count: _queueretentionconstants.QUEUE_RETENTION.failedMaxCount
            }
        };
        await this.queueMap[queueName].upsertJobScheduler((0, _getjobkeyutil.getJobKey)({
            jobName,
            jobId
        }), options?.repeat, {
            name: jobName,
            data,
            opts: queueOptions
        });
    }
    async removeCron({ queueName, jobName, jobId }) {
        await this.queueMap[queueName].removeJobScheduler((0, _getjobkeyutil.getJobKey)({
            jobName,
            jobId
        }));
    }
    async add(queueName, jobName, data, options) {
        if (!this.queueMap[queueName]) {
            throw new Error(`Queue ${queueName} is not registered, make sure you have added it as a queue provider`);
        }
        // This ensures only one waiting job can be queued for a specific option.id
        if (options?.id) {
            const waitingJobs = await this.queueMap[queueName].getJobs([
                'waiting'
            ]);
            const isJobAlreadyWaiting = waitingJobs.some((job)=>job.id?.slice(0, -(V4_LENGTH + 1)) === options.id);
            if (isJobAlreadyWaiting) {
                return;
            }
        }
        const queueOptions = {
            jobId: options?.id ? `${options.id}-${(0, _uuid.v4)()}` : undefined,
            priority: options?.priority ?? _messagequeuepriorityconstant.MESSAGE_QUEUE_PRIORITY[queueName],
            attempts: 1 + (options?.retryLimit || 0),
            removeOnComplete: {
                age: _queueretentionconstants.QUEUE_RETENTION.completedMaxAge,
                count: _queueretentionconstants.QUEUE_RETENTION.completedMaxCount
            },
            removeOnFail: {
                age: _queueretentionconstants.QUEUE_RETENTION.failedMaxAge,
                count: _queueretentionconstants.QUEUE_RETENTION.failedMaxCount
            },
            delay: options?.delay
        };
        await this.queueMap[queueName].add(jobName, data, queueOptions);
    }
    constructor(options, metricsService){
        this.options = options;
        this.metricsService = metricsService;
        this.logger = new _common.Logger(BullMQDriver.name);
        this.queueMap = {};
        this.workerMap = {};
    }
};

//# sourceMappingURL=bullmq.driver.js.map