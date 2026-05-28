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
    get RecordCrudException () {
        return RecordCrudException;
    },
    get RecordCrudExceptionCode () {
        return RecordCrudExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var RecordCrudExceptionCode = /*#__PURE__*/ function(RecordCrudExceptionCode) {
    RecordCrudExceptionCode["INVALID_REQUEST"] = "INVALID_REQUEST";
    RecordCrudExceptionCode["WORKSPACE_ID_NOT_FOUND"] = "WORKSPACE_ID_NOT_FOUND";
    RecordCrudExceptionCode["OBJECT_NOT_FOUND"] = "OBJECT_NOT_FOUND";
    RecordCrudExceptionCode["RECORD_NOT_FOUND"] = "RECORD_NOT_FOUND";
    RecordCrudExceptionCode["RECORD_CREATION_FAILED"] = "RECORD_CREATION_FAILED";
    RecordCrudExceptionCode["RECORD_UPDATE_FAILED"] = "RECORD_UPDATE_FAILED";
    RecordCrudExceptionCode["RECORD_DELETION_FAILED"] = "RECORD_DELETION_FAILED";
    RecordCrudExceptionCode["RECORD_UPSERT_FAILED"] = "RECORD_UPSERT_FAILED";
    RecordCrudExceptionCode["QUERY_FAILED"] = "QUERY_FAILED";
    return RecordCrudExceptionCode;
}({});
const getRecordCrudExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_REQUEST":
            return /*i18n*/ {
                id: "lOyHVQ",
                message: "Invalid request."
            };
        case "WORKSPACE_ID_NOT_FOUND":
            return /*i18n*/ {
                id: "EhVOPs",
                message: "Workspace not found."
            };
        case "OBJECT_NOT_FOUND":
            return /*i18n*/ {
                id: "AKqp4k",
                message: "Object not found."
            };
        case "RECORD_NOT_FOUND":
            return /*i18n*/ {
                id: "4R+xJM",
                message: "Record not found."
            };
        case "RECORD_CREATION_FAILED":
            return /*i18n*/ {
                id: "I71ur2",
                message: "Failed to create record."
            };
        case "RECORD_UPDATE_FAILED":
            return /*i18n*/ {
                id: "nrcGtY",
                message: "Failed to update record."
            };
        case "RECORD_DELETION_FAILED":
            return /*i18n*/ {
                id: "MBdUff",
                message: "Failed to delete record."
            };
        case "RECORD_UPSERT_FAILED":
            return /*i18n*/ {
                id: "FiYPA2",
                message: "Failed to upsert record."
            };
        case "QUERY_FAILED":
            return /*i18n*/ {
                id: "9QTny9",
                message: "Query failed."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let RecordCrudException = class RecordCrudException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getRecordCrudExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=record-crud.exception.js.map