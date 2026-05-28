"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _oauthdiscoverycontroller = require("../oauth-discovery.controller");
const _applicationregistrationservice = require("../../../application-registration/application-registration.service");
const _domainserverconfigservice = require("../../../../domain/domain-server-config/services/domain-server-config.service");
const _twentyconfigservice = require("../../../../twenty-config/twenty-config.service");
describe('OAuthDiscoveryController', ()=>{
    let controller;
    const buildMockRequest = (host, protocol = 'https')=>({
            protocol,
            get: (header)=>header.toLowerCase() === 'host' ? host : undefined
        });
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _oauthdiscoverycontroller.OAuthDiscoveryController
            ],
            providers: [
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('https://api.example.com')
                    }
                },
                {
                    provide: _domainserverconfigservice.DomainServerConfigService,
                    useValue: {
                        getBaseUrl: jest.fn().mockReturnValue(new URL('https://app.example.com'))
                    }
                },
                {
                    provide: _applicationregistrationservice.ApplicationRegistrationService,
                    useValue: {
                        findOneByUniversalIdentifier: jest.fn()
                    }
                }
            ]
        }).compile();
        controller = module.get(_oauthdiscoverycontroller.OAuthDiscoveryController);
    });
    // RFC 9728 §3.2 requires the `resource` value to match the identifier into
    // which the well-known path suffix was inserted — so the root maps to the
    // origin itself and the /mcp variant maps to <origin>/mcp.
    describe('getProtectedResourceMetadata', ()=>{
        it('root form returns the origin as the resource', ()=>{
            const request = buildMockRequest('workspace.twenty.com');
            expect(controller.getProtectedResourceMetadataRoot(request)).toMatchObject({
                resource: 'https://workspace.twenty.com',
                authorization_servers: [
                    'https://workspace.twenty.com'
                ]
            });
        });
        it('path-aware /mcp form returns origin/mcp as the resource', ()=>{
            const request = buildMockRequest('workspace.twenty.com');
            expect(controller.getProtectedResourceMetadataMcp(request)).toMatchObject({
                resource: 'https://workspace.twenty.com/mcp',
                authorization_servers: [
                    'https://workspace.twenty.com'
                ]
            });
        });
    });
});

//# sourceMappingURL=oauth-discovery.controller.spec.js.map