"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateWebhookInputToFlatWebhookToUpdateOrThrow", {
    enumerable: true,
    get: function() {
        return fromUpdateWebhookInputToFlatWebhookToUpdateOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _flatwebhookeditablepropertiesconstant = require("../constants/flat-webhook-editable-properties.constant");
const _webhookexception = require("../../webhook/webhook.exception");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateWebhookInputToFlatWebhookToUpdateOrThrow = ({ flatWebhookMaps, updateWebhookInput })=>{
    const existingFlatWebhook = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: updateWebhookInput.id,
        flatEntityMaps: flatWebhookMaps
    });
    if (!(0, _utils.isDefined)(existingFlatWebhook)) {
        throw new _webhookexception.WebhookException('Webhook not found', _webhookexception.WebhookExceptionCode.WEBHOOK_NOT_FOUND);
    }
    return {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatWebhook,
            properties: [
                ..._flatwebhookeditablepropertiesconstant.FLAT_WEBHOOK_EDITABLE_PROPERTIES
            ],
            update: updateWebhookInput.update
        }),
        updatedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-update-webhook-input-to-flat-webhook-to-update-or-throw.util.js.map