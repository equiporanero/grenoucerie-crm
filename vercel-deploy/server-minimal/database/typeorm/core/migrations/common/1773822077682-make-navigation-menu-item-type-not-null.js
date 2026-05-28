"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MakeNavigationMenuItemTypeNotNull1773822077682", {
    enumerable: true,
    get: function() {
        return MakeNavigationMenuItemTypeNotNull1773822077682;
    }
});
const _1773681736596makeNavigationMenuItemTypeNotNullutil = require("../utils/1773681736596-makeNavigationMenuItemTypeNotNull.util");
let MakeNavigationMenuItemTypeNotNull1773822077682 = class MakeNavigationMenuItemTypeNotNull1773822077682 {
    async up(queryRunner) {
        const savepointName = 'sp_make_navigation_menu_item_type_not_null';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await (0, _1773681736596makeNavigationMenuItemTypeNotNullutil.makeNavigationMenuItemTypeNotNullQueries)(queryRunner);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in MakeNavigationMenuItemTypeNotNull1773822077682', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing MakeNavigationMenuItemTypeNotNull1773822077682 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" DROP CONSTRAINT "CHK_navigation_menu_item_type_fields"`);
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ALTER COLUMN "type" DROP NOT NULL`);
    }
    constructor(){
        this.name = 'MakeNavigationMenuItemTypeNotNull1773822077682';
    }
};

//# sourceMappingURL=1773822077682-make-navigation-menu-item-type-not-null.js.map