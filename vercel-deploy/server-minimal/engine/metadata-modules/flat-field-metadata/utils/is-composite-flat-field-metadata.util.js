"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get isCompositeFlatFieldMetadata () {
        return isCompositeFlatFieldMetadata;
    },
    get isCompositeUniversalFlatFieldMetadata () {
        return isCompositeUniversalFlatFieldMetadata;
    }
});
const _compositefieldmetadatatypetype = require("../../field-metadata/types/composite-field-metadata-type.type");
const _isflatfieldmetadataoftypesutil = require("./is-flat-field-metadata-of-types.util");
const isCompositeFlatFieldMetadata = (flatFieldMetadata)=>(0, _isflatfieldmetadataoftypesutil.isFlatFieldMetadataOfTypes)(flatFieldMetadata, _compositefieldmetadatatypetype.COMPOSITE_FIELD_TYPES);
const isCompositeUniversalFlatFieldMetadata = (universalFlatFieldMetadata)=>(0, _isflatfieldmetadataoftypesutil.isFlatFieldMetadataOfTypes)(universalFlatFieldMetadata, _compositefieldmetadatatypetype.COMPOSITE_FIELD_TYPES);

//# sourceMappingURL=is-composite-flat-field-metadata.util.js.map