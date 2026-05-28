"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V1_21_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V1_21_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _121workspacecommand1775500013000refactornavigationcommandscommand = require("./1-21-workspace-command-1775500013000-refactor-navigation-commands.command");
const _121workspacecommand1775500001000addcomposeemailcommandmenuitemcommand = require("./1-21-workspace-command-1775500001000-add-compose-email-command-menu-item.command");
const _121workspacecommand1775500002000addglobalkeyvaluepairuniqueindexcommand = require("./1-21-workspace-command-1775500002000-add-global-key-value-pair-unique-index.command");
const _121workspacecommand1775500003000backfilldatasourcetoworkspacecommand = require("./1-21-workspace-command-1775500003000-backfill-datasource-to-workspace.command");
const _121workspacecommand1775500004000backfillmessagethreadsubjectcommand = require("./1-21-workspace-command-1775500004000-backfill-message-thread-subject.command");
const _121workspacecommand1775500006000deduplicateenginecommandscommand = require("./1-21-workspace-command-1775500006000-deduplicate-engine-commands.command");
const _121workspacecommand1775500007000fixselectallcommandmenuitemscommand = require("./1-21-workspace-command-1775500007000-fix-select-all-command-menu-items.command");
const _121workspacecommand1775500008000migrateaiagenttexttojsonresponseformatcommand = require("./1-21-workspace-command-1775500008000-migrate-ai-agent-text-to-json-response-format.command");
const _121workspacecommand1775500009000updateeditlayoutcommandmenuitemlabelcommand = require("./1-21-workspace-command-1775500009000-update-edit-layout-command-menu-item-label.command");
const _121workspacecommand1775500010000dropworkspacemessagingfkscommand = require("./1-21-workspace-command-1775500010000-drop-workspace-messaging-fks.command");
const _121workspacecommand1775500011000migratemessagefolderparentidtoexternalidcommand = require("./1-21-workspace-command-1775500011000-migrate-message-folder-parent-id-to-external-id.command");
const _121workspacecommand1775500012000migratemessaginginfrastructuretometadatacommand = require("./1-21-workspace-command-1775500012000-migrate-messaging-infrastructure-to-metadata.command");
const _121workspacecommand1775500014000fixmessagethreadviewandlabelidentifiercommand = require("./1-21-workspace-command-1775500014000-fix-message-thread-view-and-label-identifier.command");
const _121workspacecommand1775500015000updatesearchcommandmenuitemlabelscommand = require("./1-21-workspace-command-1775500015000-update-search-command-menu-item-labels.command");
const _applicationmodule = require("../../../../engine/core-modules/application/application.module");
const _featureflagmodule = require("../../../../engine/core-modules/feature-flag/feature-flag.module");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _workspaceentity = require("../../../../engine/core-modules/workspace/workspace.entity");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _datasourceentity = require("../../../../engine/metadata-modules/data-source/data-source.entity");
const _fieldmetadatamodule = require("../../../../engine/metadata-modules/field-metadata/field-metadata.module");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _messagefolderentity = require("../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _workspaceschemamanagermodule = require("../../../../engine/twenty-orm/workspace-schema-manager/workspace-schema-manager.module");
const _workspacecachemodule = require("../../../../engine/workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let V1_21_UpgradeVersionCommandModule = class V1_21_UpgradeVersionCommandModule {
};
V1_21_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _datasourceentity.DataSourceEntity,
                _calendarchannelentity.CalendarChannelEntity,
                _connectedaccountentity.ConnectedAccountEntity,
                _messagechannelentity.MessageChannelEntity,
                _messagefolderentity.MessageFolderEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ]),
            _fieldmetadatamodule.FieldMetadataModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _applicationmodule.ApplicationModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _featureflagmodule.FeatureFlagModule,
            _workspaceiteratormodule.WorkspaceIteratorModule,
            _workspaceschemamanagermodule.WorkspaceSchemaManagerModule
        ],
        providers: [
            _121workspacecommand1775500001000addcomposeemailcommandmenuitemcommand.AddComposeEmailCommandMenuItemCommand,
            _121workspacecommand1775500002000addglobalkeyvaluepairuniqueindexcommand.AddGlobalKeyValuePairUniqueIndexCommand,
            _121workspacecommand1775500003000backfilldatasourcetoworkspacecommand.BackfillDatasourceToWorkspaceCommand,
            _121workspacecommand1775500004000backfillmessagethreadsubjectcommand.BackfillMessageThreadSubjectCommand,
            _121workspacecommand1775500006000deduplicateenginecommandscommand.DeduplicateEngineCommandsCommand,
            _121workspacecommand1775500007000fixselectallcommandmenuitemscommand.FixSelectAllCommandMenuItemsCommand,
            _121workspacecommand1775500008000migrateaiagenttexttojsonresponseformatcommand.MigrateAiAgentTextToJsonResponseFormatCommand,
            _121workspacecommand1775500009000updateeditlayoutcommandmenuitemlabelcommand.UpdateEditLayoutCommandMenuItemLabelCommand,
            _121workspacecommand1775500013000refactornavigationcommandscommand.RefactorNavigationCommandsCommand,
            _121workspacecommand1775500010000dropworkspacemessagingfkscommand.DropWorkspaceMessagingFksCommand,
            _121workspacecommand1775500011000migratemessagefolderparentidtoexternalidcommand.MigrateMessageFolderParentIdToExternalIdCommand,
            _121workspacecommand1775500012000migratemessaginginfrastructuretometadatacommand.MigrateMessagingInfrastructureToMetadataCommand,
            _121workspacecommand1775500014000fixmessagethreadviewandlabelidentifiercommand.FixMessageThreadViewAndLabelIdentifierCommand,
            _121workspacecommand1775500015000updatesearchcommandmenuitemlabelscommand.UpdateSearchCommandMenuItemLabelsCommand
        ]
    })
], V1_21_UpgradeVersionCommandModule);

//# sourceMappingURL=1-21-upgrade-version-command.module.js.map