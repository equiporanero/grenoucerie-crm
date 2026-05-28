"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseAggregateFieldsRestRequest", {
    enumerable: true,
    get: function() {
        return parseAggregateFieldsRestRequest;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _restinputrequestparserexception = require("../rest-input-request-parser.exception");
const parseAggregateFieldsRestRequest = (request)=>{
    const aggregateFieldsQuery = request.query.aggregate;
    if (!(0, _utils.isDefined)(aggregateFieldsQuery)) return {};
    if (typeof aggregateFieldsQuery !== 'string') {
        throw new _restinputrequestparserexception.RestInputRequestParserException(`Invalid aggregate query parameter - should be a valid array of string - ex: ["countNotEmptyId", "countEmptyField"]`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_AGGREGATE_FIELDS_QUERY_PARAM, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    try {
        const aggregateFields = JSON.parse(aggregateFieldsQuery);
        return aggregateFields.reduce((acc, field)=>{
            acc[field] = true;
            return acc;
        }, {});
    } catch  {
        throw new _restinputrequestparserexception.RestInputRequestParserException(`Invalid aggregate query parameter - should be a valid array of string - ex: ["countNotEmptyId", "countEmptyField"]`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_AGGREGATE_FIELDS_QUERY_PARAM, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
};

//# sourceMappingURL=parse-aggregate-fields-rest-request.util.js.map