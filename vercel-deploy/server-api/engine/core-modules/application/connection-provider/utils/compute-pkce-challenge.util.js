"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computePkceChallenge", {
    enumerable: true,
    get: function() {
        return computePkceChallenge;
    }
});
const _crypto = require("crypto");
const _utils = require("twenty-shared/utils");
const computePkceChallenge = (verifier)=>(0, _utils.base64UrlEncode)((0, _crypto.createHash)('sha256').update(verifier).digest());

//# sourceMappingURL=compute-pkce-challenge.util.js.map