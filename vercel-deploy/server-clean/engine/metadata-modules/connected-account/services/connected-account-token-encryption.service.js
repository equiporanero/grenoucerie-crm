"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectedAccountTokenEncryptionService", {
    enumerable: true,
    get: function() {
        return ConnectedAccountTokenEncryptionService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _secretencryptionconstant = require("../../../core-modules/secret-encryption/constants/secret-encryption.constant");
const _secretencryptionexception = require("../../../core-modules/secret-encryption/exceptions/secret-encryption.exception");
const _secretencryptionservice = require("../../../core-modules/secret-encryption/secret-encryption.service");
const _constants = require("twenty-shared/constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ConnectedAccountTokenEncryptionService = class ConnectedAccountTokenEncryptionService {
    encrypt({ plaintext, workspaceId }) {
        if (this.looksLikeCiphertext(plaintext)) {
            throw new _secretencryptionexception.SecretEncryptionException('ConnectedAccountTokenEncryptionService.encrypt received an already-encrypted envelope. This indicates a double-encryption bug — the caller is encrypting ciphertext.', _secretencryptionexception.SecretEncryptionExceptionCode.ALREADY_ENCRYPTED);
        }
        return this.secretEncryptionService.encryptVersioned(plaintext, {
            workspaceId
        });
    }
    encryptNullable({ plaintext, workspaceId }) {
        if (!(0, _utils.isDefined)(plaintext)) {
            return null;
        }
        return this.encrypt({
            plaintext,
            workspaceId
        });
    }
    decrypt({ ciphertext, workspaceId }) {
        if (!ciphertext.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_PREFIX)) {
            throw new _secretencryptionexception.SecretEncryptionException('Received a plaintext value where ciphertext was expected. The encryption backfill migration may not have run.', _secretencryptionexception.SecretEncryptionExceptionCode.MALFORMED_ENVELOPE);
        }
        return this.secretEncryptionService.decryptVersioned(ciphertext, {
            workspaceId
        });
    }
    decryptNullable({ ciphertext, workspaceId }) {
        if (!(0, _utils.isDefined)(ciphertext)) {
            return null;
        }
        return this.decrypt({
            ciphertext,
            workspaceId
        });
    }
    encryptTokenPair({ accessToken, refreshToken, workspaceId }) {
        return {
            encryptedAccessToken: this.encrypt({
                plaintext: accessToken,
                workspaceId
            }),
            encryptedRefreshToken: this.encryptNullable({
                plaintext: refreshToken,
                workspaceId
            })
        };
    }
    looksLikeCiphertext(value) {
        return value.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_PREFIX);
    }
    encryptConnectionParameters({ connectionParameters, workspaceId }) {
        const result = {};
        for (const protocol of _constants.ACCOUNT_TYPES){
            const params = connectionParameters[protocol];
            if (!(0, _utils.isDefined)(params)) {
                continue;
            }
            result[protocol] = {
                ...params,
                password: this.encrypt({
                    plaintext: params.password,
                    workspaceId
                })
            };
        }
        return result;
    }
    decryptConnectionParameters({ connectionParameters, workspaceId }) {
        const result = {};
        for (const protocol of _constants.ACCOUNT_TYPES){
            const params = connectionParameters[protocol];
            if (!(0, _utils.isDefined)(params)) {
                continue;
            }
            result[protocol] = this.decryptProtocolPassword({
                protocolParams: params,
                workspaceId
            });
        }
        return result;
    }
    decryptProtocolPassword({ protocolParams, workspaceId }) {
        const isEncrypted = protocolParams.password.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_PREFIX);
        // TODO: Remove after 2-5 slow instance command has been run everywhere
        if (!isEncrypted) {
            this.logger.warn('Protocol password is not encrypted. Expected during the rollout window until the slow instance command finishes backfilling.');
            return protocolParams;
        }
        return {
            ...protocolParams,
            password: this.decrypt({
                ciphertext: protocolParams.password,
                workspaceId
            })
        };
    }
    constructor(secretEncryptionService){
        this.secretEncryptionService = secretEncryptionService;
        this.logger = new _common.Logger(ConnectedAccountTokenEncryptionService.name);
    }
};
ConnectedAccountTokenEncryptionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], ConnectedAccountTokenEncryptionService);

//# sourceMappingURL=connected-account-token-encryption.service.js.map