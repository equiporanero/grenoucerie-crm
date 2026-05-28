"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isQueryCanceledError", {
    enumerable: true,
    get: function() {
        return isQueryCanceledError;
    }
});
const _utils = require("twenty-shared/utils");
const _postgreserrorcodesconstants = require("../constants/postgres-error-codes.constants");
const isQueryCanceledError = (error)=>{
    if (!(0, _utils.isDefined)(error) || typeof error !== 'object' || !('code' in error)) {
        return false;
    }
    return error.code === _postgreserrorcodesconstants.POSTGRESQL_ERROR_CODES.QUERY_CANCELED;
};

//# sourceMappingURL=is-query-canceled-error.util.js.map