"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddProviderExecutedToAgentMessagePartFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddProviderExecutedToAgentMessagePartFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddProviderExecutedToAgentMessagePartFastInstanceCommand = class AddProviderExecutedToAgentMessagePartFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."agentMessagePart" ADD "providerExecuted" boolean');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."agentMessagePart" DROP COLUMN "providerExecuted"');
    }
};
AddProviderExecutedToAgentMessagePartFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.1.0', 1777012800000)
], AddProviderExecutedToAgentMessagePartFastInstanceCommand);

//# sourceMappingURL=2-1-instance-command-fast-1777012800000-add-provider-executed-to-agent-message-part.js.map