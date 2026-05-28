"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CleanSuspendedWorkspacesJob", {
    enumerable: true,
    get: function() {
        return CleanSuspendedWorkspacesJob;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspace = require("twenty-shared/workspace");
const _sentrycronmonitordecorator = require("../../../core-modules/cron/sentry-cron-monitor.decorator");
const _processdecorator = require("../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../core-modules/message-queue/message-queue.constants");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _cleansuspendedworkspacescronpattern = require("./clean-suspended-workspaces.cron.pattern");
const _cleanerworkspaceservice = require("../services/cleaner.workspace-service");
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
let CleanSuspendedWorkspacesJob = class CleanSuspendedWorkspacesJob {
    async handle() {
        const suspendedWorkspaceIds = await this.workspaceRepository.find({
            select: [
                'id'
            ],
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.SUSPENDED
            },
            withDeleted: true
        });
        await this.cleanerWorkspaceService.batchWarnOrCleanSuspendedWorkspaces({
            workspaceIds: suspendedWorkspaceIds.map((workspace)=>workspace.id)
        });
    }
    constructor(cleanerWorkspaceService, workspaceRepository){
        this.cleanerWorkspaceService = cleanerWorkspaceService;
        this.workspaceRepository = workspaceRepository;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CleanSuspendedWorkspacesJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(CleanSuspendedWorkspacesJob.name, _cleansuspendedworkspacescronpattern.cleanSuspendedWorkspaceCronPattern),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CleanSuspendedWorkspacesJob.prototype, "handle", null);
CleanSuspendedWorkspacesJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cleanerworkspaceservice.CleanerWorkspaceService === "undefined" ? Object : _cleanerworkspaceservice.CleanerWorkspaceService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CleanSuspendedWorkspacesJob);

//# sourceMappingURL=clean-suspended-workspaces.job.js.map