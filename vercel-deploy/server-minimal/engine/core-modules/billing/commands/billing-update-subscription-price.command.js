/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingUpdateSubscriptionPriceCommand", {
    enumerable: true,
    get: function() {
        return BillingUpdateSubscriptionPriceCommand;
    }
});
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../../../database/commands/command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../../../database/commands/command-runners/workspace-iterator.service");
const _billingsubscriptionservice = require("../services/billing-subscription.service");
const _stripesubscriptionitemservice = require("../stripe/services/stripe-subscription-item.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingUpdateSubscriptionPriceCommand = class BillingUpdateSubscriptionPriceCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    parseStripePriceIdToMigrate(val) {
        this.stripePriceIdToUpdate = val;
        return val;
    }
    parseNewStripePriceId(val) {
        this.newStripePriceId = val;
        return val;
    }
    parseClearUsage() {
        this.clearUsage = true;
    }
    async runOnWorkspace({ workspaceId, options }) {
        const subscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId
        });
        const subscriptionItemToUpdate = subscription.billingSubscriptionItems.find((item)=>item.stripePriceId === this.stripePriceIdToUpdate);
        if (!(0, _utils.isDefined)(subscriptionItemToUpdate)) {
            this.logger.log(`No price to update for workspace ${workspaceId}`);
            return;
        }
        if (!options.dryRun) {
            await this.stripeSubscriptionItemService.deleteSubscriptionItem(subscriptionItemToUpdate.stripeSubscriptionItemId, this.clearUsage);
            await this.stripeSubscriptionItemService.createSubscriptionItem(subscription.stripeSubscriptionId, this.newStripePriceId, (0, _utils.isDefined)(subscriptionItemToUpdate.quantity) ? subscriptionItemToUpdate.quantity : undefined);
        }
        this.logger.log(`Update subscription replacing price ${subscriptionItemToUpdate.stripePriceId} by ${this.newStripePriceId} with clear usage ${this.clearUsage} - workspace ${workspaceId}`);
    }
    constructor(workspaceIteratorService, billingSubscriptionService, stripeSubscriptionItemService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.billingSubscriptionService = billingSubscriptionService, this.stripeSubscriptionItemService = stripeSubscriptionItemService, this.clearUsage = false;
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--price-to-update-id [stripe_price_id]',
        description: 'Stripe price id to update',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], BillingUpdateSubscriptionPriceCommand.prototype, "parseStripePriceIdToMigrate", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--new-price-id [stripe_price_id]',
        description: 'New Stripe price id',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], BillingUpdateSubscriptionPriceCommand.prototype, "parseNewStripePriceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '--clear-usage',
        description: 'Clear usage on subscription item',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], BillingUpdateSubscriptionPriceCommand.prototype, "parseClearUsage", null);
BillingUpdateSubscriptionPriceCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'billing:update-subscription-price',
        description: 'Update subscription price'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _stripesubscriptionitemservice.StripeSubscriptionItemService === "undefined" ? Object : _stripesubscriptionitemservice.StripeSubscriptionItemService
    ])
], BillingUpdateSubscriptionPriceCommand);

//# sourceMappingURL=billing-update-subscription-price.command.js.map