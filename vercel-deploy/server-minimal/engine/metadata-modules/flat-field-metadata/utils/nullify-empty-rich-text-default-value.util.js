"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nullifyEmptyRichTextDefaultValue", {
    enumerable: true,
    get: function() {
        return nullifyEmptyRichTextDefaultValue;
    }
});
const _utils = require("twenty-shared/utils");
const _isnullequivalenttextdefaultvalueutil = require("./is-null-equivalent-text-default-value.util");
const nullifyEmptyRichTextDefaultValue = (defaultValue)=>{
    if (!(0, _utils.isDefined)(defaultValue)) {
        return null;
    }
    const v = defaultValue;
    const blocknote = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.blocknote) ? null : v.blocknote ?? null;
    const markdown = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.markdown) ? null : v.markdown ?? null;
    if (blocknote === null && markdown === null) {
        return null;
    }
    return {
        blocknote,
        markdown
    };
};

//# sourceMappingURL=nullify-empty-rich-text-default-value.util.js.map