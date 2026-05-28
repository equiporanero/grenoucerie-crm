"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldsWidgetUpsertService", {
    enumerable: true,
    get: function() {
        return FieldsWidgetUpsertService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _core = require("@lingui/core");
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
const _defaultviewfieldsizeconstant = require("../../flat-view-field/constants/default-view-field-size.constant");
const _fromviewfieldoverridestouniversaloverridesutil = require("../../flat-view-field/utils/from-view-field-overrides-to-universal-overrides.util");
const _widgetconfigurationtypetype = require("../../page-layout-widget/enums/widget-configuration-type.type");
const _iscalleroverridingentityutil = require("../../utils/is-caller-overriding-entity.util");
const _sanitizeoverridableentityinpututil = require("../../utils/sanitize-overridable-entity-input.util");
const _viewfieldgroupexception = require("../exceptions/view-field-group.exception");
const _viewentity = require("../../view/entities/view.entity");
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
let FieldsWidgetUpsertService = class FieldsWidgetUpsertService {
    async upsertFieldsWidget({ input, workspaceId }) {
        const hasGroups = (0, _utils.isDefined)(input.groups);
        const hasFields = (0, _utils.isDefined)(input.fields);
        if (hasGroups === hasFields) {
            throw new _viewfieldgroupexception.ViewFieldGroupException(_core.i18n._(/*i18n*/ {
                id: "b3ictS",
                message: 'Exactly one of "groups" or "fields" must be provided'
            }), _viewfieldgroupexception.ViewFieldGroupExceptionCode.INVALID_VIEW_FIELD_GROUP_DATA);
        }
        const { widgetId } = input;
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const { flatPageLayoutWidgetMaps, flatFieldMetadataMaps, flatObjectMetadataMaps, flatViewFieldGroupMaps, flatViewFieldMaps, flatViewMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPageLayoutWidgetMaps',
                'flatFieldMetadataMaps',
                'flatObjectMetadataMaps',
                'flatViewFieldGroupMaps',
                'flatViewFieldMaps',
                'flatViewMaps'
            ]
        });
        const widget = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: widgetId,
            flatEntityMaps: flatPageLayoutWidgetMaps
        });
        if (!(0, _utils.isDefined)(widget) || !(0, _isflatpagelayoutwidgetconfigurationoftypeutil.isFlatPageLayoutWidgetConfigurationOfType)(widget, _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS)) {
            throw new _viewfieldgroupexception.ViewFieldGroupException(_core.i18n._(/*i18n*/ {
                id: "8sAaBn",
                message: "Fields widget not found"
            }), _viewfieldgroupexception.ViewFieldGroupExceptionCode.FIELDS_WIDGET_NOT_FOUND);
        }
        const viewId = widget.configuration.viewId;
        if (!(0, _utils.isDefined)(viewId)) {
            throw new _viewfieldgroupexception.ViewFieldGroupException(_core.i18n._(/*i18n*/ {
                id: "9HjeLQ",
                message: "Fields widget has no associated view"
            }), _viewfieldgroupexception.ViewFieldGroupExceptionCode.VIEW_NOT_FOUND);
        }
        const flatView = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: viewId,
            flatEntityMaps: flatViewMaps
        });
        const objectMetadata = (0, _utils.isDefined)(flatView) ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: flatView.objectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        }) : undefined;
        const labelIdentifierFieldMetadataId = objectMetadata?.labelIdentifierFieldMetadataId ?? null;
        const existingGroups = Object.values(flatViewFieldGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((group)=>group.isActive && group.viewId === viewId);
        const existingViewFields = Object.values(flatViewFieldMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((field)=>field.isActive && field.viewId === viewId);
        if (hasGroups) {
            await this.upsertFieldsWidgetWithGroups({
                inputGroups: input.groups,
                existingGroups,
                existingViewFields,
                viewId,
                workspaceId,
                applicationId: workspaceCustomFlatApplication.id,
                applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
                labelIdentifierFieldMetadataId,
                flatFieldMetadataMaps,
                flatViewMaps,
                flatViewFieldGroupMaps
            });
        } else {
            await this.upsertFieldsWidgetWithFields({
                inputFields: input.fields,
                existingGroups,
                existingViewFields,
                viewId,
                workspaceId,
                applicationId: workspaceCustomFlatApplication.id,
                applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
                labelIdentifierFieldMetadataId,
                flatFieldMetadataMaps,
                flatViewMaps
            });
        }
        const view = await this.viewRepository.findOne({
            where: {
                id: viewId,
                workspaceId,
                deletedAt: (0, _typeorm1.IsNull)()
            }
        });
        if (!(0, _utils.isDefined)(view)) {
            throw new _viewfieldgroupexception.ViewFieldGroupException(_core.i18n._(/*i18n*/ {
                id: "BHDATQ",
                message: "View not found after upsert"
            }), _viewfieldgroupexception.ViewFieldGroupExceptionCode.VIEW_NOT_FOUND);
        }
        return view;
    }
    async upsertFieldsWidgetWithGroups({ inputGroups, existingGroups, existingViewFields, viewId, workspaceId, applicationId, applicationUniversalIdentifier, labelIdentifierFieldMetadataId, flatFieldMetadataMaps, flatViewMaps, flatViewFieldGroupMaps }) {
        const now = new Date().toISOString();
        const inputGroupIds = new Set(inputGroups.map((g)=>g.id));
        const groupsToCreate = [];
        const groupsToUpdate = [];
        const groupsToDeactivate = [];
        for (const inputGroup of inputGroups){
            const existingGroup = existingGroups.find((g)=>g.id === inputGroup.id);
            if (!(0, _utils.isDefined)(existingGroup)) {
                groupsToCreate.push(this.buildGroupToCreate({
                    inputGroup,
                    viewId,
                    workspaceId,
                    applicationId,
                    applicationUniversalIdentifier,
                    now,
                    flatViewMaps
                }));
            } else if (this.hasGroupChanged(existingGroup, inputGroup)) {
                const shouldOverride = (0, _iscalleroverridingentityutil.isCallerOverridingEntity)({
                    callerApplicationUniversalIdentifier: applicationUniversalIdentifier,
                    entityApplicationUniversalIdentifier: existingGroup.applicationUniversalIdentifier,
                    workspaceCustomApplicationUniversalIdentifier: applicationUniversalIdentifier
                });
                const { overrides, updatedEditableProperties: sanitizedGroupProps } = (0, _sanitizeoverridableentityinpututil.sanitizeOverridableEntityInput)({
                    metadataName: 'viewFieldGroup',
                    existingFlatEntity: existingGroup,
                    updatedEditableProperties: {
                        name: inputGroup.name,
                        position: inputGroup.position,
                        isVisible: inputGroup.isVisible
                    },
                    shouldOverride
                });
                groupsToUpdate.push({
                    ...existingGroup,
                    ...sanitizedGroupProps,
                    overrides,
                    updatedAt: now
                });
            }
        }
        for (const existingGroup of existingGroups){
            if (!inputGroupIds.has(existingGroup.id)) {
                groupsToDeactivate.push(existingGroup);
            }
        }
        // Build optimistic maps so that newly created groups can be resolved when
        // computing viewFieldGroupUniversalIdentifier for view field updates.
        const optimisticFlatViewFieldGroupMaps = groupsToCreate.reduce((maps, group)=>(0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
                flatEntity: group,
                flatEntityMaps: maps
            }), flatViewFieldGroupMaps);
        const viewFieldsToUpdate = existingViewFields.flatMap((existingField)=>{
            const inputGroup = inputGroups.find((g)=>g.fields.some((f)=>f.viewFieldId === existingField.id));
            if (!(0, _utils.isDefined)(inputGroup)) {
                return [];
            }
            const inputField = inputGroup.fields.find((f)=>f.viewFieldId === existingField.id);
            if (!(0, _utils.isDefined)(inputField)) {
                return [];
            }
            const newViewFieldGroupId = inputGroup.id;
            const resolvedIsVisible = (0, _utils.isDefined)(existingField.overrides?.isVisible) ? existingField.overrides.isVisible : existingField.isVisible;
            const resolvedPosition = (0, _utils.isDefined)(existingField.overrides?.position) ? existingField.overrides.position : existingField.position;
            // null is a valid override value (meaning "ungrouped"), so use !== undefined
            const resolvedViewFieldGroupId = existingField.overrides?.viewFieldGroupId !== undefined ? existingField.overrides.viewFieldGroupId : existingField.viewFieldGroupId;
            const hasChanged = resolvedIsVisible !== inputField.isVisible || resolvedPosition !== inputField.position || resolvedViewFieldGroupId !== newViewFieldGroupId;
            if (!hasChanged) {
                return [];
            }
            const { viewFieldGroupUniversalIdentifier: _viewFieldGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                metadataName: 'viewField',
                foreignKeyValues: {
                    viewFieldGroupId: newViewFieldGroupId
                },
                flatEntityMaps: {
                    flatViewFieldGroupMaps: optimisticFlatViewFieldGroupMaps
                }
            });
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
                    viewFieldGroupId: newViewFieldGroupId
                },
                shouldOverride
            });
            const updatedField = {
                ...existingField,
                ...sanitizedFieldProps,
                overrides,
                updatedAt: now
            };
            if (sanitizedFieldProps.viewFieldGroupId !== undefined) {
                const resolved = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                    metadataName: 'viewField',
                    foreignKeyValues: {
                        viewFieldGroupId: updatedField.viewFieldGroupId
                    },
                    flatEntityMaps: {
                        flatViewFieldGroupMaps: optimisticFlatViewFieldGroupMaps
                    }
                });
                updatedField.viewFieldGroupUniversalIdentifier = resolved.viewFieldGroupUniversalIdentifier;
            }
            if ((0, _utils.isDefined)(overrides)) {
                updatedField.universalOverrides = (0, _fromviewfieldoverridestouniversaloverridesutil.fromViewFieldOverridesToUniversalOverrides)({
                    overrides,
                    viewFieldGroupUniversalIdentifierById: optimisticFlatViewFieldGroupMaps.universalIdentifierById
                });
            } else {
                updatedField.universalOverrides = null;
            }
            return [
                updatedField
            ];
        });
        const viewFieldsToCreate = [];
        for (const inputGroup of inputGroups){
            for (const inputField of inputGroup.fields){
                if ((0, _utils.isDefined)(inputField.viewFieldId) || !(0, _utils.isDefined)(inputField.fieldMetadataId)) {
                    continue;
                }
                const existingField = existingViewFields.find((field)=>field.fieldMetadataId === inputField.fieldMetadataId);
                if ((0, _utils.isDefined)(existingField)) {
                    const { viewFieldGroupUniversalIdentifier: newViewFieldGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                        metadataName: 'viewField',
                        foreignKeyValues: {
                            viewFieldGroupId: inputGroup.id
                        },
                        flatEntityMaps: {
                            flatViewFieldGroupMaps: optimisticFlatViewFieldGroupMaps
                        }
                    });
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
                            viewFieldGroupId: inputGroup.id
                        },
                        shouldOverride
                    });
                    const updatedField = {
                        ...existingField,
                        ...sanitizedFieldProps,
                        overrides,
                        updatedAt: now
                    };
                    if (sanitizedFieldProps.viewFieldGroupId !== undefined) {
                        updatedField.viewFieldGroupUniversalIdentifier = newViewFieldGroupUniversalIdentifier;
                    }
                    if ((0, _utils.isDefined)(overrides)) {
                        updatedField.universalOverrides = (0, _fromviewfieldoverridestouniversaloverridesutil.fromViewFieldOverridesToUniversalOverrides)({
                            overrides,
                            viewFieldGroupUniversalIdentifierById: optimisticFlatViewFieldGroupMaps.universalIdentifierById
                        });
                    } else {
                        updatedField.universalOverrides = null;
                    }
                    viewFieldsToUpdate.push(updatedField);
                    continue;
                }
                const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: inputField.fieldMetadataId,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                if (!(0, _utils.isDefined)(fieldMetadata) || !(0, _utils.isFieldMetadataEligibleForFieldsWidget)({
                    fieldName: fieldMetadata.name,
                    fieldType: fieldMetadata.type,
                    isLabelIdentifierField: fieldMetadata.id === labelIdentifierFieldMetadataId
                })) {
                    continue;
                }
                const { fieldMetadataUniversalIdentifier, viewUniversalIdentifier, viewFieldGroupUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
                    metadataName: 'viewField',
                    foreignKeyValues: {
                        fieldMetadataId: inputField.fieldMetadataId,
                        viewId,
                        viewFieldGroupId: inputGroup.id
                    },
                    flatEntityMaps: {
                        flatFieldMetadataMaps,
                        flatViewMaps,
                        flatViewFieldGroupMaps: optimisticFlatViewFieldGroupMaps
                    }
                });
                viewFieldsToCreate.push({
                    id: (0, _uuid.v4)(),
                    workspaceId,
                    applicationId,
                    universalIdentifier: (0, _uuid.v4)(),
                    applicationUniversalIdentifier,
                    fieldMetadataId: inputField.fieldMetadataId,
                    fieldMetadataUniversalIdentifier,
                    viewId,
                    viewUniversalIdentifier,
                    viewFieldGroupId: inputGroup.id,
                    viewFieldGroupUniversalIdentifier,
                    isVisible: inputField.isVisible,
                    size: _defaultviewfieldsizeconstant.DEFAULT_VIEW_FIELD_SIZE,
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
        }
        const { toHardDelete: customGroupsToDelete, toDeactivate: deactivatedGroupUpdates } = (0, _splitentitiesbyremovalstrategyutil.splitEntitiesByRemovalStrategy)({
            entitiesToRemove: groupsToDeactivate,
            workspaceCustomApplicationUniversalIdentifier: applicationUniversalIdentifier,
            now
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFieldGroup: {
                    flatEntityToCreate: groupsToCreate,
                    flatEntityToDelete: customGroupsToDelete,
                    flatEntityToUpdate: [
                        ...groupsToUpdate,
                        ...deactivatedGroupUpdates
                    ]
                },
                viewField: {
                    flatEntityToCreate: viewFieldsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: viewFieldsToUpdate
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while upserting fields widget');
        }
    }
    async upsertFieldsWidgetWithFields({ inputFields, existingGroups, existingViewFields, viewId, workspaceId, applicationId, applicationUniversalIdentifier, labelIdentifierFieldMetadataId, flatFieldMetadataMaps, flatViewMaps }) {
        const now = new Date().toISOString();
        const groupsToDeactivate = [
            ...existingGroups
        ];
        const viewFieldsToUpdate = existingViewFields.flatMap((existingField)=>{
            const inputField = inputFields.find((f)=>f.viewFieldId === existingField.id);
            if (!(0, _utils.isDefined)(inputField)) {
                return [];
            }
            const resolvedIsVisible = (0, _utils.isDefined)(existingField.overrides?.isVisible) ? existingField.overrides.isVisible : existingField.isVisible;
            const resolvedPosition = (0, _utils.isDefined)(existingField.overrides?.position) ? existingField.overrides.position : existingField.position;
            const resolvedViewFieldGroupId = existingField.overrides?.viewFieldGroupId !== undefined ? existingField.overrides.viewFieldGroupId : existingField.viewFieldGroupId;
            const hasChanged = resolvedIsVisible !== inputField.isVisible || resolvedPosition !== inputField.position || resolvedViewFieldGroupId !== null;
            if (!hasChanged) {
                return [];
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
                    viewFieldGroupId: null
                },
                shouldOverride
            });
            const updatedField = {
                ...existingField,
                ...sanitizedFieldProps,
                overrides,
                updatedAt: now
            };
            if (sanitizedFieldProps.viewFieldGroupId !== undefined) {
                updatedField.viewFieldGroupUniversalIdentifier = null;
            }
            if ((0, _utils.isDefined)(overrides)) {
                updatedField.universalOverrides = (0, _fromviewfieldoverridestouniversaloverridesutil.fromViewFieldOverridesToUniversalOverrides)({
                    overrides,
                    viewFieldGroupUniversalIdentifierById: {}
                });
            } else {
                updatedField.universalOverrides = null;
            }
            return [
                updatedField
            ];
        });
        const viewFieldsToCreate = [];
        for (const inputField of inputFields){
            if ((0, _utils.isDefined)(inputField.viewFieldId) || !(0, _utils.isDefined)(inputField.fieldMetadataId)) {
                continue;
            }
            const existingField = existingViewFields.find((field)=>field.fieldMetadataId === inputField.fieldMetadataId);
            if ((0, _utils.isDefined)(existingField)) {
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
                        viewFieldGroupId: null
                    },
                    shouldOverride
                });
                const updatedField = {
                    ...existingField,
                    ...sanitizedFieldProps,
                    overrides,
                    updatedAt: now
                };
                if (sanitizedFieldProps.viewFieldGroupId !== undefined) {
                    updatedField.viewFieldGroupUniversalIdentifier = null;
                }
                if ((0, _utils.isDefined)(overrides)) {
                    updatedField.universalOverrides = (0, _fromviewfieldoverridestouniversaloverridesutil.fromViewFieldOverridesToUniversalOverrides)({
                        overrides,
                        viewFieldGroupUniversalIdentifierById: {}
                    });
                } else {
                    updatedField.universalOverrides = null;
                }
                viewFieldsToUpdate.push(updatedField);
                continue;
            }
            const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: inputField.fieldMetadataId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(fieldMetadata) || !(0, _utils.isFieldMetadataEligibleForFieldsWidget)({
                fieldName: fieldMetadata.name,
                fieldType: fieldMetadata.type,
                isLabelIdentifierField: fieldMetadata.id === labelIdentifierFieldMetadataId
            })) {
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
            viewFieldsToCreate.push({
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
                size: _defaultviewfieldsizeconstant.DEFAULT_VIEW_FIELD_SIZE,
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
        const { toHardDelete: customGroupsToDelete, toDeactivate: deactivatedGroupUpdates } = (0, _splitentitiesbyremovalstrategyutil.splitEntitiesByRemovalStrategy)({
            entitiesToRemove: groupsToDeactivate,
            workspaceCustomApplicationUniversalIdentifier: applicationUniversalIdentifier,
            now
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                viewFieldGroup: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: customGroupsToDelete,
                    flatEntityToUpdate: deactivatedGroupUpdates
                },
                viewField: {
                    flatEntityToCreate: viewFieldsToCreate,
                    flatEntityToDelete: [],
                    flatEntityToUpdate: viewFieldsToUpdate
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while upserting fields widget');
        }
    }
    buildGroupToCreate({ inputGroup, viewId, workspaceId, applicationId, applicationUniversalIdentifier, now, flatViewMaps }) {
        const { viewUniversalIdentifier } = (0, _resolveentityrelationuniversalidentifiersutil.resolveEntityRelationUniversalIdentifiers)({
            metadataName: 'viewFieldGroup',
            foreignKeyValues: {
                viewId
            },
            flatEntityMaps: {
                flatViewMaps
            }
        });
        return {
            id: inputGroup.id,
            workspaceId,
            applicationId,
            universalIdentifier: inputGroup.id,
            applicationUniversalIdentifier,
            name: inputGroup.name,
            position: inputGroup.position,
            isVisible: inputGroup.isVisible,
            viewId,
            viewUniversalIdentifier,
            isActive: true,
            overrides: null,
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
            viewFieldIds: [],
            viewFieldUniversalIdentifiers: []
        };
    }
    hasGroupChanged(existing, input) {
        const resolvedName = (0, _utils.isDefined)(existing.overrides?.name) ? existing.overrides.name : existing.name;
        const resolvedPosition = (0, _utils.isDefined)(existing.overrides?.position) ? existing.overrides.position : existing.position;
        const resolvedIsVisible = (0, _utils.isDefined)(existing.overrides?.isVisible) ? existing.overrides.isVisible : existing.isVisible;
        return resolvedName !== input.name || resolvedPosition !== input.position || resolvedIsVisible !== input.isVisible;
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService, viewRepository){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
        this.viewRepository = viewRepository;
    }
};
FieldsWidgetUpsertService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], FieldsWidgetUpsertService);

//# sourceMappingURL=fields-widget-upsert.service.js.map