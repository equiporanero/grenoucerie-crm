"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PublicDomainModule", {
    enumerable: true,
    get: function() {
        return PublicDomainModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _applicationentity = require("../application/application.entity");
const _publicdomainservice = require("./public-domain.service");
const _publicdomainentity = require("./public-domain.entity");
const _publicdomainresolver = require("./public-domain.resolver");
const _dnsmanagermodule = require("../dns-manager/dns-manager.module");
const _workspaceentity = require("../workspace/workspace.entity");
const _checkpublicdomainsvalidrecordscroncommand = require("./crons/commands/check-public-domains-valid-records.cron.command");
const _checkpublicdomainsvalidrecordscronjob = require("./crons/jobs/check-public-domains-valid-records.cron.job");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PublicDomainModule = class PublicDomainModule {
};
PublicDomainModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _publicdomainentity.PublicDomainEntity,
                _workspaceentity.WorkspaceEntity,
                _applicationentity.ApplicationEntity
            ]),
            _dnsmanagermodule.DnsManagerModule,
            _permissionsmodule.PermissionsModule
        ],
        exports: [
            _checkpublicdomainsvalidrecordscroncommand.CheckPublicDomainsValidRecordsCronCommand,
            _publicdomainservice.PublicDomainService
        ],
        providers: [
            _publicdomainservice.PublicDomainService,
            _publicdomainresolver.PublicDomainResolver,
            _checkpublicdomainsvalidrecordscroncommand.CheckPublicDomainsValidRecordsCronCommand,
            _checkpublicdomainsvalidrecordscronjob.CheckPublicDomainsValidRecordsCronJob,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_publicdomainentity.PublicDomainEntity)
        ]
    })
], PublicDomainModule);

//# sourceMappingURL=public-domain.module.js.map