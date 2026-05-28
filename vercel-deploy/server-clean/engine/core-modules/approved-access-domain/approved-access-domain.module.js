"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApprovedAccessDomainModule", {
    enumerable: true,
    get: function() {
        return ApprovedAccessDomainModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _approvedaccessdomainentity = require("./approved-access-domain.entity");
const _approvedaccessdomainresolver = require("./approved-access-domain.resolver");
const _approvedaccessdomainservice = require("./services/approved-access-domain.service");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _filemodule = require("../file/file.module");
const _jwtmodule = require("../jwt/jwt.module");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApprovedAccessDomainModule = class ApprovedAccessDomainModule {
};
ApprovedAccessDomainModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _filemodule.FileModule,
            _jwtmodule.JwtModule,
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _approvedaccessdomainentity.ApprovedAccessDomainEntity
            ]),
            _permissionsmodule.PermissionsModule
        ],
        exports: [
            _approvedaccessdomainservice.ApprovedAccessDomainService
        ],
        providers: [
            _approvedaccessdomainservice.ApprovedAccessDomainService,
            _approvedaccessdomainresolver.ApprovedAccessDomainResolver,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_approvedaccessdomainentity.ApprovedAccessDomainEntity)
        ]
    })
], ApprovedAccessDomainModule);

//# sourceMappingURL=approved-access-domain.module.js.map