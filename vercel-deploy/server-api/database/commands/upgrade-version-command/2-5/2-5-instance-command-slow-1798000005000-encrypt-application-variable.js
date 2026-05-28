"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EncryptApplicationVariableSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return EncryptApplicationVariableSlowInstanceCommand;
    }
});
const _common = require("@nestjs/common");
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
const BACKFILL_BATCH_SIZE = 500;
const VALUE_CHECK_CONSTRAINT_NAME = 'CHK_applicationVariable_value_encrypted';
const V2_ENCRYPTED_LIKE_PATTERN = `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}%`;
// Legacy CTR ciphertext is base64-encoded and at least 16 bytes (one IV
// block) — i.e. ≥ 22 base64 chars. Anything outside that shape is plaintext.
// Node's `Buffer.from(value, 'base64')` silently skips invalid chars, so a
// URL like `https://hooks.slack.com/...` would otherwise decode into enough
// bytes to "decrypt" to garbage without throwing.
const LEGACY_CTR_LOOKS_LIKE_BASE64_RE = /^[A-Za-z0-9+/]+={0,2}$/;
const LEGACY_CTR_MIN_LENGTH = 22;
const looksLikeLegacyCtrCiphertext = (value)=>value.length >= LEGACY_CTR_MIN_LENGTH && LEGACY_CTR_LOOKS_LIKE_BASE64_RE.test(value);
let EncryptApplicationVariableSlowInstanceCommand = class EncryptApplicationVariableSlowInstanceCommand {
    // Re-encrypts secret application variables into the v2 envelope. Rows
    // marked isSecret=true with a plaintext value (instead of legacy CTR
    // ciphertext) are treated as plaintext and encrypted, mirroring
    // EncryptConnectedAccountTokensSlowInstanceCommand.
    async runDataMigration(dataSource) {
        let cursor = '00000000-0000-0000-0000-000000000000';
        while(true){
            const rows = await dataSource.query(`SELECT id, "workspaceId", "value", "isSecret"
           FROM "core"."applicationVariable"
          WHERE id > $1
            AND "isSecret" = true
            AND "value" <> ''
            AND "value" NOT LIKE $2
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
                if (!row.isSecret) {
                    continue;
                }
                let plaintext;
                if (looksLikeLegacyCtrCiphertext(row.value)) {
                    try {
                        plaintext = this.secretEncryptionService.decryptVersioned(row.value, {
                            workspaceId: row.workspaceId
                        });
                    } catch (error) {
                        this.logger.warn(`applicationVariable row ${row.id} value not valid ciphertext; treating as plaintext. ${error instanceof Error ? error.message : String(error)}`);
                        plaintext = row.value;
                    }
                } else {
                    this.logger.warn(`applicationVariable row ${row.id} value is not base64; treating as plaintext.`);
                    plaintext = row.value;
                }
                if (!(0, _utils.isDefined)(plaintext)) {
                    continue;
                }
                const encryptedValue = this.secretEncryptionService.encryptVersioned(plaintext, {
                    workspaceId: row.workspaceId
                });
                await dataSource.query(`UPDATE "core"."applicationVariable"
              SET "value" = $2
            WHERE id = $1`, [
                    row.id,
                    encryptedValue
                ]);
            }
            cursor = rows[rows.length - 1].id;
        }
    }
    // The CHECK constraint accepts three cases:
    //   1. Non-secret rows (plaintext value, possibly empty)
    //   2. Empty secret rows (uninitialised — value defaults to '')
    //   3. Secret rows in the versioned envelope
    // It is intentionally not strict on the keyId so future key rotations,
    // which change the keyId but keep the envelope shape, do not require a
    // schema migration.
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationVariable"
       ADD CONSTRAINT "${VALUE_CHECK_CONSTRAINT_NAME}"
       CHECK ("isSecret" = false OR "value" = '' OR "value" LIKE '${V2_ENCRYPTED_LIKE_PATTERN}')`);
    }
    // Deliberately do NOT decrypt rows on rollback — re-introducing plaintext
    // secrets to the database would be a security regression. Dropping the
    // CHECK constraint is enough; ApplicationVariableEntityService can still
    // read the encrypted column whether or not the constraint exists.
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationVariable"
       DROP CONSTRAINT IF EXISTS "${VALUE_CHECK_CONSTRAINT_NAME}"`);
    }
    constructor(secretEncryptionService){
        this.secretEncryptionService = secretEncryptionService;
        this.logger = new _common.Logger(EncryptApplicationVariableSlowInstanceCommand.name);
    }
};
EncryptApplicationVariableSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.5.0', 1798000005000, {
        type: 'slow'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], EncryptApplicationVariableSlowInstanceCommand);

//# sourceMappingURL=2-5-instance-command-slow-1798000005000-encrypt-application-variable.js.map