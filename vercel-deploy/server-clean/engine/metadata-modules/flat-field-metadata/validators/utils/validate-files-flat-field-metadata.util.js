"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFilesFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return validateFilesFlatFieldMetadata;
    }
});
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const validateFilesFlatFieldMetadata = ({ flatEntityToValidate })=>{
    const errors = [];
    if (flatEntityToValidate.isUnique === true) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: 'Files field is not supported for unique fields',
            userFriendlyMessage: /*i18n*/ {
                id: "psMxtB",
                message: "Files field is not supported for unique fields"
            }
        });
    }
    if (!(0, _utils.isDefined)(flatEntityToValidate?.universalSettings?.maxNumberOfValues) || flatEntityToValidate.universalSettings.maxNumberOfValues < 1 || flatEntityToValidate.universalSettings.maxNumberOfValues > _constants.FILES_FIELD_MAX_NUMBER_OF_VALUES) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: `maxNumberOfValues must be defined in settings and be a number greater than 0 and less than or equal to ${_constants.FILES_FIELD_MAX_NUMBER_OF_VALUES}`,
            userFriendlyMessage: /*i18n*/ {
                id: "b85bAt",
                message: "maxNumberOfValues must be defined in settings and be a number greater than 0 and less than or equal to {FILES_FIELD_MAX_NUMBER_OF_VALUES}",
                values: {
                    FILES_FIELD_MAX_NUMBER_OF_VALUES: _constants.FILES_FIELD_MAX_NUMBER_OF_VALUES
                }
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-files-flat-field-metadata.util.js.map