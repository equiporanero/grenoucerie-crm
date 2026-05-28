"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OnboardingResolver", {
    enumerable: true,
    get: function() {
        return OnboardingResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _onboardingstepsuccessdto = require("./dtos/onboarding-step-success.dto");
const _onboardingservice = require("./onboarding.service");
const _workspaceentity = require("../workspace/workspace.entity");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _userauthguard = require("../../guards/user-auth.guard");
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
let OnboardingResolver = class OnboardingResolver {
    async skipSyncEmailOnboardingStep(user, workspace) {
        await this.onboardingService.setOnboardingConnectAccountPending({
            userId: user.id,
            workspaceId: workspace.id,
            value: false
        });
        return {
            success: true
        };
    }
    async skipBookOnboardingStep(workspace) {
        await this.onboardingService.setOnboardingBookOnboardingPending({
            workspaceId: workspace.id,
            value: false
        });
        return {
            success: true
        };
    }
    constructor(onboardingService){
        this.onboardingService = onboardingService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_onboardingstepsuccessdto.OnboardingStepSuccessDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authuserdecorator.AuthUser)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], OnboardingResolver.prototype, "skipSyncEmailOnboardingStep", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_onboardingstepsuccessdto.OnboardingStepSuccessDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], OnboardingResolver.prototype, "skipBookOnboardingStep", null);
OnboardingResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _onboardingservice.OnboardingService === "undefined" ? Object : _onboardingservice.OnboardingService
    ])
], OnboardingResolver);

//# sourceMappingURL=onboarding.resolver.js.map