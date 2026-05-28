"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddDependencyChecksumsToLogicFunctionLayer1770038963629", {
    enumerable: true,
    get: function() {
        return AddDependencyChecksumsToLogicFunctionLayer1770038963629;
    }
});
let AddDependencyChecksumsToLogicFunctionLayer1770038963629 = class AddDependencyChecksumsToLogicFunctionLayer1770038963629 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunctionLayer" ADD "packageJsonChecksum" text`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunctionLayer" RENAME COLUMN "checksum" TO "yarnLockChecksum"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunctionLayer" ADD "availablePackages" jsonb NOT NULL DEFAULT '{}'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunctionLayer" DROP COLUMN "availablePackages"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunctionLayer" RENAME COLUMN "yarnLockChecksum" TO "checksum"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunctionLayer" DROP COLUMN "packageJsonChecksum"`);
    }
    constructor(){
        this.name = 'AddDependencyChecksumsToLogicFunctionLayer1770038963629';
    }
};

//# sourceMappingURL=1770038963629-addDependencyChecksumsToLogicFunctionLayer.js.map