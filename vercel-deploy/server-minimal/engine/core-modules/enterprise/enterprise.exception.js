/* @license Enterprise */ "use strict";
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
    get EnterpriseException () {
        return EnterpriseException;
    },
    get EnterpriseExceptionCode () {
        return EnterpriseExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var EnterpriseExceptionCode = /*#__PURE__*/ function(EnterpriseExceptionCode) {
    EnterpriseExceptionCode["INVALID_ENTERPRISE_KEY"] = "INVALID_ENTERPRISE_KEY";
    EnterpriseExceptionCode["CONFIG_VARIABLES_IN_DB_DISABLED"] = "CONFIG_VARIABLES_IN_DB_DISABLED";
    return EnterpriseExceptionCode;
}({});
const getEnterpriseExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_ENTERPRISE_KEY":
            return /*i18n*/ {
                id: "pOHI+b",
                message: "Invalid enterprise key."
            };
        case "CONFIG_VARIABLES_IN_DB_DISABLED":
            return /*i18n*/ {
                id: "1bOGPq",
                message: "IS_CONFIG_VARIABLES_IN_DB_ENABLED is false on your server. Please add ENTERPRISE_KEY to your .env file manually."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let EnterpriseException = class EnterpriseException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getEnterpriseExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=enterprise.exception.js.map