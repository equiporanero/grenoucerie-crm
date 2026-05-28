"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromWebhookEntityToFlatWebhook", {
    enumerable: true,
    get: function() {
        return fromWebhookEntityToFlatWebhook;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromWebhookEntityToFlatWebhook = ({ entity: webhookEntity, applicationIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(webhookEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${webhookEntity.applicationId} not found for webhook ${webhookEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        id: webhookEntity.id,
        targetUrl: webhookEntity.targetUrl,
        operations: webhookEntity.operations,
        description: webhookEntity.description,
        secret: webhookEntity.secret,
        workspaceId: webhookEntity.workspaceId,
        universalIdentifier: webhookEntity.universalIdentifier,
        applicationId: webhookEntity.applicationId,
        createdAt: webhookEntity.createdAt.toISOString(),
        updatedAt: webhookEntity.updatedAt.toISOString(),
        deletedAt: webhookEntity.deletedAt?.toISOString() ?? null,
        applicationUniversalIdentifier
    };
};

//# sourceMappingURL=from-webhook-entity-to-flat-webhook.util.js.map