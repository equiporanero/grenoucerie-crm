"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddAiModelAvailabilityColumns1771768847449", {
    enumerable: true,
    get: function() {
        return AddAiModelAvailabilityColumns1771768847449;
    }
});
let AddAiModelAvailabilityColumns1771768847449 = class AddAiModelAvailabilityColumns1771768847449 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "autoEnableNewAiModels" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "disabledAiModelIds" character varying array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "enabledAiModelIds" character varying array NOT NULL DEFAULT '{}'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "enabledAiModelIds"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "disabledAiModelIds"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "autoEnableNewAiModels"`);
    }
    constructor(){
        this.name = 'AddAiModelAvailabilityColumns1771768847449';
    }
};

//# sourceMappingURL=1771768847449-add-ai-model-availability-columns.js.map