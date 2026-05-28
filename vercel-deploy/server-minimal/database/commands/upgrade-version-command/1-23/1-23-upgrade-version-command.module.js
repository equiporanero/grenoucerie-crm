"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V1_23_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V1_23_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _123workspacecommand1780000001500backfillrecordpagelayoutscommand = require("./1-23-workspace-command-1780000001500-backfill-record-page-layouts.command");
const _123workspacecommand1780000005000updateglobalobjectcontextcommandmenuitemscommand = require("./1-23-workspace-command-1780000005000-update-global-object-context-command-menu-items.command");
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
let V1_23_UpgradeVersionCommandModule = class V1_23_UpgradeVersionCommandModule {
};
V1_23_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _featureflagmodule.FeatureFlagModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspaceiteratormodule.WorkspaceIteratorModule,
            _workspacemigrationmodule.WorkspaceMigrationModule
        ],
        providers: [
            _123workspacecommand1780000001500backfillrecordpagelayoutscommand.BackfillRecordPageLayoutsCommand,
            _123workspacecommand1780000005000updateglobalobjectcontextcommandmenuitemscommand.UpdateGlobalObjectContextCommandMenuItemsCommand
        ]
    })
], V1_23_UpgradeVersionCommandModule);

//# sourceMappingURL=1-23-upgrade-version-command.module.js.map