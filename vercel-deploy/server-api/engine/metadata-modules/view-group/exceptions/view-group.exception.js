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
    get ViewGroupException () {
        return ViewGroupException;
    },
    get ViewGroupExceptionCode () {
        return ViewGroupExceptionCode;
    },
    get ViewGroupExceptionMessageKey () {
        return ViewGroupExceptionMessageKey;
    },
    get generateViewGroupExceptionMessage () {
        return generateViewGroupExceptionMessage;
    },
    get generateViewGroupUserFriendlyExceptionMessage () {
        return generateViewGroupUserFriendlyExceptionMessage;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
let ViewGroupException = class ViewGroupException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "znJ6EA",
                message: "A view group error occurred."
            }
        });
    }
};
var ViewGroupExceptionCode = /*#__PURE__*/ function(ViewGroupExceptionCode) {
    ViewGroupExceptionCode["VIEW_GROUP_NOT_FOUND"] = "VIEW_GROUP_NOT_FOUND";
    ViewGroupExceptionCode["INVALID_VIEW_GROUP_DATA"] = "INVALID_VIEW_GROUP_DATA";
    ViewGroupExceptionCode["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    ViewGroupExceptionCode["MISSING_MAIN_GROUP_BY_FIELD_METADATA_ID"] = "MISSING_MAIN_GROUP_BY_FIELD_METADATA_ID";
    return ViewGroupExceptionCode;
}({});
var ViewGroupExceptionMessageKey = /*#__PURE__*/ function(ViewGroupExceptionMessageKey) {
    ViewGroupExceptionMessageKey["WORKSPACE_ID_REQUIRED"] = "WORKSPACE_ID_REQUIRED";
    ViewGroupExceptionMessageKey["VIEW_ID_REQUIRED"] = "VIEW_ID_REQUIRED";
    ViewGroupExceptionMessageKey["VIEW_GROUP_NOT_FOUND"] = "VIEW_GROUP_NOT_FOUND";
    ViewGroupExceptionMessageKey["INVALID_VIEW_GROUP_DATA"] = "INVALID_VIEW_GROUP_DATA";
    ViewGroupExceptionMessageKey["FIELD_METADATA_ID_REQUIRED"] = "FIELD_METADATA_ID_REQUIRED";
    ViewGroupExceptionMessageKey["VIEW_NOT_FOUND"] = "VIEW_NOT_FOUND";
    return ViewGroupExceptionMessageKey;
}({});
const generateViewGroupExceptionMessage = (key, id)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return 'WorkspaceId is required';
        case "VIEW_ID_REQUIRED":
            return 'ViewId is required';
        case "VIEW_GROUP_NOT_FOUND":
            return `View group${id ? ` (id: ${id})` : ''} not found`;
        case "INVALID_VIEW_GROUP_DATA":
            return `Invalid view group data${id ? ` for view group id: ${id}` : ''}`;
        case "FIELD_METADATA_ID_REQUIRED":
            return 'FieldMetadataId is required';
        case "VIEW_NOT_FOUND":
            return `View${id ? ` (id: ${id})` : ''} not found`;
        default:
            (0, _utils.assertUnreachable)(key);
    }
};
const generateViewGroupUserFriendlyExceptionMessage = (key)=>{
    switch(key){
        case "WORKSPACE_ID_REQUIRED":
            return /*i18n*/ {
                id: "NAoJAX",
                message: "WorkspaceId is required to create a view group."
            };
        case "VIEW_ID_REQUIRED":
            return /*i18n*/ {
                id: "1X1RW5",
                message: "ViewId is required to create a view group."
            };
        case "FIELD_METADATA_ID_REQUIRED":
            return /*i18n*/ {
                id: "DU4jcg",
                message: "FieldMetadataId is required to create a view group."
            };
    }
};

//# sourceMappingURL=view-group.exception.js.map