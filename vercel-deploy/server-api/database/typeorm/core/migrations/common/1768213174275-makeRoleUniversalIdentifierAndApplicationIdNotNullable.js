"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeRoleUniversalIdentifierAndApplicationIdNotNullable1768213174275", {
    enumerable: true,
    get: function() {
        return MakeRoleUniversalIdentifierAndApplicationIdNotNullable1768213174275;
    }
});
const _1768213174275makeRoleUniversalIdentifierAndApplicationIdNotNullableutil = require("../utils/1768213174275-makeRoleUniversalIdentifierAndApplicationIdNotNullable.util");
let MakeRoleUniversalIdentifierAndApplicationIdNotNullable1768213174275 = class MakeRoleUniversalIdentifierAndApplicationIdNotNullable1768213174275 {
    async up(queryRunner) {
        const savepointName = 'sp_make_role_universal_identifier_and_application_id_not_nullable';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1768213174275makeRoleUniversalIdentifierAndApplicationIdNotNullableutil.makeRoleUniversalIdentifierAndApplicationIdNotNullableQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakeRoleUniversalIdentifierAndApplicationIdNotNullable1768213174275', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakeRoleUniversalIdentifierAndApplicationIdNotNullable1768213174275 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."role" DROP CONSTRAINT "FK_7f3b96f15aaf5a27549288d264b"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_3b7ff27925c0959777682c1adc"`);
        await queryRunner.query(`ALTER TABLE "core"."role" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."role" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3b7ff27925c0959777682c1adc" ON "core"."role" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."role" ADD CONSTRAINT "FK_7f3b96f15aaf5a27549288d264b" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'MakeRoleUniversalIdentifierAndApplicationIdNotNullable1768213174275';
    }
};

//# sourceMappingURL=1768213174275-makeRoleUniversalIdentifierAndApplicationIdNotNullable.js.map