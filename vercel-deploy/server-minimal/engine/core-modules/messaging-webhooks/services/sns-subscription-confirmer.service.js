"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SnsSubscriptionConfirmerService", {
    enumerable: true,
    get: function() {
        return SnsSubscriptionConfirmerService;
    }
});
const _common = require("@nestjs/common");
const _messagingwebhookexceptioncodeenum = require("../messaging-webhook-exception-code.enum");
const _messagingwebhookexception = require("../messaging-webhook.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const SNS_SUBSCRIBE_URL_PATTERN = /^https:\/\/sns\.[a-z0-9-]+\.amazonaws\.com\//;
let SnsSubscriptionConfirmerService = class SnsSubscriptionConfirmerService {
    async confirm(subscribeUrl) {
        if (!subscribeUrl) {
            throw new _messagingwebhookexception.MessagingWebhookException('Missing SubscribeURL on SNS subscription confirmation', _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_PAYLOAD);
        }
        if (!SNS_SUBSCRIBE_URL_PATTERN.test(subscribeUrl)) {
            throw new _messagingwebhookexception.MessagingWebhookException(`Refusing to fetch non-AWS SubscribeURL: ${subscribeUrl}`, _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_SUBSCRIBE_URL);
        }
        const response = await fetch(subscribeUrl);
        if (!response.ok) {
            throw new _messagingwebhookexception.MessagingWebhookException(`Failed to confirm SNS subscription via ${subscribeUrl}: ${response.status}`, _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_SUBSCRIPTION_CONFIRMATION_FAILED);
        }
        this.logger.log(`Confirmed SNS subscription via ${subscribeUrl}`);
    }
    constructor(){
        this.logger = new _common.Logger(SnsSubscriptionConfirmerService.name);
    }
};
SnsSubscriptionConfirmerService = _ts_decorate([
    (0, _common.Injectable)()
], SnsSubscriptionConfirmerService);

//# sourceMappingURL=sns-subscription-confirmer.service.js.map