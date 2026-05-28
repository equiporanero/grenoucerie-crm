"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WithLock", {
    enumerable: true,
    get: function() {
        return WithLock;
    }
});
const _common = require("@nestjs/common");
const _cachelockservice = require("./cache-lock.service");
const WithLock = (lockKeyParamPath, options)=>{
    const injectCacheLockService = (0, _common.Inject)(_cachelockservice.CacheLockService);
    return function(target, _propertyKey, descriptor) {
        injectCacheLockService(target, 'cacheLockService');
        const originalMethod = descriptor.value;
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        descriptor.value = async function(...args) {
            const self = this;
            if (!self.cacheLockService) {
                throw new Error('cacheLockService not available on instance');
            }
            if (typeof args[0] !== 'object') {
                throw new Error(`You must use one object parameter to use @WithLock decorator. Received ${args}`);
            }
            const key = args[0][lockKeyParamPath];
            if (typeof key !== 'string') {
                throw new Error(`Could not resolve lock key from path "${lockKeyParamPath}" on first argument`);
            }
            return await self.cacheLockService.withLock(()=>originalMethod.apply(self, args), key, options);
        };
    };
};

//# sourceMappingURL=with-lock.decorator.js.map