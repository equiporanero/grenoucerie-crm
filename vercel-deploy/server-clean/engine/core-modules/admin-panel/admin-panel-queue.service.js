"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelQueueService", {
    enumerable: true,
    get: function() {
        return AdminPanelQueueService;
    }
});
const _common = require("@nestjs/common");
const _bullmq = require("bullmq");
const _jobstateenum = require("./enums/job-state.enum");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
const _queueretentionconstants = require("../message-queue/constants/queue-retention.constants");
const _redisclientservice = require("../redis-client/redis-client.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelQueueService = class AdminPanelQueueService {
    async getQueueJobs(queueName, state, limit = 50, offset = 0) {
        const redis = this.redisClient.getQueueClient();
        const queue = new _bullmq.Queue(queueName, {
            connection: redis
        });
        try {
            const validLimit = Math.min(Math.max(1, limit), 200);
            const validOffset = Math.max(0, offset);
            const start = validOffset;
            const end = validOffset + validLimit - 1;
            // Convert GraphQL enum to BullMQ state
            const bullMQState = _jobstateenum.jobStateEnumToBullMQ[state];
            const jobs = await queue.getJobs([
                bullMQState
            ], start, end, false);
            const transformedJobs = await Promise.all(jobs.map(async (job)=>{
                const jobBullMQState = await job.getState();
                return {
                    id: job.id,
                    name: job.name,
                    data: job.data,
                    state: _jobstateenum.bullMQToJobStateEnum[jobBullMQState],
                    timestamp: job.timestamp,
                    failedReason: job.failedReason,
                    processedOn: job.processedOn,
                    finishedOn: job.finishedOn,
                    attemptsMade: job.attemptsMade,
                    returnValue: job.returnValue,
                    logs: undefined,
                    stackTrace: job.stackTrace
                };
            }));
            const hasMore = jobs.length === validLimit;
            const jobCounts = await queue.getJobCounts('completed', 'failed', 'active', 'waiting', 'delayed', 'prioritized', 'waiting-children');
            const totalCountForState = (()=>{
                switch(state){
                    case _jobstateenum.JobStateEnum.COMPLETED:
                        return jobCounts.completed ?? 0;
                    case _jobstateenum.JobStateEnum.FAILED:
                        return jobCounts.failed ?? 0;
                    case _jobstateenum.JobStateEnum.ACTIVE:
                        return jobCounts.active ?? 0;
                    case _jobstateenum.JobStateEnum.WAITING:
                        return jobCounts.waiting ?? 0;
                    case _jobstateenum.JobStateEnum.DELAYED:
                        return jobCounts.delayed ?? 0;
                    case _jobstateenum.JobStateEnum.PRIORITIZED:
                        return jobCounts.prioritized ?? 0;
                    case _jobstateenum.JobStateEnum.WAITING_CHILDREN:
                        return jobCounts['waiting-children'] ?? 0;
                    default:
                        return jobs.length;
                }
            })();
            return {
                jobs: transformedJobs,
                count: jobs.length,
                totalCount: totalCountForState,
                hasMore,
                retentionConfig: {
                    ..._queueretentionconstants.QUEUE_RETENTION
                }
            };
        } catch (error) {
            throw new _graphqlerrorsutil.InternalServerError(`Failed to fetch jobs from queue ${queueName}: ${error instanceof Error ? error.message : String(error)}`, {
                userFriendlyMessage: /*i18n*/ {
                    id: "HfhmrS",
                    message: "Failed to load queue jobs. Please try again later."
                }
            });
        } finally{
            await queue.close();
        }
    }
    async retryJobs(queueName, jobIds) {
        const redis = this.redisClient.getQueueClient();
        const queue = new _bullmq.Queue(queueName, {
            connection: redis
        });
        try {
            if (jobIds.length === 0) {
                await queue.retryJobs({
                    state: 'failed'
                });
                return {
                    retriedCount: -1,
                    results: []
                };
            }
            const results = [];
            let retriedCount = 0;
            for (const jobId of jobIds){
                const job = await queue.getJob(jobId);
                if (!job) {
                    results.push({
                        jobId,
                        success: false,
                        error: 'Job not found'
                    });
                    continue;
                }
                const state = await job.getState();
                if (state !== 'failed') {
                    results.push({
                        jobId,
                        success: false,
                        error: `Job is not in failed state (current state: ${state})`
                    });
                    continue;
                }
                try {
                    await job.retry();
                    retriedCount++;
                    results.push({
                        jobId,
                        success: true
                    });
                } catch (error) {
                    results.push({
                        jobId,
                        success: false,
                        error: error instanceof Error ? error.message : String(error)
                    });
                }
            }
            return {
                retriedCount,
                results
            };
        } catch (error) {
            throw new _graphqlerrorsutil.InternalServerError(`Failed to retry jobs in queue ${queueName}: ${error instanceof Error ? error.message : String(error)}`, {
                userFriendlyMessage: /*i18n*/ {
                    id: "SJEIIJ",
                    message: "Failed to retry jobs. Please try again later."
                }
            });
        } finally{
            await queue.close();
        }
    }
    async deleteJobs(queueName, jobIds) {
        const redis = this.redisClient.getQueueClient();
        const queue = new _bullmq.Queue(queueName, {
            connection: redis
        });
        try {
            const results = [];
            let deletedCount = 0;
            for (const jobId of jobIds){
                const job = await queue.getJob(jobId);
                if (!job) {
                    results.push({
                        jobId,
                        success: false,
                        error: 'Job not found'
                    });
                    continue;
                }
                try {
                    await job.remove();
                    deletedCount++;
                    results.push({
                        jobId,
                        success: true
                    });
                } catch (error) {
                    results.push({
                        jobId,
                        success: false,
                        error: error instanceof Error ? error.message : String(error)
                    });
                }
            }
            return {
                deletedCount,
                results
            };
        } catch (error) {
            throw new _graphqlerrorsutil.InternalServerError(`Failed to delete jobs in queue ${queueName}: ${error instanceof Error ? error.message : String(error)}`, {
                userFriendlyMessage: /*i18n*/ {
                    id: "pUligB",
                    message: "Failed to delete jobs. Please try again later."
                }
            });
        } finally{
            await queue.close();
        }
    }
    constructor(redisClient){
        this.redisClient = redisClient;
    }
};
AdminPanelQueueService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _redisclientservice.RedisClientService === "undefined" ? Object : _redisclientservice.RedisClientService
    ])
], AdminPanelQueueService);

//# sourceMappingURL=admin-panel-queue.service.js.map