"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddErrorMessageToUpgradeMigration1775649426693", {
    enumerable: true,
    get: function() {
        return AddErrorMessageToUpgradeMigration1775649426693;
    }
});
let AddErrorMessageToUpgradeMigration1775649426693 = class AddErrorMessageToUpgradeMigration1775649426693 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."upgradeMigration" ADD "errorMessage" text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."upgradeMigration" DROP COLUMN "errorMessage"`);
    }
    constructor(){
        this.name = 'AddErrorMessageToUpgradeMigration1775649426693';
    }
};

//# sourceMappingURL=1775649426693-add-error-message-to-upgrade-migration.js.map