"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FixAiEntityTimestampsToTimestamptz1771600000000", {
    enumerable: true,
    get: function() {
        return FixAiEntityTimestampsToTimestamptz1771600000000;
    }
});
let FixAiEntityTimestampsToTimestamptz1771600000000 = class FixAiEntityTimestampsToTimestamptz1771600000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE USING "createdAt"::timestamptz`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ALTER COLUMN "updatedAt" TYPE TIMESTAMP WITH TIME ZONE USING "updatedAt"::timestamptz`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessage" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE USING "createdAt"::timestamptz`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE USING "createdAt"::timestamptz`);
        await queryRunner.query(`ALTER TABLE "core"."agentTurn" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE USING "createdAt"::timestamptz`);
        await queryRunner.query(`ALTER TABLE "core"."agentTurnEvaluation" ALTER COLUMN "createdAt" TYPE TIMESTAMP WITH TIME ZONE USING "createdAt"::timestamptz`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentTurnEvaluation" ALTER COLUMN "createdAt" TYPE TIMESTAMP USING "createdAt"::timestamp`);
        await queryRunner.query(`ALTER TABLE "core"."agentTurn" ALTER COLUMN "createdAt" TYPE TIMESTAMP USING "createdAt"::timestamp`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessagePart" ALTER COLUMN "createdAt" TYPE TIMESTAMP USING "createdAt"::timestamp`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessage" ALTER COLUMN "createdAt" TYPE TIMESTAMP USING "createdAt"::timestamp`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ALTER COLUMN "updatedAt" TYPE TIMESTAMP USING "updatedAt"::timestamp`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ALTER COLUMN "createdAt" TYPE TIMESTAMP USING "createdAt"::timestamp`);
    }
    constructor(){
        this.name = 'FixAiEntityTimestampsToTimestamptz1771600000000';
    }
};

//# sourceMappingURL=1771600000000-fix-ai-entity-timestamps-to-timestamptz.js.map