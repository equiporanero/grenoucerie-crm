"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImpersonationResolver", {
    enumerable: true,
    get: function() {
        return ImpersonationResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _impersonateinput = require("../admin-panel/dtos/impersonate.input");
const _impersonatedto = require("../admin-panel/dtos/impersonate.dto");
const _authexception = require("../auth/auth.exception");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _impersonationservice = require("./services/impersonation.service");
const _authuserworkspaceiddecorator = require("../../decorators/auth/auth-user-workspace-id.decorator");
const _custompermissionguard = require("../../guards/custom-permission.guard");
const _impersonatepermissionguard = require("../../guards/impersonate-permission.guard");
const _noimpersonationguard = require("../../guards/no-impersonation.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
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
let ImpersonationResolver = class ImpersonationResolver {
    async impersonate({ workspaceId, userId: toImpersonateUserId }, impersonatorUserWorkspaceId) {
        if (!impersonatorUserWorkspaceId) {
            throw new _authexception.AuthException('Impersonator user not found', _authexception.AuthExceptionCode.UNAUTHENTICATED);
        }
        return await this.impersonationService.impersonate(toImpersonateUserId, workspaceId, impersonatorUserWorkspaceId);
    }
    constructor(impersonationService){
        this.impersonationService = impersonationService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard, _noimpersonationguard.NoImpersonationGuard, _impersonatepermissionguard.ImpersonatePermissionGuard, _custompermissionguard.CustomPermissionGuard),
    (0, _graphql.Mutation)(()=>_impersonatedto.ImpersonateDTO),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _impersonateinput.ImpersonateInput === "undefined" ? Object : _impersonateinput.ImpersonateInput,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ImpersonationResolver.prototype, "impersonate", null);
ImpersonationResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _impersonationservice.ImpersonationService === "undefined" ? Object : _impersonationservice.ImpersonationService
    ])
], ImpersonationResolver);

//# sourceMappingURL=impersonation.resolver.js.map