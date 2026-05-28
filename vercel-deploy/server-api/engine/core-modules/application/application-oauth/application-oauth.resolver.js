"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationOAuthResolver", {
    enumerable: true,
    get: function() {
        return ApplicationOAuthResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _applicationexception = require("../application.exception");
const _applicationtokenpairdto = require("./dtos/application-token-pair.dto");
const _authgraphqlapiexceptionfilter = require("../../auth/filters/auth-graphql-api-exception.filter");
const _applicationtokenservice = require("../../auth/token/services/application-token.service");
const _resolvervalidationpipe = require("../../graphql/pipes/resolver-validation.pipe");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
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
let ApplicationOAuthResolver = class ApplicationOAuthResolver {
    async renewApplicationToken(applicationRefreshToken, { id: workspaceId }) {
        const applicationRefreshTokenPayload = await this.applicationTokenService.validateApplicationRefreshToken(applicationRefreshToken);
        if (applicationRefreshTokenPayload.workspaceId !== workspaceId) {
            throw new _applicationexception.ApplicationException('Refresh token workspace does not match authenticated workspace', _applicationexception.ApplicationExceptionCode.FORBIDDEN);
        }
        return this.applicationTokenService.renewApplicationTokens(applicationRefreshTokenPayload);
    }
    constructor(applicationTokenService){
        this.applicationTokenService = applicationTokenService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_applicationtokenpairdto.ApplicationTokenPairDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('applicationRefreshToken')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationOAuthResolver.prototype, "renewApplicationToken", null);
ApplicationOAuthResolver = _ts_decorate([
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationtokenservice.ApplicationTokenService === "undefined" ? Object : _applicationtokenservice.ApplicationTokenService
    ])
], ApplicationOAuthResolver);

//# sourceMappingURL=application-oauth.resolver.js.map