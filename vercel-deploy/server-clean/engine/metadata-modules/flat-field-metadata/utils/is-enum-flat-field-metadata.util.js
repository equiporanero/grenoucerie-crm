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
    get isEnumFlatFieldMetadata () {
        return isEnumFlatFieldMetadata;
    },
    get isEnumUniversalFlatFieldMetadata () {
        return isEnumUniversalFlatFieldMetadata;
    }
});
const _enumfieldmetadatatypetype = require("../../field-metadata/types/enum-field-metadata-type.type");
const _isflatfieldmetadataoftypesutil = require("./is-flat-field-metadata-of-types.util");
const isEnumFlatFieldMetadata = (flatFieldMetadata)=>(0, _isflatfieldmetadataoftypesutil.isFlatFieldMetadataOfTypes)(flatFieldMetadata, _enumfieldmetadatatypetype.ENUM_FIELD_TYPES);
const isEnumUniversalFlatFieldMetadata = (universalFlatFieldMetadata)=>(0, _isflatfieldmetadataoftypesutil.isFlatFieldMetadataOfTypes)(universalFlatFieldMetadata, _enumfieldmetadatatypetype.ENUM_FIELD_TYPES);

//# sourceMappingURL=is-enum-flat-field-metadata.util.js.map