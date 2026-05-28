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
    get ViewFilterException () {
        return ViewFilterException;
    },
    get ViewFilterExceptionCode () {
        return ViewFilterExceptionCode;
    },
    get ViewFilterExceptionMessageKey () {
        return ViewFilterExceptionMessageKey;
    },
    get generateViewFilterExceptionMessage () {
        return generateViewFilterExceptionMessage;
    },
    get generateViewFilterUserFriendlyExceptionMessage () {
        return generateViewFilterUserFriendlyExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
let ViewFilterException = class ViewFilterException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "Rth998",
                message: "A view filter error occurred."
            }
        });
    }
};
var ViewFilterExceptionCode = /*#__PURE__*/ function(ViewFilterExceptionCode) {
    ViewFilterExceptionCode["VIEW_FILTER_NOT_FOUND"] = "VIEW_FILTER_NOT_FOUND";
    ViewFilterExceptionCode["INVALID_VIEW_FILTER_DATA"] = "INVALID_VIEW_FILTER_DATA";
    ViewFilterExceptionCode["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    return ViewFilterExceptionCode;
}({});
var ViewFilterExceptionMessageKey = /*#__PURE__*/ function(ViewFilterExceptionMessageKey) {
    ViewFilterExceptionMessageKey["WORKSPACE_ID_REQUIRED"] = "WORKSPACE_ID_REQUIRED";
    ViewFilterExceptionMessageKey["VIEW_ID_REQUIRED"] = "VIEW_ID_REQUIRED";
    ViewFilterExceptionMessageKey["VIEW_FILTER_NOT_FOUND"] = "VIEW_FILTER_NOT_FOUND";
    ViewFilterExceptionMessageKey["INVALID_VIEW_FILTER_DATA"] = "INVALID_VIEW_FILTER_DATA";
    ViewFilterExceptionMessageKey["FIELD_METADATA_ID_REQUIRED"] = "FIELD_METADATA_ID_REQUIRED";
    ViewFilterExceptionMessageKey["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    return ViewFilterExceptionMessageKey;
}({});
const generateViewFilterExceptionMessage = (key, id)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return 'WorkspaceId is required';
        case "VIEW_ID_REQUIRED":
            return 'ViewId is required';
        case "VIEW_FILTER_NOT_FOUND":
            return `View filter${id ? ` (id: ${id})` : ''} not found`;
        case "INVALID_VIEW_FILTER_DATA":
            return `Invalid view filter data${id ? ` for view filter id: ${id}` : ''}`;
        case "FIELD_METADATA_ID_REQUIRED":
            return 'FieldMetadataId is required';
        case "VIEW_NOT_FOUND":
            return `View${id ? ` (id: ${id})` : ''} not found`;
        default:
            (0, _utils.assertUnreachable)(key);
    }
};
const generateViewFilterUserFriendlyExceptionMessage = (key)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return /*i18n*/ {
                id: "jQMXtD",
                message: "WorkspaceId is required to create a view filter."
            };
        case "VIEW_ID_REQUIRED":
            return /*i18n*/ {
                id: "pCCxli",
                message: "ViewId is required to create a view filter."
            };
        case "FIELD_METADATA_ID_REQUIRED":
            return /*i18n*/ {
                id: "Ya6oU7",
                message: "FieldMetadataId is required to create a view filter."
            };
    }
};

//# sourceMappingURL=view-filter.exception.js.map