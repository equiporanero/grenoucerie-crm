"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V2_7_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V2_7_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _27workspacecommand1798000020000synccommandmenuitemavailabilityexpressionscommand = require("./2-7-workspace-command-1798000020000-sync-command-menu-item-availability-expressions.command");
const _27workspacecommand1798000030000dropfavoriteobjectscommand = require("./2-7-workspace-command-1798000030000-drop-favorite-objects.command");
const _27workspacecommand1798000040000dropconnectedaccountstandardobjectcommand = require("./2-7-workspace-command-1798000040000-drop-connected-account-standard-object.command");
const _applicationmodule = require("../../../../engine/core-modules/application/application.module");
const _objectmetadatamodule = require("../../../../engine/metadata-modules/object-metadata/object-metadata.module");
const _workspacecachemodule = require("../../../../engine/workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let V2_7_UpgradeVersionCommandModule = class V2_7_UpgradeVersionCommandModule {
};
V2_7_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _objectmetadatamodule.ObjectMetadataModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspaceiteratormodule.WorkspaceIteratorModule,
            _workspacemigrationmodule.WorkspaceMigrationModule
        ],
        providers: [
            _27workspacecommand1798000030000dropfavoriteobjectscommand.DropFavoriteObjectsCommand,
            _27workspacecommand1798000020000synccommandmenuitemavailabilityexpressionscommand.SyncCommandMenuItemAvailabilityExpressionsCommand,
            _27workspacecommand1798000040000dropconnectedaccountstandardobjectcommand.DropConnectedAccountStandardObjectCommand
        ]
    })
], V2_7_UpgradeVersionCommandModule);

//# sourceMappingURL=2-7-upgrade-version-command.module.js.map