"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSelectOptions", {
    enumerable: true,
    get: function() {
        return getSelectOptions;
    }
});
const _utils = require("twenty-shared/utils");
const getSelectOptions = (fieldMetadata)=>{
    if (!(0, _utils.isFieldMetadataSelectKind)(fieldMetadata.type)) {
        return null;
    }
    const options = fieldMetadata.options;
    return options ?? null;
};

//# sourceMappingURL=get-select-options.util.js.map