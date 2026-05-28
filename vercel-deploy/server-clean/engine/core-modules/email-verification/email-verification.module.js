"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailVerificationModule", {
    enumerable: true,
    get: function() {
        return EmailVerificationModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _apptokenentity = require("../app-token/app-token.entity");
const _emailverificationtokenservice = require("../auth/token/services/email-verification-token.service");
const _domainserverconfigmodule = require("../domain/domain-server-config/domain-server-config.module");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _emailverificationresolver = require("./email-verification.resolver");
const _emailverificationservice = require("./services/email-verification.service");
const _emailmodule = require("../email/email.module");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
const _userworkspacemodule = require("../user-workspace/user-workspace.module");
const _userentity = require("../user/user.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EmailVerificationModule = class EmailVerificationModule {
};
EmailVerificationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _apptokenentity.AppTokenEntity,
                _userentity.UserEntity
            ]),
            _emailmodule.EmailModule,
            _twentyconfigmodule.TwentyConfigModule,
            _userworkspacemodule.UserWorkspaceModule,
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _domainserverconfigmodule.DomainServerConfigModule
        ],
        providers: [
            _emailverificationservice.EmailVerificationService,
            _emailverificationresolver.EmailVerificationResolver,
            _emailverificationtokenservice.EmailVerificationTokenService
        ],
        exports: [
            _emailverificationservice.EmailVerificationService,
            _emailverificationtokenservice.EmailVerificationTokenService
        ]
    })
], EmailVerificationModule);

//# sourceMappingURL=email-verification.module.js.map