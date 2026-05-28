"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatPermissionFlagMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatPermissionFlagMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _frompermissionflagentitytoflatpermissionflagutil = require("../utils/from-permission-flag-entity-to-flat-permission-flag.util");
const _permissionflagentity = require("../../permission-flag/permission-flag.entity");
const _rolepermissionflagentity = require("../../role-permission-flag/role-permission-flag.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
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
let WorkspaceFlatPermissionFlagMapCacheService = class WorkspaceFlatPermissionFlagMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [permissionFlags, applications, rolePermissionFlags] = await Promise.all([
            this.permissionFlagRepository.find({
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
            this.rolePermissionFlagRepository.find({
                where: {
                    workspaceId
                },
                withDeleted: true
            })
        ]);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const rolePermissionFlagsByPermissionFlagId = (0, _regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId)({
            entities: rolePermissionFlags,
            foreignKey: 'permissionFlagId'
        });
        const flatPermissionFlagMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const definition of permissionFlags){
            const flatDefinition = (0, _frompermissionflagentitytoflatpermissionflagutil.fromPermissionFlagEntityToFlatPermissionFlag)({
                entity: {
                    ...definition,
                    rolePermissionFlags: rolePermissionFlagsByPermissionFlagId.get(definition.id) ?? []
                },
                applicationIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatDefinition,
                flatEntityMapsToMutate: flatPermissionFlagMaps
            });
        }
        return flatPermissionFlagMaps;
    }
    constructor(permissionFlagRepository, applicationRepository, rolePermissionFlagRepository){
        super(), this.permissionFlagRepository = permissionFlagRepository, this.applicationRepository = applicationRepository, this.rolePermissionFlagRepository = rolePermissionFlagRepository;
    }
};
WorkspaceFlatPermissionFlagMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatPermissionFlagMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_permissionflagentity.PermissionFlagEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_rolepermissionflagentity.RolePermissionFlagEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatPermissionFlagMapCacheService);

//# sourceMappingURL=workspace-flat-permission-flag-map-cache.service.js.map