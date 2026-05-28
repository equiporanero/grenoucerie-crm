"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatRoleMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatRoleMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromroleentitytoflatroleutil = require("../../flat-role/utils/from-role-entity-to-flat-role.util");
const _fieldpermissionentity = require("../../object-permission/field-permission/field-permission.entity");
const _objectpermissionentity = require("../../object-permission/object-permission.entity");
const _rolepermissionflagentity = require("../../role-permission-flag/role-permission-flag.entity");
const _roletargetentity = require("../../role-target/role-target.entity");
const _roleentity = require("../role.entity");
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
let WorkspaceFlatRoleMapCacheService = class WorkspaceFlatRoleMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [roles, applications, roleTargets, objectPermissions, rolePermissionFlags, fieldPermissions, rowLevelPermissionPredicates, rowLevelPermissionPredicateGroups] = await Promise.all([
            this.roleRepository.find({
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
            this.roleTargetRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'roleId'
                ],
                withDeleted: true
            }),
            this.objectPermissionRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'roleId'
                ],
                withDeleted: true
            }),
            this.rolePermissionFlagRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'roleId'
                ],
                withDeleted: true
            }),
            this.fieldPermissionRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'roleId'
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
                    'roleId'
                ],
                withDeleted: true
            }),
            this.rowLevelPermissionPredicateGroupRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier',
                    'roleId'
                ],
                withDeleted: true
            })
        ]);
        const [roleTargetsByRoleId, objectPermissionsByRoleId, rolePermissionFlagsByRoleId, fieldPermissionsByRoleId, rowLevelPermissionPredicatesByRoleId, rowLevelPermissionPredicateGroupsByRoleId] = [
            {
                entities: roleTargets,
                foreignKey: 'roleId'
            },
            {
                entities: objectPermissions,
                foreignKey: 'roleId'
            },
            {
                entities: rolePermissionFlags,
                foreignKey: 'roleId'
            },
            {
                entities: fieldPermissions,
                foreignKey: 'roleId'
            },
            {
                entities: rowLevelPermissionPredicates,
                foreignKey: 'roleId'
            },
            {
                entities: rowLevelPermissionPredicateGroups,
                foreignKey: 'roleId'
            }
        ].map(_regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const flatRoleMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const roleEntity of roles){
            const flatRole = (0, _fromroleentitytoflatroleutil.fromRoleEntityToFlatRole)({
                entity: {
                    ...roleEntity,
                    roleTargets: roleTargetsByRoleId.get(roleEntity.id) || [],
                    objectPermissions: objectPermissionsByRoleId.get(roleEntity.id) || [],
                    rolePermissionFlags: rolePermissionFlagsByRoleId.get(roleEntity.id) || [],
                    fieldPermissions: fieldPermissionsByRoleId.get(roleEntity.id) || [],
                    rowLevelPermissionPredicates: rowLevelPermissionPredicatesByRoleId.get(roleEntity.id) || [],
                    rowLevelPermissionPredicateGroups: rowLevelPermissionPredicateGroupsByRoleId.get(roleEntity.id) || []
                },
                applicationIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatRole,
                flatEntityMapsToMutate: flatRoleMaps
            });
        }
        return flatRoleMaps;
    }
    constructor(roleRepository, applicationRepository, roleTargetRepository, objectPermissionRepository, rolePermissionFlagRepository, fieldPermissionRepository, rowLevelPermissionPredicateRepository, rowLevelPermissionPredicateGroupRepository){
        super(), this.roleRepository = roleRepository, this.applicationRepository = applicationRepository, this.roleTargetRepository = roleTargetRepository, this.objectPermissionRepository = objectPermissionRepository, this.rolePermissionFlagRepository = rolePermissionFlagRepository, this.fieldPermissionRepository = fieldPermissionRepository, this.rowLevelPermissionPredicateRepository = rowLevelPermissionPredicateRepository, this.rowLevelPermissionPredicateGroupRepository = rowLevelPermissionPredicateGroupRepository;
    }
};
WorkspaceFlatRoleMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatRoleMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_roletargetentity.RoleTargetEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_objectpermissionentity.ObjectPermissionEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_rolepermissionflagentity.RolePermissionFlagEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_fieldpermissionentity.FieldPermissionEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatRoleMapCacheService);

//# sourceMappingURL=workspace-flat-role-map-cache.service.js.map