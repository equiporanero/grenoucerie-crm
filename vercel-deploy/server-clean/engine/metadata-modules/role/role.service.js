"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoleService", {
    enumerable: true,
    get: function() {
        return RoleService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _apikeyexception = require("../../core-modules/api-key/exceptions/api-key.exception");
const _apikeyroleservice = require("../../core-modules/api-key/services/api-key-role.service");
const _applicationservice = require("../../core-modules/application/application.service");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _aiagentroleservice = require("../ai/ai-agent-role/ai-agent-role.service");
const _aiexception = require("../ai/ai.exception");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierutil = require("../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _fromcreateroleinputtoflatroletocreateutil = require("../flat-role/utils/from-create-role-input-to-flat-role-to-create.util");
const _fromdeleteroleinputtoflatroleorthrowutil = require("../flat-role/utils/from-delete-role-input-to-flat-role-or-throw.util");
const _fromupdateroleinputtoflatroletoupdateorthrowutil = require("../flat-role/utils/from-update-role-input-to-flat-role-to-update-or-throw.util");
const _memberrolelabelconstants = require("../permissions/constants/member-role-label.constants");
const _permissionsexception = require("../permissions/permissions.exception");
const _roleentity = require("./role.entity");
const _fromFlatRoleToRoleDtoutil = require("./utils/fromFlatRoleToRoleDto.util");
const _userroleservice = require("../user-role/user-role.service");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let RoleService = class RoleService {
    async getWorkspaceRoles(workspaceId) {
        return this.roleRepository.find({
            where: {
                workspaceId
            },
            relations: {
                roleTargets: true,
                rolePermissionFlags: {
                    permissionFlag: true
                },
                objectPermissions: true,
                fieldPermissions: true
            }
        });
    }
    async getRoleById(id, workspaceId) {
        return this.roleRepository.findOne({
            where: {
                id,
                workspaceId
            },
            relations: {
                roleTargets: true,
                rolePermissionFlags: {
                    permissionFlag: true
                },
                objectPermissions: true,
                fieldPermissions: true
            }
        });
    }
    async getRoleByUniversalIdentifier({ universalIdentifier, workspaceId }) {
        const { flatRoleMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRoleMaps'
            ]
        });
        const flatRoleEntity = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatRoleMaps,
            universalIdentifier
        });
        return (0, _utils.isDefined)(flatRoleEntity) ? (0, _fromFlatRoleToRoleDtoutil.fromFlatRoleToRoleDto)(flatRoleEntity) : null;
    }
    async createRole({ input, workspaceId, ownerFlatApplication }) {
        const flatRoleToCreate = (0, _fromcreateroleinputtoflatroletocreateutil.fromCreateRoleInputToFlatRoleToCreate)({
            createRoleInput: input,
            workspaceId,
            flatApplication: ownerFlatApplication
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                role: {
                    flatEntityToCreate: [
                        flatRoleToCreate
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: ownerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while creating role');
        }
        const { flatRoleMaps: recomputedFlatRoleMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRoleMaps'
            ]
        });
        return (0, _fromFlatRoleToRoleDtoutil.fromFlatRoleToRoleDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: flatRoleToCreate.id,
            flatEntityMaps: recomputedFlatRoleMaps
        }));
    }
    async updateRole({ input, workspaceId, ownerFlatApplication }) {
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? (await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        })).workspaceCustomFlatApplication;
        const { flatRoleMaps: existingFlatRoleMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRoleMaps'
            ]
        });
        const flatRoleToUpdate = (0, _fromupdateroleinputtoflatroletoupdateorthrowutil.fromUpdateRoleInputToFlatRoleToUpdateOrThrow)({
            flatRoleMaps: existingFlatRoleMaps,
            updateRoleInput: input
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                role: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: [
                        flatRoleToUpdate
                    ]
                }
            },
            workspaceId,
            isSystemBuild: false,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while updating role');
        }
        const { flatRoleMaps: recomputedFlatRoleMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRoleMaps'
            ]
        });
        return (0, _fromFlatRoleToRoleDtoutil.fromFlatRoleToRoleDto)((0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: input.id,
            flatEntityMaps: recomputedFlatRoleMaps
        }));
    }
    async deleteRole({ roleId, workspaceId, ownerFlatApplication }) {
        const deletedRoles = await this.deleteManyRoles({
            ids: [
                roleId
            ],
            workspaceId,
            isSystemBuild: false,
            ownerFlatApplication
        });
        const [deletedRole] = deletedRoles;
        return deletedRole;
    }
    async deleteManyRoles({ ids, workspaceId, isSystemBuild = false, ownerFlatApplication }) {
        if (ids.length === 0) {
            return [];
        }
        const resolvedOwnerFlatApplication = ownerFlatApplication ?? (await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        })).workspaceCustomFlatApplication;
        const { flatRoleMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatRoleMaps'
            ]
        });
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: workspaceId
            }
        });
        const defaultRoleId = workspace?.defaultRoleId;
        if (!(0, _utils.isDefined)(defaultRoleId)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.DEFAULT_ROLE_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.DEFAULT_ROLE_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "6BBrjb",
                    message: "The default role for this workspace could not be found. Please contact support for assistance."
                }
            });
        }
        const rolesToDelete = [];
        for (const roleId of ids){
            const flatRoleToDelete = (0, _fromdeleteroleinputtoflatroleorthrowutil.fromDeleteRoleInputToFlatRoleOrThrow)({
                flatRoleMaps,
                roleId
            });
            if (defaultRoleId === roleId) {
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.DEFAULT_ROLE_CANNOT_BE_DELETED, _permissionsexception.PermissionsExceptionCode.DEFAULT_ROLE_CANNOT_BE_DELETED, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "nCXfEw",
                        message: "The default role cannot be deleted as it is required for the workspace to function properly."
                    }
                });
            }
            await this.rebindTargetsOfRoleToDeleteToDefaultRole({
                roleId,
                roleLabel: flatRoleToDelete.label,
                workspaceId,
                defaultRoleId
            });
            rolesToDelete.push(flatRoleToDelete);
        }
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                role: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: rolesToDelete,
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            isSystemBuild,
            applicationUniversalIdentifier: resolvedOwnerFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, `Multiple validation errors occurred while deleting role${ids.length > 1 ? 's' : ''}`);
        }
        return rolesToDelete.map(_fromFlatRoleToRoleDtoutil.fromFlatRoleToRoleDto);
    }
    async createMemberRole({ workspaceId, ownerFlatApplication }) {
        return this.createRole({
            input: {
                label: _memberrolelabelconstants.MEMBER_ROLE_LABEL,
                description: 'Member role',
                icon: 'IconUser',
                canUpdateAllSettings: false,
                canAccessAllTools: true,
                canReadAllObjectRecords: true,
                canUpdateAllObjectRecords: true,
                canSoftDeleteAllObjectRecords: true,
                canDestroyAllObjectRecords: true,
                canBeAssignedToUsers: true,
                canBeAssignedToAgents: false,
                canBeAssignedToApiKeys: false
            },
            ownerFlatApplication,
            workspaceId
        });
    }
    async createGuestRole({ workspaceId, ownerFlatApplication }) {
        return this.createRole({
            input: {
                label: 'Guest',
                description: 'Guest role',
                icon: 'IconUser',
                canUpdateAllSettings: false,
                canAccessAllTools: false,
                canReadAllObjectRecords: true,
                canUpdateAllObjectRecords: false,
                canSoftDeleteAllObjectRecords: false,
                canDestroyAllObjectRecords: false,
                canBeAssignedToUsers: true,
                canBeAssignedToAgents: false,
                canBeAssignedToApiKeys: false
            },
            workspaceId,
            ownerFlatApplication
        });
    }
    // TODO: Move to migration side effect / To address for rollback of role deletion
    async rebindTargetsOfRoleToDeleteToDefaultRole({ roleId, roleLabel, workspaceId, defaultRoleId }) {
        const userWorkspaceIds = await this.userRoleService.getUserWorkspaceIdsAssignedToRole(roleId, workspaceId);
        await this.userRoleService.assignRoleToManyUserWorkspace({
            userWorkspaceIds,
            roleId: defaultRoleId,
            workspaceId
        });
        const apiKeysToRebind = await this.apiKeyRoleService.getApiKeysAssignedToRole(roleId, workspaceId);
        for (const apiKey of apiKeysToRebind){
            try {
                await this.apiKeyRoleService.assignRoleToApiKey({
                    apiKeyId: apiKey.id,
                    roleId: defaultRoleId,
                    workspaceId
                });
            } catch (error) {
                if (error instanceof _apikeyexception.ApiKeyException && error.code === _apikeyexception.ApiKeyExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS) {
                    throw this.toRoleDeleteRebindException({
                        roleLabel,
                        targetKind: 'apiKey'
                    });
                }
                throw error;
            }
        }
        const agentsToRebind = await this.aiAgentRoleService.getAgentsAssignedToRole(roleId, workspaceId);
        for (const agent of agentsToRebind){
            try {
                await this.aiAgentRoleService.assignRoleToAgent({
                    agentId: agent.id,
                    roleId: defaultRoleId,
                    workspaceId
                });
            } catch (error) {
                if (error instanceof _aiexception.AiException && error.code === _aiexception.AiExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_AGENTS) {
                    throw this.toRoleDeleteRebindException({
                        roleLabel,
                        targetKind: 'agent'
                    });
                }
                throw error;
            }
        }
    }
    toRoleDeleteRebindException({ roleLabel, targetKind }) {
        const targetLabel = targetKind === 'apiKey' ? 'API key' : 'agent';
        return new _permissionsexception.PermissionsException(`Cannot delete role "${roleLabel}": the workspace default role cannot be assigned to ${targetLabel}s.`, targetKind === 'apiKey' ? _permissionsexception.PermissionsExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS : _permissionsexception.PermissionsExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_AGENTS, {
            userFriendlyMessage: targetKind === 'apiKey' ? /*i18n*/ {
                id: "mGasIh",
                message: "Cannot delete this role: it is still assigned to one or more API keys, and the workspace default role cannot be assigned to API keys. Please reassign these API keys to another role first."
            } : /*i18n*/ {
                id: "aqua7x",
                message: "Cannot delete this role: it is still assigned to one or more agents, and the workspace default role cannot be assigned to agents. Please reassign these agents to another role first."
            }
        });
    }
    constructor(workspaceMigrationValidateBuildAndRunService, flatEntityMapsCacheService, workspaceRepository, roleRepository, userRoleService, applicationService, apiKeyRoleService, aiAgentRoleService){
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.workspaceRepository = workspaceRepository;
        this.roleRepository = roleRepository;
        this.userRoleService = userRoleService;
        this.applicationService = applicationService;
        this.apiKeyRoleService = apiKeyRoleService;
        this.aiAgentRoleService = aiAgentRoleService;
    }
};
RoleService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _apikeyroleservice.ApiKeyRoleService === "undefined" ? Object : _apikeyroleservice.ApiKeyRoleService,
        typeof _aiagentroleservice.AiAgentRoleService === "undefined" ? Object : _aiagentroleservice.AiAgentRoleService
    ])
], RoleService);

//# sourceMappingURL=role.service.js.map