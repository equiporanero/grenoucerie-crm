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
    get CommandMenuItemException () {
        return CommandMenuItemException;
    },
    get CommandMenuItemExceptionCode () {
        return CommandMenuItemExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var CommandMenuItemExceptionCode = /*#__PURE__*/ function(CommandMenuItemExceptionCode) {
    CommandMenuItemExceptionCode["COMMAND_MENU_ITEM_NOT_FOUND"] = "COMMAND_MENU_ITEM_NOT_FOUND";
    CommandMenuItemExceptionCode["INVALID_COMMAND_MENU_ITEM_INPUT"] = "INVALID_COMMAND_MENU_ITEM_INPUT";
    CommandMenuItemExceptionCode["WORKFLOW_OR_FRONT_COMPONENT_REQUIRED"] = "WORKFLOW_OR_FRONT_COMPONENT_REQUIRED";
    return CommandMenuItemExceptionCode;
}({});
const getCommandMenuItemExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "COMMAND_MENU_ITEM_NOT_FOUND":
            return /*i18n*/ {
                id: "GQ9t8D",
                message: "Command menu item not found."
            };
        case "INVALID_COMMAND_MENU_ITEM_INPUT":
            return /*i18n*/ {
                id: "lyfeGa",
                message: "Invalid command menu item input."
            };
        case "WORKFLOW_OR_FRONT_COMPONENT_REQUIRED":
            return /*i18n*/ {
                id: "n6jNyT",
                message: "Either workflow version or front component is required."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let CommandMenuItemException = class CommandMenuItemException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getCommandMenuItemExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=command-menu-item.exception.js.map