"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSessionStorageOptions", {
    enumerable: true,
    get: function() {
        return getSessionStorageOptions;
    }
});
const _common = require("@nestjs/common");
const _connectredis = /*#__PURE__*/ _interop_require_default(require("connect-redis"));
const _redis = require("redis");
const _cachestoragetypeenum = require("../cache-storage/types/cache-storage-type.enum");
const _resolvesessioncookiesecretsutil = require("../secret-encryption/utils/resolve-session-cookie-secrets.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const sessionStorageLogger = new _common.Logger('SessionStorage');
const REDIS_PING_INTERVAL_MS = 60_000;
const getSessionStorageOptions = (twentyConfigService)=>{
    const cacheStorageType = _cachestoragetypeenum.CacheStorageType.Redis;
    const SERVER_URL = twentyConfigService.get('SERVER_URL');
    const sessionSecrets = (0, _resolvesessioncookiesecretsutil.resolveSessionCookieSecretsOrThrow)({
        twentyConfigService
    });
    const sessionStorage = {
        secret: sessionSecrets,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            secure: !!(SERVER_URL && SERVER_URL.startsWith('https')),
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 30
        }
    };
    switch(cacheStorageType){
        /* case CacheStorageType.Memory: {
      Logger.warn(
        'Memory session storage is not recommended for production. Prefer Redis.',
      );

      return sessionStorage;
    }*/ case _cachestoragetypeenum.CacheStorageType.Redis:
            {
                const connectionString = twentyConfigService.get('REDIS_URL');
                if (!connectionString) {
                    throw new Error(`${_cachestoragetypeenum.CacheStorageType.Redis} session storage requires REDIS_URL to be defined, check your .env file`);
                }
                const redisClient = (0, _redis.createClient)({
                    url: connectionString,
                    pingInterval: REDIS_PING_INTERVAL_MS
                });
                redisClient.on('error', (err)=>{
                    sessionStorageLogger.error('Redis session-store client error', err);
                });
                redisClient.connect().catch((err)=>{
                    throw new Error(`Redis connection failed: ${err}`);
                });
                return {
                    ...sessionStorage,
                    store: new _connectredis.default({
                        client: redisClient,
                        prefix: 'engine:session:'
                    })
                };
            }
        default:
            throw new Error(`Invalid session-storage (${cacheStorageType}), check your .env file`);
    }
};

//# sourceMappingURL=session-storage.module-factory.js.map