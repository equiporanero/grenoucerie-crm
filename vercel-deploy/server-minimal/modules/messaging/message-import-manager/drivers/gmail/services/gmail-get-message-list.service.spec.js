"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _googleapis = require("googleapis");
const _types = require("twenty-shared/types");
const _googleoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/google/google-oauth2-client.provider");
const _gmailgethistoryservice = require("./gmail-get-history.service");
const _gmailgetmessagelistservice = require("./gmail-get-message-list.service");
const _gmailmessagelistfetcherrorhandlerservice = require("./gmail-message-list-fetch-error-handler.service");
const _computegmailexcludesearchfilterutil = require("../utils/compute-gmail-exclude-search-filter.util");
const createMockFolder = (overrides)=>({
        id: `folder-${overrides.externalId}`,
        syncCursor: null,
        isSentFolder: false,
        parentFolderId: null,
        pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE,
        ...overrides
    });
describe('GmailGetMessageListService', ()=>{
    let service;
    let googleOAuth2ClientProvider;
    const mockConnectedAccount = {
        id: 'connected-account-id',
        provider: _types.ConnectedAccountProvider.GOOGLE,
        handle: 'test@gmail.com'
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _gmailgetmessagelistservice.GmailGetMessageListService,
                {
                    provide: _googleoauth2clientprovider.GoogleOAuth2ClientProvider,
                    useValue: {
                        getClient: jest.fn()
                    }
                },
                {
                    provide: _gmailgethistoryservice.GmailGetHistoryService,
                    useValue: {
                        getHistory: jest.fn(),
                        getMessageIdsFromHistory: jest.fn()
                    }
                },
                {
                    provide: _gmailmessagelistfetcherrorhandlerservice.GmailMessageListFetchErrorHandler,
                    useValue: {
                        handleError: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_gmailgetmessagelistservice.GmailGetMessageListService);
        googleOAuth2ClientProvider = module.get(_googleoauth2clientprovider.GoogleOAuth2ClientProvider);
    });
    afterEach(()=>{
        jest.restoreAllMocks();
    });
    describe('getMessageList', ()=>{
        it('should return 0 messageExternalIds when gmail returns 0 messages', async ()=>{
            const mockGmailClient = {
                users: {
                    messages: {
                        list: jest.fn().mockResolvedValue({
                            data: {
                                messages: [],
                                nextPageToken: undefined
                            }
                        })
                    }
                }
            };
            jest.spyOn(_googleapis.google, 'gmail').mockReturnValue(mockGmailClient);
            googleOAuth2ClientProvider.getClient.mockResolvedValue({});
            const result = await service.getMessageLists({
                messageChannel: {
                    syncCursor: '',
                    id: 'my-id',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
                },
                connectedAccount: mockConnectedAccount,
                messageFolders: [
                    createMockFolder({
                        name: 'INBOX',
                        externalId: 'INBOX',
                        isSynced: true
                    })
                ]
            });
            expect(result[0].messageExternalIds).toHaveLength(0);
            expect(mockGmailClient.users.messages.list).toHaveBeenCalledTimes(1);
        });
        it('should return 5 messageExternalIds when gmail returns 5 messages', async ()=>{
            const mockMessages = [
                {
                    id: `message-1`
                },
                {
                    id: `message-2`
                },
                {
                    id: `message-3`
                },
                {
                    id: `message-4`
                },
                {
                    id: `message-5`
                }
            ];
            const mockGmailClient = {
                users: {
                    messages: {
                        list: jest.fn().mockResolvedValue({
                            data: {
                                messages: mockMessages,
                                nextPageToken: undefined
                            }
                        }),
                        get: jest.fn().mockResolvedValue({
                            data: {
                                historyId: 'history-id-123'
                            }
                        })
                    }
                }
            };
            jest.spyOn(_googleapis.google, 'gmail').mockReturnValue(mockGmailClient);
            googleOAuth2ClientProvider.getClient.mockResolvedValue({});
            const result = await service.getMessageLists({
                messageChannel: {
                    syncCursor: '',
                    id: 'my-id',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
                },
                connectedAccount: mockConnectedAccount,
                messageFolders: [
                    createMockFolder({
                        name: 'INBOX',
                        externalId: 'INBOX',
                        isSynced: true
                    })
                ]
            });
            expect(result[0].messageExternalIds).toHaveLength(5);
        });
        it('should return 3 messageExternalIds when gmail provides a nextpagetoken with 2 messages, then 1', async ()=>{
            const mockGmailClient = {
                users: {
                    messages: {
                        list: jest.fn().mockResolvedValueOnce({
                            data: {
                                messages: [
                                    {
                                        id: `message-1`
                                    },
                                    {
                                        id: `message-2`
                                    }
                                ],
                                nextPageToken: 'next-page-token'
                            }
                        }).mockResolvedValueOnce({
                            data: {
                                messages: [
                                    {
                                        id: `message-3`
                                    }
                                ],
                                nextPageToken: undefined
                            }
                        }),
                        get: jest.fn().mockResolvedValue({
                            data: {
                                historyId: 'history-id-123'
                            }
                        })
                    }
                }
            };
            jest.spyOn(_googleapis.google, 'gmail').mockReturnValue(mockGmailClient);
            googleOAuth2ClientProvider.getClient.mockResolvedValue({});
            const result = await service.getMessageLists({
                messageChannel: {
                    syncCursor: '',
                    id: 'my-id',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
                },
                connectedAccount: mockConnectedAccount,
                messageFolders: [
                    createMockFolder({
                        name: 'INBOX',
                        externalId: 'INBOX',
                        isSynced: true
                    })
                ]
            });
            expect(result[0].messageExternalIds).toHaveLength(3);
            expect(mockGmailClient.users.messages.list).toHaveBeenCalledTimes(2);
        });
        it('should go through while loop once when gmail provides a nextpagetoken but 0 messages - should never happen IRL', async ()=>{
            const mockGmailClient = {
                users: {
                    messages: {
                        list: jest.fn().mockResolvedValue({
                            data: {
                                messages: [],
                                nextPageToken: 'next-page-token'
                            }
                        })
                    },
                    get: jest.fn().mockResolvedValue({
                        data: {
                            historyId: 'history-id-123'
                        }
                    })
                }
            };
            jest.spyOn(_googleapis.google, 'gmail').mockReturnValue(mockGmailClient);
            googleOAuth2ClientProvider.getClient.mockResolvedValue({});
            const result = await service.getMessageLists({
                messageChannel: {
                    syncCursor: '',
                    id: 'my-id',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
                },
                connectedAccount: mockConnectedAccount,
                messageFolders: [
                    createMockFolder({
                        name: 'INBOX',
                        externalId: 'INBOX',
                        isSynced: true
                    })
                ]
            });
            expect(result[0].messageExternalIds).toHaveLength(0);
            expect(mockGmailClient.users.messages.list).toHaveBeenCalledTimes(1);
        });
        it('should return empty array when no folders have isSynced=true with SELECTED_FOLDERS policy', async ()=>{
            const mockGmailClient = {
                users: {
                    messages: {
                        list: jest.fn()
                    }
                }
            };
            jest.spyOn(_googleapis.google, 'gmail').mockReturnValue(mockGmailClient);
            googleOAuth2ClientProvider.getClient.mockResolvedValue({});
            const result = await service.getMessageLists({
                messageChannel: {
                    syncCursor: '',
                    id: 'my-id',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
                },
                connectedAccount: mockConnectedAccount,
                messageFolders: [
                    createMockFolder({
                        name: 'Personal',
                        externalId: 'Label_personal',
                        isSynced: false
                    }),
                    createMockFolder({
                        name: 'Work',
                        externalId: 'Label_work',
                        isSynced: false
                    })
                ]
            });
            expect(result).toEqual([]);
            expect(mockGmailClient.users.messages.list).not.toHaveBeenCalled();
        });
    });
    describe('initial sync folder filtering', ()=>{
        it('should build Gmail query with positive OR filter for synced folders', async ()=>{
            const mockGmailClient = {
                users: {
                    messages: {
                        list: jest.fn().mockResolvedValue({
                            data: {
                                messages: [
                                    {
                                        id: 'msg-1'
                                    }
                                ],
                                nextPageToken: undefined
                            }
                        }),
                        get: jest.fn().mockResolvedValue({
                            data: {
                                historyId: '12345'
                            }
                        })
                    }
                }
            };
            jest.spyOn(_googleapis.google, 'gmail').mockReturnValue(mockGmailClient);
            googleOAuth2ClientProvider.getClient.mockResolvedValue({});
            const messageFolders = [
                createMockFolder({
                    name: 'INBOX',
                    externalId: 'INBOX',
                    isSynced: true
                }),
                createMockFolder({
                    name: 'Work',
                    externalId: 'Label_work',
                    isSynced: true
                }),
                createMockFolder({
                    name: 'Personal',
                    externalId: 'Label_personal',
                    isSynced: false
                }),
                createMockFolder({
                    name: 'Newsletters',
                    externalId: 'Label_newsletters',
                    isSynced: false
                })
            ];
            await service.getMessageLists({
                messageChannel: {
                    syncCursor: '',
                    id: 'channel-1',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.SELECTED_FOLDERS
                },
                connectedAccount: mockConnectedAccount,
                messageFolders
            });
            const expectedQuery = (0, _computegmailexcludesearchfilterutil.computeGmailExcludeSearchFilter)(messageFolders, _types.MessageFolderImportPolicy.SELECTED_FOLDERS);
            expect(mockGmailClient.users.messages.list).toHaveBeenCalledWith(expect.objectContaining({
                q: expectedQuery
            }));
        });
        it('should only include default exclusions when ALL_FOLDERS policy is set', async ()=>{
            const mockGmailClient = {
                users: {
                    messages: {
                        list: jest.fn().mockResolvedValue({
                            data: {
                                messages: [
                                    {
                                        id: 'msg-1'
                                    }
                                ],
                                nextPageToken: undefined
                            }
                        }),
                        get: jest.fn().mockResolvedValue({
                            data: {
                                historyId: '12345'
                            }
                        })
                    }
                }
            };
            jest.spyOn(_googleapis.google, 'gmail').mockReturnValue(mockGmailClient);
            googleOAuth2ClientProvider.getClient.mockResolvedValue({});
            await service.getMessageLists({
                messageChannel: {
                    syncCursor: '',
                    id: 'channel-1',
                    messageFolderImportPolicy: _types.MessageFolderImportPolicy.ALL_FOLDERS
                },
                connectedAccount: mockConnectedAccount,
                messageFolders: [
                    createMockFolder({
                        name: 'INBOX',
                        externalId: 'INBOX',
                        isSynced: true
                    }),
                    createMockFolder({
                        name: 'Personal',
                        externalId: 'Label_personal',
                        isSynced: false
                    })
                ]
            });
            const callArgs = mockGmailClient.users.messages.list.mock.calls[0][0];
            expect(callArgs.q).toContain('-label:spam');
            expect(callArgs.q).toContain('-category:promotions');
            expect(callArgs.q).not.toContain('label:inbox');
        });
    });
});

//# sourceMappingURL=gmail-get-message-list.service.spec.js.map