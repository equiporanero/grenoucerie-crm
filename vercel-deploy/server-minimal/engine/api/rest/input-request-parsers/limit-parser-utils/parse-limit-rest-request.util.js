"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseLimitRestRequest", {
    enumerable: true,
    get: function() {
        return parseLimitRestRequest;
    }
});
const _constants = require("twenty-shared/constants");
const _restinputrequestparserexception = require("../rest-input-request-parser.exception");
const parseLimitRestRequest = (request, defaultLimit = _constants.QUERY_DEFAULT_LIMIT_RECORDS)=>{
    if (!request.query?.limit) {
        return defaultLimit;
    }
    const limit = +request.query.limit;
    if (isNaN(limit) || limit < 0) {
        throw new _restinputrequestparserexception.RestInputRequestParserException(`limit '${request.query.limit}' is invalid. Should be an integer`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_LIMIT_QUERY_PARAM);
    }
    return Math.min(limit, _constants.QUERY_MAX_RECORDS);
};

//# sourceMappingURL=parse-limit-rest-request.util.js.map