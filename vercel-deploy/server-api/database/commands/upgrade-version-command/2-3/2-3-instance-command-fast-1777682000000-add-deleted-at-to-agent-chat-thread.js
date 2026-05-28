"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddDeletedAtToAgentChatThreadFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddDeletedAtToAgentChatThreadFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddDeletedAtToAgentChatThreadFastInstanceCommand = class AddDeletedAtToAgentChatThreadFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`CREATE INDEX "IDX_AGENT_CHAT_THREAD_ID_DELETED_AT" ON "core"."agentChatThread" ("id", "deletedAt")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "core"."IDX_AGENT_CHAT_THREAD_ID_DELETED_AT"`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "deletedAt"`);
    }
};
AddDeletedAtToAgentChatThreadFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.3.0', 1777682000000)
], AddDeletedAtToAgentChatThreadFastInstanceCommand);

//# sourceMappingURL=2-3-instance-command-fast-1777682000000-add-deleted-at-to-agent-chat-thread.js.map