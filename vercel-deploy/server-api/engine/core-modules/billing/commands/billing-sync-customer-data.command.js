/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingSyncCustomerDataCommand", {
    enumerable: true,
    get: function() {
        return BillingSyncCustomerDataCommand;
    }
});
const _chalk = /*#__PURE__*/ _interop_require_default(require("chalk"));
const _nestcommander = require("nest-commander");
const _activeorsuspendedworkspacecommandrunner = require("../../../../database/commands/command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../../../database/commands/command-runners/workspace-iterator.service");
const _billingcustomerentity = require("../entities/billing-customer.entity");
const _stripesubscriptionservice = require("../stripe/services/stripe-subscription.service");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
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
let BillingSyncCustomerDataCommand = class BillingSyncCustomerDataCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, options }) {
        const billingCustomer = await this.billingCustomerRepository.findOne(workspaceId, {
            where: {}
        });
        if (!options.dryRun && !billingCustomer) {
            const stripeCustomerId = await this.stripeSubscriptionService.getStripeCustomerIdFromWorkspaceId(workspaceId);
            if (typeof stripeCustomerId === 'string') {
                await this.billingCustomerRepository.upsert(workspaceId, {
                    stripeCustomerId
                }, {
                    conflictPaths: [
                        'workspaceId'
                    ]
                });
            }
        }
        if (options.verbose) {
            this.logger.log(_chalk.default.yellow(`Added ${workspaceId} to billingCustomer table`));
        }
    }
    constructor(workspaceIteratorService, stripeSubscriptionService, billingCustomerRepository){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.stripeSubscriptionService = stripeSubscriptionService, this.billingCustomerRepository = billingCustomerRepository;
    }
};
BillingSyncCustomerDataCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'billing:sync-customer-data',
        description: 'Sync customer data from Stripe for all active workspaces'
    }),
    _ts_param(2, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingcustomerentity.BillingCustomerEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _stripesubscriptionservice.StripeSubscriptionService === "undefined" ? Object : _stripesubscriptionservice.StripeSubscriptionService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], BillingSyncCustomerDataCommand);

//# sourceMappingURL=billing-sync-customer-data.command.js.map