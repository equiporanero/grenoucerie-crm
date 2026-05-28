"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelUserLookupService", {
    enumerable: true,
    get: function() {
        return AdminPanelUserLookupService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _authexception = require("../../auth/auth.exception");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _featureflagentity = require("../../feature-flag/feature-flag.entity");
const _fileurlservice = require("../../file/file-url/file-url.service");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _userservice = require("../../user/services/user.service");
const _userentity = require("../../user/user.entity");
const _uservalidate = require("../../user/user.validate");
const _workspaceentity = require("../../workspace/workspace.entity");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
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
let AdminPanelUserLookupService = class AdminPanelUserLookupService {
    buildFallbackAvatarUrlsByUserId(workspaceUsers) {
        return new Map(workspaceUsers.filter((workspaceUser)=>(0, _utils.isDefined)(workspaceUser.user)).map((workspaceUser)=>[
                workspaceUser.user.id,
                workspaceUser.defaultAvatarUrl ?? null
            ]));
    }
    async userLookup(userIdentifier) {
        const isEmail = userIdentifier.includes('@');
        const normalizedIdentifier = isEmail ? userIdentifier.toLowerCase() : userIdentifier;
        const targetUser = await this.userRepository.findOne({
            where: isEmail ? {
                email: normalizedIdentifier
            } : {
                id: normalizedIdentifier
            },
            relations: {
                userWorkspaces: {
                    workspace: {
                        workspaceUsers: {
                            user: true
                        },
                        featureFlags: true
                    }
                }
            }
        });
        _uservalidate.userValidator.assertIsDefinedOrThrow(targetUser, new _authexception.AuthException('User not found', _authexception.AuthExceptionCode.INVALID_INPUT, {
            userFriendlyMessage: /*i18n*/ {
                id: "g5Z6no",
                message: "User not found. Please check the email or ID."
            }
        }));
        const allFeatureFlagKeys = Object.values(_types.FeatureFlagKey);
        const workspaces = await Promise.all(targetUser.userWorkspaces.map(async (userWorkspace)=>{
            const workspaceUsers = userWorkspace.workspace.workspaceUsers.filter((workspaceUser)=>(0, _utils.isDefined)(workspaceUser.user));
            const avatarUrlsByUserId = await this.userService.loadSignedAvatarUrlsByUserId({
                workspace: userWorkspace.workspace,
                fallbackAvatarUrlsByUserId: this.buildFallbackAvatarUrlsByUserId(workspaceUsers)
            });
            return {
                id: userWorkspace.workspace.id,
                name: userWorkspace.workspace.displayName ?? '',
                totalUsers: workspaceUsers.length,
                activationStatus: userWorkspace.workspace.activationStatus,
                createdAt: userWorkspace.workspace.createdAt,
                logo: await this.fileUrlService.signWorkspaceLogoUrl(userWorkspace.workspace) ?? undefined,
                allowImpersonation: userWorkspace.workspace.allowImpersonation,
                workspaceUrls: this.workspaceDomainsService.getWorkspaceUrls({
                    subdomain: userWorkspace.workspace.subdomain,
                    customDomain: userWorkspace.workspace.customDomain,
                    isCustomDomainEnabled: userWorkspace.workspace.isCustomDomainEnabled
                }),
                users: workspaceUsers.map((workspaceUser)=>({
                        id: workspaceUser.user.id,
                        email: workspaceUser.user.email,
                        firstName: workspaceUser.user.firstName,
                        lastName: workspaceUser.user.lastName,
                        avatarUrl: avatarUrlsByUserId.get(workspaceUser.user.id) ?? null,
                        createdAt: workspaceUser.user.createdAt
                    })),
                featureFlags: allFeatureFlagKeys.map((key)=>({
                        key,
                        value: userWorkspace.workspace.featureFlags?.find((flag)=>flag.key === key)?.value ?? false
                    }))
            };
        }));
        return {
            user: {
                id: targetUser.id,
                email: targetUser.email,
                firstName: targetUser.firstName,
                lastName: targetUser.lastName,
                createdAt: targetUser.createdAt
            },
            workspaces
        };
    }
    async workspaceLookup(workspaceId) {
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id: workspaceId
            }
        });
        if (!workspace) {
            throw new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.INVALID_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "mMbNCo",
                    message: "Workspace not found. Please check the ID."
                }
            });
        }
        const [workspaceUsers, featureFlags] = await Promise.all([
            this.userWorkspaceRepository.find({
                where: {
                    workspaceId
                },
                relations: {
                    user: true
                }
            }),
            this.featureFlagRepository.find(workspaceId)
        ]);
        const allFeatureFlagKeys = Object.values(_types.FeatureFlagKey);
        const definedWorkspaceUsers = workspaceUsers.filter((wu)=>(0, _utils.isDefined)(wu.user));
        const avatarUrlsByUserId = await this.userService.loadSignedAvatarUrlsByUserId({
            workspace,
            fallbackAvatarUrlsByUserId: this.buildFallbackAvatarUrlsByUserId(definedWorkspaceUsers)
        });
        const workspaceInfo = {
            id: workspace.id,
            name: workspace.displayName ?? '',
            totalUsers: workspaceUsers.length,
            activationStatus: workspace.activationStatus,
            createdAt: workspace.createdAt,
            logo: await this.fileUrlService.signWorkspaceLogoUrl(workspace) ?? undefined,
            allowImpersonation: workspace.allowImpersonation,
            workspaceUrls: this.workspaceDomainsService.getWorkspaceUrls({
                subdomain: workspace.subdomain,
                customDomain: workspace.customDomain,
                isCustomDomainEnabled: workspace.isCustomDomainEnabled
            }),
            users: definedWorkspaceUsers.map((wu)=>({
                    id: wu.user.id,
                    email: wu.user.email,
                    firstName: wu.user.firstName,
                    lastName: wu.user.lastName,
                    avatarUrl: avatarUrlsByUserId.get(wu.user.id) ?? null,
                    createdAt: wu.user.createdAt
                })),
            featureFlags: allFeatureFlagKeys.map((key)=>({
                    key,
                    value: featureFlags.find((flag)=>flag.key === key)?.value ?? false
                }))
        };
        const firstUser = workspaceUsers.find((wu)=>(0, _utils.isDefined)(wu.user))?.user;
        return {
            user: (0, _utils.isDefined)(firstUser) ? {
                id: firstUser.id,
                email: firstUser.email,
                firstName: firstUser.firstName,
                lastName: firstUser.lastName,
                avatarUrl: avatarUrlsByUserId.get(firstUser.id) ?? null,
                createdAt: firstUser.createdAt
            } : null,
            workspaces: [
                workspaceInfo
            ]
        };
    }
    constructor(workspaceDomainsService, fileUrlService, userService, userRepository, workspaceRepository, userWorkspaceRepository, featureFlagRepository){
        this.workspaceDomainsService = workspaceDomainsService;
        this.fileUrlService = fileUrlService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.featureFlagRepository = featureFlagRepository;
    }
};
AdminPanelUserLookupService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(6, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_featureflagentity.FeatureFlagEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], AdminPanelUserLookupService);

//# sourceMappingURL=admin-panel-user-lookup.service.js.map