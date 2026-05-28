"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SecretEncryptionService", {
    enumerable: true,
    get: function() {
        return SecretEncryptionService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _environmentconfigdriver = require("../twenty-config/drivers/environment-config.driver");
const _computeencryptionkeyidutil = require("./utils/compute-encryption-key-id.util");
const _decryptaesctrorthrowutil = require("./utils/decrypt-aes-ctr-or-throw.util");
const _decryptaesgcmv2orthrowutil = require("./utils/decrypt-aes-gcm-v2-or-throw.util");
const _encryptaesctrutil = require("./utils/encrypt-aes-ctr.util");
const _encryptaesgcmv2util = require("./utils/encrypt-aes-gcm-v2.util");
const _formatsecretencryptionenvelopev2util = require("./utils/format-secret-encryption-envelope-v2.util");
const _parsesecretencryptionenvelopeorthrowutil = require("./utils/parse-secret-encryption-envelope-or-throw.util");
const _pickencryptionkeybykeyidorthrowutil = require("./utils/pick-encryption-key-by-key-id-or-throw.util");
const _resolveencryptionkeysorthrowutil = require("./utils/resolve-encryption-keys-or-throw.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SecretEncryptionService = class SecretEncryptionService {
    encrypt(value) {
        if (!(0, _utils.isDefined)(value)) {
            return value;
        }
        const { primary } = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
            environmentConfigDriver: this.environmentConfigDriver
        });
        return (0, _encryptaesctrutil.encryptAesCtr)({
            plaintext: value,
            rawKey: primary
        });
    }
    // Legacy CTR has no integrity tag, so a wrong key produces an arbitrary
    // byte sequence rather than throwing. Rotation of these rows requires
    // migrating the consumer to the versioned envelope first.
    decrypt(value) {
        if (!(0, _utils.isDefined)(value)) {
            return value;
        }
        const { primary } = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
            environmentConfigDriver: this.environmentConfigDriver
        });
        return (0, _decryptaesctrorthrowutil.decryptAesCtrOrThrow)({
            ciphertext: value,
            rawKey: primary
        });
    }
    decryptAndMask({ value, mask }) {
        if (!(0, _utils.isDefined)(value)) {
            return value;
        }
        return this.maskDecryptedValue(this.decrypt(value), mask);
    }
    decryptAndMaskVersioned({ value, mask, workspaceId }) {
        if (!(0, _utils.isDefined)(value)) {
            return value;
        }
        return this.maskDecryptedValue(this.decryptVersioned(value, {
            workspaceId
        }), mask);
    }
    maskDecryptedValue(decryptedValue, mask) {
        // Visible-char count caps at 5 and at one-tenth of the secret length, so
        // short secrets reveal nothing and longer secrets reveal a stable prefix.
        const visibleCharsCount = Math.min(5, Math.floor(decryptedValue.length / 10));
        return `${decryptedValue.slice(0, visibleCharsCount)}${mask}`;
    }
    encryptVersioned(value, opts = {}) {
        if (!(0, _utils.isDefined)(value)) {
            return value;
        }
        const { primary } = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
            environmentConfigDriver: this.environmentConfigDriver
        });
        const payloadBase64 = (0, _encryptaesgcmv2util.encryptAesGcmV2)({
            plaintext: value,
            rawKey: primary,
            workspaceId: opts.workspaceId
        });
        const keyId = (0, _computeencryptionkeyidutil.computeEncryptionKeyId)({
            rawKey: primary
        });
        return (0, _formatsecretencryptionenvelopev2util.formatSecretEncryptionEnvelopeV2)({
            keyId,
            payloadBase64
        });
    }
    decryptVersioned(value, opts = {}) {
        if (!(0, _utils.isDefined)(value)) {
            return value;
        }
        const parsed = (0, _parsesecretencryptionenvelopeorthrowutil.parseSecretEncryptionEnvelopeOrThrow)({
            value
        });
        if (parsed.version === 2) {
            const keys = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
                environmentConfigDriver: this.environmentConfigDriver
            });
            const rawKey = (0, _pickencryptionkeybykeyidorthrowutil.pickEncryptionKeyByKeyIdOrThrow)({
                keyId: parsed.keyId,
                keys
            });
            return (0, _decryptaesgcmv2orthrowutil.decryptAesGcmV2OrThrow)({
                payloadBase64: parsed.payload,
                rawKey,
                workspaceId: opts.workspaceId
            });
        }
        this.warnLegacyCtrDecryptionOnce();
        return this.decrypt(value);
    }
    warnLegacyCtrDecryptionOnce() {
        if (this.hasLoggedLegacyCtrDecryption) {
            return;
        }
        this.hasLoggedLegacyCtrDecryption = true;
        this.logger.warn('Decrypted a legacy unprefixed AES-CTR ciphertext. These rows should be re-encrypted into the enc:v2 envelope in a follow-up migration.');
    }
    constructor(environmentConfigDriver){
        this.environmentConfigDriver = environmentConfigDriver;
        this.logger = new _common.Logger(SecretEncryptionService.name);
        this.hasLoggedLegacyCtrDecryption = false;
    }
};
SecretEncryptionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _environmentconfigdriver.EnvironmentConfigDriver === "undefined" ? Object : _environmentconfigdriver.EnvironmentConfigDriver
    ])
], SecretEncryptionService);

//# sourceMappingURL=secret-encryption.service.js.map