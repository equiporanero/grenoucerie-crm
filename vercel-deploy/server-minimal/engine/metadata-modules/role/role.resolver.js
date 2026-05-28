"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoleResolver", {
    enumerable: true,
    get: function() {
        return RoleResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _apikeyroleservice = require("../../core-modules/api-key/services/api-key-role.service");
const _applicationservice = require("../../core-modules/application/application.service");
const _preventnesttoautologgraphqlerrorsfilter = require("../../core-modules/graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../core-modules/graphql/pipes/resolver-validation.pipe");
const _userworkspaceservice = require("../../core-modules/user-workspace/user-workspace.service");
const _workspacememberdto = require("../../core-modules/user/dtos/workspace-member.dto");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authworkspacememberiddecorator = require("../../decorators/auth/auth-workspace-member-id.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _aiagentroleservice = require("../ai/ai-agent-role/ai-agent-role.service");
const _aiexception = require("../ai/ai.exception");
const _agentdto = require("../ai/ai-agent/dtos/agent.dto");
const _fromagententitytoagentdtoutil = require("../flat-agent/utils/from-agent-entity-to-agent-dto.util");
const _fieldpermissiondto = require("../object-permission/dtos/field-permission.dto");
const _objectpermissiondto = require("../object-permission/dtos/object-permission.dto");
const _workspacemanyorallflatentitymapscacheservice = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _upsertfieldpermissionsinput = require("../object-permission/dtos/upsert-field-permissions.input");
const _upsertobjectpermissionsinput = require("../object-permission/dtos/upsert-object-permissions.input");
const _fieldpermissionservice = require("../object-permission/field-permission/field-permission.service");
const _objectpermissionservice = require("../object-permission/object-permission.service");
const _fromflatfieldpermissiontofieldpermissiondtoutil = require("../object-permission/utils/from-flat-field-permission-to-field-permission-dto.util");
const _fromflatobjectpermissiontoobjectpermissiondtoutil = require("../object-permission/utils/from-flat-object-permission-to-object-permission-dto.util");
const _rolepermissionflagdto = require("../role-permission-flag/dtos/role-permission-flag.dto");
const _upsertpermissionflagsinput = require("../role-permission-flag/dtos/upsert-permission-flags.input");
const _rolepermissionflagservice = require("../role-permission-flag/role-permission-flag.service");
const _fromflatrolepermissionflagtorolepermissionflagdtoutil = require("../role-permission-flag/utils/from-flat-role-permission-flag-to-role-permission-flag-dto.util");
const _permissionsexception = require("../permissions/permissions.exception");
const _permissionsgraphqlapiexceptionfilter = require("../permissions/utils/permissions-graphql-api-exception.filter");
const _createroleinput = require("./dtos/create-role.input");
const _roledto = require("./dtos/role.dto");
const _updateroleinput = require("./dtos/update-role.input");
const _roleservice = require("./role.service");
const _fromRoleEntityToRoleDtoutil = require("./utils/fromRoleEntityToRoleDto.util");
const _upsertrowlevelpermissionpredicatesinput = require("../row-level-permission-predicate/dtos/inputs/upsert-row-level-permission-predicates.input");
const _rowlevelpermissionpredicategroupdto = require("../row-level-permission-predicate/dtos/row-level-permission-predicate-group.dto");
const _rowlevelpermissionpredicatedto = require("../row-level-permission-predicate/dtos/row-level-permission-predicate.dto");
const _upsertrowlevelpermissionpredicatesresultdto = require("../row-level-permission-predicate/dtos/upsert-row-level-permission-predicates-result.dto");
const _rowlevelpermissionpredicategraphqlapiexceptionfilter = require("../row-level-permission-predicate/filters/row-level-permission-predicate-graphql-api-exception.filter");
const _rowlevelpermissionpredicategroupservice = require("../row-level-permission-predicate/services/row-level-permission-predicate-group.service");
const _rowlevelpermissionpredicateservice = require("../row-level-permission-predicate/services/row-level-permission-predicate.service");
const _userroleservice = require("../user-role/user-role.service");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
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
let RoleResolver = class RoleResolver {
    async getRoles(workspace) {
        const roleEntities = await this.roleService.getWorkspaceRoles(workspace.id);
        return (0, _fromRoleEntityToRoleDtoutil.fromRoleEntitiesToRoleDtos)(roleEntities);
    }
    async updateWorkspaceMemberRole(workspace, workspaceMemberId, roleId, updatorWorkspaceMemberId) {
        if (updatorWorkspaceMemberId === workspaceMemberId) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.CANNOT_UPDATE_SELF_ROLE, _permissionsexception.PermissionsExceptionCode.CANNOT_UPDATE_SELF_ROLE, {
                userFriendlyMessage: /*i18n*/ {
                    id: "1SQnFB",
                    message: "You cannot change your own role. Please ask another administrator to update your role."
                }
            });
        }
        const workspaceMember = await this.userWorkspaceService.getWorkspaceMemberOrThrow({
            workspaceMemberId,
            workspaceId: workspace.id
        });
        const userWorkspace = await this.userWorkspaceService.getUserWorkspaceForUserOrThrow({
            userId: workspaceMember.userId,
            workspaceId: workspace.id
        });
        await this.userRoleService.assignRoleToManyUserWorkspace({
            userWorkspaceIds: [
                userWorkspace.id
            ],
            workspaceId: workspace.id,
            roleId
        });
        const roles = await this.userRoleService.getRolesByUserWorkspaces({
            userWorkspaceIds: [
                userWorkspace.id
            ],
            workspaceId: workspace.id
        }).then((rolesByUserWorkspaces)=>rolesByUserWorkspaces?.get(userWorkspace.id) ?? []);
        return {
            ...workspaceMember,
            userWorkspaceId: userWorkspace.id,
            roles
        };
    }
    async createOneRole(workspace, createRoleInput) {
        const { id: workspaceId } = workspace;
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        return await this.roleService.createRole({
            workspaceId,
            input: createRoleInput,
            ownerFlatApplication: workspaceCustomFlatApplication
        });
    }
    async updateOneRole(workspace, updateRoleInput) {
        const role = await this.roleService.updateRole({
            input: updateRoleInput,
            workspaceId: workspace.id
        });
        return role;
    }
    async deleteOneRole(workspace, roleId) {
        const deletedRole = await this.roleService.deleteRole({
            roleId,
            workspaceId: workspace.id
        });
        return deletedRole.id;
    }
    async upsertObjectPermissions(workspace, upsertObjectPermissionsInput) {
        const flatObjectPermissions = await this.objectPermissionService.upsertObjectPermissions({
            workspaceId: workspace.id,
            input: upsertObjectPermissionsInput
        });
        return flatObjectPermissions.map(_fromflatobjectpermissiontoobjectpermissiondtoutil.fromFlatObjectPermissionToObjectPermissionDto);
    }
    async upsertPermissionFlags(workspace, upsertPermissionFlagsInput) {
        const flatRolePermissionFlags = await this.rolePermissionFlagService.upsertPermissionFlags({
            workspaceId: workspace.id,
            input: upsertPermissionFlagsInput
        });
        const { flatPermissionFlagMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId: workspace.id,
            flatMapsKeys: [
                'flatPermissionFlagMaps'
            ]
        });
        return flatRolePermissionFlags.map((flatRolePermissionFlag)=>(0, _fromflatrolepermissionflagtorolepermissionflagdtoutil.fromFlatRolePermissionFlagToRolePermissionFlagDto)(flatRolePermissionFlag, flatPermissionFlagMaps));
    }
    async upsertFieldPermissions(workspace, upsertFieldPermissionsInput) {
        const flatFieldPermissions = await this.fieldPermissionService.upsertFieldPermissions({
            workspaceId: workspace.id,
            input: upsertFieldPermissionsInput
        });
        return flatFieldPermissions.map(_fromflatfieldpermissiontofieldpermissiondtoutil.fromFlatFieldPermissionToFieldPermissionDto);
    }
    async upsertRowLevelPermissionPredicates(workspace, input) {
        return this.rowLevelPermissionPredicateService.upsertRowLevelPermissionPredicates({
            workspaceId: workspace.id,
            input
        });
    }
    async assignRoleToAgent(agentId, roleId, { id: workspaceId }) {
        await this.agentRoleService.assignRoleToAgent({
            agentId,
            roleId,
            workspaceId
        });
        return true;
    }
    async removeRoleFromAgent(agentId, { id: workspaceId }) {
        await this.agentRoleService.removeRoleFromAgent({
            agentId,
            workspaceId
        });
        return true;
    }
    async getWorkspaceMembersAssignedToRole(role, workspace) {
        const workspaceMembers = await this.userRoleService.getWorkspaceMembersAssignedToRole(role.id, workspace.id);
        return workspaceMembers;
    }
    async getAgentsAssignedToRole(role, workspace) {
        const agents = await this.agentRoleService.getAgentsAssignedToRole(role.id, workspace.id);
        const { flatApplicationMaps } = await this.workspaceCacheService.getOrRecompute(workspace.id, [
            'flatApplicationMaps'
        ]);
        return agents.map((agentEntity)=>{
            const flatApplication = flatApplicationMaps.byId[agentEntity.applicationId];
            if (!(0, _utils.isDefined)(flatApplication)) {
                throw new _aiexception.AiException(`Application not found for agent ${agentEntity.id}`, _aiexception.AiExceptionCode.AGENT_NOT_FOUND);
            }
            return (0, _fromagententitytoagentdtoutil.fromFlatAgentWithRoleIdToAgentDto)({
                ...agentEntity,
                createdAt: agentEntity.createdAt.toISOString(),
                updatedAt: agentEntity.updatedAt.toISOString(),
                deletedAt: agentEntity.deletedAt?.toISOString() ?? null,
                universalIdentifier: agentEntity.universalIdentifier,
                applicationUniversalIdentifier: flatApplication.universalIdentifier,
                roleId: role.id
            });
        });
    }
    async getApiKeysAssignedToRole(role, workspace) {
        const apiKeys = await this.apiKeyRoleService.getApiKeysAssignedToRole(role.id, workspace.id);
        return apiKeys.map((apiKey)=>({
                id: apiKey.id,
                name: apiKey.name,
                expiresAt: apiKey.expiresAt,
                revokedAt: apiKey.revokedAt
            }));
    }
    async getRowLevelPermissionPredicatesForRole(role, workspace) {
        const allPredicates = await this.rowLevelPermissionPredicateService.findByWorkspaceId(workspace.id);
        return allPredicates.filter((predicate)=>predicate.roleId === role.id);
    }
    async getRowLevelPermissionPredicateGroupsForRole(role, workspace) {
        return this.rowLevelPermissionPredicateGroupService.findByRole(workspace.id, role.id);
    }
    constructor(userRoleService, roleService, userWorkspaceService, objectPermissionService, rolePermissionFlagService, agentRoleService, apiKeyRoleService, fieldPermissionService, applicationService, rowLevelPermissionPredicateService, rowLevelPermissionPredicateGroupService, workspaceCacheService, workspaceManyOrAllFlatEntityMapsCacheService){
        this.userRoleService = userRoleService;
        this.roleService = roleService;
        this.userWorkspaceService = userWorkspaceService;
        this.objectPermissionService = objectPermissionService;
        this.rolePermissionFlagService = rolePermissionFlagService;
        this.agentRoleService = agentRoleService;
        this.apiKeyRoleService = apiKeyRoleService;
        this.fieldPermissionService = fieldPermissionService;
        this.applicationService = applicationService;
        this.rowLevelPermissionPredicateService = rowLevelPermissionPredicateService;
        this.rowLevelPermissionPredicateGroupService = rowLevelPermissionPredicateGroupService;
        this.workspaceCacheService = workspaceCacheService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _roledto.RoleDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "getRoles", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workspacememberdto.WorkspaceMemberDTO),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('workspaceMemberId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(2, (0, _graphql.Args)('roleId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(3, (0, _authworkspacememberiddecorator.AuthWorkspaceMemberId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "updateWorkspaceMemberRole", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_roledto.RoleDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('createRoleInput')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _createroleinput.CreateRoleInput === "undefined" ? Object : _createroleinput.CreateRoleInput
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "createOneRole", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_roledto.RoleDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('updateRoleInput')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _updateroleinput.UpdateRoleInput === "undefined" ? Object : _updateroleinput.UpdateRoleInput
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "updateOneRole", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>String),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('roleId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "deleteOneRole", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _objectpermissiondto.ObjectPermissionDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('upsertObjectPermissionsInput')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _upsertobjectpermissionsinput.UpsertObjectPermissionsInput === "undefined" ? Object : _upsertobjectpermissionsinput.UpsertObjectPermissionsInput
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "upsertObjectPermissions", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _rolepermissionflagdto.RolePermissionFlagDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('upsertPermissionFlagsInput')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _upsertpermissionflagsinput.UpsertPermissionFlagsInput === "undefined" ? Object : _upsertpermissionflagsinput.UpsertPermissionFlagsInput
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "upsertPermissionFlags", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>[
            _fieldpermissiondto.FieldPermissionDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('upsertFieldPermissionsInput')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _upsertfieldpermissionsinput.UpsertFieldPermissionsInput === "undefined" ? Object : _upsertfieldpermissionsinput.UpsertFieldPermissionsInput
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "upsertFieldPermissions", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_upsertrowlevelpermissionpredicatesresultdto.UpsertRowLevelPermissionPredicatesResultDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _upsertrowlevelpermissionpredicatesinput.UpsertRowLevelPermissionPredicatesInput === "undefined" ? Object : _upsertrowlevelpermissionpredicatesinput.UpsertRowLevelPermissionPredicatesInput
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "upsertRowLevelPermissionPredicates", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('agentId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _graphql.Args)('roleId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "assignRoleToAgent", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('agentId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "removeRoleFromAgent", null);
_ts_decorate([
    (0, _graphql.ResolveField)('workspaceMembers', ()=>[
            _workspacememberdto.WorkspaceMemberDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _roledto.RoleDTO === "undefined" ? Object : _roledto.RoleDTO,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "getWorkspaceMembersAssignedToRole", null);
_ts_decorate([
    (0, _graphql.ResolveField)('agents', ()=>[
            _agentdto.AgentDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _roledto.RoleDTO === "undefined" ? Object : _roledto.RoleDTO,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "getAgentsAssignedToRole", null);
_ts_decorate([
    (0, _graphql.ResolveField)('apiKeys', ()=>[
            _roledto.ApiKeyForRoleDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _roledto.RoleDTO === "undefined" ? Object : _roledto.RoleDTO,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "getApiKeysAssignedToRole", null);
_ts_decorate([
    (0, _graphql.ResolveField)('rowLevelPermissionPredicates', ()=>[
            _rowlevelpermissionpredicatedto.RowLevelPermissionPredicateDTO
        ], {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _roledto.RoleDTO === "undefined" ? Object : _roledto.RoleDTO,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "getRowLevelPermissionPredicatesForRole", null);
_ts_decorate([
    (0, _graphql.ResolveField)('rowLevelPermissionPredicateGroups', ()=>[
            _rowlevelpermissionpredicategroupdto.RowLevelPermissionPredicateGroupDTO
        ], {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _roledto.RoleDTO === "undefined" ? Object : _roledto.RoleDTO,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], RoleResolver.prototype, "getRowLevelPermissionPredicateGroupsForRole", null);
RoleResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_roledto.RoleDTO),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.ROLES)),
    (0, _common.UseFilters)(_rowlevelpermissionpredicategraphqlapiexceptionfilter.RowLevelPermissionPredicateGraphqlApiExceptionFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _roleservice.RoleService === "undefined" ? Object : _roleservice.RoleService,
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _objectpermissionservice.ObjectPermissionService === "undefined" ? Object : _objectpermissionservice.ObjectPermissionService,
        typeof _rolepermissionflagservice.RolePermissionFlagService === "undefined" ? Object : _rolepermissionflagservice.RolePermissionFlagService,
        typeof _aiagentroleservice.AiAgentRoleService === "undefined" ? Object : _aiagentroleservice.AiAgentRoleService,
        typeof _apikeyroleservice.ApiKeyRoleService === "undefined" ? Object : _apikeyroleservice.ApiKeyRoleService,
        typeof _fieldpermissionservice.FieldPermissionService === "undefined" ? Object : _fieldpermissionservice.FieldPermissionService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _rowlevelpermissionpredicateservice.RowLevelPermissionPredicateService === "undefined" ? Object : _rowlevelpermissionpredicateservice.RowLevelPermissionPredicateService,
        typeof _rowlevelpermissionpredicategroupservice.RowLevelPermissionPredicateGroupService === "undefined" ? Object : _rowlevelpermissionpredicategroupservice.RowLevelPermissionPredicateGroupService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], RoleResolver);

//# sourceMappingURL=role.resolver.js.map