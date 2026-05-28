"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddApplicationIdAndUniversalIdentifierToPageLayouts1765200057592", {
    enumerable: true,
    get: function() {
        return AddApplicationIdAndUniversalIdentifierToPageLayouts1765200057592;
    }
});
let AddApplicationIdAndUniversalIdentifierToPageLayouts1765200057592 = class AddApplicationIdAndUniversalIdentifierToPageLayouts1765200057592 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" ADD "universalIdentifier" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" ADD "applicationId" uuid`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_256fabec226411154baba649df" ON "core"."pageLayout" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" ADD CONSTRAINT "FK_5e7f19b88c0864db19e2bad0fc5" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" DROP CONSTRAINT "FK_5e7f19b88c0864db19e2bad0fc5"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_256fabec226411154baba649df"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" DROP COLUMN "applicationId"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" DROP COLUMN "universalIdentifier"`);
    }
    constructor(){
        this.name = 'AddApplicationIdAndUniversalIdentifierToPageLayouts1765200057592';
    }
};

//# sourceMappingURL=1765200057592-addApplicationIdAndUniversalIdentifierToPageLayouts.js.map