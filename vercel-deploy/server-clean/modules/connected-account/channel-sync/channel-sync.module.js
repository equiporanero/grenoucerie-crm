"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChannelSyncModule", {
    enumerable: true,
    get: function() {
        return ChannelSyncModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _calendarchannelentity = require("../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountmetadatamodule = require("../../../engine/metadata-modules/connected-account/connected-account-metadata.module");
const _messagechannelentity = require("../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _permissionsmodule = require("../../../engine/metadata-modules/permissions/permissions.module");
const _workspacedatasourcemodule = require("../../../engine/workspace-datasource/workspace-datasource.module");
const _channelsyncresolver = require("./channel-sync.resolver");
const _channelsyncservice = require("./services/channel-sync.service");
const _messagingcommonmodule = require("../../messaging/common/messaging-common.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ChannelSyncModule = class ChannelSyncModule {
};
ChannelSyncModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _calendarchannelentity.CalendarChannelEntity,
                _messagechannelentity.MessageChannelEntity
            ]),
            _connectedaccountmetadatamodule.ConnectedAccountMetadataModule,
            _permissionsmodule.PermissionsModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _messagingcommonmodule.MessagingCommonModule
        ],
        providers: [
            _channelsyncresolver.ChannelSyncResolver,
            _channelsyncservice.ChannelSyncService
        ],
        exports: [
            _channelsyncservice.ChannelSyncService
        ]
    })
], ChannelSyncModule);

//# sourceMappingURL=channel-sync.module.js.map