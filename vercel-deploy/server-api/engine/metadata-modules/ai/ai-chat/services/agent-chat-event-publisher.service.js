"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentChatEventPublisherService", {
    enumerable: true,
    get: function() {
        return AgentChatEventPublisherService;
    }
});
const _common = require("@nestjs/common");
const _redisclientservice = require("../../../../core-modules/redis-client/redis-client.service");
const _subscriptionservice = require("../../../../subscriptions/subscription.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const STREAM_CHUNKS_TTL_SECONDS = 3600;
let AgentChatEventPublisherService = class AgentChatEventPublisherService {
    getStreamChunksKey(threadId) {
        return `agent-chat-stream-chunks:${threadId}`;
    }
    async publish({ threadId, workspaceId, event }) {
        let publishedEvent = event;
        if (event.type === 'stream-chunk') {
            const redis = this.redisClientService.getClient();
            const key = this.getStreamChunksKey(threadId);
            // RPUSH returns the new list length — use it as a 1-based sequence number
            const seq = await redis.rpush(key, JSON.stringify(event.chunk));
            await redis.expire(key, STREAM_CHUNKS_TTL_SECONDS);
            publishedEvent = {
                ...event,
                seq
            };
        } else if (event.type === 'message-persisted') {
            const redis = this.redisClientService.getClient();
            await redis.del(this.getStreamChunksKey(threadId));
        }
        await this.subscriptionService.publishToAgentChat({
            workspaceId,
            threadId,
            payload: {
                onAgentChatEvent: {
                    threadId,
                    event: publishedEvent
                }
            }
        });
    }
    async getAccumulatedChunks(threadId) {
        const redis = this.redisClientService.getClient();
        const rawChunks = await redis.lrange(this.getStreamChunksKey(threadId), 0, -1);
        return {
            chunks: rawChunks.map((raw)=>JSON.parse(raw)),
            maxSeq: rawChunks.length
        };
    }
    constructor(subscriptionService, redisClientService){
        this.subscriptionService = subscriptionService;
        this.redisClientService = redisClientService;
    }
};
AgentChatEventPublisherService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _subscriptionservice.SubscriptionService === "undefined" ? Object : _subscriptionservice.SubscriptionService,
        typeof _redisclientservice.RedisClientService === "undefined" ? Object : _redisclientservice.RedisClientService
    ])
], AgentChatEventPublisherService);

//# sourceMappingURL=agent-chat-event-publisher.service.js.map