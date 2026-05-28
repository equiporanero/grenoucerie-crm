"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getEntityTarget", {
    enumerable: true,
    get: function() {
        return getEntityTarget;
    }
});
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const getEntityTarget = (targetOrEntity, entityOrMaybeOptions)=>{
    const isEntityTarget = (typeof targetOrEntity === 'function' || _typeorm.InstanceChecker.isEntitySchema(targetOrEntity) || typeof targetOrEntity === 'string') && (0, _utils.isDefined)(targetOrEntity);
    const entityTarget = isEntityTarget ? targetOrEntity : null;
    if (entityTarget) return entityTarget;
    const entityData = isEntityTarget ? entityOrMaybeOptions : targetOrEntity;
    const isEntityArray = Array.isArray(entityData);
    return isEntityArray ? entityData[0]?.constructor : entityData.constructor;
};

//# sourceMappingURL=get-entity-target.js.map