"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EncryptApplicationRegistrationVariableSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return EncryptApplicationRegistrationVariableSlowInstanceCommand;
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
const BACKFILL_BATCH_SIZE = 500;
const ENCRYPTED_VALUE_CHECK_CONSTRAINT_NAME = 'CHK_applicationRegistrationVariable_encryptedValue_encrypted';
const V2_ENCRYPTED_LIKE_PATTERN = `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}%`;
let EncryptApplicationRegistrationVariableSlowInstanceCommand = class EncryptApplicationRegistrationVariableSlowInstanceCommand {
    // Registration variables are server-level config — readable by any
    // workspace that installs the parent registration — so they use the
    // instance-scoped versioned envelope (no workspaceId in the HKDF info).
    // Idempotent: the SELECT filter skips rows already in v2 form and rows
    // still in their default '' (unfilled) state.
    async runDataMigration(dataSource) {
        let cursor = '00000000-0000-0000-0000-000000000000';
        while(true){
            const rows = await dataSource.query(`SELECT id, "encryptedValue"
           FROM "core"."applicationRegistrationVariable"
          WHERE id > $1
            AND "encryptedValue" <> ''
            AND "encryptedValue" NOT LIKE $2
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
                const plaintext = this.secretEncryptionService.decryptVersioned(row.encryptedValue);
                if (!(0, _utils.isDefined)(plaintext)) {
                    continue;
                }
                const encryptedValue = this.secretEncryptionService.encryptVersioned(plaintext);
                await dataSource.query(`UPDATE "core"."applicationRegistrationVariable"
              SET "encryptedValue" = $2
            WHERE id = $1`, [
                    row.id,
                    encryptedValue
                ]);
            }
            cursor = rows[rows.length - 1].id;
        }
    }
    // The CHECK constraint accepts unfilled rows ('') and rows in the
    // versioned envelope. The keyId portion is left unconstrained so future
    // ENCRYPTION_KEY rotations do not require a schema migration.
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistrationVariable"
       ADD CONSTRAINT "${ENCRYPTED_VALUE_CHECK_CONSTRAINT_NAME}"
       CHECK ("encryptedValue" = '' OR "encryptedValue" LIKE '${V2_ENCRYPTED_LIKE_PATTERN}')`);
    }
    // Deliberately do NOT decrypt rows on rollback — re-introducing plaintext
    // secrets to the database would be a security regression. Dropping the
    // CHECK constraint is enough; the service can still read the encrypted
    // column whether or not the constraint exists.
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistrationVariable"
       DROP CONSTRAINT IF EXISTS "${ENCRYPTED_VALUE_CHECK_CONSTRAINT_NAME}"`);
    }
    constructor(secretEncryptionService){
        this.secretEncryptionService = secretEncryptionService;
    }
};
EncryptApplicationRegistrationVariableSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.5.0', 1798000006000, {
        type: 'slow'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], EncryptApplicationRegistrationVariableSlowInstanceCommand);

//# sourceMappingURL=2-5-instance-command-slow-1798000006000-encrypt-application-registration-variable.js.map