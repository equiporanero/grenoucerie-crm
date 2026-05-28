"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "webhookGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return webhookGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _webhookexception = require("../webhook.exception");
const webhookGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _webhookexception.WebhookException) {
        switch(error.code){
            case _webhookexception.WebhookExceptionCode.WEBHOOK_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _webhookexception.WebhookExceptionCode.INVALID_WEBHOOK_INPUT:
            case _webhookexception.WebhookExceptionCode.INVALID_TARGET_URL:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _webhookexception.WebhookExceptionCode.WEBHOOK_ALREADY_EXISTS:
                throw new _graphqlerrorsutil.ConflictError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=webhook-graphql-api-exception-handler.util.js.map