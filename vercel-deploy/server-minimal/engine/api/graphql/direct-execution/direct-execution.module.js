"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DirectExecutionModule", {
    enumerable: true,
    get: function() {
        return DirectExecutionModule;
    }
});
const _common = require("@nestjs/common");
const _corecommonapimodule = require("../../common/core-common-api.module");
const _directexecutionservice = require("./direct-execution.service");
const _workspaceresolvernamemapcacheservice = require("./services/workspace-resolver-name-map-cache.service");
const _workspaceresolverbuildermodule = require("../workspace-resolver-builder/workspace-resolver-builder.module");
const _workspacegraphqlschemasdlmodule = require("../workspace-graphql-schema-sdl/workspace-graphql-schema-sdl.module");
const _metricsmodule = require("../../../core-modules/metrics/metrics.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DirectExecutionModule = class DirectExecutionModule {
};
DirectExecutionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _corecommonapimodule.CoreCommonApiModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspaceresolverbuildermodule.WorkspaceResolverBuilderModule,
            _workspacegraphqlschemasdlmodule.WorkspaceGraphqlSchemaSDLModule,
            _metricsmodule.MetricsModule
        ],
        providers: [
            _directexecutionservice.DirectExecutionService,
            _workspaceresolvernamemapcacheservice.WorkspaceResolverNameMapCacheService
        ],
        exports: [
            _directexecutionservice.DirectExecutionService
        ]
    })
], DirectExecutionModule);

//# sourceMappingURL=direct-execution.module.js.map