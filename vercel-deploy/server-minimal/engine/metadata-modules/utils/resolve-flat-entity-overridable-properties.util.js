"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveFlatEntityOverridableProperties", {
    enumerable: true,
    get: function() {
        return resolveFlatEntityOverridableProperties;
    }
});
const _utils = require("twenty-shared/utils");
const resolveFlatEntityOverridableProperties = (flatEntity)=>{
    if (!(0, _utils.isDefined)(flatEntity.overrides)) {
        return flatEntity;
    }
    return {
        ...flatEntity,
        ...flatEntity.overrides
    };
};

//# sourceMappingURL=resolve-flat-entity-overridable-properties.util.js.map