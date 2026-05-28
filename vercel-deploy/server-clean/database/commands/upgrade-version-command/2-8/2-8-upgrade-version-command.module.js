"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "V2_8_UpgradeVersionCommandModule", {
    enumerable: true,
    get: function() {
        return V2_8_UpgradeVersionCommandModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspaceiteratormodule = require("../../command-runners/workspace-iterator.module");
const _28workspacecommand1798000050000dropchannelstandardobjectscommand = require("./2-8-workspace-command-1798000050000-drop-channel-standard-objects.command");
const _28workspacecommand1798100000000backfillrelationjoincolumnindexescommand = require("./2-8-workspace-command-1798100000000-backfill-relation-join-column-indexes.command");
const _28workspacecommand1798100010000gatedefaultcommandmenuitemsbypermissionflagcommand = require("./2-8-workspace-command-1798100010000-gate-default-command-menu-items-by-permission-flag.command");
const _28workspacecommand1798100020000restorechannelassociationscalarfieldmetadatacommand = require("./2-8-workspace-command-1798100020000-restore-channel-association-scalar-field-metadata.command");
const _applicationmodule = require("../../../../engine/core-modules/application/application.module");
const _fieldmetadataentity = require("../../../../engine/metadata-modules/field-metadata/field-metadata.entity");
const _workspacemetadataversionmodule = require("../../../../engine/metadata-modules/workspace-metadata-version/workspace-metadata-version.module");
const _workspaceschemamanagermodule = require("../../../../engine/twenty-orm/workspace-schema-manager/workspace-schema-manager.module");
const _workspacecachemodule = require("../../../../engine/workspace-cache/workspace-cache.module");
const _workspacemigrationmodule = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let V2_8_UpgradeVersionCommandModule = class V2_8_UpgradeVersionCommandModule {
};
V2_8_UpgradeVersionCommandModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _typeorm.TypeOrmModule.forFeature([
                _fieldmetadataentity.FieldMetadataEntity
            ]),
            _workspacecachemodule.WorkspaceCacheModule,
            _workspaceiteratormodule.WorkspaceIteratorModule,
            _workspacemetadataversionmodule.WorkspaceMetadataVersionModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspaceschemamanagermodule.WorkspaceSchemaManagerModule
        ],
        providers: [
            _28workspacecommand1798000050000dropchannelstandardobjectscommand.DropChannelStandardObjectsCommand,
            _28workspacecommand1798100000000backfillrelationjoincolumnindexescommand.BackfillRelationJoinColumnIndexesCommand,
            _28workspacecommand1798100010000gatedefaultcommandmenuitemsbypermissionflagcommand.GateDefaultCommandMenuItemsByPermissionFlagCommand,
            _28workspacecommand1798100020000restorechannelassociationscalarfieldmetadatacommand.RestoreChannelAssociationScalarFieldMetadataCommand
        ]
    })
], V2_8_UpgradeVersionCommandModule);

//# sourceMappingURL=2-8-upgrade-version-command.module.js.map