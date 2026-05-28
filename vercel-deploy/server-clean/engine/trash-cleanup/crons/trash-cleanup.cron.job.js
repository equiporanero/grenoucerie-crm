"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TrashCleanupCronJob", {
    enumerable: true,
    get: function() {
        return TrashCleanupCronJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _sentrycronmonitordecorator = require("../../core-modules/cron/sentry-cron-monitor.decorator");
const _exceptionhandlerservice = require("../../core-modules/exception-handler/exception-handler.service");
const _messagequeuedecorator = require("../../core-modules/message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../core-modules/message-queue/services/message-queue.service");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _trashcleanupcronpatternconstant = require("../constants/trash-cleanup-cron-pattern.constant");
const _trashcleanupjob = require("../jobs/trash-cleanup.job");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let TrashCleanupCronJob = class TrashCleanupCronJob {
    async handle() {
        const workspaces = await this.getActiveWorkspaces();
        if (workspaces.length === 0) {
            this.logger.log('No active workspaces found for trash cleanup');
            return;
        }
        this.logger.log(`Enqueuing trash cleanup jobs for ${workspaces.length} workspace(s)`);
        for (const workspace of workspaces){
            try {
                await this.messageQueueService.add(_trashcleanupjob.TrashCleanupJob.name, {
                    workspaceId: workspace.id,
                    trashRetentionDays: workspace.trashRetentionDays
                });
            } catch (error) {
                this.exceptionHandlerService.captureExceptions([
                    error
                ], {
                    workspace: {
                        id: workspace.id
                    }
                });
            }
        }
        this.logger.log(`Successfully enqueued ${workspaces.length} trash cleanup job(s)`);
    }
    async getActiveWorkspaces() {
        const workspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            },
            select: [
                'id',
                'trashRetentionDays'
            ],
            order: {
                id: 'ASC'
            }
        });
        if (workspaces.length === 0) {
            return [];
        }
        return workspaces.map((workspace)=>({
                id: workspace.id,
                trashRetentionDays: workspace.trashRetentionDays
            }));
    }
    constructor(workspaceRepository, messageQueueService, exceptionHandlerService){
        this.workspaceRepository = workspaceRepository;
        this.messageQueueService = messageQueueService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.logger = new _common.Logger(TrashCleanupCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(TrashCleanupCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(TrashCleanupCronJob.name, _trashcleanupcronpatternconstant.TRASH_CLEANUP_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], TrashCleanupCronJob.prototype, "handle", null);
TrashCleanupCronJob = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workspaceQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService
    ])
], TrashCleanupCronJob);

//# sourceMappingURL=trash-cleanup.cron.job.js.map