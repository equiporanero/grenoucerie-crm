"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserRoleService", {
    enumerable: true,
    get: function() {
        return UserRoleService;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _userworkspaceentity = require("../../core-modules/user-workspace/user-workspace.entity");
const _permissionsexception = require("../permissions/permissions.exception");
const _roletargetentity = require("../role-target/role-target.entity");
const _roletargetservice = require("../role-target/services/role-target.service");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../twenty-orm/utils/build-system-auth-context.util");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
const _standardroleconstant = require("../../workspace-manager/twenty-standard-application/constants/standard-role.constant");
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
let UserRoleService = class UserRoleService {
    async assignRoleToManyUserWorkspace({ workspaceId, userWorkspaceIds, roleId }) {
        if (userWorkspaceIds.length === 0) {
            return;
        }
        const userWorkspaceIdsToAssign = await this.validateAssignRoleInputsAndGetUserWorkspaceIdsToAssign({
            userWorkspaceIds,
            workspaceId,
            roleId
        });
        if (userWorkspaceIdsToAssign.length === 0) {
            return;
        }
        await this.roleTargetService.createMany({
            createRoleTargetInputs: userWorkspaceIdsToAssign.map((userWorkspaceId)=>({
                    roleId,
                    targetId: userWorkspaceId,
                    targetMetadataForeignKey: 'userWorkspaceId'
                })),
            workspaceId
        });
    }
    async getRoleIdForUserWorkspace({ workspaceId, userWorkspaceId }) {
        const { userWorkspaceRoleMap } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'userWorkspaceRoleMap'
        ]);
        const roleId = userWorkspaceRoleMap[userWorkspaceId];
        if (!(0, _utils.isDefined)(roleId)) {
            throw new _permissionsexception.PermissionsException(`User workspace ${userWorkspaceId} has no role assigned`, _permissionsexception.PermissionsExceptionCode.NO_ROLE_FOUND_FOR_USER_WORKSPACE);
        }
        return roleId;
    }
    async getRolesByUserWorkspaces({ userWorkspaceIds, workspaceId }) {
        if (!userWorkspaceIds.length) {
            return new Map();
        }
        const allRoleTargets = await this.roleTargetRepository.find({
            where: {
                userWorkspaceId: (0, _typeorm1.In)(userWorkspaceIds),
                workspaceId
            },
            relations: {
                role: {
                    rolePermissionFlags: {
                        permissionFlag: true
                    }
                }
            }
        });
        if (!allRoleTargets.length) {
            return new Map();
        }
        const rolesMap = new Map();
        for (const userWorkspaceId of userWorkspaceIds){
            const roleTargetsOfUserWorkspace = allRoleTargets.filter((roleTarget)=>roleTarget.userWorkspaceId === userWorkspaceId);
            const rolesOfUserWorkspace = roleTargetsOfUserWorkspace.map((roleTarget)=>roleTarget.role).filter(_utils.isDefined);
            rolesMap.set(userWorkspaceId, rolesOfUserWorkspace);
        }
        return rolesMap;
    }
    async getWorkspaceMembersAssignedToRole(roleId, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const userWorkspaceIdsWithRole = await this.getUserWorkspaceIdsAssignedToRole(roleId, workspaceId);
        const userIds = await this.userWorkspaceRepository.find({
            where: {
                id: (0, _typeorm1.In)(userWorkspaceIdsWithRole)
            }
        }).then((userWorkspaces)=>userWorkspaces.map((userWorkspace)=>userWorkspace.userId));
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            const workspaceMembers = await workspaceMemberRepository.find({
                where: {
                    userId: (0, _typeorm1.In)(userIds)
                }
            });
            return workspaceMembers;
        }, authContext);
    }
    async getUserWorkspaceIdsAssignedToRole(roleId, workspaceId) {
        const { userWorkspaceRoleMap } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'userWorkspaceRoleMap'
        ]);
        return Object.entries(userWorkspaceRoleMap).filter(([_, roleIdFromMap])=>roleIdFromMap === roleId).map(([userWorkspaceId])=>userWorkspaceId);
    }
    async validateUserWorkspaceIsNotUniqueAdminOrThrow({ userWorkspaceId, workspaceId }) {
        const roleOfUserWorkspace = await this.getRolesByUserWorkspaces({
            userWorkspaceIds: [
                userWorkspaceId
            ],
            workspaceId
        }).then((roles)=>roles.get(userWorkspaceId)?.[0]);
        if (!(0, _utils.isDefined)(roleOfUserWorkspace)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.NO_ROLE_FOUND_FOR_USER_WORKSPACE, _permissionsexception.PermissionsExceptionCode.NO_ROLE_FOUND_FOR_USER_WORKSPACE, {
                userFriendlyMessage: /*i18n*/ {
                    id: "XxkUFT",
                    message: "Your role in this workspace could not be found. Please contact your workspace administrator."
                }
            });
        }
        if ((0, _utils.isDefined)(roleOfUserWorkspace) && roleOfUserWorkspace.universalIdentifier === _standardroleconstant.STANDARD_ROLE.admin.universalIdentifier) {
            const adminRole = roleOfUserWorkspace;
            await this.validateMoreThanOneWorkspaceMemberHasAdminRoleOrThrow({
                adminRoleId: adminRole.id,
                workspaceId
            });
        }
    }
    async validateAssignRoleInputsAndGetUserWorkspaceIdsToAssign({ userWorkspaceIds, workspaceId, roleId }) {
        const userWorkspaces = await this.userWorkspaceRepository.find({
            where: {
                id: (0, _typeorm1.In)(userWorkspaceIds)
            }
        });
        const foundUserWorkspaceIds = new Set(userWorkspaces.map((userWorkspace)=>userWorkspace.id));
        const missingUserWorkspaceIds = userWorkspaceIds.filter((id)=>!foundUserWorkspaceIds.has(id));
        if (missingUserWorkspaceIds.length > 0) {
            throw new _permissionsexception.PermissionsException(`User workspaces not found: ${missingUserWorkspaceIds.join(', ')}`, _permissionsexception.PermissionsExceptionCode.USER_WORKSPACE_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "aPJopM",
                    message: "Some workspace memberships could not be found. They may no longer have access to this workspace."
                }
            });
        }
        const rolesByUserWorkspaces = await this.getRolesByUserWorkspaces({
            userWorkspaceIds,
            workspaceId
        });
        const userWorkspaceIdsToAssign = [];
        let adminRoleIdToValidate;
        for (const userWorkspaceId of userWorkspaceIds){
            const currentRole = rolesByUserWorkspaces.get(userWorkspaceId)?.[0];
            if (currentRole?.id === roleId) {
                continue;
            }
            if ((0, _utils.isDefined)(currentRole) && currentRole.universalIdentifier === _standardroleconstant.STANDARD_ROLE.admin.universalIdentifier) {
                adminRoleIdToValidate = currentRole.id;
            }
            userWorkspaceIdsToAssign.push(userWorkspaceId);
        }
        if ((0, _utils.isDefined)(adminRoleIdToValidate)) {
            await this.validateMoreThanOneWorkspaceMemberHasAdminRoleOrThrow({
                workspaceId,
                adminRoleId: adminRoleIdToValidate
            });
        }
        return userWorkspaceIdsToAssign;
    }
    async validateMoreThanOneWorkspaceMemberHasAdminRoleOrThrow({ adminRoleId, workspaceId }) {
        const workspaceMembersWithAdminRole = await this.getWorkspaceMembersAssignedToRole(adminRoleId, workspaceId);
        if (workspaceMembersWithAdminRole.length === 1) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.CANNOT_UNASSIGN_LAST_ADMIN, _permissionsexception.PermissionsExceptionCode.CANNOT_UNASSIGN_LAST_ADMIN, {
                userFriendlyMessage: /*i18n*/ {
                    id: "8wovNr",
                    message: "You cannot remove the admin role from the last administrator. Please assign another administrator first."
                }
            });
        }
    }
    constructor(roleTargetRepository, userWorkspaceRepository, globalWorkspaceOrmManager, roleTargetService, workspaceCacheService){
        this.roleTargetRepository = roleTargetRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.roleTargetService = roleTargetService;
        this.workspaceCacheService = workspaceCacheService;
    }
};
UserRoleService = _ts_decorate([
    _ts_param(0, (0, _typeorm.InjectRepository)(_roletargetentity.RoleTargetEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _roletargetservice.RoleTargetService === "undefined" ? Object : _roletargetservice.RoleTargetService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], UserRoleService);

//# sourceMappingURL=user-role.service.js.map