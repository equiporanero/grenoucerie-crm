"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddStandalonePageFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddStandalonePageFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddStandalonePageFastInstanceCommand = class AddStandalonePageFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" ADD "pageLayoutId" uuid');
        await queryRunner.query('ALTER TYPE "core"."pageLayout_type_enum" RENAME TO "pageLayout_type_enum_old"');
        await queryRunner.query("CREATE TYPE \"core\".\"pageLayout_type_enum\" AS ENUM('RECORD_INDEX', 'RECORD_PAGE', 'DASHBOARD', 'STANDALONE_PAGE')");
        await queryRunner.query('ALTER TABLE "core"."pageLayout" ALTER COLUMN "type" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "core"."pageLayout" ALTER COLUMN "type" TYPE "core"."pageLayout_type_enum" USING "type"::"text"::"core"."pageLayout_type_enum"');
        await queryRunner.query('ALTER TABLE "core"."pageLayout" ALTER COLUMN "type" SET DEFAULT \'RECORD_PAGE\'');
        await queryRunner.query('DROP TYPE "core"."pageLayout_type_enum_old"');
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" DROP CONSTRAINT IF EXISTS "CHK_navigation_menu_item_type_fields"');
        await queryRunner.query('ALTER TYPE "core"."navigationMenuItem_type_enum" RENAME TO "navigationMenuItem_type_enum_old"');
        await queryRunner.query("CREATE TYPE \"core\".\"navigationMenuItem_type_enum\" AS ENUM('VIEW', 'FOLDER', 'LINK', 'OBJECT', 'RECORD', 'PAGE_LAYOUT')");
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" ALTER COLUMN "type" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" ALTER COLUMN "type" TYPE "core"."navigationMenuItem_type_enum" USING "type"::"text"::"core"."navigationMenuItem_type_enum"');
        await queryRunner.query('DROP TYPE "core"."navigationMenuItem_type_enum_old"');
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ADD CONSTRAINT "CHK_navigation_menu_item_type_fields" CHECK (("type" = 'FOLDER') OR ("type" = 'OBJECT' AND "targetObjectMetadataId" IS NOT NULL) OR ("type" = 'VIEW' AND "viewId" IS NOT NULL) OR ("type" = 'RECORD' AND "targetRecordId" IS NOT NULL AND "targetObjectMetadataId" IS NOT NULL) OR ("type" = 'LINK' AND "link" IS NOT NULL) OR ("type" = 'PAGE_LAYOUT' AND "pageLayoutId" IS NOT NULL))`);
        await queryRunner.query('CREATE INDEX "IDX_NAVIGATION_MENU_ITEM_PAGE_LAYOUT_ID_WORKSPACE_ID" ON "core"."navigationMenuItem" ("pageLayoutId", "workspaceId") ');
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" ADD CONSTRAINT "FK_4ba3e5e988c4c5f159ec8753ee3" FOREIGN KEY ("pageLayoutId") REFERENCES "core"."pageLayout"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" DROP CONSTRAINT "FK_4ba3e5e988c4c5f159ec8753ee3"');
        await queryRunner.query('DROP INDEX "core"."IDX_NAVIGATION_MENU_ITEM_PAGE_LAYOUT_ID_WORKSPACE_ID"');
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" DROP CONSTRAINT IF EXISTS "CHK_navigation_menu_item_type_fields"');
        await queryRunner.query('DELETE FROM "core"."navigationMenuItem" WHERE "type" = \'PAGE_LAYOUT\'');
        await queryRunner.query("CREATE TYPE \"core\".\"navigationMenuItem_type_enum_old\" AS ENUM('FOLDER', 'LINK', 'OBJECT', 'RECORD', 'VIEW')");
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" ALTER COLUMN "type" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" ALTER COLUMN "type" TYPE "core"."navigationMenuItem_type_enum_old" USING "type"::"text"::"core"."navigationMenuItem_type_enum_old"');
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" ALTER COLUMN "type" SET DEFAULT \'VIEW\'');
        await queryRunner.query('DROP TYPE "core"."navigationMenuItem_type_enum"');
        await queryRunner.query('ALTER TYPE "core"."navigationMenuItem_type_enum_old" RENAME TO "navigationMenuItem_type_enum"');
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ADD CONSTRAINT "CHK_navigation_menu_item_type_fields" CHECK (("type" = 'FOLDER') OR ("type" = 'OBJECT' AND "targetObjectMetadataId" IS NOT NULL) OR ("type" = 'VIEW' AND "viewId" IS NOT NULL) OR ("type" = 'RECORD' AND "targetRecordId" IS NOT NULL AND "targetObjectMetadataId" IS NOT NULL) OR ("type" = 'LINK' AND "link" IS NOT NULL))`);
        await queryRunner.query('DELETE FROM "core"."pageLayout" WHERE "type" = \'STANDALONE_PAGE\'');
        await queryRunner.query("CREATE TYPE \"core\".\"pageLayout_type_enum_old\" AS ENUM('DASHBOARD', 'RECORD_INDEX', 'RECORD_PAGE')");
        await queryRunner.query('ALTER TABLE "core"."pageLayout" ALTER COLUMN "type" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "core"."pageLayout" ALTER COLUMN "type" TYPE "core"."pageLayout_type_enum_old" USING "type"::"text"::"core"."pageLayout_type_enum_old"');
        await queryRunner.query('ALTER TABLE "core"."pageLayout" ALTER COLUMN "type" SET DEFAULT \'RECORD_PAGE\'');
        await queryRunner.query('DROP TYPE "core"."pageLayout_type_enum"');
        await queryRunner.query('ALTER TYPE "core"."pageLayout_type_enum_old" RENAME TO "pageLayout_type_enum"');
        await queryRunner.query('ALTER TABLE "core"."navigationMenuItem" DROP COLUMN "pageLayoutId"');
    }
};
AddStandalonePageFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.23.0', 1775752781995)
], AddStandalonePageFastInstanceCommand);

//# sourceMappingURL=1-23-instance-command-fast-1775752781995-add-standalone-page.js.map