"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFrontComponentEntityToFlatFrontComponent", {
    enumerable: true,
    get: function() {
        return fromFrontComponentEntityToFlatFrontComponent;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromFrontComponentEntityToFlatFrontComponent = ({ entity: frontComponentEntity, applicationIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(frontComponentEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${frontComponentEntity.applicationId} not found for frontComponent ${frontComponentEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        id: frontComponentEntity.id,
        name: frontComponentEntity.name,
        description: frontComponentEntity.description,
        sourceComponentPath: frontComponentEntity.sourceComponentPath,
        builtComponentPath: frontComponentEntity.builtComponentPath,
        componentName: frontComponentEntity.componentName,
        builtComponentChecksum: frontComponentEntity.builtComponentChecksum,
        isHeadless: frontComponentEntity.isHeadless,
        usesSdkClient: frontComponentEntity.usesSdkClient,
        workspaceId: frontComponentEntity.workspaceId,
        universalIdentifier: frontComponentEntity.universalIdentifier,
        applicationId: frontComponentEntity.applicationId,
        createdAt: frontComponentEntity.createdAt.toISOString(),
        updatedAt: frontComponentEntity.updatedAt.toISOString(),
        applicationUniversalIdentifier
    };
};

//# sourceMappingURL=from-front-component-entity-to-flat-front-component.util.js.map