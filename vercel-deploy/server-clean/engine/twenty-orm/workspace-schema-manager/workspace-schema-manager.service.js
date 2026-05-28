"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceSchemaManagerService", {
    enumerable: true,
    get: function() {
        return WorkspaceSchemaManagerService;
    }
});
const _common = require("@nestjs/common");
const _workspaceschemacolumnmanagerservice = require("./services/workspace-schema-column-manager.service");
const _workspaceschemaenummanagerservice = require("./services/workspace-schema-enum-manager.service");
const _workspaceschemaforeignkeymanagerservice = require("./services/workspace-schema-foreign-key-manager.service");
const _workspaceschemaindexmanagerservice = require("./services/workspace-schema-index-manager.service");
const _workspaceschematablemanagerservice = require("./services/workspace-schema-table-manager.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceSchemaManagerService = class WorkspaceSchemaManagerService {
    constructor(workspaceSchemaTableManager, workspaceSchemaColumnManager, workspaceSchemaIndexManager, workspaceSchemaEnumManager, workspaceSchemaForeignKeyManager){
        this.tableManager = workspaceSchemaTableManager;
        this.columnManager = workspaceSchemaColumnManager;
        this.indexManager = workspaceSchemaIndexManager;
        this.enumManager = workspaceSchemaEnumManager;
        this.foreignKeyManager = workspaceSchemaForeignKeyManager;
    }
};
WorkspaceSchemaManagerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceschematablemanagerservice.WorkspaceSchemaTableManagerService === "undefined" ? Object : _workspaceschematablemanagerservice.WorkspaceSchemaTableManagerService,
        typeof _workspaceschemacolumnmanagerservice.WorkspaceSchemaColumnManagerService === "undefined" ? Object : _workspaceschemacolumnmanagerservice.WorkspaceSchemaColumnManagerService,
        typeof _workspaceschemaindexmanagerservice.WorkspaceSchemaIndexManagerService === "undefined" ? Object : _workspaceschemaindexmanagerservice.WorkspaceSchemaIndexManagerService,
        typeof _workspaceschemaenummanagerservice.WorkspaceSchemaEnumManagerService === "undefined" ? Object : _workspaceschemaenummanagerservice.WorkspaceSchemaEnumManagerService,
        typeof _workspaceschemaforeignkeymanagerservice.WorkspaceSchemaForeignKeyManagerService === "undefined" ? Object : _workspaceschemaforeignkeymanagerservice.WorkspaceSchemaForeignKeyManagerService
    ])
], WorkspaceSchemaManagerService);

//# sourceMappingURL=workspace-schema-manager.service.js.map