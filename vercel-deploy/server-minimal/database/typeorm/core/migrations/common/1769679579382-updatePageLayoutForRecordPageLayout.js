"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdatePageLayoutForRecordPageLayout1769679579382", {
    enumerable: true,
    get: function() {
        return UpdatePageLayoutForRecordPageLayout1769679579382;
    }
});
let UpdatePageLayoutForRecordPageLayout1769679579382 = class UpdatePageLayoutForRecordPageLayout1769679579382 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" ADD "defaultTabToFocusOnMobileAndSidePanelId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutTab" ADD "icon" character varying`);
        await queryRunner.query(`CREATE TYPE "core"."pageLayoutTab_layoutmode_enum" AS ENUM('GRID', 'VERTICAL_LIST', 'CANVAS')`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutTab" ADD "layoutMode" "core"."pageLayoutTab_layoutmode_enum" NOT NULL DEFAULT 'GRID'`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ADD "conditionalDisplay" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" ADD CONSTRAINT "FK_747fbc25827bdcb9e35cc68a990" FOREIGN KEY ("defaultTabToFocusOnMobileAndSidePanelId") REFERENCES "core"."pageLayoutTab"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" DROP CONSTRAINT "FK_747fbc25827bdcb9e35cc68a990"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" DROP COLUMN "conditionalDisplay"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutTab" DROP COLUMN "layoutMode"`);
        await queryRunner.query(`DROP TYPE "core"."pageLayoutTab_layoutmode_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutTab" DROP COLUMN "icon"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayout" DROP COLUMN "defaultTabToFocusOnMobileAndSidePanelId"`);
    }
    constructor(){
        this.name = 'UpdatePageLayoutForRecordPageLayout1769679579382';
    }
};

//# sourceMappingURL=1769679579382-updatePageLayoutForRecordPageLayout.js.map