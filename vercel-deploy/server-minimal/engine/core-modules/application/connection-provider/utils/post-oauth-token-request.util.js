"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get OAuthTokenEndpointError () {
        return OAuthTokenEndpointError;
    },
    get postOAuthTokenRequest () {
        return postOAuthTokenRequest;
    }
});
const _encodeoauthbodyutil = require("./encode-oauth-body.util");
const _parsetokenresponseutil = require("./parse-token-response.util");
let OAuthTokenEndpointError = class OAuthTokenEndpointError extends Error {
    constructor(message, status){
        super(message), this.status = status;
        this.name = 'OAuthTokenEndpointError';
    }
};
const postOAuthTokenRequest = async (args)=>{
    const { body, contentTypeHeader } = (0, _encodeoauthbodyutil.encodeOAuthBody)(args.contentType, args.params);
    const response = await args.fetchFn(args.tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': contentTypeHeader,
            // Many providers (notably GitHub) default to URL-encoded responses
            // unless we explicitly ask for JSON.
            Accept: 'application/json'
        },
        body
    });
    if (!response.ok) {
        const text = await response.text();
        throw new OAuthTokenEndpointError(`Token endpoint responded with ${response.status}: ${text.slice(0, 500)}`, response.status);
    }
    return (0, _parsetokenresponseutil.parseTokenResponse)(await response.json());
};

//# sourceMappingURL=post-oauth-token-request.util.js.map