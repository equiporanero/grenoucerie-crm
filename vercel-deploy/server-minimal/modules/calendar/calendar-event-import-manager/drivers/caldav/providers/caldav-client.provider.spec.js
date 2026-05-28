"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _connectedaccountentity = require("../../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionservice = require("../../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _calendareventimportdriverexception = require("../../exceptions/calendar-event-import-driver.exception");
const _caldavclientservice = require("../services/caldav-client.service");
const _caldavclientprovider = require("./caldav-client.provider");
const mockCalDavParams = {
    host: 'https://caldav.example.com',
    username: 'user@example.com',
    password: 'plaintext-password'
};
const mockConnectionParameters = {
    CALDAV: {
        host: 'https://caldav.example.com',
        username: 'user@example.com',
        password: 'encrypted-password'
    }
};
describe('CalDavClientProvider', ()=>{
    let provider;
    let connectedAccountRepository;
    let connectedAccountTokenEncryptionService;
    let calDavClientService;
    const mockWorkspaceId = 'workspace-123';
    const mockConnectedAccountId = 'account-456';
    const mockConnectedAccount = {
        id: mockConnectedAccountId,
        workspaceId: mockWorkspaceId,
        provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV,
        handle: 'user@example.com',
        connectionParameters: mockConnectionParameters
    };
    beforeEach(async ()=>{
        connectedAccountTokenEncryptionService = {
            decryptProtocolPassword: jest.fn().mockReturnValue(mockCalDavParams)
        };
        calDavClientService = {
            getClient: jest.fn().mockResolvedValue({
                options: {
                    serverUrl: mockCalDavParams.host
                }
            })
        };
        connectedAccountRepository = {
            findOne: jest.fn().mockResolvedValue(mockConnectedAccount)
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _caldavclientprovider.CalDavClientProvider,
                {
                    provide: _caldavclientservice.CalDavClientService,
                    useValue: calDavClientService
                },
                {
                    provide: _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService,
                    useValue: connectedAccountTokenEncryptionService
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity),
                    useValue: connectedAccountRepository
                }
            ]
        }).compile();
        provider = module.get(_caldavclientprovider.CalDavClientProvider);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('getClient', ()=>{
        it('should load the entity, decrypt CalDAV params, and return a DAVClient', async ()=>{
            const client = await provider.getClient(mockConnectedAccountId);
            expect(connectedAccountRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: mockConnectedAccountId
                }
            });
            expect(connectedAccountTokenEncryptionService.decryptProtocolPassword).toHaveBeenCalledWith({
                protocolParams: mockConnectionParameters.CALDAV,
                workspaceId: mockWorkspaceId
            });
            expect(calDavClientService.getClient).toHaveBeenCalledWith({
                serverUrl: mockCalDavParams.host,
                username: mockCalDavParams.username,
                password: mockCalDavParams.password
            });
            expect(client).toBeDefined();
        });
        it('should throw INSUFFICIENT_PERMISSIONS when the connected account does not exist', async ()=>{
            connectedAccountRepository.findOne.mockResolvedValue(null);
            await expect(provider.getClient(mockConnectedAccountId)).rejects.toMatchObject({
                code: _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS
            });
        });
        it('should throw INSUFFICIENT_PERMISSIONS when CalDAV credentials are missing', async ()=>{
            connectedAccountRepository.findOne.mockResolvedValue({
                ...mockConnectedAccount,
                provider: _types.ConnectedAccountProvider.GOOGLE,
                connectionParameters: {}
            });
            await expect(provider.getClient(mockConnectedAccountId)).rejects.toMatchObject({
                code: _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.INSUFFICIENT_PERMISSIONS
            });
        });
    });
});

//# sourceMappingURL=caldav-client.provider.spec.js.map