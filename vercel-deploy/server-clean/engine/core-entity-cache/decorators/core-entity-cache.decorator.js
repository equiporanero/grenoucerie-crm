"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CORE_ENTITY_CACHE_KEY () {
        return CORE_ENTITY_CACHE_KEY;
    },
    get CoreEntityCache () {
        return CoreEntityCache;
    }
});
const _common = require("@nestjs/common");
const CORE_ENTITY_CACHE_KEY = 'CORE_ENTITY_CACHE_KEY';
const CoreEntityCache = (coreEntityCacheKeyName)=>{
    return (target)=>{
        (0, _common.SetMetadata)(CORE_ENTITY_CACHE_KEY, coreEntityCacheKeyName)(target);
    };
};

//# sourceMappingURL=core-entity-cache.decorator.js.map