"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "defaultMergeFieldValue", {
    enumerable: true,
    get: function() {
        return defaultMergeFieldValue;
    }
});
const _utils = require("twenty-shared/utils");
const _hasrecordfieldvalueutil = require("./has-record-field-value.util");
const defaultMergeFieldValue = (recordsWithValues, priorityRecordId)=>{
    const priorityRecord = recordsWithValues.find((record)=>record.recordId === priorityRecordId);
    if ((0, _utils.isDefined)(priorityRecord) && (0, _hasrecordfieldvalueutil.hasRecordFieldValue)(priorityRecord.value)) {
        return priorityRecord.value;
    }
    const fallbackRecord = recordsWithValues.find((record)=>(0, _hasrecordfieldvalueutil.hasRecordFieldValue)(record.value));
    if (fallbackRecord) {
        return fallbackRecord.value;
    }
    return null;
};

//# sourceMappingURL=default-merge-field-value.util.js.map