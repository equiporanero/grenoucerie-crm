"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingWebhooksModule", {
    enumerable: true,
    get: function() {
        return MessagingWebhooksModule;
    }
});
const _common = require("@nestjs/common");
const _emailingdomainmodule = require("../emailing-domain/emailing-domain.module");
const _messagingwebhookscontroller = require("./messaging-webhooks.controller");
const _sesinboundmailhandlerservice = require("./services/ses-inbound-mail-handler.service");
const _sesinboundwebhookrouterservice = require("./services/ses-inbound-webhook-router.service");
const _sesoutboundsendingstatehandlerservice = require("./services/ses-outbound-sending-state-handler.service");
const _sesoutboundwebhookrouterservice = require("./services/ses-outbound-webhook-router.service");
const _snssignatureverifierservice = require("./services/sns-signature-verifier.service");
const _snssubscriptionconfirmerservice = require("./services/sns-subscription-confirmer.service");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingWebhooksModule = class MessagingWebhooksModule {
};
MessagingWebhooksModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _twentyconfigmodule.TwentyConfigModule,
            _emailingdomainmodule.EmailingDomainModule
        ],
        controllers: [
            _messagingwebhookscontroller.MessagingWebhooksController
        ],
        providers: [
            _snssignatureverifierservice.SnsSignatureVerifierService,
            _snssubscriptionconfirmerservice.SnsSubscriptionConfirmerService,
            _sesinboundmailhandlerservice.SesInboundMailHandlerService,
            _sesoutboundsendingstatehandlerservice.SesOutboundSendingStateHandlerService,
            _sesinboundwebhookrouterservice.SesInboundWebhookRouterService,
            _sesoutboundwebhookrouterservice.SesOutboundWebhookRouterService
        ]
    })
], MessagingWebhooksModule);

//# sourceMappingURL=messaging-webhooks.module.js.map