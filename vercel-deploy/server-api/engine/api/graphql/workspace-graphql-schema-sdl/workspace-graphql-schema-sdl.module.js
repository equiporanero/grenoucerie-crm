"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceGraphqlSchemaSDLModule", {
    enumerable: true,
    get: function() {
        return WorkspaceGraphqlSchemaSDLModule;
    }
});
const _common = require("@nestjs/common");
const _scalarsexplorerservice = require("../services/scalars-explorer.service");
const _workspaceschemabuildermodule = require("../workspace-schema-builder/workspace-schema-builder.module");
const _workspacegraphqlschemasdlservice = require("./workspace-graphql-schema-sdl.service");
const _workspacemanyorallflatentitymapscachemodule = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspacecachestoragemodule = require("../../../workspace-cache-storage/workspace-cache-storage.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceGraphqlSchemaSDLModule = class WorkspaceGraphqlSchemaSDLModule {
};
WorkspaceGraphqlSchemaSDLModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspaceschemabuildermodule.WorkspaceSchemaBuilderModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workspacegraphqlschemasdlservice.WorkspaceGraphqlSchemaSDLService,
            _scalarsexplorerservice.ScalarsExplorerService
        ],
        exports: [
            _workspacegraphqlschemasdlservice.WorkspaceGraphqlSchemaSDLService
        ]
    })
], WorkspaceGraphqlSchemaSDLModule);

//# sourceMappingURL=workspace-graphql-schema-sdl.module.js.map