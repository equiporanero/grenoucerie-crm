"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeViewFilterUniversalIdentifierAndApplicationIdNotNullable1768213174273", {
    enumerable: true,
    get: function() {
        return MakeViewFilterUniversalIdentifierAndApplicationIdNotNullable1768213174273;
    }
});
const _1768213174273makeViewFilterUniversalIdentifierAndApplicationIdNotNullableutil = require("../utils/1768213174273-makeViewFilterUniversalIdentifierAndApplicationIdNotNullable.util");
let MakeViewFilterUniversalIdentifierAndApplicationIdNotNullable1768213174273 = class MakeViewFilterUniversalIdentifierAndApplicationIdNotNullable1768213174273 {
    async up(queryRunner) {
        const savepointName = 'sp_make_view_filter_universal_identifier_and_application_id_not_nullable';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1768213174273makeViewFilterUniversalIdentifierAndApplicationIdNotNullableutil.makeViewFilterUniversalIdentifierAndApplicationIdNotNullableQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakeViewFilterUniversalIdentifierAndApplicationIdNotNullable1768213174273', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakeViewFilterUniversalIdentifierAndApplicationIdNotNullable1768213174273 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" DROP CONSTRAINT "FK_d5651cf33fa56a47cd262a3fb2c"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_cd4588bfc9ad73345b3953a039"`);
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" ALTER COLUMN "applicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cd4588bfc9ad73345b3953a039" ON "core"."viewFilter" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."viewFilter" ADD CONSTRAINT "FK_d5651cf33fa56a47cd262a3fb2c" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'MakeViewFilterUniversalIdentifierAndApplicationIdNotNullable1768213174273';
    }
};

//# sourceMappingURL=1768213174273-makeViewFilterUniversalIdentifierAndApplicationIdNotNullable.js.map