"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getFirstNameAndLastNameFromHandleAndDisplayName", {
    enumerable: true,
    get: function() {
        return getFirstNameAndLastNameFromHandleAndDisplayName;
    }
});
const _utils = require("twenty-shared/utils");
const _getparsednamefromdisplaynameutil = require("./get-parsed-name-from-display-name.util");
const _getparsednamefromhandleutil = require("./get-parsed-name-from-handle.util");
const getFirstNameAndLastNameFromHandleAndDisplayName = (handle, displayName)=>{
    const fromDisplayName = (0, _getparsednamefromdisplaynameutil.getParsedNameFromDisplayName)(displayName);
    const fromHandle = (0, _getparsednamefromhandleutil.getParsedNameFromHandle)(handle);
    return {
        firstName: (0, _utils.capitalize)(fromDisplayName.firstName || fromHandle.firstName),
        lastName: (0, _utils.capitalize)(fromDisplayName.lastName || fromHandle.lastName)
    };
};

//# sourceMappingURL=get-first-name-and-last-name-from-handle-and-display-name.util.js.map