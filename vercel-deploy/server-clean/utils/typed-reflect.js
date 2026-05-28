"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TypedReflect", {
    enumerable: true,
    get: function() {
        return TypedReflect;
    }
});
require("reflect-metadata");
let TypedReflect = class TypedReflect {
    static defineMetadata(metadataKey, metadataValue, target, propertyKeyOrUndefined) {
        if (propertyKeyOrUndefined === undefined) {
            Reflect.defineMetadata(metadataKey, metadataValue, target);
        } else {
            Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKeyOrUndefined);
        }
    }
    static getMetadata(metadataKey, target, propertyKeyOrUndefined) {
        if (propertyKeyOrUndefined === undefined) {
            return Reflect.getMetadata(metadataKey, target);
        } else {
            return Reflect.getMetadata(metadataKey, target, propertyKeyOrUndefined);
        }
    }
};

//# sourceMappingURL=typed-reflect.js.map