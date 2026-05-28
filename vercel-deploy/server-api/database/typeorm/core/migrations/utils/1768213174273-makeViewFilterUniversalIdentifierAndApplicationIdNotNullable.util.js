"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeViewFilterUniversalIdentifierAndApplicationIdNotNullableQueries", {
    enumerable: true,
    get: function() {
        return makeViewFilterUniversalIdentifierAndApplicationIdNotNullableQueries;
    }
});
const makeViewFilterUniversalIdentifierAndApplicationIdNotNullableQueries = async (queryRunner)=>{
    await queryRunner.query(`ALTER TABLE "core"."viewFilter" DROP CONSTRAINT "FK_d5651cf33fa56a47cd262a3fb2c"`);
    await queryRunner.query(`DROP INDEX "core"."IDX_cd4588bfc9ad73345b3953a039"`);
    await queryRunner.query(`ALTER TABLE "core"."viewFilter" ALTER COLUMN "universalIdentifier" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "core"."viewFilter" ALTER COLUMN "applicationId" SET NOT NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cd4588bfc9ad73345b3953a039" ON "core"."viewFilter" ("workspaceId", "universalIdentifier") `);
    await queryRunner.query(`ALTER TABLE "core"."viewFilter" ADD CONSTRAINT "FK_d5651cf33fa56a47cd262a3fb2c" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
};

//# sourceMappingURL=1768213174273-makeViewFilterUniversalIdentifierAndApplicationIdNotNullable.util.js.map