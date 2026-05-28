"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddToolAndWorkflowActionTriggerSettingsFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddToolAndWorkflowActionTriggerSettingsFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddToolAndWorkflowActionTriggerSettingsFastInstanceCommand = class AddToolAndWorkflowActionTriggerSettingsFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ADD "toolTriggerSettings" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ADD "workflowActionTriggerSettings" jsonb`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP COLUMN "workflowActionTriggerSettings"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP COLUMN "toolTriggerSettings"`);
    }
};
AddToolAndWorkflowActionTriggerSettingsFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.3.0', 1797000001000)
], AddToolAndWorkflowActionTriggerSettingsFastInstanceCommand);

//# sourceMappingURL=2-3-instance-command-fast-1797000001000-add-tool-and-workflow-action-trigger-settings.js.map