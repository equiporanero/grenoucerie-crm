"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddFieldWidgetType1765970658815", {
    enumerable: true,
    get: function() {
        return AddFieldWidgetType1765970658815;
    }
});
let AddFieldWidgetType1765970658815 = class AddFieldWidgetType1765970658815 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "core"."pageLayoutWidget_type_enum" RENAME TO "pageLayoutWidget_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."pageLayoutWidget_type_enum" AS ENUM('VIEW', 'IFRAME', 'FIELD', 'FIELDS', 'GRAPH', 'STANDALONE_RICH_TEXT', 'TIMELINE', 'TASKS', 'NOTES', 'FILES', 'EMAILS', 'CALENDAR', 'FIELD_RICH_TEXT', 'WORKFLOW', 'WORKFLOW_VERSION', 'WORKFLOW_RUN')`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" TYPE "core"."pageLayoutWidget_type_enum" USING "type"::"text"::"core"."pageLayoutWidget_type_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" SET DEFAULT 'VIEW'`);
        await queryRunner.query(`DROP TYPE "core"."pageLayoutWidget_type_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "core"."pageLayoutWidget_type_enum_old" AS ENUM('VIEW', 'IFRAME', 'FIELDS', 'GRAPH', 'STANDALONE_RICH_TEXT', 'TIMELINE', 'TASKS', 'NOTES', 'FILES', 'EMAILS', 'CALENDAR', 'FIELD_RICH_TEXT', 'WORKFLOW', 'WORKFLOW_VERSION', 'WORKFLOW_RUN')`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" TYPE "core"."pageLayoutWidget_type_enum_old" USING "type"::"text"::"core"."pageLayoutWidget_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" SET DEFAULT 'VIEW'`);
        await queryRunner.query(`DROP TYPE "core"."pageLayoutWidget_type_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."pageLayoutWidget_type_enum_old" RENAME TO "pageLayoutWidget_type_enum"`);
    }
    constructor(){
        this.name = 'AddFieldWidgetType1765970658815';
    }
};

//# sourceMappingURL=1765970658815-AddFieldWidgetType.js.map