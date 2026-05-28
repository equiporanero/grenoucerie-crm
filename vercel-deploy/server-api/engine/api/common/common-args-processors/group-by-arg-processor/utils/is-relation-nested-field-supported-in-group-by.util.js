"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isRelationNestedFieldSupportedInGroupBy", {
    enumerable: true,
    get: function() {
        return isRelationNestedFieldSupportedInGroupBy;
    }
});
const _issupportedingroupbyutil = require("../../../../../metadata-modules/field-metadata/utils/is-supported-in-group-by.util");
const isRelationNestedFieldSupportedInGroupBy = ({ nestedFieldName, nestedFieldMetadata })=>{
    if (nestedFieldName === 'id') {
        return true;
    }
    return (0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(nestedFieldMetadata);
};

//# sourceMappingURL=is-relation-nested-field-supported-in-group-by.util.js.map