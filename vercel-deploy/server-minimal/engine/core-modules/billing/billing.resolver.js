/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingResolver", {
    enumerable: true,
    get: function() {
        return BillingResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _workspace = require("twenty-shared/workspace");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _billingendtrialperioddto = require("./dtos/billing-end-trial-period.dto");
const _billingresourcecreditusagedto = require("./dtos/billing-resource-credit-usage.dto");
const _billingplandto = require("./dtos/billing-plan.dto");
const _billingsessiondto = require("./dtos/billing-session.dto");
const _billingupdatedto = require("./dtos/billing-update.dto");
const _billingcheckoutsessioninput = require("./dtos/inputs/billing-checkout-session.input");
const _billingsessioninput = require("./dtos/inputs/billing-session.input");
const _billingupdatesubscriptionitempriceinput = require("./dtos/inputs/billing-update-subscription-item-price.input");
const _billingplankeyenum = require("./enums/billing-plan-key.enum");
const _billingplanservice = require("./services/billing-plan.service");
const _billingportalworkspaceservice = require("./services/billing-portal.workspace-service");
const _billingsubscriptionupdateservice = require("./services/billing-subscription-update.service");
const _billingsubscriptionservice = require("./services/billing-subscription.service");
const _billingusageservice = require("./services/billing-usage.service");
const _billingservice = require("./services/billing.service");
const _formatdatabaseproducttographqldtoutil = require("./utils/format-database-product-to-graphql-dto.util");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _todisplaycreditsutil = require("../usage/utils/to-display-credits.util");
const _authapikeydecorator = require("../../decorators/auth/auth-api-key.decorator");
const _authuserworkspaceiddecorator = require("../../decorators/auth/auth-user-workspace-id.decorator");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _permissionsexception = require("../../metadata-modules/permissions/permissions.exception");
const _permissionsservice = require("../../metadata-modules/permissions/permissions.service");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
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
let BillingResolver = class BillingResolver {
    async billingPortalSession(workspace, { returnUrlPath }) {
        return {
            url: await this.billingPortalWorkspaceService.computeBillingPortalSessionURLOrThrow(workspace, returnUrlPath)
        };
    }
    async checkoutSession(workspace, user, userWorkspaceId, { recurringInterval, successUrlPath, plan, requirePaymentMethod }, apiKey) {
        await this.validateCanCheckoutSessionPermissionOrThrow({
            workspaceId: workspace.id,
            userWorkspaceId,
            apiKeyId: apiKey?.id,
            workspaceActivationStatus: workspace.activationStatus
        });
        const checkoutSessionParams = {
            user,
            workspace,
            successUrlPath,
            plan: plan ?? _billingplankeyenum.BillingPlanKey.PRO,
            requirePaymentMethod
        };
        const billingPricesPerPlan = await this.billingPlanService.getPricesPerPlanByInterval({
            planKey: checkoutSessionParams.plan,
            interval: recurringInterval
        });
        // For 7-day trials (no payment method required), create subscription directly
        // For 30-day trials (payment method required), use checkout session flow
        if (!requirePaymentMethod) {
            const successUrl = await this.billingPortalWorkspaceService.createDirectSubscription({
                ...checkoutSessionParams,
                billingPricesPerPlan
            });
            return {
                url: successUrl
            };
        } else {
            const checkoutSessionURL = await this.billingPortalWorkspaceService.computeCheckoutSessionURL({
                ...checkoutSessionParams,
                billingPricesPerPlan
            });
            return {
                url: checkoutSessionURL
            };
        }
    }
    async switchSubscriptionInterval(workspace) {
        await this.billingSubscriptionUpdateService.changeInterval(workspace.id);
        return {
            billingSubscriptions: await this.billingSubscriptionService.getBillingSubscriptions(workspace.id),
            currentBillingSubscription: await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
                workspaceId: workspace.id
            })
        };
    }
    async switchBillingPlan(workspace) {
        await this.billingSubscriptionUpdateService.changePlan(workspace.id);
        return {
            billingSubscriptions: await this.billingSubscriptionService.getBillingSubscriptions(workspace.id),
            currentBillingSubscription: await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
                workspaceId: workspace.id
            })
        };
    }
    async cancelSwitchBillingPlan(workspace) {
        await this.billingSubscriptionUpdateService.cancelSwitchPlan(workspace.id);
        return {
            billingSubscriptions: await this.billingSubscriptionService.getBillingSubscriptions(workspace.id),
            currentBillingSubscription: await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
                workspaceId: workspace.id
            })
        };
    }
    async cancelSwitchBillingInterval(workspace) {
        await this.billingSubscriptionUpdateService.cancelSwitchInterval(workspace.id);
        return {
            billingSubscriptions: await this.billingSubscriptionService.getBillingSubscriptions(workspace.id),
            currentBillingSubscription: await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
                workspaceId: workspace.id
            })
        };
    }
    async setResourceCreditSubscriptionPrice(workspace, { priceId }) {
        await this.billingSubscriptionUpdateService.changeResourceCreditPrice(workspace.id, priceId);
        return {
            billingSubscriptions: await this.billingSubscriptionService.getBillingSubscriptions(workspace.id),
            currentBillingSubscription: await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
                workspaceId: workspace.id
            })
        };
    }
    async listPlans() {
        const plans = await this.billingPlanService.listPlans();
        return plans.map(_formatdatabaseproducttographqldtoutil.formatBillingDatabaseProductToGraphqlDTO);
    }
    async endSubscriptionTrialPeriod(workspace) {
        const result = await this.billingSubscriptionService.endTrialPeriod(workspace);
        if (!result.hasPaymentMethod && result.stripeCustomerId) {
            const billingPortalUrl = await this.billingPortalWorkspaceService.computeBillingPortalSessionURLForPaymentMethodUpdate(workspace, result.stripeCustomerId, '/settings/billing');
            return {
                hasPaymentMethod: false,
                status: undefined,
                billingPortalUrl
            };
        }
        return {
            hasPaymentMethod: result.hasPaymentMethod,
            status: result.status
        };
    }
    async getResourceCreditUsage(workspace) {
        const usageData = await this.billingUsageService.getResourceCreditProductUsage(workspace);
        return usageData.map((item)=>({
                ...item,
                usedCredits: (0, _todisplaycreditsutil.toDisplayCredits)(item.usedCredits),
                grantedCredits: (0, _todisplaycreditsutil.toDisplayCredits)(item.grantedCredits),
                rolloverCredits: (0, _todisplaycreditsutil.toDisplayCredits)(item.rolloverCredits),
                totalGrantedCredits: (0, _todisplaycreditsutil.toDisplayCredits)(item.totalGrantedCredits),
                unitPriceCents: item.unitPriceCents * _todisplaycreditsutil.INTERNAL_CREDITS_PER_DISPLAY_CREDIT
            }));
    }
    async cancelSwitchResourceCreditPrice(workspace) {
        await this.billingSubscriptionUpdateService.cancelSwitchResourceCreditPrice(workspace);
        return {
            billingSubscriptions: await this.billingSubscriptionService.getBillingSubscriptions(workspace.id),
            currentBillingSubscription: await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
                workspaceId: workspace.id
            })
        };
    }
    async validateCanCheckoutSessionPermissionOrThrow({ workspaceId, userWorkspaceId, apiKeyId, workspaceActivationStatus }) {
        if (await this.billingService.isSubscriptionIncompleteOnboardingStatus(workspaceId) || workspaceActivationStatus === _workspace.WorkspaceActivationStatus.PENDING_CREATION || workspaceActivationStatus === _workspace.WorkspaceActivationStatus.ONGOING_CREATION) {
            return;
        }
        const userHasPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
            userWorkspaceId,
            workspaceId,
            setting: _constants.PermissionFlagType.BILLING,
            apiKeyId
        });
        if (!userHasPermission) {
            throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
        }
    }
    constructor(billingSubscriptionService, billingSubscriptionUpdateService, billingPortalWorkspaceService, billingPlanService, billingService, billingUsageService, permissionsService){
        this.billingSubscriptionService = billingSubscriptionService;
        this.billingSubscriptionUpdateService = billingSubscriptionUpdateService;
        this.billingPortalWorkspaceService = billingPortalWorkspaceService;
        this.billingPlanService = billingPlanService;
        this.billingService = billingService;
        this.billingUsageService = billingUsageService;
        this.permissionsService = permissionsService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_billingsessiondto.BillingSessionDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.BILLING)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        typeof _billingsessioninput.BillingSessionInput === "undefined" ? Object : _billingsessioninput.BillingSessionInput
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "billingPortalSession", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_billingsessiondto.BillingSessionDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _authuserdecorator.AuthUser)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(3, (0, _graphql.Args)()),
    _ts_param(4, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        String,
        typeof _billingcheckoutsessioninput.BillingCheckoutSessionInput === "undefined" ? Object : _billingcheckoutsessioninput.BillingCheckoutSessionInput,
        typeof ApiKeyEntity === "undefined" ? Object : ApiKeyEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "checkoutSession", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_billingupdatedto.BillingUpdateDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.BILLING)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "switchSubscriptionInterval", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_billingupdatedto.BillingUpdateDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.BILLING)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "switchBillingPlan", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_billingupdatedto.BillingUpdateDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.BILLING)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "cancelSwitchBillingPlan", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_billingupdatedto.BillingUpdateDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.BILLING)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "cancelSwitchBillingInterval", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_billingupdatedto.BillingUpdateDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.BILLING)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        typeof _billingupdatesubscriptionitempriceinput.BillingUpdateSubscriptionItemPriceInput === "undefined" ? Object : _billingupdatesubscriptionitempriceinput.BillingUpdateSubscriptionItemPriceInput
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "setResourceCreditSubscriptionPrice", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _billingplandto.BillingPlanDTO
        ]),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "listPlans", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_billingendtrialperioddto.BillingEndTrialPeriodDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.BILLING)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "endSubscriptionTrialPeriod", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _billingresourcecreditusagedto.BillingResourceCreditUsageDTO
        ]),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.BILLING)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "getResourceCreditUsage", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_billingupdatedto.BillingUpdateDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.BILLING)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], BillingResolver.prototype, "cancelSwitchResourceCreditPrice", null);
BillingResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _billingsubscriptionupdateservice.BillingSubscriptionUpdateService === "undefined" ? Object : _billingsubscriptionupdateservice.BillingSubscriptionUpdateService,
        typeof _billingportalworkspaceservice.BillingPortalWorkspaceService === "undefined" ? Object : _billingportalworkspaceservice.BillingPortalWorkspaceService,
        typeof _billingplanservice.BillingPlanService === "undefined" ? Object : _billingplanservice.BillingPlanService,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _billingusageservice.BillingUsageService === "undefined" ? Object : _billingusageservice.BillingUsageService,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService
    ])
], BillingResolver);

//# sourceMappingURL=billing.resolver.js.map