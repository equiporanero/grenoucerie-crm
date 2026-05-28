"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropChannelStandardObjectsCommand", {
    enumerable: true,
    get: function() {
        return DropChannelStandardObjectsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _findflatentitybyuniversalidentifierutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const CALENDAR_CHANNEL_OBJECT_UNIVERSAL_IDENTIFIER = '20202020-e8f2-40e1-a39c-c0e0039c5034';
const MESSAGE_CHANNEL_OBJECT_UNIVERSAL_IDENTIFIER = '20202020-fe8c-40bc-a681-b80b771449b7';
const MESSAGE_FOLDER_OBJECT_UNIVERSAL_IDENTIFIER = '20202020-4955-4fd9-8e59-2dbd373f2a46';
const OBJECT_UNIVERSAL_IDENTIFIERS = [
    CALENDAR_CHANNEL_OBJECT_UNIVERSAL_IDENTIFIER,
    MESSAGE_CHANNEL_OBJECT_UNIVERSAL_IDENTIFIER,
    MESSAGE_FOLDER_OBJECT_UNIVERSAL_IDENTIFIER
];
let DropChannelStandardObjectsCommand = class DropChannelStandardObjectsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Starting channel standard objects removal for workspace ${workspaceId}`);
        const { flatObjectMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps'
        ]);
        const objectsToDelete = OBJECT_UNIVERSAL_IDENTIFIERS.map((universalIdentifier)=>(0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                flatEntityMaps: flatObjectMetadataMaps,
                universalIdentifier
            })).filter((object)=>object !== undefined);
        if (objectsToDelete.length === 0) {
            this.logger.log(`Channel standard objects already absent for workspace ${workspaceId}`);
            return;
        }
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would delete ${objectsToDelete.length} channel standard objects for workspace ${workspaceId}`);
            return;
        }
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            isSystemBuild: true,
            allFlatEntityOperationByMetadataName: {
                objectMetadata: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: objectsToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to delete channel standard objects:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to delete channel standard objects for workspace ${workspaceId}`);
        }
        this.logger.log(`Deleted ${objectsToDelete.length} channel standard objects for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService;
    }
};
DropChannelStandardObjectsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.8.0', 1798000050000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-8:drop-channel-standard-objects',
        description: 'Drop calendarChannel, messageChannel, messageFolder standard objects from workspace schemas (moved to core metadata)'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], DropChannelStandardObjectsCommand);

//# sourceMappingURL=2-8-workspace-command-1798000050000-drop-channel-standard-objects.command.js.map