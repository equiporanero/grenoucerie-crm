"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _microsoftapiexamples = require("../mocks/microsoft-api-examples");
const _microsoftfetchbybatchservice = require("./microsoft-fetch-by-batch.service");
const _microsoftgetmessagesservice = require("./microsoft-get-messages.service");
const _microsoftmessagesimporterrorhandlerservice = require("./microsoft-messages-import-error-handler.service");
describe('Microsoft get messages service', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _microsoftgetmessagesservice.MicrosoftGetMessagesService,
                {
                    provide: _microsoftmessagesimporterrorhandlerservice.MicrosoftMessagesImportErrorHandler,
                    useValue: {
                        handleError: jest.fn()
                    }
                },
                {
                    provide: _microsoftfetchbybatchservice.MicrosoftFetchByBatchService,
                    useValue: {
                        fetchAllByBatches: jest.fn()
                    }
                },
                {
                    provide: _common.Logger,
                    useValue: {
                        log: jest.fn(),
                        error: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_microsoftgetmessagesservice.MicrosoftGetMessagesService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it('Should be defined', ()=>{
        expect(service).toBeDefined();
    });
    it('Should format batch responses as messages', ()=>{
        const batchResponses = _microsoftapiexamples.microsoftGraphBatchWithTwoMessagesResponse;
        const connectedAccount = {
            id: 'connected-account-id',
            provider: _types.ConnectedAccountProvider.MICROSOFT,
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
            handle: 'John.l@outlook.fr',
            handleAliases: [],
            workspaceId: 'workspace-id'
        };
        const messages = service.formatBatchResponsesAsMessages(batchResponses, connectedAccount);
        expect(messages).toHaveLength(2);
        const responseExample1 = _microsoftapiexamples.microsoftGraphBatchWithTwoMessagesResponse[0].responses[0];
        expect(messages.find((message)=>message.externalId === 'AAkALgAAAAAAHYQDEapmEc2byACqAC-EWg0AGnUPtcQC-Eiwmc39SmMpPgAAAiVYkAAA')).toStrictEqual({
            externalId: 'AAkALgAAAAAAHYQDEapmEc2byACqAC-EWg0AGnUPtcQC-Eiwmc39SmMpPgAAAiVYkAAA',
            subject: responseExample1.body.subject,
            receivedAt: new Date(responseExample1.body.receivedDateTime),
            text: responseExample1.body.body.content,
            headerMessageId: responseExample1.body.internetMessageId,
            messageThreadExternalId: responseExample1.body.conversationId,
            direction: 'OUTGOING',
            participants: [
                {
                    displayName: 'John l',
                    handle: 'john.l@outlook.fr',
                    role: _types.MessageParticipantRole.FROM
                },
                {
                    displayName: 'Walker',
                    handle: 'walker@felixacme.onmicrosoft.com',
                    role: _types.MessageParticipantRole.TO
                }
            ],
            attachments: [],
            messageFolderExternalIds: responseExample1.body.parentFolderId ? [
                responseExample1.body.parentFolderId
            ] : []
        });
        const responseExample2 = _microsoftapiexamples.microsoftGraphBatchWithTwoMessagesResponse[0].responses[1];
        expect(messages.filter((message)=>message.externalId === 'AAkALgAAAAAAHYQDEapmEc2byACqAC-EWg0AGnUPtcQC-Eiwmc39SmMpPgAAA8ZAfgAA')[0]).toStrictEqual({
            externalId: 'AAkALgAAAAAAHYQDEapmEc2byACqAC-EWg0AGnUPtcQC-Eiwmc39SmMpPgAAA8ZAfgAA',
            subject: responseExample2.body.subject,
            receivedAt: new Date(responseExample2.body.receivedDateTime),
            text: responseExample2.body.body.content,
            headerMessageId: responseExample2.body.internetMessageId,
            messageThreadExternalId: responseExample2.body.conversationId,
            direction: 'INCOMING',
            participants: [
                {
                    displayName: 'Microsoft',
                    handle: 'microsoft-noreply@microsoft.com',
                    role: _types.MessageParticipantRole.FROM
                },
                {
                    displayName: 'Walker',
                    handle: 'walker@felixacme.onmicrosoft.com',
                    role: _types.MessageParticipantRole.TO
                },
                {
                    displayName: 'Antoine',
                    handle: 'antoine@gmail.com',
                    role: _types.MessageParticipantRole.CC
                },
                {
                    displayName: 'Cyril@acme2.com',
                    handle: 'cyril@acme2.com',
                    role: _types.MessageParticipantRole.CC
                }
            ],
            attachments: [],
            messageFolderExternalIds: responseExample2.body.parentFolderId ? [
                responseExample2.body.parentFolderId
            ] : []
        });
    });
    it('Should set empty text for html responses', ()=>{
        const batchResponses = _microsoftapiexamples.microsoftGraphBatchWithHtmlMessagesResponse;
        const connectedAccount = {
            id: 'connected-account-id',
            provider: _types.ConnectedAccountProvider.MICROSOFT,
            accessToken: 'access-token',
            refreshToken: 'refresh-token',
            handle: 'John.l@outlook.fr',
            handleAliases: [],
            workspaceId: 'workspace-id'
        };
        const messages = service.formatBatchResponsesAsMessages(batchResponses, connectedAccount);
        const responseExample = _microsoftapiexamples.microsoftGraphBatchWithHtmlMessagesResponse[0].responses[0];
        expect(messages[0]).toStrictEqual({
            externalId: responseExample.body.id,
            subject: responseExample.body.subject,
            receivedAt: new Date(responseExample.body.receivedDateTime),
            text: '',
            headerMessageId: responseExample.body.internetMessageId,
            messageThreadExternalId: responseExample.body.conversationId,
            direction: 'OUTGOING',
            participants: [
                {
                    displayName: responseExample.body.sender.emailAddress.name,
                    handle: responseExample.body.sender.emailAddress.address.toLowerCase(),
                    role: _types.MessageParticipantRole.FROM
                }
            ],
            attachments: [],
            messageFolderExternalIds: responseExample.body.parentFolderId ? [
                responseExample.body.parentFolderId
            ] : []
        });
    });
});

//# sourceMappingURL=microsoft-get-messages.service.spec.js.map