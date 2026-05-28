"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get WebhookException () {
        return WebhookException;
    },
    get WebhookExceptionCode () {
        return WebhookExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var WebhookExceptionCode = /*#__PURE__*/ function(WebhookExceptionCode) {
    WebhookExceptionCode["WEBHOOK_NOT_FOUND"] = "WEBHOOK_NOT_FOUND";
    WebhookExceptionCode["WEBHOOK_ALREADY_EXISTS"] = "WEBHOOK_ALREADY_EXISTS";
    WebhookExceptionCode["INVALID_WEBHOOK_INPUT"] = "INVALID_WEBHOOK_INPUT";
    WebhookExceptionCode["INVALID_TARGET_URL"] = "INVALID_TARGET_URL";
    return WebhookExceptionCode;
}({});
const getWebhookExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "WEBHOOK_NOT_FOUND":
            return /*i18n*/ {
                id: "b8g3PG",
                message: "Webhook not found."
            };
        case "WEBHOOK_ALREADY_EXISTS":
            return /*i18n*/ {
                id: "SMhyGZ",
                message: "A webhook with this configuration already exists."
            };
        case "INVALID_WEBHOOK_INPUT":
            return /*i18n*/ {
                id: "z68tnU",
                message: "Invalid webhook input."
            };
        case "INVALID_TARGET_URL":
            return /*i18n*/ {
                id: "9mW6V7",
                message: "Invalid target URL. Please provide a valid HTTP or HTTPS URL."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WebhookException = class WebhookException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWebhookExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=webhook.exception.js.map