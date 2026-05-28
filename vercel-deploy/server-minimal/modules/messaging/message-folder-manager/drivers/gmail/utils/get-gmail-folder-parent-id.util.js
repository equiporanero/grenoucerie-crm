"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getGmailFolderParentId", {
    enumerable: true,
    get: function() {
        return getGmailFolderParentId;
    }
});
const getGmailFolderParentId = (labelName, labelNameToIdMap)=>{
    if (!labelName.includes('/')) {
        return null;
    }
    const parentName = labelName.substring(0, labelName.lastIndexOf('/'));
    return labelNameToIdMap.get(parentName) || null;
};

//# sourceMappingURL=get-gmail-folder-parent-id.util.js.map