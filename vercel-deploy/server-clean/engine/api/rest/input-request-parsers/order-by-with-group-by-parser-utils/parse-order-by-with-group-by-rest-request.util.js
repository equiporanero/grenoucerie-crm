"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseOrderByWithGroupByRestRequest", {
    enumerable: true,
    get: function() {
        return parseOrderByWithGroupByRestRequest;
    }
});
const _common = require("@nestjs/common");
const _restinputrequestparserexception = require("../rest-input-request-parser.exception");
const parseOrderByWithGroupByRestRequest = (request)=>{
    const orderByWithGroupByQuery = request.query.order_by;
    if (typeof orderByWithGroupByQuery !== 'string') return undefined;
    try {
        return JSON.parse(orderByWithGroupByQuery);
    } catch  {
        throw new _common.BadRequestException(`Invalid order_by query parameter - should be a valid array of objects - ex: [{"firstField": "AscNullsFirst"}, {"secondField": {"subField": "DescNullsLast"}}, {"aggregate": {"aggregateField": "DescNullsLast"}}, {dateField: {"orderBy": "AscNullsFirst", "granularity": "DAY"}}]`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_ORDER_BY_WITH_GROUP_BY_QUERY_PARAM);
    }
};

//# sourceMappingURL=parse-order-by-with-group-by-rest-request.util.js.map