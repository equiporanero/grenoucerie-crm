"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingAddSingleMessageToCacheForImportJob", {
    enumerable: true,
    get: function() {
        return MessagingAddSingleMessageToCacheForImportJob;
    }
});
const _cachestoragedecorator = require("../../../../engine/core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
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
let MessagingAddSingleMessageToCacheForImportJob = class MessagingAddSingleMessageToCacheForImportJob {
    async handle(data) {
        const { messageExternalId, messageChannelId, workspaceId } = data;
        await this.cacheStorage.setAdd(`messages-to-import:${workspaceId}:${messageChannelId}`, [
            messageExternalId
        ]);
    }
    constructor(cacheStorage){
        this.cacheStorage = cacheStorage;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingAddSingleMessageToCacheForImportJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MessagingAddSingleMessageToCacheForImportJobData === "undefined" ? Object : MessagingAddSingleMessageToCacheForImportJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingAddSingleMessageToCacheForImportJob.prototype, "handle", null);
MessagingAddSingleMessageToCacheForImportJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.messagingQueue),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleMessaging)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], MessagingAddSingleMessageToCacheForImportJob);

//# sourceMappingURL=messaging-add-single-message-to-cache-for-import.job.js.map