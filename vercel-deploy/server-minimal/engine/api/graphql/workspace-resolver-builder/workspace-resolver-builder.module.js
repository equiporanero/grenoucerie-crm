"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceResolverBuilderModule", {
    enumerable: true,
    get: function() {
        return WorkspaceResolverBuilderModule;
    }
});
const _common = require("@nestjs/common");
const _corecommonapimodule = require("../../common/core-common-api.module");
const _graphqlqueryrunnermodule = require("../graphql-query-runner/graphql-query-runner.module");
const _workspaceresolverbuilderservice = require("./workspace-resolver-builder.service");
const _featureflagmodule = require("../../../core-modules/feature-flag/feature-flag.module");
const _workspaceresolverfactory = require("./workspace-resolver.factory");
const _factories = require("./factories/factories");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceResolverBuilderModule = class WorkspaceResolverBuilderModule {
};
WorkspaceResolverBuilderModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _graphqlqueryrunnermodule.GraphqlQueryRunnerModule,
            _featureflagmodule.FeatureFlagModule,
            _corecommonapimodule.CoreCommonApiModule
        ],
        providers: [
            ..._factories.workspaceResolverBuilderFactories,
            _workspaceresolverfactory.WorkspaceResolverFactory,
            _workspaceresolverbuilderservice.WorkspaceResolverBuilderService
        ],
        exports: [
            ..._factories.workspaceResolverBuilderFactories,
            _workspaceresolverfactory.WorkspaceResolverFactory,
            _workspaceresolverbuilderservice.WorkspaceResolverBuilderService
        ]
    })
], WorkspaceResolverBuilderModule);

//# sourceMappingURL=workspace-resolver-builder.module.js.map