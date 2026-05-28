"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildPublicConnectedAccount", {
    enumerable: true,
    get: function() {
        return buildPublicConnectedAccount;
    }
});
const _buildpublicconnectionparametersutil = require("../../../core-modules/imap-smtp-caldav-connection/utils/build-public-connection-parameters.util");
function buildPublicConnectedAccount(account) {
    if (!account) {
        return null;
    }
    return {
        ...account,
        connectionParameters: (0, _buildpublicconnectionparametersutil.buildPublicConnectionParameters)(account.connectionParameters)
    };
}

//# sourceMappingURL=build-public-connected-account.util.js.map