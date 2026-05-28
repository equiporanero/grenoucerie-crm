"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V2_5_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V2_5_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _25workspacecommand1778000000000rebuilduniquephoneindexescommand = require("./2-5-workspace-command-1778000000000-rebuild-unique-phone-indexes.command");
const _25workspacecommand1778000001000normalizecompositefielddefaultscommand = require("./2-5-workspace-command-1778000001000-normalize-composite-field-defaults.command");
const _workspaceschemamanagermodule = require("../../../../engine/twenty-orm/workspace-schema-manager/workspace-schema-manager.module");
const _workspacecachemodule = require("../../../../engine/workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let V2_5_UpgradeVersionCommandModule = class V2_5_UpgradeVersionCommandModule {
};
V2_5_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacecachemodule.WorkspaceCacheModule,
            _workspaceiteratormodule.WorkspaceIteratorModule,
            _workspaceschemamanagermodule.WorkspaceSchemaManagerModule,
            _workspacemigrationmodule.WorkspaceMigrationModule
        ],
        providers: [
            _25workspacecommand1778000000000rebuilduniquephoneindexescommand.RebuildUniquePhoneIndexesCommand,
            _25workspacecommand1778000001000normalizecompositefielddefaultscommand.NormalizeCompositeFieldDefaultsCommand
        ]
    })
], V2_5_UpgradeVersionCommandModule);

//# sourceMappingURL=2-5-upgrade-version-command.module.js.map