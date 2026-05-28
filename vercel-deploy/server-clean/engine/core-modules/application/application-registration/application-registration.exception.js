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
    get ApplicationRegistrationException () {
        return ApplicationRegistrationException;
    },
    get ApplicationRegistrationExceptionCode () {
        return ApplicationRegistrationExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var ApplicationRegistrationExceptionCode = /*#__PURE__*/ function(ApplicationRegistrationExceptionCode) {
    ApplicationRegistrationExceptionCode["APPLICATION_REGISTRATION_NOT_FOUND"] = "APPLICATION_REGISTRATION_NOT_FOUND";
    ApplicationRegistrationExceptionCode["UNIVERSAL_IDENTIFIER_ALREADY_CLAIMED"] = "UNIVERSAL_IDENTIFIER_ALREADY_CLAIMED";
    ApplicationRegistrationExceptionCode["INVALID_SCOPE"] = "INVALID_SCOPE";
    ApplicationRegistrationExceptionCode["INVALID_REDIRECT_URI"] = "INVALID_REDIRECT_URI";
    ApplicationRegistrationExceptionCode["INVALID_INPUT"] = "INVALID_INPUT";
    ApplicationRegistrationExceptionCode["SOURCE_CHANNEL_MISMATCH"] = "SOURCE_CHANNEL_MISMATCH";
    ApplicationRegistrationExceptionCode["VARIABLE_NOT_FOUND"] = "VARIABLE_NOT_FOUND";
    ApplicationRegistrationExceptionCode["VERSION_ALREADY_EXISTS"] = "VERSION_ALREADY_EXISTS";
    ApplicationRegistrationExceptionCode["SERVER_VERSION_INCOMPATIBLE"] = "SERVER_VERSION_INCOMPATIBLE";
    ApplicationRegistrationExceptionCode["INVALID_APP_ENGINE_REQUIREMENT"] = "INVALID_APP_ENGINE_REQUIREMENT";
    ApplicationRegistrationExceptionCode["INVALID_SERVER_VERSION"] = "INVALID_SERVER_VERSION";
    return ApplicationRegistrationExceptionCode;
}({});
const getExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "APPLICATION_REGISTRATION_NOT_FOUND":
            return /*i18n*/ {
                id: "DE/icK",
                message: "Application registration not found."
            };
        case "UNIVERSAL_IDENTIFIER_ALREADY_CLAIMED":
            return /*i18n*/ {
                id: "nZbise",
                message: "This universal identifier is already claimed by another registration."
            };
        case "INVALID_SCOPE":
            return /*i18n*/ {
                id: "PUBUbK",
                message: "One or more requested scopes are invalid."
            };
        case "INVALID_REDIRECT_URI":
            return /*i18n*/ {
                id: "kx632Q",
                message: "One or more redirect URIs are invalid."
            };
        case "INVALID_INPUT":
            return /*i18n*/ {
                id: "xfXYBX",
                message: "Invalid input for application registration."
            };
        case "SOURCE_CHANNEL_MISMATCH":
            return /*i18n*/ {
                id: "MQn14a",
                message: "The app source channel does not match the expected type."
            };
        case "VARIABLE_NOT_FOUND":
            return /*i18n*/ {
                id: "eiOt+9",
                message: "Application registration variable not found."
            };
        case "VERSION_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "Y5Fzhi",
                message: "This version is not higher than the currently deployed version. Please bump the version in package.json before deploying again."
            };
        case "SERVER_VERSION_INCOMPATIBLE":
            return /*i18n*/ {
                id: "zISk4k",
                message: "This app requires a newer version of the Twenty server. Please upgrade your server or use a compatible app version."
            };
        case "INVALID_APP_ENGINE_REQUIREMENT":
            return /*i18n*/ {
                id: "Z4AMcp",
                message: "The app manifest declares an invalid server version requirement."
            };
        case "INVALID_SERVER_VERSION":
            return /*i18n*/ {
                id: "6N5Pv5",
                message: "The server's APP_VERSION is not a valid semver version. Self-hosted instances must configure a valid APP_VERSION."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ApplicationRegistrationException = class ApplicationRegistrationException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=application-registration.exception.js.map