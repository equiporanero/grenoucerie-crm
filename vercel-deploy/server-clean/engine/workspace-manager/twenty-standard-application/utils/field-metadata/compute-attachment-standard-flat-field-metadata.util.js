"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildAttachmentStandardFlatFieldMetadatas", {
    enumerable: true,
    get: function() {
        return buildAttachmentStandardFlatFieldMetadatas;
    }
});
const _i18nlabelutil = require("../i18n-label.util");
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _createstandardfieldflatmetadatautil = require("./create-standard-field-flat-metadata.util");
const _createstandardrelationfieldflatmetadatautil = require("./create-standard-relation-field-flat-metadata.util");
const _gettsvectorcolumnexpressionutil = require("../../../utils/get-ts-vector-column-expression.util");
const _attachmentworkspaceentity = require("../../../../../modules/attachment/standard-objects/attachment.workspace-entity");
const buildAttachmentStandardFlatFieldMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
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
        // Attachment-specific fields
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
                    id: "wjocwa",
                    message: "Attachment name"
                }),
                icon: 'IconFileUpload',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        file: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'file',
                type: _types.FieldMetadataType.FILES,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "J2eKUI",
                    message: "File"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "btKdFz",
                    message: "Attachment file"
                }),
                icon: 'IconFileUpload',
                isNullable: true,
                isUIReadOnly: true,
                settings: {
                    maxNumberOfValues: 1
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        //deprecated
        fullPath: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'fullPath',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "oQA+cA",
                    message: "Full path"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "gfGYcl",
                    message: "Attachment full path"
                }),
                icon: 'IconLink',
                isSystem: true,
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        //deprecated
        fileCategory: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'fileCategory',
                type: _types.FieldMetadataType.SELECT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "i+AQUz",
                    message: "File category"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "u3pBxa",
                    message: "Attachment file category"
                }),
                icon: 'IconList',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: "'OTHER'",
                options: [
                    {
                        id: '20202020-11bb-4a52-b1f2-2159b07eec37',
                        value: 'ARCHIVE',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "B495Gs",
                            message: "Archive"
                        }),
                        position: 0,
                        color: 'gray'
                    },
                    {
                        id: '20202020-ac54-475d-ab0d-e250c28da774',
                        value: 'AUDIO',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "/rTz0M",
                            message: "Audio"
                        }),
                        position: 1,
                        color: 'pink'
                    },
                    {
                        id: '20202020-66f7-41ba-81ad-f3371312247f',
                        value: 'IMAGE',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "hG89Ed",
                            message: "Image"
                        }),
                        position: 2,
                        color: 'yellow'
                    },
                    {
                        id: '20202020-6113-4e3b-84e3-c617e9f25d0c',
                        value: 'PRESENTATION',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "FOoDGS",
                            message: "Presentation"
                        }),
                        position: 3,
                        color: 'orange'
                    },
                    {
                        id: '20202020-44c1-47c7-8e66-e63558d7233f',
                        value: 'SPREADSHEET',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "jAoGz1",
                            message: "Spreadsheet"
                        }),
                        position: 4,
                        color: 'turquoise'
                    },
                    {
                        id: '20202020-cf07-4843-877e-3804cde801d1',
                        value: 'TEXT_DOCUMENT',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "39/rgD",
                            message: "Text Document"
                        }),
                        position: 5,
                        color: 'blue'
                    },
                    {
                        id: '20202020-443b-4159-a434-5fd9fc327639',
                        value: 'VIDEO',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "vSJd18",
                            message: "Video"
                        }),
                        position: 6,
                        color: 'purple'
                    },
                    {
                        id: '20202020-bbca-4802-9146-fd1503e94e58',
                        value: 'OTHER',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "/IX/7x",
                            message: "Other"
                        }),
                        position: 7,
                        color: 'gray'
                    }
                ]
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
                    id: "F990we",
                    message: "Attachment record position"
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
                    asExpression: (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)(_attachmentworkspaceentity.SEARCH_FIELDS_FOR_ATTACHMENT)
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        // Relation fields
        targetTask: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.attachment.morphIds.targetMorphId.morphId,
                fieldName: 'targetTask',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "RWMEBF",
                    message: "Attachment target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'task',
                targetFieldName: 'attachments',
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
        targetNote: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.attachment.morphIds.targetMorphId.morphId,
                fieldName: 'targetNote',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "RWMEBF",
                    message: "Attachment target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'note',
                targetFieldName: 'attachments',
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
        targetPerson: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.MORPH_RELATION,
                morphId: _metadata.STANDARD_OBJECTS.attachment.morphIds.targetMorphId.morphId,
                fieldName: 'targetPerson',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "RWMEBF",
                    message: "Attachment target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'person',
                targetFieldName: 'attachments',
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
                morphId: _metadata.STANDARD_OBJECTS.attachment.morphIds.targetMorphId.morphId,
                fieldName: 'targetCompany',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "RWMEBF",
                    message: "Attachment target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'company',
                targetFieldName: 'attachments',
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
                morphId: _metadata.STANDARD_OBJECTS.attachment.morphIds.targetMorphId.morphId,
                fieldName: 'targetOpportunity',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "RWMEBF",
                    message: "Attachment target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'opportunity',
                targetFieldName: 'attachments',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.CASCADE,
                    joinColumnName: 'targetOpportunityId'
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
                morphId: _metadata.STANDARD_OBJECTS.attachment.morphIds.targetMorphId.morphId,
                fieldName: 'targetDashboard',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "RWMEBF",
                    message: "Attachment target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'dashboard',
                targetFieldName: 'attachments',
                settings: {
                    relationType: _types.RelationType.MANY_TO_ONE,
                    onDelete: _types.RelationOnDeleteAction.CASCADE,
                    joinColumnName: 'targetDashboardId'
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
                morphId: _metadata.STANDARD_OBJECTS.attachment.morphIds.targetMorphId.morphId,
                fieldName: 'targetWorkflow',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Yrrg+y",
                    message: "Target"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "RWMEBF",
                    message: "Attachment target"
                }),
                icon: 'IconArrowUpRight',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'workflow',
                targetFieldName: 'attachments',
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
        })
    });

//# sourceMappingURL=compute-attachment-standard-flat-field-metadata.util.js.map