"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMonitoringModule", {
    enumerable: true,
    get: function() {
        return MessagingMonitoringModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _auditmodule = require("../../../engine/core-modules/audit/audit.module");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _messagechannelentity = require("../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _messagingcommonmodule = require("../common/messaging-common.module");
const _messagingmessagechannelsyncstatusmonitoringcroncommand = require("./crons/commands/messaging-message-channel-sync-status-monitoring.cron.command");
const _messagingmessagechannelsyncstatusmonitoringcronjob = require("./crons/jobs/messaging-message-channel-sync-status-monitoring.cron.job");
const _messagingmonitoringservice = require("./services/messaging-monitoring.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingMonitoringModule = class MessagingMonitoringModule {
};
MessagingMonitoringModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _auditmodule.AuditModule,
            _messagingcommonmodule.MessagingCommonModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _messagechannelentity.MessageChannelEntity
            ])
        ],
        providers: [
            _messagingmessagechannelsyncstatusmonitoringcroncommand.MessagingMessageChannelSyncStatusMonitoringCronCommand,
            _messagingmessagechannelsyncstatusmonitoringcronjob.MessagingMessageChannelSyncStatusMonitoringCronJob,
            _messagingmonitoringservice.MessagingMonitoringService
        ],
        exports: [
            _messagingmonitoringservice.MessagingMonitoringService
        ]
    })
], MessagingMonitoringModule);

//# sourceMappingURL=messaging-monitoring.module.js.map