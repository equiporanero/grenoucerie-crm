"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleEmailAliasManagerService", {
    enumerable: true,
    get: function() {
        return GoogleEmailAliasManagerService;
    }
});
const _common = require("@nestjs/common");
const _googleapis = require("googleapis");
const _googleemailaliaserrorhandlerservice = require("./google-email-alias-error-handler.service");
const _googleoauth2clientprovider = require("../../../../oauth2-client-manager/drivers/google/google-oauth2-client.provider");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GoogleEmailAliasManagerService = class GoogleEmailAliasManagerService {
    async getHandleAliases(connectedAccount) {
        const oAuth2Client = await this.googleOAuth2ClientProvider.getClient(connectedAccount.id);
        const gmailClient = _googleapis.google.gmail({
            version: 'v1',
            auth: oAuth2Client
        });
        const sendAsResponse = await gmailClient.users.settings.sendAs.list({
            userId: 'me'
        }).catch((error)=>{
            throw this.gmailEmailAliasErrorHandlerService.handleError(error);
        });
        return sendAsResponse.data.sendAs?.filter((alias)=>alias.isPrimary !== true).map((alias)=>alias.sendAsEmail || '').filter((email)=>email.length > 0) ?? [];
    }
    constructor(googleOAuth2ClientProvider, gmailEmailAliasErrorHandlerService){
        this.googleOAuth2ClientProvider = googleOAuth2ClientProvider;
        this.gmailEmailAliasErrorHandlerService = gmailEmailAliasErrorHandlerService;
    }
};
GoogleEmailAliasManagerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googleoauth2clientprovider.GoogleOAuth2ClientProvider === "undefined" ? Object : _googleoauth2clientprovider.GoogleOAuth2ClientProvider,
        typeof _googleemailaliaserrorhandlerservice.GmailEmailAliasErrorHandlerService === "undefined" ? Object : _googleemailaliaserrorhandlerservice.GmailEmailAliasErrorHandlerService
    ])
], GoogleEmailAliasManagerService);

//# sourceMappingURL=google-email-alias-manager.service.js.map