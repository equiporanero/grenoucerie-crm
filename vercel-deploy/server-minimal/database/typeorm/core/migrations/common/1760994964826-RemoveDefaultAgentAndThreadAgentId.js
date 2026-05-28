"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveDefaultAgentAndThreadAgentId1760994964826", {
    enumerable: true,
    get: function() {
        return RemoveDefaultAgentAndThreadAgentId1760994964826;
    }
});
let RemoveDefaultAgentAndThreadAgentId1760994964826 = class RemoveDefaultAgentAndThreadAgentId1760994964826 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP CONSTRAINT "FK_d0bdc80c68a48b1f26727aabfe6"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_d0bdc80c68a48b1f26727aabfe"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "defaultAgentId"`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "agentId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD "agentId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "defaultAgentId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_d0bdc80c68a48b1f26727aabfe" ON "core"."agentChatThread" ("agentId") `);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD CONSTRAINT "FK_d0bdc80c68a48b1f26727aabfe6" FOREIGN KEY ("agentId") REFERENCES "core"."agent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'RemoveDefaultAgentAndThreadAgentId1760994964826';
    }
};

//# sourceMappingURL=1760994964826-RemoveDefaultAgentAndThreadAgentId.js.map