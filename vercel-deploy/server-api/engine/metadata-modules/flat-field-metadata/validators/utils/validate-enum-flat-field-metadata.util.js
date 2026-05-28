"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateEnumSelectFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return validateEnumSelectFlatFieldMetadata;
    }
});
const _core = require("@lingui/core");
const _guards = require("@sniptt/guards");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _zod = require("zod");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const _metadata = require("twenty-shared/metadata");
const _identifiermincharlengthconstants = require("../../../utils/constants/identifier-min-char-length.constants");
const _issnakecasestring = require("../../../../../utils/is-snake-case-string");
const validateMetadataOptionId = (sanitizedId)=>{
    const errors = [];
    if (!(0, _utils.isDefined)(sanitizedId)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "MniXaX",
                message: "Option id is required"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "MniXaX",
                message: "Option id is required"
            }
        });
    }
    if (!_zod.z.string().uuid().safeParse(sanitizedId).success) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "2mFkfl",
                message: "Option id is invalid"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "2mFkfl",
                message: "Option id is invalid"
            },
            value: sanitizedId
        });
    }
    return errors;
};
const validateMetadataOptionLabel = (sanitizedLabel)=>{
    const errors = [];
    if (!(0, _utils.isDefined)(sanitizedLabel)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "+E9N4m",
                message: "Option label is required"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "+E9N4m",
                message: "Option label is required"
            }
        });
        return errors;
    }
    if (!(0, _guards.isNonEmptyString)(sanitizedLabel)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "dFudyC",
                message: "Option label must be a string of at least one character"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "h8lHqX",
                message: "Option label format not supported"
            },
            value: sanitizedLabel
        });
        return errors;
    }
    if (sanitizedLabel.length > _metadata.IDENTIFIER_MAX_CHAR_LENGTH) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "mTFS0z",
                message: "Option label exceeds 63 characters"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "mTFS0z",
                message: "Option label exceeds 63 characters"
            },
            value: sanitizedLabel
        });
    }
    if (sanitizedLabel.length < _identifiermincharlengthconstants.IDENTIFIER_MIN_CHAR_LENGTH) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "//eyK1",
                message: 'Option label "{sanitizedLabel}" is beneath 1 character',
                values: {
                    sanitizedLabel: sanitizedLabel
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "//eyK1",
                message: 'Option label "{sanitizedLabel}" is beneath 1 character',
                values: {
                    sanitizedLabel: sanitizedLabel
                }
            },
            value: sanitizedLabel
        });
    }
    if (sanitizedLabel.includes(',')) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "k731jp",
                message: "Label must not contain a comma"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "k731jp",
                message: "Label must not contain a comma"
            },
            value: sanitizedLabel
        });
    }
    if (!(0, _guards.isNonEmptyString)(sanitizedLabel) || sanitizedLabel === ' ') {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "4EGmy6",
                message: "Label must not be empty"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "4EGmy6",
                message: "Label must not be empty"
            },
            value: sanitizedLabel
        });
    }
    return errors;
};
const validateMetadataOptionValue = (sanitizedValue)=>{
    const errors = [];
    if (!(0, _utils.isDefined)(sanitizedValue)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "/wsRPd",
                message: "Option value is required"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "/wsRPd",
                message: "Option value is required"
            }
        });
        return errors;
    }
    if (!(0, _guards.isNonEmptyString)(sanitizedValue)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "Kub9t0",
                message: "Option value must be a string of at least one character"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "zEGChV",
                message: "Option value format not supported"
            },
            value: sanitizedValue
        });
        return errors;
    }
    if (sanitizedValue.length > _metadata.IDENTIFIER_MAX_CHAR_LENGTH) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "5m/1Hh",
                message: "Option value exceeds 63 characters"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "5m/1Hh",
                message: "Option value exceeds 63 characters"
            },
            value: sanitizedValue
        });
    }
    if (sanitizedValue.length < _identifiermincharlengthconstants.IDENTIFIER_MIN_CHAR_LENGTH) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "nQqNzE",
                message: 'Option value "{sanitizedValue}" is beneath 1 character',
                values: {
                    sanitizedValue: sanitizedValue
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "nQqNzE",
                message: 'Option value "{sanitizedValue}" is beneath 1 character',
                values: {
                    sanitizedValue: sanitizedValue
                }
            },
            value: sanitizedValue
        });
    }
    if (!(0, _issnakecasestring.isSnakeCaseString)(sanitizedValue)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "UBPzFQ",
                message: 'Value must be in UPPER_CASE and follow snake_case "{sanitizedValue}"',
                values: {
                    sanitizedValue: sanitizedValue
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "UBPzFQ",
                message: 'Value must be in UPPER_CASE and follow snake_case "{sanitizedValue}"',
                values: {
                    sanitizedValue: sanitizedValue
                }
            },
            value: sanitizedValue
        });
    }
    return errors;
};
const validateDuplicates = (options)=>{
    const errors = [];
    const fieldsToCheckForDuplicates = [
        'position',
        'id',
        'value'
    ];
    for (const field of fieldsToCheckForDuplicates){
        const hasDuplicates = new Set(options.map((option)=>option[field])).size !== options.length;
        if (hasDuplicates) {
            errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "BXtAxc",
                    message: "Duplicated option {field}",
                    values: {
                        field: field
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "BXtAxc",
                    message: "Duplicated option {field}",
                    values: {
                        field: field
                    }
                },
                value: options
            });
        }
    }
    return errors;
};
const validateFieldMetadataInputOptions = (universalFlatFieldMetadata)=>{
    const { options } = universalFlatFieldMetadata;
    if (!(0, _utils.isDefined)(options) || options.length === 0) {
        return [
            {
                code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                message: 'Options are required for enum fields',
                userFriendlyMessage: /*i18n*/ {
                    id: "EabrTR",
                    message: "Options are required for enum fields"
                },
                value: options
            }
        ];
    }
    const optionsValidationErrors = options.flatMap((option)=>[
            validateMetadataOptionId(option.id),
            validateMetadataOptionValue(option.value),
            validateMetadataOptionLabel(option.label)
        ].flat());
    const duplicatedValidationErrors = validateDuplicates(options);
    return [
        ...optionsValidationErrors,
        ...duplicatedValidationErrors
    ];
};
const validateSelectDefaultValue = ({ defaultValue, options })=>{
    const errors = [];
    if (typeof defaultValue !== 'string') {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: `Default value for select must be a string got ${defaultValue}`,
            userFriendlyMessage: /*i18n*/ {
                id: "FdUbPo",
                message: "Default value must be a string"
            },
            value: defaultValue
        });
        return errors;
    }
    if (!_constants.QUOTED_STRING_REGEX.test(defaultValue)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "sv9P4Q",
                message: "Default value should be as quoted string"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "sv9P4Q",
                message: "Default value should be as quoted string"
            },
            value: defaultValue
        });
    }
    const matchesOptionValue = options.some((option)=>option.value === defaultValue.replace(_constants.QUOTED_STRING_REGEX, '$1'));
    if (!matchesOptionValue) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "GGNmm+",
                message: 'Default value "{defaultValue}" must be one of the option values',
                values: {
                    defaultValue: defaultValue
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "GGNmm+",
                message: 'Default value "{defaultValue}" must be one of the option values',
                values: {
                    defaultValue: defaultValue
                }
            },
            value: defaultValue
        });
    }
    return errors;
};
const validateMultiSelectDefaultValue = ({ multiSelectDefaultValue, options })=>{
    const errors = [];
    if (!Array.isArray(multiSelectDefaultValue)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            userFriendlyMessage: /*i18n*/ {
                id: "Wu/pkS",
                message: "Multi-select field default value must be an array"
            },
            message: `Default value for multi-select must be an array got ${multiSelectDefaultValue}`,
            value: multiSelectDefaultValue
        });
        return errors;
    }
    if (multiSelectDefaultValue.length === 0) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "YcVn4w",
                message: "If defined default value must contain at least one value"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "YcVn4w",
                message: "If defined default value must contain at least one value"
            },
            value: multiSelectDefaultValue
        });
    }
    if (new Set(multiSelectDefaultValue).size !== multiSelectDefaultValue.length) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "6pJV03",
                message: "Default values must be unique"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "6pJV03",
                message: "Default values must be unique"
            },
            value: multiSelectDefaultValue
        });
    }
    for (const defaultValue of multiSelectDefaultValue){
        errors.push(...validateSelectDefaultValue({
            defaultValue,
            options
        }));
    }
    return errors;
};
const validateFieldMetadataDefaultValue = ({ defaultValue, options, type })=>{
    switch(type){
        case _types.FieldMetadataType.SELECT:
        case _types.FieldMetadataType.RATING:
            return validateSelectDefaultValue({
                defaultValue,
                options
            });
        case _types.FieldMetadataType.MULTI_SELECT:
            return validateMultiSelectDefaultValue({
                multiSelectDefaultValue: defaultValue,
                options
            });
        default:
            {
                (0, _utils.assertUnreachable)(type, 'Should never occur, unknown field metadata enum type');
            }
    }
};
const validateEnumSelectFlatFieldMetadata = ({ flatEntityToValidate: universalFlatFieldMetadataToValidate })=>{
    const optionsValidationErrors = validateFieldMetadataInputOptions(universalFlatFieldMetadataToValidate);
    const defaultValueValidationErrors = (0, _utils.isDefined)(universalFlatFieldMetadataToValidate.defaultValue) ? validateFieldMetadataDefaultValue({
        ...universalFlatFieldMetadataToValidate,
        defaultValue: universalFlatFieldMetadataToValidate.defaultValue
    }) : [];
    return [
        ...optionsValidationErrors,
        ...defaultValueValidationErrors
    ];
};

//# sourceMappingURL=validate-enum-flat-field-metadata.util.js.map