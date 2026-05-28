"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoreGraphQLApiModule", {
    enumerable: true,
    get: function() {
        return CoreGraphQLApiModule;
    }
});
const _common = require("@nestjs/common");
const _scalarsexplorerservice = require("./services/scalars-explorer.service");
const _workspacegraphqlschemasdlmodule = require("./workspace-graphql-schema-sdl/workspace-graphql-schema-sdl.module");
const _workspaceresolverbuildermodule = require("./workspace-resolver-builder/workspace-resolver-builder.module");
const _workspaceschemafactory = require("./workspace-schema.factory");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CoreGraphQLApiModule = class CoreGraphQLApiModule {
};
CoreGraphQLApiModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspaceresolverbuildermodule.WorkspaceResolverBuilderModule,
            _workspacegraphqlschemasdlmodule.WorkspaceGraphqlSchemaSDLModule
        ],
        providers: [
            _workspaceschemafactory.WorkspaceSchemaFactory,
            _scalarsexplorerservice.ScalarsExplorerService
        ],
        exports: [
            _workspaceschemafactory.WorkspaceSchemaFactory
        ]
    })
], CoreGraphQLApiModule);

//# sourceMappingURL=core-graphql-api.module.js.map