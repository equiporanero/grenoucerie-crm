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
    get PageLayoutException () {
        return PageLayoutException;
    },
    get PageLayoutExceptionCode () {
        return PageLayoutExceptionCode;
    },
    get PageLayoutExceptionMessageKey () {
        return PageLayoutExceptionMessageKey;
    },
    get generatePageLayoutExceptionMessage () {
        return generatePageLayoutExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var PageLayoutExceptionCode = /*#__PURE__*/ function(PageLayoutExceptionCode) {
    PageLayoutExceptionCode["PAGE_LAYOUT_NOT_FOUND"] = "PAGE_LAYOUT_NOT_FOUND";
    PageLayoutExceptionCode["INVALID_PAGE_LAYOUT_DATA"] = "INVALID_PAGE_LAYOUT_DATA";
    PageLayoutExceptionCode["TAB_NOT_FOUND_FOR_WIDGET_DUPLICATION"] = "TAB_NOT_FOUND_FOR_WIDGET_DUPLICATION";
    return PageLayoutExceptionCode;
}({});
var PageLayoutExceptionMessageKey = /*#__PURE__*/ function(PageLayoutExceptionMessageKey) {
    PageLayoutExceptionMessageKey["PAGE_LAYOUT_NOT_FOUND"] = "PAGE_LAYOUT_NOT_FOUND";
    PageLayoutExceptionMessageKey["NAME_REQUIRED"] = "NAME_REQUIRED";
    PageLayoutExceptionMessageKey["TAB_NOT_FOUND_FOR_WIDGET_DUPLICATION"] = "TAB_NOT_FOUND_FOR_WIDGET_DUPLICATION";
    return PageLayoutExceptionMessageKey;
}({});
const getPageLayoutExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "PAGE_LAYOUT_NOT_FOUND":
            return /*i18n*/ {
                id: "C4+axZ",
                message: "Page layout not found."
            };
        case "INVALID_PAGE_LAYOUT_DATA":
            return /*i18n*/ {
                id: "LM08/z",
                message: "Invalid page layout data."
            };
        case "TAB_NOT_FOUND_FOR_WIDGET_DUPLICATION":
            return /*i18n*/ {
                id: "8UWeLh",
                message: "Tab not found for widget duplication."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let PageLayoutException = class PageLayoutException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getPageLayoutExceptionUserFriendlyMessage(code)
        });
    }
};
const generatePageLayoutExceptionMessage = (key, value)=>{
    switch(key){
        case "PAGE_LAYOUT_NOT_FOUND":
            return `Page layout with ID "${value}" not found`;
        case "NAME_REQUIRED":
            return 'Page layout name is required';
        case "TAB_NOT_FOUND_FOR_WIDGET_DUPLICATION":
            return `Failed to duplicate widget: no matching tab found for original tab ID "${value}"`;
        default:
            (0, _utils.assertUnreachable)(key);
    }
};

//# sourceMappingURL=page-layout.exception.js.map