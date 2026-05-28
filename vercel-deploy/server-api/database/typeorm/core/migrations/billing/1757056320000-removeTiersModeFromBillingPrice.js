"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveTiersModeFromBillingPrice1757056320000", {
    enumerable: true,
    get: function() {
        return RemoveTiersModeFromBillingPrice1757056320000;
    }
});
let RemoveTiersModeFromBillingPrice1757056320000 = class RemoveTiersModeFromBillingPrice1757056320000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."billingPrice" DROP COLUMN "tiersMode"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "core"."billingPrice_tiersmode_enum"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "core"."billingPrice_tiersmode_enum" AS ENUM('GRADUATED', 'VOLUME')`);
        await queryRunner.query(`ALTER TABLE "core"."billingPrice" ADD "tiersMode" "core"."billingPrice_tiersmode_enum"`);
    }
    constructor(){
        this.name = 'RemoveTiersModeFromBillingPrice1757056320000';
    }
};

//# sourceMappingURL=1757056320000-removeTiersModeFromBillingPrice.js.map