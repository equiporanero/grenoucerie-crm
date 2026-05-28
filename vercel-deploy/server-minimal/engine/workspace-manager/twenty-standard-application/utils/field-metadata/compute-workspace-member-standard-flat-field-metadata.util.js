"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildWorkspaceMemberStandardFlatFieldMetadatas", {
    enumerable: true,
    get: function() {
        return buildWorkspaceMemberStandardFlatFieldMetadatas;
    }
});
const _i18nlabelutil = require("../i18n-label.util");
const _types = require("twenty-shared/types");
const _createstandardfieldflatmetadatautil = require("./create-standard-field-flat-metadata.util");
const _createstandardrelationfieldflatmetadatautil = require("./create-standard-relation-field-flat-metadata.util");
const _gettsvectorcolumnexpressionutil = require("../../../utils/get-ts-vector-column-expression.util");
const _workspacememberworkspaceentity = require("../../../../../modules/workspace-member/standard-objects/workspace-member.workspace-entity");
const buildWorkspaceMemberStandardFlatFieldMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
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
                    id: "NiUpuN",
                    message: "Workspace member position"
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
        name: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'name',
                type: _types.FieldMetadataType.FULL_NAME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "6YtxFj",
                    message: "Name"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "5VCX7o",
                    message: "Workspace member name"
                }),
                icon: 'IconCircleUser',
                isNullable: false,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        colorScheme: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'colorScheme',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "96YB1a",
                    message: "Color Scheme"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "TTHIbk",
                    message: "Preferred color scheme"
                }),
                icon: 'IconColorSwatch',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: "'System'"
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        locale: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'locale',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "vXIe7J",
                    message: "Language"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "5v4qYi",
                    message: "Preferred language"
                }),
                icon: 'IconLanguage',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: "'en'"
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        avatarUrl: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'avatarUrl',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "S/mJUR",
                    message: "Avatar Url"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "R1S9pO",
                    message: "Workspace member avatar"
                }),
                icon: 'IconFileUpload',
                isSystem: true,
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        userEmail: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'userEmail',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "YFciqL",
                    message: "User Email"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "2LpFdR",
                    message: "Related user email address"
                }),
                icon: 'IconMail',
                isSystem: true,
                isNullable: true,
                isUIReadOnly: true,
                isUnique: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        calendarStartDay: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'calendarStartDay',
                type: _types.FieldMetadataType.NUMBER,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "amGzX5",
                    message: "Start of the week"
                }),
                description: "User's preferred start day of the week",
                icon: 'IconCalendar',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: 7,
                settings: {
                    dataType: _types.NumberDataType.INT
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        userId: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'userId',
                type: _types.FieldMetadataType.UUID,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "d1BTW8",
                    message: "User Id"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Max2GU",
                    message: "Associated User Id"
                }),
                icon: 'IconCircleUsers',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        timeZone: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'timeZone',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Mz2JN2",
                    message: "Time zone"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "4juE7s",
                    message: "User time zone"
                }),
                icon: 'IconTimezone',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: "'system'"
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        dateFormat: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'dateFormat',
                type: _types.FieldMetadataType.SELECT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Lhd0oQ",
                    message: "Date format"
                }),
                description: "User's preferred date format",
                icon: 'IconCalendarEvent',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: "'SYSTEM'",
                options: [
                    {
                        id: '20202020-4b6a-4a08-8506-09bd59ef118e',
                        value: 'SYSTEM',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "D+NlUC",
                            message: "System"
                        }),
                        position: 0,
                        color: 'turquoise'
                    },
                    {
                        id: '20202020-6981-4e21-bb11-43ac1081be04',
                        value: 'MONTH_FIRST',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "Er0m61",
                            message: "Month First"
                        }),
                        position: 1,
                        color: 'red'
                    },
                    {
                        id: '20202020-bf56-4199-b013-27ee921d046d',
                        value: 'DAY_FIRST',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "yiROdD",
                            message: "Day First"
                        }),
                        position: 2,
                        color: 'purple'
                    },
                    {
                        id: '20202020-fd23-47d3-b01d-0479c11e5a2d',
                        value: 'YEAR_FIRST',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "eTlYxu",
                            message: "Year First"
                        }),
                        position: 3,
                        color: 'sky'
                    }
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        timeFormat: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'timeFormat',
                type: _types.FieldMetadataType.SELECT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "n9nSNJ",
                    message: "Time format"
                }),
                description: "User's preferred time format",
                icon: 'IconClock2',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: "'SYSTEM'",
                options: [
                    {
                        id: '20202020-349f-4ff8-82be-3eb52e7ec5f5',
                        value: 'SYSTEM',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "D+NlUC",
                            message: "System"
                        }),
                        position: 0,
                        color: 'sky'
                    },
                    {
                        id: '20202020-592c-4e33-a457-f4dcde59a3fc',
                        value: 'HOUR_24',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "iMVAB9",
                            message: "24HRS"
                        }),
                        position: 1,
                        color: 'red'
                    },
                    {
                        id: '20202020-151c-43c2-a463-5bc42e5ce434',
                        value: 'HOUR_12',
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "0eYXBl",
                            message: "12HRS"
                        }),
                        position: 2,
                        color: 'purple'
                    }
                ]
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        numberFormat: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'numberFormat',
                type: _types.FieldMetadataType.SELECT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "bR2sEm",
                    message: "Number format"
                }),
                description: "User's preferred number format",
                icon: 'IconNumbers',
                isSystem: true,
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: `'${_workspacememberworkspaceentity.WorkspaceMemberNumberFormatEnum.SYSTEM}'`,
                options: [
                    {
                        id: '20202020-8b5b-4cee-8449-ca48d7c65c11',
                        value: _workspacememberworkspaceentity.WorkspaceMemberNumberFormatEnum.SYSTEM,
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "D+NlUC",
                            message: "System"
                        }),
                        position: 0,
                        color: 'turquoise'
                    },
                    {
                        id: '20202020-657d-409b-9c2a-d8c3b8842859',
                        value: _workspacememberworkspaceentity.WorkspaceMemberNumberFormatEnum.COMMAS_AND_DOT,
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "QeCopv",
                            message: "Commas and dot"
                        }),
                        position: 1,
                        color: 'blue'
                    },
                    {
                        id: '20202020-8703-4475-a92b-42e631851d8b',
                        value: _workspacememberworkspaceentity.WorkspaceMemberNumberFormatEnum.SPACES_AND_COMMA,
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "xqlr9R",
                            message: "Spaces and comma"
                        }),
                        position: 2,
                        color: 'green'
                    },
                    {
                        id: '20202020-2ea4-4b99-b72b-bebac01fd7db',
                        value: _workspacememberworkspaceentity.WorkspaceMemberNumberFormatEnum.DOTS_AND_COMMA,
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "Wm78zZ",
                            message: "Dots and comma"
                        }),
                        position: 3,
                        color: 'orange'
                    },
                    {
                        id: '20202020-9d07-4353-8ce9-d067d639abf5',
                        value: _workspacememberworkspaceentity.WorkspaceMemberNumberFormatEnum.APOSTROPHE_AND_DOT,
                        label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                            id: "0UMxlw",
                            message: "Apostrophe and dot"
                        }),
                        position: 4,
                        color: 'purple'
                    }
                ]
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
                    asExpression: (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)(_workspacememberworkspaceentity.SEARCH_FIELDS_FOR_WORKSPACE_MEMBER)
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        assignedTasks: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'assignedTasks',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Ek7xGj",
                    message: "Assigned tasks"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "HlDeG3",
                    message: "Tasks assigned to the workspace member"
                }),
                icon: 'IconCheckbox',
                isNullable: false,
                isUIReadOnly: true,
                targetObjectName: 'task',
                targetFieldName: 'assignee',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        accountOwnerForCompanies: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'accountOwnerForCompanies',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "HZosRi",
                    message: "Account Owner For Companies"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "loqL/f",
                    message: "Account owner for companies"
                }),
                icon: 'IconBriefcase',
                isNullable: false,
                isUIReadOnly: true,
                targetObjectName: 'company',
                targetFieldName: 'accountOwner',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        messageParticipants: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'messageParticipants',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "FhIFx7",
                    message: "Message Participants"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "FhIFx7",
                    message: "Message Participants"
                }),
                icon: 'IconUserCircle',
                isNullable: false,
                isUIReadOnly: true,
                targetObjectName: 'messageParticipant',
                targetFieldName: 'workspaceMember',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        blocklist: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'blocklist',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "K1172m",
                    message: "Blocklist"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Tv2hxv",
                    message: "Blocklisted handles"
                }),
                icon: 'IconForbid2',
                isNullable: false,
                isUIReadOnly: true,
                targetObjectName: 'blocklist',
                targetFieldName: 'workspaceMember',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        calendarEventParticipants: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'calendarEventParticipants',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "ZI2UyM",
                    message: "Calendar Event Participants"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "ZI2UyM",
                    message: "Calendar Event Participants"
                }),
                icon: 'IconCalendar',
                isNullable: false,
                isUIReadOnly: true,
                targetObjectName: 'calendarEventParticipant',
                targetFieldName: 'workspaceMember',
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
                    id: "tst44n",
                    message: "Events"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "3/O8MM",
                    message: "Events linked to the workspace member"
                }),
                icon: 'IconTimelineEvent',
                isNullable: true,
                isUIReadOnly: true,
                targetObjectName: 'timelineActivity',
                targetFieldName: 'workspaceMember',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        ownedOpportunities: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'ownedOpportunities',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "6ua+9g",
                    message: "Owned opportunities"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "zvf8hK",
                    message: "Opportunities owned by the workspace member"
                }),
                icon: 'IconTargetArrow',
                isNullable: false,
                isUIReadOnly: true,
                targetObjectName: 'opportunity',
                targetFieldName: 'owner',
                settings: {
                    relationType: _types.RelationType.ONE_TO_MANY
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
        })
    });

//# sourceMappingURL=compute-workspace-member-standard-flat-field-metadata.util.js.map