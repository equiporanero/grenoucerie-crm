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
    get ConfigVariableException () {
        return ConfigVariableException;
    },
    get ConfigVariableExceptionCode () {
        return ConfigVariableExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var ConfigVariableExceptionCode = /*#__PURE__*/ function(ConfigVariableExceptionCode) {
    ConfigVariableExceptionCode["DATABASE_CONFIG_DISABLED"] = "DATABASE_CONFIG_DISABLED";
    ConfigVariableExceptionCode["ENVIRONMENT_ONLY_VARIABLE"] = "ENVIRONMENT_ONLY_VARIABLE";
    ConfigVariableExceptionCode["VARIABLE_NOT_FOUND"] = "VARIABLE_NOT_FOUND";
    ConfigVariableExceptionCode["VALIDATION_FAILED"] = "VALIDATION_FAILED";
    ConfigVariableExceptionCode["UNSUPPORTED_CONFIG_TYPE"] = "UNSUPPORTED_CONFIG_TYPE";
    ConfigVariableExceptionCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    return ConfigVariableExceptionCode;
}({});
const getConfigVariableExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "DATABASE_CONFIG_DISABLED":
            return /*i18n*/ {
                id: "NhQiQx",
                message: "Database configuration is disabled."
            };
        case "ENVIRONMENT_ONLY_VARIABLE":
            return /*i18n*/ {
                id: "LtsBYU",
                message: "This variable can only be set via environment."
            };
        case "VARIABLE_NOT_FOUND":
            return /*i18n*/ {
                id: "g/dGHV",
                message: "Configuration variable not found."
            };
        case "VALIDATION_FAILED":
            return /*i18n*/ {
                id: "n8EtHV",
                message: "Configuration validation failed."
            };
        case "UNSUPPORTED_CONFIG_TYPE":
            return /*i18n*/ {
                id: "1r7kLp",
                message: "Unsupported configuration type."
            };
        case "INTERNAL_ERROR":
            return /*i18n*/ {
                id: "acTNEg",
                message: "An unexpected configuration error occurred."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let ConfigVariableException = class ConfigVariableException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getConfigVariableExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=twenty-config.exception.js.map