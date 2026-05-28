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
    get DnsManagerException () {
        return DnsManagerException;
    },
    get DnsManagerExceptionCode () {
        return DnsManagerExceptionCode;
    }
});
const _customexception = require("../../../../utils/custom-exception");
let DnsManagerException = class DnsManagerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "ixdsnM",
                message: "A DNS manager error occurred."
            }
        });
    }
};
const DnsManagerExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    HOSTNAME_ALREADY_REGISTERED: 'HOSTNAME_ALREADY_REGISTERED',
    HOSTNAME_NOT_REGISTERED: 'HOSTNAME_NOT_REGISTERED',
    INVALID_INPUT_DATA: 'INVALID_INPUT_DATA',
    CLOUDFLARE_CLIENT_NOT_INITIALIZED: 'CLOUDFLARE_CLIENT_NOT_INITIALIZED',
    MULTIPLE_HOSTNAMES_FOUND: 'MULTIPLE_HOSTNAMES_FOUND',
    MISSING_PUBLIC_DOMAIN_URL: 'MISSING_PUBLIC_DOMAIN_URL'
});

//# sourceMappingURL=dns-manager.exception.js.map