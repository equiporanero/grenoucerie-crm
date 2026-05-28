"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "makeNavigationMenuItemTypeNotNullQueries", {
    enumerable: true,
    get: function() {
        return makeNavigationMenuItemTypeNotNullQueries;
    }
});
const makeNavigationMenuItemTypeNotNullQueries = async (queryRunner)=>{
    await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ALTER COLUMN "type" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" DROP CONSTRAINT IF EXISTS "CHK_navigation_menu_item_type_fields"`);
    await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ADD CONSTRAINT "CHK_navigation_menu_item_type_fields" CHECK (
      ("type" = 'FOLDER')
      OR ("type" = 'OBJECT' AND "targetObjectMetadataId" IS NOT NULL)
      OR ("type" = 'VIEW' AND "viewId" IS NOT NULL)
      OR ("type" = 'RECORD' AND "targetRecordId" IS NOT NULL AND "targetObjectMetadataId" IS NOT NULL)
      OR ("type" = 'LINK' AND "link" IS NOT NULL)
    )`);
};

//# sourceMappingURL=1773681736596-makeNavigationMenuItemTypeNotNull.util.js.map