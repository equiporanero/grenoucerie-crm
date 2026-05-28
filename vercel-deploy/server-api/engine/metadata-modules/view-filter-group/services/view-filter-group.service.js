"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterGroupService", {
    enumerable: true,
    get: function() {
        return ViewFilterGroupService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _fromcreateviewfiltergroupinputtoflatviewfiltergrouptocreateutil = require("../../flat-view-filter-group/utils/from-create-view-filter-group-input-to-flat-view-filter-group-to-create.util");
const _fromdeleteviewfiltergroupinputtoflatviewfiltergrouporthrowutil = require("../../flat-view-filter-group/utils/from-delete-view-filter-group-input-to-flat-view-filter-group-or-throw.util");
const _fromdestroyviewfiltergroupinputtoflatviewfiltergrouporthrowutil = require("../../flat-view-filter-group/utils/from-destroy-view-filter-group-input-to-flat-view-filter-group-or-throw.util");
const _fromupdateviewfiltergroupinputtoflatviewfiltergrouptoupdateorthrowutil = require("../../flat-view-filter-group/utils/from-update-view-filter-group-input-to-flat-view-filter-group-to-update-or-throw.util");
const _viewfiltergroupentity = require("../entities/view-filter-group.entity");
const _fromflatviewfiltergrouptoviewfiltergroupdtoutil = require("../utils/from-flat-view-filter-group-to-view-filter-group-dto.util");
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
let ViewFilterGroupService = class ViewFilterGroupService {
    async createOne({ createViewFilterGroupInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewMaps: existingFlatViewMaps, flatViewFilterGroupMaps: existingFlatViewFilterGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps',
                'flatViewFilterGroupMaps'
            ]
        });
        const flatViewFilterGroupToCreate = (0, _fromcreateviewfiltergroupinputtoflatviewfiltergrouptocreateutil.fromCreateViewFilterGroupInputToFlatViewFilterGroupToCreate)({
            createViewFilterGroupInput,
            flatApplication: workspaceCustomFlatApplication,
            flatViewMaps: existingFlatViewMaps,
            flatViewFilterGroupMaps: existingFlatViewFilterGroupMaps
        });
        const buildAndRunResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFilterGroup: {
                    flatEntityToCreate: [
                        flatViewFilterGroupToCreate
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
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(buildAndRunResult, 'Multiple validation errors occurred while creating view filter group');
        }
        const { flatViewFilterGroupMaps: recomputedExistingFlatViewFilterGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFilterGroupMaps'
            ]
        });
        return (0, _fromflatviewfiltergrouptoviewfiltergroupdtoutil.fromFlatViewFilterGroupToViewFilterGroupDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatViewFilterGroupToCreate.id,
            flatEntityMaps: recomputedExistingFlatViewFilterGroupMaps
        }));
    }
    async updateOne({ id, updateViewFilterGroupInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewFilterGroupMaps: existingFlatViewFilterGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFilterGroupMaps'
            ]
        });
        const optimisticallyUpdatedFlatViewFilterGroup = (0, _fromupdateviewfiltergroupinputtoflatviewfiltergrouptoupdateorthrowutil.fromUpdateViewFilterGroupInputToFlatViewFilterGroupToUpdateOrThrow)({
            flatViewFilterGroupMaps: existingFlatViewFilterGroupMaps,
            updateViewFilterGroupInput: {
                id,
                ...updateViewFilterGroupInput
            }
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFilterGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        optimisticallyUpdatedFlatViewFilterGroup
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating view filter group');
        }
        const { flatViewFilterGroupMaps: recomputedExistingFlatViewFilterGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFilterGroupMaps'
            ]
        });
        return (0, _fromflatviewfiltergrouptoviewfiltergroupdtoutil.fromFlatViewFilterGroupToViewFilterGroupDto)((0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: optimisticallyUpdatedFlatViewFilterGroup.universalIdentifier,
            flatEntityMaps: recomputedExistingFlatViewFilterGroupMaps
        }));
    }
    async deleteOne({ deleteViewFilterGroupInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewFilterGroupMaps: existingFlatViewFilterGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFilterGroupMaps'
            ]
        });
        const optimisticallyUpdatedFlatViewFilterGroupWithDeletedAt = (0, _fromdeleteviewfiltergroupinputtoflatviewfiltergrouporthrowutil.fromDeleteViewFilterGroupInputToFlatViewFilterGroupOrThrow)({
            flatViewFilterGroupMaps: existingFlatViewFilterGroupMaps,
            deleteViewFilterGroupInput
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFilterGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        optimisticallyUpdatedFlatViewFilterGroupWithDeletedAt
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting view filter group');
        }
        const { flatViewFilterGroupMaps: recomputedExistingFlatViewFilterGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFilterGroupMaps'
            ]
        });
        return (0, _fromflatviewfiltergrouptoviewfiltergroupdtoutil.fromFlatViewFilterGroupToViewFilterGroupDto)((0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: optimisticallyUpdatedFlatViewFilterGroupWithDeletedAt.universalIdentifier,
            flatEntityMaps: recomputedExistingFlatViewFilterGroupMaps
        }));
    }
    async destroyOne({ destroyViewFilterGroupInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewFilterGroupMaps: existingFlatViewFilterGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFilterGroupMaps'
            ]
        });
        const existingViewFilterGroupToDelete = (0, _fromdestroyviewfiltergroupinputtoflatviewfiltergrouporthrowutil.fromDestroyViewFilterGroupInputToFlatViewFilterGroupOrThrow)({
            destroyViewFilterGroupInput,
            flatViewFilterGroupMaps: existingFlatViewFilterGroupMaps
        });
        const existingFlatViewFilterGroup = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: existingViewFilterGroupToDelete.universalIdentifier,
            flatEntityMaps: existingFlatViewFilterGroupMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFilterGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        existingViewFilterGroupToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying view filter group');
        }
        return (0, _fromflatviewfiltergrouptoviewfiltergroupdtoutil.fromFlatViewFilterGroupToViewFilterGroupDto)({
            ...existingFlatViewFilterGroup,
            deletedAt: new Date().toISOString()
        });
    }
    async findByWorkspaceId(workspaceId) {
        return this.viewFilterGroupRepository.find({
            where: {
                workspaceId,
                deletedAt: (0, _typeorm1.IsNull)()
            },
            order: {
                positionInViewFilterGroup: 'ASC'
            },
            relations: [
                'workspace',
                'view',
                'viewFilters',
                'parentViewFilterGroup',
                'childViewFilterGroups'
            ]
        });
    }
    async findByViewId(workspaceId, viewId) {
        return this.viewFilterGroupRepository.find({
            where: {
                workspaceId,
                viewId,
                deletedAt: (0, _typeorm1.IsNull)()
            },
            order: {
                positionInViewFilterGroup: 'ASC'
            },
            relations: [
                'workspace',
                'view',
                'viewFilters',
                'parentViewFilterGroup',
                'childViewFilterGroups'
            ]
        });
    }
    async findById(id, workspaceId) {
        const viewFilterGroup = await this.viewFilterGroupRepository.findOne({
            where: {
                id,
                workspaceId,
                deletedAt: (0, _typeorm1.IsNull)()
            },
            relations: [
                'workspace',
                'view',
                'viewFilters',
                'parentViewFilterGroup',
                'childViewFilterGroups'
            ]
        });
        return viewFilterGroup || null;
    }
    constructor(viewFilterGroupRepository, workspaceMigrationValidateBuildAndRunService, flatEntityMapsCacheService, applicationService){
        this.viewFilterGroupRepository = viewFilterGroupRepository;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
ViewFilterGroupService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_viewfiltergroupentity.ViewFilterGroupEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], ViewFilterGroupService);

//# sourceMappingURL=view-filter-group.service.js.map