"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImpersonationService", {
    enumerable: true,
    get: function() {
        return ImpersonationService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _nodeenvironmentinterface = require("../../twenty-config/interfaces/node-environment.interface");
const _auditservice = require("../../audit/services/audit.service");
const _monitoring = require("../../audit/utils/events/workspace-event/monitoring/monitoring");
const _authexception = require("../../auth/auth.exception");
const _logintokenservice = require("../../auth/token/services/login-token.service");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _twofactorauthenticationvalidation = require("../../two-factor-authentication/two-factor-authentication.validation");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _workspacetype = require("../../workspace/types/workspace.type");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
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
let ImpersonationService = class ImpersonationService {
    async impersonate(toImpersonateUserId, workspaceId, impersonatorUserWorkspaceId) {
        const toImpersonateUserWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                userId: toImpersonateUserId,
                workspaceId
            },
            relations: [
                'user',
                'workspace'
            ]
        });
        const impersonatorUserWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                id: impersonatorUserWorkspaceId
            },
            relations: [
                'user',
                'workspace',
                'twoFactorAuthenticationMethods'
            ]
        });
        if (!(0, _utils.isDefined)(toImpersonateUserWorkspace) || !(0, _utils.isDefined)(impersonatorUserWorkspace)) {
            throw new _authexception.AuthException('User not found in workspace or impersonation not enabled', _authexception.AuthExceptionCode.USER_WORKSPACE_NOT_FOUND);
        }
        const isServerLevelImpersonation = toImpersonateUserWorkspace.workspace.id !== impersonatorUserWorkspace.workspace.id;
        const hasServerLevelImpersonatePermission = impersonatorUserWorkspace.user.canImpersonate === true && toImpersonateUserWorkspace.workspace.allowImpersonation === true;
        if (isServerLevelImpersonation) {
            if (!hasServerLevelImpersonatePermission) {
                throw new _authexception.AuthException('Impersonation not enabled for the impersonator user or the target workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
            }
            const isDevelopment = this.twentyConfigService.get('NODE_ENV') === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT;
            if (isDevelopment) {
                return this.generateImpersonationLoginToken(impersonatorUserWorkspace, toImpersonateUserWorkspace, 'server');
            }
            const has2FAEnabled = _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areDefined(impersonatorUserWorkspace.twoFactorAuthenticationMethods) && _twofactorauthenticationvalidation.twoFactorAuthenticationMethodsValidator.areVerified(impersonatorUserWorkspace.twoFactorAuthenticationMethods);
            if (!has2FAEnabled) {
                throw new _authexception.AuthException('Two-factor authentication is required for server-level impersonation. Please enable 2FA in your workspace settings before attempting to impersonate users.', _authexception.AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_PROVISION_REQUIRED);
            }
            return this.generateImpersonationLoginToken(impersonatorUserWorkspace, toImpersonateUserWorkspace, 'server');
        }
        const hasWorkspaceLevelImpersonatePermission = await this.permissionsService.userHasWorkspaceSettingPermission({
            userWorkspaceId: impersonatorUserWorkspace.id,
            setting: _constants.PermissionFlagType.IMPERSONATE,
            workspaceId: workspaceId
        });
        if (!hasWorkspaceLevelImpersonatePermission) {
            throw new _authexception.AuthException('Impersonation not enabled for this workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
        const targetHasAdminPrivileges = toImpersonateUserWorkspace.user.canImpersonate === true || toImpersonateUserWorkspace.user.canAccessFullAdminPanel === true;
        const impersonatorHasAdminPrivileges = impersonatorUserWorkspace.user.canImpersonate === true || impersonatorUserWorkspace.user.canAccessFullAdminPanel === true;
        if (targetHasAdminPrivileges && !impersonatorHasAdminPrivileges) {
            throw new _authexception.AuthException('Cannot impersonate a user with admin privileges. Only administrators can impersonate other administrators.', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
        return this.generateImpersonationLoginToken(impersonatorUserWorkspace, toImpersonateUserWorkspace, 'workspace');
    }
    async generateImpersonationLoginToken(impersonatorUserWorkspace, toImpersonateUserWorkspace, impersonationLevel) {
        const auditService = this.auditService.createContext({
            workspaceId: impersonatorUserWorkspace.workspace.id,
            userId: impersonatorUserWorkspace.userId
        });
        await auditService.insertWorkspaceEvent(_monitoring.MONITORING_EVENT, {
            eventName: `${impersonationLevel}.impersonation.attempt`,
            message: `Impersonation attempt: targetUserId=${toImpersonateUserWorkspace.user.id}, workspaceId=${toImpersonateUserWorkspace.workspace.id}, impersonatorUserId=${impersonatorUserWorkspace.user.id}`
        });
        try {
            await auditService.insertWorkspaceEvent(_monitoring.MONITORING_EVENT, {
                eventName: `${impersonationLevel}.impersonation.login_token_attempt`,
                message: `Impersonation token generation attempt for user ${toImpersonateUserWorkspace.user.id}`
            });
            const loginToken = await this.loginTokenService.generateLoginToken(toImpersonateUserWorkspace.user.email, toImpersonateUserWorkspace.workspace.id, _workspacetype.AuthProviderEnum.Impersonation, {
                impersonatorUserWorkspaceId: impersonatorUserWorkspace.id
            });
            await auditService.insertWorkspaceEvent(_monitoring.MONITORING_EVENT, {
                eventName: `${impersonationLevel}.impersonation.login_token_generated`,
                message: `Impersonation token generated successfully for user ${toImpersonateUserWorkspace.user.id}`
            });
            return {
                workspace: {
                    id: toImpersonateUserWorkspace.workspace.id,
                    workspaceUrls: this.workspaceDomainsService.getWorkspaceUrls(toImpersonateUserWorkspace.workspace)
                },
                loginToken
            };
        } catch  {
            await auditService.insertWorkspaceEvent(_monitoring.MONITORING_EVENT, {
                eventName: `${impersonationLevel}.impersonation.login_token_failed`,
                message: `Impersonation token generation failed for targetUserId=${toImpersonateUserWorkspace.user.id}`
            });
            throw new _authexception.AuthException('Impersonation failed', _authexception.AuthExceptionCode.INVALID_DATA);
        }
    }
    constructor(auditService, workspaceDomainsService, loginTokenService, twentyConfigService, userWorkspaceRepository, permissionsService){
        this.auditService = auditService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.loginTokenService = loginTokenService;
        this.twentyConfigService = twentyConfigService;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.permissionsService = permissionsService;
    }
};
ImpersonationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(4, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _auditservice.AuditService === "undefined" ? Object : _auditservice.AuditService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _logintokenservice.LoginTokenService === "undefined" ? Object : _logintokenservice.LoginTokenService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], ImpersonationService);

//# sourceMappingURL=impersonation.service.js.map