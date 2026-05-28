"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddTypeToNavigationMenuItem1773681736596", {
    enumerable: true,
    get: function() {
        return AddTypeToNavigationMenuItem1773681736596;
    }
});
let AddTypeToNavigationMenuItem1773681736596 = class AddTypeToNavigationMenuItem1773681736596 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "core"."navigationMenuItem_type_enum" AS ENUM('VIEW', 'FOLDER', 'LINK', 'OBJECT', 'RECORD')`);
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ADD "type" "core"."navigationMenuItem_type_enum"`);
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" DROP CONSTRAINT "CHK_navigation_menu_item_target_fields"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ADD CONSTRAINT "CHK_navigation_menu_item_target_fields" CHECK (("targetRecordId" IS NULL AND "targetObjectMetadataId" IS NULL) OR ("targetRecordId" IS NOT NULL AND "targetObjectMetadataId" IS NOT NULL))`);
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "core"."navigationMenuItem_type_enum"`);
    }
    constructor(){
        this.name = 'AddTypeToNavigationMenuItem1773681736596';
    }
};

//# sourceMappingURL=1773681736596-add-type-to-navigation-menu-item.js.map