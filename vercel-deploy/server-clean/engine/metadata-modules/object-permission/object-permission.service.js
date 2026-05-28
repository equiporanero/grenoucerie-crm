"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectPermissionService", {
    enumerable: true,
    get: function() {
        return ObjectPermissionService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreateobjectpermissioninputtouniversalflatobjectpermissionutil = require("../flat-object-permission/utils/from-create-object-permission-input-to-universal-flat-object-permission.util");
const _permissionsexception = require("../permissions/permissions.exception");
const _workspacemigrationbuilderexception = require("../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectPermissionService = class ObjectPermissionService {
    async upsertObjectPermissions({ workspaceId, input }) {
        const { flatObjectPermissionMaps, flatRoleMaps, flatObjectMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectPermissionMaps',
                'flatRoleMaps',
                'flatObjectMetadataMaps'
            ]
        });
        const roleUniversalIdentifier = flatRoleMaps.universalIdentifierById[input.roleId];
        const flatRole = (0, _utils.isDefined)(roleUniversalIdentifier) ? flatRoleMaps.byUniversalIdentifier[roleUniversalIdentifier] : undefined;
        if (!(0, _utils.isDefined)(flatRole)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.ROLE_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.ROLE_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "woRk0z",
                    message: "The role you are trying to modify could not be found."
                }
            });
        }
        const currentObjectPermissionsForRole = Object.values(flatObjectPermissionMaps.byUniversalIdentifier).filter((op)=>(0, _utils.isDefined)(op) && op.roleUniversalIdentifier === roleUniversalIdentifier);
        this.validateObjectPermissionsReadAndWriteConsistencyOrThrow({
            objectPermissions: input.objectPermissions,
            flatRole,
            currentObjectPermissionsForRole
        });
        const flatApplication = await this.getFlatApplicationForWorkspace(workspaceId);
        const desiredByObjectMetadataId = new Map(input.objectPermissions.map((op)=>[
                op.objectMetadataId,
                op
            ]));
        for (const desired of input.objectPermissions){
            const objectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: desired.objectMetadataId,
                flatEntityMaps: flatObjectMetadataMaps
            });
            if (!(0, _utils.isDefined)(objectMetadata)) {
                throw new _permissionsexception.PermissionsException('Object metadata id not found', _permissionsexception.PermissionsExceptionCode.OBJECT_METADATA_NOT_FOUND, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "hx2IZ4",
                        message: "The object you are trying to set permissions for could not be found. It may have been deleted."
                    }
                });
            }
            if (objectMetadata.isSystem === true) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.CANNOT_ADD_OBJECT_PERMISSION_ON_SYSTEM_OBJECT, _permissionsexception.PermissionsExceptionCode.CANNOT_ADD_OBJECT_PERMISSION_ON_SYSTEM_OBJECT, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "SI6USg",
                        message: "You cannot set permissions on system objects as they are managed by the platform."
                    }
                });
            }
        }
        const flatEntityToCreate = [];
        const flatEntityToUpdate = [];
        const flatEntityToDelete = [];
        const currentByObjectMetadataId = new Map(currentObjectPermissionsForRole.map((op)=>[
                op.objectMetadataId,
                op
            ]));
        for (const desired of input.objectPermissions){
            const current = currentByObjectMetadataId.get(desired.objectMetadataId);
            if (!(0, _utils.isDefined)(current)) {
                flatEntityToCreate.push((0, _fromcreateobjectpermissioninputtouniversalflatobjectpermissionutil.fromCreateObjectPermissionInputToUniversalFlatObjectPermission)({
                    createObjectPermissionInput: {
                        roleId: input.roleId,
                        objectMetadataId: desired.objectMetadataId,
                        canReadObjectRecords: desired.canReadObjectRecords,
                        canUpdateObjectRecords: desired.canUpdateObjectRecords,
                        canSoftDeleteObjectRecords: desired.canSoftDeleteObjectRecords,
                        canDestroyObjectRecords: desired.canDestroyObjectRecords
                    },
                    flatApplication,
                    flatRoleMaps,
                    flatObjectMetadataMaps
                }));
            } else {
                const effectiveCanRead = desired.canReadObjectRecords !== undefined ? desired.canReadObjectRecords : current.canReadObjectRecords;
                const effectiveCanUpdate = desired.canUpdateObjectRecords !== undefined ? desired.canUpdateObjectRecords : current.canUpdateObjectRecords;
                const effectiveCanSoftDelete = desired.canSoftDeleteObjectRecords !== undefined ? desired.canSoftDeleteObjectRecords : current.canSoftDeleteObjectRecords;
                const effectiveCanDestroy = desired.canDestroyObjectRecords !== undefined ? desired.canDestroyObjectRecords : current.canDestroyObjectRecords;
                const canChanged = effectiveCanRead !== current.canReadObjectRecords || effectiveCanUpdate !== current.canUpdateObjectRecords || effectiveCanSoftDelete !== current.canSoftDeleteObjectRecords || effectiveCanDestroy !== current.canDestroyObjectRecords;
                if (canChanged) {
                    const now = new Date().toISOString();
                    flatEntityToUpdate.push({
                        universalIdentifier: current.universalIdentifier,
                        applicationUniversalIdentifier: current.applicationUniversalIdentifier,
                        roleUniversalIdentifier: current.roleUniversalIdentifier,
                        objectMetadataUniversalIdentifier: current.objectMetadataUniversalIdentifier,
                        canReadObjectRecords: effectiveCanRead,
                        canUpdateObjectRecords: effectiveCanUpdate,
                        canSoftDeleteObjectRecords: effectiveCanSoftDelete,
                        canDestroyObjectRecords: effectiveCanDestroy,
                        createdAt: current.createdAt,
                        updatedAt: now
                    });
                }
            }
        }
        for (const current of currentObjectPermissionsForRole){
            if (!desiredByObjectMetadataId.has(current.objectMetadataId)) {
                flatEntityToDelete.push({
                    universalIdentifier: current.universalIdentifier,
                    applicationUniversalIdentifier: current.applicationUniversalIdentifier,
                    roleUniversalIdentifier: current.roleUniversalIdentifier,
                    objectMetadataUniversalIdentifier: current.objectMetadataUniversalIdentifier,
                    canReadObjectRecords: current.canReadObjectRecords,
                    canUpdateObjectRecords: current.canUpdateObjectRecords,
                    canSoftDeleteObjectRecords: current.canSoftDeleteObjectRecords,
                    canDestroyObjectRecords: current.canDestroyObjectRecords,
                    createdAt: current.createdAt,
                    updatedAt: current.updatedAt
                });
            }
        }
        if (flatEntityToCreate.length === 0 && flatEntityToUpdate.length === 0 && flatEntityToDelete.length === 0) {
            const unchanged = currentObjectPermissionsForRole.filter((op)=>desiredByObjectMetadataId.has(op.objectMetadataId));
            return unchanged;
        }
        const buildAndRunResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                objectPermission: {
                    flatEntityToCreate,
                    flatEntityToUpdate,
                    flatEntityToDelete
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: flatApplication.universalIdentifier
        });
        if (buildAndRunResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(buildAndRunResult, 'Validation errors occurred while upserting object permissions');
        }
        const { flatObjectPermissionMaps: freshFlatObjectPermissionMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectPermissionMaps'
            ]
        });
        const resultObjectPermissions = Object.values(freshFlatObjectPermissionMaps.byUniversalIdentifier).filter((op)=>(0, _utils.isDefined)(op) && op.roleUniversalIdentifier === roleUniversalIdentifier);
        const desiredObjectMetadataIds = new Set(input.objectPermissions.map((op)=>op.objectMetadataId));
        const filtered = resultObjectPermissions.filter((op)=>desiredObjectMetadataIds.has(op.objectMetadataId));
        return filtered;
    }
    validateObjectPermissionsReadAndWriteConsistencyOrThrow({ objectPermissions: newObjectPermissions, flatRole, currentObjectPermissionsForRole }) {
        for (const newObjectPermission of newObjectPermissions){
            const existingObjectRecordPermission = currentObjectPermissionsForRole.find((objectPermission)=>objectPermission.objectMetadataId === newObjectPermission.objectMetadataId);
            const resolvedCanRead = newObjectPermission.canReadObjectRecords !== undefined ? newObjectPermission.canReadObjectRecords : existingObjectRecordPermission?.canReadObjectRecords;
            const hasReadPermissionAfterUpdate = resolvedCanRead ?? flatRole.canReadAllObjectRecords;
            if (hasReadPermissionAfterUpdate === false) {
                const resolvedCanUpdate = newObjectPermission.canUpdateObjectRecords !== undefined ? newObjectPermission.canUpdateObjectRecords : existingObjectRecordPermission?.canUpdateObjectRecords;
                const hasUpdatePermissionAfterUpdate = resolvedCanUpdate ?? flatRole.canUpdateAllObjectRecords;
                const resolvedCanSoftDelete = newObjectPermission.canSoftDeleteObjectRecords !== undefined ? newObjectPermission.canSoftDeleteObjectRecords : existingObjectRecordPermission?.canSoftDeleteObjectRecords;
                const hasSoftDeletePermissionAfterUpdate = resolvedCanSoftDelete ?? flatRole.canSoftDeleteAllObjectRecords;
                const resolvedCanDestroy = newObjectPermission.canDestroyObjectRecords !== undefined ? newObjectPermission.canDestroyObjectRecords : existingObjectRecordPermission?.canDestroyObjectRecords;
                const hasDestroyPermissionAfterUpdate = resolvedCanDestroy ?? flatRole.canDestroyAllObjectRecords;
                if (hasUpdatePermissionAfterUpdate || hasSoftDeletePermissionAfterUpdate || hasDestroyPermissionAfterUpdate) {
                    throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.CANNOT_GIVE_WRITING_PERMISSION_ON_NON_READABLE_OBJECT, _permissionsexception.PermissionsExceptionCode.CANNOT_GIVE_WRITING_PERMISSION_ON_NON_READABLE_OBJECT, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "y5haJ4",
                            message: "You cannot grant edit permissions without also granting read permissions. Please enable read access first."
                        }
                    });
                }
            }
        }
    }
    async getFlatApplicationForWorkspace(workspaceId) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        return workspaceCustomFlatApplication;
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
ObjectPermissionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], ObjectPermissionService);

//# sourceMappingURL=object-permission.service.js.map