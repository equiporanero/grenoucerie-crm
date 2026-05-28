"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddAgentIdToAgentChatMessage1764081474225", {
    enumerable: true,
    get: function() {
        return AddAgentIdToAgentChatMessage1764081474225;
    }
});
let AddAgentIdToAgentChatMessage1764081474225 = class AddAgentIdToAgentChatMessage1764081474225 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatMessage" ADD "agentId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "modelId" SET DEFAULT 'default-smart-model'`);
        await queryRunner.query(`CREATE INDEX "IDX_f3cab3cd2160867060a2812a3d" ON "core"."agentChatMessage" ("agentId") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "core"."IDX_f3cab3cd2160867060a2812a3d"`);
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "modelId" SET DEFAULT 'auto'`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatMessage" DROP COLUMN "agentId"`);
    }
    constructor(){
        this.name = 'AddAgentIdToAgentChatMessage1764081474225';
    }
};

//# sourceMappingURL=1764081474225-add-agent-id-to-agent-chat-message.js.map