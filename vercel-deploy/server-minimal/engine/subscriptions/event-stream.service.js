"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventStreamService", {
    enumerable: true,
    get: function() {
        return EventStreamService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _cachelockservice = require("../core-modules/cache-lock/cache-lock.service");
const _withlockdecorator = require("../core-modules/cache-lock/with-lock.decorator");
const _cachestoragedecorator = require("../core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../core-modules/cache-storage/types/cache-storage-namespace.enum");
const _metricsservice = require("../core-modules/metrics/metrics.service");
const _eventstreamttlconstant = require("./constants/event-stream-ttl.constant");
const _eventstreamexception = require("./event-stream.exception");
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
let EventStreamService = class EventStreamService {
    onModuleInit() {
        this.metricsService.createObservableGauge({
            metricName: 'twenty_event_streams_live_total',
            options: {
                description: 'Current number of live event streams'
            },
            callback: async ()=>{
                return this.getTotalActiveStreamCount();
            },
            cacheValue: true
        });
    }
    async getTotalActiveStreamCount() {
        return this.cacheStorageService.scanAndCountSetMembers('workspace:*:activeStreams');
    }
    async createEventStream({ workspaceId, eventStreamChannelId, authContext }) {
        const key = this.getEventStreamKey(workspaceId, eventStreamChannelId);
        const existing = await this.cacheStorageService.get(key);
        if ((0, _utils.isDefined)(existing)) {
            throw new _eventstreamexception.EventStreamException('Event stream already exists', _eventstreamexception.EventStreamExceptionCode.EVENT_STREAM_ALREADY_EXISTS);
        }
        const streamData = {
            authContext,
            workspaceId,
            queries: {},
            createdAt: Date.now()
        };
        await this.cacheStorageService.set(key, streamData, _eventstreamttlconstant.EVENT_STREAM_TTL_MS);
        const activeStreamsKey = this.getActiveStreamsKey(workspaceId);
        await this.cacheLockService.withLock(async ()=>{
            await this.cacheStorageService.setAdd(activeStreamsKey, [
                eventStreamChannelId
            ], _eventstreamttlconstant.EVENT_STREAM_TTL_MS);
        }, activeStreamsKey);
    }
    async destroyEventStream({ workspaceId, eventStreamChannelId }) {
        const key = this.getEventStreamKey(workspaceId, eventStreamChannelId);
        await this.cacheStorageService.del(key);
        const activeStreamsKey = this.getActiveStreamsKey(workspaceId);
        await this.cacheLockService.withLock(async ()=>{
            await this.cacheStorageService.setRemove(activeStreamsKey, [
                eventStreamChannelId
            ]);
        }, activeStreamsKey);
    }
    async getActiveStreamIds(workspaceId) {
        return this.cacheStorageService.setMembers(this.getActiveStreamsKey(workspaceId));
    }
    async removeFromActiveStreams(workspaceId, streamIdsToRemove) {
        if (streamIdsToRemove.length === 0) {
            return;
        }
        const activeStreamsKey = this.getActiveStreamsKey(workspaceId);
        await this.cacheLockService.withLock(async ()=>{
            await this.cacheStorageService.setRemove(activeStreamsKey, streamIdsToRemove);
        }, activeStreamsKey);
    }
    async getStreamsData(workspaceId, streamChannelIds) {
        if (streamChannelIds.length === 0) {
            return new Map();
        }
        const keys = streamChannelIds.map((id)=>this.getEventStreamKey(workspaceId, id));
        const values = await this.cacheStorageService.mget(keys);
        const result = new Map();
        streamChannelIds.forEach((id, index)=>{
            result.set(id, values[index]);
        });
        return result;
    }
    async isAuthorized({ authContext, streamData }) {
        if ((0, _utils.isDefined)(authContext.userWorkspaceId)) {
            return streamData.authContext.userWorkspaceId === authContext.userWorkspaceId;
        }
        if ((0, _utils.isDefined)(authContext.apiKeyId)) {
            return streamData.authContext.apiKeyId === authContext.apiKeyId;
        }
        return false;
    }
    async addQuery({ workspaceId, eventStreamChannelId, queryId, operationSignature }) {
        const key = this.getEventStreamKey(workspaceId, eventStreamChannelId);
        const existing = await this.cacheStorageService.get(key);
        if (!(0, _utils.isDefined)(existing)) {
            return;
        }
        existing.queries[queryId] = operationSignature;
        await this.cacheStorageService.set(key, existing, _eventstreamttlconstant.EVENT_STREAM_TTL_MS);
    }
    async removeQuery({ workspaceId, eventStreamChannelId, queryId }) {
        const key = this.getEventStreamKey(workspaceId, eventStreamChannelId);
        const existing = await this.cacheStorageService.get(key);
        if ((0, _utils.isDefined)(existing) && (0, _utils.isDefined)(existing.queries[queryId])) {
            delete existing.queries[queryId];
            await this.cacheStorageService.set(key, existing, _eventstreamttlconstant.EVENT_STREAM_TTL_MS);
        }
    }
    async refreshEventStreamTTL({ workspaceId, eventStreamChannelId }) {
        const eventStreamKey = this.getEventStreamKey(workspaceId, eventStreamChannelId);
        const activeStreamsKey = this.getActiveStreamsKey(workspaceId);
        const [eventStreamRefreshed, activeStreamsRefreshed] = await Promise.all([
            this.cacheStorageService.expire(eventStreamKey, _eventstreamttlconstant.EVENT_STREAM_TTL_MS),
            this.cacheStorageService.expire(activeStreamsKey, _eventstreamttlconstant.EVENT_STREAM_TTL_MS)
        ]);
        return eventStreamRefreshed && activeStreamsRefreshed;
    }
    getEventStreamKey(workspaceId, eventStreamId) {
        return `eventStream:${workspaceId}:${eventStreamId}`;
    }
    getActiveStreamsKey(workspaceId) {
        return `workspace:${workspaceId}:activeStreams`;
    }
    async getStreamData(workspaceId, eventStreamChannelId) {
        const key = this.getEventStreamKey(workspaceId, eventStreamChannelId);
        return this.cacheStorageService.get(key);
    }
    constructor(cacheStorageService, cacheLockService, metricsService){
        this.cacheStorageService = cacheStorageService;
        this.cacheLockService = cacheLockService;
        this.metricsService = metricsService;
        this.logger = new _common.Logger(EventStreamService.name);
    }
};
_ts_decorate([
    (0, _withlockdecorator.WithLock)('eventStreamChannelId'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], EventStreamService.prototype, "addQuery", null);
_ts_decorate([
    (0, _withlockdecorator.WithLock)('eventStreamChannelId'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], EventStreamService.prototype, "removeQuery", null);
EventStreamService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineSubscriptions)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _cachelockservice.CacheLockService === "undefined" ? Object : _cachelockservice.CacheLockService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], EventStreamService);

//# sourceMappingURL=event-stream.service.js.map