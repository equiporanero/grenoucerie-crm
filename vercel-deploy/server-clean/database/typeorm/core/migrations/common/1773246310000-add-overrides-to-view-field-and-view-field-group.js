"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddOverridesToViewFieldAndViewFieldGroup1773246310000", {
    enumerable: true,
    get: function() {
        return AddOverridesToViewFieldAndViewFieldGroup1773246310000;
    }
});
let AddOverridesToViewFieldAndViewFieldGroup1773246310000 = class AddOverridesToViewFieldAndViewFieldGroup1773246310000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewField" ADD "overrides" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."viewFieldGroup" ADD "overrides" jsonb`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."viewFieldGroup" DROP COLUMN "overrides"`);
        await queryRunner.query(`ALTER TABLE "core"."viewField" DROP COLUMN "overrides"`);
    }
    constructor(){
        this.name = 'AddOverridesToViewFieldAndViewFieldGroup1773246310000';
    }
};

//# sourceMappingURL=1773246310000-add-overrides-to-view-field-and-view-field-group.js.map