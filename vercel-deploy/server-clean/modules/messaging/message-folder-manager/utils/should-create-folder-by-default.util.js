"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldCreateFolderByDefault", {
    enumerable: true,
    get: function() {
        return shouldCreateFolderByDefault;
    }
});
const _utils = require("twenty-shared/utils");
const _MESSAGING_FOLDER_MANAGER_ALWAYS_EXCLUDED_FOLDERS = require("./MESSAGING_FOLDER_MANAGER_ALWAYS_EXCLUDED_FOLDERS");
const shouldCreateFolderByDefault = (standardFolder)=>{
    if ((0, _utils.isDefined)(standardFolder) && _MESSAGING_FOLDER_MANAGER_ALWAYS_EXCLUDED_FOLDERS.MESSAGING_FOLDER_MANAGER_ALWAYS_EXCLUDED_FOLDERS.includes(standardFolder)) {
        return false;
    }
    return true;
};

//# sourceMappingURL=should-create-folder-by-default.util.js.map