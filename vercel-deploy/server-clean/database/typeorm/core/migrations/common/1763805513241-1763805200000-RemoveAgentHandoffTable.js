"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveAgentHandoffTable1763805513241", {
    enumerable: true,
    get: function() {
        return RemoveAgentHandoffTable1763805513241;
    }
});
let RemoveAgentHandoffTable1763805513241 = class RemoveAgentHandoffTable1763805513241 {
    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS "core"."agentHandoff" CASCADE`);
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "responseFormat" SET DEFAULT '{"type":"text"}'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "responseFormat" DROP DEFAULT`);
        await queryRunner.query(`CREATE TABLE "core"."agentHandoff" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "fromAgentId" uuid NOT NULL,
            "toAgentId" uuid NOT NULL,
            "workspaceId" uuid NOT NULL,
            "description" text,
            "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "deletedAt" TIMESTAMP WITH TIME ZONE,
            CONSTRAINT "PK_agentHandoff" PRIMARY KEY ("id"),
            CONSTRAINT "FK_agentHandoff_fromAgent" FOREIGN KEY ("fromAgentId") REFERENCES "core"."agent"("id") ON DELETE CASCADE,
            CONSTRAINT "FK_agentHandoff_toAgent" FOREIGN KEY ("toAgentId") REFERENCES "core"."agent"("id") ON DELETE CASCADE,
            CONSTRAINT "FK_agentHandoff_workspace" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE CASCADE
        )`);
    }
    constructor(){
        this.name = 'RemoveAgentHandoffTable1763805513241';
    }
};

//# sourceMappingURL=1763805513241-1763805200000-RemoveAgentHandoffTable.js.map