"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSubdomainNameFromDisplayName", {
    enumerable: true,
    get: function() {
        return getSubdomainNameFromDisplayName;
    }
});
const _utils = require("twenty-shared/utils");
const getSubdomainNameFromDisplayName = (displayName)=>{
    if (!(0, _utils.isDefined)(displayName)) return;
    const displayNameWords = displayName.match(/(\w|\d)+/g);
    if (displayNameWords) {
        return displayNameWords.join('-').replace(/ /g, '').toLowerCase();
    }
};

//# sourceMappingURL=get-subdomain-name-from-display-name.util.js.map