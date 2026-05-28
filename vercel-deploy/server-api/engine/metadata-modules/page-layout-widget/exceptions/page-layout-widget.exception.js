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
    get PageLayoutWidgetException () {
        return PageLayoutWidgetException;
    },
    get PageLayoutWidgetExceptionCode () {
        return PageLayoutWidgetExceptionCode;
    },
    get PageLayoutWidgetExceptionMessageKey () {
        return PageLayoutWidgetExceptionMessageKey;
    },
    get generatePageLayoutWidgetExceptionMessage () {
        return generatePageLayoutWidgetExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var PageLayoutWidgetExceptionCode = /*#__PURE__*/ function(PageLayoutWidgetExceptionCode) {
    PageLayoutWidgetExceptionCode["PAGE_LAYOUT_WIDGET_NOT_FOUND"] = "PAGE_LAYOUT_WIDGET_NOT_FOUND";
    PageLayoutWidgetExceptionCode["INVALID_PAGE_LAYOUT_WIDGET_DATA"] = "INVALID_PAGE_LAYOUT_WIDGET_DATA";
    return PageLayoutWidgetExceptionCode;
}({});
var PageLayoutWidgetExceptionMessageKey = /*#__PURE__*/ function(PageLayoutWidgetExceptionMessageKey) {
    PageLayoutWidgetExceptionMessageKey["PAGE_LAYOUT_WIDGET_NOT_FOUND"] = "PAGE_LAYOUT_WIDGET_NOT_FOUND";
    PageLayoutWidgetExceptionMessageKey["TITLE_REQUIRED"] = "TITLE_REQUIRED";
    PageLayoutWidgetExceptionMessageKey["PAGE_LAYOUT_TAB_ID_REQUIRED"] = "PAGE_LAYOUT_TAB_ID_REQUIRED";
    PageLayoutWidgetExceptionMessageKey["PAGE_LAYOUT_TAB_NOT_FOUND"] = "PAGE_LAYOUT_TAB_NOT_FOUND";
    PageLayoutWidgetExceptionMessageKey["PAGE_LAYOUT_WIDGET_NOT_DELETED"] = "PAGE_LAYOUT_WIDGET_NOT_DELETED";
    PageLayoutWidgetExceptionMessageKey["GRID_POSITION_REQUIRED"] = "GRID_POSITION_REQUIRED";
    PageLayoutWidgetExceptionMessageKey["INVALID_WIDGET_POSITION"] = "INVALID_WIDGET_POSITION";
    PageLayoutWidgetExceptionMessageKey["INVALID_WIDGET_CONFIGURATION"] = "INVALID_WIDGET_CONFIGURATION";
    return PageLayoutWidgetExceptionMessageKey;
}({});
const getPageLayoutWidgetExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "PAGE_LAYOUT_WIDGET_NOT_FOUND":
            return /*i18n*/ {
                id: "GcU04G",
                message: "Page layout widget not found."
            };
        case "INVALID_PAGE_LAYOUT_WIDGET_DATA":
            return /*i18n*/ {
                id: "mgipnr",
                message: "Invalid page layout widget data."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let PageLayoutWidgetException = class PageLayoutWidgetException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getPageLayoutWidgetExceptionUserFriendlyMessage(code)
        });
    }
};
const generatePageLayoutWidgetExceptionMessage = (key, widgetTitle, widgetType, detailedError)=>{
    switch(key){
        case "PAGE_LAYOUT_WIDGET_NOT_FOUND":
            return `Page layout widget with ID "${widgetTitle}" not found`;
        case "TITLE_REQUIRED":
            return 'Page layout widget title is required';
        case "PAGE_LAYOUT_TAB_ID_REQUIRED":
            return 'Page layout tab ID is required';
        case "PAGE_LAYOUT_TAB_NOT_FOUND":
            return 'Page layout tab not found';
        case "PAGE_LAYOUT_WIDGET_NOT_DELETED":
            return 'Page layout widget is not deleted and cannot be restored';
        case "GRID_POSITION_REQUIRED":
            return 'Grid position is required';
        case "INVALID_WIDGET_POSITION":
            if (widgetTitle && detailedError) {
                return `Invalid widget position for widget "${widgetTitle}": ${detailedError}`;
            }
            if (detailedError) {
                return `Invalid widget position: ${detailedError}`;
            }
            return 'Invalid widget position';
        case "INVALID_WIDGET_CONFIGURATION":
            if (widgetTitle && widgetType && detailedError) {
                return `Invalid configuration for widget "${widgetTitle}" of type ${widgetType}: ${detailedError}`;
            }
            if (widgetTitle && widgetType) {
                return `Invalid configuration for widget "${widgetTitle}" of type ${widgetType}`;
            }
            if (widgetType) {
                return `Invalid configuration for widget type ${widgetType}`;
            }
            return 'Invalid widget configuration';
        default:
            (0, _utils.assertUnreachable)(key);
    }
};

//# sourceMappingURL=page-layout-widget.exception.js.map