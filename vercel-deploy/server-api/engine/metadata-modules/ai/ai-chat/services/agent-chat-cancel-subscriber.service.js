"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentChatCancelSubscriberService", {
    enumerable: true,
    get: function() {
        return AgentChatCancelSubscriberService;
    }
});
const _common = require("@nestjs/common");
const _redisclientservice = require("../../../../core-modules/redis-client/redis-client.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentChatCancelSubscriberService = class AgentChatCancelSubscriberService {
    ensureSubscriber() {
        if (!this.subscriber) {
            this.subscriber = this.redisClientService.getClient().duplicate();
            this.subscriber.on('message', (channel)=>{
                const callback = this.callbacks.get(channel);
                if (callback) {
                    callback();
                    this.callbacks.delete(channel);
                    this.subscriber?.unsubscribe(channel).catch(()=>{});
                }
            });
        }
        return this.subscriber;
    }
    async subscribe(channel, onCancel) {
        this.callbacks.set(channel, onCancel);
        await this.ensureSubscriber().subscribe(channel);
    }
    async unsubscribe(channel) {
        this.callbacks.delete(channel);
        await this.subscriber?.unsubscribe(channel).catch(()=>{});
    }
    async onModuleDestroy() {
        if (this.subscriber) {
            await this.subscriber.quit().catch(()=>{});
            this.subscriber = null;
        }
        this.callbacks.clear();
    }
    constructor(redisClientService){
        this.redisClientService = redisClientService;
        this.logger = new _common.Logger(AgentChatCancelSubscriberService.name);
        this.subscriber = null;
        this.callbacks = new Map();
    }
};
AgentChatCancelSubscriberService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _redisclientservice.RedisClientService === "undefined" ? Object : _redisclientservice.RedisClientService
    ])
], AgentChatCancelSubscriberService);

//# sourceMappingURL=agent-chat-cancel-subscriber.service.js.map