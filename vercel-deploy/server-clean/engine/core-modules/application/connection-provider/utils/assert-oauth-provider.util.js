"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertOAuthProvider", {
    enumerable: true,
    get: function() {
        return assertOAuthProvider;
    }
});
const _utils = require("twenty-shared/utils");
const _connectionproviderexceptioncodeenum = require("../connection-provider-exception-code.enum");
const _connectionproviderexception = require("../connection-provider.exception");
function assertOAuthProvider(provider) {
    if (provider.type !== 'oauth' || !(0, _utils.isDefined)(provider.oauthConfig)) {
        throw new _connectionproviderexception.ConnectionProviderException(`Connection provider "${provider.name}" (id ${provider.id}) is not OAuth-typed or has no oauthConfig`, _connectionproviderexceptioncodeenum.ConnectionProviderExceptionCode.INVALID_REQUEST);
    }
}

//# sourceMappingURL=assert-oauth-provider.util.js.map