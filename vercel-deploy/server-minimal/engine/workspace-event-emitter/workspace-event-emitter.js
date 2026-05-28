"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceEventEmitter", {
    enumerable: true,
    get: function() {
        return WorkspaceEventEmitter;
    }
});
const _common = require("@nestjs/common");
const _eventemitter = require("@nestjs/event-emitter");
const _utils = require("twenty-shared/utils");
const _computeeventname = require("./utils/compute-event-name");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceEventEmitter = class WorkspaceEventEmitter {
    emitDatabaseBatchEvent(databaseBatchEventInput) {
        if (!(0, _utils.isDefined)(databaseBatchEventInput)) {
            return;
        }
        const { objectMetadataNameSingular, action, events, objectMetadata, workspaceId } = databaseBatchEventInput;
        if (!events.length) {
            return;
        }
        const eventName = (0, _computeeventname.computeEventName)(objectMetadataNameSingular, action);
        const workspaceEventBatch = {
            name: eventName,
            workspaceId,
            objectMetadata,
            events
        };
        this.eventEmitter.emit(eventName, workspaceEventBatch);
    }
    emitCustomBatchEvent(eventName, events, workspaceId) {
        if (!events.length) {
            return;
        }
        const customWorkspaceEventBatch = {
            name: eventName,
            workspaceId,
            events
        };
        this.eventEmitter.emit(eventName, customWorkspaceEventBatch);
    }
    constructor(eventEmitter){
        this.eventEmitter = eventEmitter;
    }
};
WorkspaceEventEmitter = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _eventemitter.EventEmitter2 === "undefined" ? Object : _eventemitter.EventEmitter2
    ])
], WorkspaceEventEmitter);

//# sourceMappingURL=workspace-event-emitter.js.map