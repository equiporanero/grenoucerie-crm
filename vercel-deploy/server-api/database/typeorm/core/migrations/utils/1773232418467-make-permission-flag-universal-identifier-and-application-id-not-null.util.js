"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makePermissionFlagUniversalIdentifierAndApplicationIdNotNullQueries", {
    enumerable: true,
    get: function() {
        return makePermissionFlagUniversalIdentifierAndApplicationIdNotNullQueries;
    }
});
const makePermissionFlagUniversalIdentifierAndApplicationIdNotNullQueries = async (queryRunner)=>{
    await queryRunner.query(`ALTER TABLE "core"."permissionFlag" ALTER COLUMN "universalIdentifier" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "core"."permissionFlag" ALTER COLUMN "applicationId" SET NOT NULL`);
    await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX_da8ffd3c24b4a819430a861067"`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_da8ffd3c24b4a819430a861067" ON "core"."permissionFlag" ("workspaceId", "universalIdentifier")`);
    await queryRunner.query(`ALTER TABLE "core"."permissionFlag" DROP CONSTRAINT IF EXISTS "FK_b26a9d39a88d0e72373c677c6c5"`);
    await queryRunner.query(`ALTER TABLE "core"."permissionFlag" ADD CONSTRAINT "FK_b26a9d39a88d0e72373c677c6c5" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
};

//# sourceMappingURL=1773232418467-make-permission-flag-universal-identifier-and-application-id-not-null.util.js.map