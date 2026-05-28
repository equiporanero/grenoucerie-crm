"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeFoldersToUpdate", {
    enumerable: true,
    get: function() {
        return computeFoldersToUpdate;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const computeFoldersToUpdate = ({ discoveredFolders, existingFolders })=>{
    const existingFoldersByExternalId = new Map(existingFolders.map((folder)=>[
            folder.externalId,
            folder
        ]));
    const foldersToUpdate = new Map();
    for (const discoveredFolder of discoveredFolders){
        const existingFolder = existingFoldersByExternalId.get(discoveredFolder.externalId);
        if (!existingFolder) {
            continue;
        }
        const parentFolderId = (0, _guards.isNonEmptyString)(discoveredFolder.parentFolderId) ? discoveredFolder.parentFolderId : null;
        const discoveredFolderData = {
            name: discoveredFolder.name,
            isSentFolder: discoveredFolder.isSentFolder,
            parentFolderId
        };
        const existingFolderData = {
            name: existingFolder.name,
            isSentFolder: existingFolder.isSentFolder,
            parentFolderId: (0, _guards.isNonEmptyString)(existingFolder.parentFolderId) ? existingFolder.parentFolderId : null
        };
        if (!(0, _utils.fastDeepEqual)(discoveredFolderData, existingFolderData)) {
            foldersToUpdate.set(existingFolder.id, discoveredFolderData);
        }
    }
    return foldersToUpdate;
};

//# sourceMappingURL=compute-folders-to-update.util.js.map