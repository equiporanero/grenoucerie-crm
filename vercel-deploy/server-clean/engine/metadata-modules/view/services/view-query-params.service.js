"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewQueryParamsService", {
    enumerable: true,
    get: function() {
        return ViewQueryParamsService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _defaulttimezoneconstant = require("../constants/default-timezone.constant");
const _viewservice = require("./view.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ViewQueryParamsService = class ViewQueryParamsService {
    async resolveViewToQueryParams(viewId, workspaceId, currentWorkspaceMemberId) {
        const view = await this.viewService.findByIdWithRelations(viewId, workspaceId);
        if (!view) {
            throw new Error(`View with id ${viewId} not found`);
        }
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const objectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: view.objectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        const timeZone = await this.getWorkspaceMemberTimezoneIfAvailable(workspaceId, currentWorkspaceMemberId);
        const recordFilters = (view.viewFilters ?? []).map((viewFilter)=>{
            const field = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: viewFilter.fieldMetadataId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!field) return null;
            return {
                id: viewFilter.id,
                fieldMetadataId: viewFilter.fieldMetadataId,
                value: viewFilter.value ?? '',
                type: field.type,
                recordFilterGroupId: viewFilter.viewFilterGroupId,
                operand: viewFilter.operand,
                subFieldName: viewFilter.subFieldName,
                relationTargetFieldMetadataId: viewFilter.relationTargetFieldMetadataId ?? null
            };
        }).filter(_utils.isDefined);
        const recordFilterGroups = (view.viewFilterGroups ?? []).map((group)=>({
                id: group.id,
                parentRecordFilterGroupId: group.parentViewFilterGroupId,
                logicalOperator: group.logicalOperator === _types.ViewFilterGroupLogicalOperator.OR ? _types.RecordFilterGroupLogicalOperator.OR : _types.RecordFilterGroupLogicalOperator.AND
            }));
        const filter = (0, _utils.computeRecordGqlOperationFilter)({
            fieldMetadataItems: Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined),
            recordFilters,
            recordFilterGroups,
            filterValueDependencies: {
                currentWorkspaceMemberId,
                timeZone
            }
        });
        const orderBy = (view.viewSorts ?? []).map((sort)=>{
            const field = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: sort.fieldMetadataId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!field) return null;
            return {
                [field.name]: sort.direction === _types.ViewSortDirection.DESC ? _types.OrderByDirection.DescNullsLast : _types.OrderByDirection.AscNullsFirst
            };
        }).filter(_utils.isDefined);
        return {
            objectNameSingular: objectMetadata.nameSingular,
            filter,
            orderBy,
            viewName: view.name,
            viewType: view.type
        };
    }
    async getWorkspaceMemberTimezoneIfAvailable(workspaceId, currentWorkspaceMemberId) {
        if (!(0, _utils.isDefined)(currentWorkspaceMemberId)) {
            return _defaulttimezoneconstant.DEFAULT_TIMEZONE;
        }
        try {
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            const workspaceMember = await workspaceMemberRepository.findOne({
                where: {
                    id: currentWorkspaceMemberId
                }
            });
            return workspaceMember?.timeZone ?? _defaulttimezoneconstant.DEFAULT_TIMEZONE;
        } catch  {
            return _defaulttimezoneconstant.DEFAULT_TIMEZONE;
        }
    }
    constructor(viewService, flatEntityMapsCacheService, globalWorkspaceOrmManager){
        this.viewService = viewService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
ViewQueryParamsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], ViewQueryParamsService);

//# sourceMappingURL=view-query-params.service.js.map