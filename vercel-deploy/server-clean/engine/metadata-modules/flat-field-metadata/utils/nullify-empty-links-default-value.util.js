"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nullifyEmptyLinksDefaultValue", {
    enumerable: true,
    get: function() {
        return nullifyEmptyLinksDefaultValue;
    }
});
const _utils = require("twenty-shared/utils");
const _isnullequivalentarrayfieldvalueutil = require("../../../api/common/common-args-processors/data-arg-processor/utils/is-null-equivalent-array-field-value.util");
const _isnullequivalenttextdefaultvalueutil = require("./is-null-equivalent-text-default-value.util");
const nullifyEmptyLinksDefaultValue = (defaultValue)=>{
    if (!(0, _utils.isDefined)(defaultValue)) {
        return null;
    }
    const v = defaultValue;
    const primaryLinkLabel = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.primaryLinkLabel) ? null : v.primaryLinkLabel ?? null;
    const primaryLinkUrl = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.primaryLinkUrl) ? null : v.primaryLinkUrl ?? null;
    const secondaryLinks = (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(v.secondaryLinks) ? null : v.secondaryLinks ?? null;
    if (primaryLinkLabel === null && primaryLinkUrl === null && secondaryLinks === null) {
        return null;
    }
    return {
        primaryLinkLabel,
        primaryLinkUrl,
        secondaryLinks
    };
};

//# sourceMappingURL=nullify-empty-links-default-value.util.js.map