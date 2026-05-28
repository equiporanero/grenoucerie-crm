"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarGetCalendarEventsService", {
    enumerable: true,
    get: function() {
        return CalendarGetCalendarEventsService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _caldavgeteventsservice = require("../drivers/caldav/services/caldav-get-events.service");
const _googlecalendargeteventsservice = require("../drivers/google-calendar/services/google-calendar-get-events.service");
const _microsoftcalendargeteventsservice = require("../drivers/microsoft-calendar/services/microsoft-calendar-get-events.service");
const _calendareventimportexception = require("../exceptions/calendar-event-import.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CalendarGetCalendarEventsService = class CalendarGetCalendarEventsService {
    async getCalendarEvents(connectedAccount, syncCursor) {
        switch(connectedAccount.provider){
            case _types.ConnectedAccountProvider.GOOGLE:
                return this.googleCalendarGetEventsService.getCalendarEvents(connectedAccount, syncCursor);
            case _types.ConnectedAccountProvider.MICROSOFT:
                return this.microsoftCalendarGetEventsService.getCalendarEvents(connectedAccount, syncCursor);
            case _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV:
                return this.caldavCalendarGetEventsService.getCalendarEvents(connectedAccount.id, syncCursor);
            default:
                throw new _calendareventimportexception.CalendarEventImportException(`Provider ${connectedAccount.provider} is not supported`, _calendareventimportexception.CalendarEventImportExceptionCode.PROVIDER_NOT_SUPPORTED);
        }
    }
    constructor(googleCalendarGetEventsService, microsoftCalendarGetEventsService, caldavCalendarGetEventsService){
        this.googleCalendarGetEventsService = googleCalendarGetEventsService;
        this.microsoftCalendarGetEventsService = microsoftCalendarGetEventsService;
        this.caldavCalendarGetEventsService = caldavCalendarGetEventsService;
    }
};
CalendarGetCalendarEventsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googlecalendargeteventsservice.GoogleCalendarGetEventsService === "undefined" ? Object : _googlecalendargeteventsservice.GoogleCalendarGetEventsService,
        typeof _microsoftcalendargeteventsservice.MicrosoftCalendarGetEventsService === "undefined" ? Object : _microsoftcalendargeteventsservice.MicrosoftCalendarGetEventsService,
        typeof _caldavgeteventsservice.CalDavGetEventsService === "undefined" ? Object : _caldavgeteventsservice.CalDavGetEventsService
    ])
], CalendarGetCalendarEventsService);

//# sourceMappingURL=calendar-get-events.service.js.map