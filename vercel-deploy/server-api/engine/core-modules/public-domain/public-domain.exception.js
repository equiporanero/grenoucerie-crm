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
    get PublicDomainException () {
        return PublicDomainException;
    },
    get PublicDomainExceptionCode () {
        return PublicDomainExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var PublicDomainExceptionCode = /*#__PURE__*/ function(PublicDomainExceptionCode) {
    PublicDomainExceptionCode["PUBLIC_DOMAIN_ALREADY_REGISTERED"] = "PUBLIC_DOMAIN_ALREADY_REGISTERED";
    PublicDomainExceptionCode["DOMAIN_ALREADY_REGISTERED_AS_CUSTOM_DOMAIN"] = "DOMAIN_ALREADY_REGISTERED_AS_CUSTOM_DOMAIN";
    PublicDomainExceptionCode["PUBLIC_DOMAIN_NOT_FOUND"] = "PUBLIC_DOMAIN_NOT_FOUND";
    PublicDomainExceptionCode["APPLICATION_NOT_FOUND"] = "APPLICATION_NOT_FOUND";
    return PublicDomainExceptionCode;
}({});
const getPublicDomainExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "PUBLIC_DOMAIN_ALREADY_REGISTERED":
            return /*i18n*/ {
                id: "8achGR",
                message: "This public domain is already registered."
            };
        case "DOMAIN_ALREADY_REGISTERED_AS_CUSTOM_DOMAIN":
            return /*i18n*/ {
                id: "3eKCDz",
                message: "This domain is already registered as a custom domain."
            };
        case "PUBLIC_DOMAIN_NOT_FOUND":
            return /*i18n*/ {
                id: "Vr4xfK",
                message: "Public domain not found."
            };
        case "APPLICATION_NOT_FOUND":
            return /*i18n*/ {
                id: "t77Ey9",
                message: "Application not found in this workspace."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let PublicDomainException = class PublicDomainException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getPublicDomainExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=public-domain.exception.js.map