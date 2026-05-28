"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImapFolderPath", {
    enumerable: true,
    get: function() {
        return getImapFolderPath;
    }
});
const _guards = require("@sniptt/guards");
const getImapFolderPath = (externalId)=>{
    if (!(0, _guards.isNonEmptyString)(externalId)) {
        return null;
    }
    const lastColonIndex = externalId.lastIndexOf(':');
    if (lastColonIndex === -1) {
        return externalId;
    }
    const trailingSegment = externalId.slice(lastColonIndex + 1);
    if (!/^\d+$/.test(trailingSegment)) {
        return externalId;
    }
    return externalId.slice(0, lastColonIndex);
};

//# sourceMappingURL=get-imap-folder-path.util.js.map