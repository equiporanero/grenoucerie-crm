"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mergeArrayFieldValues", {
    enumerable: true,
    get: function() {
        return mergeArrayFieldValues;
    }
});
const _hasrecordfieldvalueutil = require("./has-record-field-value.util");
const mergeArrayFieldValues = (recordsWithValues)=>{
    const allValues = [];
    recordsWithValues.forEach((record)=>{
        if (record.value === null || record.value === undefined) {
            return;
        }
        if (!Array.isArray(record.value)) {
            throw new Error(`Expected array value but received ${typeof record.value}`);
        }
        allValues.push(...record.value.filter((value)=>(0, _hasrecordfieldvalueutil.hasRecordFieldValue)(value)));
    });
    const uniqueValues = Array.from(new Set(allValues));
    return uniqueValues.length > 0 ? uniqueValues : null;
};

//# sourceMappingURL=merge-array-field-values.util.js.map