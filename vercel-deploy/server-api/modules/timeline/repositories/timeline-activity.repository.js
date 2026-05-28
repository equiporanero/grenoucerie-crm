"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineActivityRepository", {
    enumerable: true,
    get: function() {
        return TimelineActivityRepository;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _typeorm = require("typeorm");
const _objectrecorddiffmerge = require("../../../engine/core-modules/event-emitter/utils/object-record-diff-merge");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _timelineactivityrelatedmorphfieldmetadatanamebuilderutil = require("../utils/timeline-activity-related-morph-field-metadata-name-builder.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TimelineActivityRepository = class TimelineActivityRepository {
    async upsertTimelineActivities({ objectSingularName, workspaceId, payloads }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const recentTimelineActivities = await this.findRecentTimelineActivities({
                objectSingularName,
                workspaceId,
                payloads
            });
            const payloadsWithDiff = payloads.filter(({ properties })=>{
                const isDiffEmpty = properties.diff !== null && properties.diff && Object.keys(properties.diff).length === 0;
                return !isDiffEmpty;
            }).map(({ properties, ...rest })=>({
                    ...rest,
                    properties: (0, _classvalidator.isDefined)(properties.diff) ? {
                        diff: properties.diff
                    } : {}
                }));
            const payloadsToInsert = [];
            const timelineActivityPropertyName = await this.getTimelineActivityPropertyName(objectSingularName);
            for (const payload of payloadsWithDiff){
                const recentTimelineActivity = recentTimelineActivities.find((timelineActivity)=>timelineActivity[timelineActivityPropertyName] === payload.recordId && timelineActivity.workspaceMemberId === payload.workspaceMemberId && (!(0, _classvalidator.isDefined)(payload.linkedRecordId) || timelineActivity.linkedRecordId === payload.linkedRecordId) && timelineActivity.name === payload.name);
                if (recentTimelineActivity) {
                    const mergedProperties = (0, _objectrecorddiffmerge.objectRecordDiffMerge)(recentTimelineActivity.properties, payload.properties);
                    await this.updateTimelineActivity({
                        id: recentTimelineActivity.id,
                        properties: mergedProperties,
                        workspaceMemberId: payload.workspaceMemberId,
                        workspaceId
                    });
                } else {
                    payloadsToInsert.push(payload);
                }
            }
            await this.insertTimelineActivities({
                objectSingularName,
                payloads: payloadsToInsert,
                workspaceId
            });
        }, authContext);
    }
    async findRecentTimelineActivities({ objectSingularName, workspaceId, payloads }) {
        const timelineActivityTypeORMRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'timelineActivity', {
            shouldBypassPermissionChecks: true
        });
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
        const timelineActivityPropertyName = await this.getTimelineActivityPropertyName(objectSingularName);
        const whereConditions = {
            [timelineActivityPropertyName]: (0, _typeorm.In)(payloads.map((payload)=>payload.recordId)),
            name: (0, _typeorm.In)(payloads.map((payload)=>payload.name)),
            workspaceMemberId: (0, _typeorm.In)(payloads.map((payload)=>payload.workspaceMemberId || null)),
            createdAt: (0, _typeorm.MoreThan)(tenMinutesAgo)
        };
        return await timelineActivityTypeORMRepository.find({
            where: whereConditions,
            order: {
                createdAt: 'DESC'
            },
            take: 1
        });
    }
    async insertTimelineActivities({ objectSingularName, workspaceId, payloads }) {
        if (payloads.length === 0) {
            return;
        }
        const timelineActivityTypeORMRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'timelineActivity', {
            shouldBypassPermissionChecks: true
        });
        const timelineActivityPropertyName = await this.getTimelineActivityPropertyName(objectSingularName);
        return timelineActivityTypeORMRepository.insert(payloads.map((payload)=>({
                name: payload.name,
                properties: payload.properties,
                workspaceMemberId: payload.workspaceMemberId,
                [timelineActivityPropertyName]: payload.recordId,
                linkedRecordCachedName: payload.linkedRecordCachedName ?? '',
                linkedRecordId: payload.linkedRecordId,
                linkedObjectMetadataId: payload.linkedObjectMetadataId
            })));
    }
    async updateTimelineActivity({ id, properties, workspaceMemberId, workspaceId }) {
        const timelineActivityTypeORMRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'timelineActivity', {
            shouldBypassPermissionChecks: true
        });
        return timelineActivityTypeORMRepository.update(id, {
            properties: properties,
            workspaceMemberId: workspaceMemberId
        });
    }
    async getTimelineActivityPropertyName(objectSingularName) {
        return `${(0, _timelineactivityrelatedmorphfieldmetadatanamebuilderutil.buildTimelineActivityRelatedMorphFieldMetadataName)(objectSingularName)}Id`;
    }
    constructor(globalWorkspaceOrmManager){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
TimelineActivityRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], TimelineActivityRepository);

//# sourceMappingURL=timeline-activity.repository.js.map