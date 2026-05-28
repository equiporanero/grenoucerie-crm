"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CleanOnboardingWorkspacesJob", {
    enumerable: true,
    get: function() {
        return CleanOnboardingWorkspacesJob;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _sentrycronmonitordecorator = require("../../../core-modules/cron/sentry-cron-monitor.decorator");
const _processdecorator = require("../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../core-modules/message-queue/message-queue.constants");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _cleanonboardingworkspacescronpattern = require("./clean-onboarding-workspaces.cron.pattern");
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
let CleanOnboardingWorkspacesJob = class CleanOnboardingWorkspacesJob {
    async handle() {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const onboardingWorkspaces = await this.workspaceRepository.find({
            select: [
                'id'
            ],
            where: {
                activationStatus: (0, _typeorm1.In)([
                    _workspace.WorkspaceActivationStatus.PENDING_CREATION,
                    _workspace.WorkspaceActivationStatus.ONGOING_CREATION
                ]),
                createdAt: (0, _typeorm1.LessThan)(sevenDaysAgo)
            },
            withDeleted: true
        });
        await this.cleanerWorkspaceService.batchCleanOnboardingWorkspaces(onboardingWorkspaces.map((workspace)=>workspace.id));
    }
    constructor(cleanerWorkspaceService, workspaceRepository){
        this.cleanerWorkspaceService = cleanerWorkspaceService;
        this.workspaceRepository = workspaceRepository;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CleanOnboardingWorkspacesJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(CleanOnboardingWorkspacesJob.name, _cleanonboardingworkspacescronpattern.cleanOnboardingWorkspacesCronPattern),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CleanOnboardingWorkspacesJob.prototype, "handle", null);
CleanOnboardingWorkspacesJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cleanerworkspaceservice.CleanerWorkspaceService === "undefined" ? Object : _cleanerworkspaceservice.CleanerWorkspaceService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CleanOnboardingWorkspacesJob);

//# sourceMappingURL=clean-onboarding-workspaces.job.js.map