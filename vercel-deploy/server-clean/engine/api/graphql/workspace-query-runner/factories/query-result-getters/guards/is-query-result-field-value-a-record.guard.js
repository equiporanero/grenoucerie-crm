"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isQueryResultFieldValueARecord", {
    enumerable: true,
    get: function() {
        return isQueryResultFieldValueARecord;
    }
});
const isQueryResultFieldValueARecord = (result)=>{
    return 'id' in result;
};

//# sourceMappingURL=is-query-result-field-value-a-record.guard.js.map