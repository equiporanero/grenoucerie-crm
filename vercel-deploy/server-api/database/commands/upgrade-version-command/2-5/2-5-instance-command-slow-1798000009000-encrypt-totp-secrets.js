"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EncryptTotpSecretsSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return EncryptTotpSecretsSlowInstanceCommand;
    }
});
const _utils = require("twenty-shared/utils");
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const _secretencryptionservice = require("../../../../engine/core-modules/secret-encryption/secret-encryption.service");
const _simplesecretencryptionutil = require("../../../../engine/core-modules/two-factor-authentication/utils/simple-secret-encryption.util");
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
const SECRET_CHECK_CONSTRAINT_NAME = 'CHK_twoFactorAuthenticationMethod_secret_encrypted';
const V2_ENCRYPTED_LIKE_PATTERN = `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}%`;
let EncryptTotpSecretsSlowInstanceCommand = class EncryptTotpSecretsSlowInstanceCommand {
    async runDataMigration(dataSource) {
        let cursor = '00000000-0000-0000-0000-000000000000';
        while(true){
            const rows = await dataSource.query(`SELECT m.id, m."workspaceId", uw."userId", m."secret"
           FROM "core"."twoFactorAuthenticationMethod" m
           JOIN "core"."userWorkspace" uw
             ON uw.id = m."userWorkspaceId"
          WHERE m.id > $1
            AND m."secret" NOT LIKE $2
          ORDER BY m.id
          LIMIT $3`, [
                cursor,
                V2_ENCRYPTED_LIKE_PATTERN,
                BACKFILL_BATCH_SIZE
            ]);
            if (rows.length === 0) {
                break;
            }
            for (const row of rows){
                const plaintext = await this.simpleSecretEncryptionUtil.decryptSecret(row.secret, `${row.userId}${row.workspaceId}otp-secret`);
                if (!(0, _utils.isDefined)(plaintext)) {
                    continue;
                }
                const encryptedValue = this.secretEncryptionService.encryptVersioned(plaintext, {
                    workspaceId: row.workspaceId
                });
                await dataSource.query(`UPDATE "core"."twoFactorAuthenticationMethod"
              SET "secret" = $2
            WHERE id = $1`, [
                    row.id,
                    encryptedValue
                ]);
            }
            cursor = rows[rows.length - 1].id;
        }
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."twoFactorAuthenticationMethod"
       ADD CONSTRAINT "${SECRET_CHECK_CONSTRAINT_NAME}"
       CHECK ("secret" LIKE '${V2_ENCRYPTED_LIKE_PATTERN}')`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."twoFactorAuthenticationMethod"
       DROP CONSTRAINT IF EXISTS "${SECRET_CHECK_CONSTRAINT_NAME}"`);
    }
    constructor(secretEncryptionService, simpleSecretEncryptionUtil){
        this.secretEncryptionService = secretEncryptionService;
        this.simpleSecretEncryptionUtil = simpleSecretEncryptionUtil;
    }
};
EncryptTotpSecretsSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.5.0', 1798000009000, {
        type: 'slow'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService,
        typeof _simplesecretencryptionutil.SimpleSecretEncryptionUtil === "undefined" ? Object : _simplesecretencryptionutil.SimpleSecretEncryptionUtil
    ])
], EncryptTotpSecretsSlowInstanceCommand);

//# sourceMappingURL=2-5-instance-command-slow-1798000009000-encrypt-totp-secrets.js.map