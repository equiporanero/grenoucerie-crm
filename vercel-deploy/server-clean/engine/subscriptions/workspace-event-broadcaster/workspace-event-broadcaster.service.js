"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceEventBroadcaster", {
    enumerable: true,
    get: function() {
        return WorkspaceEventBroadcaster;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _eventstreamservice = require("../event-stream.service");
const _subscriptionservice = require("../subscription.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceEventBroadcaster = class WorkspaceEventBroadcaster {
    async broadcast({ workspaceId, events, updatedCollectionHash }) {
        if (events.length === 0) {
            return;
        }
        const activeStreamIds = await this.eventStreamService.getActiveStreamIds(workspaceId);
        if (activeStreamIds.length === 0) {
            return;
        }
        const streamsData = await this.eventStreamService.getStreamsData(workspaceId, activeStreamIds);
        const streamIdsToRemove = [];
        for (const [streamChannelId, streamData] of streamsData){
            if (!(0, _utils.isDefined)(streamData)) {
                streamIdsToRemove.push(streamChannelId);
                continue;
            }
            const streamUserWorkspaceId = streamData.authContext.userWorkspaceId;
            const metadataEventsForStream = events.filter((event)=>{
                // Events without recipientUserWorkspaceIds are workspace-wide; delivered
                // to every stream. Events with the field are user-scoped; only delivered
                // to streams whose authContext.userWorkspaceId is in the list.
                if (!(0, _utils.isDefined)(event.recipientUserWorkspaceIds)) {
                    return true;
                }
                return (0, _utils.isDefined)(streamUserWorkspaceId) && event.recipientUserWorkspaceIds.includes(streamUserWorkspaceId);
            }).map((event)=>({
                    metadataName: event.entityName,
                    type: event.type,
                    recordId: event.recordId,
                    properties: event.properties,
                    updatedCollectionHash
                }));
            if (metadataEventsForStream.length === 0) {
                continue;
            }
            const payload = {
                objectRecordEventsWithQueryIds: [],
                metadataEvents: metadataEventsForStream
            };
            await this.subscriptionService.publishToEventStream({
                workspaceId,
                eventStreamChannelId: streamChannelId,
                payload
            });
        }
        await this.eventStreamService.removeFromActiveStreams(workspaceId, streamIdsToRemove);
    }
    constructor(eventStreamService, subscriptionService){
        this.eventStreamService = eventStreamService;
        this.subscriptionService = subscriptionService;
    }
};
WorkspaceEventBroadcaster = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _eventstreamservice.EventStreamService === "undefined" ? Object : _eventstreamservice.EventStreamService,
        typeof _subscriptionservice.SubscriptionService === "undefined" ? Object : _subscriptionservice.SubscriptionService
    ])
], WorkspaceEventBroadcaster);

//# sourceMappingURL=workspace-event-broadcaster.service.js.map