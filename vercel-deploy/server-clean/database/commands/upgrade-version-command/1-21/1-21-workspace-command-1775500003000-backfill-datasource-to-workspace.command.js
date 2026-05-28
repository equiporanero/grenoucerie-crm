"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillDatasourceToWorkspaceCommand", {
    enumerable: true,
    get: function() {
        return BackfillDatasourceToWorkspaceCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _guards = require("@sniptt/guards");
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _workspaceentity = require("../../../../engine/core-modules/workspace/workspace.entity");
const _datasourceentity = require("../../../../engine/metadata-modules/data-source/data-source.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let BackfillDatasourceToWorkspaceCommand = class BackfillDatasourceToWorkspaceCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        const workspace = await this.workspaceRepository.findOne({
            select: [
                'id',
                'databaseSchema'
            ],
            where: {
                id: workspaceId
            }
        });
        if (!(0, _utils.isDefined)(workspace)) {
            this.logger.warn(`Workspace ${workspaceId} not found, skipping`);
            return;
        }
        if ((0, _guards.isNonEmptyString)(workspace.databaseSchema)) {
            this.logger.log(`Workspace ${workspaceId} already has databaseSchema="${workspace.databaseSchema}", skipping`);
            return;
        }
        const dataSource = await this.dataSourceRepository.findOne({
            where: {
                workspaceId
            },
            order: {
                createdAt: 'DESC'
            }
        });
        if (!(0, _utils.isDefined)(dataSource)) {
            throw new Error(`No dataSource row found for workspace ${workspaceId}. Cannot backfill databaseSchema.`);
        }
        if (!(0, _guards.isNonEmptyString)(dataSource.schema)) {
            throw new Error(`DataSource for workspace ${workspaceId} has an empty schema. Cannot backfill databaseSchema.`);
        }
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would set workspace ${workspaceId} databaseSchema to "${dataSource.schema}"`);
            return;
        }
        await this.workspaceRepository.update(workspaceId, {
            databaseSchema: dataSource.schema
        });
        this.logger.log(`Backfilled workspace ${workspaceId} databaseSchema to "${dataSource.schema}"`);
    }
    constructor(workspaceRepository, dataSourceRepository, workspaceIteratorService){
        super(workspaceIteratorService), this.workspaceRepository = workspaceRepository, this.dataSourceRepository = dataSourceRepository, this.workspaceIteratorService = workspaceIteratorService;
    }
};
BackfillDatasourceToWorkspaceCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('1.21.0', 1775500003000),
    (0, _nestcommander.Command)({
        name: 'upgrade:1-21:backfill-datasource-to-workspace',
        description: 'Backfill workspace.databaseSchema from the dataSource entity for workspaces that have not been migrated yet'
    }),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_datasourceentity.DataSourceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService
    ])
], BackfillDatasourceToWorkspaceCommand);

//# sourceMappingURL=1-21-workspace-command-1775500003000-backfill-datasource-to-workspace.command.js.map