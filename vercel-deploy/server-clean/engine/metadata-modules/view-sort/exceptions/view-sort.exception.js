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
    get ViewSortException () {
        return ViewSortException;
    },
    get ViewSortExceptionCode () {
        return ViewSortExceptionCode;
    },
    get ViewSortExceptionMessageKey () {
        return ViewSortExceptionMessageKey;
    },
    get generateViewSortExceptionMessage () {
        return generateViewSortExceptionMessage;
    },
    get generateViewSortUserFriendlyExceptionMessage () {
        return generateViewSortUserFriendlyExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
let ViewSortException = class ViewSortException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "gHC5sU",
                message: "A view sort error occurred."
            }
        });
    }
};
var ViewSortExceptionCode = /*#__PURE__*/ function(ViewSortExceptionCode) {
    ViewSortExceptionCode["VIEW_SORT_NOT_FOUND"] = "VIEW_SORT_NOT_FOUND";
    ViewSortExceptionCode["INVALID_VIEW_SORT_DATA"] = "INVALID_VIEW_SORT_DATA";
    ViewSortExceptionCode["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    return ViewSortExceptionCode;
}({});
var ViewSortExceptionMessageKey = /*#__PURE__*/ function(ViewSortExceptionMessageKey) {
    ViewSortExceptionMessageKey["WORKSPACE_ID_REQUIRED"] = "WORKSPACE_ID_REQUIRED";
    ViewSortExceptionMessageKey["VIEW_ID_REQUIRED"] = "VIEW_ID_REQUIRED";
    ViewSortExceptionMessageKey["VIEW_SORT_NOT_FOUND"] = "VIEW_SORT_NOT_FOUND";
    ViewSortExceptionMessageKey["INVALID_VIEW_SORT_DATA"] = "INVALID_VIEW_SORT_DATA";
    ViewSortExceptionMessageKey["FIELD_METADATA_ID_REQUIRED"] = "FIELD_METADATA_ID_REQUIRED";
    ViewSortExceptionMessageKey["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    return ViewSortExceptionMessageKey;
}({});
const generateViewSortExceptionMessage = (key, id)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return 'WorkspaceId is required';
        case "VIEW_ID_REQUIRED":
            return 'ViewId is required';
        case "VIEW_SORT_NOT_FOUND":
            return `View sort${id ? ` (id: ${id})` : ''} not found`;
        case "INVALID_VIEW_SORT_DATA":
            return `Invalid view sort data${id ? ` for view sort id: ${id}` : ''}`;
        case "FIELD_METADATA_ID_REQUIRED":
            return 'FieldMetadataId is required';
        case "VIEW_NOT_FOUND":
            return `View${id ? ` (id: ${id})` : ''} not found`;
        default:
            (0, _utils.assertUnreachable)(key);
    }
};
const generateViewSortUserFriendlyExceptionMessage = (key)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return /*i18n*/ {
                id: "hU1QaN",
                message: "WorkspaceId is required to create a view sort."
            };
        case "VIEW_ID_REQUIRED":
            return /*i18n*/ {
                id: "uGUFcy",
                message: "ViewId is required to create a view sort."
            };
        case "FIELD_METADATA_ID_REQUIRED":
            return /*i18n*/ {
                id: "snEXuU",
                message: "FieldMetadataId is required to create a view sort."
            };
    }
};

//# sourceMappingURL=view-sort.exception.js.map