"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SensitiveConfigStorageRotationHandler", {
    enumerable: true,
    get: function() {
        return SensitiveConfigStorageRotationHandler;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _secretencryptionrotationsitenameconstant = require("../constants/secret-encryption-rotation-site-name.constant");
const _secretencryptionrotationhandlerinterface = require("../interfaces/secret-encryption-rotation-handler.interface");
const _buildrotationerrormessageutil = require("../utils/build-rotation-error-message.util");
const _keyvaluepairentity = require("../../../../engine/core-modules/key-value-pair/key-value-pair.entity");
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const _secretencryptionservice = require("../../../../engine/core-modules/secret-encryption/secret-encryption.service");
const _configvariables = require("../../../../engine/core-modules/twenty-config/config-variables");
const _configvariabletypeenum = require("../../../../engine/core-modules/twenty-config/enums/config-variable-type.enum");
const _typedreflect = require("../../../../utils/typed-reflect");
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
let SensitiveConfigStorageRotationHandler = class SensitiveConfigStorageRotationHandler extends _secretencryptionrotationhandlerinterface.SecretEncryptionRotationHandler {
    async countRemaining({ currentEncryptionKeyId }) {
        const sensitiveStringConfigKeys = this.collectSensitiveStringConfigKeys();
        if (sensitiveStringConfigKeys.length === 0) {
            return 0;
        }
        return this.buildRotationQuery({
            currentEncryptionKeyId,
            sensitiveStringConfigKeys
        }).getCount();
    }
    async rotate({ currentEncryptionKeyId, batchSize, dryRun }) {
        const sensitiveStringConfigKeys = this.collectSensitiveStringConfigKeys();
        if (sensitiveStringConfigKeys.length === 0) {
            return {
                rotated: 0,
                skipped: 0,
                errors: 0
            };
        }
        const outcome = {
            rotated: 0,
            skipped: 0,
            errors: 0
        };
        let cursor = '00000000-0000-0000-0000-000000000000';
        while(true){
            const rows = await this.buildRotationQuery({
                currentEncryptionKeyId,
                sensitiveStringConfigKeys
            }).andWhere('kvp.id > :cursor', {
                cursor
            }).orderBy('kvp.id', 'ASC').take(batchSize).getMany();
            if (rows.length === 0) {
                break;
            }
            for (const row of rows){
                const rowOutcome = await this.rotateRow({
                    row,
                    dryRun
                });
                outcome.rotated += rowOutcome.rotated;
                outcome.skipped += rowOutcome.skipped;
                outcome.errors += rowOutcome.errors;
            }
            cursor = rows[rows.length - 1].id;
        }
        return outcome;
    }
    async rotateRow({ row, dryRun }) {
        const rawValue = row.value;
        if (!(0, _guards.isNonEmptyString)(rawValue) || !rawValue.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX)) {
            this.logger.error(`[${this.siteName}] row ${row.id} (config key '${row.key}'): value is not a versioned envelope (expected '${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}…'), refusing to rotate.`);
            return {
                rotated: 0,
                skipped: 0,
                errors: 1
            };
        }
        try {
            const plaintext = this.secretEncryptionService.decryptVersioned(rawValue);
            const reEncrypted = this.secretEncryptionService.encryptVersioned(plaintext);
            if (!dryRun) {
                const updateResult = await this.keyValuePairRepository.createQueryBuilder().update().set({
                    value: reEncrypted
                }).where('id = :id', {
                    id: row.id
                }).andWhere('CAST(value AS text) = :originalValueText', {
                    originalValueText: JSON.stringify(rawValue)
                }).execute();
                if ((updateResult.affected ?? 0) === 0) {
                    return {
                        rotated: 0,
                        skipped: 1,
                        errors: 0
                    };
                }
            }
            return {
                rotated: 1,
                skipped: 0,
                errors: 0
            };
        } catch (error) {
            this.logger.error((0, _buildrotationerrormessageutil.buildRotationErrorMessage)(this.siteName, row.id, error));
            return {
                rotated: 0,
                skipped: 0,
                errors: 1
            };
        }
    }
    buildRotationQuery({ currentEncryptionKeyId, sensitiveStringConfigKeys }) {
        const currentEnvelopePattern = `"${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}${currentEncryptionKeyId}:%"`;
        return this.keyValuePairRepository.createQueryBuilder('kvp').where('kvp.type = :type', {
            type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE
        }).andWhere('kvp.userId IS NULL').andWhere('kvp.workspaceId IS NULL').andWhere('kvp.key IN (:...sensitiveStringConfigKeys)', {
            sensitiveStringConfigKeys
        }).andWhere('CAST(kvp.value AS text) NOT LIKE :current', {
            current: currentEnvelopePattern
        });
    }
    collectSensitiveStringConfigKeys() {
        const metadata = _typedreflect.TypedReflect.getMetadata('config-variables', _configvariables.ConfigVariables.prototype.constructor);
        if (!(0, _utils.isDefined)(metadata)) {
            return [];
        }
        return Object.entries(metadata).filter(([, descriptor])=>descriptor?.isSensitive === true && descriptor?.type === _configvariabletypeenum.ConfigVariableType.STRING).map(([configKey])=>configKey);
    }
    constructor(keyValuePairRepository, secretEncryptionService){
        super(), this.keyValuePairRepository = keyValuePairRepository, this.secretEncryptionService = secretEncryptionService, this.siteName = _secretencryptionrotationsitenameconstant.SECRET_ENCRYPTION_ROTATION_SITE_NAME.SENSITIVE_CONFIG_STORAGE, this.logger = new _common.Logger(SensitiveConfigStorageRotationHandler.name);
    }
};
SensitiveConfigStorageRotationHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_keyvaluepairentity.KeyValuePairEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], SensitiveConfigStorageRotationHandler);

//# sourceMappingURL=sensitive-config-storage-rotation.handler.js.map