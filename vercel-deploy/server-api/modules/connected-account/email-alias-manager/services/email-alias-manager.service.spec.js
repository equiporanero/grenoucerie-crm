"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _googleemailaliasmanagerservice = require("../drivers/google/services/google-email-alias-manager.service");
const _microsoftapiexamples = require("../drivers/microsoft/mocks/microsoft-api-examples");
const _microsoftemailaliasmanagerservice = require("../drivers/microsoft/services/microsoft-email-alias-manager.service");
const _microsoftoauth2clientprovider = require("../../oauth2-client-manager/drivers/microsoft/microsoft-oauth2-client.provider");
const _emailaliasmanagerservice = require("./email-alias-manager.service");
describe('Email Alias Manager Service', ()=>{
    let emailAliasManagerService;
    let microsoftEmailAliasManagerService;
    const mockConnectedAccountRepository = {
        // @ts-expect-error legacy noImplicitAny
        update: jest.fn().mockResolvedValue((arg)=>arg)
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {
                        executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
                    }
                },
                _emailaliasmanagerservice.EmailAliasManagerService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity),
                    useValue: mockConnectedAccountRepository
                },
                {
                    provide: _googleemailaliasmanagerservice.GoogleEmailAliasManagerService,
                    useValue: {}
                },
                _microsoftemailaliasmanagerservice.MicrosoftEmailAliasManagerService,
                {
                    provide: _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider,
                    useValue: {
                        getClient: jest.fn().mockResolvedValue({
                            api: jest.fn().mockReturnValue({
                                get: jest.fn().mockResolvedValue(_microsoftapiexamples.microsoftGraphMeResponseWithProxyAddresses)
                            })
                        })
                    }
                }
            ]
        }).compile();
        emailAliasManagerService = module.get(_emailaliasmanagerservice.EmailAliasManagerService);
        microsoftEmailAliasManagerService = module.get(_microsoftemailaliasmanagerservice.MicrosoftEmailAliasManagerService);
    });
    it('Service should be defined', ()=>{
        expect(emailAliasManagerService).toBeDefined();
    });
    describe('Refresh handle aliases for Microsoft', ()=>{
        it('Should refresh Microsoft handle aliases successfully', async ()=>{
            const mockConnectedAccount = {
                id: 'test-id',
                provider: _types.ConnectedAccountProvider.MICROSOFT
            };
            const expectedAliases = [
                'bertrand2@domain.onmicrosoft.com',
                'bertrand3@otherdomain.com'
            ];
            jest.spyOn(microsoftEmailAliasManagerService, 'getHandleAliases');
            await emailAliasManagerService.refreshHandleAliases(mockConnectedAccount, 'test-workspace-id');
            expect(microsoftEmailAliasManagerService.getHandleAliases).toHaveBeenCalledWith(mockConnectedAccount);
            expect(mockConnectedAccountRepository.update).toHaveBeenCalledWith({
                id: mockConnectedAccount.id,
                workspaceId: 'test-workspace-id'
            }, {
                handleAliases: expectedAliases
            });
        });
    });
});

//# sourceMappingURL=email-alias-manager.service.spec.js.map