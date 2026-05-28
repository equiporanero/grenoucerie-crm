"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingWebhookException", {
    enumerable: true,
    get: function() {
        return MessagingWebhookException;
    }
});
const _utils = require("twenty-shared/utils");
const _messagingwebhookexceptioncodeenum = require("./messaging-webhook-exception-code.enum");
const _customexception = require("../../../utils/custom-exception");
const getMessagingWebhookExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_MISSING_REQUEST_BODY:
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_PAYLOAD:
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_SUBSCRIBE_URL:
            return /*i18n*/ {
                id: "3nHyuH",
                message: "The webhook request could not be processed."
            };
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_FORBIDDEN_TOPIC:
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_INVALID_SIGNATURE:
            return /*i18n*/ {
                id: "9bYo5E",
                message: "The webhook request could not be authenticated."
            };
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_SUBSCRIPTION_CONFIRMATION_FAILED:
        case _messagingwebhookexceptioncodeenum.MessagingWebhookExceptionCode.MESSAGING_WEBHOOK_UNHANDLED_ERROR:
            return /*i18n*/ {
                id: "X3mSup",
                message: "An error occurred while processing the webhook."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let MessagingWebhookException = class MessagingWebhookException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getMessagingWebhookExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=messaging-webhook.exception.js.map