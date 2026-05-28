"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromApplicationVariableEntityToFlatApplicationVariable", {
    enumerable: true,
    get: function() {
        return fromApplicationVariableEntityToFlatApplicationVariable;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const fromApplicationVariableEntityToFlatApplicationVariable = ({ entity: applicationVariableEntity, applicationIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(applicationVariableEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${applicationVariableEntity.applicationId} not found for applicationVariable ${applicationVariableEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    return {
        id: applicationVariableEntity.id,
        key: applicationVariableEntity.key,
        value: applicationVariableEntity.value,
        description: applicationVariableEntity.description,
        isSecret: applicationVariableEntity.isSecret,
        workspaceId: applicationVariableEntity.workspaceId,
        universalIdentifier: applicationVariableEntity.universalIdentifier,
        applicationId: applicationVariableEntity.applicationId,
        createdAt: applicationVariableEntity.createdAt.toISOString(),
        updatedAt: applicationVariableEntity.updatedAt.toISOString(),
        applicationUniversalIdentifier
    };
};

//# sourceMappingURL=from-application-variable-entity-to-flat-application-variable.util.js.map