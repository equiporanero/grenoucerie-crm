"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrateToolTriggerSettingsSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return MigrateToolTriggerSettingsSlowInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MigrateToolTriggerSettingsSlowInstanceCommand = class MigrateToolTriggerSettingsSlowInstanceCommand {
    async runDataMigration(dataSource) {
        const defaultJsonSchema = `'{"type":"object","properties":{}}'::jsonb`;
        await dataSource.query(`UPDATE "core"."logicFunction"
          SET "toolTriggerSettings" = jsonb_build_object(
                'inputSchema',
                COALESCE("toolInputSchema", ${defaultJsonSchema})
              ),
              "workflowActionTriggerSettings" = jsonb_build_object(
                'inputSchema',
                jsonb_build_array(
                  COALESCE("toolInputSchema", ${defaultJsonSchema})
                )
              )
        WHERE "isTool" = true
          AND "toolTriggerSettings" IS NULL
          AND "workflowActionTriggerSettings" IS NULL`);
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP COLUMN "isTool"`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" DROP COLUMN "toolInputSchema"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ADD "toolInputSchema" jsonb`);
        await queryRunner.query(`ALTER TABLE "core"."logicFunction" ADD "isTool" boolean NOT NULL DEFAULT false`);
        // Best-effort reverse backfill so existing tools keep functioning if
        // someone rolls back. Pulls the JSON schema out of toolTriggerSettings.
        await queryRunner.query(`UPDATE "core"."logicFunction"
          SET "isTool" = true,
              "toolInputSchema" = "toolTriggerSettings"->'inputSchema'
        WHERE "toolTriggerSettings" IS NOT NULL`);
    }
};
MigrateToolTriggerSettingsSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.3.0', 1797000002000, {
        type: 'slow'
    })
], MigrateToolTriggerSettingsSlowInstanceCommand);

//# sourceMappingURL=2-3-instance-command-slow-1797000002000-migrate-tool-trigger-settings.js.map