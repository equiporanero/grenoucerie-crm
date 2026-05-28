"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dnsManagerValidator", {
    enumerable: true,
    get: function() {
        return dnsManagerValidator;
    }
});
const _dnsmanagerexception = require("../exceptions/dns-manager.exception");
const isCloudflareInstanceDefined = (cloudflareInstance)=>{
    if (!cloudflareInstance) {
        throw new _dnsmanagerexception.DnsManagerException('Cloudflare instance is not defined', _dnsmanagerexception.DnsManagerExceptionCode.CLOUDFLARE_CLIENT_NOT_INITIALIZED, {
            userFriendlyMessage: /*i18n*/ {
                id: "EzGlkq",
                message: "Environment variable CLOUDFLARE_API_KEY must be defined to use this feature."
            }
        });
    }
};
const dnsManagerValidator = {
    isCloudflareInstanceDefined
};

//# sourceMappingURL=dns-manager.validate.js.map