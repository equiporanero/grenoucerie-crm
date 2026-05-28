"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceCleanerModule", {
    enumerable: true,
    get: function() {
        return WorkspaceCleanerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _billingmodule = require("../../core-modules/billing/billing.module");
const _billingsubscriptionentity = require("../../core-modules/billing/entities/billing-subscription.entity");
const _emailmodule = require("../../core-modules/email/email.module");
const _metricsmodule = require("../../core-modules/metrics/metrics.module");
const _userworkspaceentity = require("../../core-modules/user-workspace/user-workspace.entity");
const _uservarsmodule = require("../../core-modules/user/user-vars/user-vars.module");
const _usermodule = require("../../core-modules/user/user.module");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _workspacemodule = require("../../core-modules/workspace/workspace.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _cleanonboardingworkspacescommand = require("./commands/clean-onboarding-workspaces.command");
const _cleanonboardingworkspacescroncommand = require("./commands/clean-onboarding-workspaces.cron.command");
const _cleansuspendedworkspacescommand = require("./commands/clean-suspended-workspaces.command");
const _cleansuspendedworkspacescroncommand = require("./commands/clean-suspended-workspaces.cron.command");
const _destroyworkspacecommand = require("./commands/destroy-workspace.command");
const _cleanerworkspaceservice = require("./services/cleaner.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceCleanerModule = class WorkspaceCleanerModule {
};
WorkspaceCleanerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _billingsubscriptionentity.BillingSubscriptionEntity
            ]),
            _workspacemodule.WorkspaceModule,
            _uservarsmodule.UserVarsModule,
            _usermodule.UserModule,
            _emailmodule.EmailModule,
            _billingmodule.BillingModule,
            _metricsmodule.MetricsModule
        ],
        providers: [
            _destroyworkspacecommand.DestroyWorkspaceCommand,
            _cleansuspendedworkspacescroncommand.CleanSuspendedWorkspacesCronCommand,
            _cleansuspendedworkspacescommand.CleanSuspendedWorkspacesCommand,
            _cleanonboardingworkspacescommand.CleanOnboardingWorkspacesCommand,
            _cleanonboardingworkspacescroncommand.CleanOnboardingWorkspacesCronCommand,
            _cleanerworkspaceservice.CleanerWorkspaceService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_billingsubscriptionentity.BillingSubscriptionEntity)
        ],
        exports: [
            _cleanerworkspaceservice.CleanerWorkspaceService,
            _cleansuspendedworkspacescroncommand.CleanSuspendedWorkspacesCronCommand,
            _cleanonboardingworkspacescroncommand.CleanOnboardingWorkspacesCronCommand
        ]
    })
], WorkspaceCleanerModule);

//# sourceMappingURL=workspace-cleaner.module.js.map