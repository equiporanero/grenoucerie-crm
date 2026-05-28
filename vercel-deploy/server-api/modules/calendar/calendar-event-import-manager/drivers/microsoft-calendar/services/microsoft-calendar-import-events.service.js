"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftCalendarImportEventsService", {
    enumerable: true,
    get: function() {
        return MicrosoftCalendarImportEventsService;
    }
});
const _common = require("@nestjs/common");
const _formatmicrosoftcalendareventutil = require("../utils/format-microsoft-calendar-event.util");
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
let MicrosoftCalendarImportEventsService = class MicrosoftCalendarImportEventsService {
    async getCalendarEvents(connectedAccount, changedEventIds) {
        try {
            const microsoftClient = await this.microsoftOAuth2ClientProvider.getClient(connectedAccount.id);
            const events = [];
            for (const changedEventId of changedEventIds){
                const event = await microsoftClient.api(`/me/calendar/events/${changedEventId}`).get();
                events.push(event);
            }
            return (0, _formatmicrosoftcalendareventutil.formatMicrosoftCalendarEvents)(events);
        } catch (error) {
            throw (0, _parsemicrosoftcalendarerrorutil.parseMicrosoftCalendarError)(error);
        }
    }
    constructor(microsoftOAuth2ClientProvider){
        this.microsoftOAuth2ClientProvider = microsoftOAuth2ClientProvider;
    }
};
MicrosoftCalendarImportEventsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider === "undefined" ? Object : _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider
    ])
], MicrosoftCalendarImportEventsService);

//# sourceMappingURL=microsoft-calendar-import-events.service.js.map