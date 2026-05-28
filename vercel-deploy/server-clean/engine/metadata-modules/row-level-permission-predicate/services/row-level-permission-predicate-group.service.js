/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RowLevelPermissionPredicateGroupService", {
    enumerable: true,
    get: function() {
        return RowLevelPermissionPredicateGroupService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _billingentitlementkeyenum = require("../../../core-modules/billing/enums/billing-entitlement-key.enum");
const _billingservice = require("../../../core-modules/billing/services/billing.service");
const _enterpriseplanservice = require("../../../core-modules/enterprise/services/enterprise-plan.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromflatrowlevelpermissionpredicategrouptodtoutil = require("../../flat-row-level-permission-predicate/utils/from-flat-row-level-permission-predicate-group-to-dto.util");
const _rowlevelpermissionpredicategroupentity = require("../entities/row-level-permission-predicate-group.entity");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
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
let RowLevelPermissionPredicateGroupService = class RowLevelPermissionPredicateGroupService {
    async findByWorkspaceId(workspaceId) {
        const hasRowLevelPermissionFeature = await this.hasRowLevelPermissionFeature(workspaceId);
        if (!hasRowLevelPermissionFeature) {
            return [];
        }
        const { flatRowLevelPermissionPredicateGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRowLevelPermissionPredicateGroupMaps'
            ]
        });
        return Object.values(flatRowLevelPermissionPredicateGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((group)=>group.deletedAt === null).sort((a, b)=>(a.positionInRowLevelPermissionPredicateGroup ?? 0) - (b.positionInRowLevelPermissionPredicateGroup ?? 0)).map(_fromflatrowlevelpermissionpredicategrouptodtoutil.fromFlatRowLevelPermissionPredicateGroupToDto);
    }
    async findByRole(workspaceId, roleId) {
        const hasRowLevelPermissionFeature = await this.hasRowLevelPermissionFeature(workspaceId);
        if (!hasRowLevelPermissionFeature) {
            return [];
        }
        const { flatRowLevelPermissionPredicateGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRowLevelPermissionPredicateGroupMaps'
            ]
        });
        return Object.values(flatRowLevelPermissionPredicateGroupMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((group)=>group.deletedAt === null && group.roleId === roleId).sort((a, b)=>(a.positionInRowLevelPermissionPredicateGroup ?? 0) - (b.positionInRowLevelPermissionPredicateGroup ?? 0)).map(_fromflatrowlevelpermissionpredicategrouptodtoutil.fromFlatRowLevelPermissionPredicateGroupToDto);
    }
    async findById(id, workspaceId) {
        const hasRowLevelPermissionFeature = await this.hasRowLevelPermissionFeature(workspaceId);
        if (!hasRowLevelPermissionFeature) {
            return null;
        }
        const { flatRowLevelPermissionPredicateGroupMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRowLevelPermissionPredicateGroupMaps'
            ]
        });
        const flatGroup = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: id,
            flatEntityMaps: flatRowLevelPermissionPredicateGroupMaps
        });
        if (!(0, _utils.isDefined)(flatGroup) || flatGroup.deletedAt !== null) {
            return null;
        }
        return (0, _fromflatrowlevelpermissionpredicategrouptodtoutil.fromFlatRowLevelPermissionPredicateGroupToDto)(flatGroup);
    }
    async deleteAllRowLevelPermissionPredicateGroups(workspaceId) {
        await this.rowLevelPermissionPredicateGroupRepository.delete({
            workspaceId
        });
        await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
            'rolesPermissions',
            'flatRowLevelPermissionPredicateMaps',
            'flatRowLevelPermissionPredicateGroupMaps'
        ]);
    }
    async hasRowLevelPermissionFeature(workspaceId) {
        const hasValidEnterprisePlan = this.enterprisePlanService.isValid();
        const isRowLevelPermissionEnabled = await this.billingService.hasEntitlement(workspaceId, _billingentitlementkeyenum.BillingEntitlementKey.RLS);
        return hasValidEnterprisePlan && isRowLevelPermissionEnabled;
    }
    constructor(flatEntityMapsCacheService, workspaceCacheService, billingService, rowLevelPermissionPredicateGroupRepository, enterprisePlanService){
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.workspaceCacheService = workspaceCacheService;
        this.billingService = billingService;
        this.rowLevelPermissionPredicateGroupRepository = rowLevelPermissionPredicateGroupRepository;
        this.enterprisePlanService = enterprisePlanService;
    }
};
RowLevelPermissionPredicateGroupService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _enterpriseplanservice.EnterprisePlanService === "undefined" ? Object : _enterpriseplanservice.EnterprisePlanService
    ])
], RowLevelPermissionPredicateGroupService);

//# sourceMappingURL=row-level-permission-predicate-group.service.js.map