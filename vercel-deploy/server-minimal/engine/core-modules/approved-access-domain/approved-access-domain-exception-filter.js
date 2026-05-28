"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApprovedAccessDomainExceptionFilter", {
    enumerable: true,
    get: function() {
        return ApprovedAccessDomainExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _approvedaccessdomainexception = require("./approved-access-domain.exception");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApprovedAccessDomainExceptionFilter = class ApprovedAccessDomainExceptionFilter {
    catch(exception) {
        switch(exception.code){
            case _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_NOT_FOUND:
            case _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_ALREADY_VERIFIED:
            case _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_ALREADY_REGISTERED:
            case _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_DOES_NOT_MATCH_DOMAIN_EMAIL:
            case _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID:
            case _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_ALREADY_VALIDATED:
            case _approvedaccessdomainexception.ApprovedAccessDomainExceptionCode.APPROVED_ACCESS_DOMAIN_MUST_BE_A_COMPANY_DOMAIN:
                throw new _graphqlerrorsutil.ForbiddenError(exception);
            default:
                {
                    (0, _utils.assertUnreachable)(exception.code);
                }
        }
    }
};
ApprovedAccessDomainExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_approvedaccessdomainexception.ApprovedAccessDomainException)
], ApprovedAccessDomainExceptionFilter);

//# sourceMappingURL=approved-access-domain-exception-filter.js.map