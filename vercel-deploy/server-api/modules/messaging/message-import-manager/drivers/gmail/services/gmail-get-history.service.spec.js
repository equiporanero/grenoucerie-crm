"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _gmailgethistoryservice = require("./gmail-get-history.service");
const _gmailmessagelistfetcherrorhandlerservice = require("./gmail-message-list-fetch-error-handler.service");
describe('GmailGetHistoryService', ()=>{
    let service;
    let errorHandler;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _gmailgethistoryservice.GmailGetHistoryService,
                {
                    provide: _gmailmessagelistfetcherrorhandlerservice.GmailMessageListFetchErrorHandler,
                    useValue: {
                        handleError: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_gmailgethistoryservice.GmailGetHistoryService);
        errorHandler = module.get(_gmailmessagelistfetcherrorhandlerservice.GmailMessageListFetchErrorHandler);
    });
    describe('getHistory', ()=>{
        it('should fetch history', async ()=>{
            const mockClient = {
                users: {
                    history: {
                        list: jest.fn().mockResolvedValue({
                            data: {
                                history: [
                                    {
                                        messagesAdded: [
                                            {
                                                message: {
                                                    id: 'msg1'
                                                }
                                            }
                                        ]
                                    }
                                ],
                                historyId: '200'
                            }
                        })
                    }
                }
            };
            const result = await service.getHistory(mockClient, '100');
            expect(result.historyId).toBe('200');
            expect(result.history).toHaveLength(1);
        });
        it('should handle pagination', async ()=>{
            const mockClient = {
                users: {
                    history: {
                        list: jest.fn().mockResolvedValueOnce({
                            data: {
                                history: [
                                    {
                                        id: '1'
                                    }
                                ],
                                nextPageToken: 'token',
                                historyId: '200'
                            }
                        }).mockResolvedValueOnce({
                            data: {
                                history: [
                                    {
                                        id: '2'
                                    }
                                ],
                                historyId: '201'
                            }
                        })
                    }
                }
            };
            const result = await service.getHistory(mockClient, '100');
            expect(result.history).toHaveLength(2);
            expect(mockClient.users.history.list).toHaveBeenCalledTimes(2);
        });
        it('should throw SYNC_CURSOR_ERROR when historyId is expired', async ()=>{
            const error = {
                code: 404,
                message: 'Not found'
            };
            const mockClient = {
                users: {
                    history: {
                        list: jest.fn().mockRejectedValue(error)
                    }
                }
            };
            errorHandler.handleError.mockImplementation(()=>{
                throw {
                    code: _messageimportdriverexception.MessageImportDriverExceptionCode.SYNC_CURSOR_ERROR,
                    message: 'Sync cursor error'
                };
            });
            await expect(service.getHistory(mockClient, 'expired-id')).rejects.toMatchObject({
                code: _messageimportdriverexception.MessageImportDriverExceptionCode.SYNC_CURSOR_ERROR
            });
            expect(errorHandler.handleError).toHaveBeenCalledWith(error);
        });
        it('should delegate other errors to error handler', async ()=>{
            const error = {
                code: 500,
                message: 'Server error'
            };
            const mockClient = {
                users: {
                    history: {
                        list: jest.fn().mockRejectedValue(error)
                    }
                }
            };
            await service.getHistory(mockClient, '100');
            expect(errorHandler.handleError).toHaveBeenCalledWith(error);
        });
    });
    describe('getMessageIdsFromHistory', ()=>{
        it('should extract message IDs', async ()=>{
            const history = [
                {
                    messagesAdded: [
                        {
                            message: {
                                id: 'add1'
                            }
                        }
                    ],
                    messagesDeleted: [
                        {
                            message: {
                                id: 'del1'
                            }
                        }
                    ]
                }
            ];
            const result = await service.getMessageIdsFromHistory(history);
            expect(result.messagesAdded).toEqual([
                'add1'
            ]);
            expect(result.messagesDeleted).toEqual([
                'del1'
            ]);
        });
        it('should deduplicate messages that appear in both lists', async ()=>{
            const history = [
                {
                    messagesAdded: [
                        {
                            message: {
                                id: 'msg1'
                            }
                        },
                        {
                            message: {
                                id: 'msg2'
                            }
                        }
                    ],
                    messagesDeleted: [
                        {
                            message: {
                                id: 'msg1'
                            }
                        }
                    ]
                }
            ];
            const result = await service.getMessageIdsFromHistory(history);
            expect(result.messagesAdded).toEqual([
                'msg2'
            ]);
            expect(result.messagesDeleted).toEqual([]);
        });
    });
});

//# sourceMappingURL=gmail-get-history.service.spec.js.map