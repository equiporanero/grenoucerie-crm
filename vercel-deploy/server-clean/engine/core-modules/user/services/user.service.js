"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserService", {
    enumerable: true,
    get: function() {
        return UserService;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _assert = /*#__PURE__*/ _interop_require_default(require("assert"));
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _guards = require("@sniptt/guards");
const _translations = require("twenty-shared/translations");
const _utils = require("twenty-shared/utils");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _coreentitycacheservice = require("../../../core-entity-cache/services/core-entity-cache.service");
const _authexception = require("../../auth/auth.exception");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _emailverificationconstants = require("../../email-verification/email-verification.constants");
const _emailverificationservice = require("../../email-verification/services/email-verification.service");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _messagequeuedecorator = require("../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../message-queue/services/message-queue.service");
const _userworkspaceservice = require("../../user-workspace/user-workspace.service");
const _updateworkspacememberemailjob = require("../jobs/update-workspace-member-email.job");
const _workspacemembertranspilerservice = require("./workspace-member-transpiler.service");
const _userentity = require("../user.entity");
const _userexception = require("../user.exception");
const _uservalidate = require("../user.validate");
const _workspaceservice = require("../../workspace/services/workspace.service");
const _permissionsexception = require("../../../metadata-modules/permissions/permissions.exception");
const _userroleservice = require("../../../metadata-modules/user-role/user-role.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
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
let UserService = class UserService extends _nestjsquerytypeorm.TypeOrmQueryService {
    async loadWorkspaceMember(user, workspace) {
        if (!(0, _workspace.isWorkspaceActiveOrSuspended)(workspace)) {
            return null;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspace.id);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return await workspaceMemberRepository.findOne({
                where: {
                    userId: user.id
                }
            });
        }, authContext);
    }
    async loadWorkspaceMembers(workspace, withDeleted = false) {
        if (!(0, _workspace.isWorkspaceActiveOrSuspended)(workspace)) {
            return [];
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspace.id);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return await workspaceMemberRepository.find({
                withDeleted: withDeleted
            });
        }, authContext);
    }
    async loadSignedAvatarUrlsByUserId({ workspace, fallbackAvatarUrlsByUserId }) {
        const userIds = Array.from(fallbackAvatarUrlsByUserId.keys());
        if (userIds.length === 0) {
            return new Map();
        }
        const workspaceMembers = await this.loadWorkspaceMembersByUserIds({
            workspace,
            userIds
        });
        const memberByUserId = new Map(workspaceMembers.map((member)=>[
                member.userId,
                member
            ]));
        const entries = await Promise.all(userIds.map(async (userId)=>{
            const member = memberByUserId.get(userId);
            const memberSigned = (0, _utils.isDefined)(member) ? await this.workspaceMemberTranspiler.generateSignedAvatarUrl({
                workspaceId: workspace.id,
                workspaceMember: member
            }) : '';
            if ((0, _guards.isNonEmptyString)(memberSigned)) {
                return [
                    userId,
                    memberSigned
                ];
            }
            const fallbackAvatarUrl = fallbackAvatarUrlsByUserId.get(userId);
            if (!(0, _guards.isNonEmptyString)(fallbackAvatarUrl)) {
                return [
                    userId,
                    null
                ];
            }
            const fallbackSigned = await this.workspaceMemberTranspiler.generateSignedAvatarUrl({
                workspaceId: workspace.id,
                workspaceMember: {
                    avatarUrl: fallbackAvatarUrl,
                    id: userId
                }
            });
            return [
                userId,
                (0, _guards.isNonEmptyString)(fallbackSigned) ? fallbackSigned : fallbackAvatarUrl
            ];
        }));
        return new Map(entries);
    }
    async loadWorkspaceMembersByUserIds({ workspace, userIds }) {
        if (!(0, _workspace.isWorkspaceActiveOrSuspended)(workspace) || userIds.length === 0) {
            return [];
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspace.id);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return await workspaceMemberRepository.find({
                select: [
                    'id',
                    'userId',
                    'avatarUrl'
                ],
                where: {
                    userId: (0, _typeorm1.In)(userIds)
                }
            });
        }, authContext);
    }
    async loadDeletedWorkspaceMembersOnly(workspace) {
        if (!(0, _workspace.isWorkspaceActiveOrSuspended)(workspace)) {
            return [];
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspace.id);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return await workspaceMemberRepository.find({
                where: {
                    deletedAt: (0, _typeorm1.Not)((0, _typeorm1.IsNull)())
                },
                withDeleted: true
            });
        }, authContext);
    }
    async deleteUser(userId) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                userWorkspaces: true
            }
        });
        _uservalidate.userValidator.assertIsDefinedOrThrow(user);
        for (const userWorkspace of user.userWorkspaces){
            await this.removeUserFromWorkspaceAndPotentiallyDeleteWorkspace(userWorkspace);
        }
        await this.userRepository.softDelete({
            id: userId
        });
        await this.coreEntityCacheService.invalidate('user', userId);
        return await this.userRepository.findOne({
            where: {
                id: userId
            },
            withDeleted: true
        });
    }
    async deleteUserWorkspaceAndPotentiallyDeleteUser({ userId, workspaceId }) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                userWorkspaces: true
            }
        });
        _uservalidate.userValidator.assertIsDefinedOrThrow(user);
        const userWorkspace = user.userWorkspaces.find((userWorkspace)=>userWorkspace.workspaceId === workspaceId);
        if (!(0, _utils.isDefined)(userWorkspace)) {
            throw new Error('User workspace not found.');
        }
        await this.removeUserFromWorkspaceAndPotentiallyDeleteWorkspace(userWorkspace);
        if (user.userWorkspaces.length === 1) {
            await this.userRepository.softDelete(userId);
            await this.coreEntityCacheService.invalidate('user', userId);
        }
        return userWorkspace;
    }
    async removeUserFromWorkspaceAndPotentiallyDeleteWorkspace(userWorkspace) {
        const workspaceId = userWorkspace.workspaceId;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const workspaceMembers = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.find();
        }, authContext);
        const userWorkspaceId = userWorkspace.id;
        if (workspaceMembers.length === 1) {
            await this.workspaceService.suspendWorkspace(workspaceId);
            await this.workspaceService.deleteWorkspace(workspaceId, true);
            return;
        }
        if (workspaceMembers.length > 1) {
            try {
                await this.userRoleService.validateUserWorkspaceIsNotUniqueAdminOrThrow({
                    workspaceId,
                    userWorkspaceId: userWorkspace.id
                });
            } catch (error) {
                if (error instanceof _permissionsexception.PermissionsException && error.code === _permissionsexception.PermissionsExceptionCode.CANNOT_UNASSIGN_LAST_ADMIN) {
                    throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.CANNOT_DELETE_LAST_ADMIN_USER, _permissionsexception.PermissionsExceptionCode.CANNOT_DELETE_LAST_ADMIN_USER, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "VPXcr5",
                            message: "Cannot delete account: you are the only admin. Assign another admin or delete the workspace(s) first."
                        }
                    });
                }
                throw error;
            }
        }
        const workspaceMember = workspaceMembers.find((member)=>member.userId === userWorkspace.userId);
        (0, _assert.default)(workspaceMember, 'WorkspaceMember not found');
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            await workspaceMemberRepository.delete({
                userId: userWorkspace.userId
            });
        }, authContext);
        await this.userWorkspaceService.deleteUserWorkspace({
            userWorkspaceId
        });
    }
    async hasUserAccessToWorkspaceOrThrow(userId, workspaceId) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
                userWorkspaces: {
                    workspaceId
                }
            },
            relations: {
                userWorkspaces: true
            }
        });
        _uservalidate.userValidator.assertIsDefinedOrThrow(user, new _authexception.AuthException('User does not have access to this workspace', _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION));
    }
    async findUserByEmailOrThrow(email, error) {
        const user = await this.findUserByEmail(email);
        (0, _utils.assertIsDefinedOrThrow)(user, error);
        return user;
    }
    async findUserByEmail(email) {
        return await this.userRepository.findOne({
            where: {
                email
            }
        });
    }
    async findUserByEmailWithWorkspaces(email) {
        return await this.userRepository.findOne({
            where: {
                email
            },
            relations: {
                userWorkspaces: true
            }
        });
    }
    async findUserById(id) {
        return await this.userRepository.findOne({
            where: {
                id
            }
        });
    }
    async findUserByIdOrThrow(id, error) {
        const user = await this.findUserById(id);
        (0, _utils.assertIsDefinedOrThrow)(user, error);
        return user;
    }
    async markEmailAsVerified(userId, queryRunner) {
        const user = await this.findUserByIdOrThrow(userId);
        user.isEmailVerified = true;
        return queryRunner ? await queryRunner.manager.save(_userentity.UserEntity, user) : await this.userRepository.save(user);
    }
    async updateEmailFromVerificationToken(userId, email) {
        const user = await this.findUserByIdOrThrow(userId);
        user.email = email;
        const updatedUser = await this.userRepository.save(user);
        await this.enqueueWorkspaceMemberEmailUpdate({
            userId: user.id,
            email
        });
        return updatedUser;
    }
    async updateUserEmail({ user, workspace, newEmail, verifyEmailRedirectPath }) {
        const normalizedEmail = newEmail.trim().toLowerCase();
        if (normalizedEmail === user.email) {
            throw new _graphqlerrorsutil.UserInputError('New email must be different from current email', {
                subCode: _userexception.UserExceptionCode.EMAIL_UNCHANGED,
                userFriendlyMessage: /*i18n*/ {
                    id: "TYhxR+",
                    message: "New email must be different from current email"
                }
            });
        }
        const userWorkspaceCount = await this.userWorkspaceService.countUserWorkspaces(user.id);
        if (userWorkspaceCount > 1) {
            throw new _graphqlerrorsutil.UserInputError('Email updates are available only for users with a single workspace', {
                subCode: _userexception.UserExceptionCode.EMAIL_UPDATE_RESTRICTED_TO_SINGLE_WORKSPACE,
                userFriendlyMessage: /*i18n*/ {
                    id: "LT5dFi",
                    message: "Email can only be updated when you belong to a single workspace."
                }
            });
        }
        const existingUser = await this.userRepository.findOne({
            where: {
                email: normalizedEmail
            }
        });
        if (existingUser && existingUser.id !== user.id) {
            throw new _graphqlerrorsutil.UserInputError('Email already in use', {
                subCode: _userexception.UserExceptionCode.EMAIL_ALREADY_IN_USE,
                userFriendlyMessage: /*i18n*/ {
                    id: "AcnTuz",
                    message: "Email already in use"
                }
            });
        }
        const workspaceDomainConfig = this.workspaceDomainsService.getSubdomainAndCustomDomainFromWorkspaceFallbackOnDefaultSubdomain(workspace);
        await this.emailVerificationService.sendVerificationEmail({
            userId: user.id,
            email: normalizedEmail,
            workspace: workspaceDomainConfig,
            locale: user.locale || _translations.SOURCE_LOCALE,
            verifyEmailRedirectPath,
            verificationTrigger: _emailverificationconstants.EmailVerificationTrigger.EMAIL_UPDATE
        });
    }
    async enqueueWorkspaceMemberEmailUpdate(data) {
        await this.workspaceQueueService.add(_updateworkspacememberemailjob.UpdateWorkspaceMemberEmailJob.name, data, {
            retryLimit: 2
        });
    }
    constructor(userRepository, workspaceDomainsService, emailVerificationService, workspaceService, globalWorkspaceOrmManager, userRoleService, userWorkspaceService, workspaceQueueService, coreEntityCacheService, workspaceMemberTranspiler){
        super(userRepository), this.userRepository = userRepository, this.workspaceDomainsService = workspaceDomainsService, this.emailVerificationService = emailVerificationService, this.workspaceService = workspaceService, this.globalWorkspaceOrmManager = globalWorkspaceOrmManager, this.userRoleService = userRoleService, this.userWorkspaceService = userWorkspaceService, this.workspaceQueueService = workspaceQueueService, this.coreEntityCacheService = coreEntityCacheService, this.workspaceMemberTranspiler = workspaceMemberTranspiler;
    }
};
UserService = _ts_decorate([
    _ts_param(0, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_param(7, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workspaceQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _emailverificationservice.EmailVerificationService === "undefined" ? Object : _emailverificationservice.EmailVerificationService,
        typeof _workspaceservice.WorkspaceService === "undefined" ? Object : _workspaceservice.WorkspaceService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _coreentitycacheservice.CoreEntityCacheService === "undefined" ? Object : _coreentitycacheservice.CoreEntityCacheService,
        typeof _workspacemembertranspilerservice.WorkspaceMemberTranspiler === "undefined" ? Object : _workspacemembertranspilerservice.WorkspaceMemberTranspiler
    ])
], UserService);

//# sourceMappingURL=user.service.js.map