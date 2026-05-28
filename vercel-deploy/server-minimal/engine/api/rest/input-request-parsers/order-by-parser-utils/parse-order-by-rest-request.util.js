"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseOrderByRestRequest", {
    enumerable: true,
    get: function() {
        return parseOrderByRestRequest;
    }
});
const _parseorderbyrestrequestcommonutil = require("./utils/parse-order-by-rest-request-common.util");
const parseOrderByRestRequest = (request)=>{
    const orderByQuery = request.query.order_by;
    return (0, _parseorderbyrestrequestcommonutil.parseOrderBy)(orderByQuery);
};

//# sourceMappingURL=parse-order-by-rest-request.util.js.map