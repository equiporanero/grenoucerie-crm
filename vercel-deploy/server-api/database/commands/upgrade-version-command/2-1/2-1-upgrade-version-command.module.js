"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V2_1_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V2_1_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _21workspacecommand1790000000000gateexportimportcommandmenuitemsbypermissionflagcommand = require("./2-1-workspace-command-1790000000000-gate-export-import-command-menu-items-by-permission-flag.command");
const _21workspacecommand1795000001000addlayoutcustomizationguardtoeditcommandscommand = require("./2-1-workspace-command-1795000001000-add-layout-customization-guard-to-edit-commands.command");
const _applicationmodule = require("../../../../engine/core-modules/application/application.module");
const _featureflagmodule = require("../../../../engine/core-modules/feature-flag/feature-flag.module");
const _workspacecachemodule = require("../../../../engine/workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let V2_1_UpgradeVersionCommandModule = class V2_1_UpgradeVersionCommandModule {
};
V2_1_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _featureflagmodule.FeatureFlagModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspaceiteratormodule.WorkspaceIteratorModule,
            _workspacemigrationmodule.WorkspaceMigrationModule
        ],
        providers: [
            _21workspacecommand1790000000000gateexportimportcommandmenuitemsbypermissionflagcommand.GateExportImportCommandMenuItemsByPermissionFlagCommand,
            _21workspacecommand1795000001000addlayoutcustomizationguardtoeditcommandscommand.AddLayoutCustomizationGuardToEditCommandsCommand
        ]
    })
], V2_1_UpgradeVersionCommandModule);

//# sourceMappingURL=2-1-upgrade-version-command.module.js.map