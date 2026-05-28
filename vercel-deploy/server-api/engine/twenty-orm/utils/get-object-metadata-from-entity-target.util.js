"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getObjectMetadataFromEntityTarget", {
    enumerable: true,
    get: function() {
        return getObjectMetadataFromEntityTarget;
    }
});
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _twentyormexception = require("../exceptions/twenty-orm.exception");
const getObjectMetadataFromEntityTarget = (entityTarget, internalContext)=>{
    if (typeof entityTarget !== 'string') {
        throw new _twentyormexception.TwentyORMException('Entity target must be a string', _twentyormexception.TwentyORMExceptionCode.MALFORMED_METADATA);
    }
    const objectMetadataName = entityTarget;
    const objectMetadataId = internalContext.objectIdByNameSingular[objectMetadataName];
    if (!objectMetadataId) {
        throw new _twentyormexception.TwentyORMException(`Object metadata for object "${objectMetadataName}" is missing ` + `in workspace "${internalContext.workspaceId}" ` + `with object metadata collection length: ${Object.keys(internalContext.objectIdByNameSingular).length}`, _twentyormexception.TwentyORMExceptionCode.MALFORMED_METADATA);
    }
    const objectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: objectMetadataId,
        flatEntityMaps: internalContext.flatObjectMetadataMaps
    });
    if (!objectMetadata) {
        throw new _twentyormexception.TwentyORMException(`Object metadata for object "${objectMetadataName}" (id: ${objectMetadataId}) is missing`, _twentyormexception.TwentyORMExceptionCode.MALFORMED_METADATA);
    }
    return objectMetadata;
};

//# sourceMappingURL=get-object-metadata-from-entity-target.util.js.map