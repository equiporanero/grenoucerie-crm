"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "objectRecordDiffMerge", {
    enumerable: true,
    get: function() {
        return objectRecordDiffMerge;
    }
});
function objectRecordDiffMerge(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
oldRecord, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
newRecord) {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    const result = {
        diff: {}
    };
    // Iterate over the keys in the oldRecord diff
    Object.keys(oldRecord.diff ?? {}).forEach((key)=>{
        if (newRecord.diff && newRecord.diff[key]) {
            // If the key also exists in the newRecord, merge the 'before' from the oldRecord and the 'after' from the newRecord
            result.diff[key] = {
                before: oldRecord.diff[key].before,
                after: newRecord.diff[key].after
            };
        } else {
            // If the key does not exist in the newRecord, copy it as is from the oldRecord
            result.diff[key] = oldRecord.diff[key];
        }
    });
    // Iterate over the keys in the newRecord diff to catch any that weren't in the oldRecord
    Object.keys(newRecord.diff ?? {}).forEach((key)=>{
        if (!result.diff[key]) {
            // If the key was not already added from the oldRecord, add it from the newRecord
            result.diff[key] = newRecord.diff[key];
        }
    });
    return result;
}

//# sourceMappingURL=object-record-diff-merge.js.map