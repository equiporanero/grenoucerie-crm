"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromConnectionProviderEntityToFlatConnectionProvider", {
    enumerable: true,
    get: function() {
        return fromConnectionProviderEntityToFlatConnectionProvider;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromConnectionProviderEntityToFlatConnectionProvider = ({ entity: connectionProviderEntity, applicationIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(connectionProviderEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${connectionProviderEntity.applicationId} not found for connection provider ${connectionProviderEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        id: connectionProviderEntity.id,
        universalIdentifier: connectionProviderEntity.universalIdentifier,
        applicationId: connectionProviderEntity.applicationId,
        workspaceId: connectionProviderEntity.workspaceId,
        name: connectionProviderEntity.name,
        displayName: connectionProviderEntity.displayName,
        type: connectionProviderEntity.type,
        oauthConfig: connectionProviderEntity.oauthConfig,
        createdAt: connectionProviderEntity.createdAt.toISOString(),
        updatedAt: connectionProviderEntity.updatedAt.toISOString(),
        applicationUniversalIdentifier
    };
};

//# sourceMappingURL=from-connection-provider-entity-to-flat-connection-provider.util.js.map