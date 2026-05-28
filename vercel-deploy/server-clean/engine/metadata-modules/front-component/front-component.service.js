"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FrontComponentService", {
    enumerable: true,
    get: function() {
        return FrontComponentService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../core-modules/application/application.service");
const _filestorageservice = require("../../core-modules/file-storage/file-storage.service");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreatefrontcomponentinputtoflatfrontcomponenttocreateutil = require("../flat-front-component/utils/from-create-front-component-input-to-flat-front-component-to-create.util");
const _fromflatfrontcomponenttofrontcomponentdtoutil = require("../flat-front-component/utils/from-flat-front-component-to-front-component-dto.util");
const _fromupdatefrontcomponentinputtoflatfrontcomponenttoupdateorthrowutil = require("../flat-front-component/utils/from-update-front-component-input-to-flat-front-component-to-update-or-throw.util");
const _frontcomponentexception = require("./front-component.exception");
const _workspacemigrationbuilderexception = require("../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FrontComponentService = class FrontComponentService {
    async findAll(workspaceId) {
        const { flatFrontComponentMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFrontComponentMaps'
            ]
        });
        return Object.values(flatFrontComponentMaps.byUniversalIdentifier).filter(_utils.isDefined).sort((a, b)=>a.name.localeCompare(b.name)).map(_fromflatfrontcomponenttofrontcomponentdtoutil.fromFlatFrontComponentToFrontComponentDto);
    }
    async findById(id, workspaceId) {
        const { flatFrontComponentMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFrontComponentMaps'
            ]
        });
        const flatFrontComponent = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatFrontComponentMaps
        });
        if (!(0, _utils.isDefined)(flatFrontComponent)) {
            return null;
        }
        return (0, _fromflatfrontcomponenttofrontcomponentdtoutil.fromFlatFrontComponentToFrontComponentDto)(flatFrontComponent);
    }
    async createOne({ input, workspaceId, ownerFlatApplication }) {
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? (await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        })).workspaceCustomFlatApplication;
        const flatFrontComponentToCreate = (0, _fromcreatefrontcomponentinputtoflatfrontcomponenttocreateutil.fromCreateFrontComponentInputToFlatFrontComponentToCreate)({
            createFrontComponentInput: input,
            workspaceId,
            flatApplication: resolvedOwnerFlatApplication
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                frontComponent: {
                    flatEntityToCreate: [
                        flatFrontComponentToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating front component');
        }
        const { flatFrontComponentMaps: recomputedFlatFrontComponentMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFrontComponentMaps'
            ]
        });
        const createdFlatFrontComponent = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatFrontComponentToCreate.id,
            flatEntityMaps: recomputedFlatFrontComponentMaps
        });
        return createdFlatFrontComponent;
    }
    async updateOne({ id, update, workspaceId, ownerFlatApplication }) {
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? (await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        })).workspaceCustomFlatApplication;
        const { flatFrontComponentMaps: existingFlatFrontComponentMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFrontComponentMaps'
            ]
        });
        const flatFrontComponentToUpdate = (0, _fromupdatefrontcomponentinputtoflatfrontcomponenttoupdateorthrowutil.fromUpdateFrontComponentInputToFlatFrontComponentToUpdateOrThrow)({
            flatFrontComponentMaps: existingFlatFrontComponentMaps,
            updateFrontComponentInput: {
                id,
                update
            }
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                frontComponent: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatFrontComponentToUpdate
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating front component');
        }
        const { flatFrontComponentMaps: recomputedFlatFrontComponentMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFrontComponentMaps'
            ]
        });
        const updatedFlatFrontComponent = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: id,
            flatEntityMaps: recomputedFlatFrontComponentMaps
        });
        return updatedFlatFrontComponent;
    }
    async destroyOne({ id, workspaceId, isSystemBuild = false, ownerFlatApplication }) {
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? (await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        })).workspaceCustomFlatApplication;
        const { flatFrontComponentMaps: existingFlatFrontComponentMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFrontComponentMaps'
            ]
        });
        const existingFlatFrontComponent = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: existingFlatFrontComponentMaps
        });
        if (!(0, _utils.isDefined)(existingFlatFrontComponent)) {
            throw new _frontcomponentexception.FrontComponentException('Front component to destroy not found', _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_FOUND);
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                frontComponent: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        existingFlatFrontComponent
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying front component');
        }
        return existingFlatFrontComponent;
    }
    async findByIdOrThrow(id, workspaceId) {
        const frontComponent = await this.findById(id, workspaceId);
        if (!(0, _utils.isDefined)(frontComponent)) {
            throw new _frontcomponentexception.FrontComponentException('Front component not found', _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_FOUND);
        }
        return frontComponent;
    }
    async getBuiltComponentStream({ frontComponentId, workspaceId }) {
        const frontComponent = await this.findByIdOrThrow(frontComponentId, workspaceId);
        const application = await this.applicationService.findOneApplicationOrThrow({
            id: frontComponent.applicationId,
            workspaceId
        });
        return this.fileStorageService.readFile({
            workspaceId,
            applicationUniversalIdentifier: application.universalIdentifier,
            fileFolder: _types.FileFolder.BuiltFrontComponent,
            resourcePath: frontComponent.builtComponentPath
        });
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService, fileStorageService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.fileStorageService = fileStorageService;
    }
};
FrontComponentService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService
    ])
], FrontComponentService);

//# sourceMappingURL=front-component.service.js.map