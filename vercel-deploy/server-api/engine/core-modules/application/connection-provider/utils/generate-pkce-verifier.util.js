"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generatePkceVerifier", {
    enumerable: true,
    get: function() {
        return generatePkceVerifier;
    }
});
const _crypto = require("crypto");
const _utils = require("twenty-shared/utils");
const generatePkceVerifier = ()=>(0, _utils.base64UrlEncode)((0, _crypto.randomBytes)(32));

//# sourceMappingURL=generate-pkce-verifier.util.js.map