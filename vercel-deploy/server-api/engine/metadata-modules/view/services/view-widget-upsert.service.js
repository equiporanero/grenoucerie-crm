"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewWidgetUpsertService", {
    enumerable: true,
    get: function() {
        return ViewWidgetUpsertService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _core = require("@lingui/core");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _addflatentitytoflatentitymapsorthrowutil = require("../../flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveentityrelationuniversalidentifiersutil = require("../../flat-entity/utils/resolve-entity-relation-universal-identifiers.util");
const _splitentitiesbyremovalstrategyutil = require("../../flat-entity/utils/split-entities-by-removal-strategy.util");
const _isflatpagelayoutwidgetconfigurationoftypeutil = require("../../flat-page-layout-widget/utils/is-flat-page-layout-widget-configuration-of-type.util");
const _fielddisplaymodeenum = require("../../page-layout-widget/enums/field-display-mode.enum");
const _defaultviewfieldsizeconstant = require("../../flat-view-field/constants/default-view-field-size.constant");
const _fromviewfieldoverridestouniversaloverridesutil = require("../../flat-view-field/utils/from-view-field-overrides-to-universal-overrides.util");
const _getdefaultviewfilteroperandutil = require("../../flat-view-filter/utils/get-default-view-filter-operand.util");
const _widgetconfigurationtypetype = require("../../page-layout-widget/enums/widget-configuration-type.type");
const _iscalleroverridingentityutil = require("../../utils/is-caller-overriding-entity.util");
const _sanitizeoverridableentityinpututil = require("../../utils/sanitize-overridable-entity-input.util");
const _viewentity = require("../entities/view.entity");
const _viewexception = require("../exceptions/view.exception");
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
const EMPTY_FIELD_OPS = {
    fieldsToCreate: [],
    fieldsToUpdate: []
};
const EMPTY_FILTER_GROUP_OPS = {
    filterGroupsToCreate: [],
    filterGroupsToUpdate: [],
    filterGroupsToRemove: []
};
const EMPTY_FILTER_OPS = {
    filtersToCreate: [],
    filtersToUpdate: [],
    filtersToRemove: []
};
const EMPTY_SORT_OPS = {
    sortsToCreate: [],
    sortsToUpdate: [],
    sortsToRemove: []
};
let ViewWidgetUpsertService = class ViewWidgetUpsertService {
    async upsertViewWidget({ input, workspaceId }) {
        const { widgetId } = input;
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPageLayoutWidgetMaps, flatFieldMetadataMaps, flatViewFieldMaps, flatViewFilterMaps, flatViewFilterGroupMaps, flatViewSortMaps, flatViewMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutWidgetMaps',
                'flatFieldMetadataMaps',
                'flatViewFieldMaps',
                'flatViewFilterMaps',
                'flatViewFilterGroupMaps',
                'flatViewSortMaps',
                'flatViewMaps'
            ]
        });
        const widget = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: widgetId,
            flatEntityMaps: flatPageLayoutWidgetMaps
        });
        if (!(0, _utils.isDefined)(widget)) {
            throw new _viewexception.ViewException(_core.i18n._(/*i18n*/ {
                id: "KnnILY",
                message: "Record table widget not found"
            }), _viewexception.ViewExceptionCode.VIEW_WIDGET_NOT_FOUND);
        }
        const isRecordTableWidget = (0, _isflatpagelayoutwidgetconfigurationoftypeutil.isFlatPageLayoutWidgetConfigurationOfType)(widget, _widgetconfigurationtypetype.WidgetConfigurationType.RECORD_TABLE);
        const isFieldTableWidget = (0, _isflatpagelayoutwidgetconfigurationoftypeutil.isFlatPageLayoutWidgetConfigurationOfType)(widget, _widgetconfigurationtypetype.WidgetConfigurationType.FIELD) && widget.configuration.fieldDisplayMode === _fielddisplaymodeenum.FieldDisplayMode.TABLE;
        if (!isRecordTableWidget && !isFieldTableWidget) {
            throw new _viewexception.ViewException(_core.i18n._(/*i18n*/ {
                id: "KnnILY",
                message: "Record table widget not found"
            }), _viewexception.ViewExceptionCode.VIEW_WIDGET_NOT_FOUND);
        }
        const viewId = 'viewId' in widget.configuration ? widget.configuration.viewId : undefined;
        if (!(0, _utils.isDefined)(viewId)) {
            throw new _viewexception.ViewException(_core.i18n._(/*i18n*/ {
                id: "LVUF8D",
                message: "Record table widget has no associated view"
            }), _viewexception.ViewExceptionCode.VIEW_WIDGET_NOT_FOUND);
        }
        const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: viewId,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(flatView)) {
            throw new _viewexception.ViewException(_core.i18n._(/*i18n*/ {
                id: "RAcTQ1",
                message: "View not found for widget"
            }), _viewexception.ViewExceptionCode.VIEW_NOT_FOUND);
        }
        const upsertContext = {
            viewId,
            workspaceId,
            applicationId: workspaceCustomFlatApplication.id,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
            now: new Date().toISOString()
        };
        if (!(0, _utils.isDefined)(input.viewFields) && !(0, _utils.isDefined)(input.viewFilterGroups) && !(0, _utils.isDefined)(input.viewFilters) && !(0, _utils.isDefined)(input.viewSorts)) {
            const view = await this.viewRepository.findOne({
                where: {
                    id: upsertContext.viewId,
                    workspaceId: upsertContext.workspaceId,
                    deletedAt: (0, _typeorm1.IsNull)()
                }
            });
            if (!(0, _utils.isDefined)(view)) {
                throw new _viewexception.ViewException(_core.i18n._(/*i18n*/ {
                    id: "F4A9mL",
                    message: "View not found"
                }), _viewexception.ViewExceptionCode.VIEW_NOT_FOUND);
            }
            return view;
        }
        const existingViewFields = Object.values(flatViewFieldMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((field)=>field.isActive && field.viewId === viewId);
        const existingViewFilters = Object.values(flatViewFilterMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((filter)=>filter.viewId === viewId);
        const existingViewFilterGroups = Object.values(flatViewFilterGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((group)=>group.viewId === viewId);
        const existingViewSorts = Object.values(flatViewSortMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((sort)=>sort.viewId === viewId);
        const viewFieldOperations = (0, _utils.isDefined)(input.viewFields) ? this.computeViewFieldOperations({
            inputFields: input.viewFields,
            existingViewFields,
            ...upsertContext,
            flatFieldMetadataMaps,
            flatViewMaps
        }) : EMPTY_FIELD_OPS;
        const viewFilterGroupOperations = (0, _utils.isDefined)(input.viewFilterGroups) ? this.computeViewFilterGroupOperations({
            inputFilterGroups: input.viewFilterGroups,
            existingViewFilterGroups,
            ...upsertContext,
            flatViewMaps,
            flatViewFilterGroupMaps
        }) : EMPTY_FILTER_GROUP_OPS;
        const optimisticFilterGroupMaps = viewFilterGroupOperations.filterGroupsToCreate.reduce((maps, group)=>(0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: group,
                flatEntityMaps: maps
            }), flatViewFilterGroupMaps);
        const viewFilterOperations = (0, _utils.isDefined)(input.viewFilters) ? this.computeViewFilterOperations({
            inputFilters: input.viewFilters,
            existingViewFilters,
            ...upsertContext,
            flatFieldMetadataMaps,
            flatViewMaps,
            flatViewFilterGroupMaps: optimisticFilterGroupMaps
        }) : EMPTY_FILTER_OPS;
        const viewSortOperations = (0, _utils.isDefined)(input.viewSorts) ? this.computeViewSortOperations({
            inputSorts: input.viewSorts,
            existingViewSorts,
            ...upsertContext,
            flatFieldMetadataMaps,
            flatViewMaps
        }) : EMPTY_SORT_OPS;
        const { toHardDelete: filterGroupsToDelete, toDeactivate: filterGroupsToDeactivate } = (0, _splitentitiesbyremovalstrategyutil.splitEntitiesByRemovalStrategy)({
            entitiesToRemove: viewFilterGroupOperations.filterGroupsToRemove,
            workspaceCustomApplicationUniversalIdentifier: upsertContext.applicationUniversalIdentifier,
            now: upsertContext.now
        });
        const { toHardDelete: filtersToDelete, toDeactivate: filtersToDeactivate } = (0, _splitentitiesbyremovalstrategyutil.splitEntitiesByRemovalStrategy)({
            entitiesToRemove: viewFilterOperations.filtersToRemove,
            workspaceCustomApplicationUniversalIdentifier: upsertContext.applicationUniversalIdentifier,
            now: upsertContext.now
        });
        const { toHardDelete: sortsToDelete, toDeactivate: sortsToDeactivate } = (0, _splitentitiesbyremovalstrategyutil.splitEntitiesByRemovalStrategy)({
            entitiesToRemove: viewSortOperations.sortsToRemove,
            workspaceCustomApplicationUniversalIdentifier: upsertContext.applicationUniversalIdentifier,
            now: upsertContext.now
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewField: {
                    flatEntityToCreate: viewFieldOperations.fieldsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: viewFieldOperations.fieldsToUpdate
                },
                viewFilterGroup: {
                    flatEntityToCreate: viewFilterGroupOperations.filterGroupsToCreate,
                    flatEntityToDelete: filterGroupsToDelete,
                    flatEntityToUpdate: [
                        ...viewFilterGroupOperations.filterGroupsToUpdate,
                        ...filterGroupsToDeactivate
                    ]
                },
                viewFilter: {
                    flatEntityToCreate: viewFilterOperations.filtersToCreate,
                    flatEntityToDelete: filtersToDelete,
                    flatEntityToUpdate: [
                        ...viewFilterOperations.filtersToUpdate,
                        ...filtersToDeactivate
                    ]
                },
                viewSort: {
                    flatEntityToCreate: viewSortOperations.sortsToCreate,
                    flatEntityToDelete: sortsToDelete,
                    flatEntityToUpdate: [
                        ...viewSortOperations.sortsToUpdate,
                        ...sortsToDeactivate
                    ]
                }
            },
            workspaceId: upsertContext.workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: upsertContext.applicationUniversalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while upserting view widget');
        }
        const view = await this.viewRepository.findOne({
            where: {
                id: upsertContext.viewId,
                workspaceId: upsertContext.workspaceId,
                deletedAt: (0, _typeorm1.IsNull)()
            }
        });
        if (!(0, _utils.isDefined)(view)) {
            throw new _viewexception.ViewException(_core.i18n._(/*i18n*/ {
                id: "BHDATQ",
                message: "View not found after upsert"
            }), _viewexception.ViewExceptionCode.VIEW_NOT_FOUND);
        }
        return view;
    }
    computeViewFieldOperations({ inputFields, existingViewFields, viewId, workspaceId, applicationId, applicationUniversalIdentifier, now, flatFieldMetadataMaps, flatViewMaps }) {
        const fieldsToCreate = [];
        const fieldsToUpdate = [];
        for (const inputField of inputFields){
            const existingFieldByViewFieldId = (0, _utils.isDefined)(inputField.viewFieldId) ? existingViewFields.find((f)=>f.id === inputField.viewFieldId) : undefined;
            const existingFieldByFieldMetadataId = (0, _utils.isDefined)(inputField.fieldMetadataId) ? existingViewFields.find((f)=>f.fieldMetadataId === inputField.fieldMetadataId) : undefined;
            const existingField = existingFieldByViewFieldId ?? existingFieldByFieldMetadataId;
            if ((0, _utils.isDefined)(existingField)) {
                const resolvedIsVisible = (0, _utils.isDefined)(existingField.overrides?.isVisible) ? existingField.overrides.isVisible : existingField.isVisible;
                const resolvedPosition = (0, _utils.isDefined)(existingField.overrides?.position) ? existingField.overrides.position : existingField.position;
                const resolvedSize = (0, _utils.isDefined)(existingField.overrides?.size) ? existingField.overrides.size : existingField.size;
                const hasChanged = resolvedIsVisible !== inputField.isVisible || resolvedPosition !== inputField.position || (0, _utils.isDefined)(inputField.size) && resolvedSize !== inputField.size;
                if (!hasChanged) {
                    continue;
                }
                const shouldOverride = (0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
                    callerApplicationUniversalIdentifier: applicationUniversalIdentifier,
                    entityApplicationUniversalIdentifier: existingField.applicationUniversalIdentifier,
                    workspaceCustomApplicationUniversalIdentifier: applicationUniversalIdentifier
                });
                const { overrides, updatedEditableProperties: sanitizedFieldProps } = (0, _sanitizeoverridableentityinpututil.sanitizeOverridableEntityInput)({
                    metadataName: 'viewField',
                    existingFlatEntity: existingField,
                    updatedEditableProperties: {
                        isVisible: inputField.isVisible,
                        position: inputField.position,
                        ...(0, _utils.isDefined)(inputField.size) ? {
                            size: inputField.size
                        } : {}
                    },
                    shouldOverride
                });
                const updatedField = {
                    ...existingField,
                    ...sanitizedFieldProps,
                    overrides,
                    updatedAt: now
                };
                if ((0, _utils.isDefined)(overrides)) {
                    updatedField.universalOverrides = (0, _fromviewfieldoverridestouniversaloverridesutil.fromViewFieldOverridesToUniversalOverrides)({
                        overrides,
                        viewFieldGroupUniversalIdentifierById: {}
                    });
                } else {
                    updatedField.universalOverrides = null;
                }
                fieldsToUpdate.push(updatedField);
                continue;
            }
            if (!(0, _utils.isDefined)(inputField.fieldMetadataId)) {
                continue;
            }
            const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: inputField.fieldMetadataId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(fieldMetadata)) {
                continue;
            }
            const { fieldMetadataUniversalIdentifier, viewUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                metadataName: 'viewField',
                foreignKeyValues: {
                    fieldMetadataId: inputField.fieldMetadataId,
                    viewId
                },
                flatEntityMaps: {
                    flatFieldMetadataMaps,
                    flatViewMaps
                }
            });
            fieldsToCreate.push({
                id: (0, _uuid.v4)(),
                workspaceId,
                applicationId,
                universalIdentifier: (0, _uuid.v4)(),
                applicationUniversalIdentifier,
                fieldMetadataId: inputField.fieldMetadataId,
                fieldMetadataUniversalIdentifier,
                viewId,
                viewUniversalIdentifier,
                viewFieldGroupId: null,
                viewFieldGroupUniversalIdentifier: null,
                isVisible: inputField.isVisible,
                size: inputField.size ?? _defaultviewfieldsizeconstant.DEFAULT_VIEW_FIELD_SIZE,
                position: inputField.position,
                aggregateOperation: null,
                overrides: null,
                universalOverrides: null,
                isActive: true,
                createdAt: now,
                updatedAt: now,
                deletedAt: null
            });
        }
        return {
            fieldsToCreate,
            fieldsToUpdate
        };
    }
    computeViewFilterGroupOperations({ inputFilterGroups, existingViewFilterGroups, viewId, workspaceId, applicationId, applicationUniversalIdentifier, now, flatViewMaps, flatViewFilterGroupMaps }) {
        const filterGroupsToCreate = [];
        const filterGroupsToUpdate = [];
        const inputFilterGroupIds = new Set(inputFilterGroups.map((g)=>g.id).filter(_utils.isDefined));
        for (const inputGroup of inputFilterGroups){
            const existingGroup = (0, _utils.isDefined)(inputGroup.id) ? existingViewFilterGroups.find((g)=>g.id === inputGroup.id) : undefined;
            if (!(0, _utils.isDefined)(existingGroup)) {
                const filterGroupId = inputGroup.id ?? (0, _uuid.v4)();
                const { viewUniversalIdentifier, parentViewFilterGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                    metadataName: 'viewFilterGroup',
                    foreignKeyValues: {
                        viewId,
                        parentViewFilterGroupId: inputGroup.parentViewFilterGroupId
                    },
                    flatEntityMaps: {
                        flatViewMaps,
                        flatViewFilterGroupMaps
                    }
                });
                filterGroupsToCreate.push({
                    id: filterGroupId,
                    workspaceId,
                    applicationId,
                    universalIdentifier: filterGroupId,
                    applicationUniversalIdentifier,
                    viewId,
                    viewUniversalIdentifier,
                    logicalOperator: inputGroup.logicalOperator ?? _types.ViewFilterGroupLogicalOperator.AND,
                    parentViewFilterGroupId: inputGroup.parentViewFilterGroupId ?? null,
                    parentViewFilterGroupUniversalIdentifier,
                    positionInViewFilterGroup: inputGroup.positionInViewFilterGroup ?? null,
                    viewFilterIds: [],
                    viewFilterUniversalIdentifiers: [],
                    childViewFilterGroupIds: [],
                    childViewFilterGroupUniversalIdentifiers: [],
                    createdAt: now,
                    updatedAt: now,
                    deletedAt: null
                });
            } else {
                const hasChanged = existingGroup.logicalOperator !== inputGroup.logicalOperator || existingGroup.positionInViewFilterGroup !== inputGroup.positionInViewFilterGroup || existingGroup.parentViewFilterGroupId !== inputGroup.parentViewFilterGroupId;
                if (hasChanged) {
                    const resolvedParentId = inputGroup.parentViewFilterGroupId ?? existingGroup.parentViewFilterGroupId;
                    const { parentViewFilterGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                        metadataName: 'viewFilterGroup',
                        foreignKeyValues: {
                            parentViewFilterGroupId: resolvedParentId
                        },
                        flatEntityMaps: {
                            flatViewFilterGroupMaps
                        }
                    });
                    filterGroupsToUpdate.push({
                        ...existingGroup,
                        logicalOperator: inputGroup.logicalOperator ?? existingGroup.logicalOperator,
                        positionInViewFilterGroup: inputGroup.positionInViewFilterGroup ?? existingGroup.positionInViewFilterGroup,
                        parentViewFilterGroupId: resolvedParentId,
                        parentViewFilterGroupUniversalIdentifier,
                        updatedAt: now
                    });
                }
            }
        }
        const filterGroupsToRemove = existingViewFilterGroups.filter((g)=>!inputFilterGroupIds.has(g.id));
        return {
            filterGroupsToCreate,
            filterGroupsToUpdate,
            filterGroupsToRemove
        };
    }
    computeViewFilterOperations({ inputFilters, existingViewFilters, viewId, workspaceId, applicationId, applicationUniversalIdentifier, now, flatFieldMetadataMaps, flatViewMaps, flatViewFilterGroupMaps }) {
        const filtersToCreate = [];
        const filtersToUpdate = [];
        const inputFilterIds = new Set(inputFilters.map((f)=>f.id).filter(_utils.isDefined));
        for (const inputFilter of inputFilters){
            const existingFilter = (0, _utils.isDefined)(inputFilter.id) ? existingViewFilters.find((f)=>f.id === inputFilter.id) : undefined;
            if (!(0, _utils.isDefined)(existingFilter)) {
                const filterId = inputFilter.id ?? (0, _uuid.v4)();
                const { fieldMetadataUniversalIdentifier, viewUniversalIdentifier, viewFilterGroupUniversalIdentifier, relationTargetFieldMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                    metadataName: 'viewFilter',
                    foreignKeyValues: {
                        fieldMetadataId: inputFilter.fieldMetadataId,
                        viewId,
                        viewFilterGroupId: inputFilter.viewFilterGroupId,
                        relationTargetFieldMetadataId: inputFilter.relationTargetFieldMetadataId
                    },
                    flatEntityMaps: {
                        flatFieldMetadataMaps,
                        flatViewMaps,
                        flatViewFilterGroupMaps
                    }
                });
                const referencedFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: inputFilter.fieldMetadataId,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                const relationTargetFieldMetadata = (0, _utils.isDefined)(inputFilter.relationTargetFieldMetadataId) ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: inputFilter.relationTargetFieldMetadataId,
                    flatEntityMaps: flatFieldMetadataMaps
                }) : undefined;
                const operand = inputFilter.operand ?? ((0, _utils.isDefined)(referencedFieldMetadata) ? (0, _getdefaultviewfilteroperandutil.getDefaultViewFilterOperand)({
                    fieldType: referencedFieldMetadata.type,
                    subFieldName: inputFilter.subFieldName,
                    relationTargetFieldType: relationTargetFieldMetadata?.type
                }) : undefined) ?? _types.ViewFilterOperand.CONTAINS;
                filtersToCreate.push({
                    id: filterId,
                    workspaceId,
                    applicationId,
                    universalIdentifier: (0, _uuid.v4)(),
                    applicationUniversalIdentifier,
                    fieldMetadataId: inputFilter.fieldMetadataId,
                    fieldMetadataUniversalIdentifier,
                    viewId,
                    viewUniversalIdentifier,
                    operand,
                    value: inputFilter.value,
                    viewFilterGroupId: inputFilter.viewFilterGroupId ?? null,
                    viewFilterGroupUniversalIdentifier,
                    positionInViewFilterGroup: inputFilter.positionInViewFilterGroup ?? null,
                    subFieldName: inputFilter.subFieldName ?? null,
                    relationTargetFieldMetadataId: inputFilter.relationTargetFieldMetadataId ?? null,
                    relationTargetFieldMetadataUniversalIdentifier,
                    createdAt: now,
                    updatedAt: now,
                    deletedAt: null
                });
            } else {
                const hasChanged = existingFilter.fieldMetadataId !== inputFilter.fieldMetadataId || existingFilter.operand !== inputFilter.operand || JSON.stringify(existingFilter.value) !== JSON.stringify(inputFilter.value) || existingFilter.viewFilterGroupId !== inputFilter.viewFilterGroupId || existingFilter.positionInViewFilterGroup !== inputFilter.positionInViewFilterGroup || existingFilter.subFieldName !== inputFilter.subFieldName || existingFilter.relationTargetFieldMetadataId !== (inputFilter.relationTargetFieldMetadataId ?? null);
                if (hasChanged) {
                    const { fieldMetadataUniversalIdentifier, viewFilterGroupUniversalIdentifier, relationTargetFieldMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                        metadataName: 'viewFilter',
                        foreignKeyValues: {
                            fieldMetadataId: inputFilter.fieldMetadataId,
                            viewFilterGroupId: inputFilter.viewFilterGroupId,
                            relationTargetFieldMetadataId: inputFilter.relationTargetFieldMetadataId
                        },
                        flatEntityMaps: {
                            flatFieldMetadataMaps,
                            flatViewFilterGroupMaps
                        }
                    });
                    filtersToUpdate.push({
                        ...existingFilter,
                        fieldMetadataId: inputFilter.fieldMetadataId,
                        fieldMetadataUniversalIdentifier,
                        operand: inputFilter.operand ?? existingFilter.operand,
                        value: inputFilter.value,
                        viewFilterGroupId: inputFilter.viewFilterGroupId ?? existingFilter.viewFilterGroupId,
                        viewFilterGroupUniversalIdentifier,
                        positionInViewFilterGroup: inputFilter.positionInViewFilterGroup ?? existingFilter.positionInViewFilterGroup,
                        subFieldName: inputFilter.subFieldName ?? existingFilter.subFieldName,
                        relationTargetFieldMetadataId: inputFilter.relationTargetFieldMetadataId ?? null,
                        relationTargetFieldMetadataUniversalIdentifier,
                        updatedAt: now
                    });
                }
            }
        }
        const filtersToRemove = existingViewFilters.filter((f)=>!inputFilterIds.has(f.id));
        return {
            filtersToCreate,
            filtersToUpdate,
            filtersToRemove
        };
    }
    computeViewSortOperations({ inputSorts, existingViewSorts, viewId, workspaceId, applicationId, applicationUniversalIdentifier, now, flatFieldMetadataMaps, flatViewMaps }) {
        const sortsToCreate = [];
        const sortsToUpdate = [];
        const inputSortIds = new Set(inputSorts.map((s)=>s.id).filter(_utils.isDefined));
        for (const inputSort of inputSorts){
            const existingSort = (0, _utils.isDefined)(inputSort.id) ? existingViewSorts.find((s)=>s.id === inputSort.id) : undefined;
            if (!(0, _utils.isDefined)(existingSort)) {
                const sortId = inputSort.id ?? (0, _uuid.v4)();
                const { fieldMetadataUniversalIdentifier, viewUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                    metadataName: 'viewSort',
                    foreignKeyValues: {
                        fieldMetadataId: inputSort.fieldMetadataId,
                        viewId
                    },
                    flatEntityMaps: {
                        flatFieldMetadataMaps,
                        flatViewMaps
                    }
                });
                sortsToCreate.push({
                    id: sortId,
                    workspaceId,
                    applicationId,
                    universalIdentifier: (0, _uuid.v4)(),
                    applicationUniversalIdentifier,
                    fieldMetadataId: inputSort.fieldMetadataId,
                    fieldMetadataUniversalIdentifier,
                    viewId,
                    viewUniversalIdentifier,
                    direction: inputSort.direction ?? _types.ViewSortDirection.ASC,
                    createdAt: now,
                    updatedAt: now,
                    deletedAt: null
                });
            } else {
                const hasChanged = existingSort.fieldMetadataId !== inputSort.fieldMetadataId || existingSort.direction !== inputSort.direction;
                if (hasChanged) {
                    const { fieldMetadataUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                        metadataName: 'viewSort',
                        foreignKeyValues: {
                            fieldMetadataId: inputSort.fieldMetadataId
                        },
                        flatEntityMaps: {
                            flatFieldMetadataMaps
                        }
                    });
                    sortsToUpdate.push({
                        ...existingSort,
                        fieldMetadataId: inputSort.fieldMetadataId,
                        fieldMetadataUniversalIdentifier,
                        direction: inputSort.direction ?? existingSort.direction,
                        updatedAt: now
                    });
                }
            }
        }
        const sortsToRemove = existingViewSorts.filter((s)=>!inputSortIds.has(s.id));
        return {
            sortsToCreate,
            sortsToUpdate,
            sortsToRemove
        };
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService, viewRepository){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.viewRepository = viewRepository;
    }
};
ViewWidgetUpsertService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ViewWidgetUpsertService);

//# sourceMappingURL=view-widget-upsert.service.js.map