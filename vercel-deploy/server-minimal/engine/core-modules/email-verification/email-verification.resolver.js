"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailVerificationResolver", {
    enumerable: true,
    get: function() {
        return EmailVerificationResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _workspacedomainsservice = require("../domain/workspace-domains/services/workspace-domains.service");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _resendemailverificationtokeninput = require("./dtos/resend-email-verification-token.input");
const _resendemailverificationtokendto = require("./dtos/resend-email-verification-token.dto");
const _emailverificationexceptionfilterutil = require("./email-verification-exception-filter.util");
const _emailverificationservice = require("./services/email-verification.service");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _i18ncontexttype = require("../i18n/types/i18n-context.type");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _publicendpointguard = require("../../guards/public-endpoint.guard");
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
let EmailVerificationResolver = class EmailVerificationResolver {
    // TODO: this should be an authenticated endpoint
    async resendEmailVerificationToken(resendEmailVerificationTokenInput, origin, context) {
        const workspace = await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(origin);
        return await this.emailVerificationService.resendEmailVerificationToken(resendEmailVerificationTokenInput.email, workspace, context.req.locale);
    }
    constructor(emailVerificationService, workspaceDomainsService){
        this.emailVerificationService = emailVerificationService;
        this.workspaceDomainsService = workspaceDomainsService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_resendemailverificationtokendto.ResendEmailVerificationTokenDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _graphql.Args)('origin')),
    _ts_param(2, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _resendemailverificationtokeninput.ResendEmailVerificationTokenInput === "undefined" ? Object : _resendemailverificationtokeninput.ResendEmailVerificationTokenInput,
        String,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], EmailVerificationResolver.prototype, "resendEmailVerificationToken", null);
EmailVerificationResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_emailverificationexceptionfilterutil.EmailVerificationExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _emailverificationservice.EmailVerificationService === "undefined" ? Object : _emailverificationservice.EmailVerificationService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService
    ])
], EmailVerificationResolver);

//# sourceMappingURL=email-verification.resolver.js.map