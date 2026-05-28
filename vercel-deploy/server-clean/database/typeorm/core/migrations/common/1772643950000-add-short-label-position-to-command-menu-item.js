"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddShortLabelPositionToCommandMenuItem1772643950000", {
    enumerable: true,
    get: function() {
        return AddShortLabelPositionToCommandMenuItem1772643950000;
    }
});
let AddShortLabelPositionToCommandMenuItem1772643950000 = class AddShortLabelPositionToCommandMenuItem1772643950000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ADD "shortLabel" character varying`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ADD "position" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" TYPE character varying`);
        await queryRunner.query(`UPDATE "core"."commandMenuItem" SET "availabilityType" = CASE WHEN "availabilityType" IN ('SINGLE_RECORD', 'BULK_RECORDS') THEN 'RECORD_SELECTION' ELSE 'GLOBAL' END`);
        await queryRunner.query(`DROP TYPE "core"."commandMenuItem_availabilitytype_enum"`);
        await queryRunner.query(`CREATE TYPE "core"."commandMenuItem_availabilitytype_enum" AS ENUM('GLOBAL', 'RECORD_SELECTION')`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" TYPE "core"."commandMenuItem_availabilitytype_enum" USING "availabilityType"::"core"."commandMenuItem_availabilitytype_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" SET DEFAULT 'GLOBAL'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" TYPE character varying`);
        await queryRunner.query(`UPDATE "core"."commandMenuItem" SET "availabilityType" = CASE WHEN "availabilityType" = 'RECORD_SELECTION' THEN 'SINGLE_RECORD' ELSE 'GLOBAL' END`);
        await queryRunner.query(`DROP TYPE "core"."commandMenuItem_availabilitytype_enum"`);
        await queryRunner.query(`CREATE TYPE "core"."commandMenuItem_availabilitytype_enum" AS ENUM('GLOBAL', 'SINGLE_RECORD', 'BULK_RECORDS')`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" TYPE "core"."commandMenuItem_availabilitytype_enum" USING "availabilityType"::"core"."commandMenuItem_availabilitytype_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" SET DEFAULT 'GLOBAL'`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" DROP COLUMN "shortLabel"`);
    }
    constructor(){
        this.name = 'AddShortLabelPositionToCommandMenuItem1772643950000';
    }
};

//# sourceMappingURL=1772643950000-add-short-label-position-to-command-menu-item.js.map