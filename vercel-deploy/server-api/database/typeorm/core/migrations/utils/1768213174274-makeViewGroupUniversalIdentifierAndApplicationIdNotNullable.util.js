"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeViewGroupUniversalIdentifierAndApplicationIdNotNullableQueries", {
    enumerable: true,
    get: function() {
        return makeViewGroupUniversalIdentifierAndApplicationIdNotNullableQueries;
    }
});
const makeViewGroupUniversalIdentifierAndApplicationIdNotNullableQueries = async (queryRunner)=>{
    await queryRunner.query(`ALTER TABLE "core"."viewGroup" DROP CONSTRAINT "FK_5aff384532c78fa8a42ceeae282"`);
    await queryRunner.query(`DROP INDEX "core"."IDX_a44e3b03f0eca32d0504d5ef73"`);
    await queryRunner.query(`ALTER TABLE "core"."viewGroup" ALTER COLUMN "universalIdentifier" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "core"."viewGroup" ALTER COLUMN "applicationId" SET NOT NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a44e3b03f0eca32d0504d5ef73" ON "core"."viewGroup" ("workspaceId", "universalIdentifier") `);
    await queryRunner.query(`ALTER TABLE "core"."viewGroup" ADD CONSTRAINT "FK_5aff384532c78fa8a42ceeae282" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
};

//# sourceMappingURL=1768213174274-makeViewGroupUniversalIdentifierAndApplicationIdNotNullable.util.js.map