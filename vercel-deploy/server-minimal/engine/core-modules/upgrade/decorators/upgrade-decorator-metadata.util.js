"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "defineUpgradeMetadataOnClassOrProperty", {
    enumerable: true,
    get: function() {
        return defineUpgradeMetadataOnClassOrProperty;
    }
});
require("reflect-metadata");
const _utils = require("twenty-shared/utils");
const defineUpgradeMetadataOnClassOrProperty = ({ classMetadataKey, propertyMetadataKey, value, target, propertyKey })=>{
    if (!(0, _utils.isDefined)(propertyKey)) {
        Reflect.defineMetadata(classMetadataKey, value, target);
        return;
    }
    const constructor = target.constructor;
    const existing = Reflect.getMetadata(propertyMetadataKey, constructor) ?? {};
    Reflect.defineMetadata(propertyMetadataKey, {
        ...existing,
        [String(propertyKey)]: value
    }, constructor);
};

//# sourceMappingURL=upgrade-decorator-metadata.util.js.map