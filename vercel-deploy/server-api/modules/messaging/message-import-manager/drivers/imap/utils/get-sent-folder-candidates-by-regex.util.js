"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImapSentFolderCandidatesByRegex", {
    enumerable: true,
    get: function() {
        return getImapSentFolderCandidatesByRegex;
    }
});
const _standardfolder = require("../../types/standard-folder");
const _getstandardfolderbyregex = require("../../utils/get-standard-folder-by-regex");
function getImapSentFolderCandidatesByRegex(list) {
    const regexCandidateFolders = [];
    for (const folder of list){
        const standardFolder = (0, _getstandardfolderbyregex.getStandardFolderByRegex)(folder.name);
        if (standardFolder === _standardfolder.StandardFolder.SENT) {
            regexCandidateFolders.push(folder.path);
        }
    }
    return regexCandidateFolders.map((folderPath)=>{
        const folder = list.find((folder)=>folder.path === folderPath);
        return {
            name: folder?.name ?? folderPath,
            path: folderPath
        };
    });
}

//# sourceMappingURL=get-sent-folder-candidates-by-regex.util.js.map