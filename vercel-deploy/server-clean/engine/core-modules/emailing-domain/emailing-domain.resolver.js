"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailingDomainResolver", {
    enumerable: true,
    get: function() {
        return EmailingDomainResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _emailingdomaindrivertype = require("./drivers/types/emailing-domain-driver.type");
const _emailingdomaindto = require("./dtos/emailing-domain.dto");
const _sendemailviadomainoutputdto = require("./dtos/send-email-via-domain-output.dto");
const _sendemailviadomaininput = require("./dtos/send-email-via-domain.input");
const _emailingdomainservice = require("./services/emailing-domain.service");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _featureflagguard = require("../../guards/feature-flag.guard");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
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
let EmailingDomainResolver = class EmailingDomainResolver {
    async createEmailingDomain(domain, driver, currentWorkspace) {
        const emailingDomain = await this.emailingDomainService.createEmailingDomain(domain, driver, currentWorkspace);
        return emailingDomain;
    }
    async deleteEmailingDomain(id, currentWorkspace) {
        await this.emailingDomainService.deleteEmailingDomain(currentWorkspace, id);
        return true;
    }
    async verifyEmailingDomain(id, currentWorkspace) {
        const emailingDomain = await this.emailingDomainService.verifyEmailingDomain(currentWorkspace, id);
        return emailingDomain;
    }
    async sendEmailViaEmailingDomain(input, currentWorkspace) {
        const { emailingDomainId, ...content } = input;
        const result = await this.emailingDomainService.sendEmail(currentWorkspace.id, emailingDomainId, content);
        return {
            messageId: result.messageId
        };
    }
    async getEmailingDomains(currentWorkspace) {
        const emailingDomains = await this.emailingDomainService.getEmailingDomains(currentWorkspace);
        return emailingDomains;
    }
    constructor(emailingDomainService){
        this.emailingDomainService = emailingDomainService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_emailingdomaindto.EmailingDomainDTO),
    (0, _featureflagguard.RequireFeatureFlag)(_types.FeatureFlagKey.IS_EMAIL_GROUP_ENABLED),
    _ts_param(0, (0, _graphql.Args)('domain')),
    _ts_param(1, (0, _graphql.Args)('driver')),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _emailingdomaindrivertype.EmailingDomainDriver === "undefined" ? Object : _emailingdomaindrivertype.EmailingDomainDriver,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], EmailingDomainResolver.prototype, "createEmailingDomain", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _featureflagguard.RequireFeatureFlag)(_types.FeatureFlagKey.IS_EMAIL_GROUP_ENABLED),
    _ts_param(0, (0, _graphql.Args)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], EmailingDomainResolver.prototype, "deleteEmailingDomain", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_emailingdomaindto.EmailingDomainDTO),
    (0, _featureflagguard.RequireFeatureFlag)(_types.FeatureFlagKey.IS_EMAIL_GROUP_ENABLED),
    _ts_param(0, (0, _graphql.Args)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], EmailingDomainResolver.prototype, "verifyEmailingDomain", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_sendemailviadomainoutputdto.SendEmailViaDomainOutputDTO),
    (0, _featureflagguard.RequireFeatureFlag)(_types.FeatureFlagKey.IS_EMAIL_GROUP_ENABLED),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _sendemailviadomaininput.SendEmailViaDomainInput === "undefined" ? Object : _sendemailviadomaininput.SendEmailViaDomainInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], EmailingDomainResolver.prototype, "sendEmailViaEmailingDomain", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _emailingdomaindto.EmailingDomainDTO
        ]),
    (0, _featureflagguard.RequireFeatureFlag)(_types.FeatureFlagKey.IS_EMAIL_GROUP_ENABLED),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], EmailingDomainResolver.prototype, "getEmailingDomains", null);
EmailingDomainResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _featureflagguard.FeatureFlagGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE)),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_emailingdomaindto.EmailingDomainDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _emailingdomainservice.EmailingDomainService === "undefined" ? Object : _emailingdomainservice.EmailingDomainService
    ])
], EmailingDomainResolver);

//# sourceMappingURL=emailing-domain.resolver.js.map