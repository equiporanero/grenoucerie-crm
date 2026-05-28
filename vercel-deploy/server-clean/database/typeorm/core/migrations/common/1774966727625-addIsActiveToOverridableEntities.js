"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddIsActiveToOverridableEntities1774966727625", {
    enumerable: true,
    get: function() {
        return AddIsActiveToOverridableEntities1774966727625;
    }
});
let AddIsActiveToOverridableEntities1774966727625 = class AddIsActiveToOverridableEntities1774966727625 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFieldGroup" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "core"."viewField" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutTab" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`UPDATE "core"."viewFieldGroup" SET "isActive" = false WHERE "deletedAt" IS NOT NULL`);
        await queryRunner.query(`UPDATE "core"."viewField" SET "isActive" = false WHERE "deletedAt" IS NOT NULL`);
        await queryRunner.query(`UPDATE "core"."pageLayoutTab" SET "isActive" = false WHERE "deletedAt" IS NOT NULL`);
        await queryRunner.query(`UPDATE "core"."pageLayoutWidget" SET "isActive" = false WHERE "deletedAt" IS NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutTab" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "core"."viewField" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "core"."viewFieldGroup" DROP COLUMN "isActive"`);
    }
    constructor(){
        this.name = 'AddIsActiveToOverridableEntities1774966727625';
    }
};

//# sourceMappingURL=1774966727625-addIsActiveToOverridableEntities.js.map