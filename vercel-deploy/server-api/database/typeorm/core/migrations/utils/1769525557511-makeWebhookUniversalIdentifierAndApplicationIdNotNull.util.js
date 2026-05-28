"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeWebhookUniversalIdentifierAndApplicationIdNotNullQueries", {
    enumerable: true,
    get: function() {
        return makeWebhookUniversalIdentifierAndApplicationIdNotNullQueries;
    }
});
const makeWebhookUniversalIdentifierAndApplicationIdNotNullQueries = async (queryRunner)=>{
    await queryRunner.query(`ALTER TABLE "core"."webhook" DROP CONSTRAINT "FK_e755f49a9ef74b36e27932f7a6c"`);
    await queryRunner.query(`DROP INDEX "core"."IDX_d48d713d01cc3c81bad1f39795"`);
    await queryRunner.query(`ALTER TABLE "core"."webhook" ALTER COLUMN "universalIdentifier" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "core"."webhook" ALTER COLUMN "applicationId" SET NOT NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d48d713d01cc3c81bad1f39795" ON "core"."webhook" ("workspaceId", "universalIdentifier") `);
    await queryRunner.query(`ALTER TABLE "core"."webhook" ADD CONSTRAINT "FK_e755f49a9ef74b36e27932f7a6c" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
};

//# sourceMappingURL=1769525557511-makeWebhookUniversalIdentifierAndApplicationIdNotNull.util.js.map