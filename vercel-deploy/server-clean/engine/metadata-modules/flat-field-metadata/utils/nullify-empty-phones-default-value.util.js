"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nullifyEmptyPhonesDefaultValue", {
    enumerable: true,
    get: function() {
        return nullifyEmptyPhonesDefaultValue;
    }
});
const _utils = require("twenty-shared/utils");
const _isnullequivalentarrayfieldvalueutil = require("../../../api/common/common-args-processors/data-arg-processor/utils/is-null-equivalent-array-field-value.util");
const _isnullequivalenttextdefaultvalueutil = require("./is-null-equivalent-text-default-value.util");
const nullifyEmptyPhonesDefaultValue = (defaultValue)=>{
    if (!(0, _utils.isDefined)(defaultValue)) {
        return null;
    }
    const v = defaultValue;
    const primaryPhoneNumber = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.primaryPhoneNumber) ? null : v.primaryPhoneNumber ?? null;
    const primaryPhoneCountryCode = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.primaryPhoneCountryCode) ? null : v.primaryPhoneCountryCode ?? null;
    const primaryPhoneCallingCode = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.primaryPhoneCallingCode) ? null : v.primaryPhoneCallingCode ?? null;
    const additionalPhones = (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(v.additionalPhones) ? null : v.additionalPhones ?? null;
    if (primaryPhoneNumber === null && primaryPhoneCountryCode === null && primaryPhoneCallingCode === null && additionalPhones === null) {
        return null;
    }
    return {
        primaryPhoneNumber,
        primaryPhoneCountryCode,
        primaryPhoneCallingCode,
        additionalPhones
    };
};

//# sourceMappingURL=nullify-empty-phones-default-value.util.js.map