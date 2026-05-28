"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddFrontComponentType1768917890810", {
    enumerable: true,
    get: function() {
        return AddFrontComponentType1768917890810;
    }
});
let AddFrontComponentType1768917890810 = class AddFrontComponentType1768917890810 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "core"."pageLayoutWidget_type_enum" RENAME TO "pageLayoutWidget_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."pageLayoutWidget_type_enum" AS ENUM('VIEW', 'IFRAME', 'FIELD', 'FIELDS', 'GRAPH', 'STANDALONE_RICH_TEXT', 'TIMELINE', 'TASKS', 'NOTES', 'FILES', 'EMAILS', 'CALENDAR', 'FIELD_RICH_TEXT', 'WORKFLOW', 'WORKFLOW_VERSION', 'WORKFLOW_RUN', 'FRONT_COMPONENT')`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" TYPE "core"."pageLayoutWidget_type_enum" USING "type"::"text"::"core"."pageLayoutWidget_type_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" SET DEFAULT 'VIEW'`);
        await queryRunner.query(`DROP TYPE "core"."pageLayoutWidget_type_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "core"."pageLayoutWidget_type_enum_old" AS ENUM('VIEW', 'IFRAME', 'FIELD', 'FIELDS', 'GRAPH', 'STANDALONE_RICH_TEXT', 'TIMELINE', 'TASKS', 'NOTES', 'FILES', 'EMAILS', 'CALENDAR', 'FIELD_RICH_TEXT', 'WORKFLOW', 'WORKFLOW_VERSION', 'WORKFLOW_RUN')`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" TYPE "core"."pageLayoutWidget_type_enum_old" USING "type"::"text"::"core"."pageLayoutWidget_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" SET DEFAULT 'VIEW'`);
        await queryRunner.query(`DROP TYPE "core"."pageLayoutWidget_type_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."pageLayoutWidget_type_enum_old" RENAME TO "pageLayoutWidget_type_enum"`);
    }
    constructor(){
        this.name = 'AddFrontComponentType1768917890810';
    }
};

//# sourceMappingURL=1768917890810-AddFrontComponentType.js.map