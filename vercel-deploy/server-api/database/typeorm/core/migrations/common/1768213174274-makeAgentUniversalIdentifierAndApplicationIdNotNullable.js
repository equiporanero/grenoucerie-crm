"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeAgentUniversalIdentifierAndApplicationIdNotNullable1768213174274", {
    enumerable: true,
    get: function() {
        return MakeAgentUniversalIdentifierAndApplicationIdNotNullable1768213174274;
    }
});
const _1768213174274makeAgentUniversalIdentifierAndApplicationIdNotNullableutil = require("../utils/1768213174274-makeAgentUniversalIdentifierAndApplicationIdNotNullable.util");
let MakeAgentUniversalIdentifierAndApplicationIdNotNullable1768213174274 = class MakeAgentUniversalIdentifierAndApplicationIdNotNullable1768213174274 {
    async up(queryRunner) {
        const savepointName = 'sp_make_agent_universal_identifier_and_application_id_not_nullable';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1768213174274makeAgentUniversalIdentifierAndApplicationIdNotNullableutil.makeAgentUniversalIdentifierAndApplicationIdNotNullableQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakeAgentUniversalIdentifierAndApplicationIdNotNullable1768213174274', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakeAgentUniversalIdentifierAndApplicationIdNotNullable1768213174274 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" DROP CONSTRAINT "FK_259c48f99f625708723414adb5d"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_0cc4d03dbcc269e77ba4d297fb"`);
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0cc4d03dbcc269e77ba4d297fb" ON "core"."agent" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."agent" ADD CONSTRAINT "FK_259c48f99f625708723414adb5d" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'MakeAgentUniversalIdentifierAndApplicationIdNotNullable1768213174274';
    }
};

//# sourceMappingURL=1768213174274-makeAgentUniversalIdentifierAndApplicationIdNotNullable.js.map