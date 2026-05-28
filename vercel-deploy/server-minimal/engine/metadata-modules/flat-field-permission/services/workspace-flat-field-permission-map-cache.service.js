"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatFieldPermissionMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatFieldPermissionMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _fieldmetadataentity = require("../../field-metadata/field-metadata.entity");
const _createemptyflatentitymapsconstant = require("../../flat-entity/constant/create-empty-flat-entity-maps.constant");
const _fromfieldpermissionentitytoflatfieldpermissionutil = require("../utils/from-field-permission-entity-to-flat-field-permission.util");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _fieldpermissionentity = require("../../object-permission/field-permission/field-permission.entity");
const _roleentity = require("../../role/role.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
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
let WorkspaceFlatFieldPermissionMapCacheService = class WorkspaceFlatFieldPermissionMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [fieldPermissions, applications, roles, objectMetadatas, fieldMetadatas] = await Promise.all([
            this.fieldPermissionRepository.find({
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
            })
        ]);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const roleIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(roles);
        const objectMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(objectMetadatas);
        const fieldMetadataIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(fieldMetadatas);
        const flatFieldPermissionMaps = (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)();
        for (const fieldPermissionEntity of fieldPermissions){
            const flatFieldPermission = (0, _fromfieldpermissionentitytoflatfieldpermissionutil.fromFieldPermissionEntityToFlatFieldPermission)({
                entity: fieldPermissionEntity,
                applicationIdToUniversalIdentifierMap,
                roleIdToUniversalIdentifierMap,
                objectMetadataIdToUniversalIdentifierMap,
                fieldMetadataIdToUniversalIdentifierMap
            });
            (0, _addflatentitytoflatentitymapsthroughmutationorthrowutil.addFlatEntityToFlatEntityMapsThroughMutationOrThrow)({
                flatEntity: flatFieldPermission,
                flatEntityMapsToMutate: flatFieldPermissionMaps
            });
        }
        return flatFieldPermissionMaps;
    }
    constructor(fieldPermissionRepository, applicationRepository, roleRepository, objectMetadataRepository, fieldMetadataRepository){
        super(), this.fieldPermissionRepository = fieldPermissionRepository, this.applicationRepository = applicationRepository, this.roleRepository = roleRepository, this.objectMetadataRepository = objectMetadataRepository, this.fieldMetadataRepository = fieldMetadataRepository;
    }
};
WorkspaceFlatFieldPermissionMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatFieldPermissionMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_fieldpermissionentity.FieldPermissionEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatFieldPermissionMapCacheService);

//# sourceMappingURL=workspace-flat-field-permission-map-cache.service.js.map