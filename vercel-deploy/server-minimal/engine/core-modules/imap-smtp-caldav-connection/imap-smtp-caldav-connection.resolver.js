"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapSmtpCaldavResolver", {
    enumerable: true,
    get: function() {
        return ImapSmtpCaldavResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _authgraphqlapiexceptionfilter = require("../auth/filters/auth-graphql-api-exception.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _graphqlerrorsutil = require("../graphql/utils/graphql-errors.util");
const _imapsmtpcaldavconnectedaccountdto = require("./dtos/imap-smtp-caldav-connected-account.dto");
const _imapsmtpcaldavconnectionsuccessdto = require("./dtos/imap-smtp-caldav-connection-success.dto");
const _imapsmtpcaldavconnectioninput = require("./dtos/imap-smtp-caldav-connection.input");
const _imapsmtpcaldavconnectionservice = require("./services/imap-smtp-caldav-connection.service");
const _buildpublicconnectionparametersutil = require("./utils/build-public-connection-parameters.util");
const _workspaceentity = require("../workspace/workspace.entity");
const _authuserworkspaceiddecorator = require("../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _connectedaccountmetadataservice = require("../../metadata-modules/connected-account/connected-account-metadata.service");
const _connectedaccounttokenencryptionservice = require("../../metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
const _imapsmtpcaldavapisservice = require("../../../modules/connected-account/services/imap-smtp-caldav-apis.service");
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
let ImapSmtpCaldavResolver = class ImapSmtpCaldavResolver {
    async getConnectedImapSmtpCaldavAccount(id, workspace, userWorkspaceId) {
        const connectedAccount = await this.connectedAccountMetadataService.findByIdAndUserWorkspaceId({
            id,
            userWorkspaceId,
            workspaceId: workspace.id
        });
        if (!(0, _utils.isDefined)(connectedAccount) || connectedAccount.provider !== _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV) {
            throw new _graphqlerrorsutil.UserInputError('Connected account not found');
        }
        return {
            id: connectedAccount.id,
            handle: connectedAccount.handle,
            provider: connectedAccount.provider,
            connectionParameters: (0, _buildpublicconnectionparametersutil.buildPublicConnectionParameters)(connectedAccount.connectionParameters),
            userWorkspaceId: connectedAccount.userWorkspaceId
        };
    }
    async saveImapSmtpCaldavAccount(handle, connectionParameters, workspace, userWorkspaceId, id) {
        const existingAccount = (0, _utils.isDefined)(id) ? await this.connectedAccountMetadataService.findByIdAndUserWorkspaceId({
            id,
            userWorkspaceId,
            workspaceId: workspace.id
        }) : null;
        if ((0, _utils.isDefined)(id) && (!existingAccount || existingAccount.provider !== _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV)) {
            throw new _graphqlerrorsutil.UserInputError('Connected account not found');
        }
        const decryptedExistingParams = existingAccount?.connectionParameters ? this.connectedAccountTokenEncryptionService.decryptConnectionParameters({
            connectionParameters: existingAccount.connectionParameters,
            workspaceId: workspace.id
        }) : null;
        const validatedParams = await this.imapSmtpCaldavService.validateAndTestConnectionParameters({
            connectionParameters,
            handle,
            existingConnectionParameters: decryptedExistingParams
        });
        const connectedAccountId = await this.imapSmtpCaldavApisService.upsertConnectedAccount({
            handle,
            userWorkspaceId,
            workspaceId: workspace.id,
            connectionParameters: validatedParams,
            existingAccount
        });
        return {
            success: true,
            connectedAccountId
        };
    }
    constructor(imapSmtpCaldavService, imapSmtpCaldavApisService, connectedAccountMetadataService, connectedAccountTokenEncryptionService){
        this.imapSmtpCaldavService = imapSmtpCaldavService;
        this.imapSmtpCaldavApisService = imapSmtpCaldavApisService;
        this.connectedAccountMetadataService = connectedAccountMetadataService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_imapsmtpcaldavconnectedaccountdto.ConnectedImapSmtpCaldavAccountDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.CONNECTED_ACCOUNTS)),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ImapSmtpCaldavResolver.prototype, "getConnectedImapSmtpCaldavAccount", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_imapsmtpcaldavconnectionsuccessdto.ImapSmtpCaldavConnectionSuccessDTO),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.CONNECTED_ACCOUNTS)),
    _ts_param(0, (0, _graphql.Args)('handle')),
    _ts_param(1, (0, _graphql.Args)('connectionParameters')),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(3, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(4, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType,
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _imapsmtpcaldavconnectioninput.EmailAccountConnectionParametersInput === "undefined" ? Object : _imapsmtpcaldavconnectioninput.EmailAccountConnectionParametersInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ImapSmtpCaldavResolver.prototype, "saveImapSmtpCaldavAccount", null);
ImapSmtpCaldavResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _imapsmtpcaldavconnectionservice.ImapSmtpCaldavService === "undefined" ? Object : _imapsmtpcaldavconnectionservice.ImapSmtpCaldavService,
        typeof _imapsmtpcaldavapisservice.ImapSmtpCalDavAPIService === "undefined" ? Object : _imapsmtpcaldavapisservice.ImapSmtpCalDavAPIService,
        typeof _connectedaccountmetadataservice.ConnectedAccountMetadataService === "undefined" ? Object : _connectedaccountmetadataservice.ConnectedAccountMetadataService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService
    ])
], ImapSmtpCaldavResolver);

//# sourceMappingURL=imap-smtp-caldav-connection.resolver.js.map