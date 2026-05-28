"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubscriptionService", {
    enumerable: true,
    get: function() {
        return SubscriptionService;
    }
});
const _common = require("@nestjs/common");
const _redisclientservice = require("../core-modules/redis-client/redis-client.service");
const _subscriptionchannelenum = require("./enums/subscription-channel.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SubscriptionService = class SubscriptionService {
    getSubscriptionChannel({ channel, workspaceId }) {
        return `${channel}:${workspaceId}`;
    }
    getEventStreamChannel({ workspaceId, eventStreamChannelId }) {
        return `${_subscriptionchannelenum.SubscriptionChannel.EVENT_STREAM_CHANNEL}:${workspaceId}:${eventStreamChannelId}`;
    }
    async subscribe({ channel, workspaceId }) {
        const client = this.redisClient.getPubSubClient();
        return client.asyncIterator(this.getSubscriptionChannel({
            channel,
            workspaceId
        }));
    }
    async subscribeToEventStream({ workspaceId, eventStreamChannelId }) {
        const client = this.redisClient.getPubSubClient();
        return client.asyncIterator(this.getEventStreamChannel({
            workspaceId,
            eventStreamChannelId
        }));
    }
    async publish({ channel, payload, workspaceId }) {
        const client = this.redisClient.getPubSubClient();
        await client.publish(this.getSubscriptionChannel({
            channel,
            workspaceId
        }), payload);
    }
    async publishToEventStream({ workspaceId, eventStreamChannelId, payload }) {
        const client = this.redisClient.getPubSubClient();
        await client.publish(this.getEventStreamChannel({
            workspaceId,
            eventStreamChannelId
        }), payload);
    }
    getAgentChatChannel({ workspaceId, threadId }) {
        return `${_subscriptionchannelenum.SubscriptionChannel.AGENT_CHAT_CHANNEL}:${workspaceId}:${threadId}`;
    }
    async subscribeToAgentChat({ workspaceId, threadId }) {
        const client = this.redisClient.getPubSubClient();
        return client.asyncIterator(this.getAgentChatChannel({
            workspaceId,
            threadId
        }));
    }
    async publishToAgentChat({ workspaceId, threadId, payload }) {
        const client = this.redisClient.getPubSubClient();
        await client.publish(this.getAgentChatChannel({
            workspaceId,
            threadId
        }), payload);
    }
    constructor(redisClient){
        this.redisClient = redisClient;
    }
};
SubscriptionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _redisclientservice.RedisClientService === "undefined" ? Object : _redisclientservice.RedisClientService
    ])
], SubscriptionService);

//# sourceMappingURL=subscription.service.js.map