"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V2_3_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V2_3_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _23workspacecommand1777400000000dropmessagedirectionfieldcommand = require("./2-3-workspace-command-1777400000000-drop-message-direction-field.command");
const _23workspacecommand1777920000000backfillimageidentifierfieldmetadataidcommand = require("./2-3-workspace-command-1777920000000-backfill-image-identifier-field-metadata-id.command");
const _23workspacecommand1798000000000deletegaugewidgetscommand = require("./2-3-workspace-command-1798000000000-delete-gauge-widgets.command");
const _applicationmodule = require("../../../../engine/core-modules/application/application.module");
const _workspacecachemodule = require("../../../../engine/workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let V2_3_UpgradeVersionCommandModule = class V2_3_UpgradeVersionCommandModule {
};
V2_3_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspaceiteratormodule.WorkspaceIteratorModule,
            _workspacemigrationmodule.WorkspaceMigrationModule
        ],
        providers: [
            _23workspacecommand1777400000000dropmessagedirectionfieldcommand.DropMessageDirectionFieldCommand,
            _23workspacecommand1777920000000backfillimageidentifierfieldmetadataidcommand.BackfillImageIdentifierFieldMetadataIdCommand,
            _23workspacecommand1798000000000deletegaugewidgetscommand.DeleteGaugeWidgetsCommand
        ]
    })
], V2_3_UpgradeVersionCommandModule);

//# sourceMappingURL=2-3-upgrade-version-command.module.js.map