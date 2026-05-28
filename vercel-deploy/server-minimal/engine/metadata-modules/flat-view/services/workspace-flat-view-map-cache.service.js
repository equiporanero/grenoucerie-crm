"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatViewMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatViewMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromviewentitytoflatviewutil = require("../utils/from-view-entity-to-flat-view.util");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _viewfieldgroupentity = require("../../view-field-group/entities/view-field-group.entity");
const _viewfieldentity = require("../../view-field/entities/view-field.entity");
const _viewfiltergroupentity = require("../../view-filter-group/entities/view-filter-group.entity");
const _viewfilterentity = require("../../view-filter/entities/view-filter.entity");
const _viewgroupentity = require("../../view-group/entities/view-group.entity");
const _viewsortentity = require("../../view-sort/entities/view-sort.entity");
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
let WorkspaceFlatViewMapCacheService = class WorkspaceFlatViewMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [views, applications, objectMetadatas, fieldMetadatas, viewFields, viewFilters, viewGroups, viewFilterGroups, viewSorts, viewFieldGroups] = await Promise.all([
            this.viewRepository.find({
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
            this.objectMetadataRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            }),
            this.fieldMetadataRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            }),
            this.viewFieldRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'viewId'
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
                    'viewId'
                ],
                withDeleted: true
            }),
            this.viewGroupRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'viewId'
                ],
                withDeleted: true
            }),
            this.viewFilterGroupRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'viewId'
                ],
                withDeleted: true
            }),
            this.viewSortRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'viewId'
                ],
                withDeleted: true
            }),
            this.viewFieldGroupRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'viewId'
                ],
                withDeleted: true
            })
        ]);
        const [viewFieldsByViewId, viewFiltersByViewId, viewGroupsByViewId, viewFilterGroupsByViewId, viewSortsByViewId, viewFieldGroupsByViewId] = [
            {
                entities: viewFields,
                foreignKey: 'viewId'
            },
            {
                entities: viewFilters,
                foreignKey: 'viewId'
            },
            {
                entities: viewGroups,
                foreignKey: 'viewId'
            },
            {
                entities: viewFilterGroups,
                foreignKey: 'viewId'
            },
            {
                entities: viewSorts,
                foreignKey: 'viewId'
            },
            {
                entities: viewFieldGroups,
                foreignKey: 'viewId'
            }
        ].map(_regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const objectMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(objectMetadatas);
        const fieldMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(fieldMetadatas);
        const flatViewMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const viewEntity of views){
            const flatView = (0, _fromviewentitytoflatviewutil.fromViewEntityToFlatView)({
                entity: {
                    ...viewEntity,
                    viewFields: viewFieldsByViewId.get(viewEntity.id) || [],
                    viewFilters: viewFiltersByViewId.get(viewEntity.id) || [],
                    viewGroups: viewGroupsByViewId.get(viewEntity.id) || [],
                    viewFilterGroups: viewFilterGroupsByViewId.get(viewEntity.id) || [],
                    viewSorts: viewSortsByViewId.get(viewEntity.id) || [],
                    viewFieldGroups: viewFieldGroupsByViewId.get(viewEntity.id) || []
                },
                applicationIdToUniversalIdentifierMap,
                objectMetadataIdToUniversalIdentifierMap,
                fieldMetadataIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatView,
                flatEntityMapsToMutate: flatViewMaps
            });
        }
        return flatViewMaps;
    }
    constructor(viewRepository, applicationRepository, objectMetadataRepository, fieldMetadataRepository, viewFieldRepository, viewFilterRepository, viewGroupRepository, viewFilterGroupRepository, viewSortRepository, viewFieldGroupRepository){
        super(), this.viewRepository = viewRepository, this.applicationRepository = applicationRepository, this.objectMetadataRepository = objectMetadataRepository, this.fieldMetadataRepository = fieldMetadataRepository, this.viewFieldRepository = viewFieldRepository, this.viewFilterRepository = viewFilterRepository, this.viewGroupRepository = viewGroupRepository, this.viewFilterGroupRepository = viewFilterGroupRepository, this.viewSortRepository = viewSortRepository, this.viewFieldGroupRepository = viewFieldGroupRepository;
    }
};
WorkspaceFlatViewMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatViewMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_viewfieldentity.ViewFieldEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_viewfilterentity.ViewFilterEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_viewgroupentity.ViewGroupEntity)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_viewfiltergroupentity.ViewFilterGroupEntity)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_viewsortentity.ViewSortEntity)),
    _ts_param(9, (0, _typeorm.InjectRepository)(_viewfieldgroupentity.ViewFieldGroupEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository
    ])
], WorkspaceFlatViewMapCacheService);

//# sourceMappingURL=workspace-flat-view-map-cache.service.js.map