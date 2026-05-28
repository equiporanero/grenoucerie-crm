"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getParsedNameFromHandle", {
    enumerable: true,
    get: function() {
        return getParsedNameFromHandle;
    }
});
const _getparsednamefromemaillocalpartutil = require("./get-parsed-name-from-email-local-part.util");
const getParsedNameFromHandle = (handle)=>{
    const [localPart = ''] = handle.split('@');
    return (0, _getparsednamefromemaillocalpartutil.getParsedNameFromEmailLocalPart)(localPart);
};

//# sourceMappingURL=get-parsed-name-from-handle.util.js.map