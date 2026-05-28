"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMessagingWebhookExceptionStatusCode", {
    enumerable: true,
    get: function() {
        return getMessagingWebhookExceptionStatusCode;
    }
});
const _utils = require("twenty-shared/utils");
const _messagingwebhookexceptioncodeenum = require("../messaging-webhook-exception-code.enum");
const getMessagingWebhookExceptionStatusCode = (exception)=>{
    switch(exception.code){
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_MISSING_REQUEST_BODY:
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_PAYLOAD:
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_SUBSCRIBE_URL:
            return 400;
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_FORBIDDEN_TOPIC:
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_SIGNATURE:
            return 403;
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_SUBSCRIPTION_CONFIRMATION_FAILED:
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_UNHANDLED_ERROR:
            return 500;
        default:
            {
                return (0, _utils.assertUnreachable)(exception.code);
            }
    }
};

//# sourceMappingURL=get-messaging-webhook-exception-status-code.util.js.map