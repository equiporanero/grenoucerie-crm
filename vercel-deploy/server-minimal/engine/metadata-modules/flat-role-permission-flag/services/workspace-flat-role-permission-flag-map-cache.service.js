"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatRolePermissionFlagMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatRolePermissionFlagMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromrolepermissionflagentitytoflatrolepermissionflagutil = require("../utils/from-role-permission-flag-entity-to-flat-role-permission-flag.util");
const _permissionflagentity = require("../../permission-flag/permission-flag.entity");
const _rolepermissionflagentity = require("../../role-permission-flag/role-permission-flag.entity");
const _roleentity = require("../../role/role.entity");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
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
let WorkspaceFlatRolePermissionFlagMapCacheService = class WorkspaceFlatRolePermissionFlagMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [rolePermissionFlags, applications, roles, permissionFlags] = await Promise.all([
            this.rolePermissionFlagRepository.find({
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
            this.permissionFlagRepository.find({
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
        const roleIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(roles);
        const permissionFlagIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(permissionFlags);
        const flatRolePermissionFlagMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const rolePermissionFlagEntity of rolePermissionFlags){
            const flatRolePermissionFlag = (0, _fromrolepermissionflagentitytoflatrolepermissionflagutil.fromRolePermissionFlagEntityToFlatRolePermissionFlag)({
                entity: rolePermissionFlagEntity,
                applicationIdToUniversalIdentifierMap,
                permissionFlagIdToUniversalIdentifierMap,
                roleIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatRolePermissionFlag,
                flatEntityMapsToMutate: flatRolePermissionFlagMaps
            });
        }
        return flatRolePermissionFlagMaps;
    }
    constructor(rolePermissionFlagRepository, applicationRepository, roleRepository, permissionFlagRepository){
        super(), this.rolePermissionFlagRepository = rolePermissionFlagRepository, this.applicationRepository = applicationRepository, this.roleRepository = roleRepository, this.permissionFlagRepository = permissionFlagRepository;
    }
};
WorkspaceFlatRolePermissionFlagMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatRolePermissionFlagMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_rolepermissionflagentity.RolePermissionFlagEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_permissionflagentity.PermissionFlagEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatRolePermissionFlagMapCacheService);

//# sourceMappingURL=workspace-flat-role-permission-flag-map-cache.service.js.map