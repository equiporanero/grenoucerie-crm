"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftCalendarGetEventsService", {
    enumerable: true,
    get: function() {
        return MicrosoftCalendarGetEventsService;
    }
});
const _common = require("@nestjs/common");
const _microsoftgraphclient = require("@microsoft/microsoft-graph-client");
const _parsemicrosoftcalendarerrorutil = require("../utils/parse-microsoft-calendar-error.util");
const _microsoftoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/microsoft/microsoft-oauth2-client.provider");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MicrosoftCalendarGetEventsService = class MicrosoftCalendarGetEventsService {
    async getCalendarEvents(connectedAccount, syncCursor) {
        try {
            const microsoftClient = await this.microsoftOAuth2ClientProvider.getClient(connectedAccount.id);
            const eventIds = [];
            const response = await microsoftClient.api(syncCursor || '/me/calendar/events/delta').version('beta').get();
            const callback = (data)=>{
                eventIds.push(data.id);
                return true;
            };
            const pageIterator = new _microsoftgraphclient.PageIterator(microsoftClient, response, callback);
            await pageIterator.iterate();
            return {
                fullEvents: false,
                calendarEventIds: eventIds,
                nextSyncCursor: pageIterator.getDeltaLink() || ''
            };
        } catch (error) {
            throw (0, _parsemicrosoftcalendarerrorutil.parseMicrosoftCalendarError)(error);
        }
    }
    constructor(microsoftOAuth2ClientProvider){
        this.microsoftOAuth2ClientProvider = microsoftOAuth2ClientProvider;
    }
};
MicrosoftCalendarGetEventsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider === "undefined" ? Object : _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider
    ])
], MicrosoftCalendarGetEventsService);

//# sourceMappingURL=microsoft-calendar-get-events.service.js.map