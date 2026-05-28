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
    get RouteTriggerException () {
        return RouteTriggerException;
    },
    get RouteTriggerExceptionCode () {
        return RouteTriggerExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../../../../utils/custom-exception");
var RouteTriggerExceptionCode = /*#__PURE__*/ function(RouteTriggerExceptionCode) {
    RouteTriggerExceptionCode["WORKSPACE_NOT_FOUND"] = "WORKSPACE_NOT_FOUND";
    RouteTriggerExceptionCode["ROUTE_NOT_FOUND"] = "ROUTE_NOT_FOUND";
    RouteTriggerExceptionCode["TRIGGER_NOT_FOUND"] = "TRIGGER_NOT_FOUND";
    RouteTriggerExceptionCode["LOGIC_FUNCTION_NOT_FOUND"] = "LOGIC_FUNCTION_NOT_FOUND";
    RouteTriggerExceptionCode["ROUTE_ALREADY_EXIST"] = "ROUTE_ALREADY_EXIST";
    RouteTriggerExceptionCode["ROUTE_PATH_ALREADY_EXIST"] = "ROUTE_PATH_ALREADY_EXIST";
    RouteTriggerExceptionCode["FORBIDDEN_EXCEPTION"] = "FORBIDDEN_EXCEPTION";
    RouteTriggerExceptionCode["LOGIC_FUNCTION_EXECUTION_ERROR"] = "LOGIC_FUNCTION_EXECUTION_ERROR";
    RouteTriggerExceptionCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    return RouteTriggerExceptionCode;
}({});
const getRouteTriggerExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "WORKSPACE_NOT_FOUND":
            return /*i18n*/ {
                id: "EhVOPs",
                message: "Workspace not found."
            };
        case "ROUTE_NOT_FOUND":
            return /*i18n*/ {
                id: "F35apa",
                message: "Route not found."
            };
        case "TRIGGER_NOT_FOUND":
            return /*i18n*/ {
                id: "VD8J6l",
                message: "Trigger not found."
            };
        case "LOGIC_FUNCTION_NOT_FOUND":
            return /*i18n*/ {
                id: "6Rq45N",
                message: "Logic function not found."
            };
        case "ROUTE_ALREADY_EXIST":
            return /*i18n*/ {
                id: "AcyaP/",
                message: "Route already exists."
            };
        case "ROUTE_PATH_ALREADY_EXIST":
            return /*i18n*/ {
                id: "mF5BSU",
                message: "Route path already exists."
            };
        case "FORBIDDEN_EXCEPTION":
            return /*i18n*/ {
                id: "q5OVn+",
                message: "You do not have permission to perform this action."
            };
        case "LOGIC_FUNCTION_EXECUTION_ERROR":
            return /*i18n*/ {
                id: "mZvaAV",
                message: "Logic function execution failed."
            };
        case "RATE_LIMIT_EXCEEDED":
            return /*i18n*/ {
                id: "M68C8m",
                message: "Too many requests. Please try again later."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let RouteTriggerException = class RouteTriggerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getRouteTriggerExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=route-trigger.exception.js.map