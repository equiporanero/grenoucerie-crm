"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceRolesPermissionsCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceRolesPermissionsCacheService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _objectmetadataentity = require("../../object-metadata/object-metadata.entity");
const _fieldpermissionentity = require("../../object-permission/field-permission/field-permission.entity");
const _objectpermissionentity = require("../../object-permission/object-permission.entity");
const _rolepermissionflagentity = require("../../role-permission-flag/role-permission-flag.entity");
const _roleentity = require("../role.entity");
const _rowlevelpermissionpredicategroupentity = require("../../row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
const _rowlevelpermissionpredicateentity = require("../../row-level-permission-predicate/entities/row-level-permission-predicate.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _regroupentitiesbyrelatedentityid = require("../../../workspace-cache/utils/regroup-entities-by-related-entity-id");
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
const WORKFLOW_STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS = [
    _metadata.STANDARD_OBJECTS.workflow.universalIdentifier,
    _metadata.STANDARD_OBJECTS.workflowRun.universalIdentifier,
    _metadata.STANDARD_OBJECTS.workflowVersion.universalIdentifier
];
const WORKSPACE_MEMBER_OBJECT_UNIVERSAL_IDENTIFIER = _metadata.STANDARD_OBJECTS.workspaceMember.universalIdentifier;
let WorkspaceRolesPermissionsCacheService = class WorkspaceRolesPermissionsCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [roles, objectPermissions, rolePermissionFlags, fieldPermissions, rowLevelPermissionPredicates, rowLevelPermissionPredicateGroups, workspaceObjectMetadataCollection] = await Promise.all([
            this.roleRepository.find({
                where: {
                    workspaceId
                }
            }),
            this.objectPermissionRepository.find({
                where: {
                    workspaceId
                }
            }),
            this.rolePermissionFlagRepository.find({
                where: {
                    workspaceId
                },
                relations: [
                    'permissionFlag'
                ]
            }),
            this.fieldPermissionRepository.find({
                where: {
                    workspaceId
                }
            }),
            this.rowLevelPermissionPredicateRepository.find({
                where: {
                    workspaceId,
                    deletedAt: (0, _typeorm1.IsNull)()
                }
            }),
            this.rowLevelPermissionPredicateGroupRepository.find({
                where: {
                    workspaceId,
                    deletedAt: (0, _typeorm1.IsNull)()
                }
            }),
            this.getWorkspaceObjectMetadataCollection(workspaceId)
        ]);
        const objectPermissionsByRoleId = (0, _regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId)({
            entities: objectPermissions,
            foreignKey: 'roleId'
        });
        const rolePermissionFlagsByRoleId = (0, _regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId)({
            entities: rolePermissionFlags,
            foreignKey: 'roleId'
        });
        const fieldPermissionsByRoleId = (0, _regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId)({
            entities: fieldPermissions,
            foreignKey: 'roleId'
        });
        const rowLevelPermissionPredicatesByRoleId = (0, _regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId)({
            entities: rowLevelPermissionPredicates,
            foreignKey: 'roleId'
        });
        const rowLevelPermissionPredicateGroupsByRoleId = (0, _regroupentitiesbyrelatedentityid.regroupEntitiesByRelatedEntityId)({
            entities: rowLevelPermissionPredicateGroups,
            foreignKey: 'roleId'
        });
        const permissionsByRoleId = {};
        for (const role of roles){
            const roleObjectPermissions = objectPermissionsByRoleId.get(role.id) ?? [];
            const roleRolePermissionFlags = rolePermissionFlagsByRoleId.get(role.id) ?? [];
            const roleFieldPermissions = fieldPermissionsByRoleId.get(role.id) ?? [];
            const roleRowLevelPermissionPredicates = rowLevelPermissionPredicatesByRoleId.get(role.id) ?? [];
            const roleRowLevelPermissionPredicateGroups = rowLevelPermissionPredicateGroupsByRoleId.get(role.id) ?? [];
            const objectRecordsPermissions = {};
            for (const objectMetadata of workspaceObjectMetadataCollection){
                const { id: objectMetadataId, isSystem, universalIdentifier } = objectMetadata;
                let canRead = role.canReadAllObjectRecords;
                let canUpdate = role.canUpdateAllObjectRecords;
                let canSoftDelete = role.canSoftDeleteAllObjectRecords;
                let canDestroy = role.canDestroyAllObjectRecords;
                const restrictedFields = {};
                const isWorkspaceMemberObject = universalIdentifier === WORKSPACE_MEMBER_OBJECT_UNIVERSAL_IDENTIFIER;
                const isWorkflowRelatedObject = WORKFLOW_STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.includes(universalIdentifier);
                if (isWorkflowRelatedObject) {
                    const hasWorkflowsPermissions = this.hasSettingsGatedObjectPermissions(role, roleRolePermissionFlags, _constants.PermissionFlagType.WORKFLOWS);
                    canRead = hasWorkflowsPermissions;
                    canUpdate = hasWorkflowsPermissions;
                    canSoftDelete = hasWorkflowsPermissions;
                    canDestroy = hasWorkflowsPermissions;
                } else {
                    if (isWorkspaceMemberObject) {
                        const hasWorkspaceMembersPermissions = this.hasSettingsGatedObjectPermissions(role, roleRolePermissionFlags, _constants.PermissionFlagType.WORKSPACE_MEMBERS);
                        canRead = true;
                        canUpdate = hasWorkspaceMembersPermissions;
                        canSoftDelete = hasWorkspaceMembersPermissions;
                        canDestroy = hasWorkspaceMembersPermissions;
                    } else {
                        const objectRecordPermissionsOverride = roleObjectPermissions.find((objectPermission)=>objectPermission.objectMetadataId === objectMetadataId);
                        const getPermissionValue = (overrideValue, defaultValue)=>isSystem ? true : overrideValue ?? defaultValue;
                        canRead = getPermissionValue(objectRecordPermissionsOverride?.canReadObjectRecords, canRead);
                        canUpdate = getPermissionValue(objectRecordPermissionsOverride?.canUpdateObjectRecords, canUpdate);
                        canSoftDelete = getPermissionValue(objectRecordPermissionsOverride?.canSoftDeleteObjectRecords, canSoftDelete);
                        canDestroy = getPermissionValue(objectRecordPermissionsOverride?.canDestroyObjectRecords, canDestroy);
                    }
                    const fieldPermissionsForObject = roleFieldPermissions.filter((fieldPermission)=>fieldPermission.objectMetadataId === objectMetadataId);
                    for (const fieldPermission of fieldPermissionsForObject){
                        const isFieldLabelIdentifier = fieldPermission.fieldMetadataId === objectMetadata.labelIdentifierFieldMetadataId;
                        if ((0, _utils.isDefined)(fieldPermission.canReadFieldValue) || (0, _utils.isDefined)(fieldPermission.canUpdateFieldValue)) {
                            restrictedFields[fieldPermission.fieldMetadataId] = {
                                canRead: isFieldLabelIdentifier ? true : fieldPermission.canReadFieldValue,
                                canUpdate: fieldPermission.canUpdateFieldValue
                            };
                        }
                    }
                }
                objectRecordsPermissions[objectMetadataId] = {
                    canReadObjectRecords: canRead,
                    canUpdateObjectRecords: canUpdate,
                    canSoftDeleteObjectRecords: canSoftDelete,
                    canDestroyObjectRecords: canDestroy,
                    restrictedFields,
                    rowLevelPermissionPredicates: roleRowLevelPermissionPredicates.filter((rowLevelPermissionPredicate)=>rowLevelPermissionPredicate.objectMetadataId === objectMetadataId),
                    rowLevelPermissionPredicateGroups: roleRowLevelPermissionPredicateGroups.filter((rowLevelPermissionPredicateGroup)=>rowLevelPermissionPredicateGroup.objectMetadataId === objectMetadataId)
                };
            }
            permissionsByRoleId[role.id] = objectRecordsPermissions;
        }
        return permissionsByRoleId;
    }
    async getWorkspaceObjectMetadataCollection(workspaceId) {
        const workspaceObjectMetadata = await this.objectMetadataRepository.find({
            where: {
                workspaceId
            },
            select: [
                'id',
                'isSystem',
                'universalIdentifier',
                'labelIdentifierFieldMetadataId'
            ]
        });
        return workspaceObjectMetadata;
    }
    hasSettingsGatedObjectPermissions(role, rolePermissionFlags, permissionFlagType) {
        const hasPermissionFromRole = role.canUpdateAllSettings;
        const permissionFlagUniversalIdentifier = _constants.SystemPermissionFlag[permissionFlagType];
        const hasPermissionFromSettingPermissions = (0, _utils.isDefined)(rolePermissionFlags.find((rolePermissionFlag)=>rolePermissionFlag.permissionFlag.universalIdentifier === permissionFlagUniversalIdentifier));
        return hasPermissionFromRole || hasPermissionFromSettingPermissions;
    }
    constructor(objectMetadataRepository, roleRepository, objectPermissionRepository, rolePermissionFlagRepository, fieldPermissionRepository, rowLevelPermissionPredicateRepository, rowLevelPermissionPredicateGroupRepository){
        super(), this.objectMetadataRepository = objectMetadataRepository, this.roleRepository = roleRepository, this.objectPermissionRepository = objectPermissionRepository, this.rolePermissionFlagRepository = rolePermissionFlagRepository, this.fieldPermissionRepository = fieldPermissionRepository, this.rowLevelPermissionPredicateRepository = rowLevelPermissionPredicateRepository, this.rowLevelPermissionPredicateGroupRepository = rowLevelPermissionPredicateGroupRepository;
    }
};
WorkspaceRolesPermissionsCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('rolesPermissions'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_objectmetadataentity.ObjectMetadataEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_objectpermissionentity.ObjectPermissionEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_rolepermissionflagentity.RolePermissionFlagEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_fieldpermissionentity.FieldPermissionEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceRolesPermissionsCacheService);

//# sourceMappingURL=workspace-roles-permissions-cache.service.js.map