"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwentyStandardApplicationModule", {
    enumerable: true,
    get: function() {
        return TwentyStandardApplicationModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../core-modules/application/application.module");
const _twentyconfigmodule = require("../../core-modules/twenty-config/twenty-config.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _globalworkspacedatasourcemodule = require("../../twenty-orm/global-workspace-datasource/global-workspace-datasource.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../workspace-migration/workspace-migration.module");
const _twentystandardapplicationservice = require("./services/twenty-standard-application.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TwentyStandardApplicationModule = class TwentyStandardApplicationModule {
};
TwentyStandardApplicationModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _twentystandardapplicationservice.TwentyStandardApplicationService
        ],
        imports: [
            _applicationmodule.ApplicationModule,
            _twentyconfigmodule.TwentyConfigModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _globalworkspacedatasourcemodule.GlobalWorkspaceDataSourceModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        exports: [
            _twentystandardapplicationservice.TwentyStandardApplicationService
        ]
    })
], TwentyStandardApplicationModule);

//# sourceMappingURL=twenty-standard-application.module.js.map