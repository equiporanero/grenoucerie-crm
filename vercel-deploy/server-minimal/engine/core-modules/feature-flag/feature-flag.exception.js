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
    get FeatureFlagException () {
        return FeatureFlagException;
    },
    get FeatureFlagExceptionCode () {
        return FeatureFlagExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var FeatureFlagExceptionCode = /*#__PURE__*/ function(FeatureFlagExceptionCode) {
    FeatureFlagExceptionCode["INVALID_FEATURE_FLAG_KEY"] = "INVALID_FEATURE_FLAG_KEY";
    return FeatureFlagExceptionCode;
}({});
const getFeatureFlagExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_FEATURE_FLAG_KEY":
            return /*i18n*/ {
                id: "YtFgT4",
                message: "Invalid feature flag key."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let FeatureFlagException = class FeatureFlagException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getFeatureFlagExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=feature-flag.exception.js.map