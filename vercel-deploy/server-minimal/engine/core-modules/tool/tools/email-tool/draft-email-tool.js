"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DraftEmailTool", {
    enumerable: true,
    get: function() {
        return DraftEmailTool;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _emailcomposerservice = require("./email-composer.service");
const _emailtoolschema = require("./email-tool.schema");
const _emailtoolexception = require("./exceptions/email-tool.exception");
const _isinsufficientpermissionserrorutil = require("./utils/is-insufficient-permissions-error.util");
const _messagingmessageoutboundservice = require("../../../../../modules/messaging/message-outbound-manager/services/messaging-message-outbound.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DraftEmailTool = class DraftEmailTool {
    async execute(parameters, context) {
        try {
            const result = await this.emailComposerService.composeEmail(parameters, context, {
                attachmentsFileFolder: _types.FileFolder.Workflow
            });
            if (!result.success) {
                return result.output;
            }
            const { data } = result;
            await this.createDraft(data);
            this.logger.log(`Draft created successfully for ${data.toRecipientsDisplay}${data.attachments.length > 0 ? ` with ${data.attachments.length} attachments` : ''}`);
            return {
                success: true,
                message: `Draft created successfully for ${data.toRecipientsDisplay}`,
                result: {
                    recipients: data.recipients.to,
                    ccRecipients: data.recipients.cc,
                    bccRecipients: data.recipients.bcc,
                    subject: data.sanitizedSubject,
                    connectedAccountId: data.connectedAccount.id,
                    attachmentCount: data.attachments.length
                }
            };
        } catch (error) {
            if (error instanceof _emailtoolexception.EmailToolException) {
                return {
                    success: false,
                    message: 'Failed to create draft',
                    error: error.message
                };
            }
            this.logger.error(`Failed to create draft: ${error}`);
            if ((0, _isinsufficientpermissionserrorutil.isInsufficientPermissionsError)(error)) {
                return {
                    success: false,
                    message: 'Failed to create draft due to insufficient permissions',
                    error: 'The connected email account does not have permission to create drafts. ' + 'The user should disconnect and reconnect their account in Settings > Accounts to grant the required permissions.'
                };
            }
            return {
                success: false,
                message: 'Failed to create draft',
                error: error instanceof Error ? error.message : 'Failed to create draft'
            };
        }
    }
    async createDraft(data) {
        await this.messageOutboundService.createDraft({
            to: data.recipients.to,
            cc: data.recipients.cc.length > 0 ? data.recipients.cc : undefined,
            bcc: data.recipients.bcc.length > 0 ? data.recipients.bcc : undefined,
            subject: data.sanitizedSubject,
            body: data.plainTextBody,
            html: data.sanitizedHtmlBody,
            attachments: data.attachments,
            inReplyTo: data.inReplyTo
        }, data.connectedAccount);
    }
    constructor(emailComposerService, messageOutboundService){
        this.emailComposerService = emailComposerService;
        this.messageOutboundService = messageOutboundService;
        this.logger = new _common.Logger(DraftEmailTool.name);
        this.description = 'Create a draft email using a connected account. The email will be saved as a draft, not sent.';
        this.inputSchema = _emailtoolschema.EmailToolInputZodSchema;
    }
};
DraftEmailTool = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _emailcomposerservice.EmailComposerService === "undefined" ? Object : _emailcomposerservice.EmailComposerService,
        typeof _messagingmessageoutboundservice.MessagingMessageOutboundService === "undefined" ? Object : _messagingmessageoutboundservice.MessagingMessageOutboundService
    ])
], DraftEmailTool);

//# sourceMappingURL=draft-email-tool.js.map