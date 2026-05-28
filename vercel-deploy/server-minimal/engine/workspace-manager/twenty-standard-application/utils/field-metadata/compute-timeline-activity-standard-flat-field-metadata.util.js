"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildTimelineActivityStandardFlatFieldMetadatas", {
    enumerable: true,
    get: function() {
        return buildTimelineActivityStandardFlatFieldMetadatas;
    }
});
const _i18nlabelutil = require("../i18n-label.util");
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _createstandardfieldflatmetadatautil = require("./create-standard-field-flat-metadata.util");
const _createstandardrelationfieldflatmetadatautil = require("./create-standard-relation-field-flat-metadata.util");
const _gettsvectorcolumnexpressionutil = require("../../../utils/get-ts-vector-column-expression.util");
const _timelineactivityworkspaceentity = require("../../../../../modules/timeline/standard-objects/timeline-activity.workspace-entity");
const buildTimelineActivityStandardFlatFieldMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
        // Base fields from BaseWorkspaceEntity
        id: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'id',
                type: _types.FieldMetadataType.UUID,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "dFb5Nt",
                    message: "Id"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "dFb5Nt",
                    message: "Id"
                }),
                icon: 'Icon123',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: 'uuid'
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        createdAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'createdAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wPvFAD",
                    message: "Creation date"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wPvFAD",
                    message: "Creation date"
                }),
                icon: 'IconCalendar',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: 'now',
                settings: {
                    displayFormat: _types.DateDisplayFormat.RELATIVE
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        updatedAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'updatedAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "o1zvNS",
                    message: "Last update"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "tGwswq",
                    message: "Last time the record was changed"
                }),
                icon: 'IconCalendarClock',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: 'now',
                settings: {
                    displayFormat: _types.DateDisplayFormat.RELATIVE
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        deletedAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'deletedAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "QN9ahV",
                    message: "Deleted at"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "1lL5Iu",
                    message: "Date when the record was deleted"
                }),
                icon: 'IconCalendarMinus',
                isSystem: true,
                isNullable: true,
                isUIReadOnly: true,
                settings: {
                    displayFormat: _types.DateDisplayFormat.RELATIVE
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        createdBy: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'createdBy',
                type: _types.FieldMetadataType.ACTOR,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "NCIYDF",
                    message: "Created by"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "zGBDEH",
                    message: "The creator of the record"
                }),
                icon: 'IconCreativeCommonsSa',
                isSystem: true,
                isUIReadOnly: true,
                isNullable: false,
                defaultValue: {
                    source: "'MANUAL'",
                    name: "'System'",
                    workspaceMemberId: null
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        updatedBy: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'updatedBy',
                type: _types.FieldMetadataType.ACTOR,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "KQsreu",
                    message: "Updated by"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "a6NBQe",
                    message: "The workspace member who last updated the record"
                }),
                icon: 'IconUserCircle',
                isSystem: true,
                isUIReadOnly: true,
                isNullable: false,
                defaultValue: {
                    source: "'MANUAL'",
                    name: "'System'",
                    workspaceMemberId: null
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        position: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'position',
                type: _types.FieldMetadataType.POSITION,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "p/78dY",
                    message: "Position"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "HSkSOA",
                    message: "Timeline activity record position"
                }),
                icon: 'IconHierarchy2',
                isSystem: true,
                isNullable: false,
                defaultValue: 0
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        // TimelineActivity-specific fields
        happensAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'happensAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wPvFAD",
                    message: "Creation date"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wPvFAD",
                    message: "Creation date"
                }),
                icon: 'IconCalendar',
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: 'now'
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        name: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'name',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "PYs3rP",
                    message: "Event name"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "PYs3rP",
                    message: "Event name"
                }),
                icon: 'IconAbc',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        properties: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'properties',
                type: _types.FieldMetadataType.RAW_JSON,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "kJDmsI",
                    message: "Event details"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "TVc0/Q",
                    message: "Json value for event details"
                }),
                icon: 'IconListDetails',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        linkedRecordCachedName: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'linkedRecordCachedName',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "6YiMr4",
                    message: "Linked Record cached name"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8mVqF7",
                    message: "Cached record name"
                }),
                icon: 'IconAbc',
                isSystem: true,
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        linkedRecordId: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'linkedRecordId',
                type: _types.FieldMetadataType.UUID,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "sgHAxx",
                    message: "Linked Record id"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "sgHAxx",
                    message: "Linked Record id"
                }),
                icon: 'IconAbc',
                isSystem: true,
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        linkedObjectMetadataId: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'linkedObjectMetadataId',
                type: _types.FieldMetadataType.UUID,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wR9USP",
                    message: "Linked Object Metadata Id"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wR9USP",
                    message: "Linked Object Metadata Id"
                }),
                icon: 'IconAbc',
                isSystem: true,
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        // Relation fields
        workspaceMember: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'workspaceMember',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "qc38qR",
                    message: "Workspace Member"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "LxOGsB",
                    message: "Event workspace member"
                }),
                icon: 'IconCircleUser',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'workspaceMember',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.CASCADE,
                    joinColumnName: 'workspaceMemberId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        targetPerson: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
                fieldName: 'targetPerson',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8B2x9+",
                    message: "Event target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'person',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.CASCADE,
                    joinColumnName: 'targetPersonId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        targetCompany: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
                fieldName: 'targetCompany',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8B2x9+",
                    message: "Event target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'company',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.CASCADE,
                    joinColumnName: 'targetCompanyId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        targetOpportunity: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
                fieldName: 'targetOpportunity',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8B2x9+",
                    message: "Event target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'opportunity',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.SET_NULL,
                    joinColumnName: 'targetOpportunityId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        targetNote: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
                fieldName: 'targetNote',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8B2x9+",
                    message: "Event target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'note',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.SET_NULL,
                    joinColumnName: 'targetNoteId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        targetTask: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
                fieldName: 'targetTask',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8B2x9+",
                    message: "Event target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'task',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.SET_NULL,
                    joinColumnName: 'targetTaskId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        targetWorkflow: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
                fieldName: 'targetWorkflow',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8B2x9+",
                    message: "Event target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'workflow',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.CASCADE,
                    joinColumnName: 'targetWorkflowId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        targetWorkflowVersion: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
                fieldName: 'targetWorkflowVersion',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8B2x9+",
                    message: "Event target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'workflowVersion',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.CASCADE,
                    joinColumnName: 'targetWorkflowVersionId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        targetWorkflowRun: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
                fieldName: 'targetWorkflowRun',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8B2x9+",
                    message: "Event target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'workflowRun',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.CASCADE,
                    joinColumnName: 'targetWorkflowRunId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        targetDashboard: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.timelineActivity.morphIds.targetMorphId.morphId,
                fieldName: 'targetDashboard',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "8B2x9+",
                    message: "Event target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'dashboard',
                targetFieldName: 'timelineActivities',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.SET_NULL,
                    joinColumnName: 'targetDashboardId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        searchVector: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'searchVector',
                type: _types.FieldMetadataType.TS_VECTOR,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "PdVIJC",
                    message: "Search vector"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "J4hC2m",
                    message: "Field used for full-text search"
                }),
                icon: 'IconUser',
                isSystem: true,
                isNullable: true,
                settings: {
                    generatedType: 'STORED',
                    asExpression: (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)(_timelineactivityworkspaceentity.SEARCH_FIELDS_FOR_TIMELINE_ACTIVITY)
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        })
    });

//# sourceMappingURL=compute-timeline-activity-standard-flat-field-metadata.util.js.map