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
    get FrontComponentException () {
        return FrontComponentException;
    },
    get FrontComponentExceptionCode () {
        return FrontComponentExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var FrontComponentExceptionCode = /*#__PURE__*/ function(FrontComponentExceptionCode) {
    FrontComponentExceptionCode["FRONT_COMPONENT_NOT_FOUND"] = "FRONT_COMPONENT_NOT_FOUND";
    FrontComponentExceptionCode["FRONT_COMPONENT_ALREADY_EXISTS"] = "FRONT_COMPONENT_ALREADY_EXISTS";
    FrontComponentExceptionCode["INVALID_FRONT_COMPONENT_INPUT"] = "INVALID_FRONT_COMPONENT_INPUT";
    FrontComponentExceptionCode["FRONT_COMPONENT_CREATE_FAILED"] = "FRONT_COMPONENT_CREATE_FAILED";
    FrontComponentExceptionCode["FRONT_COMPONENT_NOT_READY"] = "FRONT_COMPONENT_NOT_READY";
    return FrontComponentExceptionCode;
}({});
const getFrontComponentExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "FRONT_COMPONENT_NOT_FOUND":
            return /*i18n*/ {
                id: "J+VVwG",
                message: "Front component not found."
            };
        case "FRONT_COMPONENT_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "D0Kuk1",
                message: "A front component with this name already exists."
            };
        case "INVALID_FRONT_COMPONENT_INPUT":
            return /*i18n*/ {
                id: "rFH0az",
                message: "Invalid front component input."
            };
        case "FRONT_COMPONENT_CREATE_FAILED":
            return /*i18n*/ {
                id: "RjuW0j",
                message: "Failed to create front component."
            };
        case "FRONT_COMPONENT_NOT_READY":
            return /*i18n*/ {
                id: "Wed+Kp",
                message: "Front component is not ready."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let FrontComponentException = class FrontComponentException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getFrontComponentExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=front-component.exception.js.map