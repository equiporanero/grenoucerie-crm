"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AwsSesSendEmailService", {
    enumerable: true,
    get: function() {
        return AwsSesSendEmailService;
    }
});
const _common = require("@nestjs/common");
const _clientsesv2 = require("@aws-sdk/client-sesv2");
const _utils = require("twenty-shared/utils");
const _awssesmarketingtopicnameconstant = require("../constants/aws-ses-marketing-topic-name.constant");
const _awssesclientprovider = require("../providers/aws-ses-client.provider");
const _awsseshandleerrorservice = require("./aws-ses-handle-error.service");
const _emailingdomaindriverexception = require("../../exceptions/emailing-domain-driver.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AwsSesSendEmailService = class AwsSesSendEmailService {
    async sendEmail(input, context) {
        if (!(0, _utils.isNonEmptyArray)(input.to)) {
            throw new _emailingdomaindriverexception.EmailingDomainDriverException('sendEmail requires at least one recipient', _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.CONFIGURATION_ERROR);
        }
        try {
            const sesClient = this.awsSesClientProvider.getSESClient();
            const response = await sesClient.send(new _clientsesv2.SendEmailCommand({
                FromEmailAddress: input.from,
                Destination: {
                    ToAddresses: input.to,
                    CcAddresses: input.cc,
                    BccAddresses: input.bcc
                },
                ReplyToAddresses: input.replyTo,
                Content: {
                    Simple: {
                        Subject: {
                            Data: input.subject,
                            Charset: 'UTF-8'
                        },
                        Body: {
                            Text: {
                                Data: input.text,
                                Charset: 'UTF-8'
                            },
                            Html: (0, _utils.isDefined)(input.html) ? {
                                Data: input.html,
                                Charset: 'UTF-8'
                            } : undefined
                        },
                        Attachments: (0, _utils.isNonEmptyArray)(input.attachments) ? input.attachments.map((attachment)=>({
                                FileName: attachment.filename,
                                RawContent: attachment.content,
                                ContentType: attachment.contentType,
                                ContentDisposition: 'ATTACHMENT'
                            })) : undefined
                    }
                },
                ConfigurationSetName: context.configurationSetName,
                TenantName: context.tenantName,
                ListManagementOptions: {
                    ContactListName: context.contactListName,
                    TopicName: _awssesmarketingtopicnameconstant.AWS_SES_MARKETING_TOPIC_NAME
                },
                EmailTags: [
                    {
                        Name: 'workspace',
                        Value: input.workspaceId
                    },
                    {
                        Name: 'domain',
                        Value: input.domain
                    }
                ]
            }));
            if (!(0, _utils.isDefined)(response.MessageId)) {
                throw new _emailingdomaindriverexception.EmailingDomainDriverException('SES returned no MessageId', _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.UNKNOWN);
            }
            this.logger.log(`Sent email ${response.MessageId} from ${input.from} (tenant ${context.tenantName})`);
            return {
                messageId: response.MessageId
            };
        } catch (error) {
            if (error instanceof _emailingdomaindriverexception.EmailingDomainDriverException) {
                throw error;
            }
            this.awsSesHandleErrorService.handleAwsSesError(error, 'sendEmail');
        }
    }
    constructor(awsSesClientProvider, awsSesHandleErrorService){
        this.awsSesClientProvider = awsSesClientProvider;
        this.awsSesHandleErrorService = awsSesHandleErrorService;
        this.logger = new _common.Logger(AwsSesSendEmailService.name);
    }
};
AwsSesSendEmailService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _awssesclientprovider.AwsSesClientProvider === "undefined" ? Object : _awssesclientprovider.AwsSesClientProvider,
        typeof _awsseshandleerrorservice.AwsSesHandleErrorService === "undefined" ? Object : _awsseshandleerrorservice.AwsSesHandleErrorService
    ])
], AwsSesSendEmailService);

//# sourceMappingURL=aws-ses-send-email.service.js.map