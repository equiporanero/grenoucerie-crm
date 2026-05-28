"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUsageColumnsToAgentChatThread1764700000000", {
    enumerable: true,
    get: function() {
        return AddUsageColumnsToAgentChatThread1764700000000;
    }
});
let AddUsageColumnsToAgentChatThread1764700000000 = class AddUsageColumnsToAgentChatThread1764700000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD COLUMN "totalInputTokens" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD COLUMN "totalOutputTokens" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD COLUMN "contextWindowTokens" integer`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD COLUMN "totalInputCredits" bigint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD COLUMN "totalOutputCredits" bigint NOT NULL DEFAULT 0`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "totalOutputCredits"`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "totalInputCredits"`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "contextWindowTokens"`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "totalOutputTokens"`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "totalInputTokens"`);
    }
    constructor(){
        this.name = 'AddUsageColumnsToAgentChatThread1764700000000';
    }
};

//# sourceMappingURL=1764700000000-add-usage-columns-to-agent-chat-thread.js.map