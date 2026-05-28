"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveContentFromAgentChatMessage1757991657472", {
    enumerable: true,
    get: function() {
        return RemoveContentFromAgentChatMessage1757991657472;
    }
});
let RemoveContentFromAgentChatMessage1757991657472 = class RemoveContentFromAgentChatMessage1757991657472 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatMessage" RENAME COLUMN "content" TO "rawContent"`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatMessage" ALTER COLUMN "rawContent" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatMessage" ALTER COLUMN "rawContent" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatMessage" RENAME COLUMN "rawContent" TO "content"`);
    }
    constructor(){
        this.name = 'RemoveContentFromAgentChatMessage1757991657472';
    }
};

//# sourceMappingURL=1757991657472-RemoveContentFromAgentChatMessage.js.map