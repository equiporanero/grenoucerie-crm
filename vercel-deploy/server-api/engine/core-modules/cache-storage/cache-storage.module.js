"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CacheStorageModule", {
    enumerable: true,
    get: function() {
        return CacheStorageModule;
    }
});
const _cachemanager = require("@nestjs/cache-manager");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _cachestoragemodulefactory = require("./cache-storage.module-factory");
const _flushcachecommand = require("./commands/flush-cache.command");
const _cachestorageservice = require("./services/cache-storage.service");
const _cachestoragenamespaceenum = require("./types/cache-storage-namespace.enum");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let CacheStorageModule = class CacheStorageModule {
    async onModuleDestroy() {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        if (this.cacheManager.store?.name === 'redis') {
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            await this.cacheManager.store.client.quit();
        }
    }
    constructor(cacheManager){
        this.cacheManager = cacheManager;
    }
};
CacheStorageModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _cachemanager.CacheModule.registerAsync({
                isGlobal: true,
                imports: [
                    _config.ConfigModule
                ],
                useFactory: _cachestoragemodulefactory.cacheStorageModuleFactory,
                inject: [
                    _twentyconfigservice.TwentyConfigService
                ]
            })
        ],
        providers: [
            ...Object.values(_cachestoragenamespaceenum.CacheStorageNamespace).map((cacheStorageNamespace)=>({
                    provide: cacheStorageNamespace,
                    useFactory: (cacheManager)=>{
                        return new _cachestorageservice.CacheStorageService(cacheManager, cacheStorageNamespace);
                    },
                    inject: [
                        _cachemanager.CACHE_MANAGER
                    ]
                })),
            _flushcachecommand.FlushCacheCommand
        ],
        exports: [
            ...Object.values(_cachestoragenamespaceenum.CacheStorageNamespace),
            _flushcachecommand.FlushCacheCommand
        ]
    }),
    _ts_param(0, (0, _common.Inject)(_cachemanager.CACHE_MANAGER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachemanager.Cache === "undefined" ? Object : _cachemanager.Cache
    ])
], CacheStorageModule);

//# sourceMappingURL=cache-storage.module.js.map