"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteWebhookInputToFlatWebhookOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteWebhookInputToFlatWebhookOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _webhookexception = require("../../webhook/webhook.exception");
const fromDeleteWebhookInputToFlatWebhookOrThrow = ({ flatWebhookMaps, webhookId })=>{
    const existingFlatWebhook = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: webhookId,
        flatEntityMaps: flatWebhookMaps
    });
    if (!(0, _utils.isDefined)(existingFlatWebhook)) {
        throw new _webhookexception.WebhookException('Webhook not found', _webhookexception.WebhookExceptionCode.WEBHOOK_NOT_FOUND);
    }
    return existingFlatWebhook;
};

//# sourceMappingURL=from-delete-webhook-input-to-flat-webhook-or-throw.util.js.map