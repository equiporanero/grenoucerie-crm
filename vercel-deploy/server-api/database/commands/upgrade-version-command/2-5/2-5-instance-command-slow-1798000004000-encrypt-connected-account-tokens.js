"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EncryptConnectedAccountTokensSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return EncryptConnectedAccountTokensSlowInstanceCommand;
    }
});
const _utils = require("twenty-shared/utils");
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
const _connectedaccounttokenencryptionservice = require("../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
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
const ACCESS_TOKEN_CHECK_CONSTRAINT_NAME = 'CHK_connectedAccount_accessToken_encrypted';
const REFRESH_TOKEN_CHECK_CONSTRAINT_NAME = 'CHK_connectedAccount_refreshToken_encrypted';
const V2_ENCRYPTED_LIKE_PATTERN = `${_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX}%`;
const isPlaintext = (value)=>(0, _utils.isDefined)(value) && !value.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX);
let EncryptConnectedAccountTokensSlowInstanceCommand = class EncryptConnectedAccountTokensSlowInstanceCommand {
    async runDataMigration(dataSource) {
        let cursor = '00000000-0000-0000-0000-000000000000';
        while(true){
            const rows = await dataSource.query(`SELECT id, "workspaceId", "accessToken", "refreshToken"
           FROM "core"."connectedAccount"
          WHERE id > $1
            AND (
                  ("accessToken"  IS NOT NULL AND "accessToken"  NOT LIKE $2)
               OR ("refreshToken" IS NOT NULL AND "refreshToken" NOT LIKE $2)
            )
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
                const sets = [];
                const params = [
                    row.id
                ];
                if (isPlaintext(row.accessToken)) {
                    params.push(this.connectedAccountTokenEncryptionService.encrypt({
                        plaintext: row.accessToken,
                        workspaceId: row.workspaceId
                    }));
                    sets.push(`"accessToken" = $${params.length}`);
                }
                if (isPlaintext(row.refreshToken)) {
                    params.push(this.connectedAccountTokenEncryptionService.encrypt({
                        plaintext: row.refreshToken,
                        workspaceId: row.workspaceId
                    }));
                    sets.push(`"refreshToken" = $${params.length}`);
                }
                if (sets.length === 0) {
                    continue;
                }
                await dataSource.query(`UPDATE "core"."connectedAccount"
              SET ${sets.join(', ')}
            WHERE id = $1`, params);
            }
            cursor = rows[rows.length - 1].id;
        }
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       ADD CONSTRAINT "${ACCESS_TOKEN_CHECK_CONSTRAINT_NAME}"
       CHECK ("accessToken" IS NULL OR "accessToken" LIKE '${V2_ENCRYPTED_LIKE_PATTERN}')`);
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       ADD CONSTRAINT "${REFRESH_TOKEN_CHECK_CONSTRAINT_NAME}"
       CHECK ("refreshToken" IS NULL OR "refreshToken" LIKE '${V2_ENCRYPTED_LIKE_PATTERN}')`);
    }
    // Deliberately do NOT decrypt rows on rollback — re-introducing plaintext
    // tokens to the database would be a security regression. Dropping the
    // CHECK constraints is enough; ConnectedAccountTokenEncryptionService can
    // still read the encrypted columns whether or not the constraints exist.
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       DROP CONSTRAINT IF EXISTS "${REFRESH_TOKEN_CHECK_CONSTRAINT_NAME}"`);
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       DROP CONSTRAINT IF EXISTS "${ACCESS_TOKEN_CHECK_CONSTRAINT_NAME}"`);
    }
    constructor(connectedAccountTokenEncryptionService){
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
    }
};
EncryptConnectedAccountTokensSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.5.0', 1798000004000, {
        type: 'slow'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService
    ])
], EncryptConnectedAccountTokensSlowInstanceCommand);

//# sourceMappingURL=2-5-instance-command-slow-1798000004000-encrypt-connected-account-tokens.js.map