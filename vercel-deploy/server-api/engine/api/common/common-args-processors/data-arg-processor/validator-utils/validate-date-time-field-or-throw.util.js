"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateDateTimeFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateDateTimeFieldOrThrow;
    }
});
const _util = require("util");
const _guards = require("@sniptt/guards");
const _datefns = require("date-fns");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const ACCEPTED_DATE_TIME_FORMATS = [
    "yyyy-MM-dd'T'HH:mm:ss.SSSX",
    "yyyy-MM-dd'T'HH:mm:ssX",
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    "yyyy-MM-dd'T'HH:mm:ssxxx",
    "yyyy-MM-dd'T'HH:mm:ss.SSS",
    "yyyy-MM-dd'T'HH:mm:ss",
    'yyyy-MM-dd HH:mm:ss.SSS',
    'yyyy-MM-dd HH:mm:ss',
    'yyyy-MM-dd HH:mm',
    'yyyy-MM-dd',
    'yyyyMMdd',
    'yyyy.MM.dd',
    'yyyy/MM/dd',
    'MM-dd-yyyy',
    'MM/dd/yyyy',
    'MM.dd.yyyy',
    'MMMM d, yyyy',
    'MMM d, yyyy',
    'd MMMM yyyy',
    'd MMM yyyy',
    'dd-MMM-yyyy',
    'yyyy-MMM-dd'
];
const isValidDateTimeFormat = (value)=>{
    for (const format of ACCEPTED_DATE_TIME_FORMATS){
        const parsed = (0, _datefns.parse)(value, format, new Date());
        if ((0, _datefns.isValid)(parsed)) {
            return true;
        }
    }
    return false;
};
const validateDateTimeFieldOrThrow = (value, fieldName)=>{
    if ((0, _guards.isNull)(value)) return null;
    if ((0, _guards.isDate)(value) && (0, _datefns.isValid)(value)) {
        return value;
    }
    if ((0, _guards.isString)(value) && isValidDateTimeFormat(value)) {
        return value;
    }
    const inspectedValue = (0, _util.inspect)(value);
    throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid value ${inspectedValue} for date-time field "${fieldName}". Expected format: 'YYYY-MM-DDTHH:mm:ssZ'`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_ARGS_DATA, {
        userFriendlyMessage: /*i18n*/ {
            id: "MnHbVB",
            message: "Invalid value for date-time: \"{inspectedValue}\". Expected format: 'YYYY-MM-DDTHH:mm:ssZ'",
            values: {
                inspectedValue: inspectedValue
            }
        }
    });
};

//# sourceMappingURL=validate-date-time-field-or-throw.util.js.map