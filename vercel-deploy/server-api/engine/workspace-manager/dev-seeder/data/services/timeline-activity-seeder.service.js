"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineActivitySeederService", {
    enumerable: true,
    get: function() {
        return TimelineActivitySeederService;
    }
});
const _common = require("@nestjs/common");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _utils = require("twenty-shared/utils");
const _objectmetadataservice = require("../../../../metadata-modules/object-metadata/object-metadata.service");
const _calendareventdataseedsconstant = require("../constants/calendar-event-data-seeds.constant");
const _calendareventparticipantdataseedsconstant = require("../constants/calendar-event-participant-data-seeds.constant");
const _companydataseedsconstant = require("../constants/company-data-seeds.constant");
const _messagedataseedsconstant = require("../constants/message-data-seeds.constant");
const _messageparticipantdataseedsconstant = require("../constants/message-participant-data-seeds.constant");
const _notedataseedsconstant = require("../constants/note-data-seeds.constant");
const _notetargetdataseedsconstant = require("../constants/note-target-data-seeds.constant");
const _opportunitydataseedsconstant = require("../constants/opportunity-data-seeds.constant");
const _persondataseedsconstant = require("../constants/person-data-seeds.constant");
const _taskdataseedsconstant = require("../constants/task-data-seeds.constant");
const _tasktargetdataseedsconstant = require("../constants/task-target-data-seeds.constant");
const _workspacememberdataseedsconstant = require("../constants/workspace-member-data-seeds.constant");
const _timelineactivityrelatedmorphfieldmetadatanamebuilderutil = require("../../../../../modules/timeline/utils/timeline-activity-related-morph-field-metadata-name-builder.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TimelineActivitySeederService = class TimelineActivitySeederService {
    getLinkedActivityName(activityType) {
        // Notes and tasks use the legacy format: linked-{type}.created
        if (activityType === 'note' || activityType === 'task') {
            return `linked-${activityType}.created`;
        }
        // Calendar events and messages use the new format: {type}.linked
        return `${activityType}.linked`;
    }
    async seedTimelineActivities({ entityManager, schemaName, workspaceId }) {
        // Get workspace-specific participant data
        const calendarEventParticipants = (0, _calendareventparticipantdataseedsconstant.getCalendarEventParticipantDataSeeds)(workspaceId);
        const messageParticipants = (0, _messageparticipantdataseedsconstant.getMessageParticipantDataSeeds)(workspaceId);
        const timelineActivities = [];
        const metadataIds = await this.getObjectMetadataIds(workspaceId);
        let activityIndex = 0;
        const entityConfigs = [
            {
                type: 'company',
                seeds: _companydataseedsconstant.COMPANY_DATA_SEEDS
            },
            {
                type: 'person',
                seeds: _persondataseedsconstant.PERSON_DATA_SEEDS
            },
            {
                type: 'note',
                seeds: _notedataseedsconstant.NOTE_DATA_SEEDS
            },
            {
                type: 'task',
                seeds: _taskdataseedsconstant.TASK_DATA_SEEDS
            },
            {
                type: 'opportunity',
                seeds: _opportunitydataseedsconstant.OPPORTUNITY_DATA_SEEDS
            }
        ];
        // Calendar events and messages only appear as linked activities
        const linkableConfigs = [
            {
                type: 'calendarEvent',
                seeds: _calendareventdataseedsconstant.CALENDAR_EVENT_DATA_SEEDS
            },
            {
                type: 'message',
                seeds: _messagedataseedsconstant.MESSAGE_DATA_SEEDS
            }
        ];
        entityConfigs.forEach(({ type, seeds })=>{
            seeds.forEach((seed, index)=>{
                const activity = this.createTimelineActivity({
                    entityType: type,
                    recordSeed: seed,
                    index
                });
                timelineActivities.push(activity);
                activityIndex++;
                if (!this.LINKABLE_TYPES.has(type)) {
                    return;
                }
                const linkedObjectMetadataId = this.getLinkedObjectMetadataId(type, metadataIds);
                const linkedActivities = this.computeLinkedTimelineActivityRecords({
                    activityType: type,
                    recordSeed: seed,
                    index,
                    activityIndex,
                    linkedObjectMetadataId,
                    calendarEventParticipants,
                    messageParticipants
                });
                timelineActivities.push(...linkedActivities);
                activityIndex += linkedActivities.length;
            });
        });
        // Create only linked activities for calendar events and messages
        linkableConfigs.forEach(({ type, seeds })=>{
            seeds.forEach((seed, index)=>{
                const linkedObjectMetadataId = this.getLinkedObjectMetadataId(type, metadataIds);
                const linkedActivities = this.computeLinkedTimelineActivityRecords({
                    activityType: type,
                    recordSeed: seed,
                    index,
                    activityIndex,
                    linkedObjectMetadataId,
                    calendarEventParticipants,
                    messageParticipants
                });
                timelineActivities.push(...linkedActivities);
                activityIndex += linkedActivities.length;
            });
        });
        await this.insertTimelineActivities(entityManager, schemaName, timelineActivities);
    }
    getLinkedObjectMetadataId(type, metadataIds) {
        const metadataMap = {
            note: metadataIds.noteMetadataId,
            task: metadataIds.taskMetadataId,
            calendarEvent: metadataIds.calendarEventMetadataId,
            message: metadataIds.messageMetadataId
        };
        return metadataMap[type] || '';
    }
    async insertTimelineActivities(entityManager, schemaName, timelineActivities) {
        if (timelineActivities.length === 0) {
            return;
        }
        const batchSize = 1000;
        const timelineActivityBatches = (0, _lodashchunk.default)(timelineActivities, batchSize);
        for (const batch of timelineActivityBatches){
            await entityManager.createQueryBuilder(undefined, undefined, undefined, {
                shouldBypassPermissionChecks: true
            }).insert().into(`${schemaName}.timelineActivity`, [
                'id',
                'name',
                'properties',
                'linkedRecordCachedName',
                'linkedRecordId',
                'linkedObjectMetadataId',
                'workspaceMemberId',
                'targetNoteId',
                'targetTaskId',
                'targetPersonId',
                'targetCompanyId',
                'targetOpportunityId',
                'createdAt',
                'updatedAt',
                'happensAt'
            ]).orIgnore().values(batch).execute();
        }
    }
    createTimelineActivity({ entityType, recordSeed, index }) {
        const timelineActivityId = this.generateTimelineActivityId(entityType, index + 1);
        const creationDate = new Date().toISOString();
        const recordId = recordSeed.id;
        const timelineActivity = {
            id: timelineActivityId,
            name: `${entityType}.created`,
            properties: JSON.stringify({
                after: this.getEventAfterRecordProperties(entityType, recordSeed)
            }),
            linkedRecordCachedName: '',
            linkedRecordId: recordId,
            linkedObjectMetadataId: null,
            workspaceMemberId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
            targetNoteId: null,
            targetTaskId: null,
            targetPersonId: null,
            targetCompanyId: null,
            targetOpportunityId: null,
            createdAt: creationDate,
            updatedAt: creationDate,
            happensAt: creationDate
        };
        // Set the appropriate target entity ID for entities that have target columns
        const entitiesWithTargetColumns = new Set([
            'note',
            'task',
            'person',
            'company',
            'opportunity'
        ]);
        if (entitiesWithTargetColumns.has(entityType)) {
            const targetIdKey = `${(0, _timelineactivityrelatedmorphfieldmetadatanamebuilderutil.buildTimelineActivityRelatedMorphFieldMetadataName)(entityType)}Id`;
            // @ts-expect-error - This is okay for morph
            timelineActivity[targetIdKey] = recordId;
        }
        return timelineActivity;
    }
    generateTimelineActivityId(type, index) {
        const prefix = '20202020';
        const code = this.ENTITY_CODES[type] || '0000';
        const paddedIndex = String(index).padStart(4, '0');
        return `${prefix}-${code}-4000-8001-${paddedIndex}00000001`;
    }
    getEventAfterRecordProperties(type, recordSeed) {
        const commonProperties = {
            id: recordSeed.id
        };
        const propertyGetters = {
            company: ()=>({
                    ...commonProperties,
                    name: recordSeed.name,
                    domainName: recordSeed.domainNamePrimaryLinkUrl,
                    employees: recordSeed.employees,
                    city: recordSeed.addressAddressCity
                }),
            person: ()=>({
                    ...commonProperties,
                    name: {
                        firstName: recordSeed.nameFirstName,
                        lastName: recordSeed.nameLastName
                    },
                    email: recordSeed.emailsPrimaryEmail,
                    jobTitle: recordSeed.jobTitle
                }),
            note: ()=>({
                    ...commonProperties,
                    title: recordSeed.title,
                    body: recordSeed.body
                }),
            task: ()=>({
                    ...commonProperties,
                    title: recordSeed.title,
                    body: recordSeed.body,
                    status: recordSeed.status,
                    dueAt: recordSeed.dueAt
                }),
            opportunity: ()=>({
                    ...commonProperties,
                    name: recordSeed.name,
                    amount: recordSeed.amountAmountMicros,
                    stage: recordSeed.stage,
                    closeDate: recordSeed.closeDate
                }),
            calendarEvent: ()=>({
                    ...commonProperties,
                    title: recordSeed.title,
                    description: recordSeed.description,
                    startsAt: recordSeed.startsAt,
                    endsAt: recordSeed.endsAt,
                    location: recordSeed.location
                }),
            message: ()=>({
                    ...commonProperties,
                    subject: recordSeed.subject,
                    text: recordSeed.text,
                    receivedAt: recordSeed.receivedAt
                })
        };
        const getter = propertyGetters[type];
        return getter ? getter() : commonProperties;
    }
    computeLinkedTimelineActivityRecords({ activityType, recordSeed, index, activityIndex, linkedObjectMetadataId, calendarEventParticipants, messageParticipants }) {
        const targetInfos = this.getActivityTargetInfos(activityType, recordSeed, calendarEventParticipants, messageParticipants);
        if (targetInfos.length === 0) {
            return [];
        }
        return targetInfos.map((targetInfo, targetIndex)=>this.computeLinkedActivityRecord({
                activityType,
                recordSeed,
                index,
                activityIndex: activityIndex + targetIndex,
                linkedObjectMetadataId,
                targetInfo
            }));
    }
    getActivityTargetInfos(activityType, recordSeed, calendarEventParticipants, messageParticipants) {
        const targetGetters = {
            note: ()=>this.getNoteTargetInfos(recordSeed),
            task: ()=>this.getTaskTargetInfos(recordSeed),
            calendarEvent: ()=>this.getCalendarEventTargetInfos(recordSeed, calendarEventParticipants),
            message: ()=>this.getMessageTargetInfos(recordSeed, messageParticipants)
        };
        const getter = targetGetters[activityType];
        return getter ? getter() : [];
    }
    getNoteTargetInfos(recordSeed) {
        const noteTargetSeed = _notetargetdataseedsconstant.NOTE_TARGET_DATA_SEEDS_MAP.get(recordSeed.id);
        if (!noteTargetSeed) {
            return [];
        }
        const targetChecks = [
            {
                id: noteTargetSeed.targetPersonId,
                type: 'person'
            },
            {
                id: noteTargetSeed.targetCompanyId,
                type: 'company'
            },
            {
                id: noteTargetSeed.targetOpportunityId,
                type: 'opportunity'
            }
        ];
        for (const { id, type } of targetChecks){
            if (id) {
                return [
                    {
                        targetType: type,
                        targetId: id
                    }
                ];
            }
        }
        return [];
    }
    getTaskTargetInfos(recordSeed) {
        const taskTargetSeed = _tasktargetdataseedsconstant.TASK_TARGET_DATA_SEEDS_MAP.get(recordSeed.id);
        if (!taskTargetSeed) {
            return [];
        }
        const targetChecks = [
            {
                id: taskTargetSeed.targetPersonId,
                type: 'person'
            },
            {
                id: taskTargetSeed.targetCompanyId,
                type: 'company'
            },
            {
                id: taskTargetSeed.targetOpportunityId,
                type: 'opportunity'
            }
        ];
        for (const { id, type } of targetChecks){
            if (id) {
                return [
                    {
                        targetType: type,
                        targetId: id
                    }
                ];
            }
        }
        return [];
    }
    getCalendarEventTargetInfos(recordSeed, calendarEventParticipants) {
        const eventParticipants = calendarEventParticipants.filter((participant)=>participant.calendarEventId === recordSeed.id);
        const targetInfos = [];
        eventParticipants.forEach((participant)=>{
            if (participant.personId) {
                targetInfos.push({
                    targetType: 'person',
                    targetId: participant.personId
                });
                const person = _persondataseedsconstant.PERSON_DATA_SEEDS_MAP.get(participant.personId);
                if (person?.companyId) {
                    targetInfos.push({
                        targetType: 'company',
                        targetId: person.companyId
                    });
                }
            }
        });
        return targetInfos;
    }
    getMessageTargetInfos(recordSeed, messageParticipants) {
        const filteredMessageParticipants = messageParticipants.filter((participant)=>participant.messageId === recordSeed.id);
        const targetInfos = [];
        filteredMessageParticipants.forEach((participant)=>{
            if (participant.personId) {
                targetInfos.push({
                    targetType: 'person',
                    targetId: participant.personId
                });
                const person = _persondataseedsconstant.PERSON_DATA_SEEDS_MAP.get(participant.personId);
                if (person?.companyId) {
                    targetInfos.push({
                        targetType: 'company',
                        targetId: person.companyId
                    });
                }
            }
        });
        return targetInfos;
    }
    computeLinkedActivityRecord({ activityType, recordSeed, index, activityIndex, linkedObjectMetadataId, targetInfo }) {
        const linkedActivityId = this.generateLinkedTimelineActivityId(activityType, targetInfo.targetType, activityIndex);
        const creationDate = new Date().toISOString();
        const { linkedRecordCachedName, linkedProperties } = this.getLinkedRecordData(activityType, recordSeed, index);
        const linkedActivity = {
            id: linkedActivityId,
            name: this.getLinkedActivityName(activityType),
            properties: JSON.stringify({
                after: linkedProperties
            }),
            linkedRecordCachedName,
            linkedRecordId: recordSeed.id,
            linkedObjectMetadataId,
            workspaceMemberId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
            targetNoteId: null,
            targetTaskId: null,
            targetPersonId: null,
            targetCompanyId: null,
            targetOpportunityId: null,
            createdAt: creationDate,
            updatedAt: creationDate,
            happensAt: creationDate
        };
        // Set target ID (person, company, or opportunity)
        const targetIdKey = `target${(0, _utils.capitalize)(targetInfo.targetType)}Id`;
        // @ts-expect-error - This is okay for morph
        linkedActivity[targetIdKey] = targetInfo.targetId;
        // Only set target activity ID for entities that have corresponding columns
        const entitiesWithTargetColumns = new Set([
            'note',
            'task'
        ]);
        if (entitiesWithTargetColumns.has(activityType)) {
            const targetActivityIdKey = `target${(0, _utils.capitalize)(activityType)}Id`;
            // @ts-expect-error - This is okay for morph
            linkedActivity[targetActivityIdKey] = recordSeed.id;
        }
        return linkedActivity;
    }
    getLinkedRecordData(activityType, recordSeed, index) {
        const baseProperties = {
            id: recordSeed.id
        };
        const dataGetters = {
            calendarEvent: ()=>({
                    linkedRecordCachedName: String(recordSeed.title || `Calendar Event ${index + 1}`),
                    linkedProperties: {
                        ...baseProperties,
                        title: recordSeed.title,
                        description: recordSeed.description,
                        startsAt: recordSeed.startsAt,
                        endsAt: recordSeed.endsAt
                    }
                }),
            message: ()=>({
                    linkedRecordCachedName: String(recordSeed.subject || `Message ${index + 1}`),
                    linkedProperties: {
                        ...baseProperties,
                        subject: recordSeed.subject,
                        text: recordSeed.text,
                        receivedAt: recordSeed.receivedAt
                    }
                }),
            default: ()=>({
                    linkedRecordCachedName: String(recordSeed.title || `${activityType} ${index + 1}`),
                    linkedProperties: {
                        ...baseProperties,
                        title: recordSeed.title,
                        body: recordSeed.body
                    }
                })
        };
        const getter = dataGetters[activityType] || dataGetters.default;
        return getter();
    }
    generateLinkedTimelineActivityId(type, targetType, index) {
        const prefix = '20202020';
        const entityCode = this.ENTITY_CODES[type] || '0000';
        const targetCode = this.TARGET_CODES[targetType] || '0000';
        // Ensure the last segment is exactly 12 hex characters
        const indexHex = (index % 0xffffffff).toString(16).padStart(8, '0');
        return `${prefix}-${entityCode}-${targetCode}-8001-${indexHex}0001`;
    }
    async getObjectMetadataIds(workspaceId) {
        const metadataQueries = [
            {
                name: 'note',
                key: 'noteMetadataId'
            },
            {
                name: 'task',
                key: 'taskMetadataId'
            },
            {
                name: 'calendarEvent',
                key: 'calendarEventMetadataId'
            },
            {
                name: 'message',
                key: 'messageMetadataId'
            }
        ];
        const metadataResults = await Promise.all(metadataQueries.map(({ name })=>this.objectMetadataService.findOneWithinWorkspace(workspaceId, {
                where: {
                    nameSingular: name
                }
            })));
        const missingMetadata = metadataResults.map((result, index)=>result ? null : metadataQueries[index].name).filter(Boolean);
        if (missingMetadata.length > 0) {
            throw new Error(`Could not find metadata for: ${missingMetadata.join(', ')}`);
        }
        return {
            noteMetadataId: metadataResults[0]?.id || '',
            taskMetadataId: metadataResults[1]?.id || '',
            calendarEventMetadataId: metadataResults[2]?.id || '',
            messageMetadataId: metadataResults[3]?.id || ''
        };
    }
    constructor(objectMetadataService){
        this.objectMetadataService = objectMetadataService;
        this.ENTITY_CODES = {
            company: '0001',
            person: '0201',
            note: '0601',
            task: '0651',
            opportunity: '0851',
            calendarEvent: '0701',
            message: '0751'
        };
        this.TARGET_CODES = {
            person: '1001',
            company: '2001',
            opportunity: '3001'
        };
        this.LINKABLE_TYPES = new Set([
            'note',
            'task',
            'calendarEvent',
            'message'
        ]);
    }
};
TimelineActivitySeederService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadataservice.ObjectMetadataService === "undefined" ? Object : _objectmetadataservice.ObjectMetadataService
    ])
], TimelineActivitySeederService);

//# sourceMappingURL=timeline-activity-seeder.service.js.map