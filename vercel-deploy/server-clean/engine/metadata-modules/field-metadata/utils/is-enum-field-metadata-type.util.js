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
    get fieldMetadataEnumTypes () {
        return fieldMetadataEnumTypes;
    },
    get isEnumFieldMetadataType () {
        return isEnumFieldMetadataType;
    }
});
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const fieldMetadataEnumTypes = [
    _types.FieldMetadataType.MULTI_SELECT,
    _types.FieldMetadataType.SELECT,
    _types.FieldMetadataType.RATING
];
const isEnumFieldMetadataType = (type)=>(0, _classvalidator.isDefined)(fieldMetadataEnumTypes.find((el)=>type === el));

//# sourceMappingURL=is-enum-field-metadata-type.util.js.map