"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddCacheTokensToAgentChatThreadFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddCacheTokensToAgentChatThreadFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddCacheTokensToAgentChatThreadFastInstanceCommand = class AddCacheTokensToAgentChatThreadFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD "totalCacheReadTokens" bigint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" ADD "totalCacheCreationTokens" bigint NOT NULL DEFAULT 0`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "totalCacheCreationTokens"`);
        await queryRunner.query(`ALTER TABLE "core"."agentChatThread" DROP COLUMN "totalCacheReadTokens"`);
    }
};
AddCacheTokensToAgentChatThreadFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.2.0', 1777455269302)
], AddCacheTokensToAgentChatThreadFastInstanceCommand);

//# sourceMappingURL=2-2-instance-command-fast-1777455269302-add-cache-tokens-to-agent-chat-thread.js.map