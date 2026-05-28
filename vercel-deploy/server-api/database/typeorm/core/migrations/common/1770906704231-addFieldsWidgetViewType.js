"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddFieldsWidgetViewType1770906704231", {
    enumerable: true,
    get: function() {
        return AddFieldsWidgetViewType1770906704231;
    }
});
let AddFieldsWidgetViewType1770906704231 = class AddFieldsWidgetViewType1770906704231 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "core"."view_type_enum" ADD VALUE IF NOT EXISTS 'FIELDS_WIDGET' AFTER 'CALENDAR'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "core"."view_type_enum_old" AS ENUM('CALENDAR', 'KANBAN', 'TABLE')`);
        await queryRunner.query(`ALTER TABLE "core"."view" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."view" ALTER COLUMN "type" TYPE "core"."view_type_enum_old" USING "type"::"text"::"core"."view_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."view" ALTER COLUMN "type" SET DEFAULT 'TABLE'`);
        await queryRunner.query(`DROP TYPE "core"."view_type_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."view_type_enum_old" RENAME TO "view_type_enum"`);
    }
    constructor(){
        this.name = 'AddFieldsWidgetViewType1770906704231';
    }
};

//# sourceMappingURL=1770906704231-addFieldsWidgetViewType.js.map