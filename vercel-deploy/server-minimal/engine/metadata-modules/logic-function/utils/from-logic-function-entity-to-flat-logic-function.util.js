"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromLogicFunctionEntityToFlatLogicFunction", {
    enumerable: true,
    get: function() {
        return fromLogicFunctionEntityToFlatLogicFunction;
    }
});
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataentityrelationpropertiesutil = require("../../flat-entity/utils/get-metadata-entity-relation-properties.util");
const fromLogicFunctionEntityToFlatLogicFunction = ({ entity: logicFunctionEntity, applicationIdToUniversalIdentifierMap })=>{
    const applicationUniversalIdentifier = applicationIdToUniversalIdentifierMap.get(logicFunctionEntity.applicationId);
    if (!(0, _utils.isDefined)(applicationUniversalIdentifier)) {
        throw new _flatentitymapsexception.FlatEntityMapsException(`Application with id ${logicFunctionEntity.applicationId} not found for logicFunction ${logicFunctionEntity.id}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
    }
    const logicFunctionWithoutRelations = (0, _utils.removePropertiesFromRecord)(logicFunctionEntity, (0, _getmetadataentityrelationpropertiesutil.getMetadataEntityRelationProperties)('logicFunction'));
    return {
        ...logicFunctionWithoutRelations,
        createdAt: logicFunctionEntity.createdAt.toISOString(),
        updatedAt: logicFunctionEntity.updatedAt.toISOString(),
        deletedAt: logicFunctionEntity.deletedAt?.toISOString() ?? null,
        applicationUniversalIdentifier
    };
};

//# sourceMappingURL=from-logic-function-entity-to-flat-logic-function.util.js.map