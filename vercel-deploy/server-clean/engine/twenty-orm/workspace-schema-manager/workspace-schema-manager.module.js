"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSchemaManagerModule", {
    enumerable: true,
    get: function() {
        return WorkspaceSchemaManagerModule;
    }
});
const _common = require("@nestjs/common");
const _workspaceschemacolumnmanagerservice = require("./services/workspace-schema-column-manager.service");
const _workspaceschemaenummanagerservice = require("./services/workspace-schema-enum-manager.service");
const _workspaceschemaforeignkeymanagerservice = require("./services/workspace-schema-foreign-key-manager.service");
const _workspaceschemaindexmanagerservice = require("./services/workspace-schema-index-manager.service");
const _workspaceschematablemanagerservice = require("./services/workspace-schema-table-manager.service");
const _workspaceschemamanagerservice = require("./workspace-schema-manager.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceSchemaManagerModule = class WorkspaceSchemaManagerModule {
};
WorkspaceSchemaManagerModule = _ts_decorate([
    (0, _common.Module)({
        providers: [
            _workspaceschemamanagerservice.WorkspaceSchemaManagerService,
            _workspaceschematablemanagerservice.WorkspaceSchemaTableManagerService,
            _workspaceschemacolumnmanagerservice.WorkspaceSchemaColumnManagerService,
            _workspaceschemaindexmanagerservice.WorkspaceSchemaIndexManagerService,
            _workspaceschemaenummanagerservice.WorkspaceSchemaEnumManagerService,
            _workspaceschemaforeignkeymanagerservice.WorkspaceSchemaForeignKeyManagerService
        ],
        exports: [
            _workspaceschemamanagerservice.WorkspaceSchemaManagerService
        ]
    })
], WorkspaceSchemaManagerModule);

//# sourceMappingURL=workspace-schema-manager.module.js.map