"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewSortService", {
    enumerable: true,
    get: function() {
        return ViewSortService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _fromcreateviewsortinputtoflatviewsorttocreateutil = require("../../flat-view-sort/utils/from-create-view-sort-input-to-flat-view-sort-to-create.util");
const _fromdeleteviewsortinputtoflatviewsortorthrowutil = require("../../flat-view-sort/utils/from-delete-view-sort-input-to-flat-view-sort-or-throw.util");
const _fromdestroyviewsortinputtoflatviewsortorthrowutil = require("../../flat-view-sort/utils/from-destroy-view-sort-input-to-flat-view-sort-or-throw.util");
const _fromupdateviewsortinputtoflatviewsorttoupdateorthrowutil = require("../../flat-view-sort/utils/from-update-view-sort-input-to-flat-view-sort-to-update-or-throw.util");
const _viewsortentity = require("../entities/view-sort.entity");
const _fromflatviewsorttoviewsortdtoutil = require("../utils/from-flat-view-sort-to-view-sort-dto.util");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
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
let ViewSortService = class ViewSortService {
    async createOne({ createViewSortInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatFieldMetadataMaps, flatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps',
                'flatViewMaps'
            ]
        });
        const flatViewSortToCreate = (0, _fromcreateviewsortinputtoflatviewsorttocreateutil.fromCreateViewSortInputToFlatViewSortToCreate)({
            createViewSortInput,
            flatApplication: workspaceCustomFlatApplication,
            flatFieldMetadataMaps,
            flatViewMaps
        });
        const buildAndRunResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewSort: {
                    flatEntityToCreate: [
                        flatViewSortToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (buildAndRunResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(buildAndRunResult, 'Multiple validation errors occurred while creating view sort');
        }
        const { flatViewSortMaps: recomputedExistingFlatViewSortMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewSortMaps'
            ]
        });
        return (0, _fromflatviewsorttoviewsortdtoutil.fromFlatViewSortToViewSortDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatViewSortToCreate.id,
            flatEntityMaps: recomputedExistingFlatViewSortMaps
        }));
    }
    async updateOne({ updateViewSortInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewSortMaps: existingFlatViewSortMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewSortMaps'
            ]
        });
        const optimisticallyUpdatedFlatViewSort = (0, _fromupdateviewsortinputtoflatviewsorttoupdateorthrowutil.fromUpdateViewSortInputToFlatViewSortToUpdateOrThrow)({
            flatViewSortMaps: existingFlatViewSortMaps,
            updateViewSortInput
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewSort: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        optimisticallyUpdatedFlatViewSort
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating view sort');
        }
        const { flatViewSortMaps: recomputedExistingFlatViewSortMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewSortMaps'
            ]
        });
        return (0, _fromflatviewsorttoviewsortdtoutil.fromFlatViewSortToViewSortDto)((0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: optimisticallyUpdatedFlatViewSort.universalIdentifier,
            flatEntityMaps: recomputedExistingFlatViewSortMaps
        }));
    }
    async deleteOne({ deleteViewSortInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewSortMaps: existingFlatViewSortMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewSortMaps'
            ]
        });
        const optimisticallyUpdatedFlatViewSortWithDeletedAt = (0, _fromdeleteviewsortinputtoflatviewsortorthrowutil.fromDeleteViewSortInputToFlatViewSortOrThrow)({
            flatViewSortMaps: existingFlatViewSortMaps,
            deleteViewSortInput
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewSort: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        optimisticallyUpdatedFlatViewSortWithDeletedAt
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting view sort');
        }
        const { flatViewSortMaps: recomputedExistingFlatViewSortMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewSortMaps'
            ]
        });
        return (0, _fromflatviewsorttoviewsortdtoutil.fromFlatViewSortToViewSortDto)((0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: optimisticallyUpdatedFlatViewSortWithDeletedAt.universalIdentifier,
            flatEntityMaps: recomputedExistingFlatViewSortMaps
        }));
    }
    async destroyOne({ destroyViewSortInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewSortMaps: existingFlatViewSortMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewSortMaps'
            ]
        });
        const existingViewSortToDelete = (0, _fromdestroyviewsortinputtoflatviewsortorthrowutil.fromDestroyViewSortInputToFlatViewSortOrThrow)({
            destroyViewSortInput,
            flatViewSortMaps: existingFlatViewSortMaps
        });
        const existingFlatViewSort = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: existingViewSortToDelete.universalIdentifier,
            flatEntityMaps: existingFlatViewSortMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewSort: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        existingViewSortToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying view sort');
        }
        return (0, _fromflatviewsorttoviewsortdtoutil.fromFlatViewSortToViewSortDto)(existingFlatViewSort);
    }
    async findByWorkspaceId(workspaceId) {
        return this.viewSortRepository.find({
            where: {
                workspaceId,
                deletedAt: (0, _typeorm1.IsNull)()
            },
            relations: [
                'workspace',
                'view'
            ]
        });
    }
    async findByViewId(workspaceId, viewId) {
        return this.viewSortRepository.find({
            where: {
                workspaceId,
                viewId,
                deletedAt: (0, _typeorm1.IsNull)()
            },
            relations: [
                'workspace',
                'view'
            ]
        });
    }
    async findById(id, workspaceId) {
        const viewSort = await this.viewSortRepository.findOne({
            where: {
                id,
                workspaceId,
                deletedAt: (0, _typeorm1.IsNull)()
            },
            relations: [
                'workspace',
                'view'
            ]
        });
        return viewSort || null;
    }
    constructor(viewSortRepository, workspaceMigrationValidateBuildAndRunService, flatEntityMapsCacheService, applicationService){
        this.viewSortRepository = viewSortRepository;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
ViewSortService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_viewsortentity.ViewSortEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], ViewSortService);

//# sourceMappingURL=view-sort.service.js.map