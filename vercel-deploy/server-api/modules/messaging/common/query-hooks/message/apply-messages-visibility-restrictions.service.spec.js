"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _userworkspaceentity = require("../../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _applymessagesvisibilityrestrictionsservice = require("./apply-messages-visibility-restrictions.service");
const createMockMessage = (id, subject, text)=>({
        id,
        subject,
        text,
        headerMessageId: '',
        receivedAt: new Date('2024-03-20T10:00:00Z'),
        messageThreadId: '',
        messageThread: null,
        messageChannelMessageAssociations: [],
        messageParticipants: [],
        deletedAt: null,
        createdAt: '2024-03-20T09:00:00Z',
        updatedAt: '2024-03-20T09:00:00Z'
    });
describe('ApplyMessagesVisibilityRestrictionsService', ()=>{
    let service;
    const mockMessageChannelMessageAssociationRepository = {
        find: jest.fn()
    };
    const mockWorkspaceMemberRepository = {
        findOneByOrFail: jest.fn()
    };
    const mockConnectedAccountRepository = {
        find: jest.fn()
    };
    const mockUserWorkspaceRepository = {
        findOne: jest.fn()
    };
    const mockMessageChannelRepository = {
        find: jest.fn()
    };
    const mockGlobalWorkspaceOrmManager = {
        getRepository: jest.fn().mockImplementation((workspaceId, name)=>{
            if (name === 'messageChannelMessageAssociation') {
                return mockMessageChannelMessageAssociationRepository;
            }
            if (name === 'workspaceMember') {
                return mockWorkspaceMemberRepository;
            }
        }),
        executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _applymessagesvisibilityrestrictionsservice.ApplyMessagesVisibilityRestrictionsService,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: mockGlobalWorkspaceOrmManager
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_connectedaccountentity.ConnectedAccountEntity),
                    useValue: mockConnectedAccountRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useValue: mockUserWorkspaceRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_messagechannelentity.MessageChannelEntity),
                    useValue: mockMessageChannelRepository
                }
            ]
        }).compile();
        service = module.get(_applymessagesvisibilityrestrictionsservice.ApplyMessagesVisibilityRestrictionsService);
        jest.clearAllMocks();
    });
    it('should return message without obfuscated subject and text if the visibility is SHARE_EVERYTHING', async ()=>{
        const messages = [
            createMockMessage('messageId', 'Test Subject', 'Test Message')
        ];
        mockMessageChannelMessageAssociationRepository.find.mockResolvedValue([
            {
                messageId: 'messageId',
                messageChannelId: 'messageChannelId'
            }
        ]);
        mockMessageChannelRepository.find.mockResolvedValue([
            {
                id: 'messageChannelId',
                visibility: _types.MessageChannelVisibility.SHARE_EVERYTHING
            }
        ]);
        const result = await service.applyMessagesVisibilityRestrictions(messages, 'test-workspace-id', 'user-id');
        expect(result).toEqual(messages);
        expect(result.every((item)=>item.subject === 'Test Subject' && item.text === 'Test Message')).toBe(true);
        expect(mockConnectedAccountRepository.find).not.toHaveBeenCalled();
    });
    it('should return message without obfuscated subject and with obfuscated text if the visibility is SUBJECT', async ()=>{
        const messages = [
            createMockMessage('messageId', 'Test Subject', 'Test Message')
        ];
        mockMessageChannelMessageAssociationRepository.find.mockResolvedValue([
            {
                messageId: 'messageId',
                messageChannelId: 'messageChannelId'
            }
        ]);
        mockMessageChannelRepository.find.mockResolvedValue([
            {
                id: 'messageChannelId',
                visibility: _types.MessageChannelVisibility.SUBJECT
            }
        ]);
        mockConnectedAccountRepository.find.mockResolvedValue([]);
        mockWorkspaceMemberRepository.findOneByOrFail.mockResolvedValue({
            id: 'workspace-member-id',
            userId: 'user-id'
        });
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'user-workspace-id',
            userId: 'user-id'
        });
        const result = await service.applyMessagesVisibilityRestrictions(messages, 'test-workspace-id', 'user-id');
        expect(result).toEqual([
            {
                ...messages[0],
                text: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            }
        ]);
    });
    it('should return message with obfuscated subject and text if the visibility is METADATA', async ()=>{
        const messages = [
            createMockMessage('messageId', 'Test Subject', 'Test Message')
        ];
        mockMessageChannelMessageAssociationRepository.find.mockResolvedValue([
            {
                messageId: 'messageId',
                messageChannelId: 'messageChannelId'
            }
        ]);
        mockMessageChannelRepository.find.mockResolvedValue([
            {
                id: 'messageChannelId',
                visibility: _types.MessageChannelVisibility.METADATA
            }
        ]);
        mockConnectedAccountRepository.find.mockResolvedValue([]);
        mockWorkspaceMemberRepository.findOneByOrFail.mockResolvedValue({
            id: 'workspace-member-id',
            userId: 'user-id'
        });
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'user-workspace-id',
            userId: 'user-id'
        });
        const result = await service.applyMessagesVisibilityRestrictions(messages, 'test-workspace-id', 'user-id');
        expect(result).toEqual([
            {
                ...messages[0],
                subject: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED,
                text: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            }
        ]);
    });
    it('should return message without obfuscated subject and text if the visibility is METADATA and the workspace member is the channel owner', async ()=>{
        const messages = [
            createMockMessage('messageId', 'Test Subject', 'Test Message')
        ];
        mockMessageChannelMessageAssociationRepository.find.mockResolvedValue([
            {
                messageId: 'messageId',
                messageChannelId: 'messageChannelId'
            }
        ]);
        mockMessageChannelRepository.find.mockResolvedValue([
            {
                id: 'messageChannelId',
                visibility: _types.MessageChannelVisibility.METADATA
            }
        ]);
        mockWorkspaceMemberRepository.findOneByOrFail.mockResolvedValue({
            id: 'workspace-member-account-owner-id',
            userId: 'user-id'
        });
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'user-workspace-id',
            userId: 'user-id'
        });
        mockConnectedAccountRepository.find.mockResolvedValue([
            {
                id: '1'
            }
        ]);
        const result = await service.applyMessagesVisibilityRestrictions(messages, 'test-workspace-id', 'user-id');
        expect(result).toEqual(messages);
        expect(result.every((item)=>item.subject === 'Test Subject' && item.text === 'Test Message')).toBe(true);
    });
    it('should not return message if visibility is not SHARE_EVERYTHING, SUBJECT or METADATA and the workspace member is not the channel owner', async ()=>{
        const messages = [
            createMockMessage('messageId', 'Test Subject', 'Test Message')
        ];
        mockMessageChannelMessageAssociationRepository.find.mockResolvedValue([
            {
                messageId: 'messageId',
                messageChannelId: 'messageChannelId'
            }
        ]);
        mockMessageChannelRepository.find.mockResolvedValue([
            {
                id: 'messageChannelId'
            }
        ]);
        mockWorkspaceMemberRepository.findOneByOrFail.mockResolvedValue({
            id: 'workspace-member-not-account-owner-id',
            userId: 'user-id'
        });
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'user-workspace-id',
            userId: 'user-id'
        });
        mockConnectedAccountRepository.find.mockResolvedValue([]);
        const result = await service.applyMessagesVisibilityRestrictions(messages, 'test-workspace-id', 'user-id');
        expect(result).toEqual([]);
    });
    it('should return all messages with the right visibility', async ()=>{
        const messages = [
            createMockMessage('1', 'Subject 1', 'Message 1'),
            createMockMessage('2', 'Subject 2', 'Message 2'),
            createMockMessage('3', 'Subject 3', 'Message 3')
        ];
        mockMessageChannelMessageAssociationRepository.find.mockResolvedValue([
            {
                messageId: '1',
                messageChannelId: '1'
            },
            {
                messageId: '2',
                messageChannelId: '2'
            },
            {
                messageId: '3',
                messageChannelId: '3'
            }
        ]);
        mockMessageChannelRepository.find.mockResolvedValue([
            {
                id: '1',
                visibility: _types.MessageChannelVisibility.SHARE_EVERYTHING
            },
            {
                id: '2',
                visibility: _types.MessageChannelVisibility.SUBJECT
            },
            {
                id: '3',
                visibility: _types.MessageChannelVisibility.METADATA
            }
        ]);
        mockWorkspaceMemberRepository.findOneByOrFail.mockResolvedValue({
            id: 'workspace-member-id',
            userId: 'user-id'
        });
        mockUserWorkspaceRepository.findOne.mockResolvedValue({
            id: 'user-workspace-id',
            userId: 'user-id'
        });
        mockConnectedAccountRepository.find.mockResolvedValueOnce([]) // request for message 3
        .mockResolvedValueOnce([]); // request for message 2
        const result = await service.applyMessagesVisibilityRestrictions(messages, 'test-workspace-id', 'user-id');
        expect(result).toEqual([
            messages[0],
            {
                ...messages[1],
                text: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            },
            {
                ...messages[2],
                subject: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED,
                text: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            }
        ]);
    });
    it('should return all messages with the right visibility when userId is undefined (api key request)', async ()=>{
        const messages = [
            createMockMessage('1', 'Subject 1', 'Message 1'),
            createMockMessage('2', 'Subject 2', 'Message 2'),
            createMockMessage('3', 'Subject 3', 'Message 3')
        ];
        mockMessageChannelMessageAssociationRepository.find.mockResolvedValue([
            {
                messageId: '1',
                messageChannelId: '1'
            },
            {
                messageId: '2',
                messageChannelId: '2'
            },
            {
                messageId: '3',
                messageChannelId: '3'
            }
        ]);
        mockMessageChannelRepository.find.mockResolvedValue([
            {
                id: '1',
                visibility: _types.MessageChannelVisibility.SHARE_EVERYTHING
            },
            {
                id: '2',
                visibility: _types.MessageChannelVisibility.SUBJECT
            },
            {
                id: '3',
                visibility: _types.MessageChannelVisibility.METADATA
            }
        ]);
        mockWorkspaceMemberRepository.findOneByOrFail.mockResolvedValue({
            id: 'workspace-member-id'
        });
        mockConnectedAccountRepository.find.mockResolvedValueOnce([]) // request for message 3
        .mockResolvedValueOnce([]); // request for message 2
        const result = await service.applyMessagesVisibilityRestrictions(messages, 'test-workspace-id', undefined);
        expect(result).toEqual([
            messages[0],
            {
                ...messages[1],
                text: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            },
            {
                ...messages[2],
                subject: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED,
                text: _constants.FIELD_RESTRICTED_ADDITIONAL_PERMISSIONS_REQUIRED
            }
        ]);
    });
});

//# sourceMappingURL=apply-messages-visibility-restrictions.service.spec.js.map