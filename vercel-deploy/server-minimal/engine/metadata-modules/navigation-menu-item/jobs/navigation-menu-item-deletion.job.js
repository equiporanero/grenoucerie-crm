"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NavigationMenuItemDeletionJob", {
    enumerable: true,
    get: function() {
        return NavigationMenuItemDeletionJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../core-modules/message-queue/message-queue.constants");
const _navigationmenuitemdeletionservice = require("../services/navigation-menu-item-deletion.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NavigationMenuItemDeletionJob = class NavigationMenuItemDeletionJob {
    async handle(data) {
        await this.navigationMenuItemDeletionService.deleteNavigationMenuItemsForDeletedRecords(data.deletedRecordIds, data.workspaceId);
    }
    constructor(navigationMenuItemDeletionService){
        this.navigationMenuItemDeletionService = navigationMenuItemDeletionService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(NavigationMenuItemDeletionJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof NavigationMenuItemDeletionJobData === "undefined" ? Object : NavigationMenuItemDeletionJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], NavigationMenuItemDeletionJob.prototype, "handle", null);
NavigationMenuItemDeletionJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.deleteCascadeQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _navigationmenuitemdeletionservice.NavigationMenuItemDeletionService === "undefined" ? Object : _navigationmenuitemdeletionservice.NavigationMenuItemDeletionService
    ])
], NavigationMenuItemDeletionJob);

//# sourceMappingURL=navigation-menu-item-deletion.job.js.map