"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserWorkspaceService", {
    enumerable: true,
    get: function() {
        return UserWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _translations = require("twenty-shared/translations");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _coreentitycacheservice = require("../../core-entity-cache/services/core-entity-cache.service");
const _filestorageexception = require("../file-storage/interfaces/file-storage-exception");
const _approvedaccessdomainservice = require("../approved-access-domain/services/approved-access-domain.service");
const _authexception = require("../auth/auth.exception");
const _logintokenservice = require("../auth/token/services/login-token.service");
const _workspacedomainsservice = require("../domain/workspace-domains/services/workspace-domains.service");
const _filecorepictureservice = require("../file/file-core-picture/services/file-core-picture.service");
const _fileurlservice = require("../file/file-url/file-url.service");
const _extractfileidfromurlutil = require("../file/files-field/utils/extract-file-id-from-url.util");
const _onboardingservice = require("../onboarding/onboarding.service");
const _userworkspaceentity = require("./user-workspace.entity");
const _userentity = require("../user/user.entity");
const _workspaceinvitationservice = require("../workspace-invitation/services/workspace-invitation.service");
const _workspacetype = require("../workspace/types/workspace.type");
const _workspacevalidate = require("../workspace/workspace.validate");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _roletargetentity = require("../../metadata-modules/role-target/role-target.entity");
const _rolevalidationservice = require("../../metadata-modules/role-validation/services/role-validation.service");
const _userroleservice = require("../../metadata-modules/user-role/user-role.service");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../twenty-orm/utils/build-system-auth-context.util");
const _assert = require("../../../utils/assert");
const _getdomainnamebyemail = require("../../../utils/get-domain-name-by-email");
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
let UserWorkspaceService = class UserWorkspaceService extends _nestjsquerytypeorm.TypeOrmQueryService {
    async updateUserWorkspaceLocaleForUserWorkspace({ locale, userWorkspaceId }) {
        const userWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                id: userWorkspaceId
            }
        });
        if (!(0, _utils.isDefined)(userWorkspace)) {
            return;
        }
        userWorkspace.locale = locale;
        await this.userWorkspaceRepository.save(userWorkspace);
        await this.coreEntityCacheService.invalidate('userWorkspaceEntity', userWorkspaceId);
    }
    async create({ userId, workspaceId, isExistingUser, pictureUrl, applicationUniversalIdentifier }, queryRunner) {
        const defaultAvatarUrl = await this.computeDefaultAvatarUrl(userId, workspaceId, isExistingUser, pictureUrl, applicationUniversalIdentifier, queryRunner);
        const userWorkspace = this.userWorkspaceRepository.create({
            userId,
            workspaceId,
            defaultAvatarUrl
        });
        return queryRunner ? queryRunner.manager.save(_userworkspaceentity.UserWorkspaceEntity, userWorkspace) : this.userWorkspaceRepository.save(userWorkspace);
    }
    async createWorkspaceMember(workspaceId, user) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            const userWorkspace = await this.userWorkspaceRepository.findOneOrFail({
                where: {
                    userId: user.id,
                    workspaceId
                }
            });
            await workspaceMemberRepository.insert({
                name: {
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                colorScheme: 'System',
                userId: user.id,
                userEmail: user.email,
                avatarUrl: userWorkspace.defaultAvatarUrl ?? null,
                locale: user.locale ?? _translations.SOURCE_LOCALE
            });
            const workspaceMember = await workspaceMemberRepository.find({
                where: {
                    userId: user.id
                }
            });
            (0, _assert.assert)(workspaceMember?.length === 1, `Error while creating workspace member ${user.email} on workspace ${workspaceId}`);
        }, authContext);
    }
    async addUserToWorkspaceIfUserNotInWorkspace(user, workspace, roleId) {
        const existingUserWorkspace = await this.checkUserWorkspaceExists(user.id, workspace.id);
        if (existingUserWorkspace) {
            return;
        }
        const resolvedRoleId = await this.resolveRoleIdForNewMember(roleId, workspace);
        const userWorkspace = await this.create({
            userId: user.id,
            workspaceId: workspace.id,
            isExistingUser: true
        });
        await this.createWorkspaceMember(workspace.id, user);
        await this.userRoleService.assignRoleToManyUserWorkspace({
            workspaceId: workspace.id,
            userWorkspaceIds: [
                userWorkspace.id
            ],
            roleId: resolvedRoleId
        });
        await this.workspaceInvitationService.invalidateWorkspaceInvitation(workspace.id, user.email);
        await this.onboardingService.setOnboardingCreateProfilePending({
            userId: user.id,
            workspaceId: workspace.id,
            value: true
        });
    }
    async resolveRoleIdForNewMember(roleId, workspace) {
        if ((0, _utils.isDefined)(roleId)) {
            await this.roleValidationService.validateRoleAssignableToUsersOrThrow(roleId, workspace.id);
            return roleId;
        }
        const defaultRoleId = workspace.defaultRoleId;
        if (!(0, _utils.isDefined)(defaultRoleId)) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.DEFAULT_ROLE_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.DEFAULT_ROLE_NOT_FOUND);
        }
        return defaultRoleId;
    }
    async getUserCount(workspaceId) {
        return await this.userWorkspaceRepository.countBy({
            workspaceId
        });
    }
    async checkUserWorkspaceExists(userId, workspaceId) {
        return this.userWorkspaceRepository.findOneBy({
            userId,
            workspaceId
        });
    }
    async checkUserWorkspaceExistsByEmail(email, workspaceId) {
        return this.userWorkspaceRepository.exists({
            where: {
                workspaceId,
                user: {
                    email
                }
            },
            relations: {
                user: true
            }
        });
    }
    async findFirstWorkspaceByUserId(userId) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                userWorkspaces: {
                    workspace: true
                }
            },
            order: {
                userWorkspaces: {
                    workspace: {
                        createdAt: 'ASC'
                    }
                }
            }
        });
        const workspace = user?.userWorkspaces?.[0]?.workspace;
        (0, _utils.assertIsDefinedOrThrow)(workspace, new _authexception.AuthException('Workspace not found', _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND));
        return workspace;
    }
    async countUserWorkspaces(userId) {
        return await this.userWorkspaceRepository.count({
            where: {
                userId
            }
        });
    }
    async deleteUserWorkspace({ userWorkspaceId, softDelete = false }) {
        if (softDelete) {
            await this.roleTargetRepository.softRemove({
                userWorkspaceId
            });
            await this.userWorkspaceRepository.softDelete({
                id: userWorkspaceId
            });
        } else {
            await this.roleTargetRepository.delete({
                userWorkspaceId
            }); // TODO remove once userWorkspace foreign key is added on roleTarget
            await this.userWorkspaceRepository.delete({
                id: userWorkspaceId
            });
        }
    }
    async findAvailableWorkspacesByEmail(email) {
        const user = await this.userRepository.findOne({
            where: {
                email
            },
            relations: {
                userWorkspaces: {
                    workspace: {
                        workspaceSSOIdentityProviders: true,
                        approvedAccessDomains: true
                    }
                }
            }
        });
        const alreadyMemberWorkspaces = user ? user.userWorkspaces.map(({ workspace })=>({
                workspace
            })) : [];
        const alreadyMemberWorkspacesIds = alreadyMemberWorkspaces.map(({ workspace })=>workspace.id);
        const workspacesFromApprovedAccessDomain = (await this.approvedAccessDomainService.findValidatedApprovedAccessDomainWithWorkspacesAndSSOIdentityProvidersDomain((0, _getdomainnamebyemail.getDomainNameByEmail)(email))).filter(({ workspace })=>!alreadyMemberWorkspacesIds.includes(workspace.id)).map(({ workspace })=>({
                workspace
            }));
        const workspacesFromApprovedAccessDomainIds = workspacesFromApprovedAccessDomain.map(({ workspace })=>workspace.id);
        const workspacesFromInvitations = (await this.workspaceInvitationService.findInvitationsByEmail(email)).filter(({ workspace })=>![
                ...alreadyMemberWorkspacesIds,
                ...workspacesFromApprovedAccessDomainIds
            ].includes(workspace.id)).map((appToken)=>({
                workspace: appToken.workspace,
                appToken
            }));
        return {
            availableWorkspacesForSignIn: alreadyMemberWorkspaces,
            availableWorkspacesForSignUp: [
                ...workspacesFromApprovedAccessDomain,
                ...workspacesFromInvitations
            ]
        };
    }
    async getUserWorkspaceForUserOrThrow({ userId, workspaceId, relations = [
        'twoFactorAuthenticationMethods'
    ] }) {
        const userWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                userId,
                workspaceId
            },
            relations
        });
        if (!(0, _utils.isDefined)(userWorkspace)) {
            throw new Error('User workspace not found');
        }
        return userWorkspace;
    }
    async getWorkspaceMemberOrThrow({ workspaceMemberId, workspaceId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            const workspaceMember = await workspaceMemberRepository.findOne({
                where: {
                    id: workspaceMemberId
                }
            });
            if (!(0, _utils.isDefined)(workspaceMember)) {
                throw new Error('Workspace member not found');
            }
            return workspaceMember;
        }, authContext);
    }
    async computeDefaultAvatarUrl(userId, workspaceId, isExistingUser, pictureUrl, applicationUniversalIdentifier, queryRunner) {
        return this.computeDefaultAvatarUrlMigrated(userId, workspaceId, isExistingUser, pictureUrl, applicationUniversalIdentifier, queryRunner);
    }
    async computeDefaultAvatarUrlMigrated(userId, workspaceId, isExistingUser, pictureUrl, applicationUniversalIdentifier, queryRunner) {
        if (isExistingUser) {
            const userWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    userId,
                    defaultAvatarUrl: (0, _typeorm1.Not)((0, _typeorm1.IsNull)())
                },
                order: {
                    createdAt: 'ASC'
                }
            });
            if (!(0, _utils.isDefined)(userWorkspace?.defaultAvatarUrl)) return;
            const sourceFileId = (0, _extractfileidfromurlutil.extractFileIdFromUrl)(userWorkspace.defaultAvatarUrl, _types.FileFolder.CorePicture);
            if (!(0, _utils.isDefined)(sourceFileId)) return;
            try {
                const savedFile = await this.fileCorePictureService.copyWorkspaceMemberProfilePicture({
                    sourceWorkspaceId: userWorkspace.workspaceId,
                    sourceFileId,
                    targetWorkspaceId: workspaceId,
                    targetApplicationUniversalIdentifier: applicationUniversalIdentifier,
                    queryRunner
                });
                return this.fileUrlService.getLegacyWorkspaceMemberAvatarUrl({
                    fileId: savedFile.id,
                    fileFolder: _types.FileFolder.CorePicture
                });
            } catch (error) {
                if (error.code === _filestorageexception.FileStorageExceptionCode.FILE_NOT_FOUND) {
                    return;
                }
                throw error;
            }
        }
        if (!(0, _utils.isDefined)(pictureUrl) || pictureUrl === '') return;
        const savedFile = await this.fileCorePictureService.uploadWorkspaceMemberProfilePictureFromUrl({
            imageUrl: pictureUrl,
            workspaceId,
            applicationUniversalIdentifier,
            queryRunner
        });
        if (!(0, _utils.isDefined)(savedFile)) {
            return;
        }
        return this.fileUrlService.getLegacyWorkspaceMemberAvatarUrl({
            fileId: savedFile.id,
            fileFolder: _types.FileFolder.CorePicture
        });
    }
    async castWorkspaceToAvailableWorkspace(workspace) {
        return {
            id: workspace.id,
            displayName: workspace.displayName,
            workspaceUrls: this.workspaceDomainsService.getWorkspaceUrls(workspace),
            logo: (0, _utils.isDefined)(workspace.logoFileId) ? await this.fileUrlService.signFileByIdUrl({
                fileId: workspace.logoFileId,
                workspaceId: workspace.id,
                fileFolder: _types.FileFolder.CorePicture
            }) : '',
            sso: workspace.workspaceSSOIdentityProviders?.reduce((acc, identityProvider)=>acc.concat(identityProvider.status === 'Inactive' ? [] : [
                    {
                        id: identityProvider.id,
                        name: identityProvider.name,
                        issuer: identityProvider.issuer,
                        type: identityProvider.type,
                        status: identityProvider.status
                    }
                ]), []) ?? []
        };
    }
    async setLoginTokenToAvailableWorkspacesWhenAuthProviderMatch(availableWorkspaces, user, authProvider) {
        const [availableWorkspacesForSignUp, availableWorkspacesForSignIn] = await Promise.all([
            Promise.all(availableWorkspaces.availableWorkspacesForSignUp.map(async ({ workspace, appToken })=>{
                return {
                    ...await this.castWorkspaceToAvailableWorkspace(workspace),
                    ...appToken ? {
                        personalInviteToken: appToken.value
                    } : {}
                };
            })),
            Promise.all(availableWorkspaces.availableWorkspacesForSignIn.map(async ({ workspace })=>{
                return {
                    ...await this.castWorkspaceToAvailableWorkspace(workspace),
                    loginToken: _workspacevalidate.workspaceValidator.isAuthEnabled(authProvider, workspace) ? (await this.loginTokenService.generateLoginToken(user.email, workspace.id, _workspacetype.AuthProviderEnum.Password)).token : undefined
                };
            }))
        ]);
        return {
            availableWorkspacesForSignUp,
            availableWorkspacesForSignIn
        };
    }
    async getActiveUserWorkspaceCountTotal() {
        const count = await this.userWorkspaceRepository.count({
            where: {
                deletedAt: (0, _typeorm1.IsNull)()
            }
        });
        return Math.max(1, count);
    }
    constructor(userWorkspaceRepository, userRepository, roleTargetRepository, roleValidationService, workspaceInvitationService, workspaceDomainsService, loginTokenService, approvedAccessDomainService, globalWorkspaceOrmManager, userRoleService, fileCorePictureService, fileUrlService, onboardingService, coreEntityCacheService){
        super(userWorkspaceRepository), this.userWorkspaceRepository = userWorkspaceRepository, this.userRepository = userRepository, this.roleTargetRepository = roleTargetRepository, this.roleValidationService = roleValidationService, this.workspaceInvitationService = workspaceInvitationService, this.workspaceDomainsService = workspaceDomainsService, this.loginTokenService = loginTokenService, this.approvedAccessDomainService = approvedAccessDomainService, this.globalWorkspaceOrmManager = globalWorkspaceOrmManager, this.userRoleService = userRoleService, this.fileCorePictureService = fileCorePictureService, this.fileUrlService = fileUrlService, this.onboardingService = onboardingService, this.coreEntityCacheService = coreEntityCacheService, this.logger = new _common.Logger(UserWorkspaceService.name);
    }
};
UserWorkspaceService = _ts_decorate([
    _ts_param(0, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_roletargetentity.RoleTargetEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof _rolevalidationservice.RoleValidationService === "undefined" ? Object : _rolevalidationservice.RoleValidationService,
        typeof _workspaceinvitationservice.WorkspaceInvitationService === "undefined" ? Object : _workspaceinvitationservice.WorkspaceInvitationService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _logintokenservice.LoginTokenService === "undefined" ? Object : _logintokenservice.LoginTokenService,
        typeof _approvedaccessdomainservice.ApprovedAccessDomainService === "undefined" ? Object : _approvedaccessdomainservice.ApprovedAccessDomainService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _filecorepictureservice.FileCorePictureService === "undefined" ? Object : _filecorepictureservice.FileCorePictureService,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService,
        typeof _onboardingservice.OnboardingService === "undefined" ? Object : _onboardingservice.OnboardingService,
        typeof _coreentitycacheservice.CoreEntityCacheService === "undefined" ? Object : _coreentitycacheservice.CoreEntityCacheService
    ])
], UserWorkspaceService);

//# sourceMappingURL=user-workspace.service.js.map