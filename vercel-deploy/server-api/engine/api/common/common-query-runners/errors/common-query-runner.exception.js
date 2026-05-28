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
    get CommonQueryRunnerException () {
        return CommonQueryRunnerException;
    },
    get CommonQueryRunnerExceptionCode () {
        return CommonQueryRunnerExceptionCode;
    }
});
const _customexception = require("../../../../../utils/custom-exception");
var CommonQueryRunnerExceptionCode = /*#__PURE__*/ function(CommonQueryRunnerExceptionCode) {
    CommonQueryRunnerExceptionCode["RECORD_NOT_FOUND"] = "RECORD_NOT_FOUND";
    CommonQueryRunnerExceptionCode["INVALID_QUERY_INPUT"] = "INVALID_QUERY_INPUT";
    CommonQueryRunnerExceptionCode["INVALID_AUTH_CONTEXT"] = "INVALID_AUTH_CONTEXT";
    CommonQueryRunnerExceptionCode["ARGS_CONFLICT"] = "ARGS_CONFLICT";
    CommonQueryRunnerExceptionCode["INVALID_ARGS_DATA"] = "INVALID_ARGS_DATA";
    CommonQueryRunnerExceptionCode["INVALID_ARGS_FILTER"] = "INVALID_ARGS_FILTER";
    CommonQueryRunnerExceptionCode["INVALID_ARGS_FIRST"] = "INVALID_ARGS_FIRST";
    CommonQueryRunnerExceptionCode["INVALID_ARGS_LAST"] = "INVALID_ARGS_LAST";
    CommonQueryRunnerExceptionCode["UPSERT_MULTIPLE_MATCHING_RECORDS_CONFLICT"] = "UPSERT_MULTIPLE_MATCHING_RECORDS_CONFLICT";
    CommonQueryRunnerExceptionCode["MISSING_SYSTEM_FIELD"] = "MISSING_SYSTEM_FIELD";
    CommonQueryRunnerExceptionCode["INVALID_CURSOR"] = "INVALID_CURSOR";
    CommonQueryRunnerExceptionCode["TOO_MANY_RECORDS_TO_UPDATE"] = "TOO_MANY_RECORDS_TO_UPDATE";
    CommonQueryRunnerExceptionCode["BAD_REQUEST"] = "BAD_REQUEST";
    CommonQueryRunnerExceptionCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    CommonQueryRunnerExceptionCode["TOO_COMPLEX_QUERY"] = "TOO_COMPLEX_QUERY";
    CommonQueryRunnerExceptionCode["MISSING_TIMEZONE_FOR_DATE_GROUP_BY"] = "MISSING_TIMEZONE_FOR_DATE_GROUP_BY";
    CommonQueryRunnerExceptionCode["INVALID_TIMEZONE"] = "INVALID_TIMEZONE";
    return CommonQueryRunnerExceptionCode;
}({});
let CommonQueryRunnerException = class CommonQueryRunnerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage }){
        super(message, code, {
            userFriendlyMessage
        });
    }
};

//# sourceMappingURL=common-query-runner.exception.js.map