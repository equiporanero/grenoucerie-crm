/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsageModule", {
    enumerable: true,
    get: function() {
        return UsageModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _clickHousemodule = require("../../../database/clickHouse/clickHouse.module");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _usageresolver = require("./usage.resolver");
const _usageanalyticsservice = require("./services/usage-analytics.service");
const _usageeventwriterservice = require("./services/usage-event-writer.service");
const _usageeventlistener = require("./listeners/usage-event.listener");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let UsageModule = class UsageModule {
};
UsageModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _clickHousemodule.ClickHouseModule,
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule,
            _typeorm.TypeOrmModule.forFeature([
                _userworkspaceentity.UserWorkspaceEntity
            ])
        ],
        providers: [
            _usageresolver.UsageResolver,
            _usageanalyticsservice.UsageAnalyticsService,
            _usageeventwriterservice.UsageEventWriterService,
            _usageeventlistener.UsageEventListener
        ],
        exports: [
            _usageeventwriterservice.UsageEventWriterService,
            _usageanalyticsservice.UsageAnalyticsService
        ]
    })
], UsageModule);

//# sourceMappingURL=usage.module.js.map