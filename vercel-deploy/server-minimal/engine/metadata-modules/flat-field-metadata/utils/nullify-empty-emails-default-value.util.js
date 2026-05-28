"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nullifyEmptyEmailsDefaultValue", {
    enumerable: true,
    get: function() {
        return nullifyEmptyEmailsDefaultValue;
    }
});
const _utils = require("twenty-shared/utils");
const _isnullequivalentarrayfieldvalueutil = require("../../../api/common/common-args-processors/data-arg-processor/utils/is-null-equivalent-array-field-value.util");
const _isnullequivalenttextdefaultvalueutil = require("./is-null-equivalent-text-default-value.util");
const nullifyEmptyEmailsDefaultValue = (defaultValue)=>{
    if (!(0, _utils.isDefined)(defaultValue)) {
        return null;
    }
    const v = defaultValue;
    const primaryEmail = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.primaryEmail) ? null : v.primaryEmail ?? null;
    const additionalEmails = (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(v.additionalEmails) ? null : v.additionalEmails ?? null;
    if (primaryEmail === null && additionalEmails === null) {
        return null;
    }
    return {
        primaryEmail,
        additionalEmails
    };
};

//# sourceMappingURL=nullify-empty-emails-default-value.util.js.map