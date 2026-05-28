"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _billingservice = require("../../billing/services/billing.service");
const _exceptionhandlerservice = require("../../exception-handler/exception-handler.service");
const _ssoservice = require("./sso.service");
const _ssoexception = require("../sso.exception");
const _workspacessoidentityproviderentity = require("../workspace-sso-identity-provider.entity");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
describe('SSOService', ()=>{
    let service;
    let repository;
    let billingService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _ssoservice.SSOService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspacessoidentityproviderentity.WorkspaceSSOIdentityProviderEntity),
                    useClass: _typeorm1.Repository
                },
                {
                    provide: _billingservice.BillingService,
                    useValue: {
                        hasEntitlement: jest.fn()
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: _exceptionhandlerservice.ExceptionHandlerService,
                    useValue: {
                        captureExceptions: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_ssoservice.SSOService);
        repository = module.get((0, _typeorm.getRepositoryToken)(_workspacessoidentityproviderentity.WorkspaceSSOIdentityProviderEntity));
        billingService = module.get(_billingservice.BillingService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('createOIDCIdentityProvider', ()=>{
        it('should create an OIDC identity provider successfully', async ()=>{
            const workspaceId = 'workspace-123';
            const data = {
                issuer: 'https://example.com',
                clientID: 'client-id',
                clientSecret: 'client-secret',
                name: 'Test Provider'
            };
            const mockIssuer = {
                metadata: {
                    issuer: 'https://example.com'
                }
            };
            const mockSavedProvider = {
                id: 'provider-123',
                type: 'OIDC',
                name: 'Test Provider',
                status: 'ACTIVE',
                issuer: 'https://example.com'
            };
            jest.spyOn(billingService, 'hasEntitlement').mockResolvedValue(true);
            jest.spyOn(service, 'getIssuerForOIDC').mockResolvedValue(mockIssuer);
            jest.spyOn(repository, 'save').mockResolvedValue(mockSavedProvider);
            const result = await service.createOIDCIdentityProvider(data, workspaceId);
            expect(result).toEqual({
                id: 'provider-123',
                type: 'OIDC',
                name: 'Test Provider',
                status: 'ACTIVE',
                issuer: 'https://example.com'
            });
            expect(billingService.hasEntitlement).toHaveBeenCalledWith(workspaceId, 'SSO');
            expect(repository.save).toHaveBeenCalledWith({
                type: 'OIDC',
                clientID: 'client-id',
                clientSecret: 'client-secret',
                issuer: 'https://example.com',
                name: 'Test Provider',
                workspaceId
            });
        });
        it('should throw an exception when SSO is disabled', async ()=>{
            const workspaceId = 'workspace-123';
            const data = {
                issuer: 'https://example.com',
                clientID: 'client-id',
                clientSecret: 'client-secret',
                name: 'Test Provider'
            };
            jest.spyOn(billingService, 'hasEntitlement').mockResolvedValue(false);
            const result = await service.createOIDCIdentityProvider(data, workspaceId);
            expect(result).toBeInstanceOf(_ssoexception.SSOException);
        });
    });
    describe('deleteSSOIdentityProvider', ()=>{
        it('should delete the identity provider successfully', async ()=>{
            const identityProviderId = 'provider-123';
            const workspaceId = 'workspace-123';
            const mockProvider = {
                id: identityProviderId
            };
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockProvider);
            jest.spyOn(repository, 'delete').mockResolvedValue(null);
            const result = await service.deleteSSOIdentityProvider(identityProviderId, workspaceId);
            expect(result).toEqual({
                identityProviderId: 'provider-123'
            });
            expect(repository.findOne).toHaveBeenCalledWith({
                where: {
                    id: identityProviderId,
                    workspaceId
                }
            });
            expect(repository.delete).toHaveBeenCalledWith({
                id: identityProviderId
            });
        });
        it('should throw an exception if the identity provider does not exist', async ()=>{
            const identityProviderId = 'provider-123';
            const workspaceId = 'workspace-123';
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await expect(service.deleteSSOIdentityProvider(identityProviderId, workspaceId)).rejects.toThrow(_ssoexception.SSOException);
        });
    });
    describe('getAuthorizationUrlForSSO', ()=>{
        it('should return an authorization URL', async ()=>{
            const identityProviderId = 'provider-123';
            const searchParams = {
                client: 'web'
            };
            const mockIdentityProvider = {
                id: 'provider-123',
                type: 'OIDC'
            };
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockIdentityProvider);
            jest.spyOn(service, 'buildIssuerURL').mockReturnValue('https://example.com/auth');
            const result = await service.getAuthorizationUrlForSSO(identityProviderId, searchParams);
            expect(result).toEqual({
                id: 'provider-123',
                authorizationURL: 'https://example.com/auth',
                type: 'OIDC'
            });
            expect(repository.findOne).toHaveBeenCalledWith({
                where: {
                    id: identityProviderId
                }
            });
        });
        it('should throw an exception if the identity provider is not found', async ()=>{
            const identityProviderId = 'provider-123';
            const searchParams = {};
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            await expect(service.getAuthorizationUrlForSSO(identityProviderId, searchParams)).rejects.toThrow(_ssoexception.SSOException);
        });
    });
});

//# sourceMappingURL=sso.service.spec.js.map