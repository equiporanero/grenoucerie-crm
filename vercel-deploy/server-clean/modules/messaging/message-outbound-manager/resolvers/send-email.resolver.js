"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SendEmailResolver", {
    enumerable: true,
    get: function() {
        return SendEmailResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../../../engine/api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _authgraphqlapiexceptionfilter = require("../../../../engine/core-modules/auth/filters/auth-graphql-api-exception.filter");
const _fileemailattachmentservice = require("../../../../engine/core-modules/file/file-email-attachment/services/file-email-attachment.service");
const _resolvervalidationpipe = require("../../../../engine/core-modules/graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../../../../engine/core-modules/workspace/workspace.entity");
const _emailcomposerservice = require("../../../../engine/core-modules/tool/tools/email-tool/email-composer.service");
const _authuserworkspaceiddecorator = require("../../../../engine/decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../../../engine/decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../../engine/guards/settings-permission.guard");
const _workspaceauthguard = require("../../../../engine/guards/workspace-auth.guard");
const _connectedaccountmetadataservice = require("../../../../engine/metadata-modules/connected-account/connected-account-metadata.service");
const _sendemailoutputdto = require("../dtos/send-email-output.dto");
const _sendemailinput = require("../dtos/send-email.input");
const _sendemailservice = require("../services/send-email.service");
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
let SendEmailResolver = class SendEmailResolver {
    async sendEmail(input, workspace, userWorkspaceId) {
        try {
            await this.connectedAccountMetadataService.verifyOwnership({
                id: input.connectedAccountId,
                userWorkspaceId,
                workspaceId: workspace.id
            });
            const result = await this.emailComposerService.composeEmail({
                recipients: {
                    to: input.to,
                    cc: input.cc ?? '',
                    bcc: input.bcc ?? ''
                },
                subject: input.subject,
                body: input.body,
                connectedAccountId: input.connectedAccountId,
                files: input.files ?? [],
                inReplyTo: input.inReplyTo
            }, {
                workspaceId: workspace.id
            }, {
                attachmentsFileFolder: _types.FileFolder.EmailAttachment
            });
            if (!result.success) {
                return {
                    success: false,
                    error: result.output.error ?? result.output.message
                };
            }
            const { data } = result;
            const sendResult = await this.sendEmailService.sendComposedEmail(data);
            if (data.shouldPersistMessage) {
                await this.sendEmailService.persistSentMessage(sendResult, data, workspace.id);
            }
            const attachmentFileIds = (input.files ?? []).map((file)=>file.id);
            if (attachmentFileIds.length > 0) {
                await this.fileEmailAttachmentService.deleteFiles({
                    fileIds: attachmentFileIds,
                    workspaceId: workspace.id
                });
            }
            return {
                success: true
            };
        } catch (error) {
            if (error instanceof _common.ForbiddenException) {
                throw error;
            }
            this.logger.error(`Failed to send email: ${error}`);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to send email'
            };
        }
    }
    constructor(connectedAccountMetadataService, emailComposerService, fileEmailAttachmentService, sendEmailService){
        this.connectedAccountMetadataService = connectedAccountMetadataService;
        this.emailComposerService = emailComposerService;
        this.fileEmailAttachmentService = fileEmailAttachmentService;
        this.sendEmailService = sendEmailService;
        this.logger = new _common.Logger(SendEmailResolver.name);
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_sendemailoutputdto.SendEmailOutputDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _sendemailinput.SendEmailInput === "undefined" ? Object : _sendemailinput.SendEmailInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], SendEmailResolver.prototype, "sendEmail", null);
SendEmailResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.SEND_EMAIL_TOOL)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _connectedaccountmetadataservice.ConnectedAccountMetadataService === "undefined" ? Object : _connectedaccountmetadataservice.ConnectedAccountMetadataService,
        typeof _emailcomposerservice.EmailComposerService === "undefined" ? Object : _emailcomposerservice.EmailComposerService,
        typeof _fileemailattachmentservice.FileEmailAttachmentService === "undefined" ? Object : _fileemailattachmentservice.FileEmailAttachmentService,
        typeof _sendemailservice.SendEmailService === "undefined" ? Object : _sendemailservice.SendEmailService
    ])
], SendEmailResolver);

//# sourceMappingURL=send-email.resolver.js.map