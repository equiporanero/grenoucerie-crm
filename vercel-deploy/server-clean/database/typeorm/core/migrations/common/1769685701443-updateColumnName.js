"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateColumnName1769685701443", {
    enumerable: true,
    get: function() {
        return UpdateColumnName1769685701443;
    }
});
let UpdateColumnName1769685701443 = class UpdateColumnName1769685701443 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "defaultLogicFunctionRoleId" TO "defaultRoleId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "defaultRoleId" TO "defaultLogicFunctionRoleId"`);
    }
    constructor(){
        this.name = 'UpdateColumnName1769685701443';
    }
};

//# sourceMappingURL=1769685701443-updateColumnName.js.map