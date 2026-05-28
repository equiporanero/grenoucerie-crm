"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _getqueuetokenutil = require("../../../../engine/core-modules/message-queue/utils/get-queue-token.util");
const _objectmetadataentity = require("../../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _createcompanyandcontactjob = require("../../../contact-creation-manager/jobs/create-company-and-contact.job");
const _messagedirectionenum = require("../../common/enums/message-direction.enum");
const _messagingmessagefolderassociationservice = require("./messaging-message-folder-association.service");
const _messagingmessageservice = require("./messaging-message.service");
const _messagingsavemessagesandenqueuecontactcreationservice = require("./messaging-save-messages-and-enqueue-contact-creation.service");
const _messagingmessageparticipantservice = require("../../message-participant-manager/services/messaging-message-participant.service");
describe('MessagingSaveMessagesAndEnqueueContactCreationService', ()=>{
    let service;
    let messageQueueService;
    let messageService;
    let messageParticipantService;
    let datasourceInstance;
    const workspaceId = 'workspace-id';
    const mockConnectedAccount = {
        id: 'connected-account-id',
        handle: 'test@example.com',
        handleAliases: [
            'alias1@example.com',
            'alias2@example.com'
        ]
    };
    const mockMessageChannel = {
        id: 'message-channel-id',
        isContactAutoCreationEnabled: true,
        contactAutoCreationPolicy: _types.MessageChannelContactAutoCreationPolicy.SENT_AND_RECEIVED,
        excludeNonProfessionalEmails: true,
        excludeGroupEmails: true
    };
    const mockMessages = [
        {
            externalId: 'message-1',
            headerMessageId: 'header-message-id-1',
            subject: 'Test Subject 1',
            text: 'Test content 1',
            receivedAt: new Date(),
            attachments: [],
            messageThreadExternalId: 'thread-1',
            direction: _messagedirectionenum.MessageDirection.OUTGOING,
            participants: [
                {
                    role: _types.MessageParticipantRole.FROM,
                    handle: 'test@example.com',
                    displayName: 'Test User'
                },
                {
                    role: _types.MessageParticipantRole.TO,
                    handle: 'contact@company.com',
                    displayName: 'Contact'
                }
            ]
        },
        {
            externalId: 'message-2',
            headerMessageId: 'header-message-id-2',
            subject: 'Test Subject 2',
            text: 'Test content 2',
            receivedAt: new Date(),
            attachments: [],
            messageThreadExternalId: 'thread-1',
            direction: _messagedirectionenum.MessageDirection.INCOMING,
            participants: [
                {
                    role: _types.MessageParticipantRole.FROM,
                    handle: 'contact@company.com',
                    displayName: 'Contact'
                },
                {
                    role: _types.MessageParticipantRole.TO,
                    handle: 'test@example.com',
                    displayName: 'Test User'
                },
                {
                    role: _types.MessageParticipantRole.TO,
                    handle: 'personal@gmail.com',
                    displayName: 'Personal'
                },
                {
                    role: _types.MessageParticipantRole.TO,
                    handle: 'team@lists.company.com',
                    displayName: 'Group email'
                }
            ]
        }
    ];
    beforeEach(async ()=>{
        datasourceInstance = {
            transaction: jest.fn().mockImplementation(async (callback)=>{
                return callback({});
            })
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService,
                {
                    provide: _messagequeueservice.MessageQueueService,
                    useValue: {
                        add: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: (0, _getqueuetokenutil.getQueueToken)(_messagequeueconstants.MessageQueue.contactCreationQueue),
                    useValue: {
                        add: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_objectmetadataentity.ObjectMetadataEntity),
                    useValue: {
                        findOneOrFail: jest.fn()
                    }
                },
                {
                    provide: _messagingmessageservice.MessagingMessageService,
                    useValue: {
                        saveMessagesWithinTransaction: jest.fn().mockResolvedValue({
                            messageExternalIdsAndIdsMap: new Map([
                                [
                                    'message-1',
                                    'db-message-id-1'
                                ],
                                [
                                    'message-2',
                                    'db-message-id-2'
                                ]
                            ]),
                            createdMessages: [
                                {
                                    id: 'db-message-id-1'
                                },
                                {
                                    id: 'db-message-id-2'
                                }
                            ]
                        })
                    }
                },
                {
                    provide: _messagingmessageparticipantservice.MessagingMessageParticipantService,
                    useValue: {
                        saveMessageParticipants: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _messagingmessagefolderassociationservice.MessagingMessageFolderAssociationService,
                    useValue: {
                        saveMessageFolderAssociations: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: {
                        getGlobalWorkspaceDataSource: jest.fn().mockResolvedValue(datasourceInstance),
                        executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
                    }
                }
            ]
        }).compile();
        service = module.get(_messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService);
        messageQueueService = module.get((0, _getqueuetokenutil.getQueueToken)(_messagequeueconstants.MessageQueue.contactCreationQueue));
        messageService = module.get(_messagingmessageservice.MessagingMessageService);
        messageParticipantService = module.get(_messagingmessageparticipantservice.MessagingMessageParticipantService);
    });
    it('should save messages and enqueue contact creation', async ()=>{
        await service.saveMessagesAndEnqueueContactCreation(mockMessages, mockMessageChannel, mockConnectedAccount, workspaceId);
        expect(messageService.saveMessagesWithinTransaction).toHaveBeenCalledWith(mockMessages, mockMessageChannel.id, expect.any(Object), workspaceId);
        expect(messageParticipantService.saveMessageParticipants).toHaveBeenCalled();
        expect(messageQueueService.add).toHaveBeenCalled();
    });
    it('should not enqueue contact creation when it is disabled', async ()=>{
        await service.saveMessagesAndEnqueueContactCreation(mockMessages, {
            ...mockMessageChannel,
            isContactAutoCreationEnabled: false
        }, mockConnectedAccount, workspaceId);
        expect(messageService.saveMessagesWithinTransaction).toHaveBeenCalled();
        expect(messageQueueService.add).not.toHaveBeenCalled();
    });
    it('should create external contacts', async ()=>{
        await service.saveMessagesAndEnqueueContactCreation([
            {
                ...mockMessages[1],
                participants: [
                    {
                        role: _types.MessageParticipantRole.FROM,
                        handle: 'tim@apple.com',
                        displayName: 'participant email'
                    }
                ]
            }
        ], mockMessageChannel, mockConnectedAccount, workspaceId);
        expect(messageQueueService.add).toHaveBeenCalledWith(_createcompanyandcontactjob.CreateCompanyAndContactJob.name, {
            workspaceId,
            connectedAccount: mockConnectedAccount,
            source: _types.FieldActorSource.EMAIL,
            contactsToCreate: [
                {
                    handle: 'tim@apple.com',
                    displayName: 'participant email',
                    role: _types.MessageParticipantRole.FROM,
                    shouldCreateContact: true,
                    messageId: 'db-message-id-2'
                }
            ]
        });
    });
    it('should not create personal emails contacts', async ()=>{
        await service.saveMessagesAndEnqueueContactCreation([
            {
                ...mockMessages[0],
                participants: [
                    {
                        role: _types.MessageParticipantRole.FROM,
                        handle: 'test@gmail.com',
                        displayName: 'participant personal email'
                    }
                ]
            }
        ], mockMessageChannel, mockConnectedAccount, workspaceId);
        expect(messageQueueService.add).toHaveBeenCalledWith(_createcompanyandcontactjob.CreateCompanyAndContactJob.name, {
            workspaceId,
            connectedAccount: mockConnectedAccount,
            source: _types.FieldActorSource.EMAIL,
            contactsToCreate: []
        });
    });
    it('should not create contact if the participant is the connected account', async ()=>{
        const mockMessagesWithConnectedAccount = [
            {
                ...mockMessages[0],
                participants: [
                    {
                        role: _types.MessageParticipantRole.FROM,
                        handle: 'connected@account.com',
                        displayName: 'participant that is the Connected Account'
                    }
                ]
            }
        ];
        await service.saveMessagesAndEnqueueContactCreation(mockMessagesWithConnectedAccount, mockMessageChannel, {
            ...mockConnectedAccount,
            handle: 'connected@account.com'
        }, workspaceId);
        expect(messageQueueService.add).toHaveBeenCalledWith(_createcompanyandcontactjob.CreateCompanyAndContactJob.name, {
            workspaceId,
            connectedAccount: {
                ...mockConnectedAccount,
                handle: 'connected@account.com'
            },
            source: _types.FieldActorSource.EMAIL,
            contactsToCreate: []
        });
    });
});

//# sourceMappingURL=messaging-save-messages-and-enqueue-contact-creation.service.spec.js.map