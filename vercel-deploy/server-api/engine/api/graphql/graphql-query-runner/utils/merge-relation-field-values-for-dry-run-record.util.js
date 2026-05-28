"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mergeRelationFieldValuesForDryRunRecord", {
    enumerable: true,
    get: function() {
        return mergeRelationFieldValuesForDryRunRecord;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _defaultmergefieldvalueutil = require("./default-merge-field-value.util");
const mergeRelationFieldValuesForDryRunRecord = (recordsWithValues, relationType, priorityRecordId)=>{
    if (relationType === _types.RelationType.ONE_TO_MANY) {
        return mergeOneToManyRelationArrays(recordsWithValues);
    }
    return (0, _defaultmergefieldvalueutil.defaultMergeFieldValue)(recordsWithValues, priorityRecordId);
};
const mergeOneToManyRelationArrays = (recordsWithValues)=>{
    const uniqueRelationsMap = new Map();
    recordsWithValues.forEach(({ value })=>{
        if (Array.isArray(value)) {
            value.forEach((relation)=>{
                if ((0, _utils.isDefined)(relation?.id)) {
                    uniqueRelationsMap.set(relation.id, relation);
                }
            });
        }
    });
    return Array.from(uniqueRelationsMap.values());
};

//# sourceMappingURL=merge-relation-field-values-for-dry-run-record.util.js.map