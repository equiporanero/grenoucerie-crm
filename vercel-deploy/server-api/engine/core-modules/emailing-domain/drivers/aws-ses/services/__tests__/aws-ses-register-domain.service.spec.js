"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _clientsesv2 = require("@aws-sdk/client-sesv2");
const _awssesregisterdomainservice = require("../aws-ses-register-domain.service");
const _emailingdomaindrivertype = require("../../../types/emailing-domain-driver.type");
describe('AwsSesRegisterDomainService', ()=>{
    const config = {
        driver: _emailingdomaindrivertype.EmailingDomainDriver.AWS_SES,
        region: 'us-east-1',
        accountId: '123456789012'
    };
    const provisionInput = {
        tenantName: 'twenty-workspace-ws1',
        configurationSetName: 'twenty-workspace-ws1',
        contactListName: 'twenty-workspace-ws1'
    };
    const buildNotFound = ()=>new _clientsesv2.NotFoundException({
            $metadata: {
                httpStatusCode: 404
            },
            message: 'Configuration set not found.'
        });
    const setUp = ()=>{
        const send = jest.fn();
        const clientProvider = {
            getSESClient: ()=>({
                    send
                })
        };
        const service = new _awssesregisterdomainservice.AwsSesRegisterDomainService(clientProvider);
        return {
            service,
            send
        };
    };
    describe('provisionWorkspaceResources', ()=>{
        it('creates every workspace-scoped resource when the configuration set does not yet exist', async ()=>{
            const { service, send } = setUp();
            send.mockImplementation(async (command)=>{
                if (command instanceof _clientsesv2.GetConfigurationSetCommand) {
                    throw buildNotFound();
                }
                return {};
            });
            await service.provisionWorkspaceResources(provisionInput, config);
            const commandTypes = send.mock.calls.map(([command])=>command.constructor.name);
            expect(commandTypes).toEqual([
                _clientsesv2.GetConfigurationSetCommand.name,
                _clientsesv2.CreateConfigurationSetCommand.name,
                _clientsesv2.CreateConfigurationSetEventDestinationCommand.name,
                _clientsesv2.CreateContactListCommand.name,
                _clientsesv2.CreateTenantResourceAssociationCommand.name
            ]);
        });
        it('issues no creates when the configuration set already exists', async ()=>{
            const { service, send } = setUp();
            send.mockResolvedValue({});
            await service.provisionWorkspaceResources(provisionInput, config);
            const commandTypes = send.mock.calls.map(([command])=>command.constructor.name);
            expect(commandTypes).toEqual([
                _clientsesv2.GetConfigurationSetCommand.name
            ]);
        });
        it('propagates non-NotFound AWS errors raised by the existence probe', async ()=>{
            const { service, send } = setUp();
            const fatalError = new Error('Boom');
            send.mockImplementation(async (command)=>{
                if (command instanceof _clientsesv2.GetConfigurationSetCommand) {
                    throw fatalError;
                }
                return {};
            });
            await expect(service.provisionWorkspaceResources(provisionInput, config)).rejects.toBe(fatalError);
        });
    });
    describe('registerDomain', ()=>{
        it('configures custom MAIL FROM using the bounce subdomain', async ()=>{
            const { service, send } = setUp();
            send.mockResolvedValue({});
            await service.registerDomain('mail.example.com');
            const commandTypes = send.mock.calls.map(([command])=>command.constructor.name);
            expect(commandTypes).toEqual([
                _clientsesv2.PutEmailIdentityMailFromAttributesCommand.name
            ]);
            const mailFromCall = send.mock.calls.find(([command])=>command instanceof _clientsesv2.PutEmailIdentityMailFromAttributesCommand);
            expect(mailFromCall?.[0].input).toMatchObject({
                EmailIdentity: 'mail.example.com',
                MailFromDomain: 'bounce.mail.example.com',
                BehaviorOnMxFailure: 'USE_DEFAULT_VALUE'
            });
        });
    });
});

//# sourceMappingURL=aws-ses-register-domain.service.spec.js.map