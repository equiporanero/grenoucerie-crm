"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyTypeOptionsForUpdateInput", {
    enumerable: true,
    get: function() {
        return applyTypeOptionsForUpdateInput;
    }
});
const _wraptypeingraphqllistutil = require("./wrap-type-in-graphql-list.util");
const applyTypeOptionsForUpdateInput = (typeRef, options)=>{
    if (options.isArray) {
        return (0, _wraptypeingraphqllistutil.wrapTypeInGraphQLList)(typeRef, options.arrayDepth ?? 1, true);
    }
    return typeRef;
};

//# sourceMappingURL=apply-type-options-for-update-input.util.js.map