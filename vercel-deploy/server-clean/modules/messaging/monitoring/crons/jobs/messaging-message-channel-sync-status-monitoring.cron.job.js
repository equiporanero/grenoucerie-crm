"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get MESSAGING_MESSAGE_CHANNEL_SYNC_STATUS_MONITORING_CRON_PATTERN () {
        return MESSAGING_MESSAGE_CHANNEL_SYNC_STATUS_MONITORING_CRON_PATTERN;
    },
    get MessagingMessageChannelSyncStatusMonitoringCronJob () {
        return MessagingMessageChannelSyncStatusMonitoringCronJob;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _lodashsnakecase = /*#__PURE__*/ _interop_require_default(require("lodash.snakecase"));
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _sentrycronmonitordecorator = require("../../../../../engine/core-modules/cron/sentry-cron-monitor.decorator");
const _exceptionhandlerservice = require("../../../../../engine/core-modules/exception-handler/exception-handler.service");
const _processdecorator = require("../../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _workspaceentity = require("../../../../../engine/core-modules/workspace/workspace.entity");
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagingmonitoringservice = require("../../services/messaging-monitoring.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const MESSAGING_MESSAGE_CHANNEL_SYNC_STATUS_MONITORING_CRON_PATTERN = '2/10 * * * *'; //Every 10 minutes, starting at 2 minutes past the hour
let MessagingMessageChannelSyncStatusMonitoringCronJob = class MessagingMessageChannelSyncStatusMonitoringCronJob {
    async handle() {
        await this.messagingMonitoringService.track({
            eventName: 'message_channel.monitoring.sync_status.start',
            message: 'Starting message channel sync status monitoring'
        });
        const activeWorkspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            }
        });
        for (const activeWorkspace of activeWorkspaces){
            try {
                const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(activeWorkspace.id);
                await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
                    const messageChannels = await this.messageChannelRepository.find({
                        select: [
                            'id',
                            'syncStatus',
                            'connectedAccountId'
                        ],
                        where: {
                            workspaceId: activeWorkspace.id
                        }
                    });
                    for (const messageChannel of messageChannels){
                        if (!messageChannel.syncStatus) {
                            continue;
                        }
                        await this.messagingMonitoringService.track({
                            eventName: `message_channel.monitoring.sync_status.${(0, _lodashsnakecase.default)(messageChannel.syncStatus)}`,
                            workspaceId: activeWorkspace.id,
                            connectedAccountId: messageChannel.connectedAccountId,
                            messageChannelId: messageChannel.id,
                            message: messageChannel.syncStatus
                        });
                    }
                }, authContext, {
                    lite: true
                });
            } catch (error) {
                this.exceptionHandlerService.captureExceptions([
                    error
                ], {
                    workspace: {
                        id: activeWorkspace.id
                    }
                });
            }
        }
    }
    constructor(workspaceRepository, messagingMonitoringService, globalWorkspaceOrmManager, messageChannelRepository, exceptionHandlerService){
        this.workspaceRepository = workspaceRepository;
        this.messagingMonitoringService = messagingMonitoringService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.exceptionHandlerService = exceptionHandlerService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingMessageChannelSyncStatusMonitoringCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(MessagingMessageChannelSyncStatusMonitoringCronJob.name, MESSAGING_MESSAGE_CHANNEL_SYNC_STATUS_MONITORING_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], MessagingMessageChannelSyncStatusMonitoringCronJob.prototype, "handle", null);
MessagingMessageChannelSyncStatusMonitoringCronJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagingmonitoringservice.MessagingMonitoringService === "undefined" ? Object : _messagingmonitoringservice.MessagingMonitoringService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService
    ])
], MessagingMessageChannelSyncStatusMonitoringCronJob);

//# sourceMappingURL=messaging-message-channel-sync-status-monitoring.cron.job.js.map