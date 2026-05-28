"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldSyncFolderByDefault", {
    enumerable: true,
    get: function() {
        return shouldSyncFolderByDefault;
    }
});
const _types = require("twenty-shared/types");
const shouldSyncFolderByDefault = (messageFolderImportPolicy)=>{
    return messageFolderImportPolicy === _types.MessageFolderImportPolicy.ALL_FOLDERS;
};

//# sourceMappingURL=should-sync-folder-by-default.util.js.map