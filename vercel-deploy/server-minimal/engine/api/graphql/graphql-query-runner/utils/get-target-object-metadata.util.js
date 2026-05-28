"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getTargetObjectMetadataOrThrow", {
    enumerable: true,
    get: function() {
        return getTargetObjectMetadataOrThrow;
    }
});
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../errors/graphql-query-runner.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const getTargetObjectMetadataOrThrow = (fieldMetadata, flatObjectMetadataMaps)=>{
    if (!fieldMetadata.relationTargetObjectMetadataId) {
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Relation target object metadata id not found for field ${fieldMetadata.name}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.RELATION_TARGET_OBJECT_METADATA_NOT_FOUND, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    if (!targetObjectMetadata) {
        throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Target object metadata not found for field ${fieldMetadata.name}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.RELATION_TARGET_OBJECT_METADATA_NOT_FOUND, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    return targetObjectMetadata;
};

//# sourceMappingURL=get-target-object-metadata.util.js.map