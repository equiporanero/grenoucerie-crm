"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "mergePhonesFieldValues", {
    enumerable: true,
    get: function() {
        return mergePhonesFieldValues;
    }
});
const _lodashuniqby = /*#__PURE__*/ _interop_require_default(require("lodash.uniqby"));
const _hasrecordfieldvalueutil = require("./has-record-field-value.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const mergePhonesFieldValues = (recordsWithValues, priorityRecordId)=>{
    if (recordsWithValues.length === 0) {
        return {
            primaryPhoneNumber: '',
            primaryPhoneCountryCode: 'US',
            primaryPhoneCallingCode: '',
            additionalPhones: null
        };
    }
    let primaryPhoneNumber = '';
    let primaryPhoneCountryCode = null;
    let primaryPhoneCallingCode = '';
    const priorityRecord = recordsWithValues.find((record)=>record.recordId === priorityRecordId);
    if (priorityRecord && (0, _hasrecordfieldvalueutil.hasRecordFieldValue)(priorityRecord.value.primaryPhoneNumber)) {
        primaryPhoneNumber = priorityRecord.value.primaryPhoneNumber;
        primaryPhoneCountryCode = priorityRecord.value.primaryPhoneCountryCode;
        primaryPhoneCallingCode = priorityRecord.value.primaryPhoneCallingCode;
    } else {
        const fallbackRecord = recordsWithValues.find((record)=>(0, _hasrecordfieldvalueutil.hasRecordFieldValue)(record.value.primaryPhoneNumber));
        if (fallbackRecord) {
            primaryPhoneNumber = fallbackRecord.value.primaryPhoneNumber;
            primaryPhoneCountryCode = fallbackRecord.value.primaryPhoneCountryCode;
            primaryPhoneCallingCode = fallbackRecord.value.primaryPhoneCallingCode;
        }
    }
    const allPhones = [];
    recordsWithValues.forEach((record)=>{
        if ((0, _hasrecordfieldvalueutil.hasRecordFieldValue)(record.value.primaryPhoneNumber)) {
            allPhones.push({
                number: record.value.primaryPhoneNumber,
                countryCode: record.value.primaryPhoneCountryCode,
                callingCode: record.value.primaryPhoneCallingCode
            });
        }
        if (Array.isArray(record.value.additionalPhones)) {
            allPhones.push(...record.value.additionalPhones.filter((phone)=>(0, _hasrecordfieldvalueutil.hasRecordFieldValue)(phone.number)));
        }
    });
    const uniquePhones = (0, _lodashuniqby.default)(allPhones, 'number').filter((phone)=>phone.number !== primaryPhoneNumber);
    return {
        primaryPhoneNumber,
        primaryPhoneCountryCode: primaryPhoneCountryCode,
        primaryPhoneCallingCode,
        additionalPhones: uniquePhones.length > 0 ? uniquePhones : null
    };
};

//# sourceMappingURL=merge-phones-field-values.util.js.map