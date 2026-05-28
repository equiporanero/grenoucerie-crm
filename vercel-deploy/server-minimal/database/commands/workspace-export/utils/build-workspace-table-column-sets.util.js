"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildWorkspaceTableColumnSets", {
    enumerable: true,
    get: function() {
        return buildWorkspaceTableColumnSets;
    }
});
const _generatecolumndefinitionsutil = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration-runner/utils/generate-column-definitions.util");
const JSON_COLUMN_TYPES = new Set([
    'json',
    'jsonb'
]);
const buildWorkspaceTableColumnSets = (workspaceId, objectMetadata, fieldMetadatas)=>{
    const jsonColumns = new Set();
    const generatedColumns = new Set();
    const flatObjectMetadata = objectMetadata;
    for (const fieldMetadata of fieldMetadatas){
        const flatFieldMetadata = fieldMetadata;
        const columnDefinitions = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
            flatFieldMetadata,
            flatObjectMetadata,
            workspaceId
        });
        for (const columnDefinition of columnDefinitions){
            if (JSON_COLUMN_TYPES.has(columnDefinition.type)) {
                jsonColumns.add(columnDefinition.name);
            }
            if (columnDefinition.type === 'tsvector') {
                generatedColumns.add(columnDefinition.name);
            }
        }
    }
    return {
        jsonColumns,
        generatedColumns
    };
};

//# sourceMappingURL=build-workspace-table-column-sets.util.js.map