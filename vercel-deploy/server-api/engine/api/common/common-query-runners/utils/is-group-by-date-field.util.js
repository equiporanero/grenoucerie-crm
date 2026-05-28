"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isGroupByDateField", {
    enumerable: true,
    get: function() {
        return isGroupByDateField;
    }
});
const isGroupByDateField = (groupByField)=>{
    return 'dateGranularity' in groupByField && !('nestedFieldMetadata' in groupByField);
};

//# sourceMappingURL=is-group-by-date-field.util.js.map