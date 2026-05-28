"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarSaveEventsService", {
    enumerable: true,
    get: function() {
        return CalendarSaveEventsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
const _uuid = require("uuid");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _calendareventparticipantservice = require("../../calendar-event-participant-manager/services/calendar-event-participant.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CalendarSaveEventsService = class CalendarSaveEventsService {
    async saveCalendarEventsAndEnqueueContactCreationJob(fetchedCalendarEvents, calendarChannel, connectedAccount, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const calendarEventRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'calendarEvent');
            const calendarChannelEventAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'calendarChannelEventAssociation');
            const workspaceDataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSource();
            await workspaceDataSource.transaction(async (transactionManager)=>{
                const existingAssociations = await calendarChannelEventAssociationRepository.find({
                    where: {
                        eventExternalId: (0, _typeorm.Any)(fetchedCalendarEvents.map((event)=>event.id)),
                        calendarChannelId: calendarChannel.id
                    }
                }, transactionManager);
                const existingCalendarEventIdByExternalId = new Map(existingAssociations.map((association)=>[
                        association.eventExternalId,
                        association.calendarEventId
                    ]));
                const existingAssociationIdByExternalId = new Map(existingAssociations.map((association)=>[
                        association.eventExternalId,
                        association.id
                    ]));
                const fetchedCalendarEventsWithDBEvents = fetchedCalendarEvents.map((event)=>{
                    const existingCalendarEventId = existingCalendarEventIdByExternalId.get(event.id);
                    return {
                        fetchedCalendarEvent: event,
                        existingCalendarEvent: existingCalendarEventId ? {
                            id: existingCalendarEventId
                        } : null,
                        newlyCreatedCalendarEvent: null
                    };
                });
                const newCalendarEventIdByExternalId = new Map();
                const newCalendarEventsToInsert = fetchedCalendarEventsWithDBEvents.filter(({ existingCalendarEvent })=>existingCalendarEvent === null).map(({ fetchedCalendarEvent })=>{
                    const calendarEventId = (0, _uuid.v4)();
                    newCalendarEventIdByExternalId.set(fetchedCalendarEvent.id, calendarEventId);
                    return {
                        id: calendarEventId,
                        iCalUid: fetchedCalendarEvent.iCalUid,
                        title: fetchedCalendarEvent.title,
                        description: fetchedCalendarEvent.description,
                        startsAt: fetchedCalendarEvent.startsAt,
                        endsAt: fetchedCalendarEvent.endsAt,
                        location: fetchedCalendarEvent.location,
                        isFullDay: fetchedCalendarEvent.isFullDay,
                        isCanceled: fetchedCalendarEvent.isCanceled,
                        conferenceSolution: fetchedCalendarEvent.conferenceSolution,
                        conferenceLink: {
                            primaryLinkLabel: fetchedCalendarEvent.conferenceLinkLabel,
                            primaryLinkUrl: fetchedCalendarEvent.conferenceLinkUrl,
                            secondaryLinks: []
                        },
                        externalCreatedAt: fetchedCalendarEvent.externalCreatedAt,
                        externalUpdatedAt: fetchedCalendarEvent.externalUpdatedAt
                    };
                });
                if (newCalendarEventsToInsert.length > 0) {
                    await calendarEventRepository.insert(newCalendarEventsToInsert, transactionManager);
                }
                const fetchedCalendarEventsWithDBEventsEnrichedWithSavedEvents = fetchedCalendarEventsWithDBEvents.map(({ fetchedCalendarEvent, existingCalendarEvent })=>{
                    const savedCalendarEventId = newCalendarEventIdByExternalId.get(fetchedCalendarEvent.id);
                    return {
                        fetchedCalendarEvent,
                        existingCalendarEvent,
                        newlyCreatedCalendarEvent: savedCalendarEventId ? {
                            id: savedCalendarEventId
                        } : null
                    };
                });
                const existingEventsToUpdate = fetchedCalendarEventsWithDBEventsEnrichedWithSavedEvents.filter(({ existingCalendarEvent })=>existingCalendarEvent !== null).map(({ fetchedCalendarEvent, existingCalendarEvent })=>{
                    if (!existingCalendarEvent) {
                        throw new Error(`Existing calendar event with iCalUid ${fetchedCalendarEvent.iCalUid} not found - should never happen`);
                    }
                    return {
                        criteria: existingCalendarEvent.id,
                        partialEntity: {
                            iCalUid: fetchedCalendarEvent.iCalUid,
                            title: fetchedCalendarEvent.title,
                            description: fetchedCalendarEvent.description,
                            startsAt: fetchedCalendarEvent.startsAt,
                            endsAt: fetchedCalendarEvent.endsAt,
                            location: fetchedCalendarEvent.location,
                            isFullDay: fetchedCalendarEvent.isFullDay,
                            isCanceled: fetchedCalendarEvent.isCanceled,
                            conferenceSolution: fetchedCalendarEvent.conferenceSolution,
                            conferenceLink: {
                                primaryLinkLabel: fetchedCalendarEvent.conferenceLinkLabel,
                                primaryLinkUrl: fetchedCalendarEvent.conferenceLinkUrl,
                                secondaryLinks: []
                            },
                            externalCreatedAt: fetchedCalendarEvent.externalCreatedAt,
                            externalUpdatedAt: fetchedCalendarEvent.externalUpdatedAt
                        }
                    };
                });
                if (existingEventsToUpdate.length > 0) {
                    await calendarEventRepository.updateMany(existingEventsToUpdate, transactionManager);
                }
                const calendarChannelEventAssociationsToSave = fetchedCalendarEventsWithDBEventsEnrichedWithSavedEvents.filter(({ newlyCreatedCalendarEvent })=>newlyCreatedCalendarEvent !== null).map(({ fetchedCalendarEvent, newlyCreatedCalendarEvent })=>{
                    if (!newlyCreatedCalendarEvent?.id) {
                        throw new Error(`Calendar event id not found for event with iCalUid ${fetchedCalendarEvent.iCalUid} - should never happen`);
                    }
                    return {
                        calendarEventId: newlyCreatedCalendarEvent.id,
                        eventExternalId: fetchedCalendarEvent.id,
                        calendarChannelId: calendarChannel.id,
                        recurringEventExternalId: fetchedCalendarEvent.recurringEventExternalId ?? ''
                    };
                });
                if (calendarChannelEventAssociationsToSave.length > 0) {
                    await calendarChannelEventAssociationRepository.insert(calendarChannelEventAssociationsToSave, transactionManager);
                }
                const existingAssociationsToUpdate = fetchedCalendarEventsWithDBEventsEnrichedWithSavedEvents.filter(({ existingCalendarEvent })=>existingCalendarEvent !== null).map(({ fetchedCalendarEvent })=>({
                        criteria: existingAssociationIdByExternalId.get(fetchedCalendarEvent.id),
                        partialEntity: {
                            recurringEventExternalId: fetchedCalendarEvent.recurringEventExternalId ?? ''
                        }
                    }));
                if (existingAssociationsToUpdate.length > 0) {
                    await calendarChannelEventAssociationRepository.updateMany(existingAssociationsToUpdate, transactionManager);
                }
                const participantsToCreate = fetchedCalendarEventsWithDBEventsEnrichedWithSavedEvents.filter(({ newlyCreatedCalendarEvent })=>newlyCreatedCalendarEvent !== null).flatMap(({ newlyCreatedCalendarEvent, fetchedCalendarEvent })=>{
                    if (!newlyCreatedCalendarEvent?.id) {
                        throw new Error(`Newly created calendar event with iCalUid ${fetchedCalendarEvent.iCalUid} not found - should never happen`);
                    }
                    return fetchedCalendarEvent.participants.map((participant)=>({
                            ...participant,
                            calendarEventId: newlyCreatedCalendarEvent.id
                        }));
                });
                // todo: we should prevent duplicate rows on calendarEventAssociation by creating
                // an index on calendarChannelId and calendarEventId
                const participantsToUpdate = fetchedCalendarEventsWithDBEventsEnrichedWithSavedEvents.filter(({ existingCalendarEvent })=>existingCalendarEvent !== null).flatMap(({ fetchedCalendarEvent, existingCalendarEvent })=>{
                    if (!existingCalendarEvent?.id) {
                        throw new Error(`Existing calendar event with iCalUid ${fetchedCalendarEvent.iCalUid} not found - should never happen`);
                    }
                    return fetchedCalendarEvent.participants.map((participant)=>({
                            ...participant,
                            calendarEventId: existingCalendarEvent.id
                        }));
                });
                await this.calendarEventParticipantService.upsertAndDeleteCalendarEventParticipants({
                    participantsToCreate,
                    participantsToUpdate,
                    transactionManager,
                    calendarChannel,
                    connectedAccount,
                    workspaceId
                });
            });
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, calendarEventParticipantService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.calendarEventParticipantService = calendarEventParticipantService;
    }
};
CalendarSaveEventsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _calendareventparticipantservice.CalendarEventParticipantService === "undefined" ? Object : _calendareventparticipantservice.CalendarEventParticipantService
    ])
], CalendarSaveEventsService);

//# sourceMappingURL=calendar-save-events.service.js.map