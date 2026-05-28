"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveOverridableEntityProperty", {
    enumerable: true,
    get: function() {
        return resolveOverridableEntityProperty;
    }
});
const resolveOverridableEntityProperty = (entity, property)=>{
    const overrideValue = entity.overrides?.[property];
    return overrideValue !== undefined ? overrideValue : entity[property];
};

//# sourceMappingURL=resolve-overridable-entity-property.util.js.map