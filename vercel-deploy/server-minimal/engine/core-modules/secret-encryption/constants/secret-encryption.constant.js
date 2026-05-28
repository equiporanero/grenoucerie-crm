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
    get INSTANCE_HMAC_DERIVED_KEY_LENGTH () {
        return INSTANCE_HMAC_DERIVED_KEY_LENGTH;
    },
    get INSTANCE_HMAC_HKDF_INFO_PREFIX () {
        return INSTANCE_HMAC_HKDF_INFO_PREFIX;
    },
    get SECRET_ENCRYPTION_DERIVED_KEY_LENGTH () {
        return SECRET_ENCRYPTION_DERIVED_KEY_LENGTH;
    },
    get SECRET_ENCRYPTION_ENVELOPE_PREFIX () {
        return SECRET_ENCRYPTION_ENVELOPE_PREFIX;
    },
    get SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX () {
        return SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX;
    },
    get SECRET_ENCRYPTION_GCM_IV_LENGTH () {
        return SECRET_ENCRYPTION_GCM_IV_LENGTH;
    },
    get SECRET_ENCRYPTION_GCM_TAG_LENGTH () {
        return SECRET_ENCRYPTION_GCM_TAG_LENGTH;
    },
    get SECRET_ENCRYPTION_HKDF_INFO_PREFIX () {
        return SECRET_ENCRYPTION_HKDF_INFO_PREFIX;
    },
    get SECRET_ENCRYPTION_INSTANCE_CONTEXT () {
        return SECRET_ENCRYPTION_INSTANCE_CONTEXT;
    },
    get SECRET_ENCRYPTION_KEY_ID_REGEX () {
        return SECRET_ENCRYPTION_KEY_ID_REGEX;
    }
});
const SECRET_ENCRYPTION_ENVELOPE_PREFIX = 'enc:';
const SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX = 'enc:v2:';
const SECRET_ENCRYPTION_KEY_ID_REGEX = /^[0-9a-f]{8}$/;
const SECRET_ENCRYPTION_GCM_IV_LENGTH = 12;
const SECRET_ENCRYPTION_GCM_TAG_LENGTH = 16;
const SECRET_ENCRYPTION_DERIVED_KEY_LENGTH = 32;
const SECRET_ENCRYPTION_HKDF_INFO_PREFIX = 'twenty:enc:v2:';
const SECRET_ENCRYPTION_INSTANCE_CONTEXT = 'instance';
const INSTANCE_HMAC_HKDF_INFO_PREFIX = 'twenty:hmac:v1:';
const INSTANCE_HMAC_DERIVED_KEY_LENGTH = 32;

//# sourceMappingURL=secret-encryption.constant.js.map