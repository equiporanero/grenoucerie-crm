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
    get ViewException () {
        return ViewException;
    },
    get ViewExceptionCode () {
        return ViewExceptionCode;
    },
    get ViewExceptionMessageKey () {
        return ViewExceptionMessageKey;
    },
    get generateViewExceptionMessage () {
        return generateViewExceptionMessage;
    },
    get generateViewUserFriendlyExceptionMessage () {
        return generateViewUserFriendlyExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
let ViewException = class ViewException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "qqnpQ9",
                message: "A view error occurred."
            }
        });
    }
};
var ViewExceptionCode = /*#__PURE__*/ function(ViewExceptionCode) {
    ViewExceptionCode["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    ViewExceptionCode["INVALID_VIEW_DATA"] = "INVALID_VIEW_DATA";
    ViewExceptionCode["VIEW_CREATE_PERMISSION_DENIED"] = "VIEW_CREATE_PERMISSION_DENIED";
    ViewExceptionCode["VIEW_MODIFY_PERMISSION_DENIED"] = "VIEW_MODIFY_PERMISSION_DENIED";
    ViewExceptionCode["VIEW_WIDGET_NOT_FOUND"] = "VIEW_WIDGET_NOT_FOUND";
    return ViewExceptionCode;
}({});
var ViewExceptionMessageKey = /*#__PURE__*/ function(ViewExceptionMessageKey) {
    ViewExceptionMessageKey["WORKSPACE_ID_REQUIRED"] = "WORKSPACE_ID_REQUIRED";
    ViewExceptionMessageKey["OBJECT_METADATA_ID_REQUIRED"] = "OBJECT_METADATA_ID_REQUIRED";
    ViewExceptionMessageKey["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    ViewExceptionMessageKey["INVALID_VIEW_DATA"] = "INVALID_VIEW_DATA";
    ViewExceptionMessageKey["VIEW_CREATE_PERMISSION_DENIED"] = "VIEW_CREATE_PERMISSION_DENIED";
    ViewExceptionMessageKey["VIEW_MODIFY_PERMISSION_DENIED"] = "VIEW_MODIFY_PERMISSION_DENIED";
    return ViewExceptionMessageKey;
}({});
const generateViewExceptionMessage = (key, id)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return 'WorkspaceId is required';
        case "OBJECT_METADATA_ID_REQUIRED":
            return 'ObjectMetadataId is required';
        case "VIEW_NOT_FOUND":
            return `View${id ? ` (id: ${id})` : ''} not found`;
        case "INVALID_VIEW_DATA":
            return `Invalid view data${id ? ` for view id: ${id}` : ''}`;
        case "VIEW_CREATE_PERMISSION_DENIED":
            return 'You do not have permission to create workspace-level views';
        case "VIEW_MODIFY_PERMISSION_DENIED":
            return 'You do not have permission to modify this view';
        default:
            (0, _utils.assertUnreachable)(key);
    }
};
const generateViewUserFriendlyExceptionMessage = (key)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return /*i18n*/ {
                id: "jtb/lI",
                message: "WorkspaceId is required to create a view."
            };
        case "OBJECT_METADATA_ID_REQUIRED":
            return /*i18n*/ {
                id: "53pIyA",
                message: "ObjectMetadataId is required to create a view."
            };
        case "VIEW_CREATE_PERMISSION_DENIED":
            return /*i18n*/ {
                id: "M1he8p",
                message: "You don't have permission to create workspace-level views."
            };
        case "VIEW_MODIFY_PERMISSION_DENIED":
            return /*i18n*/ {
                id: "QmL9y9",
                message: "You don't have permission to modify this view."
            };
    }
};

//# sourceMappingURL=view.exception.js.map