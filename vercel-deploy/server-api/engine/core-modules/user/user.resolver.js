"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserResolver", {
    enumerable: true,
    get: function() {
        return UserResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _typeorm = require("@nestjs/typeorm");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _graphqltypejson = require("graphql-type-json");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _supportinterface = require("../twenty-config/interfaces/support.interface");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _apikeyentity = require("../api-key/api-key.entity");
const _authexception = require("../auth/auth.exception");
const _availableworkspacesdto = require("../auth/dto/available-workspaces.dto");
const _onboardingstatusenum = require("../onboarding/enums/onboarding-status.enum");
const _onboardingservice = require("../onboarding/onboarding.service");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
const _twofactorauthenticationmethodpresenter = require("../two-factor-authentication/utils/two-factor-authentication-method.presenter");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _userworkspaceservice = require("../user-workspace/user-workspace.service");
const _deletedworkspacememberdto = require("./dtos/deleted-workspace-member.dto");
const _updateuseremailinput = require("./dtos/update-user-email.input");
const _updateworkspacemembersettingsinput = require("./dtos/update-workspace-member-settings.input");
const _workspacememberdto = require("./dtos/workspace-member.dto");
const _userservice = require("./services/user.service");
const _workspacemembertranspilerservice = require("./services/workspace-member-transpiler.service");
const _uservarsservice = require("./user-vars/services/user-vars.service");
const _userentity = require("./user.entity");
const _uservalidate = require("./user.validate");
const _assertworkspacememberupdatenoncustomfieldsutil = require("./utils/assert-workspace-member-update-non-custom-fields.util");
const _workspacetype = require("../workspace/types/workspace.type");
const _workspaceentity = require("../workspace/workspace.entity");
const _authapikeydecorator = require("../../decorators/auth/auth-api-key.decorator");
const _authproviderdecorator = require("../../decorators/auth/auth-provider.decorator");
const _authuserworkspaceiddecorator = require("../../decorators/auth/auth-user-workspace-id.decorator");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacememberiddecorator = require("../../decorators/auth/auth-workspace-member-id.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _custompermissionguard = require("../../guards/custom-permission.guard");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _permissionsservice = require("../../metadata-modules/permissions/permissions.service");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _fromUserWorkspacePermissionsToUserWorkspacePermissionsDto = require("../../metadata-modules/role/utils/fromUserWorkspacePermissionsToUserWorkspacePermissionsDto");
const _userroleservice = require("../../metadata-modules/user-role/user-role.service");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../twenty-orm/utils/build-system-auth-context.util");
const _accountstoreconnectkeyvaluetype = require("../../../modules/connected-account/types/accounts-to-reconnect-key-value.type");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const getHMACKey = (email, key)=>{
    if (!email || !key) return null;
    const hmac = _crypto.default.createHmac('sha256', key);
    return hmac.update(email).digest('hex');
};
let UserResolver = class UserResolver {
    async getUserWorkspacePermissions({ currentUserWorkspace, workspace }) {
        const workspaceIsPendingOrOngoingCreation = [
            _workspace.WorkspaceActivationStatus.PENDING_CREATION,
            _workspace.WorkspaceActivationStatus.ONGOING_CREATION
        ].includes(workspace.activationStatus);
        if (workspaceIsPendingOrOngoingCreation) {
            return this.permissionsService.getDefaultUserWorkspacePermissions();
        }
        return await this.permissionsService.getUserWorkspacePermissions({
            userWorkspaceId: currentUserWorkspace.id,
            workspaceId: workspace.id
        });
    }
    async currentUser({ id: userId }, workspace) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                userWorkspaces: {
                    twoFactorAuthenticationMethods: true
                }
            }
        });
        _uservalidate.userValidator.assertIsDefinedOrThrow(user, new _authexception.AuthException('UserEntity not found', _authexception.AuthExceptionCode.USER_NOT_FOUND));
        if (!workspace) {
            return user;
        }
        const currentUserWorkspace = user.userWorkspaces.find((userWorkspace)=>userWorkspace.workspaceId === workspace.id);
        if (!(0, _utils.isDefined)(currentUserWorkspace)) {
            throw new Error('Current user workspace not found');
        }
        const userWorkspacePermissions = (0, _fromUserWorkspacePermissionsToUserWorkspacePermissionsDto.fromUserWorkspacePermissionsToUserWorkspacePermissionsDto)(await this.getUserWorkspacePermissions({
            currentUserWorkspace,
            workspace
        }));
        const twoFactorAuthenticationMethodSummary = (0, _twofactorauthenticationmethodpresenter.buildTwoFactorAuthenticationMethodSummary)(currentUserWorkspace.twoFactorAuthenticationMethods);
        return {
            ...user,
            currentUserWorkspace: {
                ...currentUserWorkspace,
                ...userWorkspacePermissions,
                twoFactorAuthenticationMethodSummary
            },
            currentWorkspace: workspace
        };
    }
    async userVars(user, workspace) {
        if (!workspace) return {};
        const userVars = await this.userVarService.getAll({
            userId: user.id,
            workspaceId: workspace.id
        });
        const userVarAllowList = [
            _onboardingservice.OnboardingStepKeys.ONBOARDING_CONNECT_ACCOUNT_PENDING,
            _accountstoreconnectkeyvaluetype.AccountsToReconnectKeys.ACCOUNTS_TO_RECONNECT_INSUFFICIENT_PERMISSIONS,
            _accountstoreconnectkeyvaluetype.AccountsToReconnectKeys.ACCOUNTS_TO_RECONNECT_EMAIL_ALIASES
        ];
        const filteredMap = new Map([
            ...userVars
        ].filter(([key])=>userVarAllowList.includes(key)));
        return Object.fromEntries(filteredMap);
    }
    async workspaceMember(user, workspace) {
        if (!workspace) return null;
        const workspaceMemberEntity = await this.userService.loadWorkspaceMember(user, workspace);
        if (!(0, _utils.isDefined)(workspaceMemberEntity)) {
            return null;
        }
        const workspaceId = workspace.id;
        const userWorkspace = await this.userWorkspaceService.getUserWorkspaceForUserOrThrow({
            userId: workspaceMemberEntity.userId,
            workspaceId: workspace.id
        });
        const roleOfUserWorkspace = await this.userRoleService.getRolesByUserWorkspaces({
            userWorkspaceIds: [
                userWorkspace.id
            ],
            workspaceId
        });
        const userWorkspaceRoles = roleOfUserWorkspace.get(userWorkspace.id);
        if (!(0, _utils.isDefined)(userWorkspaceRoles)) {
            throw new Error('UserEntity workspace roles not found');
        }
        return this.workspaceMemberTranspiler.toWorkspaceMemberDto({
            workspaceMemberEntity,
            userWorkspace,
            userWorkspaceRoles
        });
    }
    async workspaceMembers(_user, workspace) {
        if (!workspace) return [];
        const workspaceMemberEntities = await this.userService.loadWorkspaceMembers(workspace, false);
        const userWorkspaces = await this.userWorkspaceRepository.find({
            where: {
                userId: (0, _typeorm1.In)(workspaceMemberEntities.map((entity)=>entity.userId)),
                workspaceId: workspace.id
            }
        });
        const userWorkspacesByUserIdMap = new Map(userWorkspaces.map((userWorkspace)=>[
                userWorkspace.userId,
                userWorkspace
            ]));
        const rolesByUserWorkspacesMap = await this.userRoleService.getRolesByUserWorkspaces({
            userWorkspaceIds: userWorkspaces.map((userWorkspace)=>userWorkspace.id),
            workspaceId: workspace.id
        });
        const toWorkspaceMemberDtoArgs = workspaceMemberEntities.map((workspaceMemberEntity)=>{
            const userWorkspace = userWorkspacesByUserIdMap.get(workspaceMemberEntity.userId);
            if (!(0, _utils.isDefined)(userWorkspace)) {
                throw new Error('UserEntity workspace not found');
            }
            const userWorkspaceRoles = rolesByUserWorkspacesMap.get(userWorkspace.id);
            if (!(0, _utils.isDefined)(userWorkspaceRoles)) {
                throw new Error('UserEntity workspace roles not found');
            }
            return {
                userWorkspace,
                userWorkspaceRoles,
                workspaceMemberEntity
            };
        });
        return this.workspaceMemberTranspiler.toWorkspaceMemberDtos(toWorkspaceMemberDtoArgs);
    }
    async deletedWorkspaceMembers(_user, workspace) {
        if (!workspace) return [];
        const workspaceMemberEntities = await this.userService.loadDeletedWorkspaceMembersOnly(workspace);
        return this.workspaceMemberTranspiler.toDeletedWorkspaceMemberDtos(workspaceMemberEntities, workspace.id);
    }
    hasPassword(user) {
        return (0, _utils.isDefined)(user.passwordHash);
    }
    supportUserHash(parent) {
        if (this.twentyConfigService.get('SUPPORT_DRIVER') !== _supportinterface.SupportDriver.FRONT) {
            return null;
        }
        const key = this.twentyConfigService.get('SUPPORT_FRONT_HMAC_KEY');
        return getHMACKey(parent.email, key);
    }
    async deleteUser({ id: userId }) {
        return this.userService.deleteUser(userId);
    }
    async deleteUserFromWorkspace(workspaceMemberIdToDelete, { id: userId }, userWorkspaceId, workspace, apiKey) {
        if (!workspace) {
            throw new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND);
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspace.id);
        const workspaceMemberToDelete = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.findOne({
                where: {
                    id: workspaceMemberIdToDelete
                }
            });
        }, authContext);
        if (!(0, _utils.isDefined)(workspaceMemberToDelete)) {
            throw new _common.BadRequestException('Workspace member to delete not found in workspace');
        }
        const workspaceMemberToDeleteIsAuthenticatedUser = workspaceMemberToDelete.userId === userId;
        const canDeleteUserFromWorkspace = workspaceMemberToDeleteIsAuthenticatedUser || await this.permissionsService.userHasWorkspaceSettingPermission({
            userWorkspaceId,
            workspaceId: workspace.id,
            setting: _constants.PermissionFlagType.WORKSPACE_MEMBERS,
            apiKeyId: apiKey?.id
        });
        if (!canDeleteUserFromWorkspace) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "P69VwK",
                    message: "You do not have permission to delete this user from the workspace. Please contact your workspace administrator for access."
                }
            });
        }
        return this.userService.deleteUserWorkspaceAndPotentiallyDeleteUser({
            userId: workspaceMemberToDelete.userId,
            workspaceId: workspace.id
        });
    }
    async updateWorkspaceMemberSettings(input, workspace, userWorkspaceId, apiKey, authenticatedWorkspaceMemberId, user) {
        let isUpdatingSelf = (0, _utils.isDefined)(authenticatedWorkspaceMemberId) && authenticatedWorkspaceMemberId === input.workspaceMemberId;
        // for signup
        if (!isUpdatingSelf && (0, _utils.isDefined)(user?.id) && !(0, _utils.isDefined)(apiKey)) {
            const targetWorkspaceMember = await this.userWorkspaceService.getWorkspaceMemberOrThrow({
                workspaceMemberId: input.workspaceMemberId,
                workspaceId: workspace.id
            });
            isUpdatingSelf = targetWorkspaceMember.userId === user.id;
        }
        const canUpdateWorkspaceMember = isUpdatingSelf || await this.permissionsService.userHasWorkspaceSettingPermission({
            userWorkspaceId,
            workspaceId: workspace.id,
            setting: _constants.PermissionFlagType.WORKSPACE_MEMBERS,
            apiKeyId: apiKey?.id
        });
        if (!canUpdateWorkspaceMember) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "ZCNAGE",
                    message: "You do not have permission to update this workspace member."
                }
            });
        }
        (0, _assertworkspacememberupdatenoncustomfieldsutil.assertWorkspaceMemberUpdateUsesNonCustomFieldsOnly)({
            update: input.update
        });
        const workspaceMemberRepository = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            }));
        const workspaceMember = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(()=>workspaceMemberRepository.findOne({
                where: {
                    id: input.workspaceMemberId
                }
            }));
        if (!(0, _utils.isDefined)(workspaceMember)) {
            throw new _common.BadRequestException('Workspace member not found');
        }
        const workspaceMemberUpdatePayload = {
            id: workspaceMember.id,
            ...input.update
        };
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(()=>workspaceMemberRepository.save(workspaceMemberUpdatePayload));
        await this.onboardingService.completeOnboardingProfileStepIfNameProvided({
            userId: workspaceMember.userId,
            workspaceId: workspace.id,
            firstName: workspaceMemberUpdatePayload.name?.firstName,
            lastName: workspaceMemberUpdatePayload.name?.lastName
        });
        const targetUserWorkspace = await this.userWorkspaceService.getUserWorkspaceForUserOrThrow({
            userId: workspaceMember.userId,
            workspaceId: workspace.id
        });
        if ((0, _utils.isDefined)(input.update.locale)) {
            await this.userWorkspaceService.updateUserWorkspaceLocaleForUserWorkspace({
                locale: input.update.locale,
                userWorkspaceId: targetUserWorkspace.id
            });
        }
        return true;
    }
    async onboardingStatus(user, workspace) {
        if (!workspace) return null;
        return this.onboardingService.getOnboardingStatus({
            user,
            workspaceId: workspace.id
        });
    }
    async currentWorkspace(workspace) {
        return workspace;
    }
    async workspaces(user) {
        return user.userWorkspaces;
    }
    async availableWorkspaces(user, authProvider) {
        return this.userWorkspaceService.setLoginTokenToAvailableWorkspacesWhenAuthProviderMatch(await this.userWorkspaceService.findAvailableWorkspacesByEmail(user.email), user, authProvider);
    }
    async updateUserEmail({ newEmail, verifyEmailRedirectPath }, user, workspace) {
        const editableFields = workspace.editableProfileFields || [];
        if (!editableFields.includes('email')) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
        }
        await this.userService.updateUserEmail({
            user,
            workspace,
            newEmail,
            verifyEmailRedirectPath
        });
        return true;
    }
    constructor(userRepository, userService, twentyConfigService, onboardingService, userVarService, userWorkspaceRepository, userRoleService, permissionsService, workspaceMemberTranspiler, userWorkspaceService, globalWorkspaceOrmManager){
        this.userRepository = userRepository;
        this.userService = userService;
        this.twentyConfigService = twentyConfigService;
        this.onboardingService = onboardingService;
        this.userVarService = userVarService;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.userRoleService = userRoleService;
        this.permissionsService = permissionsService;
        this.workspaceMemberTranspiler = workspaceMemberTranspiler;
        this.userWorkspaceService = userWorkspaceService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_userentity.UserEntity),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "currentUser", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_graphqltypejson.GraphQLJSONObject, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserEntity === "undefined" ? Object : _userentity.UserEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "userVars", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_workspacememberdto.WorkspaceMemberDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserEntity === "undefined" ? Object : _userentity.UserEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "workspaceMember", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _workspacememberdto.WorkspaceMemberDTO
        ], {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserEntity === "undefined" ? Object : _userentity.UserEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "workspaceMembers", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _deletedworkspacememberdto.DeletedWorkspaceMemberDTO
        ], {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserEntity === "undefined" ? Object : _userentity.UserEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "deletedWorkspaceMembers", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean, {
        name: 'hasPassword'
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserEntity === "undefined" ? Object : _userentity.UserEntity
    ]),
    _ts_metadata("design:returntype", Boolean)
], UserResolver.prototype, "hasPassword", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserEntity === "undefined" ? Object : _userentity.UserEntity
    ]),
    _ts_metadata("design:returntype", Object)
], UserResolver.prototype, "supportUserHash", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_userentity.UserEntity),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_userworkspaceentity.UserWorkspaceEntity),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _custompermissionguard.CustomPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('workspaceMemberIdToDelete')),
    _ts_param(1, (0, _authuserdecorator.AuthUser)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(3, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(4, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUserFromWorkspace", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _custompermissionguard.CustomPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_param(3, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_param(4, (0, _authworkspacememberiddecorator.AuthWorkspaceMemberId)()),
    _ts_param(5, (0, _authuserdecorator.AuthUser)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateworkspacemembersettingsinput.UpdateWorkspaceMemberSettingsInput === "undefined" ? Object : _updateworkspacemembersettingsinput.UpdateWorkspaceMemberSettingsInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String,
        typeof _apikeyentity.ApiKeyEntity === "undefined" ? Object : _apikeyentity.ApiKeyEntity,
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "updateWorkspaceMemberSettings", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_onboardingstatusenum.OnboardingStatus, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserEntity === "undefined" ? Object : _userentity.UserEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "onboardingStatus", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_workspaceentity.WorkspaceEntity, {
        nullable: true
    }),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "currentWorkspace", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _userworkspaceentity.UserWorkspaceEntity
        ], {
        nullable: false
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _userentity.UserEntity === "undefined" ? Object : _userentity.UserEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "workspaces", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_availableworkspacesdto.AvailableWorkspaces),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authproviderdecorator.AuthProvider)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspacetype.AuthProviderEnum === "undefined" ? Object : _workspacetype.AuthProviderEnum
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "availableWorkspaces", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.PROFILE_INFORMATION)),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authuserdecorator.AuthUser)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateuseremailinput.UpdateUserEmailInput === "undefined" ? Object : _updateuseremailinput.UpdateUserEmailInput,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUserEmail", null);
UserResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_userentity.UserEntity),
    (0, _common.UseFilters)(_permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter),
    _ts_param(0, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _onboardingservice.OnboardingService === "undefined" ? Object : _onboardingservice.OnboardingService,
        typeof _uservarsservice.UserVarsService === "undefined" ? Object : _uservarsservice.UserVarsService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService,
        typeof _workspacemembertranspilerservice.WorkspaceMemberTranspiler === "undefined" ? Object : _workspacemembertranspilerservice.WorkspaceMemberTranspiler,
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], UserResolver);

//# sourceMappingURL=user.resolver.js.map