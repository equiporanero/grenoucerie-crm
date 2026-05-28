"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropWorkspaceAiColumns1774100000000", {
    enumerable: true,
    get: function() {
        return DropWorkspaceAiColumns1774100000000;
    }
});
let DropWorkspaceAiColumns1774100000000 = class DropWorkspaceAiColumns1774100000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN IF EXISTS "autoEnableNewAiModels"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN IF EXISTS "disabledAiModelIds"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "disabledAiModelIds" character varying array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "autoEnableNewAiModels" boolean NOT NULL DEFAULT true`);
    }
    constructor(){
        this.name = 'DropWorkspaceAiColumns1774100000000';
    }
};

//# sourceMappingURL=1774100000000-drop-workspace-ai-columns.js.map