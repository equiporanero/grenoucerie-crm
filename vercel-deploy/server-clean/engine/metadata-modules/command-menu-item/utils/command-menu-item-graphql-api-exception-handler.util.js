"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "commandMenuItemGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return commandMenuItemGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _commandmenuitemexception = require("../command-menu-item.exception");
const commandMenuItemGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _commandmenuitemexception.CommandMenuItemException) {
        switch(error.code){
            case _commandmenuitemexception.CommandMenuItemExceptionCode.COMMAND_MENU_ITEM_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _commandmenuitemexception.CommandMenuItemExceptionCode.INVALID_COMMAND_MENU_ITEM_INPUT:
            case _commandmenuitemexception.CommandMenuItemExceptionCode.WORKFLOW_OR_FRONT_COMPONENT_REQUIRED:
                throw new _graphqlerrorsutil.UserInputError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=command-menu-item-graphql-api-exception-handler.util.js.map