"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilesFieldDeletionListener", {
    enumerable: true,
    get: function() {
        return FilesFieldDeletionListener;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _ondatabasebatcheventdecorator = require("../../../../api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../../api/graphql/graphql-query-runner/enums/database-event-action");
const _getflatfieldsforflatobjectmetadatautil = require("../../../../api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _filesfielddeletionjob = require("../jobs/files-field-deletion.job");
const _messagequeuedecorator = require("../../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../../message-queue/services/message-queue.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildobjectidbynamemapsutil = require("../../../../metadata-modules/flat-object-metadata/utils/build-object-id-by-name-maps.util");
const _workspaceeventbatchtype = require("../../../../workspace-event-emitter/types/workspace-event-batch.type");
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
let FilesFieldDeletionListener = class FilesFieldDeletionListener {
    async handleDestroyedEvent(payload) {
        const workspaceId = payload.workspaceId;
        const objectMetadata = payload.objectMetadata;
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const { idByNameSingular } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
        const objectId = idByNameSingular[objectMetadata.nameSingular];
        if (!(0, _utils.isDefined)(objectId)) {
            return;
        }
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: objectId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            return;
        }
        const objectFields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps);
        const filesFields = objectFields.filter((field)=>field.type === _types.FieldMetadataType.FILES);
        if (filesFields.length === 0) {
            return;
        }
        const fileIds = new Set();
        for (const event of payload.events){
            const recordBefore = event.properties.before;
            for (const filesField of filesFields){
                const filesValue = recordBefore[filesField.name];
                if (!(0, _utils.isDefined)(filesValue)) {
                    continue;
                }
                const fileItems = filesValue;
                for (const fileItem of fileItems){
                    if (!(0, _utils.isDefined)(fileItem.fileId)) {
                        continue;
                    }
                    fileIds.add(fileItem.fileId);
                }
            }
        }
        if (fileIds.size > 0) {
            await this.messageQueueService.add(_filesfielddeletionjob.FilesFieldDeletionJob.name, {
                workspaceId,
                fileIds: Array.from(fileIds)
            });
        }
    }
    constructor(messageQueueService, workspaceManyOrAllFlatEntityMapsCacheService){
        this.messageQueueService = messageQueueService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('*', _databaseeventaction.DatabaseEventAction.DESTROYED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], FilesFieldDeletionListener.prototype, "handleDestroyedEvent", null);
FilesFieldDeletionListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.deleteCascadeQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], FilesFieldDeletionListener);

//# sourceMappingURL=files-field-deletion.listener.js.map