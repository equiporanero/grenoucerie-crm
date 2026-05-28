"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddOverridesToPageLayoutTabAndWidget1772267875870", {
    enumerable: true,
    get: function() {
        return AddOverridesToPageLayoutTabAndWidget1772267875870;
    }
});
let AddOverridesToPageLayoutTabAndWidget1772267875870 = class AddOverridesToPageLayoutTabAndWidget1772267875870 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutTab" ADD "overrides" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" ADD "overrides" jsonb`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutWidget" DROP COLUMN "overrides"`);
        await queryRunner.query(`ALTER TABLE "core"."pageLayoutTab" DROP COLUMN "overrides"`);
    }
    constructor(){
        this.name = 'AddOverridesToPageLayoutTabAndWidget1772267875870';
    }
};

//# sourceMappingURL=1772267875870-add-overrides-to-page-layout-tab-and-widget.js.map