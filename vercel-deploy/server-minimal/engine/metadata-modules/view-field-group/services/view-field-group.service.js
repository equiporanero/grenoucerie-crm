"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldGroupService", {
    enumerable: true,
    get: function() {
        return ViewFieldGroupService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _fromcreateviewfieldgroupinputtoflatviewfieldgrouptocreateutil = require("../../flat-view-field-group/utils/from-create-view-field-group-input-to-flat-view-field-group-to-create.util");
const _fromdeleteviewfieldgroupinputtoflatviewfieldgrouporthrowutil = require("../../flat-view-field-group/utils/from-delete-view-field-group-input-to-flat-view-field-group-or-throw.util");
const _fromdestroyviewfieldgroupinputtoflatviewfieldgrouporthrowutil = require("../../flat-view-field-group/utils/from-destroy-view-field-group-input-to-flat-view-field-group-or-throw.util");
const _fromupdateviewfieldgroupinputtoflatviewfieldgrouptoupdateorthrowutil = require("../../flat-view-field-group/utils/from-update-view-field-group-input-to-flat-view-field-group-to-update-or-throw.util");
const _viewfieldgroupexception = require("../exceptions/view-field-group.exception");
const _fromflatviewfieldgrouptoviewfieldgroupdtoutil = require("../utils/from-flat-view-field-group-to-view-field-group-dto.util");
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
let ViewFieldGroupService = class ViewFieldGroupService {
    async createOne({ createViewFieldGroupInput, workspaceId }) {
        const [createdViewFieldGroup] = await this.createMany({
            workspaceId,
            createViewFieldGroupInputs: [
                createViewFieldGroupInput
            ]
        });
        if (!(0, _utils.isDefined)(createdViewFieldGroup)) {
            throw new _viewfieldgroupexception.ViewFieldGroupException('Failed to create view field group', _viewfieldgroupexception.ViewFieldGroupExceptionCode.INVALID_VIEW_FIELD_GROUP_DATA);
        }
        return createdViewFieldGroup;
    }
    async createMany({ createViewFieldGroupInputs, workspaceId }) {
        if (createViewFieldGroupInputs.length === 0) {
            return [];
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        const flatViewFieldGroupsToCreate = createViewFieldGroupInputs.map((createViewFieldGroupInput)=>(0, _fromcreateviewfieldgroupinputtoflatviewfieldgrouptocreateutil.fromCreateViewFieldGroupInputToFlatViewFieldGroupToCreate)({
                createViewFieldGroupInput,
                flatApplication: workspaceCustomFlatApplication,
                flatViewMaps
            }));
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFieldGroup: {
                    flatEntityToCreate: flatViewFieldGroupsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating view field groups');
        }
        const { flatViewFieldGroupMaps: recomputedExistingFlatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldGroupMaps'
            ]
        });
        return (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityIds: flatViewFieldGroupsToCreate.map((entity)=>entity.id),
            flatEntityMaps: recomputedExistingFlatViewFieldGroupMaps
        }).map(_fromflatviewfieldgrouptoviewfieldgroupdtoutil.fromFlatViewFieldGroupToViewFieldGroupDto);
    }
    async updateOne({ updateViewFieldGroupInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldGroupMaps'
            ]
        });
        const optimisticallyUpdatedFlatViewFieldGroup = (0, _fromupdateviewfieldgroupinputtoflatviewfieldgrouptoupdateorthrowutil.fromUpdateViewFieldGroupInputToFlatViewFieldGroupToUpdateOrThrow)({
            flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps,
            updateViewFieldGroupInput,
            callerApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFieldGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        optimisticallyUpdatedFlatViewFieldGroup
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating view field group');
        }
        const { flatViewFieldGroupMaps: recomputedExistingFlatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldGroupMaps'
            ]
        });
        return (0, _fromflatviewfieldgrouptoviewfieldgroupdtoutil.fromFlatViewFieldGroupToViewFieldGroupDto)((0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: optimisticallyUpdatedFlatViewFieldGroup.universalIdentifier,
            flatEntityMaps: recomputedExistingFlatViewFieldGroupMaps
        }));
    }
    async deleteOne({ deleteViewFieldGroupInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldGroupMaps'
            ]
        });
        const optimisticallyUpdatedFlatViewFieldGroupWithDeletedAt = (0, _fromdeleteviewfieldgroupinputtoflatviewfieldgrouporthrowutil.fromDeleteViewFieldGroupInputToFlatViewFieldGroupOrThrow)({
            flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps,
            deleteViewFieldGroupInput
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFieldGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        optimisticallyUpdatedFlatViewFieldGroupWithDeletedAt
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting view field group');
        }
        const { flatViewFieldGroupMaps: recomputedExistingFlatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldGroupMaps'
            ]
        });
        return (0, _fromflatviewfieldgrouptoviewfieldgroupdtoutil.fromFlatViewFieldGroupToViewFieldGroupDto)((0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: optimisticallyUpdatedFlatViewFieldGroupWithDeletedAt.universalIdentifier,
            flatEntityMaps: recomputedExistingFlatViewFieldGroupMaps
        }));
    }
    async destroyOne({ destroyViewFieldGroupInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldGroupMaps'
            ]
        });
        const existingViewFieldGroupToDelete = (0, _fromdestroyviewfieldgroupinputtoflatviewfieldgrouporthrowutil.fromDestroyViewFieldGroupInputToFlatViewFieldGroupOrThrow)({
            destroyViewFieldGroupInput,
            flatViewFieldGroupMaps: existingFlatViewFieldGroupMaps
        });
        const existingFlatViewFieldGroup = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: existingViewFieldGroupToDelete.universalIdentifier,
            flatEntityMaps: existingFlatViewFieldGroupMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFieldGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        existingViewFieldGroupToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying view field group');
        }
        return (0, _fromflatviewfieldgrouptoviewfieldgroupdtoutil.fromFlatViewFieldGroupToViewFieldGroupDto)({
            ...existingFlatViewFieldGroup,
            deletedAt: new Date().toISOString()
        });
    }
    async findByViewId(workspaceId, viewId) {
        const { flatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldGroupMaps'
            ]
        });
        return Object.values(flatViewFieldGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((group)=>group.viewId === viewId && !(0, _utils.isDefined)(group.deletedAt)).map(_fromflatviewfieldgrouptoviewfieldgroupdtoutil.fromFlatViewFieldGroupToViewFieldGroupDto).sort((a, b)=>a.position - b.position);
    }
    async findById(id, workspaceId) {
        const { flatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldGroupMaps'
            ]
        });
        const flatViewFieldGroup = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatViewFieldGroupMaps
        });
        if (!(0, _utils.isDefined)(flatViewFieldGroup) || (0, _utils.isDefined)(flatViewFieldGroup.deletedAt)) {
            return null;
        }
        return (0, _fromflatviewfieldgrouptoviewfieldgroupdtoutil.fromFlatViewFieldGroupToViewFieldGroupDto)(flatViewFieldGroup);
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
ViewFieldGroupService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], ViewFieldGroupService);

//# sourceMappingURL=view-field-group.service.js.map