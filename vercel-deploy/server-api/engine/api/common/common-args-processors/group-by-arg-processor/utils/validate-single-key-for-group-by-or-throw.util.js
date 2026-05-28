"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateSingleKeyForGroupByOrThrow", {
    enumerable: true,
    get: function() {
        return validateSingleKeyForGroupByOrThrow;
    }
});
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../../../common-query-runners/errors/standard-error-message.constant");
const validateSingleKeyForGroupByOrThrow = ({ groupByKeys, errorMessage })=>{
    if (groupByKeys.length > 1) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(errorMessage, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
};

//# sourceMappingURL=validate-single-key-for-group-by-or-throw.util.js.map