"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractVersionFromCommandName", {
    enumerable: true,
    get: function() {
        return extractVersionFromCommandName;
    }
});
const extractVersionFromCommandName = (name)=>{
    const firstUnderscore = name.indexOf('_');
    if (firstUnderscore === -1) {
        return null;
    }
    return name.substring(0, firstUnderscore);
};

//# sourceMappingURL=extract-version-from-command-name.util.js.map