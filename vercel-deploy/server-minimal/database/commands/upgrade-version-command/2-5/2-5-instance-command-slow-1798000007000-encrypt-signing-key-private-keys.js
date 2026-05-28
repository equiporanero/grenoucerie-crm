"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EncryptSigningKeyPrivateKeysSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return EncryptSigningKeyPrivateKeysSlowInstanceCommand;
    }
});
const _utils = require("twenty-shared/utils");
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const _secretencryptionservice = require("../../../../engine/core-modules/secret-encryption/secret-encryption.service");
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const BACKFILL_BATCH_SIZE = 200;
const PRIVATE_KEY_CHECK_CONSTRAINT_NAME = 'CHK_signingKey_privateKey_encrypted';
const V2_ENCRYPTED_LIKE_PATTERN = `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}%`;
let EncryptSigningKeyPrivateKeysSlowInstanceCommand = class EncryptSigningKeyPrivateKeysSlowInstanceCommand {
    // Signing keys are instance-scoped — every workspace shares the JWKS — so
    // the versioned envelope uses no workspaceId in its HKDF info. The
    // SELECT filter skips already-migrated rows (idempotent re-runs) and
    // NULL privateKey rows (typically revoked or rotated keys).
    async runDataMigration(dataSource) {
        let cursor = '00000000-0000-0000-0000-000000000000';
        while(true){
            const rows = await dataSource.query(`SELECT id, "privateKey"
           FROM "core"."signingKey"
          WHERE id > $1
            AND "privateKey" IS NOT NULL
            AND "privateKey" NOT LIKE $2
          ORDER BY id
          LIMIT $3`, [
                cursor,
                V2_ENCRYPTED_LIKE_PATTERN,
                BACKFILL_BATCH_SIZE
            ]);
            if (rows.length === 0) {
                break;
            }
            for (const row of rows){
                const plaintext = this.secretEncryptionService.decryptVersioned(row.privateKey);
                if (!(0, _utils.isDefined)(plaintext)) {
                    continue;
                }
                const encryptedPrivateKey = this.secretEncryptionService.encryptVersioned(plaintext);
                await dataSource.query(`UPDATE "core"."signingKey"
              SET "privateKey" = $2
            WHERE id = $1`, [
                    row.id,
                    encryptedPrivateKey
                ]);
            }
            cursor = rows[rows.length - 1].id;
        }
    }
    // The CHECK constraint admits two states: NULL (revoked keys whose
    // private material has been purged) or the versioned envelope.
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."signingKey"
       ADD CONSTRAINT "${PRIVATE_KEY_CHECK_CONSTRAINT_NAME}"
       CHECK ("privateKey" IS NULL OR "privateKey" LIKE '${V2_ENCRYPTED_LIKE_PATTERN}')`);
    }
    // Deliberately do NOT decrypt rows on rollback — re-introducing
    // plaintext private keys would be a severe security regression.
    // Dropping the CHECK constraint is enough; JwtKeyManagerService can
    // still read the encrypted column whether or not the constraint exists.
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."signingKey"
       DROP CONSTRAINT IF EXISTS "${PRIVATE_KEY_CHECK_CONSTRAINT_NAME}"`);
    }
    constructor(secretEncryptionService){
        this.secretEncryptionService = secretEncryptionService;
    }
};
EncryptSigningKeyPrivateKeysSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.5.0', 1798000007000, {
        type: 'slow'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], EncryptSigningKeyPrivateKeysSlowInstanceCommand);

//# sourceMappingURL=2-5-instance-command-slow-1798000007000-encrypt-signing-key-private-keys.js.map