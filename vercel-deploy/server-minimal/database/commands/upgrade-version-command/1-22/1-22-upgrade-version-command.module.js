"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V1_22_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V1_22_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _122workspacecommand1780000002000backfillstandardskillscommand = require("./1-22-workspace-command-1780000002000-backfill-standard-skills.command");
const _122workspacecommand1780000003000fixmergecommandselectallcommand = require("./1-22-workspace-command-1780000003000-fix-merge-command-select-all.command");
const _122workspacecommand1775500016000addsendemailrecordselectioncommandmenuitemscommand = require("./1-22-workspace-command-1775500016000-add-send-email-record-selection-command-menu-items.command");
const _applicationmodule = require("../../../../engine/core-modules/application/application.module");
const _workspacecachemodule = require("../../../../engine/workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let V1_22_UpgradeVersionCommandModule = class V1_22_UpgradeVersionCommandModule {
};
V1_22_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspaceiteratormodule.WorkspaceIteratorModule,
            _workspacemigrationmodule.WorkspaceMigrationModule
        ],
        providers: [
            _122workspacecommand1775500016000addsendemailrecordselectioncommandmenuitemscommand.AddSendEmailRecordSelectionCommandMenuItemsCommand,
            _122workspacecommand1780000002000backfillstandardskillscommand.BackfillStandardSkillsCommand,
            _122workspacecommand1780000003000fixmergecommandselectallcommand.FixMergeCommandSelectAllCommand
        ]
    })
], V1_22_UpgradeVersionCommandModule);

//# sourceMappingURL=1-22-upgrade-version-command.module.js.map