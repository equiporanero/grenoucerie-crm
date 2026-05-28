"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DnsManagerExceptionFilter", {
    enumerable: true,
    get: function() {
        return DnsManagerExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _dnsmanagerexception = require("./dns-manager.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DnsManagerExceptionFilter = class DnsManagerExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _dnsmanagerexception.DnsManagerExceptionCode.INTERNAL_SERVER_ERROR:
            case _dnsmanagerexception.DnsManagerExceptionCode.HOSTNAME_ALREADY_REGISTERED:
            case _dnsmanagerexception.DnsManagerExceptionCode.HOSTNAME_NOT_REGISTERED:
            case _dnsmanagerexception.DnsManagerExceptionCode.INVALID_INPUT_DATA:
            case _dnsmanagerexception.DnsManagerExceptionCode.CLOUDFLARE_CLIENT_NOT_INITIALIZED:
            case _dnsmanagerexception.DnsManagerExceptionCode.MULTIPLE_HOSTNAMES_FOUND:
            case _dnsmanagerexception.DnsManagerExceptionCode.MISSING_PUBLIC_DOMAIN_URL:
                throw exception;
            default:
                {
                    (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
};
DnsManagerExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_dnsmanagerexception.DnsManagerException)
], DnsManagerExceptionFilter);

//# sourceMappingURL=dns-manager-exception-filter.js.map