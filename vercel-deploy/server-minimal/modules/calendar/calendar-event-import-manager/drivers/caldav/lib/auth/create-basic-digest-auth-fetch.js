"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createBasicDigestAuthFetch", {
    enumerable: true,
    get: function() {
        return createBasicDigestAuthFetch;
    }
});
const _digestfetch = /*#__PURE__*/ _interop_require_default(require("digest-fetch"));
const _tsdav = require("tsdav");
const _utils = require("twenty-shared/utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createBasicDigestAuthFetch = (username, password, baseFetch = globalThis.fetch)=>{
    const digestClient = new _digestfetch.default(username, password);
    digestClient.getClient = async ()=>baseFetch;
    const { authorization: basicAuthorization } = (0, _tsdav.getBasicAuthHeaders)({
        username,
        password
    });
    return async (input, init)=>{
        const headers = new Headers(init?.headers);
        if (!headers.has('Authorization') && (0, _utils.isDefined)(basicAuthorization)) {
            headers.set('Authorization', basicAuthorization);
        }
        return digestClient.fetch(input, {
            ...init,
            headers
        });
    };
};

//# sourceMappingURL=create-basic-digest-auth-fetch.js.map