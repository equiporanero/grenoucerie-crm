"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleApisServiceAvailabilityService", {
    enumerable: true,
    get: function() {
        return GoogleApisServiceAvailabilityService;
    }
});
const _common = require("@nestjs/common");
const _googleapis = require("googleapis");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GoogleApisServiceAvailabilityService = class GoogleApisServiceAvailabilityService {
    async checkServicesAvailability(accessToken) {
        const oAuth2Client = new _googleapis.google.auth.OAuth2(this.twentyConfigService.get('AUTH_GOOGLE_CLIENT_ID'), this.twentyConfigService.get('AUTH_GOOGLE_CLIENT_SECRET'));
        oAuth2Client.setCredentials({
            access_token: accessToken
        });
        const [isMessagingAvailable, isCalendarAvailable] = await Promise.all([
            this.checkMessagingAvailability(oAuth2Client),
            this.checkCalendarAvailability(oAuth2Client)
        ]);
        return {
            isMessagingAvailable,
            isCalendarAvailable
        };
    }
    async checkMessagingAvailability(oAuth2Client) {
        if (!this.twentyConfigService.get('MESSAGING_PROVIDER_GMAIL_ENABLED')) {
            return false;
        }
        try {
            const gmailClient = _googleapis.google.gmail({
                version: 'v1',
                auth: oAuth2Client
            });
            await gmailClient.users.getProfile({
                userId: 'me'
            });
            return true;
        } catch (error) {
            if (this.isServiceNotEnabledError(error)) {
                this.logger.log('Messaging service is not enabled for this Google Workspace account');
                return false;
            }
            this.logger.error('Error checking messaging availability', error);
            throw error;
        }
    }
    async checkCalendarAvailability(oAuth2Client) {
        if (!this.twentyConfigService.get('CALENDAR_PROVIDER_GOOGLE_ENABLED')) {
            return false;
        }
        try {
            const calendarClient = _googleapis.google.calendar({
                version: 'v3',
                auth: oAuth2Client
            });
            await calendarClient.events.list({
                calendarId: 'primary',
                maxResults: 1
            });
            return true;
        } catch (error) {
            if (this.isServiceNotEnabledError(error)) {
                this.logger.log('Calendar service is not enabled for this Google Workspace account');
                return false;
            }
            this.logger.error('Error checking Calendar availability', error);
            throw error;
        }
    }
    isServiceNotEnabledError(error) {
        const errorResponse = error?.response?.data?.error;
        if (!errorResponse || typeof errorResponse !== 'object') {
            return false;
        }
        const gmailError = errorResponse;
        const firstError = gmailError.errors?.[0];
        if (!firstError) {
            return false;
        }
        const isFailedPrecondition = firstError.reason === 'failedPrecondition';
        const isServiceNotEnabled = firstError.message?.toLowerCase()?.includes('service not enabled') ?? false;
        const isPreconditionCheckFailed = firstError.message?.toLowerCase()?.includes('precondition check failed') ?? false;
        return isFailedPrecondition && (isServiceNotEnabled || isPreconditionCheckFailed);
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
        this.logger = new _common.Logger(GoogleApisServiceAvailabilityService.name);
    }
};
GoogleApisServiceAvailabilityService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], GoogleApisServiceAvailabilityService);

//# sourceMappingURL=google-apis-service-availability.service.js.map