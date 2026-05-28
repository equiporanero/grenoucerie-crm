"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatViewFilterGroupMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatViewFilterGroupMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromviewfiltergroupentitytoflatviewfiltergrouputil = require("../utils/from-view-filter-group-entity-to-flat-view-filter-group.util");
const _viewfiltergroupentity = require("../../view-filter-group/entities/view-filter-group.entity");
const _viewfilterentity = require("../../view-filter/entities/view-filter.entity");
const _viewentity = require("../../view/entities/view.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _createidtouniversalidentifiermaputil = require("../../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
const _regroupentitiesbyrelatedentityid = require("../../../workspace-cache/utils/regroup-entities-by-related-entity-id");
const _addflatentitytoflatentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/utils/add-flat-entity-to-flat-entity-maps-through-mutation-or-throw.util");
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
let WorkspaceFlatViewFilterGroupMapCacheService = class WorkspaceFlatViewFilterGroupMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [viewFilterGroups, applications, viewFilters, views] = await Promise.all([
            this.viewFilterGroupRepository.find({
                where: {
                    workspaceId
                },
                withDeleted: true
            }),
            this.applicationRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            }),
            this.viewFilterRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'viewFilterGroupId'
                ],
                withDeleted: true
            }),
            this.viewRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            })
        ]);
        const [viewFiltersByViewFilterGroupId, childViewFilterGroupsByParentId] = [
            {
                entities: viewFilters,
                foreignKey: 'viewFilterGroupId'
            },
            {
                entities: viewFilterGroups,
                foreignKey: 'parentViewFilterGroupId'
            }
        ].map(_regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const viewFilterGroupIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(viewFilterGroups);
        const viewIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(views);
        const flatViewFilterGroupMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const viewFilterGroupEntity of viewFilterGroups){
            const flatViewFilterGroup = (0, _fromviewfiltergroupentitytoflatviewfiltergrouputil.fromViewFilterGroupEntityToFlatViewFilterGroup)({
                entity: {
                    ...viewFilterGroupEntity,
                    viewFilters: viewFiltersByViewFilterGroupId.get(viewFilterGroupEntity.id) || [],
                    childViewFilterGroups: childViewFilterGroupsByParentId.get(viewFilterGroupEntity.id) || []
                },
                applicationIdToUniversalIdentifierMap,
                viewFilterGroupIdToUniversalIdentifierMap,
                viewIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatViewFilterGroup,
                flatEntityMapsToMutate: flatViewFilterGroupMaps
            });
        }
        return flatViewFilterGroupMaps;
    }
    constructor(viewFilterGroupRepository, applicationRepository, viewFilterRepository, viewRepository){
        super(), this.viewFilterGroupRepository = viewFilterGroupRepository, this.applicationRepository = applicationRepository, this.viewFilterRepository = viewFilterRepository, this.viewRepository = viewRepository;
    }
};
WorkspaceFlatViewFilterGroupMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatViewFilterGroupMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_viewfiltergroupentity.ViewFilterGroupEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_viewfilterentity.ViewFilterEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository
    ])
], WorkspaceFlatViewFilterGroupMapCacheService);

//# sourceMappingURL=workspace-flat-view-filter-group-map-cache.service.js.map