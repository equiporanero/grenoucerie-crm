"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceResolver", {
    enumerable: true,
    get: function() {
        return WorkspaceResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _assert = /*#__PURE__*/ _interop_require_default(require("assert"));
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _applicationservice = require("../application/application.service");
const _applicationdto = require("../application/dtos/application.dto");
const _fromflatapplicationtoapplicationdtoutil = require("../application/utils/from-flat-application-to-application-dto.util");
const _billingentitlementdto = require("../billing/dtos/billing-entitlement.dto");
const _billingsubscriptionentity = require("../billing/entities/billing-subscription.entity");
const _billingsubscriptionservice = require("../billing/services/billing-subscription.service");
const _domainvalidrecords = require("../dns-manager/dtos/domain-valid-records");
const _dnsmanagerservice = require("../dns-manager/services/dns-manager.service");
const _customdomainmanagerservice = require("../domain/custom-domain-manager/services/custom-domain-manager.service");
const _workspacedomainsservice = require("../domain/workspace-domains/services/workspace-domains.service");
const _enterpriseplanservice = require("../enterprise/services/enterprise-plan.service");
const _featureflagdto = require("../feature-flag/dtos/feature-flag.dto");
const _featureflagservice = require("../feature-flag/services/feature-flag.service");
const _fileurlservice = require("../file/file-url/file-url.service");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
const _userworkspaceservice = require("../user-workspace/user-workspace.service");
const _activateworkspaceinput = require("./dtos/activate-workspace-input");
const _publicworkspacedatadto = require("./dtos/public-workspace-data.dto");
const _updateworkspaceinput = require("./dtos/update-workspace-input");
const _workspaceurlsdto = require("./dtos/workspace-urls.dto");
const _workspaceservice = require("./services/workspace.service");
const _getauthbypassprovidersbyworkspaceutil = require("./utils/get-auth-bypass-providers-by-workspace.util");
const _getauthprovidersbyworkspaceutil = require("./utils/get-auth-providers-by-workspace.util");
const _workspacegraphqlapiexceptionhandlerutil = require("./utils/workspace-graphql-api-exception-handler.util");
const _workspaceentity = require("./workspace.entity");
const _workspaceexception = require("./workspace.exception");
const _authapikeydecorator = require("../../decorators/auth/auth-api-key.decorator");
const _authuserworkspaceiddecorator = require("../../decorators/auth/auth-user-workspace-id.decorator");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _custompermissionguard = require("../../guards/custom-permission.guard");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _publicendpointguard = require("../../guards/public-endpoint.guard");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _roledto = require("../../metadata-modules/role/dtos/role.dto");
const _roleservice = require("../../metadata-modules/role/role.service");
const _fromRoleEntityToRoleDtoutil = require("../../metadata-modules/role/utils/fromRoleEntityToRoleDto.util");
const _viewdto = require("../../metadata-modules/view/dtos/view.dto");
const _viewservice = require("../../metadata-modules/view/services/view.service");
const _extractrequest = require("../../../utils/extract-request");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const OriginHeader = (0, _common.createParamDecorator)((_, ctx)=>{
    const request = (0, _extractrequest.getRequest)(ctx);
    return request.headers['origin'];
});
let WorkspaceResolver = class WorkspaceResolver {
    async currentWorkspace({ id }) {
        const workspace = await this.workspaceService.findById(id);
        (0, _assert.default)(workspace, 'Workspace not found');
        return workspace;
    }
    async activateWorkspace(data, user, workspace) {
        return await this.workspaceService.activateWorkspace(user, workspace, data);
    }
    async updateWorkspace(data, workspace, userWorkspaceId, apiKey) {
        try {
            return await this.workspaceService.updateWorkspaceById({
                payload: {
                    ...data,
                    id: workspace.id
                },
                userWorkspaceId,
                apiKey
            });
        } catch (error) {
            (0, _workspacegraphqlapiexceptionhandlerutil.workspaceGraphqlApiExceptionHandler)(error);
        }
    }
    async routerModel(_workspace) {
        return 'auto';
    }
    async featureFlags(workspace) {
        const featureFlags = await this.featureFlagService.getWorkspaceFeatureFlags(workspace.id);
        return featureFlags.filter((flag)=>Object.values(_types.FeatureFlagKey).includes(flag.key));
    }
    async deleteCurrentWorkspace({ id }) {
        await this.workspaceService.suspendWorkspace(id);
        return this.workspaceService.deleteWorkspace(id, true);
    }
    async billingSubscriptions(workspace) {
        if (!this.twentyConfigService.isBillingEnabled()) {
            return [];
        }
        try {
            return this.billingSubscriptionService.getBillingSubscriptions(workspace.id);
        } catch (error) {
            (0, _workspacegraphqlapiexceptionhandlerutil.workspaceGraphqlApiExceptionHandler)(error);
        }
    }
    async defaultRole(workspace) {
        if (!workspace.defaultRoleId) {
            return null;
        }
        const defaultRoleEntity = await this.roleService.getRoleById(workspace.defaultRoleId, workspace.id);
        return (0, _utils.isDefined)(defaultRoleEntity) ? (0, _fromRoleEntityToRoleDtoutil.fromRoleEntityToRoleDto)(defaultRoleEntity) : null;
    }
    async fastModel(workspace) {
        return workspace.fastModel;
    }
    async smartModel(workspace) {
        return workspace.smartModel;
    }
    async enabledAiModelIds(workspace) {
        return workspace.enabledAiModelIds;
    }
    async useRecommendedModels(workspace) {
        return workspace.useRecommendedModels;
    }
    async workspaceCustomApplication(workspace) {
        try {
            const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
                workspace
            });
            return (0, _fromflatapplicationtoapplicationdtoutil.fromFlatApplicationToApplicationDto)(workspaceCustomFlatApplication);
        } catch  {
            // Temporary should be removed after CreateWorkspaceCustomApplicationCommand is run
            return null;
        }
    }
    async installedApplications(workspace) {
        const flatApplications = await this.applicationService.findManyInstalledFlatApplications(workspace.id);
        return flatApplications.map(_fromflatapplicationtoapplicationdtoutil.fromFlatApplicationToApplicationDto);
    }
    async currentBillingSubscription(workspace) {
        if (!this.twentyConfigService.isBillingEnabled()) {
            return;
        }
        return this.billingSubscriptionService.getCurrentBillingSubscription({
            workspaceId: workspace.id
        });
    }
    async workspaceMembersCount(workspace) {
        return await this.userWorkspaceService.getUserCount(workspace.id);
    }
    async logo(workspace) {
        if (!(0, _utils.isDefined)(workspace.logoFileId)) {
            return '';
        }
        return this.fileUrlService.signFileByIdUrl({
            fileId: workspace.logoFileId,
            workspaceId: workspace.id,
            fileFolder: _types.FileFolder.CorePicture
        });
    }
    billingEntitlements(workspace) {
        return this.billingSubscriptionService.getWorkspaceEntitlements(workspace.id);
    }
    hasValidEnterpriseKey() {
        return this.enterprisePlanService.hasValidSignedEnterpriseKey();
    }
    hasValidSignedEnterpriseKey() {
        return this.enterprisePlanService.hasValidSignedEnterpriseKey();
    }
    hasValidEnterpriseValidityToken() {
        return this.enterprisePlanService.hasValidEnterpriseValidityToken();
    }
    workspaceUrls(workspace) {
        return this.workspaceDomainsService.getWorkspaceUrls(workspace);
    }
    isGoogleAuthEnabled(workspace) {
        return workspace.isGoogleAuthEnabled && this.twentyConfigService.get('AUTH_GOOGLE_ENABLED');
    }
    workspaceCustomApplicationId(workspace) {
        return workspace.workspaceCustomApplicationId;
    }
    isMicrosoftAuthEnabled(workspace) {
        return workspace.isMicrosoftAuthEnabled && this.twentyConfigService.get('AUTH_MICROSOFT_ENABLED');
    }
    isPasswordAuthEnabled(workspace) {
        return workspace.isPasswordAuthEnabled && this.twentyConfigService.get('AUTH_PASSWORD_ENABLED');
    }
    async views(workspace, userWorkspaceId) {
        return this.viewService.findByWorkspaceId(workspace.id, userWorkspaceId);
    }
    async getPublicWorkspaceDataByDomain(originHeader, origin) {
        try {
            const systemEnabledProviders = {
                google: this.twentyConfigService.get('AUTH_GOOGLE_ENABLED'),
                magicLink: false,
                password: this.twentyConfigService.get('AUTH_PASSWORD_ENABLED'),
                microsoft: this.twentyConfigService.get('AUTH_MICROSOFT_ENABLED'),
                sso: []
            };
            if (!origin) {
                return {
                    id: 'default-workspace',
                    logo: '',
                    displayName: 'Default Workspace',
                    workspaceUrls: {
                        subdomainUrl: originHeader,
                        customUrl: originHeader
                    },
                    authProviders: systemEnabledProviders
                };
            }
            const workspace = await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(origin);
            (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
            let workspaceLogoWithToken = '';
            if ((0, _utils.isDefined)(workspace.logoFileId)) {
                workspaceLogoWithToken = await this.fileUrlService.signFileByIdUrl({
                    fileId: workspace.logoFileId,
                    workspaceId: workspace.id,
                    fileFolder: _types.FileFolder.CorePicture
                });
            }
            return {
                id: workspace.id,
                logo: workspaceLogoWithToken,
                displayName: workspace.displayName,
                workspaceUrls: this.workspaceDomainsService.getWorkspaceUrls(workspace),
                authProviders: (0, _getauthprovidersbyworkspaceutil.getAuthProvidersByWorkspace)({
                    workspace,
                    systemEnabledProviders
                }),
                authBypassProviders: (0, _getauthbypassprovidersbyworkspaceutil.getAuthBypassProvidersByWorkspace)({
                    workspace,
                    systemEnabledProviders
                })
            };
        } catch (err) {
            (0, _workspacegraphqlapiexceptionhandlerutil.workspaceGraphqlApiExceptionHandler)(err);
        }
    }
    async getPublicWorkspaceDataById(id) {
        try {
            const workspace = await this.workspaceService.findOneWorkspaceById(id);
            (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
            const logo = (0, _utils.isDefined)(workspace.logoFileId) ? await this.fileUrlService.signFileByIdUrl({
                fileId: workspace.logoFileId,
                workspaceId: workspace.id,
                fileFolder: _types.FileFolder.CorePicture
            }) : workspace.logo ?? '';
            return {
                id: workspace.id,
                logo,
                displayName: workspace.displayName
            };
        } catch (err) {
            (0, _workspacegraphqlapiexceptionhandlerutil.workspaceGraphqlApiExceptionHandler)(err);
        }
    }
    async checkCustomDomainValidRecords(workspace) {
        (0, _utils.assertIsDefinedOrThrow)(workspace.customDomain, new _workspaceexception.WorkspaceException(`Custom domain not found`, _workspaceexception.WorkspaceExceptionCode.CUSTOM_DOMAIN_NOT_FOUND));
        const domainValidRecords = await this.dnsManagerService.refreshHostname(workspace.customDomain);
        return this.customDomainManagerService.checkCustomDomainValidRecords(workspace, domainValidRecords);
    }
    constructor(workspaceService, workspaceDomainsService, userWorkspaceService, twentyConfigService, fileUrlService, billingSubscriptionService, featureFlagService, roleService, viewService, dnsManagerService, customDomainManagerService, applicationService, enterprisePlanService){
        this.workspaceService = workspaceService;
        this.workspaceDomainsService = workspaceDomainsService;
        this.userWorkspaceService = userWorkspaceService;
        this.twentyConfigService = twentyConfigService;
        this.fileUrlService = fileUrlService;
        this.billingSubscriptionService = billingSubscriptionService;
        this.featureFlagService = featureFlagService;
        this.roleService = roleService;
        this.viewService = viewService;
        this.dnsManagerService = dnsManagerService;
        this.customDomainManagerService = customDomainManagerService;
        this.applicationService = applicationService;
        this.enterprisePlanService = enterprisePlanService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_workspaceentity.WorkspaceEntity),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "currentWorkspace", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workspaceentity.WorkspaceEntity),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('data')),
    _ts_param(1, (0, _authuserdecorator.AuthUser)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _activateworkspaceinput.ActivateWorkspaceInput === "undefined" ? Object : _activateworkspaceinput.ActivateWorkspaceInput,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "activateWorkspace", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workspaceentity.WorkspaceEntity),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _custompermissionguard.CustomPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('data')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(3, (0, _authapikeydecorator.AuthApiKey)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateworkspaceinput.UpdateWorkspaceInput === "undefined" ? Object : _updateworkspaceinput.UpdateWorkspaceInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "updateWorkspace", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "routerModel", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _featureflagdto.FeatureFlagDTO
        ], {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "featureFlags", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_workspaceentity.WorkspaceEntity),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "deleteCurrentWorkspace", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _billingsubscriptionentity.BillingSubscriptionEntity
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "billingSubscriptions", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_roledto.RoleDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "defaultRole", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "fastModel", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "smartModel", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            String
        ], {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "enabledAiModelIds", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean, {
        nullable: false
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "useRecommendedModels", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_applicationdto.ApplicationDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "workspaceCustomApplication", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _applicationdto.ApplicationDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "installedApplications", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_billingsubscriptionentity.BillingSubscriptionEntity, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "currentBillingSubscription", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Number),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "workspaceMembersCount", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "logo", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _billingentitlementdto.BillingEntitlementDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkspaceResolver.prototype, "billingEntitlements", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], WorkspaceResolver.prototype, "hasValidEnterpriseKey", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], WorkspaceResolver.prototype, "hasValidSignedEnterpriseKey", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Boolean)
], WorkspaceResolver.prototype, "hasValidEnterpriseValidityToken", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_workspaceurlsdto.WorkspaceUrlsDTO),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkspaceResolver.prototype, "workspaceUrls", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkspaceResolver.prototype, "isGoogleAuthEnabled", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkspaceResolver.prototype, "workspaceCustomApplicationId", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkspaceResolver.prototype, "isMicrosoftAuthEnabled", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", void 0)
], WorkspaceResolver.prototype, "isPasswordAuthEnabled", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _viewdto.ViewDTO
        ]),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "views", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_publicworkspacedatadto.PublicWorkspaceDataDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, OriginHeader()),
    _ts_param(1, (0, _graphql.Args)('origin', {
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "getPublicWorkspaceDataByDomain", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_publicworkspacedatadto.PublicWorkspaceDataSummaryDTO),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)({
        name: 'id',
        type: ()=>_scalars.UUIDScalarType,
        nullable: false
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "getPublicWorkspaceDataById", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_domainvalidrecords.DomainValidRecords, {
        nullable: true
    }),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE)),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkspaceResolver.prototype, "checkCustomDomainValidRecords", null);
WorkspaceResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_workspaceentity.WorkspaceEntity),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceservice.WorkspaceService === "undefined" ? Object : _workspaceservice.WorkspaceService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService,
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService,
        typeof _roleservice.RoleService === "undefined" ? Object : _roleservice.RoleService,
        typeof _viewservice.ViewService === "undefined" ? Object : _viewservice.ViewService,
        typeof _dnsmanagerservice.DnsManagerService === "undefined" ? Object : _dnsmanagerservice.DnsManagerService,
        typeof _customdomainmanagerservice.CustomDomainManagerService === "undefined" ? Object : _customdomainmanagerservice.CustomDomainManagerService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _enterpriseplanservice.EnterprisePlanService === "undefined" ? Object : _enterpriseplanservice.EnterprisePlanService
    ])
], WorkspaceResolver);

//# sourceMappingURL=workspace.resolver.js.map