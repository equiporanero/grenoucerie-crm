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
    get NavigationMenuItemException () {
        return NavigationMenuItemException;
    },
    get NavigationMenuItemExceptionCode () {
        return NavigationMenuItemExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var NavigationMenuItemExceptionCode = /*#__PURE__*/ function(NavigationMenuItemExceptionCode) {
    NavigationMenuItemExceptionCode["NAVIGATION_MENU_ITEM_NOT_FOUND"] = "NAVIGATION_MENU_ITEM_NOT_FOUND";
    NavigationMenuItemExceptionCode["INVALID_NAVIGATION_MENU_ITEM_INPUT"] = "INVALID_NAVIGATION_MENU_ITEM_INPUT";
    NavigationMenuItemExceptionCode["CIRCULAR_DEPENDENCY"] = "CIRCULAR_DEPENDENCY";
    NavigationMenuItemExceptionCode["MAX_DEPTH_EXCEEDED"] = "MAX_DEPTH_EXCEEDED";
    return NavigationMenuItemExceptionCode;
}({});
const getNavigationMenuItemExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "NAVIGATION_MENU_ITEM_NOT_FOUND":
            return /*i18n*/ {
                id: "p5qcyl",
                message: "Navigation menu item not found."
            };
        case "INVALID_NAVIGATION_MENU_ITEM_INPUT":
            return /*i18n*/ {
                id: "isIEpm",
                message: "Invalid navigation menu item input."
            };
        case "CIRCULAR_DEPENDENCY":
            return /*i18n*/ {
                id: "/WTI79",
                message: "Circular dependency detected in navigation menu item hierarchy."
            };
        case "MAX_DEPTH_EXCEEDED":
            return /*i18n*/ {
                id: "E+iJnK",
                message: "Navigation menu item hierarchy exceeds maximum depth."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let NavigationMenuItemException = class NavigationMenuItemException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getNavigationMenuItemExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=navigation-menu-item.exception.js.map