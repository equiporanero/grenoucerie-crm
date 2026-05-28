"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateRoleColumns1765206100942", {
    enumerable: true,
    get: function() {
        return UpdateRoleColumns1765206100942;
    }
});
let UpdateRoleColumns1765206100942 = class UpdateRoleColumns1765206100942 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."roleTarget" DROP COLUMN "targetApplicationId"`);
        await queryRunner.query(`ALTER TABLE "core"."application" ADD "defaultServerlessFunctionRoleId" uuid`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."application" DROP COLUMN "defaultServerlessFunctionRoleId"`);
        await queryRunner.query(`ALTER TABLE "core"."roleTarget" ADD "targetApplicationId" uuid`);
    }
    constructor(){
        this.name = 'UpdateRoleColumns1765206100942';
    }
};

//# sourceMappingURL=1765206100942-updateRoleColumns.js.map