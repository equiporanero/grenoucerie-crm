"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isGroupByRelationField", {
    enumerable: true,
    get: function() {
        return isGroupByRelationField;
    }
});
const isGroupByRelationField = (groupByField)=>{
    return 'nestedFieldMetadata' in groupByField;
};

//# sourceMappingURL=is-group-by-relation-field.util.js.map