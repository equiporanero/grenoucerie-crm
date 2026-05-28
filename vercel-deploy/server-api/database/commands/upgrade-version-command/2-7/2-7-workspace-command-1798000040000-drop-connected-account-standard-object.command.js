"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropConnectedAccountStandardObjectCommand", {
    enumerable: true,
    get: function() {
        return DropConnectedAccountStandardObjectCommand;
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
const CONNECTED_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER = '20202020-977e-46b2-890b-c3002ddfd5c5';
const WORKSPACE_MEMBER_CONNECTED_ACCOUNTS_FIELD_UNIVERSAL_IDENTIFIER = '20202020-e322-4bde-a525-727079b4a100';
const MESSAGE_CHANNEL_CONNECTED_ACCOUNT_FIELD_UNIVERSAL_IDENTIFIER = '20202020-49a2-44a4-b470-282c0440d15d';
const CALENDAR_CHANNEL_CONNECTED_ACCOUNT_FIELD_UNIVERSAL_IDENTIFIER = '20202020-95b1-4f44-82dc-61b042ae2414';
let DropConnectedAccountStandardObjectCommand = class DropConnectedAccountStandardObjectCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Starting connectedAccount standard object removal for workspace ${workspaceId}`);
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps'
        ]);
        const connectedAccountObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatObjectMetadataMaps,
            universalIdentifier: CONNECTED_ACCOUNT_OBJECT_UNIVERSAL_IDENTIFIER
        });
        const relationFieldsToDelete = [
            WORKSPACE_MEMBER_CONNECTED_ACCOUNTS_FIELD_UNIVERSAL_IDENTIFIER,
            MESSAGE_CHANNEL_CONNECTED_ACCOUNT_FIELD_UNIVERSAL_IDENTIFIER,
            CALENDAR_CHANNEL_CONNECTED_ACCOUNT_FIELD_UNIVERSAL_IDENTIFIER
        ].map((universalIdentifier)=>(0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                flatEntityMaps: flatFieldMetadataMaps,
                universalIdentifier
            })).filter((field)=>field !== undefined);
        if (!connectedAccountObjectMetadata && relationFieldsToDelete.length === 0) {
            this.logger.log(`connectedAccount standard object already absent for workspace ${workspaceId}`);
            return;
        }
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would delete connectedAccount standard object and ${relationFieldsToDelete.length} relation fields for workspace ${workspaceId}`);
            return;
        }
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            isSystemBuild: true,
            allFlatEntityOperationByMetadataName: {
                ...connectedAccountObjectMetadata ? {
                    objectMetadata: {
                        flatEntityToCreate: [],
                        flatEntityToDelete: [
                            connectedAccountObjectMetadata
                        ],
                        flatEntityToUpdate: []
                    }
                } : {},
                ...relationFieldsToDelete.length > 0 ? {
                    fieldMetadata: {
                        flatEntityToCreate: [],
                        flatEntityToDelete: relationFieldsToDelete,
                        flatEntityToUpdate: []
                    }
                } : {}
            },
            workspaceId,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to delete connectedAccount standard object:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to delete connectedAccount standard object for workspace ${workspaceId}`);
        }
        this.logger.log(`Deleted connectedAccount standard object and relation fields for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheService = workspaceCacheService;
    }
};
DropConnectedAccountStandardObjectCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.7.0', 1798000040000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-7:drop-connected-account-standard-object',
        description: 'Drop the connectedAccount standard object from workspace schemas (moved to core metadata)'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], DropConnectedAccountStandardObjectCommand);

//# sourceMappingURL=2-7-workspace-command-1798000040000-drop-connected-account-standard-object.command.js.map