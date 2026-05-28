"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineActivityService", {
    enumerable: true,
    get: function() {
        return TimelineActivityService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _getflatfieldsforflatobjectmetadatautil = require("../../../engine/api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _featureflagservice = require("../../../engine/core-modules/feature-flag/services/feature-flag.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _objectmetadatarepositorydecorator = require("../../../engine/object-metadata-repository/object-metadata-repository.decorator");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _parseeventname = require("../../../engine/workspace-event-emitter/utils/parse-event-name");
const _timelineactivityrepository = require("../repositories/timeline-activity.repository");
const _timelineactivityworkspaceentity = require("../standard-objects/timeline-activity.workspace-entity");
const _extractobjectsingularnamefromtargetcolumnnameutil = require("../utils/extract-object-singular-name-from-target-column-name.util");
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
let TimelineActivityService = class TimelineActivityService {
    async upsertEvents({ events, name, objectMetadata, workspaceId }) {
        if (!(0, _utils.isDefined)(workspaceId)) {
            return;
        }
        const { objectSingularName } = (0, _parseeventname.parseEventNameOrThrow)(name);
        const timelineActivitiesPayloads = await this.transformEventsToTimelineActivityPayloads({
            events,
            objectMetadata,
            workspaceId,
            name
        });
        if (!timelineActivitiesPayloads || timelineActivitiesPayloads.length === 0) {
            return;
        }
        const payloadsByObjectSingularName = timelineActivitiesPayloads.reduce((acc, payload)=>{
            const computedObjectSingularName = payload.objectSingularName ?? objectSingularName;
            acc[computedObjectSingularName] = [
                ...acc[computedObjectSingularName] || [],
                payload
            ];
            return acc;
        }, {});
        for(const objectSingularName in payloadsByObjectSingularName){
            await this.timelineActivityRepository.upsertTimelineActivities({
                objectSingularName,
                workspaceId,
                payloads: payloadsByObjectSingularName[objectSingularName]
            });
        }
    }
    async transformEventsToTimelineActivityPayloads({ events, workspaceId, objectMetadata, name }) {
        const { objectSingularName } = (0, _parseeventname.parseEventNameOrThrow)(name);
        if (objectSingularName === 'note') {
            const noteEventsTimelineActivities = await this.computeTimelineActivityPayloadsForActivities({
                events: events,
                activityType: 'note',
                workspaceId,
                objectMetadata,
                name
            });
            return [
                ...noteEventsTimelineActivities,
                ...events.map((event)=>({
                        name,
                        objectSingularName,
                        recordId: event.recordId,
                        workspaceMemberId: event.workspaceMemberId,
                        properties: event.properties
                    }))
            ];
        }
        if (objectSingularName === 'task') {
            const taskEventsTimelineActivities = await this.computeTimelineActivityPayloadsForActivities({
                events: events,
                activityType: 'task',
                workspaceId,
                objectMetadata,
                name
            });
            return [
                ...taskEventsTimelineActivities,
                ...events.map((event)=>({
                        name,
                        objectSingularName,
                        recordId: event.recordId,
                        workspaceMemberId: event.workspaceMemberId,
                        properties: event.properties
                    }))
            ];
        }
        if (objectSingularName === 'noteTarget' || objectSingularName === 'taskTarget') {
            return await this.computeTimelineActivityPayloadsForActivityTargets({
                events,
                activityType: objectSingularName === 'noteTarget' ? 'note' : 'task',
                workspaceId,
                objectMetadata,
                name
            });
        }
        return events.map((event)=>({
                name,
                objectSingularName,
                recordId: event.recordId,
                workspaceMemberId: event.workspaceMemberId,
                properties: event.properties
            }));
    }
    async computeTimelineActivityPayloadsForActivities({ events, activityType, name, workspaceId, objectMetadata }) {
        if (!(0, _utils.isDefined)(workspaceId)) {
            return [];
        }
        const { action } = (0, _parseeventname.parseEventNameOrThrow)(name);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const activityTargets = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const activityTargetRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, this.targetObjects[activityType], {
                shouldBypassPermissionChecks: true
            });
            return activityTargetRepository.find({
                where: {
                    [`${activityType}Id`]: (0, _typeorm.In)(events.map((event)=>event.recordId))
                }
            });
        }, authContext);
        if (activityTargets.length === 0) {
            return [];
        }
        return events.flatMap((event)=>{
            const correspondingActivityTargets = activityTargets.filter((activityTarget)=>activityTarget[`${activityType}Id`] === event.recordId);
            if (correspondingActivityTargets.length === 0) {
                return;
            }
            return correspondingActivityTargets.map((activityTarget)=>{
                const targetColumn = Object.entries(activityTarget).find(([columnName, columnValue])=>columnName !== activityType + 'Id' && columnName.endsWith('Id') && columnValue !== null)?.[0];
                if (!(0, _utils.isDefined)(targetColumn)) {
                    return;
                }
                const activityTitle = event.properties.diff?.title?.after;
                const activityId = event.recordId;
                if (!(0, _utils.isDefined)(activityTitle)) {
                    return;
                }
                return {
                    name: `linked-${activityType}.${action}`,
                    workspaceMemberId: event.workspaceMemberId,
                    recordId: activityTarget[targetColumn.replace(/Id$/, '')],
                    linkedRecordCachedName: activityTitle,
                    linkedRecordId: activityId,
                    linkedObjectMetadataId: objectMetadata.id,
                    properties: event.properties,
                    objectSingularName: objectMetadata.nameSingular
                };
            });
        }).filter(_utils.isDefined);
    }
    async computeTimelineActivityPayloadsForActivityTargets({ events, activityType, name, objectMetadata, workspaceId }) {
        const { action } = (0, _parseeventname.parseEventNameOrThrow)(name);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const activities = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const activityRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, activityType, {
                shouldBypassPermissionChecks: true
            });
            return activityRepository.find({
                where: {
                    id: (0, _typeorm.In)(events.map((event)=>this.extractActivityIdFromActivityTargetEvent(event, activityType)).filter(_utils.isDefined))
                }
            });
        }, authContext);
        if (activities.length === 0) {
            return [];
        }
        const { flatFieldMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps'
            ]
        });
        const fields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(objectMetadata, flatFieldMetadataMaps);
        const activityObjectMetadataId = fields.find((field)=>field.name === activityType)?.relationTargetObjectMetadataId;
        return events.map((event)=>{
            const activity = activities.find((activity)=>activity.id === this.extractActivityIdFromActivityTargetEvent(event, activityType));
            if (!(0, _utils.isDefined)(activity)) {
                return;
            }
            if (!(0, _utils.isDefined)(activityObjectMetadataId)) {
                return;
            }
            if (!(0, _utils.isDefined)(event.properties.after)) {
                return;
            }
            const targetColumnName = Object.entries(event.properties.after).find(([columnName, columnValue])=>columnName !== activityType + 'Id' && columnName.endsWith('Id') && columnValue !== null)?.[0];
            if (!(0, _utils.isDefined)(targetColumnName)) {
                return;
            }
            const recordId = event.properties.after[targetColumnName];
            const objectSingularName = (0, _extractobjectsingularnamefromtargetcolumnnameutil.extractObjectSingularNameFromTargetColumnName)(targetColumnName);
            return {
                name: `linked-${activityType}.${action}`,
                objectSingularName,
                recordId,
                linkedRecordCachedName: activity.title,
                linkedRecordId: activity.id,
                linkedObjectMetadataId: activityObjectMetadataId,
                workspaceMemberId: event.workspaceMemberId,
                properties: {}
            };
        }).filter(_utils.isDefined);
    }
    extractActivityIdFromActivityTargetEvent(event, activityType) {
        const activityId = event.properties.after?.[`${activityType}Id`];
        return activityId;
    }
    constructor(timelineActivityRepository, featureFlagService, globalWorkspaceOrmManager, workspaceManyOrAllFlatEntityMapsCacheService){
        this.timelineActivityRepository = timelineActivityRepository;
        this.featureFlagService = featureFlagService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.targetObjects = {
            note: 'noteTarget',
            task: 'taskTarget'
        };
    }
};
TimelineActivityService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _objectmetadatarepositorydecorator.InjectObjectMetadataRepository)(_timelineactivityworkspaceentity.TimelineActivityWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _timelineactivityrepository.TimelineActivityRepository === "undefined" ? Object : _timelineactivityrepository.TimelineActivityRepository,
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], TimelineActivityService);

//# sourceMappingURL=timeline-activity.service.js.map