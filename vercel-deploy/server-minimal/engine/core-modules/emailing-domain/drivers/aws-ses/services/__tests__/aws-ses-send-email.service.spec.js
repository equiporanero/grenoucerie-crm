"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _clientsesv2 = require("@aws-sdk/client-sesv2");
const _awssessendemailservice = require("../aws-ses-send-email.service");
const _emailingdomaindriverexception = require("../../../exceptions/emailing-domain-driver.exception");
describe('AwsSesSendEmailService', ()=>{
    const baseInput = {
        workspaceId: 'ws1',
        domain: 'mail.example.com',
        from: 'noreply@mail.example.com',
        to: [
            'user@example.com'
        ],
        subject: 'Hello',
        text: 'World'
    };
    const baseContext = {
        tenantName: 'twenty-workspace-ws1',
        configurationSetName: 'twenty-workspace-ws1',
        contactListName: 'twenty-workspace-ws1'
    };
    const setUp = ()=>{
        const send = jest.fn();
        const clientProvider = {
            getSESClient: ()=>({
                    send
                })
        };
        const handleErrorService = {
            handleAwsSesError: jest.fn((error)=>{
                throw error;
            })
        };
        const service = new _awssessendemailservice.AwsSesSendEmailService(clientProvider, handleErrorService);
        return {
            service,
            send,
            handleErrorService
        };
    };
    it('should call SendEmail with tenant, config set, and list management options', async ()=>{
        const { service, send } = setUp();
        send.mockResolvedValue({
            MessageId: 'msg-1'
        });
        const result = await service.sendEmail(baseInput, baseContext);
        expect(result.messageId).toBe('msg-1');
        const [command] = send.mock.calls[0];
        expect(command).toBeInstanceOf(_clientsesv2.SendEmailCommand);
        expect(command.input).toMatchObject({
            FromEmailAddress: 'noreply@mail.example.com',
            Destination: {
                ToAddresses: [
                    'user@example.com'
                ]
            },
            ConfigurationSetName: 'twenty-workspace-ws1',
            TenantName: 'twenty-workspace-ws1',
            ListManagementOptions: {
                ContactListName: 'twenty-workspace-ws1',
                TopicName: 'marketing'
            }
        });
        expect(command.input.EmailTags).toEqual(expect.arrayContaining([
            {
                Name: 'workspace',
                Value: 'ws1'
            },
            {
                Name: 'domain',
                Value: 'mail.example.com'
            }
        ]));
    });
    it('should throw when SES returns no MessageId', async ()=>{
        const { service, send } = setUp();
        send.mockResolvedValue({});
        await expect(service.sendEmail(baseInput, baseContext)).rejects.toThrow(_emailingdomaindriverexception.EmailingDomainDriverException);
    });
    it('should reject empty recipient list before calling SES', async ()=>{
        const { service, send } = setUp();
        await expect(service.sendEmail({
            ...baseInput,
            to: []
        }, baseContext)).rejects.toMatchObject({
            code: _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.CONFIGURATION_ERROR
        });
        expect(send).not.toHaveBeenCalled();
    });
    it('should route AWS errors through the error handler', async ()=>{
        const { service, send, handleErrorService } = setUp();
        const awsError = Object.assign(new Error('Rejected'), {
            name: 'MessageRejected',
            $metadata: {
                httpStatusCode: 400
            }
        });
        send.mockRejectedValue(awsError);
        await expect(service.sendEmail(baseInput, baseContext)).rejects.toBe(awsError);
        expect(handleErrorService.handleAwsSesError).toHaveBeenCalledWith(awsError, 'sendEmail');
    });
});

//# sourceMappingURL=aws-ses-send-email.service.spec.js.map