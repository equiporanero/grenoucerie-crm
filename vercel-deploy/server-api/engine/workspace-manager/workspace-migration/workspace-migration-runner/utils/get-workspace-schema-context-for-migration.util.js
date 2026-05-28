"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getWorkspaceSchemaContextForMigration", {
    enumerable: true,
    get: function() {
        return getWorkspaceSchemaContextForMigration;
    }
});
const _computeobjecttargettableutil = require("../../../../utils/compute-object-target-table.util");
const _getworkspaceschemanameutil = require("../../../../workspace-datasource/utils/get-workspace-schema-name.util");
const getWorkspaceSchemaContextForMigration = ({ workspaceId, objectMetadata })=>{
    return {
        schemaName: (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId),
        tableName: (0, _computeobjecttargettableutil.computeObjectTargetTable)(objectMetadata)
    };
};

//# sourceMappingURL=get-workspace-schema-context-for-migration.util.js.map