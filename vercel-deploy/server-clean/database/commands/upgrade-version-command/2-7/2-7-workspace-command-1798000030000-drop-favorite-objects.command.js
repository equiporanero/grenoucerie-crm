"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropFavoriteObjectsCommand", {
    enumerable: true,
    get: function() {
        return DropFavoriteObjectsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _findflatentitybyuniversalidentifierutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _objectmetadataservice = require("../../../../engine/metadata-modules/object-metadata/object-metadata.service");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
// Hard-coded because the matching STANDARD_OBJECTS entries no longer exist
// in twenty-shared after the favorite → navigationMenuItem migration.
const FAVORITE_OBJECT_UNIVERSAL_IDENTIFIER = '20202020-ab56-4e05-92a3-e2414a499860';
const FAVORITE_FOLDER_OBJECT_UNIVERSAL_IDENTIFIER = '20202020-7cf8-401f-8211-a9587d27fd2d';
// favorite has a relation to favoriteFolder, so it must be deleted first to
// avoid leaving dangling relation fields when favoriteFolder is dropped.
const LEGACY_FAVORITE_OBJECTS = [
    {
        universalIdentifier: FAVORITE_OBJECT_UNIVERSAL_IDENTIFIER,
        label: 'favorite'
    },
    {
        universalIdentifier: FAVORITE_FOLDER_OBJECT_UNIVERSAL_IDENTIFIER,
        label: 'favoriteFolder'
    }
];
let DropFavoriteObjectsCommand = class DropFavoriteObjectsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const isDryRun = options.dryRun ?? false;
        this.logger.log(`${isDryRun ? '[DRY RUN] ' : ''}Starting legacy favorite objects removal for workspace ${workspaceId}`);
        const { twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatObjectMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps'
        ]);
        for (const { universalIdentifier, label } of LEGACY_FAVORITE_OBJECTS){
            const flatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                flatEntityMaps: flatObjectMetadataMaps,
                universalIdentifier
            });
            if (!(0, _utils.isDefined)(flatObjectMetadata)) {
                this.logger.log(`${label} object already absent for workspace ${workspaceId}`);
                continue;
            }
            if (isDryRun) {
                this.logger.log(`[DRY RUN] Would delete ${label} object (id=${flatObjectMetadata.id}) for workspace ${workspaceId}`);
                continue;
            }
            await this.objectMetadataService.deleteOneObject({
                deleteObjectInput: {
                    id: flatObjectMetadata.id
                },
                workspaceId,
                isSystemBuild: true,
                ownerFlatApplication: twentyStandardFlatApplication
            });
            this.logger.log(`Deleted ${label} object for workspace ${workspaceId}`);
        }
    }
    constructor(workspaceIteratorService, applicationService, objectMetadataService, workspaceCacheService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.applicationService = applicationService, this.objectMetadataService = objectMetadataService, this.workspaceCacheService = workspaceCacheService;
    }
};
DropFavoriteObjectsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.7.0', 1798000030000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-7:drop-favorite-objects',
        description: 'Drop leftover favorite and favoriteFolder object metadata and workspace tables (data was migrated to navigationMenuItem in 1.17/1.18)'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _objectmetadataservice.ObjectMetadataService === "undefined" ? Object : _objectmetadataservice.ObjectMetadataService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], DropFavoriteObjectsCommand);

//# sourceMappingURL=2-7-workspace-command-1798000030000-drop-favorite-objects.command.js.map