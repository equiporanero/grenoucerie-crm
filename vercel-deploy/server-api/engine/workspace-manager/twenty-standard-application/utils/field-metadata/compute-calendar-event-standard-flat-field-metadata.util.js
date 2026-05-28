"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCalendarEventStandardFlatFieldMetadatas", {
    enumerable: true,
    get: function() {
        return buildCalendarEventStandardFlatFieldMetadatas;
    }
});
const _i18nlabelutil = require("../i18n-label.util");
const _types = require("twenty-shared/types");
const _createstandardfieldflatmetadatautil = require("./create-standard-field-flat-metadata.util");
const _createstandardrelationfieldflatmetadatautil = require("./create-standard-relation-field-flat-metadata.util");
const _gettsvectorcolumnexpressionutil = require("../../../utils/get-ts-vector-column-expression.util");
const _calendareventworkspaceentity = require("../../../../../modules/calendar/common/standard-objects/calendar-event.workspace-entity");
const buildCalendarEventStandardFlatFieldMetadatas = ({ now, objectName, workspaceId, standardObjectMetadataRelatedEntityIds, dependencyFlatEntityMaps, twentyStandardApplicationId })=>({
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
                    id: "u0R1Ba",
                    message: "Calendar event record position"
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
                    asExpression: (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)(_calendareventworkspaceentity.SEARCH_FIELDS_FOR_CALENDAR_EVENT)
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        title: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'title',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "MHrjPM",
                    message: "Title"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "MHrjPM",
                    message: "Title"
                }),
                icon: 'IconH1',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        isCanceled: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'isCanceled',
                type: _types.FieldMetadataType.BOOLEAN,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "grHYXZ",
                    message: "Is canceled"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "grHYXZ",
                    message: "Is canceled"
                }),
                icon: 'IconCalendarCancel',
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: false
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        isFullDay: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'isFullDay',
                type: _types.FieldMetadataType.BOOLEAN,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "uBx1xd",
                    message: "Is Full Day"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "uBx1xd",
                    message: "Is Full Day"
                }),
                icon: 'IconHours24',
                isNullable: false,
                isUIReadOnly: true,
                defaultValue: false
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        startsAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'startsAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "D3iCkb",
                    message: "Start Date"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "D3iCkb",
                    message: "Start Date"
                }),
                icon: 'IconCalendarClock',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        endsAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'endsAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "VFv2ZC",
                    message: "End Date"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "VFv2ZC",
                    message: "End Date"
                }),
                icon: 'IconCalendarClock',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        externalCreatedAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'externalCreatedAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "CJXWmO",
                    message: "Creation DateTime"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "CJXWmO",
                    message: "Creation DateTime"
                }),
                icon: 'IconCalendarPlus',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        externalUpdatedAt: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'externalUpdatedAt',
                type: _types.FieldMetadataType.DATE_TIME,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "0gY5lO",
                    message: "Update DateTime"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "0gY5lO",
                    message: "Update DateTime"
                }),
                icon: 'IconCalendarCog',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        description: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'description',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Nu4oKW",
                    message: "Description"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Nu4oKW",
                    message: "Description"
                }),
                icon: 'IconFileDescription',
                isNullable: true,
                isUIReadOnly: true,
                settings: {
                    displayedMaxRows: 99
                }
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        location: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'location',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wJijgU",
                    message: "Location"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "wJijgU",
                    message: "Location"
                }),
                icon: 'IconMapPin',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        iCalUid: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'iCalUid',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "NNJnBi",
                    message: "iCal UID"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "NNJnBi",
                    message: "iCal UID"
                }),
                icon: 'IconKey',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        conferenceSolution: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'conferenceSolution',
                type: _types.FieldMetadataType.TEXT,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "AgktVC",
                    message: "Conference Solution"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "AgktVC",
                    message: "Conference Solution"
                }),
                icon: 'IconScreenShare',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        conferenceLink: (0, _createstandardfieldflatmetadatautil.createStandardFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                fieldName: 'conferenceLink',
                type: _types.FieldMetadataType.LINKS,
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "EnfPm2",
                    message: "Meet Link"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "EnfPm2",
                    message: "Meet Link"
                }),
                icon: 'IconLink',
                isNullable: true,
                isUIReadOnly: true
            },
            standardObjectMetadataRelatedEntityIds,
            dependencyFlatEntityMaps,
            twentyStandardApplicationId,
            now
        }),
        calendarChannelEventAssociations: (0, _createstandardrelationfieldflatmetadatautil.createStandardRelationFieldFlatMetadata)({
            objectName,
            workspaceId,
            context: {
                type: _types.FieldMetadataType.RELATION,
                morphId: null,
                fieldName: 'calendarChannelEventAssociations',
                label: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "kYNT3F",
                    message: "Calendar Channel Event Associations"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "kYNT3F",
                    message: "Calendar Channel Event Associations"
                }),
                icon: 'IconCalendar',
                isNullable: false,
                isUIReadOnly: true,
                targetObjectName: 'calendarChannelEventAssociation',
                targetFieldName: 'calendarEvent',
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
                    id: "aicVfT",
                    message: "Event Participants"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "aicVfT",
                    message: "Event Participants"
                }),
                icon: 'IconUserCircle',
                isNullable: false,
                isUIReadOnly: true,
                targetObjectName: 'calendarEventParticipant',
                targetFieldName: 'calendarEvent',
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

//# sourceMappingURL=compute-calendar-event-standard-flat-field-metadata.util.js.map