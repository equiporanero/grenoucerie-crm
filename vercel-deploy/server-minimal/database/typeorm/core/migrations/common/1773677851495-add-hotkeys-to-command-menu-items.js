"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddHotkeysToCommandMenuItems1773677851495", {
    enumerable: true,
    get: function() {
        return AddHotkeysToCommandMenuItems1773677851495;
    }
});
let AddHotkeysToCommandMenuItems1773677851495 = class AddHotkeysToCommandMenuItems1773677851495 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" ADD "hotKeys" text array`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."commandMenuItem" DROP COLUMN "hotKeys"`);
    }
    constructor(){
        this.name = 'AddHotkeysToCommandMenuItems1773677851495';
    }
};

//# sourceMappingURL=1773677851495-add-hotkeys-to-command-menu-items.js.map