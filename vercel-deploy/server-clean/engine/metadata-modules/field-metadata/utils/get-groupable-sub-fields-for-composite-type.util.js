"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getGroupableSubFieldsForCompositeType", {
    enumerable: true,
    get: function() {
        return getGroupableSubFieldsForCompositeType;
    }
});
const _types = require("twenty-shared/types");
const _iscompositepropertysupportedingroupbyutil = require("./is-composite-property-supported-in-group-by.util");
const getGroupableSubFieldsForCompositeType = (type)=>{
    const compositeTypeDefinition = _types.compositeTypeDefinitions.get(type);
    if (!compositeTypeDefinition) {
        return null;
    }
    return compositeTypeDefinition.properties.filter(_iscompositepropertysupportedingroupbyutil.isCompositePropertySupportedInGroupBy).map((property)=>property.name);
};

//# sourceMappingURL=get-groupable-sub-fields-for-composite-type.util.js.map