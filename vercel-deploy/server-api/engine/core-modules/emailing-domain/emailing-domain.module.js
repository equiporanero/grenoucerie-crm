"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailingDomainModule", {
    enumerable: true,
    get: function() {
        return EmailingDomainModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _typeormmodule = require("../../../database/typeorm/typeorm.module");
const _awssesclientprovider = require("./drivers/aws-ses/providers/aws-ses-client.provider");
const _awssesregisterdomainservice = require("./drivers/aws-ses/services/aws-ses-register-domain.service");
const _awsseshandleerrorservice = require("./drivers/aws-ses/services/aws-ses-handle-error.service");
const _awssessendemailservice = require("./drivers/aws-ses/services/aws-ses-send-email.service");
const _emailingdomaindriverfactory = require("./drivers/emailing-domain-driver.factory");
const _emailingdomainentity = require("./emailing-domain.entity");
const _emailingdomainresolver = require("./emailing-domain.resolver");
const _emailingdomainworkspacecleanupjob = require("./jobs/emailing-domain-workspace-cleanup.job");
const _emailingdomaintenantstatusservice = require("./services/emailing-domain-tenant-status.service");
const _emailingdomainservice = require("./services/emailing-domain.service");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EmailingDomainModule = class EmailingDomainModule {
};
EmailingDomainModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeormmodule.TypeORMModule,
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _emailingdomainentity.EmailingDomainEntity
            ]),
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule
        ],
        exports: [
            _emailingdomainservice.EmailingDomainService,
            _emailingdomaintenantstatusservice.EmailingDomainTenantStatusService
        ],
        providers: [
            _emailingdomainservice.EmailingDomainService,
            _emailingdomaintenantstatusservice.EmailingDomainTenantStatusService,
            _emailingdomainresolver.EmailingDomainResolver,
            _emailingdomaindriverfactory.EmailingDomainDriverFactory,
            _emailingdomainworkspacecleanupjob.EmailingDomainWorkspaceCleanupJob,
            _awssesclientprovider.AwsSesClientProvider,
            _awsseshandleerrorservice.AwsSesHandleErrorService,
            _awssesregisterdomainservice.AwsSesRegisterDomainService,
            _awssessendemailservice.AwsSesSendEmailService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_emailingdomainentity.EmailingDomainEntity)
        ]
    })
], EmailingDomainModule);

//# sourceMappingURL=emailing-domain.module.js.map