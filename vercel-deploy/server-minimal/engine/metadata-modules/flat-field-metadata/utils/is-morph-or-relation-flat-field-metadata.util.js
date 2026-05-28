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
    get isMorphOrRelationFlatFieldMetadata () {
        return isMorphOrRelationFlatFieldMetadata;
    },
    get isMorphOrRelationUniversalFlatFieldMetadata () {
        return isMorphOrRelationUniversalFlatFieldMetadata;
    }
});
const _morphorrelationfieldmetadatatypetype = require("../../field-metadata/types/morph-or-relation-field-metadata-type.type");
const _isflatfieldmetadataoftypesutil = require("./is-flat-field-metadata-of-types.util");
const isMorphOrRelationFlatFieldMetadata = (flatFieldMetadata)=>(0, _isflatfieldmetadataoftypesutil.isFlatFieldMetadataOfTypes)(flatFieldMetadata, [
        ..._morphorrelationfieldmetadatatypetype.MORPH_OR_RELATION_FIELD_TYPES
    ]);
const isMorphOrRelationUniversalFlatFieldMetadata = (universalFlatFieldMetadata)=>(0, _isflatfieldmetadataoftypesutil.isFlatFieldMetadataOfTypes)(universalFlatFieldMetadata, [
        ..._morphorrelationfieldmetadatatypetype.MORPH_OR_RELATION_FIELD_TYPES
    ]);

//# sourceMappingURL=is-morph-or-relation-flat-field-metadata.util.js.map