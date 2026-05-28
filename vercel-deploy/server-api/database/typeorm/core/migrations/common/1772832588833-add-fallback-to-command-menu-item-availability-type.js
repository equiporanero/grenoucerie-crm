"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddFallbackToCommandMenuItemAvailabilityType1772832588833", {
    enumerable: true,
    get: function() {
        return AddFallbackToCommandMenuItemAvailabilityType1772832588833;
    }
});
let AddFallbackToCommandMenuItemAvailabilityType1772832588833 = class AddFallbackToCommandMenuItemAvailabilityType1772832588833 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "core"."commandMenuItem_availabilitytype_enum" ADD VALUE IF NOT EXISTS 'FALLBACK' AFTER 'RECORD_SELECTION'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" TYPE character varying`);
        await queryRunner.query(`UPDATE "core"."commandMenuItem" SET "availabilityType" = 'GLOBAL' WHERE "availabilityType" = 'FALLBACK'`);
        await queryRunner.query(`DROP TYPE "core"."commandMenuItem_availabilitytype_enum"`);
        await queryRunner.query(`CREATE TYPE "core"."commandMenuItem_availabilitytype_enum" AS ENUM('GLOBAL', 'RECORD_SELECTION')`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" TYPE "core"."commandMenuItem_availabilitytype_enum" USING "availabilityType"::"core"."commandMenuItem_availabilitytype_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" SET DEFAULT 'GLOBAL'`);
    }
    constructor(){
        this.name = 'AddFallbackToCommandMenuItemAvailabilityType1772832588833';
    }
};

//# sourceMappingURL=1772832588833-add-fallback-to-command-menu-item-availability-type.js.map