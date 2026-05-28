"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddIsInitialToUpgradeMigration1775909335324", {
    enumerable: true,
    get: function() {
        return AddIsInitialToUpgradeMigration1775909335324;
    }
});
let AddIsInitialToUpgradeMigration1775909335324 = class AddIsInitialToUpgradeMigration1775909335324 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."upgradeMigration" ADD "isInitial" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."upgradeMigration" DROP COLUMN "isInitial"`);
    }
};

//# sourceMappingURL=1775909335324-add-is-initial-to-upgrade-migration.js.map