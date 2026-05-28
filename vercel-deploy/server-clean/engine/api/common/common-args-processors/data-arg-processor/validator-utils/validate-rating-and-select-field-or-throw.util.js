"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRatingAndSelectFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateRatingAndSelectFieldOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _validatetextfieldorthrowutil = require("./validate-text-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../../../common-query-runners/errors/standard-error-message.constant");
const validateRatingAndSelectFieldOrThrow = (value, fieldName, options)=>{
    const preValidatedValue = (0, _validatetextfieldorthrowutil.validateTextFieldOrThrow)(value, fieldName);
    if (!(0, _utils.isDefined)(options)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid options for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if (!(0, _guards.isNull)(preValidatedValue) && !options.includes(preValidatedValue)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid value "${preValidatedValue}" for field "${fieldName}". Valid values are: ${options.join(', ')}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "qvqNco",
                message: 'Invalid value for field "{fieldName}"',
                values: {
                    fieldName: fieldName
                }
            }
        });
    }
    return preValidatedValue;
};

//# sourceMappingURL=validate-rating-and-select-field-or-throw.util.js.map