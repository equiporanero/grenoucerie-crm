"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlushCacheCommand", {
    enumerable: true,
    get: function() {
        return FlushCacheCommand;
    }
});
const _cachemanager = require("@nestjs/cache-manager");
const _common = require("@nestjs/common");
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _guards = require("@sniptt/guards");
const _cachestorageservice = require("../services/cache-storage.service");
const _cachestoragenamespaceenum = require("../types/cache-storage-namespace.enum");
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
const NAMESPACE_VALUES = Object.values(_cachestoragenamespaceenum.CacheStorageNamespace);
let FlushCacheCommand = class FlushCacheCommand extends _nestcommander.CommandRunner {
    async run(_passedParams, options) {
        try {
            const namespaceArg = options?.namespace;
            const namespacesToFlush = this.computeNamespacesToFlushOrThrow(namespaceArg);
            const pattern = options?.pattern ?? '*';
            this.logger.log(namespacesToFlush.length === 1 ? `Flushing namespace ${namespacesToFlush[0]} for pattern: ${pattern}...` : `Flushing all namespaces for pattern: ${pattern}...`);
            for (const namespace of namespacesToFlush){
                const cacheStorage = new _cachestorageservice.CacheStorageService(this.cacheManager, namespace);
                await cacheStorage.flushByPattern(pattern);
            }
            this.logger.log('Cache flushed');
        } catch (error) {
            this.logger.error(error.message);
        }
    }
    computeNamespacesToFlushOrThrow(value) {
        if (!(0, _utils.isDefined)(value)) {
            return NAMESPACE_VALUES;
        }
        if (!(0, _guards.isNonEmptyString)(value)) {
            throw new Error(`Invalid --namespace: ${value}. Valid values: ${NAMESPACE_VALUES.join(', ')}`);
        }
        return [
            this.parseNamespaceOrThrow(value)
        ];
    }
    parseNamespaceOrThrow(value) {
        if (!NAMESPACE_VALUES.includes(value)) {
            throw new Error(`Invalid --namespace: ${value}. Valid values: ${NAMESPACE_VALUES.join(', ')}`);
        }
        return value;
    }
    parseNamespaceOption(val) {
        return val;
    }
    parsePattern(val) {
        return val;
    }
    constructor(cacheManager){
        super(), this.cacheManager = cacheManager, this.logger = new _common.Logger(FlushCacheCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-n, --namespace <namespace>',
        description: `Cache namespace to flush. Omit to flush all. One of: ${NAMESPACE_VALUES.join(', ')}`
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], FlushCacheCommand.prototype, "parseNamespaceOption", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-p, --pattern <pattern>',
        description: 'Pattern within the namespace (default *). Keys matched are <namespace>:<pattern>.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], FlushCacheCommand.prototype, "parsePattern", null);
FlushCacheCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'cache:flush',
        description: 'Flush cache Redis (REDIS_URL) for a namespace and pattern. Omit --namespace to flush all namespaces. Run: npx nx run twenty-server:command cache:flush'
    }),
    _ts_param(0, (0, _common.Inject)(_cachemanager.CACHE_MANAGER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Cache === "undefined" ? Object : Cache
    ])
], FlushCacheCommand);

//# sourceMappingURL=flush-cache.command.js.map