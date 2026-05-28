"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildWorkflowVersionStandardFlatFieldMetadatas", {
    enumerable: true,
    get: function() {
        return buildWorkflowVersionStandardFlatFieldMetadatas;
    }
});
const _i18nlabelutil = require("../i18n-label.util");
const _types = require("twenty-shared/types");
const _createstandardfieldflatmetadatautil = require("./create-standard-field-flat-metadata.util");
const _createstandardrelationfieldflatmetadatautil = require("./create-standard-relation-field-flat-metadata.util");
const _gettsvectorcolumnexpressionutil = require("../../../utils/get-ts-vector-column-expression.util");
const _workflowversionworkspaceentity = require("../../../../../modules/workflow/common/standard-objects/workflow-version.workspace-entity");
const buildWorkflowVersionStandardFlatFieldMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
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
        name: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'name',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "6YtxFj",
                    message: "Name"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "EhAsND",
                    message: "The workflow version name"
                }),
                icon: 'IconSettingsAutomation',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        trigger: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'trigger',
                type: _types.FieldMetadataType.RAW_JSON,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "PGMPIi",
                    message: "Version trigger"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "fOjmZ1",
                    message: "Json object to provide trigger"
                }),
                icon: 'IconSettingsAutomation',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        steps: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'steps',
                type: _types.FieldMetadataType.RAW_JSON,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "CdQeU7",
                    message: "Version steps"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "AQuLwi",
                    message: "Json object to provide steps"
                }),
                icon: 'IconSettingsAutomation',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        status: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'status',
                type: _types.FieldMetadataType.SELECT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "7aatUy",
                    message: "Version status"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "dhx13p",
                    message: "The workflow version status"
                }),
                icon: 'IconStatusChange',
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: "'DRAFT'",
                options: [
                    {
                        id: '20202020-e3fe-4308-bb57-931bb8098aa0',
                        value: 'DRAFT',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "eneWvv",
                            message: "Draft"
                        }),
                        position: 0,
                        color: 'yellow'
                    },
                    {
                        id: '20202020-e9da-428f-8499-bce1b020660b',
                        value: 'ACTIVE',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "F6pfE9",
                            message: "Active"
                        }),
                        position: 1,
                        color: 'green'
                    },
                    {
                        id: '20202020-e48d-4159-980d-2cc1235fc918',
                        value: 'DEACTIVATED',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "yAT3be",
                            message: "Deactivated"
                        }),
                        position: 2,
                        color: 'orange'
                    },
                    {
                        id: '20202020-5e5e-48fe-bcd6-7688ec280b30',
                        value: 'ARCHIVED',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "TdfEV7",
                            message: "Archived"
                        }),
                        position: 3,
                        color: 'gray'
                    }
                ]
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
                    id: "9l+pJT",
                    message: "Workflow version position"
                }),
                icon: 'IconHierarchy2',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: 0
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
                isUIReadOnly: true,
                settings: {
                    generatedType: 'STORED',
                    asExpression: (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)(_workflowversionworkspaceentity.SEARCH_FIELDS_FOR_WORKFLOW_VERSIONS)
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        workflow: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'workflow',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "bLt/0J",
                    message: "Workflow"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "b4kire",
                    message: "WorkflowVersion workflow"
                }),
                icon: 'IconSettingsAutomation',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'workflow',
                targetFieldName: 'versions',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.CASCADE,
                    joinColumnName: 'workflowId'
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        runs: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'runs',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Tpm2G9",
                    message: "Runs"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "9nOy7k",
                    message: "Workflow runs linked to the version."
                }),
                icon: 'IconRun',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'workflowRun',
                targetFieldName: 'workflowVersion',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        timelineActivities: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'timelineActivities',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "az1boY",
                    message: "Timeline Activities"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "N9HMa/",
                    message: "Timeline activities linked to the version"
                }),
                icon: 'IconTimelineEvent',
                isNullable: false,
                isUIReadOnly: true,
                targetObjectName: 'timelineActivity',
                targetFieldName: 'targetWorkflowVersion',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        })
    });

//# sourceMappingURL=compute-workflow-version-standard-flat-field-metadata.util.js.map