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
    get ViewFilterGroupException () {
        return ViewFilterGroupException;
    },
    get ViewFilterGroupExceptionCode () {
        return ViewFilterGroupExceptionCode;
    },
    get ViewFilterGroupExceptionMessageKey () {
        return ViewFilterGroupExceptionMessageKey;
    },
    get generateViewFilterGroupExceptionMessage () {
        return generateViewFilterGroupExceptionMessage;
    },
    get generateViewFilterGroupUserFriendlyExceptionMessage () {
        return generateViewFilterGroupUserFriendlyExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
let ViewFilterGroupException = class ViewFilterGroupException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "2rU/w8",
                message: "A view filter group error occurred."
            }
        });
    }
};
var ViewFilterGroupExceptionCode = /*#__PURE__*/ function(ViewFilterGroupExceptionCode) {
    ViewFilterGroupExceptionCode["VIEW_FILTER_GROUP_NOT_FOUND"] = "VIEW_FILTER_GROUP_NOT_FOUND";
    ViewFilterGroupExceptionCode["INVALID_VIEW_FILTER_GROUP_DATA"] = "INVALID_VIEW_FILTER_GROUP_DATA";
    ViewFilterGroupExceptionCode["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    ViewFilterGroupExceptionCode["CIRCULAR_DEPENDENCY"] = "CIRCULAR_DEPENDENCY";
    ViewFilterGroupExceptionCode["MAX_DEPTH_EXCEEDED"] = "MAX_DEPTH_EXCEEDED";
    return ViewFilterGroupExceptionCode;
}({});
var ViewFilterGroupExceptionMessageKey = /*#__PURE__*/ function(ViewFilterGroupExceptionMessageKey) {
    ViewFilterGroupExceptionMessageKey["WORKSPACE_ID_REQUIRED"] = "WORKSPACE_ID_REQUIRED";
    ViewFilterGroupExceptionMessageKey["VIEW_ID_REQUIRED"] = "VIEW_ID_REQUIRED";
    ViewFilterGroupExceptionMessageKey["VIEW_FILTER_GROUP_NOT_FOUND"] = "VIEW_FILTER_GROUP_NOT_FOUND";
    ViewFilterGroupExceptionMessageKey["INVALID_VIEW_FILTER_GROUP_DATA"] = "INVALID_VIEW_FILTER_GROUP_DATA";
    ViewFilterGroupExceptionMessageKey["FIELD_METADATA_ID_REQUIRED"] = "FIELD_METADATA_ID_REQUIRED";
    ViewFilterGroupExceptionMessageKey["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    return ViewFilterGroupExceptionMessageKey;
}({});
const generateViewFilterGroupExceptionMessage = (key, id)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return 'WorkspaceId is required';
        case "VIEW_ID_REQUIRED":
            return 'ViewId is required';
        case "VIEW_FILTER_GROUP_NOT_FOUND":
            return `View filter group${id ? ` (id: ${id})` : ''} not found`;
        case "INVALID_VIEW_FILTER_GROUP_DATA":
            return `Invalid view filter group data${id ? ` for view filter group id: ${id}` : ''}`;
        case "FIELD_METADATA_ID_REQUIRED":
            return 'FieldMetadataId is required';
        case "VIEW_NOT_FOUND":
            return `View${id ? ` (id: ${id})` : ''} not found`;
        default:
            (0, _utils.assertUnreachable)(key);
    }
};
const generateViewFilterGroupUserFriendlyExceptionMessage = (key)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return /*i18n*/ {
                id: "zWj6VZ",
                message: "WorkspaceId is required to create a view filter group."
            };
        case "VIEW_ID_REQUIRED":
            return /*i18n*/ {
                id: "9XMTpT",
                message: "ViewId is required to create a view filter group."
            };
        case "FIELD_METADATA_ID_REQUIRED":
            return /*i18n*/ {
                id: "NTyTR5",
                message: "FieldMetadataId is required to create a view filter group."
            };
    }
};

//# sourceMappingURL=view-filter-group.exception.js.map