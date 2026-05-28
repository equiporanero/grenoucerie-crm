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
    get optionsValidatorsMap () {
        return optionsValidatorsMap;
    },
    get validateOptionsForType () {
        return validateOptionsForType;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _optionsinput = require("../dtos/options.input");
const _fieldmetadataexception = require("../field-metadata.exception");
const _isenumfieldmetadatatypeutil = require("./is-enum-field-metadata-type.util");
const optionsValidatorsMap = {
    // RATING doesn't need to be provided as it's the backend that will generate the options
    [_types.FieldMetadataType.SELECT]: [
        _optionsinput.FieldMetadataComplexOption
    ],
    [_types.FieldMetadataType.MULTI_SELECT]: [
        _optionsinput.FieldMetadataComplexOption
    ]
};
const validateOptionsForType = (type, options)=>{
    if (options === null) return true;
    if (!Array.isArray(options)) {
        throw new _fieldmetadataexception.FieldMetadataException('Options must be an array', _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
    }
    if (!(0, _isenumfieldmetadatatypeutil.isEnumFieldMetadataType)(type)) {
        return true;
    }
    if (type === _types.FieldMetadataType.RATING) {
        return true;
    }
    const values = options.map(({ value })=>value);
    // Check if all options are unique
    if (new Set(values).size !== options.length) {
        throw new _fieldmetadataexception.FieldMetadataException('Options must be unique', _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT);
    }
    const validators = optionsValidatorsMap[type];
    if (!validators) return false;
    const isValid = options.every((option)=>{
        return validators.some((validator)=>{
            const optionsInstance = (0, _classtransformer.plainToInstance)(validator, option);
            return (0, _classvalidator.validateSync)(optionsInstance, {
                whitelist: true,
                forbidNonWhitelisted: true,
                forbidUnknownValues: true
            }).length === 0;
        });
    });
    return isValid;
};

//# sourceMappingURL=validate-options-for-type.util.js.map