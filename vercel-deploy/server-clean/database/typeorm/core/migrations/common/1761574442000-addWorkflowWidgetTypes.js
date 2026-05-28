"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddWorkflowWidgetTypes1761574442000", {
    enumerable: true,
    get: function() {
        return AddWorkflowWidgetTypes1761574442000;
    }
});
let AddWorkflowWidgetTypes1761574442000 = class AddWorkflowWidgetTypes1761574442000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "core"."pageLayoutWidget_type_enum" RENAME TO "pageLayoutWidget_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."pageLayoutWidget_type_enum" AS ENUM('VIEW', 'IFRAME', 'FIELDS', 'GRAPH', 'TIMELINE', 'TASKS', 'NOTES', 'FILES', 'EMAILS', 'CALENDAR', 'RICH_TEXT', 'WORKFLOW', 'WORKFLOW_VERSION', 'WORKFLOW_RUN')`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" TYPE "core"."pageLayoutWidget_type_enum" USING "type"::"text"::"core"."pageLayoutWidget_type_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" SET DEFAULT 'VIEW'`);
        await queryRunner.query(`DROP TYPE "core"."pageLayoutWidget_type_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "core"."pageLayoutWidget_type_enum_old" AS ENUM('VIEW', 'IFRAME', 'FIELDS', 'GRAPH', 'TIMELINE', 'TASKS', 'NOTES', 'FILES', 'EMAILS', 'CALENDAR', 'RICH_TEXT')`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" TYPE "core"."pageLayoutWidget_type_enum_old" USING "type"::"text"::"core"."pageLayoutWidget_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" SET DEFAULT 'VIEW'`);
        await queryRunner.query(`DROP TYPE "core"."pageLayoutWidget_type_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."pageLayoutWidget_type_enum_old" RENAME TO "pageLayoutWidget_type_enum"`);
    }
    constructor(){
        this.name = 'AddWorkflowWidgetTypes1761574442000';
    }
};

//# sourceMappingURL=1761574442000-addWorkflowWidgetTypes.js.map