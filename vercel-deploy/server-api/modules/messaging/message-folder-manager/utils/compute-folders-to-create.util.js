"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFoldersToCreate", {
    enumerable: true,
    get: function() {
        return computeFoldersToCreate;
    }
});
const _guards = require("@sniptt/guards");
const computeFoldersToCreate = ({ discoveredFolders, existingFolders, messageChannelId })=>{
    const existingFoldersByExternalId = new Map(existingFolders.map((folder)=>[
            folder.externalId,
            folder
        ]));
    return discoveredFolders.filter((discoveredFolder)=>!existingFoldersByExternalId.has(discoveredFolder.externalId)).map((discoveredFolder)=>({
            name: discoveredFolder.name,
            externalId: discoveredFolder.externalId,
            messageChannelId,
            isSentFolder: discoveredFolder.isSentFolder,
            isSynced: discoveredFolder.isSynced,
            syncCursor: null,
            parentFolderId: (0, _guards.isNonEmptyString)(discoveredFolder.parentFolderId) ? discoveredFolder.parentFolderId : null
        }));
};

//# sourceMappingURL=compute-folders-to-create.util.js.map