"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleCalendarGetEventsService", {
    enumerable: true,
    get: function() {
        return GoogleCalendarGetEventsService;
    }
});
const _common = require("@nestjs/common");
const _googleapis = require("googleapis");
const _formatgooglecalendareventutil = require("../utils/format-google-calendar-event.util");
const _parsegaxioserrorutil = require("../utils/parse-gaxios-error.util");
const _parsegooglecalendarerrorutil = require("../utils/parse-google-calendar-error.util");
const _googleoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/google/google-oauth2-client.provider");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GoogleCalendarGetEventsService = class GoogleCalendarGetEventsService {
    async getCalendarEvents(connectedAccount, syncCursor) {
        const oAuth2Client = await this.googleOAuth2ClientProvider.getClient(connectedAccount.id);
        const googleCalendarClient = _googleapis.google.calendar({
            version: 'v3',
            auth: oAuth2Client
        });
        let nextSyncToken;
        let nextPageToken;
        const events = [];
        let hasMoreEvents = true;
        while(hasMoreEvents){
            const googleCalendarEvents = await googleCalendarClient.events.list({
                calendarId: 'primary',
                maxResults: 500,
                singleEvents: true,
                syncToken: syncCursor,
                pageToken: nextPageToken,
                showDeleted: true
            }).catch(async (error)=>{
                this.handleError(error);
                return {
                    data: {
                        items: [],
                        nextSyncToken: undefined,
                        nextPageToken: undefined
                    }
                };
            });
            nextSyncToken = googleCalendarEvents.data.nextSyncToken;
            nextPageToken = googleCalendarEvents.data.nextPageToken || undefined;
            const { items } = googleCalendarEvents.data;
            if (!items || items.length === 0) {
                break;
            }
            events.push(...items);
            if (!nextPageToken) {
                hasMoreEvents = false;
            }
        }
        return {
            fullEvents: true,
            calendarEvents: (0, _formatgooglecalendareventutil.formatGoogleCalendarEvents)(events),
            nextSyncCursor: nextSyncToken || ''
        };
    }
    handleError(error) {
        this.logger.error(`Error in ${GoogleCalendarGetEventsService.name} - getCalendarEvents`, error.code, error);
        if (error.code && [
            'ECONNRESET',
            'ENOTFOUND',
            'ECONNABORTED',
            'ETIMEDOUT',
            'ERR_NETWORK'
        ].includes(error.code)) {
            throw (0, _parsegaxioserrorutil.parseGaxiosError)(error);
        }
        if (error.response?.status !== 410) {
            this.logger.error(`Calendar event import error for Google Calendar. status: ${error.response?.status}`);
            this.logger.error(error);
            const googleCalendarError = {
                code: error.response?.status,
                reason: error.response?.data?.error?.errors?.[0].reason || error.response?.data?.error || '',
                message: error.response?.data?.error?.errors?.[0].message || error.response?.data?.error_description || ''
            };
            throw (0, _parsegooglecalendarerrorutil.parseGoogleCalendarError)(googleCalendarError);
        }
    }
    constructor(googleOAuth2ClientProvider){
        this.googleOAuth2ClientProvider = googleOAuth2ClientProvider;
        this.logger = new _common.Logger(GoogleCalendarGetEventsService.name);
    }
};
GoogleCalendarGetEventsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googleoauth2clientprovider.GoogleOAuth2ClientProvider === "undefined" ? Object : _googleoauth2clientprovider.GoogleOAuth2ClientProvider
    ])
], GoogleCalendarGetEventsService);

//# sourceMappingURL=google-calendar-get-events.service.js.map