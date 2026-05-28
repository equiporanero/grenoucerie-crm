"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCompositeSubfieldNames", {
    enumerable: true,
    get: function() {
        return getCompositeSubfieldNames;
    }
});
const _constants = require("twenty-shared/constants");
const compositeSubFieldMaps = _constants.COMPOSITE_FIELD_TYPE_SUB_FIELDS_NAMES;
const getCompositeSubfieldNames = (fieldType)=>Object.values(compositeSubFieldMaps[fieldType] ?? {});

//# sourceMappingURL=get-composite-subfield-names.util.js.map