"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddStatusToAgentMessage1775001600000", {
    enumerable: true,
    get: function() {
        return AddStatusToAgentMessage1775001600000;
    }
});
let AddStatusToAgentMessage1775001600000 = class AddStatusToAgentMessage1775001600000 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "core"."agentMessage_status_enum" AS ENUM ('queued', 'sent')`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessage" ADD COLUMN "status" "core"."agentMessage_status_enum" NOT NULL DEFAULT 'sent'`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessage" ALTER COLUMN "turnId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessage" ADD COLUMN "processedAt" TIMESTAMPTZ`);
        await queryRunner.query(`UPDATE "core"."agentMessage" SET "processedAt" = "createdAt" WHERE "status" = 'sent'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentMessage" DROP COLUMN "processedAt"`);
        // Queued messages have turnId=NULL. They must be deleted before
        // restoring the NOT NULL constraint on turnId.
        await queryRunner.query(`DELETE FROM "core"."agentMessage" WHERE "turnId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessage" ALTER COLUMN "turnId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."agentMessage" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "core"."agentMessage_status_enum"`);
    }
};

//# sourceMappingURL=1775001600000-add-status-to-agent-message.js.map