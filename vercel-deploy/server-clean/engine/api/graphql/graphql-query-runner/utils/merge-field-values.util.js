"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mergeFieldValues", {
    enumerable: true,
    get: function() {
        return mergeFieldValues;
    }
});
const _types = require("twenty-shared/types");
const _mergearrayfieldvaluesutil = require("./merge-array-field-values.util");
const _mergeemailsfieldvaluesutil = require("./merge-emails-field-values.util");
const _mergelinksfieldvaluesutil = require("./merge-links-field-values.util");
const _mergephonesfieldvaluesutil = require("./merge-phones-field-values.util");
const _mergerelationfieldvaluesfordryrunrecordutil = require("./merge-relation-field-values-for-dry-run-record.util");
const _defaultmergefieldvalueutil = require("./default-merge-field-value.util");
const mergeFieldValues = (fieldType, recordsWithValues, priorityRecordId, isDryRun = false, relationType)=>{
    switch(fieldType){
        case _types.FieldMetadataType.ARRAY:
        case _types.FieldMetadataType.MULTI_SELECT:
            return (0, _mergearrayfieldvaluesutil.mergeArrayFieldValues)(recordsWithValues);
        case _types.FieldMetadataType.RELATION:
            if (isDryRun) {
                return (0, _mergerelationfieldvaluesfordryrunrecordutil.mergeRelationFieldValuesForDryRunRecord)(recordsWithValues, relationType, priorityRecordId);
            }
            return (0, _defaultmergefieldvalueutil.defaultMergeFieldValue)(recordsWithValues, priorityRecordId);
        case _types.FieldMetadataType.EMAILS:
            return (0, _mergeemailsfieldvaluesutil.mergeEmailsFieldValues)(recordsWithValues, priorityRecordId);
        case _types.FieldMetadataType.PHONES:
            return (0, _mergephonesfieldvaluesutil.mergePhonesFieldValues)(recordsWithValues, priorityRecordId);
        case _types.FieldMetadataType.LINKS:
            return (0, _mergelinksfieldvaluesutil.mergeLinksFieldValues)(recordsWithValues, priorityRecordId);
        default:
            return (0, _defaultmergefieldvalueutil.defaultMergeFieldValue)(recordsWithValues, priorityRecordId);
    }
};

//# sourceMappingURL=merge-field-values.util.js.map