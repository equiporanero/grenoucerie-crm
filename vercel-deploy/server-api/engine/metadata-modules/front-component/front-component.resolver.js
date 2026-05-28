"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FrontComponentResolver", {
    enumerable: true,
    get: function() {
        return FrontComponentResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _applicationtokenservice = require("../../core-modules/auth/token/services/application-token.service");
const _authuserworkspaceiddecorator = require("../../decorators/auth/auth-user-workspace-id.decorator");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _userauthguard = require("../../guards/user-auth.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _fromflatfrontcomponenttofrontcomponentdtoutil = require("../flat-front-component/utils/from-flat-front-component-to-front-component-dto.util");
const _createfrontcomponentinput = require("./dtos/create-front-component.input");
const _frontcomponentdto = require("./dtos/front-component.dto");
const _updatefrontcomponentinput = require("./dtos/update-front-component.input");
const _frontcomponentservice = require("./front-component.service");
const _frontcomponentgraphqlapiexceptioninterceptor = require("./interceptors/front-component-graphql-api-exception.interceptor");
const _stripsecretfromapplicationvariables = require("./utils/strip-secret-from-application-variables");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
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
let FrontComponentResolver = class FrontComponentResolver {
    async frontComponents(workspace) {
        return await this.frontComponentService.findAll(workspace.id);
    }
    async frontComponent(id, workspace, user, userWorkspaceId) {
        const dto = await this.frontComponentService.findById(id, workspace.id);
        if (!dto) {
            return null;
        }
        const tokenPair = await this.applicationTokenService.generateApplicationTokenPair({
            applicationId: dto.applicationId,
            workspaceId: workspace.id,
            userWorkspaceId,
            userId: user.id
        });
        const { applicationVariableMaps } = await this.workspaceCacheService.getOrRecompute(workspace.id, [
            'applicationVariableMaps'
        ]);
        const variableUniversalIdentifiers = applicationVariableMaps.universalIdentifiersByApplicationId[dto.applicationId] ?? [];
        const flatApplicationVariables = variableUniversalIdentifiers.map((universalIdentifier)=>applicationVariableMaps.byUniversalIdentifier[universalIdentifier]).filter(_utils.isDefined);
        const applicationVariables = (0, _stripsecretfromapplicationvariables.stripSecretFromApplicationVariables)(flatApplicationVariables);
        return {
            ...dto,
            applicationTokenPair: tokenPair,
            applicationVariables
        };
    }
    async createFrontComponent(input, workspace) {
        const flatFrontComponent = await this.frontComponentService.createOne({
            input,
            workspaceId: workspace.id
        });
        return (0, _fromflatfrontcomponenttofrontcomponentdtoutil.fromFlatFrontComponentToFrontComponentDto)(flatFrontComponent);
    }
    async updateFrontComponent(input, workspace) {
        const flatFrontComponent = await this.frontComponentService.updateOne({
            id: input.id,
            update: input.update,
            workspaceId: workspace.id
        });
        return (0, _fromflatfrontcomponenttofrontcomponentdtoutil.fromFlatFrontComponentToFrontComponentDto)(flatFrontComponent);
    }
    async deleteFrontComponent(id, workspace) {
        const flatFrontComponent = await this.frontComponentService.destroyOne({
            id,
            workspaceId: workspace.id
        });
        return (0, _fromflatfrontcomponenttofrontcomponentdtoutil.fromFlatFrontComponentToFrontComponentDto)(flatFrontComponent);
    }
    constructor(frontComponentService, applicationTokenService, workspaceCacheService){
        this.frontComponentService = frontComponentService;
        this.applicationTokenService = applicationTokenService;
        this.workspaceCacheService = workspaceCacheService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _frontcomponentdto.FrontComponentDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FrontComponentResolver.prototype, "frontComponents", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_frontcomponentdto.FrontComponentDTO, {
        nullable: true
    }),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserdecorator.AuthUser)()),
    _ts_param(3, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], FrontComponentResolver.prototype, "frontComponent", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_frontcomponentdto.FrontComponentDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.APPLICATIONS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createfrontcomponentinput.CreateFrontComponentInput === "undefined" ? Object : _createfrontcomponentinput.CreateFrontComponentInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FrontComponentResolver.prototype, "createFrontComponent", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_frontcomponentdto.FrontComponentDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.APPLICATIONS)),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatefrontcomponentinput.UpdateFrontComponentInput === "undefined" ? Object : _updatefrontcomponentinput.UpdateFrontComponentInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FrontComponentResolver.prototype, "updateFrontComponent", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_frontcomponentdto.FrontComponentDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.APPLICATIONS)),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FrontComponentResolver.prototype, "deleteFrontComponent", null);
FrontComponentResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor, _frontcomponentgraphqlapiexceptioninterceptor.FrontComponentGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_frontcomponentdto.FrontComponentDTO),
    _ts_param(0, (0, _common.Inject)(_frontcomponentservice.FrontComponentService)),
    _ts_param(1, (0, _common.Inject)(_applicationtokenservice.ApplicationTokenService)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _frontcomponentservice.FrontComponentService === "undefined" ? Object : _frontcomponentservice.FrontComponentService,
        typeof _applicationtokenservice.ApplicationTokenService === "undefined" ? Object : _applicationtokenservice.ApplicationTokenService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], FrontComponentResolver);

//# sourceMappingURL=front-component.resolver.js.map