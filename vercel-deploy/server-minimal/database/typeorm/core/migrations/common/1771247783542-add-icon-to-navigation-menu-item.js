"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddIconToNavigationMenuItem1771247783542", {
    enumerable: true,
    get: function() {
        return AddIconToNavigationMenuItem1771247783542;
    }
});
let AddIconToNavigationMenuItem1771247783542 = class AddIconToNavigationMenuItem1771247783542 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ADD "icon" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" DROP COLUMN "icon"`);
    }
    constructor(){
        this.name = 'AddIconToNavigationMenuItem1771247783542';
    }
};

//# sourceMappingURL=1771247783542-add-icon-to-navigation-menu-item.js.map