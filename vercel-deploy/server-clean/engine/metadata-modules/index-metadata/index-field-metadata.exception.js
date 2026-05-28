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
    get IndexMetadataException () {
        return IndexMetadataException;
    },
    get IndexMetadataExceptionCode () {
        return IndexMetadataExceptionCode;
    }
});
const _customexception = require("../../../utils/custom-exception");
let IndexMetadataException = class IndexMetadataException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "P/8dT5",
                message: "An index metadata error occurred."
            }
        });
    }
};
var IndexMetadataExceptionCode = /*#__PURE__*/ function(IndexMetadataExceptionCode) {
    IndexMetadataExceptionCode["INDEX_CREATION_FAILED"] = "INDEX_CREATION_FAILED";
    IndexMetadataExceptionCode["INDEX_NOT_SUPPORTED_FOR_COMPOSITE_FIELD"] = "INDEX_NOT_SUPPORTED_FOR_COMPOSITE_FIELD";
    IndexMetadataExceptionCode["INDEX_NOT_SUPPORTED_FOR_MORH_RELATION_FIELD_AND_RELATION_FIELD"] = "INDEX_NOT_SUPPORTED_FOR_MORH_RELATION_FIELD_AND_RELATION_FIELD";
    IndexMetadataExceptionCode["CUSTOM_INDEX_LIMIT_REACHED"] = "CUSTOM_INDEX_LIMIT_REACHED";
    IndexMetadataExceptionCode["CANNOT_DELETE_SYSTEM_INDEX"] = "CANNOT_DELETE_SYSTEM_INDEX";
    IndexMetadataExceptionCode["INDEX_FIELDS_REQUIRED"] = "INDEX_FIELDS_REQUIRED";
    IndexMetadataExceptionCode["DUPLICATE_INDEX_FIELDS"] = "DUPLICATE_INDEX_FIELDS";
    IndexMetadataExceptionCode["INDEX_OBJECT_NOT_FOUND"] = "INDEX_OBJECT_NOT_FOUND";
    IndexMetadataExceptionCode["INDEX_FIELD_NOT_FOUND_ON_OBJECT"] = "INDEX_FIELD_NOT_FOUND_ON_OBJECT";
    IndexMetadataExceptionCode["INDEX_NOT_FOUND"] = "INDEX_NOT_FOUND";
    IndexMetadataExceptionCode["INDEX_TYPE_NOT_SUPPORTED_FOR_FIELD_TYPE"] = "INDEX_TYPE_NOT_SUPPORTED_FOR_FIELD_TYPE";
    IndexMetadataExceptionCode["DUPLICATE_UNIQUE_INDEX"] = "DUPLICATE_UNIQUE_INDEX";
    return IndexMetadataExceptionCode;
}({});

//# sourceMappingURL=index-field-metadata.exception.js.map