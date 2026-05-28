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
    get computeColumnName () {
        return computeColumnName;
    },
    get computeCompositeColumnName () {
        return computeCompositeColumnName;
    }
});
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../field-metadata.exception");
const _iscompositefieldmetadatatypeutil = require("./is-composite-field-metadata-type.util");
function computeColumnName(fieldMetadataOrFieldName, options) {
    const generateName = (name)=>{
        return options?.isForeignKey ? `${name}Id` : name;
    };
    if (typeof fieldMetadataOrFieldName === 'string') {
        return generateName(fieldMetadataOrFieldName);
    }
    if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadataOrFieldName.type)) {
        throw new _fieldmetadataexception.FieldMetadataException(`Cannot compute composite column name for field: ${fieldMetadataOrFieldName.type}`, _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
    }
    return generateName(fieldMetadataOrFieldName.name);
}
function computeCompositeColumnName(fieldMetadataOrFieldName, compositeProperty) {
    const generateName = (name)=>{
        return `${name}${(0, _utils.pascalCase)(compositeProperty.name)}`;
    };
    if (typeof fieldMetadataOrFieldName === 'string') {
        return generateName(fieldMetadataOrFieldName);
    }
    if (!(0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadataOrFieldName.type)) {
        throw new _fieldmetadataexception.FieldMetadataException(`Cannot compute composite column name for non-composite field metadata type: ${fieldMetadataOrFieldName.type}`, _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
    }
    return generateName(fieldMetadataOrFieldName.name);
}

//# sourceMappingURL=compute-column-name.util.js.map