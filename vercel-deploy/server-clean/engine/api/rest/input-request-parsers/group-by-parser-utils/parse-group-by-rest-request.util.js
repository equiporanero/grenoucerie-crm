"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseGroupByRestRequest", {
    enumerable: true,
    get: function() {
        return parseGroupByRestRequest;
    }
});
const _restinputrequestparserexception = require("../rest-input-request-parser.exception");
const parseGroupByRestRequest = (request)=>{
    const groupByQuery = request.query.group_by;
    if (typeof groupByQuery !== 'string') {
        throw new _restinputrequestparserexception.RestInputRequestParserException(`Invalid group_by query parameter - should be a valid array of objects - ex: [{"firstField": true}, {"secondField": {"subField": true}}, {"dateField": {"granularity": 'DAY'}}]`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_GROUP_BY_QUERY_PARAM);
    }
    try {
        return JSON.parse(groupByQuery);
    } catch  {
        throw new _restinputrequestparserexception.RestInputRequestParserException(`Invalid group_by query parameter - should be a valid array of objects - ex: [{"firstField": true}, {"secondField": {"subField": true}}, {"dateField": {"granularity": 'DAY'}}]`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_GROUP_BY_QUERY_PARAM);
    }
};

//# sourceMappingURL=parse-group-by-rest-request.util.js.map