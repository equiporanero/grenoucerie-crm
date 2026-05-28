"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineMessagingModule", {
    enumerable: true,
    get: function() {
        return TimelineMessagingModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _getmessagesservice = require("./services/get-messages.service");
const _timelinemessagingservice = require("./services/timeline-messaging.service");
const _timelinemessagingresolver = require("./timeline-messaging.resolver");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _usermodule = require("../user/user.module");
const _connectedaccountentity = require("../../metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../metadata-modules/message-channel/entities/message-channel.entity");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _workspacedatasourcemodule = require("../../workspace-datasource/workspace-datasource.module");
const _connectedaccountmodule = require("../../../modules/connected-account/connected-account.module");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TimelineMessagingModule = class TimelineMessagingModule {
};
TimelineMessagingModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _usermodule.UserModule,
            _connectedaccountmodule.ConnectedAccountModule,
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule,
            _typeorm.TypeOrmModule.forFeature([
                _messagechannelentity.MessageChannelEntity,
                _connectedaccountentity.ConnectedAccountEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ])
        ],
        exports: [],
        providers: [
            _timelinemessagingresolver.TimelineMessagingResolver,
            _timelinemessagingservice.TimelineMessagingService,
            _getmessagesservice.GetMessagesService
        ]
    })
], TimelineMessagingModule);

//# sourceMappingURL=timeline-messaging.module.js.map