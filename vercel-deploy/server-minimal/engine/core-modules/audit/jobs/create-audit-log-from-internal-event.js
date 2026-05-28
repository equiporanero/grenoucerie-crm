"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateAuditLogFromInternalEvent", {
    enumerable: true,
    get: function() {
        return CreateAuditLogFromInternalEvent;
    }
});
const _auditservice = require("../services/audit.service");
const _objectrecordcreated = require("../utils/events/object-event/object-record-created");
const _objectrecorddelete = require("../utils/events/object-event/object-record-delete");
const _objectrecordupdated = require("../utils/events/object-event/object-record-updated");
const _objectrecordupserted = require("../utils/events/object-event/object-record-upserted");
const _processdecorator = require("../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _workspaceeventbatchtype = require("../../../workspace-event-emitter/types/workspace-event-batch.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateAuditLogFromInternalEvent = class CreateAuditLogFromInternalEvent {
    async handle(workspaceEventBatch) {
        for (const eventData of workspaceEventBatch.events){
            // We remove "before" and "after" property for a cleaner/slimmer event payload
            const eventProperties = 'diff' in eventData.properties ? {
                ...eventData.properties,
                diff: eventData.properties.diff
            } : eventData.properties;
            const auditService = this.auditService.createContext({
                workspaceId: workspaceEventBatch.workspaceId,
                userId: eventData.userId
            });
            // Since these are object record events, we use createObjectEvent
            if (workspaceEventBatch.name.endsWith('.updated')) {
                await auditService.createObjectEvent(_objectrecordupdated.OBJECT_RECORD_UPDATED_EVENT, {
                    ...eventProperties,
                    recordId: eventData.recordId,
                    objectMetadataId: workspaceEventBatch.objectMetadata.id
                });
            } else if (workspaceEventBatch.name.endsWith('.created')) {
                await auditService.createObjectEvent(_objectrecordcreated.OBJECT_RECORD_CREATED_EVENT, {
                    ...eventProperties,
                    recordId: eventData.recordId,
                    objectMetadataId: workspaceEventBatch.objectMetadata.id
                });
            } else if (workspaceEventBatch.name.endsWith('.deleted')) {
                await auditService.createObjectEvent(_objectrecorddelete.OBJECT_RECORD_DELETED_EVENT, {
                    ...eventProperties,
                    recordId: eventData.recordId,
                    objectMetadataId: workspaceEventBatch.objectMetadata.id
                });
            } else if (workspaceEventBatch.name.endsWith('.upserted')) {
                await auditService.createObjectEvent(_objectrecordupserted.OBJECT_RECORD_UPSERTED_EVENT, {
                    ...eventProperties,
                    recordId: eventData.recordId,
                    objectMetadataId: workspaceEventBatch.objectMetadata.id
                });
            }
        }
    }
    constructor(auditService){
        this.auditService = auditService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CreateAuditLogFromInternalEvent.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], CreateAuditLogFromInternalEvent.prototype, "handle", null);
CreateAuditLogFromInternalEvent = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.entityEventsToDbQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _auditservice.AuditService === "undefined" ? Object : _auditservice.AuditService
    ])
], CreateAuditLogFromInternalEvent);

//# sourceMappingURL=create-audit-log-from-internal-event.js.map