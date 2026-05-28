"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateIsOperatorFilterValueOrThrow", {
    enumerable: true,
    get: function() {
        return validateIsOperatorFilterValueOrThrow;
    }
});
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateIsOperatorFilterValueOrThrow = (value)=>{
    if (value !== 'NULL' && value !== 'NOT_NULL') {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid filter value for "is" operator. Expected "NULL" or "NOT_NULL"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
            userFriendlyMessage: /*i18n*/ {
                id: "XOA98j",
                message: 'Invalid value for "is" operator'
            }
        });
    }
};

//# sourceMappingURL=validate-is-operator-filter-value-or-throw.util.js.map