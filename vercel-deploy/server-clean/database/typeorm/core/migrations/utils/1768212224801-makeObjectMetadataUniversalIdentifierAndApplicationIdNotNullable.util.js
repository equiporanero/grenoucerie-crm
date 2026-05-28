"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeObjectMetadataUniversalIdentifierAndApplicationIdNotNullableQueries", {
    enumerable: true,
    get: function() {
        return makeObjectMetadataUniversalIdentifierAndApplicationIdNotNullableQueries;
    }
});
const makeObjectMetadataUniversalIdentifierAndApplicationIdNotNullableQueries = async (queryRunner)=>{
    await queryRunner.query(`ALTER TABLE "core"."objectMetadata" DROP CONSTRAINT "FK_71a7af5a5c916f0b96f358f25f7"`);
    await queryRunner.query(`DROP INDEX "core"."IDX_3a00d35710f4227ded320fd96d"`);
    await queryRunner.query(`ALTER TABLE "core"."objectMetadata" ALTER COLUMN "universalIdentifier" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "core"."objectMetadata" ALTER COLUMN "applicationId" SET NOT NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3a00d35710f4227ded320fd96d" ON "core"."objectMetadata" ("workspaceId", "universalIdentifier") `);
    await queryRunner.query(`ALTER TABLE "core"."objectMetadata" ADD CONSTRAINT "FK_71a7af5a5c916f0b96f358f25f7" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
};

//# sourceMappingURL=1768212224801-makeObjectMetadataUniversalIdentifierAndApplicationIdNotNullable.util.js.map