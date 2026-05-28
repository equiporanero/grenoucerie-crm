/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingUsageCapService", {
    enumerable: true,
    get: function() {
        return BillingUsageCapService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _clickHouseservice = require("../../../../database/clickHouse/clickHouse.service");
const _clickHouseutil = require("../../../../database/clickHouse/clickHouse.util");
const _billingexception = require("../billing.exception");
const _billingsubscriptionitementity = require("../entities/billing-subscription-item.entity");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
const _billingsubscriptionstatusenum = require("../enums/billing-subscription-status.enum");
const _resourcecreditservice = require("./resource-credit.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _typeorm1 = require("typeorm");
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
let BillingUsageCapService = class BillingUsageCapService {
    isClickHouseEnabled() {
        return Boolean(this.twentyConfigService.get('CLICKHOUSE_URL'));
    }
    async getBatchPeriodCreditsUsed(workspaceIds, periodStart) {
        const result = new Map();
        if (!this.isClickHouseEnabled() || workspaceIds.length === 0) {
            return result;
        }
        const query = `
      SELECT workspaceId, sum(creditsUsedMicro) AS total
      FROM usageEvent
      WHERE workspaceId IN {workspaceIds:Array(String)}
        AND periodStart = {periodStart:Date}
      GROUP BY workspaceId
    `;
        const rows = await this.clickHouseService.select(query, {
            workspaceIds,
            periodStart: (0, _clickHouseutil.formatDateForClickHouse)(periodStart)
        });
        for (const row of rows){
            const rawTotal = row.total ?? 0;
            const total = typeof rawTotal === 'string' ? Number(rawTotal) : rawTotal;
            result.set(row.workspaceId, Number.isFinite(total) ? total : 0);
        }
        return result;
    }
    async setSubscriptionItemHasReachedCap(workspaceId, hasReachedCap) {
        const billingSubscriptionItems = await this.billingSubscriptionItemRepository.find({
            where: {
                billingSubscription: {
                    workspaceId,
                    status: (0, _typeorm1.Not)(_billingsubscriptionstatusenum.SubscriptionStatus.Canceled)
                },
                billingProduct: {
                    metadata: (0, _typeorm1.Raw)((alias)=>`${alias} @> :metadata::jsonb`, {
                        metadata: JSON.stringify({
                            productKey: _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT
                        })
                    })
                }
            }
        });
        if (billingSubscriptionItems.length !== 1) {
            throw new _billingexception.BillingException(`Expected 1 billing subscription item for workspace ${workspaceId}, but got ${billingSubscriptionItems.length}`, _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_ITEM_NOT_FOUND);
        }
        await this.billingSubscriptionItemRepository.update({
            id: billingSubscriptionItems[0].id
        }, {
            hasReachedCurrentPeriodCap: hasReachedCap
        });
    }
    constructor(clickHouseService, resourceCreditService, twentyConfigService, billingSubscriptionItemRepository){
        this.clickHouseService = clickHouseService;
        this.resourceCreditService = resourceCreditService;
        this.twentyConfigService = twentyConfigService;
        this.billingSubscriptionItemRepository = billingSubscriptionItemRepository;
    }
};
BillingUsageCapService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(3, (0, _typeorm.InjectRepository)(_billingsubscriptionitementity.BillingSubscriptionItemEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _clickHouseservice.ClickHouseService === "undefined" ? Object : _clickHouseservice.ClickHouseService,
        typeof _resourcecreditservice.ResourceCreditService === "undefined" ? Object : _resourcecreditservice.ResourceCreditService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], BillingUsageCapService);

//# sourceMappingURL=billing-usage-cap.service.js.map