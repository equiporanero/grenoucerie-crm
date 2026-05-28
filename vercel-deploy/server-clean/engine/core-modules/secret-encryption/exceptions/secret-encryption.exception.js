"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get SecretEncryptionException () {
        return SecretEncryptionException;
    },
    get SecretEncryptionExceptionCode () {
        return SecretEncryptionExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var SecretEncryptionExceptionCode = /*#__PURE__*/ function(SecretEncryptionExceptionCode) {
    SecretEncryptionExceptionCode["NO_ENCRYPTION_KEY_CONFIGURED"] = "NO_ENCRYPTION_KEY_CONFIGURED";
    SecretEncryptionExceptionCode["UNKNOWN_KEY_ID"] = "UNKNOWN_KEY_ID";
    SecretEncryptionExceptionCode["MALFORMED_ENVELOPE"] = "MALFORMED_ENVELOPE";
    SecretEncryptionExceptionCode["UNKNOWN_ENVELOPE_VERSION"] = "UNKNOWN_ENVELOPE_VERSION";
    SecretEncryptionExceptionCode["INVALID_KEY_ID_FORMAT"] = "INVALID_KEY_ID_FORMAT";
    SecretEncryptionExceptionCode["CIPHERTEXT_TOO_SHORT"] = "CIPHERTEXT_TOO_SHORT";
    SecretEncryptionExceptionCode["ALREADY_ENCRYPTED"] = "ALREADY_ENCRYPTED";
    return SecretEncryptionExceptionCode;
}({});
const getSecretEncryptionExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "NO_ENCRYPTION_KEY_CONFIGURED":
        case "UNKNOWN_KEY_ID":
        case "MALFORMED_ENVELOPE":
        case "UNKNOWN_ENVELOPE_VERSION":
        case "INVALID_KEY_ID_FORMAT":
        case "CIPHERTEXT_TOO_SHORT":
        case "ALREADY_ENCRYPTED":
            return /*i18n*/ {
                id: "KvWKJI",
                message: "An internal error occurred while handling encrypted data."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let SecretEncryptionException = class SecretEncryptionException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getSecretEncryptionExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=secret-encryption.exception.js.map