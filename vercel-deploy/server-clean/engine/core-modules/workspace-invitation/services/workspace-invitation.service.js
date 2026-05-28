"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceInvitationService", {
    enumerable: true,
    get: function() {
        return WorkspaceInvitationService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _render = require("@react-email/render");
const _datefns = require("date-fns");
const _ms = /*#__PURE__*/ _interop_require_default(require("ms"));
const _twentyemails = require("twenty-emails");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _apptokenentity = require("../../app-token/app-token.entity");
const _authexception = require("../../auth/auth.exception");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _emailservice = require("../../email/email.service");
const _fileurlservice = require("../../file/file-url/file-url.service");
const _i18nservice = require("../../i18n/i18n.service");
const _onboardingservice = require("../../onboarding/onboarding.service");
const _throttlerservice = require("../../throttler/throttler.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _castapptokentoworkspaceinvitationutil = require("../utils/cast-app-token-to-workspace-invitation.util");
const _workspaceinvitationexception = require("../workspace-invitation.exception");
const _rolevalidationservice = require("../../../metadata-modules/role-validation/services/role-validation.service");
const _customexception = require("../../../../utils/custom-exception");
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
let WorkspaceInvitationService = class WorkspaceInvitationService {
    async validatePersonalInvitation({ workspacePersonalInviteToken, email }) {
        try {
            const appToken = await this.appTokenRepository.findOne({
                where: {
                    value: workspacePersonalInviteToken,
                    type: _apptokenentity.AppTokenType.InvitationToken
                },
                relations: {
                    workspace: true
                }
            });
            if (!appToken) {
                throw new Error('Invalid invitation token');
            }
            if (!appToken.context?.email || appToken.context?.email !== email) {
                throw new Error('Email does not match the invitation');
            }
            if (new Date(appToken.expiresAt) < new Date()) {
                throw new Error('Invitation expired');
            }
            return {
                isValid: true,
                workspace: appToken.workspace
            };
        } catch (err) {
            throw new _authexception.AuthException(err.message, _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION);
        }
    }
    async findInvitationsByEmail(email) {
        return await this.appTokenRepository.createQueryBuilder('appToken').innerJoinAndSelect('appToken.workspace', 'workspace').where('"appToken".type = :type', {
            type: _apptokenentity.AppTokenType.InvitationToken
        }).andWhere('"appToken".context->>\'email\' = :email', {
            email
        }).andWhere('appToken.deletedAt IS NULL').andWhere('appToken.expiresAt > :now', {
            now: new Date()
        }).getMany();
    }
    async getOneWorkspaceInvitation(workspaceId, email) {
        return await this.appTokenRepository.createQueryBuilder('appToken').where('"appToken"."workspaceId" = :workspaceId', {
            workspaceId
        }).andWhere('"appToken".type = :type', {
            type: _apptokenentity.AppTokenType.InvitationToken
        }).andWhere('"appToken".context->>\'email\' = :email', {
            email
        }).getOne();
    }
    async getAppTokenByInvitationToken(invitationToken) {
        const appToken = await this.appTokenRepository.findOne({
            where: {
                value: invitationToken,
                type: _apptokenentity.AppTokenType.InvitationToken
            },
            relations: {
                workspace: true
            }
        });
        if (!appToken) {
            throw new _workspaceinvitationexception.WorkspaceInvitationException('Invalid invitation token', _workspaceinvitationexception.WorkspaceInvitationExceptionCode.INVALID_INVITATION);
        }
        return appToken;
    }
    async loadWorkspaceInvitations(workspace) {
        const appTokens = await this.appTokenRepository.find({
            where: {
                workspaceId: workspace.id,
                type: _apptokenentity.AppTokenType.InvitationToken,
                deletedAt: (0, _typeorm1.IsNull)()
            },
            select: {
                value: false
            }
        });
        return appTokens.map(_castapptokentoworkspaceinvitationutil.castAppTokenToWorkspaceInvitationUtil);
    }
    async createWorkspaceInvitation(email, workspace, roleId) {
        const maybeWorkspaceInvitation = await this.getOneWorkspaceInvitation(workspace.id, email.toLowerCase());
        if (maybeWorkspaceInvitation) {
            throw new _workspaceinvitationexception.WorkspaceInvitationException(`${email} already invited`, _workspaceinvitationexception.WorkspaceInvitationExceptionCode.INVITATION_ALREADY_EXIST);
        }
        const isUserAlreadyInWorkspace = await this.userWorkspaceRepository.exists({
            where: {
                workspaceId: workspace.id,
                user: {
                    email
                }
            },
            relations: {
                user: true
            }
        });
        if (isUserAlreadyInWorkspace) {
            throw new _workspaceinvitationexception.WorkspaceInvitationException(`${email} is already in the workspace`, _workspaceinvitationexception.WorkspaceInvitationExceptionCode.USER_ALREADY_EXIST);
        }
        return this.generateInvitationToken(workspace.id, email, roleId);
    }
    async deleteWorkspaceInvitation(appTokenId, workspaceId) {
        const appToken = await this.appTokenRepository.findOne({
            where: {
                id: appTokenId,
                workspaceId,
                type: _apptokenentity.AppTokenType.InvitationToken
            }
        });
        if (!appToken) {
            return 'error';
        }
        await this.appTokenRepository.delete(appToken.id);
        return 'success';
    }
    async invalidateWorkspaceInvitation(workspaceId, email) {
        const appToken = await this.getOneWorkspaceInvitation(workspaceId, email);
        if (!(0, _utils.isDefined)(appToken)) {
            return;
        }
        await this.appTokenRepository.delete(appToken.id);
    }
    async resendWorkspaceInvitation(appTokenId, workspace, sender) {
        const appToken = await this.appTokenRepository.findOne({
            where: {
                id: appTokenId,
                workspaceId: workspace.id,
                type: _apptokenentity.AppTokenType.InvitationToken
            }
        });
        if (!appToken || !appToken.context?.email) {
            throw new _workspaceinvitationexception.WorkspaceInvitationException('Invalid appToken', _workspaceinvitationexception.WorkspaceInvitationExceptionCode.INVALID_INVITATION);
        }
        await this.appTokenRepository.delete(appToken.id);
        return this.sendInvitations([
            appToken.context.email
        ], workspace, sender, appToken.context.roleId);
    }
    async sendInvitations(emails, workspace, sender, roleId) {
        if (!workspace?.inviteHash) {
            return {
                success: false,
                errors: [
                    'Workspace invite hash not found'
                ],
                result: []
            };
        }
        if ((0, _utils.isDefined)(roleId)) {
            await this.roleValidationService.validateRoleAssignableToUsersOrThrow(roleId, workspace.id);
        }
        await this.throttleInvitationSending(workspace.id, emails);
        const invitationResults = await Promise.allSettled(emails.map(async (email)=>{
            const appToken = await this.createWorkspaceInvitation(email, workspace, roleId);
            if (!appToken.context?.email) {
                throw new _workspaceinvitationexception.WorkspaceInvitationException('Invalid email', _workspaceinvitationexception.WorkspaceInvitationExceptionCode.EMAIL_MISSING);
            }
            return {
                appToken,
                email: appToken.context.email
            };
        }));
        for (const invitation of invitationResults){
            if (invitation.status === 'fulfilled') {
                const link = this.workspaceDomainsService.buildWorkspaceURL({
                    workspace,
                    pathname: (0, _utils.getAppPath)(_types.AppPath.Invite, {
                        workspaceInviteHash: workspace?.inviteHash
                    }),
                    searchParams: {
                        inviteToken: invitation.value.appToken.value,
                        email: invitation.value.email
                    }
                });
                if (!(0, _utils.isDefined)(sender.userEmail)) {
                    throw new _workspaceinvitationexception.WorkspaceInvitationException('Sender email is missing', _workspaceinvitationexception.WorkspaceInvitationExceptionCode.EMAIL_MISSING);
                }
                const logo = (0, _utils.isDefined)(workspace.logoFileId) ? await this.fileUrlService.signFileByIdUrl({
                    fileId: workspace.logoFileId,
                    workspaceId: workspace.id,
                    fileFolder: _types.FileFolder.CorePicture
                }) : undefined;
                const emailData = {
                    link: link.toString(),
                    workspace: {
                        name: workspace.displayName,
                        logo
                    },
                    sender: {
                        email: sender.userEmail,
                        firstName: sender.name.firstName,
                        lastName: sender.name.lastName
                    },
                    serverUrl: this.twentyConfigService.get('SERVER_URL'),
                    locale: sender.locale
                };
                const emailTemplate = (0, _twentyemails.SendInviteLinkEmail)(emailData);
                const html = await (0, _render.render)(emailTemplate);
                const text = await (0, _render.render)(emailTemplate, {
                    plainText: true
                });
                const joinTeamMsg = /*i18n*/ {
                    id: "PviVyk",
                    message: "Join your team on Twenty"
                };
                const i18n = this.i18nService.getI18nInstance(sender.locale);
                const subject = i18n._(joinTeamMsg);
                await this.emailService.send({
                    from: `${sender.name.firstName} ${sender.name.lastName} (via Twenty) <${this.twentyConfigService.get('EMAIL_FROM_ADDRESS')}>`,
                    to: invitation.value.email,
                    subject,
                    text,
                    html
                });
            }
        }
        await this.onboardingService.setOnboardingInviteTeamPending({
            workspaceId: workspace.id,
            value: false
        });
        await this.onboardingService.setOnboardingBookOnboardingPending({
            workspaceId: workspace.id,
            value: true
        });
        const i18n = this.i18nService.getI18nInstance(sender.locale);
        const result = invitationResults.reduce((acc, invitation)=>{
            if (invitation.status === 'rejected') {
                const reason = invitation.reason;
                if (reason instanceof _customexception.CustomException && reason.userFriendlyMessage) {
                    acc.errors.push(i18n._(reason.userFriendlyMessage));
                } else {
                    acc.errors.push(reason?.message ?? 'Unknown error');
                }
            } else {
                acc.result.push((0, _castapptokentoworkspaceinvitationutil.castAppTokenToWorkspaceInvitationUtil)(invitation.value.appToken));
            }
            return acc;
        }, {
            errors: [],
            result: []
        });
        return {
            success: result.errors.length === 0,
            ...result
        };
    }
    async generateInvitationToken(workspaceId, email, roleId) {
        const expiresIn = this.twentyConfigService.get('INVITATION_TOKEN_EXPIRES_IN');
        if (!expiresIn) {
            throw new _authexception.AuthException('Expiration time for invitation token is not set', _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR);
        }
        const expiresAt = (0, _datefns.addMilliseconds)(new Date().getTime(), (0, _ms.default)(expiresIn));
        const invitationToken = this.appTokenRepository.create({
            workspaceId,
            expiresAt,
            type: _apptokenentity.AppTokenType.InvitationToken,
            value: _crypto.default.randomBytes(32).toString('hex'),
            context: {
                email,
                ...(0, _utils.isDefined)(roleId) ? {
                    roleId
                } : {}
            }
        });
        return this.appTokenRepository.save(invitationToken);
    }
    async throttleInvitationSending(workspaceId, emails) {
        try {
            //limit invitation sending for specific invite emails
            await Promise.all(emails.map(async (email)=>{
                await this.throttlerService.tokenBucketThrottleOrThrow(`invitation-resending-workspace:throttler:${email}`, 1, this.twentyConfigService.get('INVITATION_SENDING_BY_EMAIL_THROTTLE_LIMIT'), this.twentyConfigService.get('INVITATION_SENDING_BY_EMAIL_THROTTLE_TTL_IN_MS'));
            }));
            //limit invitation sending for a specific workspace
            await this.throttlerService.tokenBucketThrottleOrThrow(`invitation-resending-workspace:throttler:${workspaceId}`, emails.length, this.twentyConfigService.get('INVITATION_SENDING_BY_WORKSPACE_THROTTLE_LIMIT'), this.twentyConfigService.get('INVITATION_SENDING_BY_WORKSPACE_THROTTLE_TTL_IN_MS'));
        } catch  {
            throw new _workspaceinvitationexception.WorkspaceInvitationException('Workspace invitation sending rate limit exceeded.', _workspaceinvitationexception.WorkspaceInvitationExceptionCode.INVALID_INVITATION, {
                userFriendlyMessage: /*i18n*/ {
                    id: "mfqtz7",
                    message: "Too many workspace invitations sent. Please try again later."
                }
            });
        }
    }
    constructor(appTokenRepository, userWorkspaceRepository, roleValidationService, twentyConfigService, emailService, onboardingService, workspaceDomainsService, i18nService, throttlerService, fileUrlService){
        this.appTokenRepository = appTokenRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.roleValidationService = roleValidationService;
        this.twentyConfigService = twentyConfigService;
        this.emailService = emailService;
        this.onboardingService = onboardingService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.i18nService = i18nService;
        this.throttlerService = throttlerService;
        this.fileUrlService = fileUrlService;
    }
};
WorkspaceInvitationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_apptokenentity.AppTokenEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _rolevalidationservice.RoleValidationService === "undefined" ? Object : _rolevalidationservice.RoleValidationService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _emailservice.EmailService === "undefined" ? Object : _emailservice.EmailService,
        typeof _onboardingservice.OnboardingService === "undefined" ? Object : _onboardingservice.OnboardingService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService,
        typeof _throttlerservice.ThrottlerService === "undefined" ? Object : _throttlerservice.ThrottlerService,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService
    ])
], WorkspaceInvitationService);

//# sourceMappingURL=workspace-invitation.service.js.map