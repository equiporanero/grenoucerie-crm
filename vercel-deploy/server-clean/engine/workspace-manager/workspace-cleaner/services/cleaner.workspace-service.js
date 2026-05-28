"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CLEAN_SUSPENDED_WORKSPACES_OPERATIONS () {
        return CLEAN_SUSPENDED_WORKSPACES_OPERATIONS;
    },
    get CleanerWorkspaceService () {
        return CleanerWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _render = require("@react-email/render");
const _datefns = require("date-fns");
const _twentyemails = require("twenty-emails");
const _utils = require("twenty-shared/utils");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _billingsubscriptionentity = require("../../../core-modules/billing/entities/billing-subscription.entity");
const _billingsubscriptionstatusenum = require("../../../core-modules/billing/enums/billing-subscription-status.enum");
const _billingsubscriptionservice = require("../../../core-modules/billing/services/billing-subscription.service");
const _emailservice = require("../../../core-modules/email/email.service");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _metricsservice = require("../../../core-modules/metrics/metrics.service");
const _metricskeystype = require("../../../core-modules/metrics/types/metrics-keys.type");
const _twentyconfigservice = require("../../../core-modules/twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../../core-modules/user-workspace/user-workspace.entity");
const _userservice = require("../../../core-modules/user/services/user.service");
const _uservarsservice = require("../../../core-modules/user/user-vars/services/user-vars.service");
const _workspaceservice = require("../../../core-modules/workspace/services/workspace.service");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _userworkspacedeletionwarningsentkeyconstant = require("../constants/user-workspace-deletion-warning-sent-key.constant");
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
const CLEAN_SUSPENDED_WORKSPACES_OPERATIONS = [
    'warn',
    'destroy',
    'soft-delete'
];
let CleanerWorkspaceService = class CleanerWorkspaceService {
    async computeDaysSinceSuspended(workspace) {
        if ((0, _utils.isDefined)(workspace.suspendedAt)) {
            return (0, _datefns.differenceInDays)(new Date(), workspace.suspendedAt);
        }
        return null;
    }
    async checkIfAtLeastOneWorkspaceMemberWarned(workspaceMembers, workspaceId) {
        for (const workspaceMember of workspaceMembers){
            const workspaceMemberWarned = await this.userVarsService.get({
                userId: workspaceMember.userId,
                workspaceId: workspaceId,
                key: _userworkspacedeletionwarningsentkeyconstant.USER_WORKSPACE_DELETION_WARNING_SENT_KEY
            });
            if (workspaceMemberWarned) {
                return true;
            }
        }
        return false;
    }
    async sendWarningEmail(workspaceMember, workspaceDisplayName, daysSinceInactive) {
        const emailData = {
            daysSinceInactive,
            inactiveDaysBeforeDelete: this.inactiveDaysBeforeSoftDelete,
            userName: `${workspaceMember.name.firstName} ${workspaceMember.name.lastName}`,
            workspaceDisplayName: `${workspaceDisplayName}`,
            locale: workspaceMember.locale
        };
        const emailTemplate = (0, _twentyemails.WarnSuspendedWorkspaceEmail)(emailData);
        const html = await (0, _render.render)(emailTemplate, {
            pretty: true
        });
        const text = await (0, _render.render)(emailTemplate, {
            plainText: true
        });
        const workspaceDeletionMsg = /*i18n*/ {
            id: "48AxkT",
            message: "Action needed to prevent workspace deletion"
        };
        const i18n = this.i18nService.getI18nInstance(workspaceMember.locale);
        const subject = i18n._(workspaceDeletionMsg);
        if (!(0, _utils.isDefined)(workspaceMember.userEmail)) {
            throw new Error('Workspace member email is missing');
        }
        await this.emailService.send({
            to: workspaceMember.userEmail,
            from: `${this.twentyConfigService.get('EMAIL_FROM_NAME')} <${this.twentyConfigService.get('EMAIL_FROM_ADDRESS')}>`,
            subject,
            html,
            text
        });
    }
    async warnWorkspaceMembers(workspace, daysSinceInactive, dryRun) {
        const workspaceMembers = await this.userService.loadWorkspaceMembers(workspace);
        const workspaceMembersWarned = await this.checkIfAtLeastOneWorkspaceMemberWarned(workspaceMembers, workspace.id);
        if (workspaceMembersWarned) {
            this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Workspace ${workspace.id} ${workspace.displayName} already warned`);
            return;
        }
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Sending ${workspace.id} ${workspace.displayName} suspended since ${daysSinceInactive} days emails to users ['${workspaceMembers.map((workspaceUser)=>workspaceUser.userId).join(', ')}']`);
        if (!dryRun) {
            for (const workspaceMember of workspaceMembers){
                await this.sendWarningEmail(workspaceMember, workspace.displayName, daysSinceInactive);
                await this.userVarsService.set({
                    userId: workspaceMember.userId,
                    workspaceId: workspace.id,
                    key: _userworkspacedeletionwarningsentkeyconstant.USER_WORKSPACE_DELETION_WARNING_SENT_KEY,
                    value: true
                });
            }
        }
    }
    async sendCleaningEmail(workspaceMember, workspaceDisplayName, daysSinceInactive) {
        const emailData = {
            daysSinceInactive: daysSinceInactive,
            userName: `${workspaceMember.name.firstName} ${workspaceMember.name.lastName}`,
            workspaceDisplayName,
            locale: workspaceMember.locale
        };
        const emailTemplate = (0, _twentyemails.CleanSuspendedWorkspaceEmail)(emailData);
        const html = await (0, _render.render)(emailTemplate, {
            pretty: true
        });
        const text = await (0, _render.render)(emailTemplate, {
            plainText: true
        });
        if (!(0, _utils.isDefined)(workspaceMember.userEmail)) {
            throw new Error('Workspace member email is missing');
        }
        await this.emailService.send({
            to: workspaceMember.userEmail,
            from: `${this.twentyConfigService.get('EMAIL_FROM_NAME')} <${this.twentyConfigService.get('EMAIL_FROM_ADDRESS')}>`,
            subject: 'Your workspace has been deleted',
            html,
            text
        });
    }
    async informWorkspaceMembersAndSoftDeleteWorkspace(workspace, daysSinceInactive, dryRun) {
        if ((0, _utils.isDefined)(workspace.deletedAt)) {
            this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Workspace ${workspace.id} ${workspace.displayName} already soft deleted`);
            return;
        }
        const workspaceMembers = await this.userService.loadWorkspaceMembers(workspace);
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Sending workspace ${workspace.id} ${workspace.displayName} deletion emails to users ['${workspaceMembers.map((workspaceUser)=>workspaceUser.userId).join(', ')}']`);
        if (!dryRun) {
            for (const workspaceMember of workspaceMembers){
                await this.userVarsService.delete({
                    userId: workspaceMember.userId,
                    workspaceId: workspace.id,
                    key: _userworkspacedeletionwarningsentkeyconstant.USER_WORKSPACE_DELETION_WARNING_SENT_KEY
                });
                await this.sendCleaningEmail(workspaceMember, workspace.displayName || '', daysSinceInactive);
            }
            await this.workspaceService.deleteWorkspace(workspace.id, true);
        }
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Soft deleting Workspace ${workspace.id} ${workspace.displayName}`);
    }
    async batchCleanOnboardingWorkspaces(workspaceIds, dryRun = false) {
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}batchCleanOnboardingWorkspaces running...`);
        const workspaces = await this.workspaceRepository.find({
            where: {
                id: (0, _typeorm1.In)(workspaceIds),
                activationStatus: (0, _typeorm1.In)([
                    _workspace.WorkspaceActivationStatus.PENDING_CREATION,
                    _workspace.WorkspaceActivationStatus.ONGOING_CREATION
                ])
            },
            withDeleted: true
        });
        if (workspaces.length !== 0) {
            for (const workspace of workspaces){
                if (!(0, _utils.isDefined)(workspace.deletedAt)) {
                    this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Soft deleting onboarding workspace ${workspace.id}`);
                    if (!dryRun) {
                        const userWorkspaces = await this.userWorkspaceRepository.find({
                            where: {
                                workspaceId: workspace.id
                            },
                            withDeleted: true
                        });
                        for (const userWorkspace of userWorkspaces){
                            await this.workspaceService.handleRemoveWorkspaceMember(workspace.id, userWorkspace.userId);
                        }
                        if (this.twentyConfigService.get('IS_BILLING_ENABLED')) {
                            await this.billingSubscriptionService.cancelSubscription(workspace.id);
                        }
                        await this.workspaceService.deleteWorkspace(workspace.id, true);
                    }
                } else {
                    if (this.twentyConfigService.get('IS_BILLING_ENABLED')) {
                        await this.billingSubscriptionService.assertSubscriptionCanceledOrNone(workspace.id);
                    }
                    this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Hard deleting onboarding workspace ${workspace.id}`);
                    if (!dryRun) {
                        await this.workspaceService.deleteWorkspace(workspace.id);
                    }
                }
            }
            this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}batchCleanOnboardingWorkspaces done with ${workspaces.length} workspaces!`);
        }
    }
    async destroySoftDeletedWorkspace({ workspace, ignoreGracePeriod = false, dryRun = false }) {
        if (!(0, _utils.isDefined)(workspace.deletedAt)) {
            return;
        }
        const daysSinceSoftDeleted = workspace.deletedAt ? (0, _datefns.differenceInDays)(new Date(), workspace.deletedAt) : 0;
        const hasPassedGracePeriod = daysSinceSoftDeleted > this.inactiveDaysBeforeDelete - this.inactiveDaysBeforeSoftDelete;
        const canHardDelete = ignoreGracePeriod || hasPassedGracePeriod;
        if (!canHardDelete) {
            return;
        }
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Destroying workspace ${workspace.id} ${workspace.displayName}`);
        if (dryRun) {
            return;
        }
        await this.workspaceService.deleteWorkspace(workspace.id);
        void this.metricsService.incrementCounterForEvent({
            key: _metricskeystype.MetricsKeys.CronJobDeletedWorkspace,
            shouldStoreInCache: false
        });
        return workspace;
    }
    async batchWarnOrCleanSuspendedWorkspaces({ workspaceIds, dryRun = false, ignoreDestroyGracePeriod = false, onlyOperation }) {
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}batchWarnOrCleanSuspendedWorkspaces running...`);
        const workspaces = await this.workspaceRepository.find({
            where: {
                id: (0, _typeorm1.In)(workspaceIds),
                activationStatus: _workspace.WorkspaceActivationStatus.SUSPENDED
            },
            withDeleted: true
        });
        let deletedWorkspacesCount = 0;
        for (const [index, workspace] of workspaces.entries()){
            this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Processing workspace ${workspace.id} - ${index + 1}/${workspaces.length}`);
            try {
                const isSoftDeletedWorkspace = (0, _utils.isDefined)(workspace.deletedAt);
                const isWithinDeletionLimit = deletedWorkspacesCount < this.maxNumberOfWorkspacesDeletedPerExecution;
                if ((!(0, _utils.isDefined)(onlyOperation) || onlyOperation === 'destroy') && isSoftDeletedWorkspace && isWithinDeletionLimit) {
                    const result = await this.destroySoftDeletedWorkspace({
                        workspace,
                        dryRun,
                        ignoreGracePeriod: ignoreDestroyGracePeriod
                    });
                    if ((0, _utils.isDefined)(result)) {
                        deletedWorkspacesCount++;
                        this.logger.log(`Destroyed ${deletedWorkspacesCount} workspaces on ${this.maxNumberOfWorkspacesDeletedPerExecution} limit durings this execution`);
                    }
                    continue;
                }
                const inactiveDaysSinceSuspended = await this.computeDaysSinceSuspended(workspace);
                if (inactiveDaysSinceSuspended === null) {
                    continue;
                }
                if ((!(0, _utils.isDefined)(onlyOperation) || onlyOperation === 'soft-delete') && inactiveDaysSinceSuspended > this.inactiveDaysBeforeSoftDelete) {
                    await this.informWorkspaceMembersAndSoftDeleteWorkspace(workspace, inactiveDaysSinceSuspended, dryRun);
                    continue;
                }
                if ((!(0, _utils.isDefined)(onlyOperation) || onlyOperation === 'warn') && inactiveDaysSinceSuspended > this.inactiveDaysBeforeWarn && inactiveDaysSinceSuspended <= this.inactiveDaysBeforeSoftDelete) {
                    await this.warnWorkspaceMembers(workspace, inactiveDaysSinceSuspended, dryRun);
                }
            } catch (error) {
                this.logger.error(`Error while processing workspace ${workspace.id} ${workspace.displayName}: ${error}`);
            }
        }
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}batchWarnOrCleanSuspendedWorkspaces done!`);
    }
    async destroyBillingDeactivatedAndSoftDeletedWorkspaces(workspaceIds, dryRun = false) {
        this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}destroyBillingDeactivatedAndSoftDeletedWorkspaces running...`);
        const workspaces = await this.workspaceRepository.find({
            where: {
                id: (0, _typeorm1.In)(workspaceIds)
            },
            withDeleted: true
        });
        for (const workspace of workspaces){
            if (!(0, _utils.isDefined)(workspace.deletedAt)) {
                this.logger.warn(`${dryRun ? 'DRY RUN - ' : ''}Workspace ${workspace.id} is not soft deleted, skipping`);
                continue;
            }
            if (this.twentyConfigService.get('IS_BILLING_ENABLED')) {
                const activeBillingSubscription = await this.billingSubscriptionRepository.findOne(workspace.id, {
                    where: {
                        status: (0, _typeorm1.In)([
                            _billingsubscriptionstatusenum.SubscriptionStatus.Active,
                            _billingsubscriptionstatusenum.SubscriptionStatus.Trialing
                        ])
                    }
                });
                if ((0, _utils.isDefined)(activeBillingSubscription)) {
                    this.logger.warn(`${dryRun ? 'DRY RUN - ' : ''}Workspace ${workspace.id} has an active billing subscription, skipping`);
                    continue;
                }
            }
            this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Destroying workspace ${workspace.id}`);
            if (!dryRun) {
                await this.workspaceService.deleteWorkspace(workspace.id);
            }
            this.logger.log(`${dryRun ? 'DRY RUN - ' : ''}Destroyed workspace ${workspace.id}`);
        }
    }
    constructor(workspaceService, twentyConfigService, userVarsService, userService, emailService, workspaceRepository, billingSubscriptionRepository, billingSubscriptionService, userWorkspaceRepository, i18nService, metricsService){
        this.workspaceService = workspaceService;
        this.twentyConfigService = twentyConfigService;
        this.userVarsService = userVarsService;
        this.userService = userService;
        this.emailService = emailService;
        this.workspaceRepository = workspaceRepository;
        this.billingSubscriptionRepository = billingSubscriptionRepository;
        this.billingSubscriptionService = billingSubscriptionService;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.i18nService = i18nService;
        this.metricsService = metricsService;
        this.logger = new _common.Logger(CleanerWorkspaceService.name);
        this.inactiveDaysBeforeSoftDelete = this.twentyConfigService.get('WORKSPACE_INACTIVE_DAYS_BEFORE_SOFT_DELETION');
        this.inactiveDaysBeforeDelete = this.twentyConfigService.get('WORKSPACE_INACTIVE_DAYS_BEFORE_DELETION');
        this.inactiveDaysBeforeWarn = this.twentyConfigService.get('WORKSPACE_INACTIVE_DAYS_BEFORE_NOTIFICATION');
        this.maxNumberOfWorkspacesDeletedPerExecution = this.twentyConfigService.get('MAX_NUMBER_OF_WORKSPACES_DELETED_PER_EXECUTION');
    }
};
CleanerWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(5, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(6, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingsubscriptionentity.BillingSubscriptionEntity)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceservice.WorkspaceService === "undefined" ? Object : _workspaceservice.WorkspaceService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _uservarsservice.UserVarsService === "undefined" ? Object : _uservarsservice.UserVarsService,
        typeof _userservice.UserService === "undefined" ? Object : _userservice.UserService,
        typeof _emailservice.EmailService === "undefined" ? Object : _emailservice.EmailService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], CleanerWorkspaceService);

//# sourceMappingURL=cleaner.workspace-service.js.map