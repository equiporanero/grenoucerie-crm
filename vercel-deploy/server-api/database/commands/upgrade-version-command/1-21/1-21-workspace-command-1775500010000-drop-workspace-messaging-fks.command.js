"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropWorkspaceMessagingFksCommand", {
    enumerable: true,
    get: function() {
        return DropWorkspaceMessagingFksCommand;
    }
});
const _nestcommander = require("nest-commander");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _workspaceschemamanagerservice = require("../../../../engine/twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
const _getworkspaceschemanameutil = require("../../../../engine/workspace-datasource/utils/get-workspace-schema-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const FK_COLUMNS_TO_DROP = [
    {
        tableName: 'messageChannelMessageAssociation',
        columnName: 'messageChannelId'
    },
    {
        tableName: 'calendarChannelEventAssociation',
        columnName: 'calendarChannelId'
    },
    {
        tableName: 'messageFolder',
        columnName: 'messageChannelId'
    },
    {
        tableName: 'messageChannelMessageAssociationMessageFolder',
        columnName: 'messageFolderId'
    }
];
let DropWorkspaceMessagingFksCommand = class DropWorkspaceMessagingFksCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, dataSource, options }) {
        if (!dataSource) {
            this.logger.log(`No data source for workspace ${workspaceId}, skipping`);
            return;
        }
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            for (const { tableName, columnName } of FK_COLUMNS_TO_DROP){
                const foreignKeyName = await this.workspaceSchemaManagerService.foreignKeyManager.getForeignKeyName({
                    queryRunner,
                    schemaName,
                    tableName,
                    columnName
                });
                if (!foreignKeyName) {
                    continue;
                }
                if (options.dryRun) {
                    this.logger.log(`[DRY RUN] Would drop FK ${foreignKeyName} from ${schemaName}.${tableName}`);
                    continue;
                }
                await this.workspaceSchemaManagerService.foreignKeyManager.dropForeignKey({
                    queryRunner,
                    schemaName,
                    tableName,
                    foreignKeyName
                });
                this.logger.log(`Dropped FK ${foreignKeyName} from ${schemaName}.${tableName}`);
            }
        } finally{
            await queryRunner.release();
        }
    }
    constructor(workspaceIteratorService, workspaceSchemaManagerService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
DropWorkspaceMessagingFksCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500010000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:drop-workspace-messaging-fks',
        description: 'Drop FK constraints from workspace messaging/calendar tables that now reference core schema entities'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], DropWorkspaceMessagingFksCommand);

//# sourceMappingURL=1-21-workspace-command-1775500010000-drop-workspace-messaging-fks.command.js.map