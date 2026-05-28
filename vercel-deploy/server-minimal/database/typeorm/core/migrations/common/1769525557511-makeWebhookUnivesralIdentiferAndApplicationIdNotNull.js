"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeWebhookUnivesralIdentiferAndApplicationIdNotNull1769525557511", {
    enumerable: true,
    get: function() {
        return MakeWebhookUnivesralIdentiferAndApplicationIdNotNull1769525557511;
    }
});
const _1769525557511makeWebhookUniversalIdentifierAndApplicationIdNotNullutil = require("../utils/1769525557511-makeWebhookUniversalIdentifierAndApplicationIdNotNull.util");
let MakeWebhookUnivesralIdentiferAndApplicationIdNotNull1769525557511 = class MakeWebhookUnivesralIdentiferAndApplicationIdNotNull1769525557511 {
    async up(queryRunner) {
        const savepointName = 'sp_make_webhook_universal_identifier_and_application_id_not_null';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1769525557511makeWebhookUniversalIdentifierAndApplicationIdNotNullutil.makeWebhookUniversalIdentifierAndApplicationIdNotNullQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakeWebhookUnivesralIdentiferAndApplicationIdNotNull1769525557511', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakeWebhookUnivesralIdentiferAndApplicationIdNotNull1769525557511 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."webhook" DROP CONSTRAINT "FK_e755f49a9ef74b36e27932f7a6c"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_d48d713d01cc3c81bad1f39795"`);
        await queryRunner.query(`ALTER TABLE "core"."webhook" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."webhook" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d48d713d01cc3c81bad1f39795" ON "core"."webhook" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."webhook" ADD CONSTRAINT "FK_e755f49a9ef74b36e27932f7a6c" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'MakeWebhookUnivesralIdentiferAndApplicationIdNotNull1769525557511';
    }
};

//# sourceMappingURL=1769525557511-makeWebhookUnivesralIdentiferAndApplicationIdNotNull.js.map