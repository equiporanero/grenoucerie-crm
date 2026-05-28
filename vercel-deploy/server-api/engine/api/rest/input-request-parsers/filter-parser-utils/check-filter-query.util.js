"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkFilterQuery", {
    enumerable: true,
    get: function() {
        return checkFilterQuery;
    }
});
const _restinputrequestparserexception = require("../rest-input-request-parser.exception");
const checkFilterQuery = (filterQuery)=>{
    const countOpenedBrackets = (filterQuery.match(/\(/g) || []).length;
    const countClosedBrackets = (filterQuery.match(/\)/g) || []).length;
    const diff = countOpenedBrackets - countClosedBrackets;
    if (diff !== 0) {
        const hint = diff > 0 ? `${diff} close bracket${diff > 1 ? 's are' : ' is'}` : `${Math.abs(diff)} open bracket${Math.abs(diff) > 1 ? 's are' : ' is'}`;
        throw new _restinputrequestparserexception.RestInputRequestParserException(`'filter' invalid. ${hint} missing in the query`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_FILTER_QUERY_PARAM, {
            userFriendlyMessage: /*i18n*/ {
                id: "1yoHmO",
                message: "Invalid filter parameter."
            }
        });
    }
    return;
};

//# sourceMappingURL=check-filter-query.util.js.map