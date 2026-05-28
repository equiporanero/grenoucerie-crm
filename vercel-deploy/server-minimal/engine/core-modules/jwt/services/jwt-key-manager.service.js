"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtKeyManagerService", {
    enumerable: true,
    get: function() {
        return JwtKeyManagerService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _crypto = require("crypto");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _coreentitycacheservice = require("../../../core-entity-cache/services/core-entity-cache.service");
const _signingkeyentity = require("../entities/signing-key.entity");
const _jwtkeymanagerexception = require("../jwt-key-manager.exception");
const _secretencryptionservice = require("../../secret-encryption/secret-encryption.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const UNIQUE_VIOLATION_PG_CODE = '23505';
const CURRENT_SIGNING_KEY_LOCAL_TTL_MS = 60 * 1000;
let JwtKeyManagerService = class JwtKeyManagerService {
    async getCurrentSigningKey() {
        const isLocalCacheExpired = Date.now() - this.currentSigningKeyCachedAt > CURRENT_SIGNING_KEY_LOCAL_TTL_MS;
        if (!(0, _utils.isDefined)(this.currentSigningKeyPromise) || isLocalCacheExpired) {
            this.currentSigningKeyPromise = this.loadOrCreateCurrentSigningKey();
            this.currentSigningKeyCachedAt = Date.now();
        }
        try {
            const result = await this.currentSigningKeyPromise;
            if (!(0, _utils.isDefined)(result)) {
                this.invalidateCurrentSigningKeyLocalCache();
            }
            return result;
        } catch (error) {
            this.invalidateCurrentSigningKeyLocalCache();
            throw error;
        }
    }
    async getValidPublicKeyPemById(id) {
        if (!(0, _guards.isNonEmptyString)(id) || !(0, _utils.isValidUuid)(id)) {
            return null;
        }
        return this.coreEntityCacheService.get('signingKeyPublicKey', id);
    }
    async listSigningKeys() {
        return this.signingKeyRepository.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async rotateCurrent() {
        const generated = this.generateEcP256KeyPair();
        const newId = (0, _crypto.randomUUID)();
        await this.signingKeyRepository.manager.transaction(async (entityManager)=>{
            const repository = entityManager.getRepository(_signingkeyentity.SigningKeyEntity);
            await repository.update({
                isCurrent: true
            }, {
                isCurrent: false,
                privateKey: null
            });
            await repository.insert({
                id: newId,
                publicKey: generated.publicKeyPem,
                privateKey: this.secretEncryptionService.encryptVersioned(generated.privateKeyPem),
                isCurrent: true,
                revokedAt: null
            });
        });
        await this.coreEntityCacheService.invalidate('signingKeyPublicKey', newId);
        this.invalidateCurrentSigningKeyLocalCache();
        return {
            id: newId,
            privateKeyPem: generated.privateKeyPem
        };
    }
    async revokeSigningKey(id) {
        if (!(0, _guards.isNonEmptyString)(id) || !(0, _utils.isValidUuid)(id)) {
            throw new _jwtkeymanagerexception.JwtKeyManagerException(`Invalid signing key id: ${id}`, _jwtkeymanagerexception.JwtKeyManagerExceptionCode.SIGNING_KEY_NOT_FOUND);
        }
        const existing = await this.signingKeyRepository.findOne({
            where: {
                id
            }
        });
        if (!(0, _utils.isDefined)(existing)) {
            throw new _jwtkeymanagerexception.JwtKeyManagerException(`Signing key not found: ${id}`, _jwtkeymanagerexception.JwtKeyManagerExceptionCode.SIGNING_KEY_NOT_FOUND);
        }
        if (!(0, _utils.isDefined)(existing.revokedAt)) {
            await this.signingKeyRepository.update({
                id
            }, {
                revokedAt: new Date(),
                isCurrent: false,
                privateKey: null
            });
        }
        await this.coreEntityCacheService.invalidate('signingKeyPublicKey', id);
        this.invalidateCurrentSigningKeyLocalCache();
        return this.signingKeyRepository.findOneByOrFail({
            id
        });
    }
    invalidateCurrentSigningKeyLocalCache() {
        this.currentSigningKeyPromise = null;
        this.currentSigningKeyCachedAt = 0;
    }
    async loadOrCreateCurrentSigningKey() {
        try {
            const existing = await this.findCurrentSigningKeyRow();
            if ((0, _utils.isDefined)(existing)) {
                return {
                    id: existing.id,
                    privateKeyPem: this.decryptPrivateKey(existing.privateKey, existing.id)
                };
            }
            return await this.generateAndPersistCurrent();
        } catch (error) {
            this.logger.error(`Failed to load or create current signing key. Falling back to legacy HS256 signing. Error: ${error instanceof Error ? error.message : String(error)}`);
            return null;
        }
    }
    async findCurrentSigningKeyRow() {
        return this.signingKeyRepository.findOne({
            where: {
                isCurrent: true,
                revokedAt: (0, _typeorm1.IsNull)()
            }
        });
    }
    decryptPrivateKey(encryptedPrivateKey, id) {
        if (!(0, _utils.isDefined)(encryptedPrivateKey)) {
            throw new _jwtkeymanagerexception.JwtKeyManagerException(`Current signing key (id=${id}) has no privateKey`, _jwtkeymanagerexception.JwtKeyManagerExceptionCode.INVALID_PRIVATE_KEY);
        }
        return this.secretEncryptionService.decryptVersioned(encryptedPrivateKey);
    }
    async generateAndPersistCurrent() {
        const generated = this.generateEcP256KeyPair();
        const id = (0, _crypto.randomUUID)();
        try {
            await this.signingKeyRepository.insert({
                id,
                publicKey: generated.publicKeyPem,
                privateKey: this.secretEncryptionService.encryptVersioned(generated.privateKeyPem),
                isCurrent: true,
                revokedAt: null
            });
            await this.coreEntityCacheService.invalidate('signingKeyPublicKey', id);
            return {
                id,
                privateKeyPem: generated.privateKeyPem
            };
        } catch (error) {
            if (this.isUniqueViolation(error)) {
                const existing = await this.findCurrentSigningKeyRow();
                if ((0, _utils.isDefined)(existing)) {
                    return {
                        id: existing.id,
                        privateKeyPem: this.decryptPrivateKey(existing.privateKey, existing.id)
                    };
                }
            }
            throw error;
        }
    }
    generateEcP256KeyPair() {
        const { privateKey, publicKey } = (0, _crypto.generateKeyPairSync)('ec', {
            namedCurve: 'P-256'
        });
        const privateKeyPem = privateKey.export({
            format: 'pem',
            type: 'pkcs8'
        }).toString();
        const publicKeyPem = publicKey.export({
            format: 'pem',
            type: 'spki'
        }).toString();
        return {
            privateKeyPem,
            publicKeyPem
        };
    }
    isUniqueViolation(error) {
        return error instanceof _typeorm1.QueryFailedError && error.code === UNIQUE_VIOLATION_PG_CODE;
    }
    constructor(signingKeyRepository, coreEntityCacheService, secretEncryptionService){
        this.signingKeyRepository = signingKeyRepository;
        this.coreEntityCacheService = coreEntityCacheService;
        this.secretEncryptionService = secretEncryptionService;
        this.logger = new _common.Logger(JwtKeyManagerService.name);
        this.currentSigningKeyPromise = null;
        this.currentSigningKeyCachedAt = 0;
    }
};
JwtKeyManagerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_signingkeyentity.SigningKeyEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _coreentitycacheservice.CoreEntityCacheService === "undefined" ? Object : _coreentitycacheservice.CoreEntityCacheService,
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], JwtKeyManagerService);

//# sourceMappingURL=jwt-key-manager.service.js.map