"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "STANDARD_FLAT_OBJECT_METADATA_BUILDERS_BY_OBJECT_NAME", {
    enumerable: true,
    get: function() {
        return STANDARD_FLAT_OBJECT_METADATA_BUILDERS_BY_OBJECT_NAME;
    }
});
const _metadata = require("twenty-shared/metadata");
const _i18nlabelutil = require("../i18n-label.util");
const _createstandardobjectflatmetadatautil = require("./create-standard-object-flat-metadata.util");
const STANDARD_FLAT_OBJECT_METADATA_BUILDERS_BY_OBJECT_NAME = {
    attachment: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'attachment',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.attachment.universalIdentifier,
                nameSingular: 'attachment',
                namePlural: 'attachments',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "UY1vmE",
                    message: "Attachment"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "w/Sphq",
                    message: "Attachments"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "MjyFvC",
                    message: "An attachment"
                }),
                icon: 'IconFileImport',
                isSystem: true,
                labelIdentifierFieldMetadataName: 'name'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    blocklist: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'blocklist',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.blocklist.universalIdentifier,
                nameSingular: 'blocklist',
                namePlural: 'blocklists',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "K1172m",
                    message: "Blocklist"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "L5JhJe",
                    message: "Blocklists"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "K1172m",
                    message: "Blocklist"
                }),
                icon: 'IconForbid2',
                isSystem: true,
                labelIdentifierFieldMetadataName: 'handle'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    calendarChannelEventAssociation: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'calendarChannelEventAssociation',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.calendarChannelEventAssociation.universalIdentifier,
                nameSingular: 'calendarChannelEventAssociation',
                namePlural: 'calendarChannelEventAssociations',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "jfNQ0m",
                    message: "Calendar Channel Event Association"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "kYNT3F",
                    message: "Calendar Channel Event Associations"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "kYNT3F",
                    message: "Calendar Channel Event Associations"
                }),
                icon: 'IconCalendar',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'id'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    calendarEventParticipant: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'calendarEventParticipant',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.calendarEventParticipant.universalIdentifier,
                nameSingular: 'calendarEventParticipant',
                namePlural: 'calendarEventParticipants',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "N2kMfO",
                    message: "Calendar event participant"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "AWDqkQ",
                    message: "Calendar event participants"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "AWDqkQ",
                    message: "Calendar event participants"
                }),
                icon: 'IconCalendar',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'handle'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    calendarEvent: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'calendarEvent',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.calendarEvent.universalIdentifier,
                nameSingular: 'calendarEvent',
                namePlural: 'calendarEvents',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "bRk+FR",
                    message: "Calendar event"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "X9A2xC",
                    message: "Calendar events"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "X9A2xC",
                    message: "Calendar events"
                }),
                icon: 'IconCalendar',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'title'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    company: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'company',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.company.universalIdentifier,
                nameSingular: 'company',
                namePlural: 'companies',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "7i8j3G",
                    message: "Company"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "s2QZS6",
                    message: "Companies"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "kZR6+h",
                    message: "A company"
                }),
                icon: 'IconBuildingSkyscraper',
                isSearchable: true,
                shortcut: 'C',
                duplicateCriteria: [
                    [
                        'name'
                    ],
                    [
                        'domainNamePrimaryLinkUrl'
                    ]
                ],
                labelIdentifierFieldMetadataName: 'name'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    dashboard: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'dashboard',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.dashboard.universalIdentifier,
                nameSingular: 'dashboard',
                namePlural: 'dashboards',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "7p5kLi",
                    message: "Dashboard"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "w6iIMm",
                    message: "Dashboards"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "cOSBjW",
                    message: "A dashboard"
                }),
                icon: 'IconLayoutDashboard',
                isSearchable: true,
                shortcut: 'D',
                labelIdentifierFieldMetadataName: 'title'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    messageChannelMessageAssociation: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'messageChannelMessageAssociation',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.messageChannelMessageAssociation.universalIdentifier,
                nameSingular: 'messageChannelMessageAssociation',
                namePlural: 'messageChannelMessageAssociations',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "disipM",
                    message: "Message Channel Message Association"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "ijQY3P",
                    message: "Message Channel Message Associations"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "IC5A8V",
                    message: "Message Synced with a Message Channel"
                }),
                icon: 'IconMessage',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'id'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    messageChannelMessageAssociationMessageFolder: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'messageChannelMessageAssociationMessageFolder',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.messageChannelMessageAssociationMessageFolder.universalIdentifier,
                nameSingular: 'messageChannelMessageAssociationMessageFolder',
                namePlural: 'messageChannelMessageAssociationMessageFolders',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "3BMS+k",
                    message: "Message Channel Message Association Message Folder"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "5RRTyw",
                    message: "Message Channel Message Association Message Folders"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "6pkAO8",
                    message: "Join table linking message channel message associations to message folders"
                }),
                icon: 'IconFolder',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'id'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    messageParticipant: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'messageParticipant',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.messageParticipant.universalIdentifier,
                nameSingular: 'messageParticipant',
                namePlural: 'messageParticipants',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "IUmVwu",
                    message: "Message Participant"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "FhIFx7",
                    message: "Message Participants"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "FhIFx7",
                    message: "Message Participants"
                }),
                icon: 'IconUserCircle',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'handle'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    messageThread: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'messageThread',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.messageThread.universalIdentifier,
                nameSingular: 'messageThread',
                namePlural: 'messageThreads',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "de2nM/",
                    message: "Message Thread"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "RD0ecC",
                    message: "Message Threads"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "de2nM/",
                    message: "Message Thread"
                }),
                icon: 'IconMessage',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'subject'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    message: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'message',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.message.universalIdentifier,
                nameSingular: 'message',
                namePlural: 'messages',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "xDAtGP",
                    message: "Message"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "t7TeQU",
                    message: "Messages"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "xDAtGP",
                    message: "Message"
                }),
                icon: 'IconMessage',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'subject'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    note: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'note',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.note.universalIdentifier,
                nameSingular: 'note',
                namePlural: 'notes',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "KiJn9B",
                    message: "Note"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "1DBGsz",
                    message: "Notes"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "bufuBA",
                    message: "A note"
                }),
                icon: 'IconNotes',
                isSearchable: true,
                shortcut: 'N',
                labelIdentifierFieldMetadataName: 'title'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    noteTarget: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'noteTarget',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.noteTarget.universalIdentifier,
                nameSingular: 'noteTarget',
                namePlural: 'noteTargets',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "spaO7l",
                    message: "Note Target"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "tD4BxK",
                    message: "Note Targets"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "6kUkZW",
                    message: "A note target"
                }),
                icon: 'IconCheckbox',
                isSystem: true,
                labelIdentifierFieldMetadataName: 'id'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    opportunity: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'opportunity',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.opportunity.universalIdentifier,
                nameSingular: 'opportunity',
                namePlural: 'opportunities',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "SV/iis",
                    message: "Opportunity"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "4MyDFl",
                    message: "Opportunities"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "bZq8rL",
                    message: "An opportunity"
                }),
                icon: 'IconTargetArrow',
                isSearchable: true,
                shortcut: 'O',
                labelIdentifierFieldMetadataName: 'name'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    person: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'person',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.person.universalIdentifier,
                nameSingular: 'person',
                namePlural: 'people',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "OZdaTZ",
                    message: "Person"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "1wdjme",
                    message: "People"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Io42ej",
                    message: "A person"
                }),
                icon: 'IconUser',
                isSearchable: true,
                shortcut: 'P',
                duplicateCriteria: [
                    [
                        'nameFirstName',
                        'nameLastName'
                    ],
                    [
                        'linkedinLinkPrimaryLinkUrl'
                    ],
                    [
                        'emailsPrimaryEmail'
                    ]
                ],
                labelIdentifierFieldMetadataName: 'name',
                imageIdentifierFieldMetadataName: 'avatarUrl'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    task: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'task',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.task.universalIdentifier,
                nameSingular: 'task',
                namePlural: 'tasks',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Q3P/4s",
                    message: "Task"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "GtycJ/",
                    message: "Tasks"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "mkFXEH",
                    message: "A task"
                }),
                icon: 'IconCheckbox',
                isSearchable: true,
                shortcut: 'T',
                labelIdentifierFieldMetadataName: 'title'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    taskTarget: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'taskTarget',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.taskTarget.universalIdentifier,
                nameSingular: 'taskTarget',
                namePlural: 'taskTargets',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "WSiiWf",
                    message: "Task Target"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "836FiO",
                    message: "Task Targets"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "hk2NzW",
                    message: "A task target"
                }),
                icon: 'IconCheckbox',
                isSystem: true,
                labelIdentifierFieldMetadataName: 'id'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    timelineActivity: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'timelineActivity',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.timelineActivity.universalIdentifier,
                nameSingular: 'timelineActivity',
                namePlural: 'timelineActivities',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "K/kU4E",
                    message: "Timeline Activity"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "az1boY",
                    message: "Timeline Activities"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "W58PBh",
                    message: "Aggregated / filtered event to be displayed on the timeline"
                }),
                icon: 'IconTimelineEvent',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'name'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    workflow: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'workflow',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.workflow.universalIdentifier,
                nameSingular: 'workflow',
                namePlural: 'workflows',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "bLt/0J",
                    message: "Workflow"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "woYYQq",
                    message: "Workflows"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "ZIN9Ga",
                    message: "A workflow"
                }),
                icon: 'IconSettingsAutomation',
                isSearchable: true,
                shortcut: 'W',
                labelIdentifierFieldMetadataName: 'name'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    workflowAutomatedTrigger: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'workflowAutomatedTrigger',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.workflowAutomatedTrigger.universalIdentifier,
                nameSingular: 'workflowAutomatedTrigger',
                namePlural: 'workflowAutomatedTriggers',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "Fd5Tey",
                    message: "Workflow Automated Trigger"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "9h8c8+",
                    message: "Workflow Automated Triggers"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "YwBCp8",
                    message: "A workflow automated trigger"
                }),
                icon: 'IconSettingsAutomation',
                isSystem: true,
                labelIdentifierFieldMetadataName: 'id'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    workflowRun: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'workflowRun',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.workflowRun.universalIdentifier,
                nameSingular: 'workflowRun',
                namePlural: 'workflowRuns',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "5vIcqC",
                    message: "Workflow Run"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "u6DF/V",
                    message: "Workflow Runs"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "1+xDbI",
                    message: "A workflow run"
                }),
                icon: 'IconHistoryToggle',
                isSystem: true,
                isAuditLogged: false,
                labelIdentifierFieldMetadataName: 'name'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    workflowVersion: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'workflowVersion',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.workflowVersion.universalIdentifier,
                nameSingular: 'workflowVersion',
                namePlural: 'workflowVersions',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "+wYPET",
                    message: "Workflow Version"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "OCyhkn",
                    message: "Workflow Versions"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "N0g7rp",
                    message: "A workflow version"
                }),
                icon: 'IconVersions',
                isSystem: true,
                labelIdentifierFieldMetadataName: 'name'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        }),
    workspaceMember: ({ now, workspaceId, standardObjectMetadataRelatedEntityIds, twentyStandardApplicationId, dependencyFlatEntityMaps })=>(0, _createstandardobjectflatmetadatautil.createStandardObjectFlatMetadata)({
            objectName: 'workspaceMember',
            dependencyFlatEntityMaps,
            context: {
                universalIdentifier: _metadata.STANDARD_OBJECTS.workspaceMember.universalIdentifier,
                nameSingular: 'workspaceMember',
                namePlural: 'workspaceMembers',
                labelSingular: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "qc38qR",
                    message: "Workspace Member"
                }),
                labelPlural: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "YCAEr+",
                    message: "Workspace Members"
                }),
                description: (0, _i18nlabelutil.i18nLabel)(/*i18n*/ {
                    id: "HpZ/I5",
                    message: "A workspace member"
                }),
                icon: 'IconUserCircle',
                isSystem: true,
                isSearchable: true,
                labelIdentifierFieldMetadataName: 'name',
                imageIdentifierFieldMetadataName: 'avatarUrl'
            },
            workspaceId,
            standardObjectMetadataRelatedEntityIds,
            twentyStandardApplicationId,
            now
        })
};

//# sourceMappingURL=create-standard-flat-object-metadata.util.js.map