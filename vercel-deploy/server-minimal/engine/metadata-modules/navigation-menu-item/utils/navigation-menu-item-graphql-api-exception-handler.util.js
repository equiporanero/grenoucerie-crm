"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "navigationMenuItemGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return navigationMenuItemGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _navigationmenuitemexception = require("../navigation-menu-item.exception");
const navigationMenuItemGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _navigationmenuitemexception.NavigationMenuItemException) {
        switch(error.code){
            case _navigationmenuitemexception.NavigationMenuItemExceptionCode.NAVIGATION_MENU_ITEM_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _navigationmenuitemexception.NavigationMenuItemExceptionCode.INVALID_NAVIGATION_MENU_ITEM_INPUT:
            case _navigationmenuitemexception.NavigationMenuItemExceptionCode.CIRCULAR_DEPENDENCY:
            case _navigationmenuitemexception.NavigationMenuItemExceptionCode.MAX_DEPTH_EXCEEDED:
                throw new _graphqlerrorsutil.UserInputError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=navigation-menu-item-graphql-api-exception-handler.util.js.map