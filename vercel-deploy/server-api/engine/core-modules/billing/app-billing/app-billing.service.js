/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppBillingService", {
    enumerable: true,
    get: function() {
        return AppBillingService;
    }
});
const _common = require("@nestjs/common");
const _billingservice = require("../services/billing.service");
const _usagerecordedconstant = require("../../usage/constants/usage-recorded.constant");
const _usageoperationtypeenum = require("../../usage/enums/usage-operation-type.enum");
const _usageresourcetypeenum = require("../../usage/enums/usage-resource-type.enum");
const _usageunitenum = require("../../usage/enums/usage-unit.enum");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _workspaceeventemitter = require("../../../workspace-event-emitter/workspace-event-emitter");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
// Each operation type has one canonical counting unit — matches how
// `ai-billing.service.ts` emits native usage events.
const USAGE_UNIT_BY_OPERATION_TYPE = {
    [_usageoperationtypeenum.UsageOperationType.AI_CHAT_TOKEN]: _usageunitenum.UsageUnit.TOKEN,
    [_usageoperationtypeenum.UsageOperationType.AI_WORKFLOW_TOKEN]: _usageunitenum.UsageUnit.TOKEN,
    [_usageoperationtypeenum.UsageOperationType.WORKFLOW_EXECUTION]: _usageunitenum.UsageUnit.INVOCATION,
    [_usageoperationtypeenum.UsageOperationType.CODE_EXECUTION]: _usageunitenum.UsageUnit.INVOCATION,
    [_usageoperationtypeenum.UsageOperationType.WEB_SEARCH]: _usageunitenum.UsageUnit.INVOCATION
};
let AppBillingService = class AppBillingService {
    async emitChargeEvent(params) {
        const { workspaceId, applicationId, userWorkspaceId, charge } = params;
        const unit = USAGE_UNIT_BY_OPERATION_TYPE[charge.operationType];
        this.logger.log(`App charge from applicationId=${applicationId} workspaceId=${workspaceId}: ` + `${charge.creditsUsedMicro} micro-credits (${charge.quantity} ${unit}, ${charge.operationType})`);
        let periodStart;
        if (this.billingService.isBillingEnabled()) {
            const { billingSubscription: { currentPeriodStart } } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
                'billingSubscription'
            ]);
            periodStart = currentPeriodStart;
        }
        this.workspaceEventEmitter.emitCustomBatchEvent(_usagerecordedconstant.USAGE_RECORDED, [
            {
                resourceType: _usageresourcetypeenum.UsageResourceType.APP,
                operationType: charge.operationType,
                creditsUsedMicro: charge.creditsUsedMicro,
                quantity: charge.quantity,
                unit,
                resourceId: applicationId,
                resourceContext: charge.resourceContext ?? null,
                userWorkspaceId: userWorkspaceId ?? null,
                periodStart
            }
        ], workspaceId);
    }
    constructor(workspaceEventEmitter, billingService, workspaceCacheService){
        this.workspaceEventEmitter = workspaceEventEmitter;
        this.billingService = billingService;
        this.workspaceCacheService = workspaceCacheService;
        this.logger = new _common.Logger(AppBillingService.name);
    }
};
AppBillingService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventemitter.WorkspaceEventEmitter === "undefined" ? Object : _workspaceeventemitter.WorkspaceEventEmitter,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], AppBillingService);

//# sourceMappingURL=app-billing.service.js.map