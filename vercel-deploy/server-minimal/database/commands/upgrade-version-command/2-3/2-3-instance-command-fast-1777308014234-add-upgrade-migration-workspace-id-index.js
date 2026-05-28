"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddUpgradeMigrationWorkspaceIdIndexFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddUpgradeMigrationWorkspaceIdIndexFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddUpgradeMigrationWorkspaceIdIndexFastInstanceCommand = class AddUpgradeMigrationWorkspaceIdIndexFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_UPGRADE_MIGRATION_WORKSPACE_ID_NAME_ATTEMPT" ON "core"."upgradeMigration" ("workspaceId", "name", "attempt") WHERE "workspaceId" IS NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP INDEX IF EXISTS "core"."IDX_UPGRADE_MIGRATION_WORKSPACE_ID_NAME_ATTEMPT"');
    }
};
AddUpgradeMigrationWorkspaceIdIndexFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.3.0', 1777308014234)
], AddUpgradeMigrationWorkspaceIdIndexFastInstanceCommand);

//# sourceMappingURL=2-3-instance-command-fast-1777308014234-add-upgrade-migration-workspace-id-index.js.map