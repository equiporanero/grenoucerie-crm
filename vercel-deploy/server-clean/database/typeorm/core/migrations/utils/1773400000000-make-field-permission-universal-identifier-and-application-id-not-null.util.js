"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeFieldPermissionUniversalIdentifierAndApplicationIdNotNullQueries", {
    enumerable: true,
    get: function() {
        return makeFieldPermissionUniversalIdentifierAndApplicationIdNotNullQueries;
    }
});
const makeFieldPermissionUniversalIdentifierAndApplicationIdNotNullQueries = async (queryRunner)=>{
    await queryRunner.query(`ALTER TABLE "core"."fieldPermission" ALTER COLUMN "universalIdentifier" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "core"."fieldPermission" ALTER COLUMN "applicationId" SET NOT NULL`);
    await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX_0dedb90c717e179ef653c512b9"`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0dedb90c717e179ef653c512b9" ON "core"."fieldPermission" ("workspaceId", "universalIdentifier")`);
    await queryRunner.query(`ALTER TABLE "core"."fieldPermission" DROP CONSTRAINT IF EXISTS "FK_71cc60c4a1c9f8a7c434d91d38c"`);
    await queryRunner.query(`ALTER TABLE "core"."fieldPermission" ADD CONSTRAINT "FK_71cc60c4a1c9f8a7c434d91d38c" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
};

//# sourceMappingURL=1773400000000-make-field-permission-universal-identifier-and-application-id-not-null.util.js.map