"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalDavFetchEventsService", {
    enumerable: true,
    get: function() {
        return CalDavFetchEventsService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _tsdav = require("tsdav");
const _utils = require("twenty-shared/utils");
const _buildcancelledeventutil = require("../utils/build-cancelled-event.util");
const _extracticaldatautil = require("../utils/extract-ical-data.util");
const _iseventintimerangeutil = require("../utils/is-event-in-time-range.util");
const _isinvalidsynctokenresponseutil = require("../utils/is-invalid-sync-token-response.util");
const _isvalidcaldavhrefutil = require("../utils/is-valid-caldav-href.util");
const _parseicaleventutil = require("../utils/parse-ical-event.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalDavFetchEventsService = class CalDavFetchEventsService {
    async listEventCalendars(client) {
        const calendars = await client.fetchCalendars();
        return calendars.filter((calendar)=>calendar.components?.includes('VEVENT'));
    }
    async fetchEvents(client, options) {
        const calendars = await this.listEventCalendars(client);
        const results = await Promise.all(calendars.map((calendar)=>this.syncCalendar(client, calendar, options)));
        return {
            events: results.flatMap((result)=>result.events),
            syncCursor: this.mergeSyncCursor(results)
        };
    }
    async syncCalendar(client, calendar, options) {
        const supportsSyncCollection = calendar.reports?.includes('syncCollection') ?? false;
        try {
            return supportsSyncCollection ? await this.fetchEventsViaSyncCollection(client, calendar, options) : await this.fetchEventsViaCtagEtag(client, calendar, options);
        } catch (error) {
            this.logger.error(`Per-calendar sync failed for ${calendar.url}`, error);
            return {
                calendarUrl: calendar.url,
                events: [],
                newSyncToken: options.syncCursor?.syncTokens[calendar.url],
                newCtag: options.syncCursor?.ctags?.[calendar.url],
                newEtags: options.syncCursor?.etags?.[calendar.url]
            };
        }
    }
    async fetchEventsViaSyncCollection(client, calendar, options) {
        const previousSyncToken = options.syncCursor?.syncTokens[calendar.url];
        const syncResult = await this.runSyncCollection(client, calendar.url, previousSyncToken);
        const memberResponses = syncResult.filter((entry)=>(0, _guards.isNonEmptyString)(entry.href) && (0, _isvalidcaldavhrefutil.isValidCalDavHref)(entry.href));
        const changedHrefs = memberResponses.filter((entry)=>entry.status !== 404).map((entry)=>entry.href);
        const cancelledHrefs = memberResponses.filter((entry)=>entry.status === 404).map((entry)=>entry.href);
        const fetchedEvents = await this.fetchAndParseEvents(client, calendar.url, changedHrefs, options);
        const rawSyncToken = syncResult[0]?.raw?.multistatus?.syncToken;
        const newSyncToken = (0, _guards.isNonEmptyString)(rawSyncToken) ? rawSyncToken : previousSyncToken;
        return {
            calendarUrl: calendar.url,
            events: [
                ...fetchedEvents,
                ...cancelledHrefs.map(_buildcancelledeventutil.buildCancelledCalDavEvent)
            ],
            newSyncToken
        };
    }
    async runSyncCollection(client, url, previousSyncToken) {
        const send = (token)=>client.syncCollection({
                url,
                props: {
                    [`${_tsdav.DAVNamespaceShort.DAV}:getetag`]: {},
                    [`${_tsdav.DAVNamespaceShort.CALDAV}:calendar-data`]: {}
                },
                syncLevel: 1,
                ...(0, _guards.isNonEmptyString)(token) ? {
                    syncToken: token
                } : {}
            });
        const result = await send(previousSyncToken);
        if ((0, _guards.isNonEmptyString)(previousSyncToken) && (0, _isinvalidsynctokenresponseutil.isInvalidSyncTokenResponse)(result)) {
            this.logger.warn(`Sync-token invalidated for ${url}; falling back to full re-sync`);
            return send(undefined);
        }
        return result;
    }
    async fetchEventsViaCtagEtag(client, calendar, options) {
        const storedEtags = options.syncCursor?.etags?.[calendar.url] ?? {};
        const newCtag = (0, _utils.isDefined)(calendar.ctag) ? String(calendar.ctag) : undefined;
        const storedCtag = options.syncCursor?.ctags?.[calendar.url];
        if ((0, _utils.isDefined)(newCtag) && (0, _utils.isDefined)(storedCtag) && newCtag === storedCtag) {
            return {
                calendarUrl: calendar.url,
                events: [],
                newCtag,
                newEtags: storedEtags
            };
        }
        const currentEtags = await this.fetchEtagsByHref(client, calendar.url);
        const changedHrefs = Object.keys(currentEtags).filter((href)=>storedEtags[href] !== currentEtags[href]);
        const cancelledHrefs = Object.keys(storedEtags).filter((href)=>!(href in currentEtags));
        const fetchedEvents = await this.fetchAndParseEvents(client, calendar.url, changedHrefs, options);
        return {
            calendarUrl: calendar.url,
            events: [
                ...fetchedEvents,
                ...cancelledHrefs.map(_buildcancelledeventutil.buildCancelledCalDavEvent)
            ],
            newCtag,
            newEtags: currentEtags
        };
    }
    mergeSyncCursor(results) {
        const syncTokens = {};
        const ctags = {};
        const etags = {};
        for (const result of results){
            if (result.newSyncToken) syncTokens[result.calendarUrl] = result.newSyncToken;
            if (result.newCtag) ctags[result.calendarUrl] = result.newCtag;
            if (result.newEtags) etags[result.calendarUrl] = result.newEtags;
        }
        return {
            syncTokens,
            ctags: Object.keys(ctags).length > 0 ? ctags : undefined,
            etags: Object.keys(etags).length > 0 ? etags : undefined
        };
    }
    async fetchEtagsByHref(client, calendarUrl) {
        const responses = await client.propfind({
            url: calendarUrl,
            props: {
                [`${_tsdav.DAVNamespaceShort.DAV}:getetag`]: {}
            },
            depth: '1'
        });
        return responses.reduce((map, response)=>{
            const href = response.href;
            const etag = response.props?.getetag;
            if (!(0, _guards.isNonEmptyString)(href) || !(0, _guards.isNonEmptyString)(etag) || !(0, _isvalidcaldavhrefutil.isValidCalDavHref)(href)) {
                return map;
            }
            map[href] = etag;
            return map;
        }, {});
    }
    async fetchAndParseEvents(client, calendarUrl, objectUrls, options) {
        if (objectUrls.length === 0) return [];
        const calendarObjects = await client.calendarMultiGet({
            url: calendarUrl,
            props: {
                [`${_tsdav.DAVNamespaceShort.DAV}:getetag`]: {},
                [`${_tsdav.DAVNamespaceShort.CALDAV}:calendar-data`]: {}
            },
            objectUrls,
            depth: '1'
        });
        return calendarObjects.flatMap((calendarObject)=>{
            const iCalData = (0, _extracticaldatautil.extractICalData)(calendarObject.props?.calendarData);
            if (!iCalData) return [];
            return (0, _parseicaleventutil.parseICalEvents)(iCalData, calendarObject.href || '').filter((event)=>(0, _iseventintimerangeutil.isEventInTimeRange)(event, options.startDate, options.endDate));
        });
    }
    constructor(){
        this.logger = new _common.Logger(CalDavFetchEventsService.name);
    }
};
CalDavFetchEventsService = _ts_decorate([
    (0, _common.Injectable)()
], CalDavFetchEventsService);

//# sourceMappingURL=caldav-fetch-events.service.js.map