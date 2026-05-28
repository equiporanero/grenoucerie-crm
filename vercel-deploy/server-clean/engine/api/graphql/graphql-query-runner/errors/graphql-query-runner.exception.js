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
    get GraphqlQueryRunnerException () {
        return GraphqlQueryRunnerException;
    },
    get GraphqlQueryRunnerExceptionCode () {
        return GraphqlQueryRunnerExceptionCode;
    }
});
const _customexception = require("../../../../../utils/custom-exception");
var GraphqlQueryRunnerExceptionCode = /*#__PURE__*/ function(GraphqlQueryRunnerExceptionCode) {
    GraphqlQueryRunnerExceptionCode["INVALID_QUERY_INPUT"] = "INVALID_QUERY_INPUT";
    GraphqlQueryRunnerExceptionCode["MAX_DEPTH_REACHED"] = "MAX_DEPTH_REACHED";
    GraphqlQueryRunnerExceptionCode["INVALID_CURSOR"] = "INVALID_CURSOR";
    GraphqlQueryRunnerExceptionCode["INVALID_DIRECTION"] = "INVALID_DIRECTION";
    GraphqlQueryRunnerExceptionCode["UNSUPPORTED_OPERATOR"] = "UNSUPPORTED_OPERATOR";
    GraphqlQueryRunnerExceptionCode["ARGS_CONFLICT"] = "ARGS_CONFLICT";
    GraphqlQueryRunnerExceptionCode["FIELD_NOT_FOUND"] = "FIELD_NOT_FOUND";
    GraphqlQueryRunnerExceptionCode["MISSING_SYSTEM_FIELD"] = "MISSING_SYSTEM_FIELD";
    GraphqlQueryRunnerExceptionCode["OBJECT_METADATA_NOT_FOUND"] = "OBJECT_METADATA_NOT_FOUND";
    GraphqlQueryRunnerExceptionCode["RECORD_NOT_FOUND"] = "RECORD_NOT_FOUND";
    GraphqlQueryRunnerExceptionCode["INVALID_ARGS_FIRST"] = "INVALID_ARGS_FIRST";
    GraphqlQueryRunnerExceptionCode["INVALID_ARGS_LAST"] = "INVALID_ARGS_LAST";
    GraphqlQueryRunnerExceptionCode["RELATION_SETTINGS_NOT_FOUND"] = "RELATION_SETTINGS_NOT_FOUND";
    GraphqlQueryRunnerExceptionCode["RELATION_TARGET_OBJECT_METADATA_NOT_FOUND"] = "RELATION_TARGET_OBJECT_METADATA_NOT_FOUND";
    GraphqlQueryRunnerExceptionCode["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
    GraphqlQueryRunnerExceptionCode["INVALID_POST_HOOK_PAYLOAD"] = "INVALID_POST_HOOK_PAYLOAD";
    GraphqlQueryRunnerExceptionCode["UPSERT_MULTIPLE_MATCHING_RECORDS_CONFLICT"] = "UPSERT_MULTIPLE_MATCHING_RECORDS_CONFLICT";
    GraphqlQueryRunnerExceptionCode["UPSERT_MAX_RECORDS_EXCEEDED"] = "UPSERT_MAX_RECORDS_EXCEEDED";
    return GraphqlQueryRunnerExceptionCode;
}({});
let GraphqlQueryRunnerException = class GraphqlQueryRunnerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage }){
        super(message, code, {
            userFriendlyMessage
        });
    }
};

//# sourceMappingURL=graphql-query-runner.exception.js.map