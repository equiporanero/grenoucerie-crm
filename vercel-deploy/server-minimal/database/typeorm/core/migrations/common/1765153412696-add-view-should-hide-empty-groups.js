"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddViewShouldHideEmptyGroups1765153412696", {
    enumerable: true,
    get: function() {
        return AddViewShouldHideEmptyGroups1765153412696;
    }
});
let AddViewShouldHideEmptyGroups1765153412696 = class AddViewShouldHideEmptyGroups1765153412696 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" ADD "shouldHideEmptyGroups" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" DROP COLUMN "shouldHideEmptyGroups"`);
    }
    constructor(){
        this.name = 'AddViewShouldHideEmptyGroups1765153412696';
    }
};

//# sourceMappingURL=1765153412696-add-view-should-hide-empty-groups.js.map