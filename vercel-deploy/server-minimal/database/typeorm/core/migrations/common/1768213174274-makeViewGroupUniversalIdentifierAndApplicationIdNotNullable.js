"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeViewGroupUniversalIdentifierAndApplicationIdNotNullable1768213174274", {
    enumerable: true,
    get: function() {
        return MakeViewGroupUniversalIdentifierAndApplicationIdNotNullable1768213174274;
    }
});
const _1768213174274makeViewGroupUniversalIdentifierAndApplicationIdNotNullableutil = require("../utils/1768213174274-makeViewGroupUniversalIdentifierAndApplicationIdNotNullable.util");
let MakeViewGroupUniversalIdentifierAndApplicationIdNotNullable1768213174274 = class MakeViewGroupUniversalIdentifierAndApplicationIdNotNullable1768213174274 {
    async up(queryRunner) {
        const savepointName = 'sp_make_view_group_universal_identifier_and_application_id_not_nullable';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1768213174274makeViewGroupUniversalIdentifierAndApplicationIdNotNullableutil.makeViewGroupUniversalIdentifierAndApplicationIdNotNullableQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakeViewGroupUniversalIdentifierAndApplicationIdNotNullable1768213174274', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakeViewGroupUniversalIdentifierAndApplicationIdNotNullable1768213174274 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewGroup" DROP CONSTRAINT "FK_5aff384532c78fa8a42ceeae282"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_a44e3b03f0eca32d0504d5ef73"`);
        await queryRunner.query(`ALTER TABLE "core"."viewGroup" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."viewGroup" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a44e3b03f0eca32d0504d5ef73" ON "core"."viewGroup" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."viewGroup" ADD CONSTRAINT "FK_5aff384532c78fa8a42ceeae282" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'MakeViewGroupUniversalIdentifierAndApplicationIdNotNullable1768213174274';
    }
};

//# sourceMappingURL=1768213174274-makeViewGroupUniversalIdentifierAndApplicationIdNotNullable.js.map