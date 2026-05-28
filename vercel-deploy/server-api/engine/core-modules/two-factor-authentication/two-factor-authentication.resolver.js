"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwoFactorAuthenticationResolver", {
    enumerable: true,
    get: function() {
        return TwoFactorAuthenticationResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _utils = require("twenty-shared/utils");
const _injectworkspacescopedrepositorydecorator = require("../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _authexception = require("../auth/auth.exception");
const _authgraphqlapiexceptionfilter = require("../auth/filters/auth-graphql-api-exception.filter");
const _logintokenservice = require("../auth/token/services/login-token.service");
const _workspacedomainsservice = require("../domain/workspace-domains/services/workspace-domains.service");
const _userservice = require("../user/services/user.service");
const _workspaceentity = require("../workspace/workspace.entity");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _custompermissionguard = require("../../guards/custom-permission.guard");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _publicendpointguard = require("../../guards/public-endpoint.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _twofactorauthenticationservice = require("./two-factor-authentication.service");
const _deletetwofactorauthenticationmethodinput = require("./dto/delete-two-factor-authentication-method.input");
const _deletetwofactorauthenticationmethoddto = require("./dto/delete-two-factor-authentication-method.dto");
const _initiatetwofactorauthenticationprovisioninginput = require("./dto/initiate-two-factor-authentication-provisioning.input");
const _initiatetwofactorauthenticationprovisioningdto = require("./dto/initiate-two-factor-authentication-provisioning.dto");
const _verifytwofactorauthenticationmethodinput = require("./dto/verify-two-factor-authentication-method.input");
const _verifytwofactorauthenticationmethoddto = require("./dto/verify-two-factor-authentication-method.dto");
const _twofactorauthenticationmethodentity = require("./entities/two-factor-authentication-method.entity");
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
let TwoFactorAuthenticationResolver = class TwoFactorAuthenticationResolver {
    async initiateOTPProvisioning(initiateTwoFactorAuthenticationProvisioningInput, origin) {
        const { sub: userEmail, workspaceId: tokenWorkspaceId } = await this.loginTokenService.verifyLoginToken(initiateTwoFactorAuthenticationProvisioningInput.loginToken);
        const workspace = await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(origin);
        (0, _utils.assertIsDefinedOrThrow)(workspace, new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND));
        if (tokenWorkspaceId !== workspace.id) {
            throw new _authexception.AuthException('Token is not valid for this workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
        const user = await this.userService.findUserByEmailOrThrow(userEmail);
        const uri = await this.twoFactorAuthenticationService.initiateStrategyConfiguration(user.id, userEmail, workspace.id, workspace.displayName);
        if (!(0, _utils.isDefined)(uri)) {
            throw new _authexception.AuthException('OTP Auth URL missing', _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR);
        }
        return {
            uri
        };
    }
    async initiateOTPProvisioningForAuthenticatedUser(user, workspace) {
        const uri = await this.twoFactorAuthenticationService.initiateStrategyConfiguration(user.id, user.email, workspace.id, workspace.displayName);
        if (!(0, _utils.isDefined)(uri)) {
            throw new _authexception.AuthException('OTP Auth URL missing', _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR);
        }
        return {
            uri
        };
    }
    async deleteTwoFactorAuthenticationMethod(deleteTwoFactorAuthenticationMethodInput, workspace, user) {
        const twoFactorMethod = await this.twoFactorAuthenticationMethodRepository.findOne(workspace.id, {
            where: {
                id: deleteTwoFactorAuthenticationMethodInput.twoFactorAuthenticationMethodId
            },
            relations: [
                'userWorkspace'
            ]
        });
        if (!twoFactorMethod) {
            throw new _authexception.AuthException('Two-factor authentication method not found', _authexception.AuthExceptionCode.INVALID_INPUT);
        }
        if (twoFactorMethod.userWorkspace.userId !== user.id) {
            throw new _authexception.AuthException('You can only delete your own two-factor authentication methods', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
        await this.twoFactorAuthenticationMethodRepository.delete(workspace.id, {
            id: deleteTwoFactorAuthenticationMethodInput.twoFactorAuthenticationMethodId
        });
        return {
            success: true
        };
    }
    async verifyTwoFactorAuthenticationMethodForAuthenticatedUser(verifyTwoFactorAuthenticationMethodInput, workspace, user) {
        return await this.twoFactorAuthenticationService.verifyTwoFactorAuthenticationMethodForAuthenticatedUser(user.id, verifyTwoFactorAuthenticationMethodInput.otp, workspace.id);
    }
    constructor(twoFactorAuthenticationService, loginTokenService, userService, workspaceDomainsService, twoFactorAuthenticationMethodRepository){
        this.twoFactorAuthenticationService = twoFactorAuthenticationService;
        this.loginTokenService = loginTokenService;
        this.userService = userService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.twoFactorAuthenticationMethodRepository = twoFactorAuthenticationMethodRepository;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_initiatetwofactorauthenticationprovisioningdto.InitiateTwoFactorAuthenticationProvisioningDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _graphql.Args)('origin')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _initiatetwofactorauthenticationprovisioninginput.InitiateTwoFactorAuthenticationProvisioningInput === "undefined" ? Object : _initiatetwofactorauthenticationprovisioninginput.InitiateTwoFactorAuthenticationProvisioningInput,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], TwoFactorAuthenticationResolver.prototype, "initiateOTPProvisioning", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_initiatetwofactorauthenticationprovisioningdto.InitiateTwoFactorAuthenticationProvisioningDTO),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], TwoFactorAuthenticationResolver.prototype, "initiateOTPProvisioningForAuthenticatedUser", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_deletetwofactorauthenticationmethoddto.DeleteTwoFactorAuthenticationMethodDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, _custompermissionguard.CustomPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserdecorator.AuthUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deletetwofactorauthenticationmethodinput.DeleteTwoFactorAuthenticationMethodInput === "undefined" ? Object : _deletetwofactorauthenticationmethodinput.DeleteTwoFactorAuthenticationMethodInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser
    ]),
    _ts_metadata("design:returntype", Promise)
], TwoFactorAuthenticationResolver.prototype, "deleteTwoFactorAuthenticationMethod", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_verifytwofactorauthenticationmethoddto.VerifyTwoFactorAuthenticationMethodDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserdecorator.AuthUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput === "undefined" ? Object : _verifytwofactorauthenticationmethodinput.VerifyTwoFactorAuthenticationMethodInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser
    ]),
    _ts_metadata("design:returntype", Promise)
], TwoFactorAuthenticationResolver.prototype, "verifyTwoFactorAuthenticationMethodForAuthenticatedUser", null);
TwoFactorAuthenticationResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter),
    _ts_param(4, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twofactorauthenticationservice.TwoFactorAuthenticationService === "undefined" ? Object : _twofactorauthenticationservice.TwoFactorAuthenticationService,
        typeof _logintokenservice.LoginTokenService === "undefined" ? Object : _logintokenservice.LoginTokenService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], TwoFactorAuthenticationResolver);

//# sourceMappingURL=two-factor-authentication.resolver.js.map