"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCoreEntityMetadatasWithWorkspaceId", {
    enumerable: true,
    get: function() {
        return getCoreEntityMetadatasWithWorkspaceId;
    }
});
const getCoreEntityMetadatasWithWorkspaceId = (dataSource)=>{
    return dataSource.entityMetadatas.filter((entityMetadata)=>entityMetadata.columns.some((column)=>column.propertyName === 'workspaceId'));
};

//# sourceMappingURL=get-core-entity-metadatas-with-workspace-id.util.js.map