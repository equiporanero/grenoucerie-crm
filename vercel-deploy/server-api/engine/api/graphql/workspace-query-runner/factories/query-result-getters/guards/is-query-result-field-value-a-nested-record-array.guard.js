"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isQueryResultFieldValueANestedRecordArray", {
    enumerable: true,
    get: function() {
        return isQueryResultFieldValueANestedRecordArray;
    }
});
const isQueryResultFieldValueANestedRecordArray = (result)=>{
    return 'records' in result && Array.isArray(result.records);
};

//# sourceMappingURL=is-query-result-field-value-a-nested-record-array.guard.js.map