"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _config = require("@nestjs/config");
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _twentyconfigmodule = require("../../../../../../engine/core-modules/twenty-config/twenty-config.module");
const _microsoftoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/microsoft/microsoft-oauth2-client.provider");
const _microsoftfetchbybatchservice = require("./microsoft-fetch-by-batch.service");
const _microsoftgetmessagesservice = require("./microsoft-get-messages.service");
const _microsoftmessagesimporterrorhandlerservice = require("./microsoft-messages-import-error-handler.service");
const mockMessageIds = [
    'AAkALgAAAAAAHYQDEapmEc2byACqAC-EWg0AGnUPtcQC-Eiwmc39SmMpPgAAA8ZAfgAA',
    'AAkALgAAAAAAHYQDEapmEc2byACqAC-EWg0AGnUPtcQC-Eiwmc39SmMpPgAAAiVYkAAA'
];
const accessToken = 'replace-with-your-access-token';
const refreshToken = 'replace-with-your-refresh-token';
xdescribe('Microsoft dev tests : get messages service', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            imports: [
                _twentyconfigmodule.TwentyConfigModule.forRoot()
            ],
            providers: [
                _microsoftgetmessagesservice.MicrosoftGetMessagesService,
                {
                    provide: _microsoftmessagesimporterrorhandlerservice.MicrosoftMessagesImportErrorHandler,
                    useValue: {
                        handleError: jest.fn()
                    }
                },
                {
                    provide: _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider,
                    useValue: {
                        getClient: jest.fn()
                    }
                },
                _microsoftfetchbybatchservice.MicrosoftFetchByBatchService,
                _config.ConfigService
            ]
        }).compile();
        service = module.get(_microsoftgetmessagesservice.MicrosoftGetMessagesService);
    });
    const mockConnectedAccount = {
        id: 'connected-account-id',
        provider: _types.ConnectedAccountProvider.MICROSOFT,
        handle: 'John.Walker@outlook.fr',
        handleAliases: [],
        accessToken: accessToken,
        refreshToken: refreshToken,
        workspaceId: 'workspace-id'
    };
    it('should fetch and format messages successfully', async ()=>{
        const result = await service.getMessages(mockMessageIds, mockConnectedAccount);
        expect(result).toHaveLength(1);
    });
});

//# sourceMappingURL=microsoft-get-messages.service.dev.spec.js.map