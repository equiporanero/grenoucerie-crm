"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EncryptConnectionParametersSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return EncryptConnectionParametersSlowInstanceCommand;
    }
});
const _utils = require("twenty-shared/utils");
const _secretencryptionconstant = require("../../../../engine/core-modules/secret-encryption/constants/secret-encryption.constant");
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
const _connectedaccounttokenencryptionservice = require("../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
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
const BACKFILL_BATCH_SIZE = 500;
const CHECK_CONSTRAINT_NAME = 'CHK_connectedAccount_connectionParameters_encrypted';
const hasPlaintextPassword = (params)=>{
    for (const protocol of _constants.ACCOUNT_TYPES){
        const protocolParams = params[protocol];
        if ((0, _utils.isDefined)(protocolParams?.password) && !protocolParams.password.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX)) {
            return true;
        }
    }
    return false;
};
let EncryptConnectionParametersSlowInstanceCommand = class EncryptConnectionParametersSlowInstanceCommand {
    async runDataMigration(dataSource) {
        let cursor = '00000000-0000-0000-0000-000000000000';
        while(true){
            const rows = await dataSource.query(`SELECT id, "workspaceId", "connectionParameters"
           FROM "core"."connectedAccount"
          WHERE id > $1
            AND "connectionParameters" IS NOT NULL
          ORDER BY id
          LIMIT $2`, [
                cursor,
                BACKFILL_BATCH_SIZE
            ]);
            if (rows.length === 0) {
                break;
            }
            for (const row of rows){
                if (!(0, _utils.isDefined)(row.connectionParameters)) {
                    continue;
                }
                if (!hasPlaintextPassword(row.connectionParameters)) {
                    continue;
                }
                const plaintextOnly = {};
                for (const protocol of _constants.ACCOUNT_TYPES){
                    const protocolParams = row.connectionParameters[protocol];
                    if ((0, _utils.isDefined)(protocolParams?.password) && !protocolParams.password.startsWith(_secretencryptionconstant.SECRET_ENCRYPTION_ENVELOPE_V2_PREFIX)) {
                        plaintextOnly[protocol] = protocolParams;
                    }
                }
                const encrypted = this.connectedAccountTokenEncryptionService.encryptConnectionParameters({
                    connectionParameters: plaintextOnly,
                    workspaceId: row.workspaceId
                });
                const merged = {
                    ...row.connectionParameters,
                    ...encrypted
                };
                await dataSource.query(`UPDATE "core"."connectedAccount"
              SET "connectionParameters" = $2
            WHERE id = $1`, [
                    row.id,
                    JSON.stringify(merged)
                ]);
            }
            cursor = rows[rows.length - 1].id;
        }
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       ADD CONSTRAINT "${CHECK_CONSTRAINT_NAME}"
       CHECK (
         "connectionParameters" IS NULL
         OR (
           (("connectionParameters"->'IMAP'->>'password') IS NULL OR ("connectionParameters"->'IMAP'->>'password') LIKE 'enc:v2:%')
           AND (("connectionParameters"->'SMTP'->>'password') IS NULL OR ("connectionParameters"->'SMTP'->>'password') LIKE 'enc:v2:%')
           AND (("connectionParameters"->'CALDAV'->>'password') IS NULL OR ("connectionParameters"->'CALDAV'->>'password') LIKE 'enc:v2:%')
         )
       )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       DROP CONSTRAINT IF EXISTS "${CHECK_CONSTRAINT_NAME}"`);
    }
    constructor(connectedAccountTokenEncryptionService){
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
    }
};
EncryptConnectionParametersSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.7.0', 1798000010000, {
        type: 'slow'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService
    ])
], EncryptConnectionParametersSlowInstanceCommand);

//# sourceMappingURL=2-7-instance-command-slow-1798000010000-encrypt-connection-parameters.js.map