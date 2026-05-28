"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarCommonModule", {
    enumerable: true,
    get: function() {
        return CalendarCommonModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _metricsmodule = require("../../../engine/core-modules/metrics/metrics.module");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _workspacedatasourcemodule = require("../../../engine/workspace-datasource/workspace-datasource.module");
const _calendarchannelsyncstatusservice = require("./services/calendar-channel-sync-status.service");
const _connectedaccountmodule = require("../../connected-account/connected-account.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalendarCommonModule = class CalendarCommonModule {
};
CalendarCommonModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _typeorm.TypeOrmModule.forFeature([
                _calendarchannelentity.CalendarChannelEntity,
                _connectedaccountentity.ConnectedAccountEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ]),
            _connectedaccountmodule.ConnectedAccountModule,
            _metricsmodule.MetricsModule
        ],
        providers: [
            _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService
        ],
        exports: [
            _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService
        ]
    })
], CalendarCommonModule);

//# sourceMappingURL=calendar-common.module.js.map