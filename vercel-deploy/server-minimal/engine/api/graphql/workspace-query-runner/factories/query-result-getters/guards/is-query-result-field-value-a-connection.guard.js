"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isQueryResultFieldValueAConnection", {
    enumerable: true,
    get: function() {
        return isQueryResultFieldValueAConnection;
    }
});
const isQueryResultFieldValueAConnection = (result)=>{
    return 'edges' in result && Array.isArray(result.edges);
};

//# sourceMappingURL=is-query-result-field-value-a-connection.guard.js.map