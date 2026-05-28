"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewService", {
    enumerable: true,
    get: function() {
        return ViewService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _translations = require("twenty-shared/translations");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _applicationservice = require("../../../core-modules/application/application.service");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _generateMessageId = require("../../../core-modules/i18n/utils/generateMessageId");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreateviewinputtoflatviewtocreateutil = require("../../flat-view/utils/from-create-view-input-to-flat-view-to-create.util");
const _fromdeleteviewinputtoflatvieworthrowutil = require("../../flat-view/utils/from-delete-view-input-to-flat-view-or-throw.util");
const _fromdestroyviewinputtoflatvieworthrowutil = require("../../flat-view/utils/from-destroy-view-input-to-flat-view-or-throw.util");
const _fromupdateviewinputtoflatviewtoupdateorthrowutil = require("../../flat-view/utils/from-update-view-input-to-flat-view-to-update-or-throw.util");
const _fromflatviewfieldgrouptoviewfieldgroupdtoutil = require("../../view-field-group/utils/from-flat-view-field-group-to-view-field-group-dto.util");
const _fromflatviewfieldtoviewfielddtoutil = require("../../view-field/utils/from-flat-view-field-to-view-field-dto.util");
const _fromflatviewfiltergrouptoviewfiltergroupdtoutil = require("../../view-filter-group/utils/from-flat-view-filter-group-to-view-filter-group-dto.util");
const _fromflatviewfiltertoviewfilterdtoutil = require("../../view-filter/utils/from-flat-view-filter-to-view-filter-dto.util");
const _fromflatviewgrouptoviewgroupdtoutil = require("../../view-group/utils/from-flat-view-group-to-view-group-dto.util");
const _fromflatviewsorttoviewsortdtoutil = require("../../view-sort/utils/from-flat-view-sort-to-view-sort-dto.util");
const _viewentity = require("../entities/view.entity");
const _fromflatviewtoviewdtoutil = require("../utils/from-flat-view-to-view-dto.util");
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
let ViewService = class ViewService {
    async createOne({ createViewInput, workspaceId, createdByUserWorkspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatObjectMetadataMaps: existingFlatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps',
                'flatObjectMetadataMaps'
            ]
        });
        const { flatViewToCreate, flatViewGroupsToCreate } = (0, _fromcreateviewinputtoflatviewtocreateutil.fromCreateViewInputToFlatViewToCreate)({
            createViewInput,
            createdByUserWorkspaceId,
            flatApplication: workspaceCustomFlatApplication,
            flatFieldMetadataMaps: existingFlatFieldMetadataMaps,
            flatObjectMetadataMaps: existingFlatObjectMetadataMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                view: {
                    flatEntityToCreate: [
                        flatViewToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                },
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
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating view');
        }
        const { flatViewMaps: recomputedExistingFlatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        return (0, _fromflatviewtoviewdtoutil.fromFlatViewToViewDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatViewToCreate.id,
            flatEntityMaps: recomputedExistingFlatViewMaps
        }));
    }
    async updateOne({ updateViewInput, workspaceId, userWorkspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewMaps: existingFlatViewMaps, flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatViewGroupMaps: existingFlatViewGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps',
                'flatFieldMetadataMaps',
                'flatViewGroupMaps'
            ]
        });
        const { flatViewToUpdate, flatViewGroupsToDelete, flatViewGroupsToCreate } = (0, _fromupdateviewinputtoflatviewtoupdateorthrowutil.fromUpdateViewInputToFlatViewToUpdateOrThrow)({
            updateViewInput,
            flatViewMaps: existingFlatViewMaps,
            flatViewGroupMaps: existingFlatViewGroupMaps,
            flatFieldMetadataMaps: existingFlatFieldMetadataMaps,
            userWorkspaceId
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                view: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatViewToUpdate
                    ]
                },
                viewGroup: {
                    flatEntityToCreate: flatViewGroupsToCreate,
                    flatEntityToDelete: flatViewGroupsToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating view');
        }
        const { flatViewMaps: recomputedExistingFlatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        return (0, _fromflatviewtoviewdtoutil.fromFlatViewToViewDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: updateViewInput.id,
            flatEntityMaps: recomputedExistingFlatViewMaps
        }));
    }
    async deleteOne({ deleteViewInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewMaps: existingFlatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        const optimisticallyUpdatedFlatViewWithDeletedAt = (0, _fromdeleteviewinputtoflatvieworthrowutil.fromDeleteViewInputToFlatViewOrThrow)({
            deleteViewInput,
            flatViewMaps: existingFlatViewMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                view: {
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
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while deleting view');
        }
        const { flatViewMaps: recomputedExistingFlatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        return (0, _fromflatviewtoviewdtoutil.fromFlatViewToViewDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: deleteViewInput.id,
            flatEntityMaps: recomputedExistingFlatViewMaps
        }));
    }
    async destroyOne({ destroyViewInput, workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatViewMaps: existingFlatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        const flatViewFromDestroyInput = (0, _fromdestroyviewinputtoflatvieworthrowutil.fromDestroyViewInputToFlatViewOrThrow)({
            destroyViewInput,
            flatViewMaps: existingFlatViewMaps
        });
        const existingFlatView = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            universalIdentifier: flatViewFromDestroyInput.universalIdentifier,
            flatEntityMaps: existingFlatViewMaps
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                view: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        flatViewFromDestroyInput
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while destroying view');
        }
        return (0, _fromflatviewtoviewdtoutil.fromFlatViewToViewDto)({
            ...existingFlatView,
            deletedAt: new Date().toISOString()
        });
    }
    processViewNameWithTemplate(viewName, isCustom, objectLabelPlural, locale) {
        if (viewName.includes('{objectLabelPlural}') && objectLabelPlural) {
            const messageId = (0, _generateMessageId.generateMessageId)(viewName);
            const translatedTemplate = this.i18nService.translateMessage({
                messageId,
                values: {
                    objectLabelPlural
                },
                locale: locale ?? _translations.SOURCE_LOCALE
            });
            if (translatedTemplate !== messageId) {
                return translatedTemplate;
            }
            return viewName.replace('{objectLabelPlural}', objectLabelPlural);
        }
        if (!isCustom) {
            const messageId = (0, _generateMessageId.generateMessageId)(viewName);
            const translatedMessage = this.i18nService.translateMessage({
                messageId,
                locale: locale ?? _translations.SOURCE_LOCALE
            });
            if (translatedMessage !== messageId) {
                return translatedMessage;
            }
        }
        return viewName;
    }
    isViewVisibleToUser(view, userWorkspaceId) {
        if (view.visibility === _types.ViewVisibility.WORKSPACE) {
            return true;
        }
        return view.visibility === _types.ViewVisibility.UNLISTED && (0, _utils.isDefined)(userWorkspaceId) && view.createdByUserWorkspaceId === userWorkspaceId;
    }
    async getFilteredFlatViews({ workspaceId, objectMetadataId, userWorkspaceId, viewTypes }) {
        const { flatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        return Object.values(flatViewMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((flatView)=>flatView.workspaceId === workspaceId).filter((flatView)=>!objectMetadataId || flatView.objectMetadataId === objectMetadataId).filter((flatView)=>flatView.deletedAt === null).filter((flatView)=>!viewTypes || viewTypes.length === 0 || viewTypes.includes(flatView.type)).filter((flatView)=>this.isViewVisibleToUser(flatView, userWorkspaceId)).sort((a, b)=>a.position - b.position);
    }
    async findByWorkspaceId(workspaceId, userWorkspaceId, viewTypes) {
        const flatViews = await this.getFilteredFlatViews({
            workspaceId,
            userWorkspaceId,
            viewTypes
        });
        return flatViews.map(_fromflatviewtoviewdtoutil.fromFlatViewToViewDto);
    }
    async findByObjectMetadataId(workspaceId, objectMetadataId, userWorkspaceId, viewTypes) {
        const flatViews = await this.getFilteredFlatViews({
            workspaceId,
            objectMetadataId,
            userWorkspaceId,
            viewTypes
        });
        return flatViews.map(_fromflatviewtoviewdtoutil.fromFlatViewToViewDto);
    }
    async findById(id, workspaceId) {
        const { flatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(flatView) || flatView.deletedAt !== null) {
            return null;
        }
        return (0, _fromflatviewtoviewdtoutil.fromFlatViewToViewDto)(flatView);
    }
    async findManyWithRelationsFromCache(flatViews, workspaceId) {
        const { flatViewFieldMaps, flatViewFieldGroupMaps, flatViewFilterMaps, flatViewFilterGroupMaps, flatViewSortMaps, flatViewGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewFieldMaps',
                'flatViewFieldGroupMaps',
                'flatViewFilterMaps',
                'flatViewFilterGroupMaps',
                'flatViewSortMaps',
                'flatViewGroupMaps'
            ]
        });
        return flatViews.map((flatView)=>{
            const viewDto = (0, _fromflatviewtoviewdtoutil.fromFlatViewToViewDto)(flatView);
            viewDto.viewFields = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                flatEntityIds: flatView.viewFieldIds,
                flatEntityMaps: flatViewFieldMaps
            }).filter((flatEntity)=>flatEntity.deletedAt === null).map(_fromflatviewfieldtoviewfielddtoutil.fromFlatViewFieldToViewFieldDto);
            viewDto.viewFieldGroups = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                flatEntityIds: flatView.viewFieldGroupIds,
                flatEntityMaps: flatViewFieldGroupMaps
            }).filter((flatEntity)=>flatEntity.deletedAt === null).map(_fromflatviewfieldgrouptoviewfieldgroupdtoutil.fromFlatViewFieldGroupToViewFieldGroupDto);
            viewDto.viewFilters = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                flatEntityIds: flatView.viewFilterIds,
                flatEntityMaps: flatViewFilterMaps
            }).filter((flatEntity)=>flatEntity.deletedAt === null).map(_fromflatviewfiltertoviewfilterdtoutil.fromFlatViewFilterToViewFilterDto);
            viewDto.viewFilterGroups = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                flatEntityIds: flatView.viewFilterGroupIds,
                flatEntityMaps: flatViewFilterGroupMaps
            }).filter((flatEntity)=>flatEntity.deletedAt === null).map(_fromflatviewfiltergrouptoviewfiltergroupdtoutil.fromFlatViewFilterGroupToViewFilterGroupDto);
            viewDto.viewSorts = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                flatEntityIds: flatView.viewSortIds,
                flatEntityMaps: flatViewSortMaps
            }).filter((flatEntity)=>flatEntity.deletedAt === null).map(_fromflatviewsorttoviewsortdtoutil.fromFlatViewSortToViewSortDto);
            viewDto.viewGroups = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
                flatEntityIds: flatView.viewGroupIds,
                flatEntityMaps: flatViewGroupMaps
            }).filter((flatEntity)=>flatEntity.deletedAt === null).map(_fromflatviewgrouptoviewgroupdtoutil.fromFlatViewGroupToViewGroupDto);
            return viewDto;
        });
    }
    async findByWorkspaceIdWithRelations(workspaceId, userWorkspaceId, viewTypes) {
        const flatViews = await this.getFilteredFlatViews({
            workspaceId,
            userWorkspaceId,
            viewTypes
        });
        return this.findManyWithRelationsFromCache(flatViews, workspaceId);
    }
    async findByObjectMetadataIdWithRelations(workspaceId, objectMetadataId, userWorkspaceId, viewTypes) {
        const flatViews = await this.getFilteredFlatViews({
            workspaceId,
            objectMetadataId,
            userWorkspaceId,
            viewTypes
        });
        return this.findManyWithRelationsFromCache(flatViews, workspaceId);
    }
    async findByIdWithRelations(id, workspaceId) {
        const { flatViewMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatViewMaps'
            ]
        });
        const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(flatView) || flatView.deletedAt !== null) {
            return null;
        }
        const results = await this.findManyWithRelationsFromCache([
            flatView
        ], workspaceId);
        return results[0] ?? null;
    }
    async findByIdIncludingDeleted(id, workspaceId) {
        const view = await this.viewRepository.findOne({
            where: {
                id,
                workspaceId
            },
            relations: [
                'workspace',
                'viewFields',
                'viewFilters',
                'viewSorts',
                'viewGroups',
                'viewFilterGroups'
            ],
            withDeleted: true
        });
        return view || null;
    }
    constructor(viewRepository, workspaceMigrationValidateBuildAndRunService, flatEntityMapsCacheService, applicationService, i18nService){
        this.viewRepository = viewRepository;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.i18nService = i18nService;
    }
};
ViewService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService
    ])
], ViewService);

//# sourceMappingURL=view.service.js.map