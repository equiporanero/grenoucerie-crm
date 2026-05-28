"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isMorphOrRelationFieldMetadataType", {
    enumerable: true,
    get: function() {
        return isMorphOrRelationFieldMetadataType;
    }
});
const _morphorrelationfieldmetadatatypetype = require("../metadata-modules/field-metadata/types/morph-or-relation-field-metadata-type.type");
const isMorphOrRelationFieldMetadataType = (type)=>{
    return _morphorrelationfieldmetadatatypetype.MORPH_OR_RELATION_FIELD_TYPES.includes(type);
};

//# sourceMappingURL=is-morph-or-relation-field-metadata-type.util.js.map