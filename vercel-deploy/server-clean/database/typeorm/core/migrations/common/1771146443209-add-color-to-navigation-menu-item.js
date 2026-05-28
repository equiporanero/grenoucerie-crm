"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddColorToNavigationMenuItem1771146443209", {
    enumerable: true,
    get: function() {
        return AddColorToNavigationMenuItem1771146443209;
    }
});
let AddColorToNavigationMenuItem1771146443209 = class AddColorToNavigationMenuItem1771146443209 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ADD "color" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" DROP COLUMN "color"`);
    }
    constructor(){
        this.name = 'AddColorToNavigationMenuItem1771146443209';
    }
};

//# sourceMappingURL=1771146443209-add-color-to-navigation-menu-item.js.map