"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewGroupService", {
    enumerable: true,
    get: function() {
        return ViewGroupService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _fromcreateviewgroupinputtoflatviewgrouptocreateutil = require("../../flat-view-group/utils/from-create-view-group-input-to-flat-view-group-to-create.util");
const _fromdeleteviewgroupinputtoflatviewgrouporthrowutil = require("../../flat-view-group/utils/from-delete-view-group-input-to-flat-view-group-or-throw.util");
const _fromdestroyviewgroupinputtoflatviewgrouporthrowutil = require("../../flat-view-group/utils/from-destroy-view-group-input-to-flat-view-group-or-throw.util");
const _fromupdateviewgroupinputtoflatviewgrouptoupdateorthrowutil = require("../../flat-view-group/utils/from-update-view-group-input-to-flat-view-group-to-update-or-throw.util");
const _viewgroupentity = require("../entities/view-group.entity");
const _viewgroupexception = require("../exceptions/view-group.exception");
const _fromflatviewgrouptoviewgroupdtoutil = require("../utils/from-flat-view-group-to-view-group-dto.util");
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
let ViewGroupService = class ViewGroupService {
    async createOne({ createViewGroupInput, workspaceId }) {
        const [createdViewGroup] = await this.createMany({
            workspaceId,
            createViewGroupInputs: [
                createViewGroupInput
            ]
        });
        if (!(0, _utils.isDefined)(createdViewGroup)) {
            throw new _viewgroupexception.ViewGroupException('Failed to create view group', _viewgroupexception.ViewGroupExceptionCode.INVALID_VIEW_GROUP_DATA);
        }
        return createdViewGroup;
    }
    async createMany({ createViewGroupInputs, workspaceId }) {
        if (createViewGroupInputs.length === 0) {
            return [];
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        const flatViewGroupsToCreate = createViewGroupInputs.map((createViewGroupInput)=>{
            const mainGroupByFieldMetadataId = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: createViewGroupInput.viewId,
                flatEntityMaps: flatViewMaps
            })?.mainGroupByFieldMetadataId;
            if (!(0, _utils.isDefined)(mainGroupByFieldMetadataId)) {
                throw new _viewgroupexception.ViewGroupException('The associated view is not a grouped view: mainGroupByFieldMetadataId is missing.', _viewgroupexception.ViewGroupExceptionCode.MISSING_MAIN_GROUP_BY_FIELD_METADATA_ID);
            }
            return (0, _fromcreateviewgroupinputtoflatviewgrouptocreateutil.fromCreateViewGroupInputToFlatViewGroupToCreate)({
                createViewGroupInput,
                flatApplication: workspaceCustomFlatApplication,
                flatViewMaps
            });
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewGroup: {
                    flatEntityToCreate: flatViewGroupsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating view groups');
        }
        const { flatViewGroupMaps: recomputedExistingFlatViewGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewGroupMaps'
            ]
        });
        return (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityIds: flatViewGroupsToCreate.map((el)=>el.id),
            flatEntityMaps: recomputedExistingFlatViewGroupMaps
        }).map(_fromflatviewgrouptoviewgroupdtoutil.fromFlatViewGroupToViewGroupDto);
    }
    async updateOne({ updateViewGroupInput, workspaceId }) {
        const [updatedViewGroup] = await this.updateMany({
            updateViewGroupInputs: [
                updateViewGroupInput
            ],
            workspaceId
        });
        if (!(0, _utils.isDefined)(updatedViewGroup)) {
            throw new _viewgroupexception.ViewGroupException('Failed to update view group', _viewgroupexception.ViewGroupExceptionCode.INVALID_VIEW_GROUP_DATA);
        }
        return updatedViewGroup;
    }
    async updateMany({ updateViewGroupInputs, workspaceId }) {
        if (updateViewGroupInputs.length === 0) {
            return [];
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewGroupMaps: existingFlatViewGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewGroupMaps'
            ]
        });
        const flatViewGroupsToUpdate = updateViewGroupInputs.map((updateViewGroupInput)=>(0, _fromupdateviewgroupinputtoflatviewgrouptoupdateorthrowutil.fromUpdateViewGroupInputToFlatViewGroupToUpdateOrThrow)({
                flatViewGroupMaps: existingFlatViewGroupMaps,
                updateViewGroupInput
            }));
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: flatViewGroupsToUpdate
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating view groups');
        }
        const { flatViewGroupMaps: recomputedExistingFlatViewGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewGroupMaps'
            ]
        });
        return updateViewGroupInputs.map(({ id })=>(0, _fromflatviewgrouptoviewgroupdtoutil.fromFlatViewGroupToViewGroupDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: id,
                flatEntityMaps: recomputedExistingFlatViewGroupMaps
            })));
    }
    async deleteOne({ deleteViewGroupInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewGroupMaps: existingFlatViewGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewGroupMaps'
            ]
        });
        const optimisticallyUpdatedFlatViewGroupWithDeletedAt = (0, _fromdeleteviewgroupinputtoflatviewgrouporthrowutil.fromDeleteViewGroupInputToFlatViewGroupOrThrow)({
            flatViewGroupMaps: existingFlatViewGroupMaps,
            deleteViewGroupInput
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        optimisticallyUpdatedFlatViewGroupWithDeletedAt
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting view group');
        }
        const { flatViewGroupMaps: recomputedExistingFlatViewGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewGroupMaps'
            ]
        });
        return (0, _fromflatviewgrouptoviewgroupdtoutil.fromFlatViewGroupToViewGroupDto)((0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: optimisticallyUpdatedFlatViewGroupWithDeletedAt.universalIdentifier,
            flatEntityMaps: recomputedExistingFlatViewGroupMaps
        }));
    }
    async destroyOne({ destroyViewGroupInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewGroupMaps: existingFlatViewGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewGroupMaps'
            ]
        });
        const existingViewGroupToDelete = (0, _fromdestroyviewgroupinputtoflatviewgrouporthrowutil.fromDestroyViewGroupInputToFlatViewGroupOrThrow)({
            destroyViewGroupInput,
            flatViewGroupMaps: existingFlatViewGroupMaps
        });
        const existingFlatViewGroup = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: existingViewGroupToDelete.universalIdentifier,
            flatEntityMaps: existingFlatViewGroupMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        existingViewGroupToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying view group');
        }
        return (0, _fromflatviewgrouptoviewgroupdtoutil.fromFlatViewGroupToViewGroupDto)({
            ...existingFlatViewGroup,
            deletedAt: new Date().toISOString()
        });
    }
    async findByWorkspaceId(workspaceId) {
        return this.viewGroupRepository.find({
            where: {
                workspaceId,
                deletedAt: (0, _typeorm1.IsNull)()
            },
            order: {
                position: 'ASC'
            },
            relations: [
                'workspace',
                'view'
            ]
        });
    }
    async findByViewId(workspaceId, viewId) {
        return this.viewGroupRepository.find({
            where: {
                workspaceId,
                viewId,
                deletedAt: (0, _typeorm1.IsNull)()
            },
            order: {
                position: 'ASC'
            },
            relations: [
                'workspace',
                'view'
            ]
        });
    }
    async findById(id, workspaceId) {
        const viewGroup = await this.viewGroupRepository.findOne({
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
        return viewGroup || null;
    }
    constructor(viewGroupRepository, workspaceMigrationValidateBuildAndRunService, flatEntityMapsCacheService, applicationService){
        this.viewGroupRepository = viewGroupRepository;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
ViewGroupService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_viewgroupentity.ViewGroupEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], ViewGroupService);

//# sourceMappingURL=view-group.service.js.map