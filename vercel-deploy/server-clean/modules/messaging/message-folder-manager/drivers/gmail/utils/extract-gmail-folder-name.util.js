"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractGmailFolderName", {
    enumerable: true,
    get: function() {
        return extractGmailFolderName;
    }
});
const extractGmailFolderName = (labelName)=>{
    if (!labelName.includes('/')) {
        return labelName;
    }
    return labelName.substring(labelName.lastIndexOf('/') + 1);
};

//# sourceMappingURL=extract-gmail-folder-name.util.js.map