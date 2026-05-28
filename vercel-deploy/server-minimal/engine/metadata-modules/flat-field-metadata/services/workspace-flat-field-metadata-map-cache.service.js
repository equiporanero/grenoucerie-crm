"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatFieldMetadataMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatFieldMetadataMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromfieldmetadataentitytoflatfieldmetadatautil = require("../utils/from-field-metadata-entity-to-flat-field-metadata.util");
const _indexmetadataentity = require("../../index-metadata/index-metadata.entity");
const _computeuniquefieldmetadataidsfromindexentitiesutil = require("../../index-metadata/utils/compute-unique-field-metadata-ids-from-index-entities.util");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _viewfieldentity = require("../../view-field/entities/view-field.entity");
const _viewfilterentity = require("../../view-filter/entities/view-filter.entity");
const _viewgroupentity = require("../../view-group/entities/view-group.entity");
const _viewentity = require("../../view/entities/view.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _createidtouniversalidentifiermaputil = require("../../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
const _regroupentitiesbyrelatedentityid = require("../../../workspace-cache/utils/regroup-entities-by-related-entity-id");
const _addflatentitytoflatentitymapsthroughmutationorthrowutil = require("../../../workspace-manager/workspace-migration/utils/add-flat-entity-to-flat-entity-maps-through-mutation-or-throw.util");
const _viewsortentity = require("../../view-sort/entities/view-sort.entity");
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
let WorkspaceFlatFieldMetadataMapCacheService = class WorkspaceFlatFieldMetadataMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [fieldMetadatas, indexMetadatas, objectMetadatas, applications, viewFields, viewFilters, viewSorts, views] = await Promise.all([
            this.fieldMetadataRepository.find({
                where: {
                    workspaceId
                },
                withDeleted: true
            }),
            this.indexMetadataRepository.find({
                where: {
                    workspaceId,
                    isUnique: true
                },
                relations: [
                    'indexFieldMetadatas'
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
            this.viewFieldRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'fieldMetadataId'
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
                    'fieldMetadataId'
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
                    'fieldMetadataId'
                ],
                withDeleted: true
            }),
            this.viewRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'kanbanAggregateOperationFieldMetadataId',
                    'calendarFieldMetadataId',
                    'mainGroupByFieldMetadataId'
                ],
                withDeleted: true
            })
        ]);
        const [viewFieldsByFieldId, viewFiltersByFieldId, calendarViewsByFieldId, kanbanViewsByFieldId, mainGroupByFieldMetadataViewsByFieldId, viewSortsByFieldId] = [
            {
                entities: viewFields,
                foreignKey: 'fieldMetadataId'
            },
            {
                entities: viewFilters,
                foreignKey: 'fieldMetadataId'
            },
            {
                entities: views,
                foreignKey: 'calendarFieldMetadataId'
            },
            {
                entities: views,
                foreignKey: 'kanbanAggregateOperationFieldMetadataId'
            },
            {
                entities: views,
                foreignKey: 'mainGroupByFieldMetadataId'
            },
            {
                entities: viewSorts,
                foreignKey: 'fieldMetadataId'
            }
        ].map(_regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId);
        const fieldMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(fieldMetadatas);
        const objectMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(objectMetadatas);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const uniqueFieldMetadataIds = (0, _computeuniquefieldmetadataidsfromindexentitiesutil.computeUniqueFieldMetadataIdsFromIndexEntities)(indexMetadatas);
        const flatFieldMetadataMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const fieldMetadataEntity of fieldMetadatas){
            const flatFieldMetadata = (0, _fromfieldmetadataentitytoflatfieldmetadatautil.fromFieldMetadataEntityToFlatFieldMetadata)({
                entity: {
                    ...fieldMetadataEntity,
                    viewFields: viewFieldsByFieldId.get(fieldMetadataEntity.id) || [],
                    viewFilters: viewFiltersByFieldId.get(fieldMetadataEntity.id) || [],
                    kanbanAggregateOperationViews: kanbanViewsByFieldId.get(fieldMetadataEntity.id) || [],
                    calendarViews: calendarViewsByFieldId.get(fieldMetadataEntity.id) || [],
                    mainGroupByFieldMetadataViews: mainGroupByFieldMetadataViewsByFieldId.get(fieldMetadataEntity.id) || [],
                    viewSorts: viewSortsByFieldId.get(fieldMetadataEntity.id) || []
                },
                fieldMetadataIdToUniversalIdentifierMap,
                objectMetadataIdToUniversalIdentifierMap,
                applicationIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: {
                    ...flatFieldMetadata,
                    isUnique: uniqueFieldMetadataIds.has(fieldMetadataEntity.id)
                },
                flatEntityMapsToMutate: flatFieldMetadataMaps
            });
        }
        return flatFieldMetadataMaps;
    }
    constructor(fieldMetadataRepository, indexMetadataRepository, objectMetadataRepository, applicationRepository, viewFieldRepository, viewFilterRepository, viewGroupRepository, viewSortRepository, viewRepository){
        super(), this.fieldMetadataRepository = fieldMetadataRepository, this.indexMetadataRepository = indexMetadataRepository, this.objectMetadataRepository = objectMetadataRepository, this.applicationRepository = applicationRepository, this.viewFieldRepository = viewFieldRepository, this.viewFilterRepository = viewFilterRepository, this.viewGroupRepository = viewGroupRepository, this.viewSortRepository = viewSortRepository, this.viewRepository = viewRepository;
    }
};
WorkspaceFlatFieldMetadataMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatFieldMetadataMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_indexmetadataentity.IndexMetadataEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_viewfieldentity.ViewFieldEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_viewfilterentity.ViewFilterEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_viewgroupentity.ViewGroupEntity)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_viewsortentity.ViewSortEntity)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_viewentity.ViewEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatFieldMetadataMapCacheService);

//# sourceMappingURL=workspace-flat-field-metadata-map-cache.service.js.map