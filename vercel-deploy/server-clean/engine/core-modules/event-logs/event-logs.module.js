/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventLogsModule", {
    enumerable: true,
    get: function() {
        return EventLogsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _clickHousemodule = require("../../../database/clickHouse/clickHouse.module");
const _billingmodule = require("../billing/billing.module");
const _enterprisemodule = require("../enterprise/enterprise.module");
const _guardredirectmodule = require("../guard-redirect/guard-redirect.module");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _eventlogsresolver = require("./event-logs.resolver");
const _eventlogsservice = require("./event-logs.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EventLogsModule = class EventLogsModule {
};
EventLogsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _clickHousemodule.ClickHouseModule,
            _permissionsmodule.PermissionsModule,
            _billingmodule.BillingModule,
            _enterprisemodule.EnterpriseModule,
            _guardredirectmodule.GuardRedirectModule,
            _typeorm.TypeOrmModule.forFeature([
                _userworkspaceentity.UserWorkspaceEntity
            ])
        ],
        providers: [
            _eventlogsresolver.EventLogsResolver,
            _eventlogsservice.EventLogsService
        ],
        exports: [
            _eventlogsservice.EventLogsService
        ]
    })
], EventLogsModule);

//# sourceMappingURL=event-logs.module.js.map