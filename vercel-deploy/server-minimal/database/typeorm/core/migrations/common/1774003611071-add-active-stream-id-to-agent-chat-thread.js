"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddActiveStreamIdToAgentChatThread1774003611071", {
    enumerable: true,
    get: function() {
        return AddActiveStreamIdToAgentChatThread1774003611071;
    }
});
let AddActiveStreamIdToAgentChatThread1774003611071 = class AddActiveStreamIdToAgentChatThread1774003611071 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD "activeStreamId" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "activeStreamId"`);
    }
    constructor(){
        this.name = 'AddActiveStreamIdToAgentChatThread1774003611071';
    }
};

//# sourceMappingURL=1774003611071-add-active-stream-id-to-agent-chat-thread.js.map