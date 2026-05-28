"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddCalendarFieldMetadataIdToViewTable1757864696439", {
    enumerable: true,
    get: function() {
        return AddCalendarFieldMetadataIdToViewTable1757864696439;
    }
});
let AddCalendarFieldMetadataIdToViewTable1757864696439 = class AddCalendarFieldMetadataIdToViewTable1757864696439 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" DROP CONSTRAINT "CHK_VIEW_CALENDAR_LAYOUT_NOT_NULL_WHEN_TYPE_CALENDAR"`);
        await queryRunner.query(`ALTER TABLE "core"."view" ADD "calendarFieldMetadataId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."view" ADD CONSTRAINT "CHK_VIEW_CALENDAR_INTEGRITY" CHECK (("type" != 'CALENDAR' OR ("calendarLayout" IS NOT NULL AND "calendarFieldMetadataId" IS NOT NULL)))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" DROP CONSTRAINT "CHK_VIEW_CALENDAR_INTEGRITY"`);
        await queryRunner.query(`ALTER TABLE "core"."view" DROP COLUMN "calendarFieldMetadataId"`);
        await queryRunner.query(`ALTER TABLE "core"."view" ADD CONSTRAINT "CHK_VIEW_CALENDAR_LAYOUT_NOT_NULL_WHEN_TYPE_CALENDAR" CHECK (((type <> 'CALENDAR'::core.view_type_enum) OR ("calendarLayout" IS NOT NULL)))`);
    }
    constructor(){
        this.name = 'AddCalendarFieldMetadataIdToViewTable1757864696439';
    }
};

//# sourceMappingURL=1757864696439-addCalendarFieldMetadataIdToViewTable.js.map