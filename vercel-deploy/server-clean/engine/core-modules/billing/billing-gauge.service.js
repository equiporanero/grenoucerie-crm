/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingGaugeService", {
    enumerable: true,
    get: function() {
        return BillingGaugeService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _billingsubscriptionentity = require("./entities/billing-subscription.entity");
const _metricsservice = require("../metrics/metrics.service");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
const _workspaceentity = require("../workspace/workspace.entity");
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
// Workspaces created less than 1 minute ago are excluded from the check
const WORKSPACE_AGE_THRESHOLD_MS = 60 * 1000;
let BillingGaugeService = class BillingGaugeService {
    onModuleInit() {
        this.metricsService.createObservableGauge({
            metricName: 'twenty_billing_subscribed_workspaces_total',
            options: {
                description: 'Total number of workspaces having an active subscription'
            },
            callback: async ()=>{
                return this.getSubscribedWorkspacesCount();
            },
            cacheValue: true
        });
        this.metricsService.createObservableGauge({
            metricName: 'twenty_billing_last_workspace_has_subscription',
            options: {
                description: 'Whether the last workspace (older than 1 min) has a subscription (1 = yes, 0 = no)'
            },
            callback: async ()=>{
                return this.lastWorkspaceHasSubscription();
            },
            cacheValue: true
        });
    }
    async getSubscribedWorkspacesCount() {
        const isBillingEnabled = this.twentyConfigService.get('IS_BILLING_ENABLED');
        if (!isBillingEnabled) {
            return 0;
        }
        try {
            return this.billingSubscriptionRepository.count({
                where: {
                    deletedAt: (0, _typeorm1.IsNull)()
                }
            });
        } catch (error) {
            this.logger.error('Failed to count subscribed workspaces', error);
            return 0;
        }
    }
    async lastWorkspaceHasSubscription() {
        const isBillingEnabled = this.twentyConfigService.get('IS_BILLING_ENABLED');
        if (!isBillingEnabled) {
            return 1;
        }
        try {
            const ageThreshold = new Date(Date.now() - WORKSPACE_AGE_THRESHOLD_MS);
            // Find the most recently created workspace that is older than 1 minute
            const lastWorkspace = await this.workspaceRepository.findOne({
                where: {
                    deletedAt: (0, _typeorm1.IsNull)(),
                    createdAt: (0, _typeorm1.LessThan)(ageThreshold)
                },
                order: {
                    createdAt: 'DESC'
                }
            });
            if (!lastWorkspace) {
                return 1;
            }
            const subscription = await this.billingSubscriptionRepository.findOne({
                where: {
                    workspaceId: lastWorkspace.id,
                    deletedAt: (0, _typeorm1.IsNull)()
                }
            });
            if (!subscription) {
                this.logger.warn(`Billing issue: workspace ${lastWorkspace.id} has no subscription`);
                return 0;
            }
            return 1;
        } catch (error) {
            this.logger.error('Failed to check last workspace subscription', error);
            return 0;
        }
    }
    constructor(metricsService, twentyConfigService, workspaceRepository, // Observability gauges count subscriptions across every workspace.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    billingSubscriptionRepository){
        this.metricsService = metricsService;
        this.twentyConfigService = twentyConfigService;
        this.workspaceRepository = workspaceRepository;
        this.billingSubscriptionRepository = billingSubscriptionRepository;
        this.logger = new _common.Logger(BillingGaugeService.name);
    }
};
BillingGaugeService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_billingsubscriptionentity.BillingSubscriptionEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], BillingGaugeService);

//# sourceMappingURL=billing-gauge.service.js.map