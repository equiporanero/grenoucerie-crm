/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatRowLevelPermissionPredicateGroupMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatRowLevelPermissionPredicateGroupMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromrowlevelpermissionpredicategroupentitytoflatrowlevelpermissionpredicategrouputil = require("../utils/from-row-level-permission-predicate-group-entity-to-flat-row-level-permission-predicate-group.util");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _roleentity = require("../../role/role.entity");
const _rowlevelpermissionpredicategroupentity = require("../../row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
const _rowlevelpermissionpredicateentity = require("../../row-level-permission-predicate/entities/row-level-permission-predicate.entity");
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
let WorkspaceFlatRowLevelPermissionPredicateGroupMapCacheService = class WorkspaceFlatRowLevelPermissionPredicateGroupMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [rowLevelPermissionPredicateGroups, applications, objectMetadatas, roles, rowLevelPermissionPredicates] = await Promise.all([
            this.rowLevelPermissionPredicateGroupRepository.find({
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
            this.roleRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            }),
            this.rowLevelPermissionPredicateRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'rowLevelPermissionPredicateGroupId'
                ],
                withDeleted: true
            })
        ]);
        const [childRowLevelPermissionPredicateGroupsByParentId, rowLevelPermissionPredicatesByGroupId] = [
            {
                entities: rowLevelPermissionPredicateGroups,
                foreignKey: 'parentRowLevelPermissionPredicateGroupId'
            },
            {
                entities: rowLevelPermissionPredicates,
                foreignKey: 'rowLevelPermissionPredicateGroupId'
            }
        ].map(_regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const objectMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(objectMetadatas);
        const roleIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(roles);
        const rowLevelPermissionPredicateGroupIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(rowLevelPermissionPredicateGroups);
        const flatRowLevelPermissionPredicateGroupMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const rowLevelPermissionPredicateGroupEntity of rowLevelPermissionPredicateGroups){
            const flatRowLevelPermissionPredicateGroup = (0, _fromrowlevelpermissionpredicategroupentitytoflatrowlevelpermissionpredicategrouputil.fromRowLevelPermissionPredicateGroupEntityToFlatRowLevelPermissionPredicateGroup)({
                entity: {
                    ...rowLevelPermissionPredicateGroupEntity,
                    childRowLevelPermissionPredicateGroups: childRowLevelPermissionPredicateGroupsByParentId.get(rowLevelPermissionPredicateGroupEntity.id) || [],
                    rowLevelPermissionPredicates: rowLevelPermissionPredicatesByGroupId.get(rowLevelPermissionPredicateGroupEntity.id) || []
                },
                applicationIdToUniversalIdentifierMap,
                objectMetadataIdToUniversalIdentifierMap,
                roleIdToUniversalIdentifierMap,
                rowLevelPermissionPredicateGroupIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatRowLevelPermissionPredicateGroup,
                flatEntityMapsToMutate: flatRowLevelPermissionPredicateGroupMaps
            });
        }
        return flatRowLevelPermissionPredicateGroupMaps;
    }
    constructor(rowLevelPermissionPredicateGroupRepository, applicationRepository, objectMetadataRepository, roleRepository, rowLevelPermissionPredicateRepository){
        super(), this.rowLevelPermissionPredicateGroupRepository = rowLevelPermissionPredicateGroupRepository, this.applicationRepository = applicationRepository, this.objectMetadataRepository = objectMetadataRepository, this.roleRepository = roleRepository, this.rowLevelPermissionPredicateRepository = rowLevelPermissionPredicateRepository;
    }
};
WorkspaceFlatRowLevelPermissionPredicateGroupMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatRowLevelPermissionPredicateGroupMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatRowLevelPermissionPredicateGroupMapCacheService);

//# sourceMappingURL=workspace-flat-row-level-permission-predicate-group-map-cache.service.js.map