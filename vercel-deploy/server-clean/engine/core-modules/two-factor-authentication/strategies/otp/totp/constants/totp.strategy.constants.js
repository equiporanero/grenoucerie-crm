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
    get TOTPHashAlgorithms () {
        return TOTPHashAlgorithms;
    },
    get TOTPKeyEncodings () {
        return TOTPKeyEncodings;
    },
    get TOTP_DEFAULT_CONFIGURATION () {
        return TOTP_DEFAULT_CONFIGURATION;
    },
    get TOTP_STRATEGY_CONFIG_SCHEMA () {
        return TOTP_STRATEGY_CONFIG_SCHEMA;
    }
});
const _zod = require("zod");
var TOTPHashAlgorithms = /*#__PURE__*/ function(TOTPHashAlgorithms) {
    TOTPHashAlgorithms["SHA1"] = "sha1";
    TOTPHashAlgorithms["SHA256"] = "sha256";
    TOTPHashAlgorithms["SHA512"] = "sha512";
    return TOTPHashAlgorithms;
}({});
var TOTPKeyEncodings = /*#__PURE__*/ function(TOTPKeyEncodings) {
    TOTPKeyEncodings["ASCII"] = "ascii";
    TOTPKeyEncodings["BASE64"] = "base64";
    TOTPKeyEncodings["HEX"] = "hex";
    TOTPKeyEncodings["LATIN1"] = "latin1";
    TOTPKeyEncodings["UTF8"] = "utf8";
    return TOTPKeyEncodings;
}({});
const TOTP_DEFAULT_CONFIGURATION = {
    algorithm: "sha1",
    digits: 6,
    encodings: "hex",
    window: 3,
    step: 30
};
const TOTP_STRATEGY_CONFIG_SCHEMA = _zod.z.object({
    algorithm: _zod.z.enum(TOTPHashAlgorithms, {
        error: ()=>'Invalid algorithm specified. Must be SHA1, SHA256, or SHA512.'
    }).optional(),
    digits: _zod.z.int({
        error: 'Digits must be a whole number.'
    }).min(6, {
        error: 'Digits must be at least 6.'
    }).max(8, {
        error: 'Digits cannot be more than 8.'
    }).optional(),
    encodings: _zod.z.enum(TOTPKeyEncodings, {
        error: ()=>'Invalid encoding specified.'
    }).optional(),
    window: _zod.z.int().min(0).optional(),
    step: _zod.z.int().min(1).optional(),
    epoch: _zod.z.int().min(0).optional()
});

//# sourceMappingURL=totp.strategy.constants.js.map