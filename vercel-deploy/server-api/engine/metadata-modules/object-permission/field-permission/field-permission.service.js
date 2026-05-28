"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldPermissionService", {
    enumerable: true,
    get: function() {
        return FieldPermissionService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../../core-modules/application/application.service");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _relationtypeinterface = require("../../field-metadata/interfaces/relation-type.interface");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _fromcreatefieldpermissioninputtouniversalflatfieldpermissionutil = require("../../flat-field-permission/utils/from-create-field-permission-input-to-universal-flat-field-permission.util");
const _permissionsexception = require("../../permissions/permissions.exception");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const keyFrom = (objectMetadataId, fieldMetadataId)=>`${objectMetadataId}:${fieldMetadataId}`;
let FieldPermissionService = class FieldPermissionService {
    async upsertFieldPermissions({ workspaceId, input }) {
        const [flatMapsForRoleObjectField, flatFieldPermissionMapsResult] = await Promise.all([
            this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: [
                    'flatRoleMaps',
                    'flatObjectMetadataMaps',
                    'flatFieldMetadataMaps'
                ]
            }),
            this.workspaceCacheService.getOrRecompute(workspaceId, [
                'flatFieldPermissionMaps'
            ])
        ]);
        const flatRoleMaps = flatMapsForRoleObjectField.flatRoleMaps;
        const flatObjectMetadataMaps = flatMapsForRoleObjectField.flatObjectMetadataMaps;
        const flatFieldMetadataMaps = flatMapsForRoleObjectField.flatFieldMetadataMaps;
        const flatFieldPermissionMapsResolved = flatFieldPermissionMapsResult.flatFieldPermissionMaps;
        const { rolesPermissions } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'rolesPermissions'
        ]);
        const roleUniversalIdentifier = flatRoleMaps.universalIdentifierById[input.roleId];
        const flatRole = (0, _utils.isDefined)(roleUniversalIdentifier) ? flatRoleMaps.byUniversalIdentifier[roleUniversalIdentifier] : undefined;
        const currentFieldPermissionsForRole = Object.values(flatFieldPermissionMapsResolved.byUniversalIdentifier).filter((fp)=>(0, _utils.isDefined)(fp) && fp.roleUniversalIdentifier === roleUniversalIdentifier);
        const desiredMap = new Map();
        for (const fieldPermission of input.fieldPermissions){
            this.validateFieldPermission({
                allFieldPermissions: input.fieldPermissions,
                fieldPermission,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                rolesPermissions,
                flatRole
            });
            const bothNull = (fieldPermission.canReadFieldValue === null || fieldPermission.canReadFieldValue === undefined) && (fieldPermission.canUpdateFieldValue === null || fieldPermission.canUpdateFieldValue === undefined);
            if (bothNull) {
                continue;
            }
            desiredMap.set(keyFrom(fieldPermission.objectMetadataId, fieldPermission.fieldMetadataId), {
                objectMetadataId: fieldPermission.objectMetadataId,
                fieldMetadataId: fieldPermission.fieldMetadataId,
                canReadFieldValue: fieldPermission.canReadFieldValue,
                canUpdateFieldValue: fieldPermission.canUpdateFieldValue
            });
        }
        this.addRelatedFieldPermissionsToDesired({
            desiredMap,
            inputFieldPermissions: input.fieldPermissions,
            flatFieldMetadataMaps
        });
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const flatEntityToCreate = [];
        const flatEntityToUpdate = [];
        const flatEntityToDelete = [];
        const currentByKey = new Map(currentFieldPermissionsForRole.map((fp)=>[
                keyFrom(fp.objectMetadataId, fp.fieldMetadataId),
                fp
            ]));
        for (const [, desired] of desiredMap){
            const current = currentByKey.get(keyFrom(desired.objectMetadataId, desired.fieldMetadataId));
            if (!(0, _utils.isDefined)(current)) {
                flatEntityToCreate.push((0, _fromcreatefieldpermissioninputtouniversalflatfieldpermissionutil.fromCreateFieldPermissionInputToUniversalFlatFieldPermission)({
                    fieldPermissionInput: {
                        objectMetadataId: desired.objectMetadataId,
                        fieldMetadataId: desired.fieldMetadataId,
                        canReadFieldValue: desired.canReadFieldValue ?? null,
                        canUpdateFieldValue: desired.canUpdateFieldValue ?? null
                    },
                    roleId: input.roleId,
                    flatApplication: workspaceCustomFlatApplication,
                    flatRoleMaps,
                    flatObjectMetadataMaps,
                    flatFieldMetadataMaps
                }));
            } else {
                const effectiveCanRead = desired.canReadFieldValue !== undefined ? desired.canReadFieldValue : current.canReadFieldValue;
                const effectiveCanUpdate = desired.canUpdateFieldValue !== undefined ? desired.canUpdateFieldValue : current.canUpdateFieldValue;
                const changed = effectiveCanRead !== current.canReadFieldValue || effectiveCanUpdate !== current.canUpdateFieldValue;
                if (changed) {
                    const now = new Date().toISOString();
                    flatEntityToUpdate.push({
                        universalIdentifier: current.universalIdentifier,
                        applicationUniversalIdentifier: current.applicationUniversalIdentifier,
                        roleUniversalIdentifier: current.roleUniversalIdentifier,
                        objectMetadataUniversalIdentifier: current.objectMetadataUniversalIdentifier,
                        fieldMetadataUniversalIdentifier: current.fieldMetadataUniversalIdentifier,
                        canReadFieldValue: effectiveCanRead,
                        canUpdateFieldValue: effectiveCanUpdate,
                        createdAt: current.createdAt,
                        updatedAt: now
                    });
                }
            }
        }
        const inputFieldKeys = new Set(input.fieldPermissions.map((fp)=>keyFrom(fp.objectMetadataId, fp.fieldMetadataId)));
        for (const current of currentFieldPermissionsForRole){
            const key = keyFrom(current.objectMetadataId, current.fieldMetadataId);
            if (inputFieldKeys.has(key) && !desiredMap.has(key)) {
                flatEntityToDelete.push({
                    universalIdentifier: current.universalIdentifier,
                    applicationUniversalIdentifier: current.applicationUniversalIdentifier,
                    roleUniversalIdentifier: current.roleUniversalIdentifier,
                    objectMetadataUniversalIdentifier: current.objectMetadataUniversalIdentifier,
                    fieldMetadataUniversalIdentifier: current.fieldMetadataUniversalIdentifier,
                    canReadFieldValue: current.canReadFieldValue ?? undefined,
                    canUpdateFieldValue: current.canUpdateFieldValue ?? undefined,
                    createdAt: current.createdAt,
                    updatedAt: current.updatedAt
                });
            }
        }
        if (flatEntityToCreate.length === 0 && flatEntityToUpdate.length === 0 && flatEntityToDelete.length === 0) {
            const desiredObjectMetadataIds = new Set(input.fieldPermissions.map((fp)=>fp.objectMetadataId));
            return currentFieldPermissionsForRole.filter((fp)=>desiredObjectMetadataIds.has(fp.objectMetadataId));
        }
        const buildAndRunResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                fieldPermission: {
                    flatEntityToCreate,
                    flatEntityToUpdate,
                    flatEntityToDelete
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (buildAndRunResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(buildAndRunResult, 'Validation errors occurred while upserting field permissions');
        }
        await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
            'rolesPermissions'
        ]);
        const freshFlatFieldPermissionMaps = (await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatFieldPermissionMaps'
        ])).flatFieldPermissionMaps;
        const resultFieldPermissions = Object.values(freshFlatFieldPermissionMaps.byUniversalIdentifier).filter((fp)=>(0, _utils.isDefined)(fp) && fp.roleUniversalIdentifier === roleUniversalIdentifier);
        const desiredObjectMetadataIds = new Set(input.fieldPermissions.map((fp)=>fp.objectMetadataId));
        const filtered = resultFieldPermissions.filter((fp)=>desiredObjectMetadataIds.has(fp.objectMetadataId));
        return filtered;
    }
    validateFieldPermission({ allFieldPermissions, fieldPermission, flatObjectMetadataMaps, flatFieldMetadataMaps, rolesPermissions, flatRole }) {
        const duplicateFieldPermissions = allFieldPermissions.filter((permission)=>permission.fieldMetadataId === fieldPermission.fieldMetadataId);
        if (duplicateFieldPermissions.length > 1) {
            throw new _graphqlerrorsutil.UserInputError(`Cannot accept more than one fieldPermission for field ${fieldPermission.fieldMetadataId} in input.`);
        }
        if ((0, _utils.isDefined)(fieldPermission.canUpdateFieldValue) && fieldPermission.canUpdateFieldValue !== false || (0, _utils.isDefined)(fieldPermission.canReadFieldValue) && fieldPermission.canReadFieldValue !== false) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.ONLY_FIELD_RESTRICTION_ALLOWED, _permissionsexception.PermissionsExceptionCode.ONLY_FIELD_RESTRICTION_ALLOWED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "QXuG8C",
                    message: "Field permissions can only be used to restrict access, not to grant additional permissions."
                }
            });
        }
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldPermission.objectMetadataId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.OBJECT_METADATA_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.OBJECT_METADATA_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "hx2IZ4",
                    message: "The object you are trying to set permissions for could not be found. It may have been deleted."
                }
            });
        }
        if (flatObjectMetadata.isSystem === true) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.CANNOT_ADD_FIELD_PERMISSION_ON_SYSTEM_OBJECT, _permissionsexception.PermissionsExceptionCode.CANNOT_ADD_FIELD_PERMISSION_ON_SYSTEM_OBJECT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "WUcQVb",
                    message: "You cannot set field permissions on system objects as they are managed by the platform."
                }
            });
        }
        const flatFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldPermission.fieldMetadataId,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatFieldMetadata)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.FIELD_METADATA_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.FIELD_METADATA_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "LdhPiK",
                    message: "The field you are trying to set permissions for could not be found. It may have been deleted."
                }
            });
        }
        const rolePermissionOnObject = (0, _utils.isDefined)(flatRole) ? rolesPermissions?.[flatRole.id]?.[fieldPermission.objectMetadataId] : undefined;
        if ((0, _utils.isDefined)(flatRole) && !(0, _utils.isDefined)(rolePermissionOnObject)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.OBJECT_PERMISSION_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.OBJECT_PERMISSION_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "2iURlq",
                    message: "No permissions are set for this role on the selected object. Please set object permissions first."
                }
            });
        }
    }
    addRelatedFieldPermissionsToDesired({ desiredMap, inputFieldPermissions, flatFieldMetadataMaps }) {
        const inputKeys = new Set(inputFieldPermissions.map((fp)=>keyFrom(fp.objectMetadataId, fp.fieldMetadataId)));
        for (const fieldPermission of inputFieldPermissions){
            const flatFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldPermission.fieldMetadataId,
                flatEntityMaps: flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(flatFieldMetadata) || flatFieldMetadata.type !== _types.FieldMetadataType.RELATION) {
                continue;
            }
            const relationType = flatFieldMetadata.settings?.relationType;
            if (relationType !== _relationtypeinterface.RelationType.ONE_TO_MANY && relationType !== _relationtypeinterface.RelationType.MANY_TO_ONE) {
                continue;
            }
            const targetObjectId = flatFieldMetadata.relationTargetObjectMetadataId ?? undefined;
            const targetFieldId = flatFieldMetadata.relationTargetFieldMetadataId ?? undefined;
            if (!targetObjectId || !targetFieldId) {
                continue;
            }
            const targetKey = keyFrom(targetObjectId, targetFieldId);
            if (inputKeys.has(targetKey)) {
                const targetInInput = inputFieldPermissions.find((fp)=>fp.objectMetadataId === targetObjectId && fp.fieldMetadataId === targetFieldId);
                if ((0, _utils.isDefined)(targetInInput)) {
                    const hasConflict = fieldPermission.canReadFieldValue !== targetInInput.canReadFieldValue || fieldPermission.canUpdateFieldValue !== targetInInput.canUpdateFieldValue;
                    if (hasConflict) {
                        throw new _graphqlerrorsutil.UserInputError('Conflicting field permissions found for relation target field', {
                            userFriendlyMessage: /*i18n*/ {
                                id: "cmBz2p",
                                message: "Contradicting field permissions have been detected on a relation field."
                            }
                        });
                    }
                }
                continue;
            }
            desiredMap.set(targetKey, {
                objectMetadataId: targetObjectId,
                fieldMetadataId: targetFieldId,
                canReadFieldValue: fieldPermission.canReadFieldValue ?? undefined,
                canUpdateFieldValue: fieldPermission.canUpdateFieldValue ?? undefined
            });
        }
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, workspaceCacheService, applicationService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.workspaceCacheService = workspaceCacheService;
        this.applicationService = applicationService;
    }
};
FieldPermissionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], FieldPermissionService);

//# sourceMappingURL=field-permission.service.js.map