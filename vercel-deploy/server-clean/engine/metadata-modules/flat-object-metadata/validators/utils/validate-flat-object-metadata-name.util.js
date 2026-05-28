"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFlatObjectMetadataNames", {
    enumerable: true,
    get: function() {
        return validateFlatObjectMetadataNames;
    }
});
const _metadata = require("twenty-shared/metadata");
const _objectmetadataexception = require("../../../object-metadata/object-metadata.exception");
const _identifiermincharlengthconstants = require("../../../utils/constants/identifier-min-char-length.constants");
const STARTS_WITH_LOWER_CASE_AND_CONTAINS_ONLY_CAPS_AND_LOWER_LETTERS_AND_NUMBER_STRING_REGEX = /^[a-z][a-zA-Z0-9]*$/;
const validateFlatObjectMetadataNames = ({ namePlural, nameSingular })=>{
    const errors = [];
    // Validate both nameSingular and namePlural
    for (const name of [
        nameSingular,
        namePlural
    ]){
        // Length too long check
        if (name.length > _metadata.IDENTIFIER_MAX_CHAR_LENGTH) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: `Name is too long`,
                userFriendlyMessage: /*i18n*/ {
                    id: "zjh2SJ",
                    message: "Name is too long"
                },
                value: name
            });
        }
        // Length too short check
        if (name.length < _identifiermincharlengthconstants.IDENTIFIER_MIN_CHAR_LENGTH) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: `Name is too short`,
                userFriendlyMessage: /*i18n*/ {
                    id: "go/Vg1",
                    message: "Name is too short"
                },
                value: name
            });
        }
        // Format check
        if (!name.match(STARTS_WITH_LOWER_CASE_AND_CONTAINS_ONLY_CAPS_AND_LOWER_LETTERS_AND_NUMBER_STRING_REGEX)) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: `Name is not valid: it must start with lowercase letter and contain only alphanumeric letters`,
                userFriendlyMessage: /*i18n*/ {
                    id: "Ny5wFU",
                    message: "Name is not valid: it must start with lowercase letter and contain only alphanumeric letters"
                },
                value: name
            });
        }
        // Reserved keywords check
        if (_metadata.RESERVED_METADATA_NAME_KEYWORDS.includes(name)) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: `This name is reserved. Use a different name or the system will add "Custom" suffix.`,
                userFriendlyMessage: /*i18n*/ {
                    id: "gPBck6",
                    message: 'This name is reserved. Use a different name or the system will add "Custom" suffix.'
                },
                value: name
            });
        }
    }
    // Check if names are identical
    const namesAreIdentical = namePlural.trim().toLowerCase() === nameSingular.trim().toLowerCase();
    if (namesAreIdentical) {
        errors.push({
            code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
            message: `The singular and plural names cannot be the same for an object`,
            userFriendlyMessage: /*i18n*/ {
                id: "FOEWHl",
                message: "The singular and plural names cannot be the same for an object"
            },
            value: namePlural
        });
    }
    return errors;
};

//# sourceMappingURL=validate-flat-object-metadata-name.util.js.map