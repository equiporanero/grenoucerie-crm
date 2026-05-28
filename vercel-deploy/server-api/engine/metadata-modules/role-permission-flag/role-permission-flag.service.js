"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RolePermissionFlagService", {
    enumerable: true,
    get: function() {
        return RolePermissionFlagService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _applicationservice = require("../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _fromcreaterolepermissionflaginputtoflatrolepermissionflagtocreateutil = require("../flat-role-permission-flag/utils/from-create-role-permission-flag-input-to-flat-role-permission-flag-to-create.util");
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
let RolePermissionFlagService = class RolePermissionFlagService {
    async upsertPermissionFlags({ workspaceId, input }) {
        const { flatPermissionFlagMaps, flatRolePermissionFlagMaps, flatRoleMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatPermissionFlagMaps',
                'flatRolePermissionFlagMaps',
                'flatRoleMaps'
            ]
        });
        const roleUniversalId = flatRoleMaps.universalIdentifierById[input.roleId];
        const role = (0, _utils.isDefined)(roleUniversalId) ? flatRoleMaps.byUniversalIdentifier[roleUniversalId] : undefined;
        if (!(0, _utils.isDefined)(role)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.ROLE_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.ROLE_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "woRk0z",
                    message: "The role you are trying to modify could not be found."
                }
            });
        }
        const roleUniversalIdentifier = role.universalIdentifier;
        const permissionFlagByKey = new Map(Object.values(flatPermissionFlagMaps.byUniversalIdentifier).filter(_utils.isDefined).map((permissionFlag)=>[
                permissionFlag.key,
                permissionFlag
            ]));
        const permissionFlagsByInputKey = input.permissionFlagKeys.map((flag)=>({
                flag,
                permissionFlag: permissionFlagByKey.get(flag)
            }));
        const missingPermissionFlags = permissionFlagsByInputKey.filter(({ permissionFlag })=>!(0, _utils.isDefined)(permissionFlag)).map(({ flag })=>flag);
        if (missingPermissionFlags.length > 0) {
            throw new _permissionsexception.PermissionsException(`${_permissionsexception.PermissionsExceptionMessage.INVALID_SETTING}: ${missingPermissionFlags.join(', ')}`, _permissionsexception.PermissionsExceptionCode.INVALID_SETTING, {
                userFriendlyMessage: /*i18n*/ {
                    id: "01Sxb6",
                    message: "Some of the permissions you selected are not valid. Please try again with valid permission settings."
                }
            });
        }
        const currentRolePermissionFlagsForRole = Object.values(flatRolePermissionFlagMaps.byUniversalIdentifier).filter((pf)=>(0, _utils.isDefined)(pf) && pf.roleUniversalIdentifier === roleUniversalIdentifier);
        const inputSet = new Set(permissionFlagsByInputKey.map(({ permissionFlag })=>permissionFlag?.universalIdentifier).filter(_utils.isDefined));
        const existingSet = new Set(currentRolePermissionFlagsForRole.map((pf)=>pf.permissionFlagUniversalIdentifier));
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const flatEntityToCreate = permissionFlagsByInputKey.map(({ permissionFlag })=>permissionFlag).filter(_utils.isDefined).filter((permissionFlag)=>!existingSet.has(permissionFlag.universalIdentifier)).map((permissionFlag)=>(0, _fromcreaterolepermissionflaginputtoflatrolepermissionflagtocreateutil.fromCreateRolePermissionFlagInputToFlatRolePermissionFlagToCreate)({
                createRolePermissionFlagInput: {
                    roleId: input.roleId,
                    permissionFlagId: permissionFlag.id,
                    flag: permissionFlag.key
                },
                flatApplication: workspaceCustomFlatApplication,
                flatPermissionFlagMaps,
                flatRoleMaps
            }));
        const flatEntityToDelete = currentRolePermissionFlagsForRole.filter((pf)=>!inputSet.has(pf.permissionFlagUniversalIdentifier));
        if (flatEntityToCreate.length === 0 && flatEntityToDelete.length === 0) {
            return currentRolePermissionFlagsForRole.filter((pf)=>inputSet.has(pf.permissionFlagUniversalIdentifier));
        }
        const buildAndRunResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                rolePermissionFlag: {
                    flatEntityToCreate,
                    flatEntityToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (buildAndRunResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(buildAndRunResult, 'Validation errors occurred while upserting permission flags');
        }
        const { flatRolePermissionFlagMaps: freshFlatRolePermissionFlagMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRolePermissionFlagMaps'
            ]
        });
        const resultFlags = Object.values(freshFlatRolePermissionFlagMaps.byUniversalIdentifier).filter((pf)=>(0, _utils.isDefined)(pf) && pf.roleUniversalIdentifier === roleUniversalIdentifier);
        return resultFlags;
    }
    constructor(workspaceMigrationValidateBuildAndRunService, workspaceManyOrAllFlatEntityMapsCacheService, applicationService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.applicationService = applicationService;
    }
};
RolePermissionFlagService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], RolePermissionFlagService);

//# sourceMappingURL=role-permission-flag.service.js.map