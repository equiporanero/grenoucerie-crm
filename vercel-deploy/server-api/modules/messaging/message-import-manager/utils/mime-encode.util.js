"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mimeEncode", {
    enumerable: true,
    get: function() {
        return mimeEncode;
    }
});
const mimeEncode = (raw)=>{
    return `=?UTF-8?B?${Buffer.from(raw).toString('base64')}?=`;
};

//# sourceMappingURL=mime-encode.util.js.map