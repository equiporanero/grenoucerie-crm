"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUniversalToWebhook1769517102605", {
    enumerable: true,
    get: function() {
        return AddUniversalToWebhook1769517102605;
    }
});
let AddUniversalToWebhook1769517102605 = class AddUniversalToWebhook1769517102605 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."webhook" ADD "universalIdentifier" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."webhook" ADD "applicationId" uuid`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d48d713d01cc3c81bad1f39795" ON "core"."webhook" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."webhook" ADD CONSTRAINT "FK_e755f49a9ef74b36e27932f7a6c" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."webhook" DROP CONSTRAINT "FK_e755f49a9ef74b36e27932f7a6c"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_d48d713d01cc3c81bad1f39795"`);
        await queryRunner.query(`ALTER TABLE "core"."webhook" DROP COLUMN "applicationId"`);
        await queryRunner.query(`ALTER TABLE "core"."webhook" DROP COLUMN "universalIdentifier"`);
    }
    constructor(){
        this.name = 'AddUniversalToWebhook1769517102605';
    }
};

//# sourceMappingURL=1769517102605-addUniversalToWebhook.js.map