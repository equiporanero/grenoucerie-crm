/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatRowLevelPermissionPredicateMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatRowLevelPermissionPredicateMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromrowlevelpermissionpredicateentitytoflatrowlevelpermissionpredicateutil = require("../utils/from-row-level-permission-predicate-entity-to-flat-row-level-permission-predicate.util");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _roleentity = require("../../role/role.entity");
const _rowlevelpermissionpredicategroupentity = require("../../row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
const _rowlevelpermissionpredicateentity = require("../../row-level-permission-predicate/entities/row-level-permission-predicate.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _createidtouniversalidentifiermaputil = require("../../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
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
let WorkspaceFlatRowLevelPermissionPredicateMapCacheService = class WorkspaceFlatRowLevelPermissionPredicateMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [rowLevelPermissionPredicates, applications, fieldMetadatas, objectMetadatas, roles, rowLevelPermissionPredicateGroups] = await Promise.all([
            this.rowLevelPermissionPredicateRepository.find({
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
            this.rowLevelPermissionPredicateGroupRepository.find({
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
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const fieldMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(fieldMetadatas);
        const objectMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(objectMetadatas);
        const roleIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(roles);
        const rowLevelPermissionPredicateGroupIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(rowLevelPermissionPredicateGroups);
        const flatRowLevelPermissionPredicateMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const rowLevelPermissionPredicateEntity of rowLevelPermissionPredicates){
            const flatRowLevelPermissionPredicate = (0, _fromrowlevelpermissionpredicateentitytoflatrowlevelpermissionpredicateutil.fromRowLevelPermissionPredicateEntityToFlatRowLevelPermissionPredicate)({
                entity: rowLevelPermissionPredicateEntity,
                applicationIdToUniversalIdentifierMap,
                fieldMetadataIdToUniversalIdentifierMap,
                objectMetadataIdToUniversalIdentifierMap,
                roleIdToUniversalIdentifierMap,
                rowLevelPermissionPredicateGroupIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatRowLevelPermissionPredicate,
                flatEntityMapsToMutate: flatRowLevelPermissionPredicateMaps
            });
        }
        return flatRowLevelPermissionPredicateMaps;
    }
    constructor(rowLevelPermissionPredicateRepository, applicationRepository, fieldMetadataRepository, objectMetadataRepository, roleRepository, rowLevelPermissionPredicateGroupRepository){
        super(), this.rowLevelPermissionPredicateRepository = rowLevelPermissionPredicateRepository, this.applicationRepository = applicationRepository, this.fieldMetadataRepository = fieldMetadataRepository, this.objectMetadataRepository = objectMetadataRepository, this.roleRepository = roleRepository, this.rowLevelPermissionPredicateGroupRepository = rowLevelPermissionPredicateGroupRepository;
    }
};
WorkspaceFlatRowLevelPermissionPredicateMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatRowLevelPermissionPredicateMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatRowLevelPermissionPredicateMapCacheService);

//# sourceMappingURL=workspace-flat-row-level-permission-predicate-map-cache.service.js.map