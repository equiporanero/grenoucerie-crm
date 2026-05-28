"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftFetchByBatchService", {
    enumerable: true,
    get: function() {
        return MicrosoftFetchByBatchService;
    }
});
const _common = require("@nestjs/common");
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
let MicrosoftFetchByBatchService = class MicrosoftFetchByBatchService {
    async fetchAllByBatches(messageIds, connectedAccount) {
        const batchLimit = 20;
        const batchResponses = [];
        const messageIdsByBatch = [];
        const client = await this.microsoftOAuth2ClientProvider.getClient(connectedAccount.id);
        for(let i = 0; i < messageIds.length; i += batchLimit){
            const batchMessageIds = messageIds.slice(i, i + batchLimit);
            messageIdsByBatch.push(batchMessageIds);
            const batchRequests = batchMessageIds.map((messageId, index)=>({
                    id: (index + 1).toString(),
                    method: 'GET',
                    url: `/me/messages/${messageId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        Prefer: 'outlook.body-content-type="text"'
                    }
                }));
            const batchResponse = await client.api('/$batch').post({
                requests: batchRequests
            });
            batchResponses.push(batchResponse);
        }
        return {
            messageIdsByBatch,
            batchResponses
        };
    }
    constructor(microsoftOAuth2ClientProvider){
        this.microsoftOAuth2ClientProvider = microsoftOAuth2ClientProvider;
    }
};
MicrosoftFetchByBatchService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider === "undefined" ? Object : _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider
    ])
], MicrosoftFetchByBatchService);

//# sourceMappingURL=microsoft-fetch-by-batch.service.js.map