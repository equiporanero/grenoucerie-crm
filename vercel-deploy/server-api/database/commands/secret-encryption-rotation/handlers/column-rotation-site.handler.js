"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ColumnRotationSiteHandler", {
    enumerable: true,
    get: function() {
        return ColumnRotationSiteHandler;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _secretencryptionrotationhandlerinterface = require("../interfaces/secret-encryption-rotation-handler.interface");
const _buildcurrentencryptionkeyidenvelopelikepatternutil = require("../utils/build-current-encryption-key-id-envelope-like-pattern.util");
const _buildrotationerrormessageutil = require("../utils/build-rotation-error-message.util");
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const ZERO_UUID = '00000000-0000-0000-0000-000000000000';
let ColumnRotationSiteHandler = class ColumnRotationSiteHandler extends _secretencryptionrotationhandlerinterface.SecretEncryptionRotationHandler {
    async countRemaining({ currentEncryptionKeyId }) {
        const currentEnvelopePattern = (0, _buildcurrentencryptionkeyidenvelopelikepatternutil.buildCurrentEncryptionKeyIdEnvelopeLikePattern)(currentEncryptionKeyId);
        return this.applyExtraWhere(this.config.repository.createQueryBuilder('row')).andWhere(`row.${this.config.encryptedColumn} NOT LIKE :p`, {
            p: currentEnvelopePattern
        }).getCount();
    }
    async rotate({ currentEncryptionKeyId, batchSize, dryRun }) {
        const outcome = {
            rotated: 0,
            skipped: 0,
            errors: 0
        };
        const currentEnvelopePattern = (0, _buildcurrentencryptionkeyidenvelopelikepatternutil.buildCurrentEncryptionKeyIdEnvelopeLikePattern)(currentEncryptionKeyId);
        let cursor = ZERO_UUID;
        while(true){
            const rows = await this.applyExtraWhere(this.config.repository.createQueryBuilder('row')).andWhere('row.id > :cursor', {
                cursor
            }).andWhere(`row.${this.config.encryptedColumn} NOT LIKE :p`, {
                p: currentEnvelopePattern
            }).orderBy('row.id', 'ASC').take(batchSize).getMany();
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
        const { encryptedColumn } = this.config;
        const rowId = row.id;
        const currentValue = row[encryptedColumn];
        if (!(0, _utils.isDefined)(currentValue) || !currentValue.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX)) {
            this.logger.error(`[${this.siteName}] row ${rowId}: column '${encryptedColumn}' is not a versioned envelope (expected '${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}…'), refusing to rotate.`);
            return {
                rotated: 0,
                skipped: 0,
                errors: 1
            };
        }
        const cryptoOptions = this.config.isWorkspaceScoped ? {
            workspaceId: row.workspaceId
        } : undefined;
        try {
            const plaintext = this.secretEncryptionService.decryptVersioned(currentValue, cryptoOptions);
            const reEncrypted = this.secretEncryptionService.encryptVersioned(plaintext, cryptoOptions);
            if (!dryRun) {
                const setValues = {
                    [encryptedColumn]: reEncrypted
                };
                const updateResult = await this.config.repository.createQueryBuilder().update().set(setValues).where('id = :rowId', {
                    rowId
                }).andWhere(`"${encryptedColumn}" = :currentValue`, {
                    currentValue
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
            this.logger.error((0, _buildrotationerrormessageutil.buildRotationErrorMessage)(this.siteName, rowId, error));
            return {
                rotated: 0,
                skipped: 0,
                errors: 1
            };
        }
    }
    applyExtraWhere(qb) {
        if (!(0, _utils.isDefined)(this.config.extraWhere)) {
            return qb;
        }
        for (const [column, value] of Object.entries(this.config.extraWhere)){
            const parameterKey = `extra_${column}`;
            qb.andWhere(`row.${column} = :${parameterKey}`, {
                [parameterKey]: value
            });
        }
        return qb;
    }
    constructor(config, secretEncryptionService){
        super(), this.config = config, this.secretEncryptionService = secretEncryptionService, this.logger = new _common.Logger(ColumnRotationSiteHandler.name);
        this.siteName = config.siteName;
    }
};

//# sourceMappingURL=column-rotation-site.handler.js.map