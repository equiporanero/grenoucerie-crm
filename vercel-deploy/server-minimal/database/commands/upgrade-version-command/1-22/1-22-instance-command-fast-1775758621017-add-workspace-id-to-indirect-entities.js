"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddWorkspaceIdToIndirectEntitiesFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddWorkspaceIdToIndirectEntitiesFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const TABLES = [
    'applicationVariable',
    'indexFieldMetadata',
    'twoFactorAuthenticationMethod',
    'agentMessagePart',
    'agentTurnEvaluation',
    'agentChatThread',
    'agentTurn',
    'agentMessage'
];
let AddWorkspaceIdToIndirectEntitiesFastInstanceCommand = class AddWorkspaceIdToIndirectEntitiesFastInstanceCommand {
    async up(queryRunner) {
        for (const table of TABLES){
            await queryRunner.query(`ALTER TABLE "core"."${table}" ADD COLUMN IF NOT EXISTS "workspaceId" uuid`);
        }
    }
    async down(queryRunner) {
        for (const table of TABLES){
            await queryRunner.query(`ALTER TABLE "core"."${table}" DROP COLUMN IF EXISTS "workspaceId"`);
        }
    }
};
AddWorkspaceIdToIndirectEntitiesFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.22.0', 1775758621017)
], AddWorkspaceIdToIndirectEntitiesFastInstanceCommand);

//# sourceMappingURL=1-22-instance-command-fast-1775758621017-add-workspace-id-to-indirect-entities.js.map