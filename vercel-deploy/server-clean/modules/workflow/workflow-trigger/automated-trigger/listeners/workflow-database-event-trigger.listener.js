"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowDatabaseEventTriggerListener", {
    enumerable: true,
    get: function() {
        return WorkflowDatabaseEventTriggerListener;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _ondatabasebatcheventdecorator = require("../../../../../engine/api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../../../engine/api/graphql/graphql-query-runner/enums/database-event-action");
const _messagequeuedecorator = require("../../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../../engine/core-modules/message-queue/services/message-queue.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../../engine/metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowautomatedtriggerworkspaceentity = require("../../../common/standard-objects/workflow-automated-trigger.workspace-entity");
const _workflowcommonworkspaceservice = require("../../../common/workspace-services/workflow-common.workspace-service");
const _workflowtriggerjob = require("../../jobs/workflow-trigger.job");
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
let WorkflowDatabaseEventTriggerListener = class WorkflowDatabaseEventTriggerListener {
    async handleObjectRecordCreateEvent(payload) {
        if (await this.shouldIgnoreEvent(payload)) {
            return;
        }
        const clonedPayload = structuredClone(payload);
        await this.enrichCreatedEvent(clonedPayload);
        await this.handleEvent({
            payload: clonedPayload,
            action: _databaseeventaction.DatabaseEventAction.CREATED
        });
    }
    async handleObjectRecordUpdateEvent(payload) {
        if (await this.shouldIgnoreEvent(payload)) {
            return;
        }
        const clonedPayload = structuredClone(payload);
        await this.enrichUpdatedEvent(clonedPayload);
        await this.handleEvent({
            payload: clonedPayload,
            action: _databaseeventaction.DatabaseEventAction.UPDATED
        });
    }
    async handleObjectRecordDeleteEvent(payload) {
        if (await this.shouldIgnoreEvent(payload)) {
            return;
        }
        const clonedPayload = structuredClone(payload);
        await this.enrichDeletedEvent(clonedPayload);
        await this.handleEvent({
            payload: clonedPayload,
            action: _databaseeventaction.DatabaseEventAction.DELETED
        });
    }
    async handleObjectRecordDestroyEvent(payload) {
        if (await this.shouldIgnoreEvent(payload)) {
            return;
        }
        const clonedPayload = structuredClone(payload);
        await this.enrichDestroyedEvent(clonedPayload);
        await this.handleEvent({
            payload: clonedPayload,
            action: _databaseeventaction.DatabaseEventAction.DESTROYED
        });
    }
    async handleObjectRecordUpsertEvent(payload) {
        if (await this.shouldIgnoreEvent(payload)) {
            return;
        }
        const clonedPayload = structuredClone(payload);
        await this.handleEvent({
            payload: clonedPayload,
            action: _databaseeventaction.DatabaseEventAction.UPSERTED
        });
    }
    async enrichCreatedEvent(payload) {
        const workspaceId = payload.workspaceId;
        const { flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(payload.objectMetadata.nameSingular, workspaceId);
        await this.enrichRecordsWithRelations({
            records: payload.events.map((event)=>event.properties.after),
            workspaceId,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
    }
    async enrichUpdatedEvent(payload) {
        const workspaceId = payload.workspaceId;
        const { flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(payload.objectMetadata.nameSingular, workspaceId);
        await this.enrichRecordsWithRelations({
            records: payload.events.map((event)=>event.properties.before),
            workspaceId,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
        await this.enrichRecordsWithRelations({
            records: payload.events.map((event)=>event.properties.after),
            workspaceId,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
    }
    async enrichDeletedEvent(payload) {
        const workspaceId = payload.workspaceId;
        const { flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(payload.objectMetadata.nameSingular, workspaceId);
        await this.enrichRecordsWithRelations({
            records: payload.events.map((event)=>event.properties.before),
            workspaceId,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
    }
    async enrichDestroyedEvent(payload) {
        const workspaceId = payload.workspaceId;
        const { flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workflowCommonWorkspaceService.getObjectMetadataInfo(payload.objectMetadata.nameSingular, workspaceId);
        await this.enrichRecordsWithRelations({
            records: payload.events.map((event)=>event.properties.before),
            workspaceId,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
    }
    async enrichRecordsWithRelations({ records, workspaceId, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const { fieldIdByJoinColumnName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
            for (const [joinColumnName, joinFieldId] of Object.entries(fieldIdByJoinColumnName)){
                const joinField = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityMaps: flatFieldMetadataMaps,
                    flatEntityId: joinFieldId
                });
                const joinRecordIds = records.map((record)=>record[joinColumnName]).filter(_utils.isDefined);
                if (joinRecordIds.length === 0) {
                    continue;
                }
                const relatedObjectMetadataId = joinField.relationTargetObjectMetadataId;
                if (!(0, _utils.isDefined)(relatedObjectMetadataId)) {
                    continue;
                }
                const relatedObjectMetadataNameSingular = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: relatedObjectMetadataId,
                    flatEntityMaps: flatObjectMetadataMaps
                })?.nameSingular;
                if (!(0, _utils.isDefined)(relatedObjectMetadataNameSingular)) {
                    continue;
                }
                const relatedObjectRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, relatedObjectMetadataNameSingular, {
                    shouldBypassPermissionChecks: true
                });
                const relatedRecords = await relatedObjectRepository.find({
                    where: {
                        id: (0, _typeorm.In)(joinRecordIds)
                    }
                });
                for (const record of records){
                    record[joinField.name] = relatedRecords.find((relatedRecord)=>relatedRecord.id === record[joinColumnName]);
                }
            }
        }, authContext);
    }
    async shouldIgnoreEvent(payload) {
        const workspaceId = payload.workspaceId;
        const databaseEventName = payload.name;
        if (!workspaceId || !databaseEventName) {
            this.logger.error(`Missing workspaceId or eventName in payload ${JSON.stringify(payload)}`);
            return true;
        }
        return false;
    }
    async handleEvent({ payload, action }) {
        const workspaceId = payload.workspaceId;
        const databaseEventName = payload.name;
        const automatedTriggerTableName = 'workflowAutomatedTrigger';
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowAutomatedTriggerRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, automatedTriggerTableName, {
                shouldBypassPermissionChecks: true
            });
            const eventListeners = await workflowAutomatedTriggerRepository.find({
                where: {
                    type: _workflowautomatedtriggerworkspaceentity.AutomatedTriggerType.DATABASE_EVENT,
                    settings: (0, _typeorm.Raw)(()=>`"${automatedTriggerTableName}"."settings"->>'eventName' = :eventName`, {
                        eventName: databaseEventName
                    })
                }
            });
            for (const eventListener of eventListeners){
                for (const eventPayload of payload.events){
                    const shouldTriggerJob = this.shouldTriggerJob({
                        eventPayload,
                        eventListener,
                        action
                    });
                    if (shouldTriggerJob) {
                        await this.messageQueueService.add(_workflowtriggerjob.WorkflowTriggerJob.name, {
                            workspaceId,
                            workflowId: eventListener.workflowId,
                            payload: eventPayload
                        }, {
                            retryLimit: 3
                        });
                    }
                }
            }
        }, authContext);
    }
    shouldTriggerJob({ eventPayload, eventListener, action }) {
        if (action === _databaseeventaction.DatabaseEventAction.UPDATED) {
            const settings = eventListener.settings;
            const updateEventPayload = eventPayload;
            return !settings.fields || settings.fields.length === 0 || settings.fields.some((field)=>updateEventPayload?.properties?.updatedFields?.includes(field));
        }
        if (action === _databaseeventaction.DatabaseEventAction.UPSERTED) {
            const settings = eventListener.settings;
            const upsertEventPayload = eventPayload;
            return !settings.fields || settings.fields.length === 0 || settings.fields.some((field)=>upsertEventPayload?.properties?.updatedFields?.includes(field));
        }
        return true;
    }
    constructor(globalWorkspaceOrmManager, messageQueueService, workflowCommonWorkspaceService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageQueueService = messageQueueService;
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
        this.logger = new _common.Logger(WorkflowDatabaseEventTriggerListener.name);
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('*', _databaseeventaction.DatabaseEventAction.CREATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEventBatch === "undefined" ? Object : WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowDatabaseEventTriggerListener.prototype, "handleObjectRecordCreateEvent", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('*', _databaseeventaction.DatabaseEventAction.UPDATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEventBatch === "undefined" ? Object : WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowDatabaseEventTriggerListener.prototype, "handleObjectRecordUpdateEvent", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('*', _databaseeventaction.DatabaseEventAction.DELETED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEventBatch === "undefined" ? Object : WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowDatabaseEventTriggerListener.prototype, "handleObjectRecordDeleteEvent", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('*', _databaseeventaction.DatabaseEventAction.DESTROYED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEventBatch === "undefined" ? Object : WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowDatabaseEventTriggerListener.prototype, "handleObjectRecordDestroyEvent", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('*', _databaseeventaction.DatabaseEventAction.UPSERTED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEventBatch === "undefined" ? Object : WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowDatabaseEventTriggerListener.prototype, "handleObjectRecordUpsertEvent", null);
WorkflowDatabaseEventTriggerListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workflowQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
    ])
], WorkflowDatabaseEventTriggerListener);

//# sourceMappingURL=workflow-database-event-trigger.listener.js.map