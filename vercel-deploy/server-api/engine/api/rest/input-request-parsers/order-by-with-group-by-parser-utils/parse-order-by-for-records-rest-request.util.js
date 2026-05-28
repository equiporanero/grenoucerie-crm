"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseOrderByForRecordsWithGroupByRestRequest", {
    enumerable: true,
    get: function() {
        return parseOrderByForRecordsWithGroupByRestRequest;
    }
});
const _parseorderbyrestrequestcommonutil = require("../order-by-parser-utils/utils/parse-order-by-rest-request-common.util");
const parseOrderByForRecordsWithGroupByRestRequest = (request)=>{
    const orderByForRecordsWithGroupByQuery = request.query.order_by_for_records;
    return (0, _parseorderbyrestrequestcommonutil.parseOrderBy)(orderByForRecordsWithGroupByQuery);
};

//# sourceMappingURL=parse-order-by-for-records-rest-request.util.js.map