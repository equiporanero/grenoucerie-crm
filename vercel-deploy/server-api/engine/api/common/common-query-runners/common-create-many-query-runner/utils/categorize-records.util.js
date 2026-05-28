"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "categorizeRecords", {
    enumerable: true,
    get: function() {
        return categorizeRecords;
    }
});
const _utils = require("twenty-shared/utils");
const _getmatchingrecordidutil = require("./get-matching-record-id.util");
const categorizeRecords = (records, conflictingFieldGroups, existingRecords)=>{
    const recordsToUpdate = [];
    const recordsToInsert = [];
    for (const record of records){
        const matchingRecordId = (0, _getmatchingrecordidutil.getMatchingRecordId)(record, conflictingFieldGroups, existingRecords);
        if ((0, _utils.isDefined)(matchingRecordId)) {
            recordsToUpdate.push({
                ...record,
                id: matchingRecordId
            });
        } else {
            recordsToInsert.push(record);
        }
    }
    return {
        recordsToUpdate,
        recordsToInsert
    };
};

//# sourceMappingURL=categorize-records.util.js.map