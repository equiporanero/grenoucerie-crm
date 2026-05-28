"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemDeletionListener", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemDeletionListener;
    }
});
const _common = require("@nestjs/common");
const _ondatabasebatcheventdecorator = require("../../../api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../api/graphql/graphql-query-runner/enums/database-event-action");
const _messagequeuedecorator = require("../../../core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../core-modules/message-queue/services/message-queue.service");
const _navigationmenuitemdeletionjob = require("../jobs/navigation-menu-item-deletion.job");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let NavigationMenuItemDeletionListener = class NavigationMenuItemDeletionListener {
    async handleDeletedEvent(payload) {
        const deletedRecordIds = payload.events.map(({ recordId })=>recordId);
        if (deletedRecordIds.length === 0) {
            return;
        }
        await this.messageQueueService.add(_navigationmenuitemdeletionjob.NavigationMenuItemDeletionJob.name, {
            workspaceId: payload.workspaceId,
            deletedRecordIds
        });
    }
    constructor(messageQueueService){
        this.messageQueueService = messageQueueService;
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('*', _databaseeventaction.DatabaseEventAction.DELETED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemDeletionListener.prototype, "handleDeletedEvent", null);
NavigationMenuItemDeletionListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.deleteCascadeQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], NavigationMenuItemDeletionListener);

//# sourceMappingURL=navigation-menu-item-deletion.listener.js.map