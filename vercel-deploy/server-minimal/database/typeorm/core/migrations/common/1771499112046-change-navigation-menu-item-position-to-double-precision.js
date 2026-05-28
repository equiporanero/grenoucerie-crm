"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChangeNavigationMenuItemPositionToDoublePrecision1771499112046", {
    enumerable: true,
    get: function() {
        return ChangeNavigationMenuItemPositionToDoublePrecision1771499112046;
    }
});
let ChangeNavigationMenuItemPositionToDoublePrecision1771499112046 = class ChangeNavigationMenuItemPositionToDoublePrecision1771499112046 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ALTER COLUMN "position" TYPE double precision`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."navigationMenuItem" ALTER COLUMN "position" TYPE integer`);
    }
    constructor(){
        this.name = 'ChangeNavigationMenuItemPositionToDoublePrecision1771499112046';
    }
};

//# sourceMappingURL=1771499112046-change-navigation-menu-item-position-to-double-precision.js.map