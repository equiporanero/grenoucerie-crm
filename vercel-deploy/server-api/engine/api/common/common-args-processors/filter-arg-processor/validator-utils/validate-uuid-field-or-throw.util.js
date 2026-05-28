"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateUUIDFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateUUIDFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const validateUUIDFieldOrThrow = (value, fieldName)=>{
    if (!(0, _guards.isNonEmptyString)(value) && !(0, _guards.isNull)(value) || (0, _guards.isNonEmptyString)(value) && !(0, _utils.isValidUuid)(value)) {
        const inspectedValue = (0, _util.inspect)(value);
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid UUID value ${inspectedValue} for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_FILTER, {
            userFriendlyMessage: /*i18n*/ {
                id: "ZjemzY",
                message: 'Invalid value for UUID: "{inspectedValue}"',
                values: {
                    inspectedValue: inspectedValue
                }
            }
        });
    }
    return value;
};

//# sourceMappingURL=validate-uuid-field-or-throw.util.js.map