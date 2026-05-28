"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _emailingdomaindriverexception = require("../../drivers/exceptions/emailing-domain-driver.exception");
const _emailingdomainstatustype = require("../../drivers/types/emailing-domain-status.type");
const _emailingdomaintenantstatustype = require("../../drivers/types/emailing-domain-tenant-status.type");
const _emailingdomainservice = require("../emailing-domain.service");
describe('EmailingDomainService.sendEmail', ()=>{
    const buildEmailingDomain = (overrides = {})=>({
            id: 'domain-1',
            workspaceId: 'ws1',
            domain: 'mail.example.com',
            status: _emailingdomainstatustype.EmailingDomainStatus.VERIFIED,
            tenantStatus: _emailingdomaintenantstatustype.EmailingDomainTenantStatus.ACTIVE,
            ...overrides
        });
    const buildEmailContent = ()=>({
            from: 'hello@mail.example.com',
            to: [
                'user@example.com'
            ],
            subject: 'Hi',
            text: 'Body'
        });
    const setUp = (emailingDomain)=>{
        const sendEmail = jest.fn().mockResolvedValue({
            messageId: 'msg-1'
        });
        const repository = {
            findOne: jest.fn().mockResolvedValue(emailingDomain)
        };
        const factory = {
            getCurrentDriver: ()=>({
                    sendEmail
                })
        };
        const service = new _emailingdomainservice.EmailingDomainService(repository, factory);
        return {
            service,
            sendEmail
        };
    };
    it('delegates to the driver when the domain is verified and the tenant is active', async ()=>{
        const { service, sendEmail } = setUp(buildEmailingDomain());
        const result = await service.sendEmail('ws1', 'domain-1', buildEmailContent());
        expect(result.messageId).toBe('msg-1');
        expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({
            workspaceId: 'ws1',
            domain: 'mail.example.com',
            from: 'hello@mail.example.com'
        }));
    });
    it.each([
        _emailingdomaintenantstatustype.EmailingDomainTenantStatus.PAUSED,
        _emailingdomaintenantstatustype.EmailingDomainTenantStatus.PERMANENTLY_SUSPENDED
    ])('rejects sending with SENDING_SUSPENDED when tenantStatus is %s, without calling the driver', async (tenantStatus)=>{
        const { service, sendEmail } = setUp(buildEmailingDomain({
            tenantStatus
        }));
        await expect(service.sendEmail('ws1', 'domain-1', buildEmailContent())).rejects.toMatchObject({
            code: _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.SENDING_SUSPENDED
        });
        expect(sendEmail).not.toHaveBeenCalled();
    });
    // Verification is a precondition for the tenant-status check: a domain that
    // has not been verified should surface a CONFIGURATION_ERROR rather than
    // leaking the tenant pause state to callers who couldn't have used it anyway.
    it('reports the verification failure before the tenant-status failure', async ()=>{
        const { service } = setUp(buildEmailingDomain({
            status: _emailingdomainstatustype.EmailingDomainStatus.PENDING,
            tenantStatus: _emailingdomaintenantstatustype.EmailingDomainTenantStatus.PAUSED
        }));
        await expect(service.sendEmail('ws1', 'domain-1', buildEmailContent())).rejects.toMatchObject({
            code: _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.CONFIGURATION_ERROR
        });
    });
});

//# sourceMappingURL=emailing-domain.service.spec.js.map