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
    get GraphqlDirectExecutionException () {
        return GraphqlDirectExecutionException;
    },
    get GraphqlDirectExecutionExceptionCode () {
        return GraphqlDirectExecutionExceptionCode;
    }
});
const _customexception = require("../../../../../utils/custom-exception");
var GraphqlDirectExecutionExceptionCode = /*#__PURE__*/ function(GraphqlDirectExecutionExceptionCode) {
    GraphqlDirectExecutionExceptionCode["INVALID_QUERY_INPUT"] = "INVALID_QUERY_INPUT";
    GraphqlDirectExecutionExceptionCode["UNKNOWN_METHOD"] = "UNKNOWN_METHOD";
    GraphqlDirectExecutionExceptionCode["INVALID_RESULT_TYPE"] = "INVALID_RESULT_TYPE";
    return GraphqlDirectExecutionExceptionCode;
}({});
let GraphqlDirectExecutionException = class GraphqlDirectExecutionException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage }){
        super(message, code, {
            userFriendlyMessage
        });
    }
};

//# sourceMappingURL=graphql-direct-execution.exception.js.map