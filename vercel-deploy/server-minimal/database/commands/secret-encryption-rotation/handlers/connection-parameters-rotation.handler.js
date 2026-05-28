"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectionParametersRotationHandler", {
    enumerable: true,
    get: function() {
        return ConnectionParametersRotationHandler;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _secretencryptionrotationsitenameconstant = require("../constants/secret-encryption-rotation-site-name.constant");
const _secretencryptionrotationhandlerinterface = require("../interfaces/secret-encryption-rotation-handler.interface");
const _buildcurrentencryptionkeyidenvelopelikepatternutil = require("../utils/build-current-encryption-key-id-envelope-like-pattern.util");
const _buildrotationerrormessageutil = require("../utils/build-rotation-error-message.util");
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const _secretencryptionexception = require("../../../../engine/core-modules/secret-encryption/exceptions/secret-encryption.exception");
const _secretencryptionservice = require("../../../../engine/core-modules/secret-encryption/secret-encryption.service");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
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
const ZERO_UUID = '00000000-0000-0000-0000-000000000000';
let ConnectionParametersRotationHandler = class ConnectionParametersRotationHandler extends _secretencryptionrotationhandlerinterface.SecretEncryptionRotationHandler {
    async countRemaining({ currentEncryptionKeyId }) {
        return this.buildRowToSelectQuery({
            currentEncryptionKeyId
        }).getCount();
    }
    async rotate({ currentEncryptionKeyId, batchSize, dryRun }) {
        const outcome = {
            rotated: 0,
            skipped: 0,
            errors: 0
        };
        let cursor = ZERO_UUID;
        while(true){
            const rows = await this.buildRowToSelectQuery({
                currentEncryptionKeyId
            }).andWhere('connected_account.id > :cursor', {
                cursor
            }).orderBy('connected_account.id', 'ASC').take(batchSize).getMany();
            if (rows.length === 0) {
                break;
            }
            for (const row of rows){
                const originalConnectionParameters = row.connectionParameters;
                if (!(0, _utils.isDefined)(originalConnectionParameters)) {
                    outcome.skipped += 1;
                    continue;
                }
                let reEncryptedConnectionParameters;
                try {
                    reEncryptedConnectionParameters = this.reEncryptConnectionParametersOrThrow({
                        connectionParameters: originalConnectionParameters,
                        workspaceId: row.workspaceId
                    });
                } catch (error) {
                    this.logger.error((0, _buildrotationerrormessageutil.buildRotationErrorMessage)(this.siteName, row.id, error));
                    outcome.errors += 1;
                    continue;
                }
                if (dryRun) {
                    outcome.rotated += 1;
                    continue;
                }
                const updateResult = await this.connectedAccountRepository.createQueryBuilder().update().set({
                    connectionParameters: reEncryptedConnectionParameters
                }).where('id = :rowId', {
                    rowId: row.id
                }).andWhere('"connectionParameters" IS NOT DISTINCT FROM CAST(:originalConnectionParametersJson AS jsonb)', {
                    originalConnectionParametersJson: JSON.stringify(originalConnectionParameters)
                }).execute();
                if ((updateResult.affected ?? 0) === 0) {
                    outcome.skipped += 1;
                    continue;
                }
                outcome.rotated += 1;
            }
            cursor = rows[rows.length - 1].id;
        }
        return outcome;
    }
    reEncryptConnectionParametersOrThrow({ connectionParameters, workspaceId }) {
        const result = {
            ...connectionParameters
        };
        for (const protocol of _constants.ACCOUNT_TYPES){
            const params = connectionParameters[protocol];
            if (!(0, _utils.isDefined)(params)) {
                continue;
            }
            // Refuse non-enc:v2 values up front: decryptVersioned would otherwise
            // fall through to unauthenticated legacy CTR and corrupt the password.
            if (!params.password.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX)) {
                throw new _secretencryptionexception.SecretEncryptionException(`${protocol} password is not a versioned envelope (expected '${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}…'), refusing to rotate.`, _secretencryptionexception.SecretEncryptionExceptionCode.MALFORMED_ENVELOPE);
            }
            const plaintext = this.secretEncryptionService.decryptVersioned(params.password, {
                workspaceId
            });
            result[protocol] = {
                ...params,
                password: this.secretEncryptionService.encryptVersioned(plaintext, {
                    workspaceId
                })
            };
        }
        return result;
    }
    buildRowToSelectQuery({ currentEncryptionKeyId }) {
        const currentEnvelopePattern = (0, _buildcurrentencryptionkeyidenvelopelikepatternutil.buildCurrentEncryptionKeyIdEnvelopeLikePattern)(currentEncryptionKeyId);
        return this.connectedAccountRepository.createQueryBuilder('connected_account').where('connected_account."connectionParameters" IS NOT NULL').andWhere(`(
          (connected_account."connectionParameters"->'IMAP'->>'password' IS NOT NULL
            AND connected_account."connectionParameters"->'IMAP'->>'password' NOT LIKE :currentEnvelopePattern)
          OR (connected_account."connectionParameters"->'SMTP'->>'password' IS NOT NULL
            AND connected_account."connectionParameters"->'SMTP'->>'password' NOT LIKE :currentEnvelopePattern)
          OR (connected_account."connectionParameters"->'CALDAV'->>'password' IS NOT NULL
            AND connected_account."connectionParameters"->'CALDAV'->>'password' NOT LIKE :currentEnvelopePattern)
        )`, {
            currentEnvelopePattern
        });
    }
    constructor(connectedAccountRepository, secretEncryptionService){
        super(), this.connectedAccountRepository = connectedAccountRepository, this.secretEncryptionService = secretEncryptionService, this.siteName = _secretencryptionrotationsitenameconstant.SECRET_ENCRYPTION_ROTATION_SITE_NAME.CONNECTED_ACCOUNT_CONNECTION_PARAMETERS, this.logger = new _common.Logger(ConnectionParametersRotationHandler.name);
    }
};
ConnectionParametersRotationHandler = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], ConnectionParametersRotationHandler);

//# sourceMappingURL=connection-parameters-rotation.handler.js.map