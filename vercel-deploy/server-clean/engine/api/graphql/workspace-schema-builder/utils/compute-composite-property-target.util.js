"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCompositePropertyTarget", {
    enumerable: true,
    get: function() {
        return computeCompositePropertyTarget;
    }
});
const computeCompositePropertyTarget = (type, compositeProperty)=>{
    return `${type.toString()}->${compositeProperty.name}`;
};

//# sourceMappingURL=compute-composite-property-target.util.js.map