"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateMultiSelectFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateMultiSelectFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _validatearrayfieldorthrowutil = require("./validate-array-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../../../common-query-runners/errors/standard-error-message.constant");
const validateMultiSelectFieldOrThrow = (value, fieldName, options)=>{
    const preValidatedValue = (0, _validatearrayfieldorthrowutil.validateArrayFieldOrThrow)(value, fieldName);
    if ((0, _guards.isNull)(preValidatedValue)) return null;
    if (!(0, _utils.isDefined)(options)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid options for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if ((Array.isArray(preValidatedValue) ? preValidatedValue : [
        preValidatedValue
    ]).some((item)=>!options.includes(item))) {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid value ${inspectedValue} for multi select field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
            userFriendlyMessage: /*i18n*/ {
                id: "Q6jO3x",
                message: 'Invalid value for multi-select: "{inspectedValue}"',
                values: {
                    inspectedValue: inspectedValue
                }
            }
        });
    }
    return value;
};

//# sourceMappingURL=validate-multi-select-field-or-throw.util.js.map