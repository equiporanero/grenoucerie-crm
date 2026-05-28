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
    get ViewFieldException () {
        return ViewFieldException;
    },
    get ViewFieldExceptionCode () {
        return ViewFieldExceptionCode;
    },
    get ViewFieldExceptionMessageKey () {
        return ViewFieldExceptionMessageKey;
    },
    get generateViewFieldExceptionMessage () {
        return generateViewFieldExceptionMessage;
    },
    get generateViewFieldUserFriendlyExceptionMessage () {
        return generateViewFieldUserFriendlyExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
let ViewFieldException = class ViewFieldException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "NsB3MF",
                message: "A view field error occurred."
            }
        });
    }
};
var ViewFieldExceptionCode = /*#__PURE__*/ function(ViewFieldExceptionCode) {
    ViewFieldExceptionCode["VIEW_FIELD_NOT_FOUND"] = "VIEW_FIELD_NOT_FOUND";
    ViewFieldExceptionCode["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    ViewFieldExceptionCode["INVALID_VIEW_FIELD_DATA"] = "INVALID_VIEW_FIELD_DATA";
    return ViewFieldExceptionCode;
}({});
var ViewFieldExceptionMessageKey = /*#__PURE__*/ function(ViewFieldExceptionMessageKey) {
    ViewFieldExceptionMessageKey["WORKSPACE_ID_REQUIRED"] = "WORKSPACE_ID_REQUIRED";
    ViewFieldExceptionMessageKey["VIEW_ID_REQUIRED"] = "VIEW_ID_REQUIRED";
    ViewFieldExceptionMessageKey["VIEW_FIELD_NOT_FOUND"] = "VIEW_FIELD_NOT_FOUND";
    ViewFieldExceptionMessageKey["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    ViewFieldExceptionMessageKey["INVALID_VIEW_FIELD_DATA"] = "INVALID_VIEW_FIELD_DATA";
    ViewFieldExceptionMessageKey["FIELD_METADATA_ID_REQUIRED"] = "FIELD_METADATA_ID_REQUIRED";
    ViewFieldExceptionMessageKey["VIEW_FIELD_ALREADY_EXISTS"] = "VIEW_FIELD_ALREADY_EXISTS";
    return ViewFieldExceptionMessageKey;
}({});
const generateViewFieldExceptionMessage = (key, id)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return 'WorkspaceId is required';
        case "VIEW_ID_REQUIRED":
            return 'ViewId is required';
        case "VIEW_FIELD_NOT_FOUND":
            return `View field${id ? ` (id: ${id})` : ''} not found`;
        case "VIEW_NOT_FOUND":
            return `View${id ? ` (id: ${id})` : ''} not found`;
        case "INVALID_VIEW_FIELD_DATA":
            return `Invalid view field data${id ? ` for view field id: ${id}` : ''}`;
        case "FIELD_METADATA_ID_REQUIRED":
            return 'FieldMetadataId is required';
        case "VIEW_FIELD_ALREADY_EXISTS":
            return 'View field already exists';
        default:
            (0, _utils.assertUnreachable)(key);
    }
};
const generateViewFieldUserFriendlyExceptionMessage = (key)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return /*i18n*/ {
                id: "kjLpTn",
                message: "WorkspaceId is required to create a view field."
            };
        case "VIEW_ID_REQUIRED":
            return /*i18n*/ {
                id: "l88nXn",
                message: "ViewId is required to create a view field."
            };
        case "FIELD_METADATA_ID_REQUIRED":
            return /*i18n*/ {
                id: "Sof2+k",
                message: "FieldMetadataId is required to create a view field."
            };
        case "VIEW_FIELD_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "Xm6R6B",
                message: "View field already exists."
            };
    }
};

//# sourceMappingURL=view-field.exception.js.map