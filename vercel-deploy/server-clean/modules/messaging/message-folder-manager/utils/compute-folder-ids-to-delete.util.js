"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFolderIdsToDelete", {
    enumerable: true,
    get: function() {
        return computeFolderIdsToDelete;
    }
});
const computeFolderIdsToDelete = ({ discoveredFolders, existingFolders })=>{
    const discoveredExternalIds = new Set(discoveredFolders.map((discoveredFolder)=>discoveredFolder.externalId));
    return existingFolders.filter((existingFolder)=>!discoveredExternalIds.has(existingFolder.externalId)).map((existingFolder)=>existingFolder.id);
};

//# sourceMappingURL=compute-folder-ids-to-delete.util.js.map