"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RenameRichTextToFieldRichTextAndAddStandaloneRichText1764846384501", {
    enumerable: true,
    get: function() {
        return RenameRichTextToFieldRichTextAndAddStandaloneRichText1764846384501;
    }
});
let RenameRichTextToFieldRichTextAndAddStandaloneRichText1764846384501 = class RenameRichTextToFieldRichTextAndAddStandaloneRichText1764846384501 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "core"."pageLayoutWidget_type_enum" RENAME TO "pageLayoutWidget_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "core"."pageLayoutWidget_type_enum" AS ENUM('VIEW', 'IFRAME', 'FIELDS', 'GRAPH', 'STANDALONE_RICH_TEXT', 'TIMELINE', 'TASKS', 'NOTES', 'FILES', 'EMAILS', 'CALENDAR', 'FIELD_RICH_TEXT', 'WORKFLOW', 'WORKFLOW_VERSION', 'WORKFLOW_RUN')`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" TYPE "core"."pageLayoutWidget_type_enum" USING "type"::"text"::"core"."pageLayoutWidget_type_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" SET DEFAULT 'VIEW'`);
        await queryRunner.query(`DROP TYPE "core"."pageLayoutWidget_type_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "core"."pageLayoutWidget_type_enum_old" AS ENUM('VIEW', 'IFRAME', 'FIELDS', 'GRAPH', 'TIMELINE', 'TASKS', 'NOTES', 'FILES', 'EMAILS', 'CALENDAR', 'RICH_TEXT', 'WORKFLOW', 'WORKFLOW_VERSION', 'WORKFLOW_RUN')`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" TYPE "core"."pageLayoutWidget_type_enum_old" USING "type"::"text"::"core"."pageLayoutWidget_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ALTER COLUMN "type" SET DEFAULT 'VIEW'`);
        await queryRunner.query(`DROP TYPE "core"."pageLayoutWidget_type_enum"`);
        await queryRunner.query(`ALTER TYPE "core"."pageLayoutWidget_type_enum_old" RENAME TO "pageLayoutWidget_type_enum"`);
    }
    constructor(){
        this.name = 'RenameRichTextToFieldRichTextAndAddStandaloneRichText1764846384501';
    }
};

//# sourceMappingURL=1764846384501-renameRichTextToFieldRichTextAndAddStandaloneRichText.js.map