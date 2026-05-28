"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectRecordEventPublisher", {
    enumerable: true,
    get: function() {
        return ObjectRecordEventPublisher;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _processnestedrelationshelper = require("../../api/common/common-nested-relations-processor/process-nested-relations.helper");
const _commonselectfieldshelper = require("../../api/common/common-select-fields/common-select-fields-helper");
const _databaseeventaction = require("../../api/graphql/graphql-query-runner/enums/database-event-action");
const _graphqlqueryparser = require("../../api/graphql/graphql-query-runner/graphql-query-parsers/graphql-query.parser");
const _workspacemanyorallflatentitymapscacheservice = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _eventstreamservice = require("../event-stream.service");
const _subscriptionservice = require("../subscription.service");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildrowlevelpermissionrecordfilterutil = require("../../twenty-orm/utils/build-row-level-permission-record-filter.util");
const _isrecordmatchingrlsrowlevelpermissionpredicateutil = require("../../twenty-orm/utils/is-record-matching-rls-row-level-permission-predicate.util");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
const _parseeventname = require("../../workspace-event-emitter/utils/parse-event-name");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectRecordEventPublisher = class ObjectRecordEventPublisher {
    async publish(eventBatch) {
        const workspaceId = eventBatch.workspaceId;
        const activeStreamIds = await this.eventStreamService.getActiveStreamIds(workspaceId);
        if (activeStreamIds.length === 0) {
            return;
        }
        const streamsData = await this.eventStreamService.getStreamsData(workspaceId, activeStreamIds);
        const { permissionsContext, flatWorkspaceMemberMaps } = await this.fetchObjectRecordStreamContext(workspaceId);
        const streamIdsToRemove = [];
        for (const [streamChannelId, streamData] of streamsData){
            if (!(0, _utils.isDefined)(streamData)) {
                streamIdsToRemove.push(streamChannelId);
                continue;
            }
            if (Object.keys(streamData.queries).length === 0) {
                continue;
            }
            await this.processObjectRecordStreamEvents({
                streamChannelId,
                streamData,
                workspaceEventBatch: eventBatch,
                permissionsContext,
                flatWorkspaceMemberMaps
            });
        }
        await this.eventStreamService.removeFromActiveStreams(workspaceId, streamIdsToRemove);
    }
    async fetchObjectRecordStreamContext(workspaceId) {
        const permissionsContext = await this.fetchPermissionsContext(workspaceId);
        const { flatWorkspaceMemberMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatWorkspaceMemberMaps'
        ]);
        return {
            permissionsContext,
            flatWorkspaceMemberMaps
        };
    }
    async processObjectRecordStreamEvents({ streamChannelId, streamData, workspaceEventBatch, permissionsContext, flatWorkspaceMemberMaps }) {
        const { userWorkspaceId } = streamData.authContext;
        if (!(0, _utils.isDefined)(userWorkspaceId)) {
            return;
        }
        const roleId = permissionsContext.userWorkspaceRoleMap[userWorkspaceId];
        if (!(0, _utils.isDefined)(roleId)) {
            return;
        }
        const objectPermissions = permissionsContext.rolesPermissions[roleId]?.[workspaceEventBatch.objectMetadata.id];
        if (!objectPermissions?.canReadObjectRecords) {
            return;
        }
        const matchedEvents = [];
        const objectNameSingular = workspaceEventBatch.objectMetadata.nameSingular;
        const subscriberRLSFilter = this.buildSubscriberRLSFilter(streamData.authContext, roleId, workspaceEventBatch.objectMetadata, permissionsContext, flatWorkspaceMemberMaps);
        const restrictedFields = objectPermissions.restrictedFields;
        for (const event of workspaceEventBatch.events){
            const { action } = (0, _parseeventname.parseEventNameOrThrow)(workspaceEventBatch.name);
            const eventWithObjectName = {
                action,
                objectNameSingular,
                ...event
            };
            const filteredEvent = this.filterRestrictedFieldsFromEvent(eventWithObjectName, restrictedFields, permissionsContext.flatFieldMetadataMaps);
            const filteredProperties = filteredEvent.properties;
            if ((0, _utils.isDefined)(filteredProperties.updatedFields) && filteredProperties.updatedFields.length === 0) {
                continue;
            }
            const matchedQueryIds = this.getMatchingObjectRecordQueryIds(streamData.queries, filteredEvent, subscriberRLSFilter, workspaceEventBatch.objectMetadata, permissionsContext.flatFieldMetadataMaps);
            if (matchedQueryIds.length === 0) {
                continue;
            }
            matchedEvents.push({
                queryIds: matchedQueryIds,
                objectRecordEvent: filteredEvent
            });
        }
        if (matchedEvents.length > 0) {
            await this.enrichEventBatchWithNestedRelations({
                objectMetadata: workspaceEventBatch.objectMetadata,
                events: matchedEvents.map((matchedEvent)=>matchedEvent.objectRecordEvent),
                streamData,
                permissionsContext,
                workspaceId: workspaceEventBatch.workspaceId,
                roleId
            });
            const payload = {
                objectRecordEventsWithQueryIds: matchedEvents,
                metadataEvents: []
            };
            await this.subscriptionService.publishToEventStream({
                workspaceId: workspaceEventBatch.workspaceId,
                eventStreamChannelId: streamChannelId,
                payload
            });
        }
    }
    async enrichEventBatchWithNestedRelations({ streamData, objectMetadata, events, workspaceId, permissionsContext, roleId }) {
        const { flatFieldMetadataMaps, flatObjectMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const allRecords = [];
        for (const event of events){
            if ('before' in event.properties) {
                const recordBefore = event.properties.before;
                if ((0, _utils.isDefined)(recordBefore)) {
                    allRecords.push(recordBefore);
                }
            }
            if ('after' in event.properties) {
                const recordAfter = event.properties.after;
                if ((0, _utils.isDefined)(recordAfter)) {
                    allRecords.push(recordAfter);
                }
            }
        }
        const rolePermissionConfig = {
            intersectionOf: [
                roleId
            ]
        };
        const globalWorkspaceDataSource = await this.globalWorkspaceOrmManager.getGlobalWorkspaceDataSourceReplica();
        const selectedFields = this.commonSelectFieldsHelper.computeFromDepth({
            depth: 1,
            flatObjectMetadata: objectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            objectsPermissions: permissionsContext.rolesPermissions[roleId],
            onlyUseLabelIdentifierFieldsInRelations: true,
            recurseIntoJunctionTableRelations: true
        });
        const commonQueryParser = new _graphqlqueryparser.GraphqlQueryParser(objectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps);
        const selectedFieldsResult = commonQueryParser.parseSelectedFields(selectedFields);
        await this.processNestedRelationsHelper.processNestedRelations({
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            parentObjectMetadataItem: objectMetadata,
            parentObjectRecords: allRecords,
            authContext: streamData.authContext,
            limit: _constants.QUERY_MAX_RECORDS_FROM_RELATION,
            rolePermissionConfig,
            workspaceDataSource: globalWorkspaceDataSource,
            relations: selectedFieldsResult.relations,
            selectedFields: selectedFieldsResult.select
        });
    }
    buildSubscriberRLSFilter(subscriberAuthContext, roleId, objectMetadata, permissionsContext, flatWorkspaceMemberMaps) {
        const workspaceMember = (0, _utils.isDefined)(subscriberAuthContext.workspaceMemberId) ? flatWorkspaceMemberMaps.byId[subscriberAuthContext.workspaceMemberId] : undefined;
        return (0, _buildrowlevelpermissionrecordfilterutil.buildRowLevelPermissionRecordFilter)({
            flatRowLevelPermissionPredicateMaps: permissionsContext.flatRowLevelPermissionPredicateMaps,
            flatRowLevelPermissionPredicateGroupMaps: permissionsContext.flatRowLevelPermissionPredicateGroupMaps,
            flatFieldMetadataMaps: permissionsContext.flatFieldMetadataMaps,
            objectMetadata,
            roleId,
            workspaceMember
        });
    }
    filterRestrictedFieldsFromEvent(event, restrictedFields, flatFieldMetadataMaps) {
        if (!restrictedFields || Object.keys(restrictedFields).length === 0) {
            return event;
        }
        const restrictedFieldNames = new Set(Object.entries(restrictedFields).filter(([, permissions])=>permissions.canRead === false).map(([fieldMetadataId])=>{
            const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldMetadataId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            return fieldMetadata?.name;
        }).filter(_utils.isDefined));
        if (restrictedFieldNames.size === 0) {
            return event;
        }
        const filterRecord = (record)=>{
            if (!record) {
                return record;
            }
            return Object.fromEntries(Object.entries(record).filter(([key])=>!restrictedFieldNames.has(key)));
        };
        const properties = event.properties;
        const filteredBefore = filterRecord(properties.before);
        const filteredAfter = filterRecord(properties.after);
        const filteredDiff = filterRecord(properties.diff);
        const filteredProperties = {
            ...properties,
            ...filteredBefore !== undefined && {
                before: filteredBefore
            },
            ...filteredAfter !== undefined && {
                after: filteredAfter
            },
            ...filteredDiff !== undefined && {
                diff: filteredDiff
            },
            updatedFields: properties.updatedFields?.filter((field)=>!restrictedFieldNames.has(field))
        };
        return {
            ...event,
            properties: filteredProperties
        };
    }
    getMatchingObjectRecordQueryIds(queries, event, subscriberRLSFilter, objectMetadata, flatFieldMetadataMaps) {
        const matchedQueryIds = [];
        for (const [queryId, operationSignature] of Object.entries(queries)){
            if (!(0, _utils.isRecordGqlOperationSignature)(operationSignature)) {
                continue;
            }
            if (this.isQueryMatchingObjectRecordEvent(operationSignature, event, subscriberRLSFilter, objectMetadata, flatFieldMetadataMaps)) {
                matchedQueryIds.push(queryId);
            }
        }
        return matchedQueryIds;
    }
    isQueryMatchingObjectRecordEvent(operationSignature, event, subscriberRLSFilter, objectMetadata, flatFieldMetadataMaps) {
        if (operationSignature.objectNameSingular !== event.objectNameSingular) {
            return false;
        }
        const properties = event.properties;
        const record = properties?.after ?? properties?.before;
        if (!(0, _utils.isDefined)(record)) {
            return false;
        }
        const queryFilter = operationSignature.variables?.filter ?? {};
        const filtersToApply = [
            queryFilter
        ];
        if (subscriberRLSFilter && Object.keys(subscriberRLSFilter).length > 0) {
            filtersToApply.push(subscriberRLSFilter);
        }
        const combinedFilter = (0, _utils.combineFilters)(filtersToApply);
        if (Object.keys(combinedFilter).length === 0) {
            return true;
        }
        const shouldIgnoreSoftDeleteDefaultFilter = event.action === _databaseeventaction.DatabaseEventAction.DELETED || event.action === _databaseeventaction.DatabaseEventAction.RESTORED;
        return (0, _isrecordmatchingrlsrowlevelpermissionpredicateutil.isRecordMatchingRLSRowLevelPermissionPredicate)({
            record,
            filter: combinedFilter,
            flatObjectMetadata: objectMetadata,
            flatFieldMetadataMaps,
            shouldIgnoreSoftDeleteDefaultFilter
        });
    }
    async fetchPermissionsContext(workspaceId) {
        const { flatRowLevelPermissionPredicateMaps, flatRowLevelPermissionPredicateGroupMaps, flatFieldMetadataMaps, userWorkspaceRoleMap, rolesPermissions } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatRowLevelPermissionPredicateMaps',
            'flatRowLevelPermissionPredicateGroupMaps',
            'flatFieldMetadataMaps',
            'userWorkspaceRoleMap',
            'rolesPermissions'
        ]);
        return {
            flatRowLevelPermissionPredicateMaps,
            flatRowLevelPermissionPredicateGroupMaps,
            flatFieldMetadataMaps,
            userWorkspaceRoleMap,
            rolesPermissions
        };
    }
    constructor(subscriptionService, eventStreamService, workspaceCacheService, processNestedRelationsHelper, workspaceManyOrAllFlatEntityMapsCacheService, globalWorkspaceOrmManager, commonSelectFieldsHelper){
        this.subscriptionService = subscriptionService;
        this.eventStreamService = eventStreamService;
        this.workspaceCacheService = workspaceCacheService;
        this.processNestedRelationsHelper = processNestedRelationsHelper;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.commonSelectFieldsHelper = commonSelectFieldsHelper;
    }
};
ObjectRecordEventPublisher = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _subscriptionservice.SubscriptionService === "undefined" ? Object : _subscriptionservice.SubscriptionService,
        typeof _eventstreamservice.EventStreamService === "undefined" ? Object : _eventstreamservice.EventStreamService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _processnestedrelationshelper.ProcessNestedRelationsHelper === "undefined" ? Object : _processnestedrelationshelper.ProcessNestedRelationsHelper,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _commonselectfieldshelper.CommonSelectFieldsHelper === "undefined" ? Object : _commonselectfieldshelper.CommonSelectFieldsHelper
    ])
], ObjectRecordEventPublisher);

//# sourceMappingURL=object-record-event-publisher.js.map