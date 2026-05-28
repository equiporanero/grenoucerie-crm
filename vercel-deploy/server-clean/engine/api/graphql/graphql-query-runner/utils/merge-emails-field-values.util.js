"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mergeEmailsFieldValues", {
    enumerable: true,
    get: function() {
        return mergeEmailsFieldValues;
    }
});
const _hasrecordfieldvalueutil = require("./has-record-field-value.util");
const _parseadditionalitemsutil = require("./parse-additional-items.util");
const mergeEmailsFieldValues = (recordsWithValues, priorityRecordId)=>{
    if (recordsWithValues.length === 0) {
        return {
            primaryEmail: '',
            additionalEmails: null
        };
    }
    let primaryEmail = '';
    const priorityRecord = recordsWithValues.find((record)=>record.recordId === priorityRecordId);
    if (priorityRecord && (0, _hasrecordfieldvalueutil.hasRecordFieldValue)(priorityRecord.value.primaryEmail)) {
        primaryEmail = priorityRecord.value.primaryEmail;
    } else {
        const fallbackRecord = recordsWithValues.find((record)=>(0, _hasrecordfieldvalueutil.hasRecordFieldValue)(record.value.primaryEmail));
        primaryEmail = fallbackRecord?.value.primaryEmail || '';
    }
    const allEmails = [];
    recordsWithValues.forEach((record)=>{
        if ((0, _hasrecordfieldvalueutil.hasRecordFieldValue)(record.value.primaryEmail)) {
            allEmails.push(record.value.primaryEmail);
        }
        const additionalEmails = (0, _parseadditionalitemsutil.parseArrayOrJsonStringToArray)(record.value.additionalEmails);
        allEmails.push(...additionalEmails.filter((email)=>(0, _hasrecordfieldvalueutil.hasRecordFieldValue)(email)));
    });
    const uniqueEmails = Array.from(new Set(allEmails)).filter((email)=>email !== primaryEmail);
    return {
        primaryEmail,
        additionalEmails: uniqueEmails.length > 0 ? uniqueEmails : null
    };
};

//# sourceMappingURL=merge-emails-field-values.util.js.map