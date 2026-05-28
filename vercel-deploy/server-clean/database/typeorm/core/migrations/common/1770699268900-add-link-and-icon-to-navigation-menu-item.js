"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddLinkToNavigationMenuItem1770256542802", {
    enumerable: true,
    get: function() {
        return AddLinkToNavigationMenuItem1770256542802;
    }
});
let AddLinkToNavigationMenuItem1770256542802 = class AddLinkToNavigationMenuItem1770256542802 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ADD "link" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" DROP COLUMN "link"`);
    }
    constructor(){
        this.name = 'AddLinkToNavigationMenuItem1770256542802';
    }
};

//# sourceMappingURL=1770699268900-add-link-and-icon-to-navigation-menu-item.js.map