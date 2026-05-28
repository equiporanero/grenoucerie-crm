"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFieldService", {
    enumerable: true,
    get: function() {
        return ViewFieldService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _fromcreateviewfieldinputtoflatviewfieldtocreateutil = require("../../flat-view-field/utils/from-create-view-field-input-to-flat-view-field-to-create.util");
const _fromdeleteviewfieldinputtoflatviewfieldorthrowutil = require("../../flat-view-field/utils/from-delete-view-field-input-to-flat-view-field-or-throw.util");
const _fromdestroyviewfieldinputtoflatviewfieldorthrowutil = require("../../flat-view-field/utils/from-destroy-view-field-input-to-flat-view-field-or-throw.util");
const _fromupdateviewfieldinputtoflatviewfieldtoupdateorthrowutil = require("../../flat-view-field/utils/from-update-view-field-input-to-flat-view-field-to-update-or-throw.util");
const _viewfieldexception = require("../exceptions/view-field.exception");
const _fromflatviewfieldtoviewfielddtoutil = require("../utils/from-flat-view-field-to-view-field-dto.util");
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
let ViewFieldService = class ViewFieldService {
    async createOne({ createViewFieldInput, workspaceId }) {
        const [createdViewField] = await this.createMany({
            workspaceId,
            createViewFieldInputs: [
                createViewFieldInput
            ]
        });
        if (!(0, _utils.isDefined)(createdViewField)) {
            throw new _viewfieldexception.ViewFieldException('Failed to create view field', _viewfieldexception.ViewFieldExceptionCode.INVALID_VIEW_FIELD_DATA);
        }
        return createdViewField;
    }
    async createMany({ createViewFieldInputs, workspaceId }) {
        if (createViewFieldInputs.length === 0) {
            return [];
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatFieldMetadataMaps, flatViewMaps, flatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps',
                'flatViewMaps',
                'flatViewFieldGroupMaps'
            ]
        });
        const flatViewFieldsToCreate = createViewFieldInputs.map((createViewFieldInput)=>(0, _fromcreateviewfieldinputtoflatviewfieldtocreateutil.fromCreateViewFieldInputToFlatViewFieldToCreate)({
                createViewFieldInput,
                flatApplication: workspaceCustomFlatApplication,
                flatFieldMetadataMaps,
                flatViewMaps,
                flatViewFieldGroupMaps
            }));
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewField: {
                    flatEntityToCreate: flatViewFieldsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating view fields');
        }
        const { flatViewFieldMaps: recomputedExistingFlatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps'
            ]
        });
        return (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityIds: flatViewFieldsToCreate.map((el)=>el.id),
            flatEntityMaps: recomputedExistingFlatViewFieldMaps
        }).map(_fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto);
    }
    async updateOne({ updateViewFieldInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewFieldMaps: existingFlatViewFieldMaps, flatViewFieldGroupMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps',
                'flatViewFieldGroupMaps'
            ]
        });
        const optimisticallyUpdatedFlatView = (0, _fromupdateviewfieldinputtoflatviewfieldtoupdateorthrowutil.fromUpdateViewFieldInputToFlatViewFieldToUpdateOrThrow)({
            flatViewFieldMaps: existingFlatViewFieldMaps,
            flatViewFieldGroupMaps,
            updateViewFieldInput,
            callerApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            workspaceCustomApplicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewField: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        optimisticallyUpdatedFlatView
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating view field');
        }
        const { flatViewFieldMaps: recomputedExistingFlatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps'
            ]
        });
        return (0, _fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto)((0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: optimisticallyUpdatedFlatView.universalIdentifier,
            flatEntityMaps: recomputedExistingFlatViewFieldMaps
        }));
    }
    async deleteOne({ deleteViewFieldInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewFieldMaps: existingFlatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps'
            ]
        });
        const optimisticallyUpdatedFlatViewWithDeletedAt = (0, _fromdeleteviewfieldinputtoflatviewfieldorthrowutil.fromDeleteViewFieldInputToFlatViewFieldOrThrow)({
            flatViewFieldMaps: existingFlatViewFieldMaps,
            deleteViewFieldInput
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewField: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        optimisticallyUpdatedFlatViewWithDeletedAt
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting view field');
        }
        const { flatViewFieldMaps: recomputedExistingFlatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps'
            ]
        });
        return (0, _fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto)((0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: optimisticallyUpdatedFlatViewWithDeletedAt.universalIdentifier,
            flatEntityMaps: recomputedExistingFlatViewFieldMaps
        }));
    }
    async destroyOne({ destroyViewFieldInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewFieldMaps: existingFlatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps'
            ]
        });
        const existingViewFieldToDelete = (0, _fromdestroyviewfieldinputtoflatviewfieldorthrowutil.fromDestroyViewFieldInputToFlatViewFieldOrThrow)({
            destroyViewFieldInput,
            flatViewFieldMaps: existingFlatViewFieldMaps
        });
        const existingFlatViewField = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: existingViewFieldToDelete.universalIdentifier,
            flatEntityMaps: existingFlatViewFieldMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewField: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        existingViewFieldToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting view field');
        }
        return (0, _fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto)({
            ...existingFlatViewField,
            deletedAt: new Date().toISOString()
        });
    }
    async findByWorkspaceId(workspaceId) {
        const { flatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps'
            ]
        });
        return Object.values(flatViewFieldMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((field)=>!(0, _utils.isDefined)(field.deletedAt)).map(_fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto).sort((a, b)=>a.position - b.position);
    }
    async findByViewId(workspaceId, viewId) {
        const { flatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps'
            ]
        });
        return Object.values(flatViewFieldMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((field)=>field.viewId === viewId && !(0, _utils.isDefined)(field.deletedAt)).map(_fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto).sort((a, b)=>a.position - b.position);
    }
    async findById(id, workspaceId) {
        const { flatViewFieldMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps'
            ]
        });
        const flatViewField = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatViewFieldMaps
        });
        if (!(0, _utils.isDefined)(flatViewField) || (0, _utils.isDefined)(flatViewField.deletedAt)) {
            return null;
        }
        return (0, _fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto)(flatViewField);
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
ViewFieldService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], ViewFieldService);

//# sourceMappingURL=view-field.service.js.map