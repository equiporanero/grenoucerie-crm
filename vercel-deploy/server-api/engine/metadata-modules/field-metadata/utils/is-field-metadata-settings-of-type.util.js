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
    get isFieldMetadataSettingsOfType () {
        return isFieldMetadataSettingsOfType;
    },
    get isUniversalFieldMetadataSettingsOftype () {
        return isUniversalFieldMetadataSettingsOftype;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const isFieldMetadataSettingsOfType = (settings, fieldMetadataType)=>{
    // Settings don't have a discriminator - the type is determined by fieldMetadataType
    // For required settings types (RELATION, MORPH_RELATION, FILES), ensure settings is defined
    if (fieldMetadataType === _types.FieldMetadataType.RELATION || fieldMetadataType === _types.FieldMetadataType.MORPH_RELATION || fieldMetadataType === _types.FieldMetadataType.FILES) {
        return (0, _utils.isDefined)(settings);
    }
    return true;
};
const isUniversalFieldMetadataSettingsOftype = (settings, fieldMetadataType)=>{
    // Settings don't have a discriminator - the type is determined by fieldMetadataType
    // For required settings types (RELATION, MORPH_RELATION, FILES), ensure settings is defined
    if (fieldMetadataType === _types.FieldMetadataType.RELATION || fieldMetadataType === _types.FieldMetadataType.MORPH_RELATION || fieldMetadataType === _types.FieldMetadataType.FILES) {
        return (0, _utils.isDefined)(settings);
    }
    return true;
};

//# sourceMappingURL=is-field-metadata-settings-of-type.util.js.map