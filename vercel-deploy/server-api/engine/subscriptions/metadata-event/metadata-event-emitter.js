"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataEventEmitter", {
    enumerable: true,
    get: function() {
        return MetadataEventEmitter;
    }
});
const _common = require("@nestjs/common");
const _eventemitter = require("@nestjs/event-emitter");
const _utils = require("twenty-shared/utils");
const _workspaceauthcontextstorage = require("../../core-modules/auth/storage/workspace-auth-context.storage");
const _computemetadataeventnameutil = require("./utils/compute-metadata-event-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MetadataEventEmitter = class MetadataEventEmitter {
    emitMetadataEvents({ metadataEvents, workspaceId, initiatorContext }) {
        if (metadataEvents.length === 0) {
            return;
        }
        const resolvedInitiatorContext = this.resolveInitiatorContext(initiatorContext);
        const userId = resolvedInitiatorContext?.type === 'user' || resolvedInitiatorContext?.type === 'pendingActivationUser' ? resolvedInitiatorContext.user.id : undefined;
        const apiKeyId = resolvedInitiatorContext?.type === 'apiKey' ? resolvedInitiatorContext.apiKey.id : undefined;
        const grouped = this.groupByMetadataNameAndAction(metadataEvents);
        for (const { eventName, events, metadataName, type } of grouped.values()){
            if (metadataEvents.length === 0) {
                continue;
            }
            const metadataEventBatch = {
                name: eventName,
                workspaceId,
                metadataName,
                type,
                events,
                userId,
                apiKeyId
            };
            this.eventEmitter.emit(eventName, metadataEventBatch);
        }
    }
    resolveInitiatorContext(initiatorContext) {
        if ((0, _utils.isDefined)(initiatorContext)) {
            return initiatorContext;
        }
        try {
            return (0, _workspaceauthcontextstorage.getWorkspaceAuthContext)();
        } catch  {
            return undefined;
        }
    }
    groupByMetadataNameAndAction(metadataEvents) {
        const grouped = new Map();
        for (const metadataEvent of metadataEvents){
            const { metadataName, type } = metadataEvent;
            const eventName = (0, _computemetadataeventnameutil.computeMetadataEventName)({
                metadataName,
                type
            });
            const occurence = grouped.get(eventName);
            if (!(0, _utils.isDefined)(occurence)) {
                grouped.set(eventName, {
                    eventName,
                    metadataName,
                    type,
                    events: [
                        metadataEvent
                    ]
                });
                continue;
            }
            grouped.set(eventName, {
                ...occurence,
                events: [
                    ...occurence.events,
                    metadataEvent
                ]
            });
        }
        return grouped;
    }
    constructor(eventEmitter){
        this.eventEmitter = eventEmitter;
    }
};
MetadataEventEmitter = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _eventemitter.EventEmitter2 === "undefined" ? Object : _eventemitter.EventEmitter2
    ])
], MetadataEventEmitter);

//# sourceMappingURL=metadata-event-emitter.js.map