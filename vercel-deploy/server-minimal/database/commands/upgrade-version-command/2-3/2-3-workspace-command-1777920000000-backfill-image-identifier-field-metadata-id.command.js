"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillImageIdentifierFieldMetadataIdCommand", {
    enumerable: true,
    get: function() {
        return BackfillImageIdentifierFieldMetadataIdCommand;
    }
});
const _nestcommander = require("nest-commander");
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
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
const WORKSPACE_MEMBER_UNIVERSAL_IDENTIFIER = _metadata.STANDARD_OBJECTS.workspaceMember.universalIdentifier;
const AVATAR_URL_FIELD_UNIVERSAL_IDENTIFIER = _metadata.STANDARD_OBJECTS.workspaceMember.fields.avatarUrl.universalIdentifier;
let BackfillImageIdentifierFieldMetadataIdCommand = class BackfillImageIdentifierFieldMetadataIdCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps'
        ]);
        const existingObject = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatObjectMetadataMaps,
            universalIdentifier: WORKSPACE_MEMBER_UNIVERSAL_IDENTIFIER
        });
        if (!(0, _utils.isDefined)(existingObject)) {
            this.logger.log(`workspaceMember object not found for workspace ${workspaceId}, skipping`);
            return;
        }
        if (existingObject.imageIdentifierFieldMetadataUniversalIdentifier === AVATAR_URL_FIELD_UNIVERSAL_IDENTIFIER) {
            this.logger.log(`imageIdentifierFieldMetadataId already set for workspace ${workspaceId}, skipping`);
            return;
        }
        const existingField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatFieldMetadataMaps,
            universalIdentifier: AVATAR_URL_FIELD_UNIVERSAL_IDENTIFIER
        });
        if (!(0, _utils.isDefined)(existingField)) {
            this.logger.log(`avatarUrl field not found for workspace ${workspaceId}, skipping`);
            return;
        }
        if (isDryRun) {
            this.logger.log(`[DRY RUN] Would backfill imageIdentifierFieldMetadataId on workspaceMember for workspace ${workspaceId}`);
            return;
        }
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                objectMetadata: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        {
                            ...existingObject,
                            imageIdentifierFieldMetadataUniversalIdentifier: AVATAR_URL_FIELD_UNIVERSAL_IDENTIFIER
                        }
                    ]
                }
            },
            workspaceId,
            isSystemBuild: true,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            this.logger.error(`Failed to backfill imageIdentifierFieldMetadataId for workspace ${workspaceId}:\n${JSON.stringify(validateAndBuildResult, null, 2)}`);
            throw new Error(`Failed to backfill imageIdentifierFieldMetadataId for workspace ${workspaceId}`);
        }
        this.logger.log(`Backfilled imageIdentifierFieldMetadataId on workspaceMember for workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, applicationService, workspaceCacheService, workspaceMigrationValidateBuildAndRunService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.workspaceCacheService = workspaceCacheService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
BackfillImageIdentifierFieldMetadataIdCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.3.0', 1777920000000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-3:backfill-image-identifier-field-metadata-id',
        description: 'Backfill imageIdentifierFieldMetadataId on workspaceMember for workspaces where it was never set.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], BackfillImageIdentifierFieldMetadataIdCommand);

//# sourceMappingURL=2-3-workspace-command-1777920000000-backfill-image-identifier-field-metadata-id.command.js.map