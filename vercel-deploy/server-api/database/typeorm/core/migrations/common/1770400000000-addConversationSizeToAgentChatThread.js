"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddConversationSizeToAgentChatThread1770400000000", {
    enumerable: true,
    get: function() {
        return AddConversationSizeToAgentChatThread1770400000000;
    }
});
let AddConversationSizeToAgentChatThread1770400000000 = class AddConversationSizeToAgentChatThread1770400000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD COLUMN "conversationSize" integer NOT NULL DEFAULT 0`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "conversationSize"`);
    }
    constructor(){
        this.name = 'AddConversationSizeToAgentChatThread1770400000000';
    }
};

//# sourceMappingURL=1770400000000-addConversationSizeToAgentChatThread.js.map