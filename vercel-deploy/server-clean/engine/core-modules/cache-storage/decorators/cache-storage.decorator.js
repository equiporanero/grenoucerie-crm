"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InjectCacheStorage", {
    enumerable: true,
    get: function() {
        return InjectCacheStorage;
    }
});
const _common = require("@nestjs/common");
const InjectCacheStorage = (cacheStorageNamespace)=>{
    return (0, _common.Inject)(cacheStorageNamespace);
};

//# sourceMappingURL=cache-storage.decorator.js.map