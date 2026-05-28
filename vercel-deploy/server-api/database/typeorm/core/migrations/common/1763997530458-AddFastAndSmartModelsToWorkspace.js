"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddFastAndSmartModelsToWorkspace1763997530458", {
    enumerable: true,
    get: function() {
        return AddFastAndSmartModelsToWorkspace1763997530458;
    }
});
let AddFastAndSmartModelsToWorkspace1763997530458 = class AddFastAndSmartModelsToWorkspace1763997530458 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "fastModel" character varying NOT NULL DEFAULT 'default-fast-model'`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "smartModel" character varying NOT NULL DEFAULT 'default-smart-model'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "smartModel"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "fastModel"`);
    }
    constructor(){
        this.name = 'AddFastAndSmartModelsToWorkspace1763997530458';
    }
};

//# sourceMappingURL=1763997530458-AddFastAndSmartModelsToWorkspace.js.map