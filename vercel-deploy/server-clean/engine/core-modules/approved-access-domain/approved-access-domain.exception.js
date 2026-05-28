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
    get ApprovedAccessDomainException () {
        return ApprovedAccessDomainException;
    },
    get ApprovedAccessDomainExceptionCode () {
        return ApprovedAccessDomainExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var ApprovedAccessDomainExceptionCode = /*#__PURE__*/ function(ApprovedAccessDomainExceptionCode) {
    ApprovedAccessDomainExceptionCode["APPROVED_ACCESS_DOMAIN_NOT_FOUND"] = "APPROVED_ACCESS_DOMAIN_NOT_FOUND";
    ApprovedAccessDomainExceptionCode["APPROVED_ACCESS_DOMAIN_ALREADY_VERIFIED"] = "APPROVED_ACCESS_DOMAIN_ALREADY_VERIFIED";
    ApprovedAccessDomainExceptionCode["APPROVED_ACCESS_DOMAIN_ALREADY_REGISTERED"] = "APPROVED_ACCESS_DOMAIN_ALREADY_REGISTERED";
    ApprovedAccessDomainExceptionCode["APPROVED_ACCESS_DOMAIN_DOES_NOT_MATCH_DOMAIN_EMAIL"] = "APPROVED_ACCESS_DOMAIN_DOES_NOT_MATCH_DOMAIN_EMAIL";
    ApprovedAccessDomainExceptionCode["APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID"] = "APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID";
    ApprovedAccessDomainExceptionCode["APPROVED_ACCESS_DOMAIN_ALREADY_VALIDATED"] = "APPROVED_ACCESS_DOMAIN_ALREADY_VALIDATED";
    ApprovedAccessDomainExceptionCode["APPROVED_ACCESS_DOMAIN_MUST_BE_A_COMPANY_DOMAIN"] = "APPROVED_ACCESS_DOMAIN_MUST_BE_A_COMPANY_DOMAIN";
    return ApprovedAccessDomainExceptionCode;
}({});
const getApprovedAccessDomainExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "APPROVED_ACCESS_DOMAIN_NOT_FOUND":
            return /*i18n*/ {
                id: "paHOg2",
                message: "Approved access domain not found."
            };
        case "APPROVED_ACCESS_DOMAIN_ALREADY_VERIFIED":
            return /*i18n*/ {
                id: "RQbcZC",
                message: "This domain has already been verified."
            };
        case "APPROVED_ACCESS_DOMAIN_ALREADY_REGISTERED":
            return /*i18n*/ {
                id: "s6batt",
                message: "This domain is already registered."
            };
        case "APPROVED_ACCESS_DOMAIN_DOES_NOT_MATCH_DOMAIN_EMAIL":
            return /*i18n*/ {
                id: "22Peto",
                message: "The domain does not match your email domain."
            };
        case "APPROVED_ACCESS_DOMAIN_VALIDATION_TOKEN_INVALID":
            return /*i18n*/ {
                id: "RyBgV/",
                message: "Invalid validation token."
            };
        case "APPROVED_ACCESS_DOMAIN_ALREADY_VALIDATED":
            return /*i18n*/ {
                id: "z7bcpf",
                message: "This domain has already been validated."
            };
        case "APPROVED_ACCESS_DOMAIN_MUST_BE_A_COMPANY_DOMAIN":
            return /*i18n*/ {
                id: "RAkwUZ",
                message: "Please use a company email domain."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ApprovedAccessDomainException = class ApprovedAccessDomainException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getApprovedAccessDomainExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=approved-access-domain.exception.js.map