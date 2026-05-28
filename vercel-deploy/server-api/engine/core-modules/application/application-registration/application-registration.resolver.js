"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationResolver", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _GraphQLUpload = /*#__PURE__*/ _interop_require_default(require("graphql-upload/GraphQLUpload.mjs"));
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _applicationregistrationvariableentity = require("../application-registration-variable/application-registration-variable.entity");
const _applicationregistrationvariableservice = require("../application-registration-variable/application-registration-variable.service");
const _createapplicationregistrationvariableinput = require("../application-registration-variable/dtos/create-application-registration-variable.input");
const _updateapplicationregistrationvariableinput = require("../application-registration-variable/dtos/update-application-registration-variable.input");
const _applicationregistrationexceptionfilter = require("./application-registration-exception-filter");
const _applicationregistrationentity = require("./application-registration.entity");
const _applicationregistrationservice = require("./application-registration.service");
const _applicationtarballservice = require("./application-tarball.service");
const _applicationregistrationstatsdto = require("./dtos/application-registration-stats.dto");
const _createapplicationregistrationdto = require("./dtos/create-application-registration.dto");
const _createapplicationregistrationinput = require("./dtos/create-application-registration.input");
const _publicapplicationregistrationdto = require("./dtos/public-application-registration.dto");
const _rotateclientsecretdto = require("./dtos/rotate-client-secret.dto");
const _transferapplicationregistrationownershipinput = require("./dtos/transfer-application-registration-ownership.input");
const _updateapplicationregistrationinput = require("./dtos/update-application-registration.input");
const _applicationregistrationsourcetypeenum = require("./enums/application-registration-source-type.enum");
const _authgraphqlapiexceptionfilter = require("../../auth/filters/auth-graphql-api-exception.filter");
const _fileurlservice = require("../../file/file-url/file-url.service");
const _preventnesttoautologgraphqlerrorsfilter = require("../../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authuserdecorator = require("../../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../guards/public-endpoint.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _streamtobuffer = require("../../../../utils/stream-to-buffer");
const _applicationregistrationvariabledto = require("../application-registration-variable/dtos/application-registration-variable.dto");
const _applicationregistrationexception = require("./application-registration.exception");
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
let ApplicationRegistrationResolver = class ApplicationRegistrationResolver {
    async findApplicationRegistrationByClientId(clientId) {
        return this.applicationRegistrationService.findPublicByClientId(clientId);
    }
    async findApplicationRegistrationByUniversalIdentifier(universalIdentifier) {
        return this.applicationRegistrationService.findOneByUniversalIdentifier(universalIdentifier);
    }
    async findManyApplicationRegistrations({ id: workspaceId }) {
        return this.applicationRegistrationService.findMany(workspaceId);
    }
    async findOneApplicationRegistration(id, { id: workspaceId }) {
        return this.applicationRegistrationService.findOneById(id, workspaceId);
    }
    async findApplicationRegistrationStats(id, { id: workspaceId }) {
        return this.applicationRegistrationService.getStats(id, workspaceId);
    }
    async createApplicationRegistration(input, { id: workspaceId }, user) {
        return this.applicationRegistrationService.create(input, workspaceId, user?.id ?? null);
    }
    async updateApplicationRegistration(input, { id: workspaceId }) {
        return this.applicationRegistrationService.update(input, workspaceId);
    }
    async deleteApplicationRegistration(id, { id: workspaceId }) {
        return this.applicationRegistrationService.delete(id, workspaceId);
    }
    async rotateApplicationRegistrationClientSecret(id, { id: workspaceId }) {
        const clientSecret = await this.applicationRegistrationService.rotateClientSecret(id, workspaceId);
        return {
            clientSecret
        };
    }
    async findApplicationRegistrationVariables(applicationRegistrationId, { id: workspaceId }) {
        return this.applicationRegistrationVariableService.findVariablesWithObfuscatedValues(applicationRegistrationId, workspaceId);
    }
    async createApplicationRegistrationVariable(input, { id: workspaceId }) {
        return this.applicationRegistrationVariableService.createVariable(input, workspaceId);
    }
    async updateApplicationRegistrationVariable(input, { id: workspaceId }) {
        return this.applicationRegistrationVariableService.updateVariable(input, workspaceId);
    }
    async deleteApplicationRegistrationVariable(id, { id: workspaceId }) {
        return this.applicationRegistrationVariableService.deleteVariable(id, workspaceId);
    }
    async uploadAppTarball({ createReadStream }, universalIdentifier, { id: workspaceId }) {
        const maxSize = this.twentyConfigService.get('MAX_TARBALL_UPLOAD_SIZE_BYTES');
        const stream = createReadStream();
        try {
            const tarballBuffer = await (0, _streamtobuffer.streamToBuffer)(stream, maxSize);
            return this.applicationTarballService.uploadTarball({
                tarballBuffer,
                universalIdentifier,
                ownerWorkspaceId: workspaceId
            });
        } catch (error) {
            if (error instanceof Error && error.message.includes('maximum allowed size')) {
                throw new _applicationregistrationexception.ApplicationRegistrationException(`Tarball exceeds maximum size of ${maxSize} bytes`, _applicationregistrationexception.ApplicationRegistrationExceptionCode.INVALID_INPUT);
            }
            throw error;
        }
    }
    async applicationRegistrationTarballUrl(id, { id: workspaceId }) {
        const registration = await this.applicationRegistrationService.findOneById(id, workspaceId);
        if (registration.sourceType !== _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.TARBALL || !(0, _utils.isDefined)(registration.tarballFileId)) {
            return null;
        }
        return await this.fileUrlService.signFileByIdUrl({
            fileId: registration.tarballFileId,
            workspaceId,
            fileFolder: _types.FileFolder.AppTarball
        });
    }
    async transferApplicationRegistrationOwnership({ applicationRegistrationId, targetWorkspaceSubdomain }, { id: workspaceId }) {
        return this.applicationRegistrationService.transferOwnership({
            applicationRegistrationId,
            targetWorkspaceSubdomain,
            currentOwnerWorkspaceId: workspaceId
        });
    }
    async isConfigured(registration, context) {
        return context.loaders.isConfiguredLoader.load({
            applicationRegistrationId: registration.id
        });
    }
    constructor(applicationRegistrationService, applicationRegistrationVariableService, applicationTarballService, fileUrlService, twentyConfigService){
        this.applicationRegistrationService = applicationRegistrationService;
        this.applicationRegistrationVariableService = applicationRegistrationVariableService;
        this.applicationTarballService = applicationTarballService;
        this.fileUrlService = fileUrlService;
        this.twentyConfigService = twentyConfigService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    (0, _graphql.Query)(()=>_publicapplicationregistrationdto.PublicApplicationRegistrationDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Args)('clientId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "findApplicationRegistrationByClientId", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    (0, _graphql.Query)(()=>_applicationregistrationentity.ApplicationRegistrationEntity, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Args)('universalIdentifier')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "findApplicationRegistrationByUniversalIdentifier", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Query)(()=>[
            _applicationregistrationentity.ApplicationRegistrationEntity
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "findManyApplicationRegistrations", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Query)(()=>_applicationregistrationentity.ApplicationRegistrationEntity),
    _ts_param(0, (0, _graphql.Args)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "findOneApplicationRegistration", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Query)(()=>_applicationregistrationstatsdto.ApplicationRegistrationStatsDTO),
    _ts_param(0, (0, _graphql.Args)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "findApplicationRegistrationStats", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Mutation)(()=>_createapplicationregistrationdto.CreateApplicationRegistrationDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserdecorator.AuthUser)({
        allowUndefined: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createapplicationregistrationinput.CreateApplicationRegistrationInput === "undefined" ? Object : _createapplicationregistrationinput.CreateApplicationRegistrationInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "createApplicationRegistration", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Mutation)(()=>_applicationregistrationentity.ApplicationRegistrationEntity),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateapplicationregistrationinput.UpdateApplicationRegistrationInput === "undefined" ? Object : _updateapplicationregistrationinput.UpdateApplicationRegistrationInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "updateApplicationRegistration", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "deleteApplicationRegistration", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Mutation)(()=>_rotateclientsecretdto.RotateClientSecretDTO),
    _ts_param(0, (0, _graphql.Args)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "rotateApplicationRegistrationClientSecret", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Query)(()=>[
            _applicationregistrationvariabledto.ApplicationRegistrationVariableDTO
        ]),
    _ts_param(0, (0, _graphql.Args)('applicationRegistrationId')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "findApplicationRegistrationVariables", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Mutation)(()=>_applicationregistrationvariableentity.ApplicationRegistrationVariableEntity),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createapplicationregistrationvariableinput.CreateApplicationRegistrationVariableInput === "undefined" ? Object : _createapplicationregistrationvariableinput.CreateApplicationRegistrationVariableInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "createApplicationRegistrationVariable", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Mutation)(()=>_applicationregistrationvariableentity.ApplicationRegistrationVariableEntity),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateapplicationregistrationvariableinput.UpdateApplicationRegistrationVariableInput === "undefined" ? Object : _updateapplicationregistrationvariableinput.UpdateApplicationRegistrationVariableInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "updateApplicationRegistrationVariable", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "deleteApplicationRegistrationVariable", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.MARKETPLACE_APPS)),
    (0, _graphql.Mutation)(()=>_applicationregistrationentity.ApplicationRegistrationEntity),
    _ts_param(0, (0, _graphql.Args)({
        name: 'file',
        type: ()=>_GraphQLUpload.default
    })),
    _ts_param(1, (0, _graphql.Args)('universalIdentifier', {
        type: ()=>String,
        nullable: true
    })),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof FileUpload === "undefined" ? Object : FileUpload,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "uploadAppTarball", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)),
    (0, _graphql.Query)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Args)('id')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "applicationRegistrationTarballUrl", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.APPLICATIONS)),
    (0, _graphql.Mutation)(()=>_applicationregistrationentity.ApplicationRegistrationEntity),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _transferapplicationregistrationownershipinput.TransferApplicationRegistrationOwnershipInput === "undefined" ? Object : _transferapplicationregistrationownershipinput.TransferApplicationRegistrationOwnershipInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "transferApplicationRegistrationOwnership", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>Boolean),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationregistrationentity.ApplicationRegistrationEntity === "undefined" ? Object : _applicationregistrationentity.ApplicationRegistrationEntity,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationRegistrationResolver.prototype, "isConfigured", null);
ApplicationRegistrationResolver = _ts_decorate([
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_applicationregistrationentity.ApplicationRegistrationEntity),
    (0, _common.UseFilters)(_applicationregistrationexceptionfilter.ApplicationRegistrationExceptionFilter, _authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationregistrationservice.ApplicationRegistrationService === "undefined" ? Object : _applicationregistrationservice.ApplicationRegistrationService,
        typeof _applicationregistrationvariableservice.ApplicationRegistrationVariableService === "undefined" ? Object : _applicationregistrationvariableservice.ApplicationRegistrationVariableService,
        typeof _applicationtarballservice.ApplicationTarballService === "undefined" ? Object : _applicationtarballservice.ApplicationTarballService,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], ApplicationRegistrationResolver);

//# sourceMappingURL=application-registration.resolver.js.map