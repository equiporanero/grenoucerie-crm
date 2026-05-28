"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFlatFieldMetadataName", {
    enumerable: true,
    get: function() {
        return validateFlatFieldMetadataName;
    }
});
const _core = require("@lingui/core");
const _metadata = require("twenty-shared/metadata");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const _identifiermincharlengthconstants = require("../../../utils/constants/identifier-min-char-length.constants");
const _iscallertwentystandardapputil = require("../../../utils/is-caller-twenty-standard-app.util");
const STARTS_WITH_LOWER_CASE_AND_CONTAINS_ONLY_CAPS_AND_LOWER_LETTERS_AND_NUMBER_STRING_REGEX = /^[a-z][a-zA-Z0-9]*$/;
const validateFlatFieldMetadataName = ({ buildOptions, name })=>{
    const errors = [];
    if (name.length > _metadata.IDENTIFIER_MAX_CHAR_LENGTH) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "zjh2SJ",
                message: "Name is too long"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "zjh2SJ",
                message: "Name is too long"
            },
            value: name
        });
    }
    if (name.length < _identifiermincharlengthconstants.IDENTIFIER_MIN_CHAR_LENGTH) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "go/Vg1",
                message: "Name is too short"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "go/Vg1",
                message: "Name is too short"
            },
            value: name
        });
    }
    if (!name.match(STARTS_WITH_LOWER_CASE_AND_CONTAINS_ONLY_CAPS_AND_LOWER_LETTERS_AND_NUMBER_STRING_REGEX)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "Ny5wFU",
                message: "Name is not valid: it must start with lowercase letter and contain only alphanumeric letters"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "Ny5wFU",
                message: "Name is not valid: it must start with lowercase letter and contain only alphanumeric letters"
            },
            value: name
        });
    }
    if (!(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions) && _metadata.RESERVED_METADATA_NAME_KEYWORDS.includes(name)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "gPBck6",
                message: 'This name is reserved. Use a different name or the system will add "Custom" suffix.'
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "gPBck6",
                message: 'This name is reserved. Use a different name or the system will add "Custom" suffix.'
            },
            value: name
        });
    }
    return errors;
};

//# sourceMappingURL=validate-flat-field-metadata-name.util.js.map