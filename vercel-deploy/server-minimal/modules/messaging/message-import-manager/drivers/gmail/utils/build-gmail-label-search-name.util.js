"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildGmailLabelSearchName", {
    enumerable: true,
    get: function() {
        return buildGmailLabelSearchName;
    }
});
const MAXIMUM_GMAIL_FOLDER_DEPTH = 50;
const buildGmailLabelSearchName = (folder, allFolders)=>{
    if (!folder.name) {
        return null;
    }
    const folderMap = new Map(allFolders.filter((folder)=>folder.externalId).map((folder)=>[
            folder.externalId,
            folder
        ]));
    const pathParts = [];
    let current = folder;
    let depth = 0;
    while(current?.name && depth < MAXIMUM_GMAIL_FOLDER_DEPTH){
        pathParts.unshift(current.name);
        current = current.parentFolderId ? folderMap.get(current.parentFolderId) : undefined;
        depth++;
    }
    if (depth >= MAXIMUM_GMAIL_FOLDER_DEPTH) {
        return null;
    }
    return pathParts.join('/').replace(/[\s/]+/g, '-').toLowerCase();
};

//# sourceMappingURL=build-gmail-label-search-name.util.js.map