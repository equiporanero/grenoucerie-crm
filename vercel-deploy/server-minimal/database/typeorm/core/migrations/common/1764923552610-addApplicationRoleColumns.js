"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddApplicationRoleColumns1764923552610", {
    enumerable: true,
    get: function() {
        return AddApplicationRoleColumns1764923552610;
    }
});
let AddApplicationRoleColumns1764923552610 = class AddApplicationRoleColumns1764923552610 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."roleTarget" ADD "targetApplicationId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."role" ADD "canBeAssignedToApplications" boolean NOT NULL DEFAULT true`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."role" DROP COLUMN "canBeAssignedToApplications"`);
        await queryRunner.query(`ALTER TABLE "core"."roleTarget" DROP COLUMN "targetApplicationId"`);
    }
    constructor(){
        this.name = 'AddApplicationRoleColumns1764923552610';
    }
};

//# sourceMappingURL=1764923552610-addApplicationRoleColumns.js.map