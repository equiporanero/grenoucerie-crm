"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFlatObjectMetadataLabel", {
    enumerable: true,
    get: function() {
        return validateFlatObjectMetadataLabel;
    }
});
const _objectmetadataexception = require("../../../object-metadata/object-metadata.exception");
const _metadata = require("twenty-shared/metadata");
const _identifiermincharlengthconstants = require("../../../utils/constants/identifier-min-char-length.constants");
const validateFlatObjectMetadataLabel = ({ labelPlural, labelSingular })=>{
    const errors = [];
    // Validate both labelSingular and labelPlural
    for (const label of [
        labelSingular,
        labelPlural
    ]){
        // Length too short check
        if (label.length < _identifiermincharlengthconstants.IDENTIFIER_MIN_CHAR_LENGTH) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: `Object label is too short`,
                userFriendlyMessage: /*i18n*/ {
                    id: "nmhjwk",
                    message: "Object label is too short"
                },
                value: label
            });
        }
        // Length too long check
        if (label.length > _metadata.IDENTIFIER_MAX_CHAR_LENGTH) {
            errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: `Object label is too long`,
                userFriendlyMessage: /*i18n*/ {
                    id: "wLX74t",
                    message: "Object label is too long"
                },
                value: label
            });
        }
    }
    return errors;
};

//# sourceMappingURL=validate-flat-object-metadata-label.util.js.map