"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RedisClientService", {
    enumerable: true,
    get: function() {
        return RedisClientService;
    }
});
const _common = require("@nestjs/common");
const _ioredis = /*#__PURE__*/ _interop_require_default(require("ioredis"));
const _utils = require("twenty-shared/utils");
const _graphqlredissubscriptions = require("graphql-redis-subscriptions");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RedisClientService = class RedisClientService {
    getQueueClient() {
        if (!this.redisQueueClient) {
            const redisQueueUrl = this.twentyConfigService.get('REDIS_QUEUE_URL') ?? this.twentyConfigService.get('REDIS_URL');
            if (!redisQueueUrl) {
                throw new Error('REDIS_QUEUE_URL or REDIS_URL must be defined');
            }
            this.redisQueueClient = new _ioredis.default(redisQueueUrl, {
                maxRetriesPerRequest: null
            });
        }
        return this.redisQueueClient;
    }
    getClient() {
        if (!this.redisClient) {
            const redisUrl = this.twentyConfigService.get('REDIS_URL');
            if (!redisUrl) {
                throw new Error('REDIS_URL must be defined');
            }
            this.redisClient = new _ioredis.default(redisUrl, {
                maxRetriesPerRequest: null
            });
        }
        return this.redisClient;
    }
    getPubSubClient() {
        if (!this.redisPubSubClient) {
            const redisClient = this.getClient();
            this.redisPubSubClient = new _graphqlredissubscriptions.RedisPubSub({
                publisher: redisClient.duplicate(),
                subscriber: redisClient.duplicate()
            });
        }
        return this.redisPubSubClient;
    }
    async onModuleDestroy() {
        if ((0, _utils.isDefined)(this.redisQueueClient)) {
            await this.redisQueueClient.quit();
            this.redisQueueClient = null;
        }
        if ((0, _utils.isDefined)(this.redisClient)) {
            await this.redisClient.quit();
            this.redisClient = null;
        }
        if ((0, _utils.isDefined)(this.redisPubSubClient)) {
            await this.redisPubSubClient.close();
            this.redisPubSubClient = null;
        }
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
        this.redisClient = null;
        this.redisQueueClient = null;
        this.redisPubSubClient = null;
    }
};
RedisClientService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], RedisClientService);

//# sourceMappingURL=redis-client.service.js.map