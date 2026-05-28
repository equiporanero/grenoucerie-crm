"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformPhonesValue", {
    enumerable: true,
    get: function() {
        return transformPhonesValue;
    }
});
const _guards = require("@sniptt/guards");
const _libphonenumberjs = require("libphonenumber-js");
const _lodashisempty = /*#__PURE__*/ _interop_require_default(require("lodash.isempty"));
const _utils = require("twenty-shared/utils");
const _recordtransformerexception = require("../record-transformer.exception");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const removePlusFromString = (str)=>str.replace(/\+/g, '');
const nullIfEmptyString = (value)=>!(0, _utils.isDefined)(value) ? value : (0, _guards.isNonEmptyString)(value) ? value : null;
const validatePrimaryPhoneCountryCodeAndCallingCode = ({ callingCode, countryCode })=>{
    if ((0, _guards.isNonEmptyString)(countryCode) && !(0, _utils.isValidCountryCode)(countryCode)) {
        throw new _recordtransformerexception.RecordTransformerException(`Invalid country code ${countryCode}`, _recordtransformerexception.RecordTransformerExceptionCode.INVALID_PHONE_COUNTRY_CODE, {
            userFriendlyMessage: /*i18n*/ {
                id: "1PtrY0",
                message: "Invalid country code {countryCode}",
                values: {
                    countryCode: countryCode
                }
            }
        });
    }
    if (!(0, _guards.isNonEmptyString)(callingCode)) {
        return;
    }
    const expectedCountryCodes = (0, _utils.getCountryCodesForCallingCode)(callingCode);
    if (expectedCountryCodes.length === 0) {
        throw new _recordtransformerexception.RecordTransformerException(`Invalid calling code ${callingCode}`, _recordtransformerexception.RecordTransformerExceptionCode.INVALID_PHONE_CALLING_CODE, {
            userFriendlyMessage: /*i18n*/ {
                id: "X7+bC6",
                message: "Invalid calling code {callingCode}",
                values: {
                    callingCode: callingCode
                }
            }
        });
    }
    if ((0, _guards.isNonEmptyString)(countryCode) && expectedCountryCodes.every((expectedCountryCode)=>expectedCountryCode !== countryCode)) {
        throw new _recordtransformerexception.RecordTransformerException(`Provided country code and calling code are conflicting`, _recordtransformerexception.RecordTransformerExceptionCode.CONFLICTING_PHONE_CALLING_CODE_AND_COUNTRY_CODE, {
            userFriendlyMessage: /*i18n*/ {
                id: "HZ45ox",
                message: "Provided country code and calling code are conflicting"
            }
        });
    }
};
const parsePhoneNumberExceptionWrapper = ({ callingCode, countryCode, number })=>{
    try {
        return (0, _libphonenumberjs.parsePhoneNumberWithError)(number, {
            defaultCallingCode: callingCode ? removePlusFromString(callingCode) : callingCode,
            defaultCountry: countryCode
        });
    } catch  {
        throw new _recordtransformerexception.RecordTransformerException(`Provided phone number is invalid ${number}`, _recordtransformerexception.RecordTransformerExceptionCode.INVALID_PHONE_NUMBER, {
            userFriendlyMessage: /*i18n*/ {
                id: "A4Ohxb",
                message: "Provided phone number is invalid {number}",
                values: {
                    number: number
                }
            }
        });
    }
};
const validateAndInferMetadataFromPrimaryPhoneNumber = ({ callingCode, countryCode, number })=>{
    const phone = parsePhoneNumberExceptionWrapper({
        callingCode,
        countryCode,
        number
    });
    if ((0, _guards.isNonEmptyString)(phone.country) && (0, _guards.isNonEmptyString)(countryCode) && phone.country !== countryCode) {
        throw new _recordtransformerexception.RecordTransformerException('Provided and inferred country code are conflicting', _recordtransformerexception.RecordTransformerExceptionCode.CONFLICTING_PHONE_COUNTRY_CODE, {
            userFriendlyMessage: /*i18n*/ {
                id: "Vq/afT",
                message: "Provided and inferred country code are conflicting"
            }
        });
    }
    if ((0, _guards.isNonEmptyString)(phone.countryCallingCode) && (0, _guards.isNonEmptyString)(callingCode) && phone.countryCallingCode !== removePlusFromString(callingCode)) {
        throw new _recordtransformerexception.RecordTransformerException('Provided and inferred calling code are conflicting', _recordtransformerexception.RecordTransformerExceptionCode.CONFLICTING_PHONE_CALLING_CODE, {
            userFriendlyMessage: /*i18n*/ {
                id: "dtGxRz",
                message: "Provided and inferred calling code are conflicting"
            }
        });
    }
    const finalPrimaryPhoneCallingCode = callingCode ?? `+${phone.countryCallingCode}`;
    const finalPrimaryPhoneCountryCode = countryCode ?? phone.country;
    return {
        countryCode: finalPrimaryPhoneCountryCode,
        callingCode: finalPrimaryPhoneCallingCode,
        number: phone.nationalNumber
    };
};
const validateAndInferPhoneInput = ({ callingCode, countryCode, number })=>{
    validatePrimaryPhoneCountryCodeAndCallingCode({
        callingCode,
        countryCode
    });
    if ((0, _guards.isNonEmptyString)(number)) {
        return validateAndInferMetadataFromPrimaryPhoneNumber({
            number,
            callingCode: (0, _guards.isNonEmptyString)(callingCode) ? callingCode : undefined,
            countryCode: (0, _guards.isNonEmptyString)(countryCode) && (0, _utils.isValidCountryCode)(countryCode) ? countryCode : undefined
        });
    }
    return {
        callingCode: nullIfEmptyString(callingCode),
        countryCode: nullIfEmptyString(countryCode),
        number: nullIfEmptyString(number)
    };
};
const transformPhonesValue = ({ input })=>{
    if (!(0, _utils.isDefined)(input)) {
        return input;
    }
    const { additionalPhones, ...primary } = input;
    const { callingCode: primaryPhoneCallingCode, countryCode: primaryPhoneCountryCode, number: primaryPhoneNumber } = validateAndInferPhoneInput({
        callingCode: primary.primaryPhoneCallingCode,
        countryCode: primary.primaryPhoneCountryCode,
        number: primary.primaryPhoneNumber
    });
    const parsedAdditionalPhones = (0, _guards.isNonEmptyString)(additionalPhones) ? (0, _utils.parseJson)(additionalPhones) ?? [] : (0, _guards.isArray)(additionalPhones) ? additionalPhones : [];
    const validatedAdditionalPhones = parsedAdditionalPhones.map(validateAndInferPhoneInput);
    return (0, _utils.removeUndefinedFields)({
        additionalPhones: (0, _lodashisempty.default)(validatedAdditionalPhones) ? null : JSON.stringify(validatedAdditionalPhones),
        primaryPhoneCallingCode,
        primaryPhoneCountryCode,
        primaryPhoneNumber
    });
};

//# sourceMappingURL=transform-phones-value.util.js.map