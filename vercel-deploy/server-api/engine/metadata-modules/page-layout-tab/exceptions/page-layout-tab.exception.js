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
    get PageLayoutTabException () {
        return PageLayoutTabException;
    },
    get PageLayoutTabExceptionCode () {
        return PageLayoutTabExceptionCode;
    },
    get PageLayoutTabExceptionMessageKey () {
        return PageLayoutTabExceptionMessageKey;
    },
    get generatePageLayoutTabExceptionMessage () {
        return generatePageLayoutTabExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var PageLayoutTabExceptionCode = /*#__PURE__*/ function(PageLayoutTabExceptionCode) {
    PageLayoutTabExceptionCode["PAGE_LAYOUT_TAB_NOT_FOUND"] = "PAGE_LAYOUT_TAB_NOT_FOUND";
    PageLayoutTabExceptionCode["INVALID_PAGE_LAYOUT_TAB_DATA"] = "INVALID_PAGE_LAYOUT_TAB_DATA";
    return PageLayoutTabExceptionCode;
}({});
var PageLayoutTabExceptionMessageKey = /*#__PURE__*/ function(PageLayoutTabExceptionMessageKey) {
    PageLayoutTabExceptionMessageKey["PAGE_LAYOUT_TAB_NOT_FOUND"] = "PAGE_LAYOUT_TAB_NOT_FOUND";
    PageLayoutTabExceptionMessageKey["TITLE_REQUIRED"] = "TITLE_REQUIRED";
    PageLayoutTabExceptionMessageKey["PAGE_LAYOUT_ID_REQUIRED"] = "PAGE_LAYOUT_ID_REQUIRED";
    PageLayoutTabExceptionMessageKey["PAGE_LAYOUT_NOT_FOUND"] = "PAGE_LAYOUT_NOT_FOUND";
    PageLayoutTabExceptionMessageKey["PAGE_LAYOUT_TAB_NOT_DELETED"] = "PAGE_LAYOUT_TAB_NOT_DELETED";
    return PageLayoutTabExceptionMessageKey;
}({});
const getPageLayoutTabExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "PAGE_LAYOUT_TAB_NOT_FOUND":
            return /*i18n*/ {
                id: "pOITp3",
                message: "Page layout tab not found."
            };
        case "INVALID_PAGE_LAYOUT_TAB_DATA":
            return /*i18n*/ {
                id: "5qj/ud",
                message: "Invalid page layout tab data."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let PageLayoutTabException = class PageLayoutTabException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getPageLayoutTabExceptionUserFriendlyMessage(code)
        });
    }
};
const generatePageLayoutTabExceptionMessage = (key, value)=>{
    switch(key){
        case "PAGE_LAYOUT_TAB_NOT_FOUND":
            return `Page layout tab with ID "${value}" not found`;
        case "TITLE_REQUIRED":
            return 'Page layout tab title is required';
        case "PAGE_LAYOUT_ID_REQUIRED":
            return 'Page layout ID is required';
        case "PAGE_LAYOUT_NOT_FOUND":
            return 'Page layout not found';
        case "PAGE_LAYOUT_TAB_NOT_DELETED":
            return 'Page layout tab is not deleted and cannot be restored';
        default:
            (0, _utils.assertUnreachable)(key);
    }
};

//# sourceMappingURL=page-layout-tab.exception.js.map