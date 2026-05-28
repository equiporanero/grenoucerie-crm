"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _imapgetallfoldersservice = require("../imap-get-all-folders.service");
const _imapclientprovider = require("../../../../../message-import-manager/drivers/imap/providers/imap-client.provider");
const _imapfindsentfolderservice = require("../../../../../message-import-manager/drivers/imap/services/imap-find-sent-folder.service");
const createMockMailbox = (overrides)=>({
        pathAsListed: overrides.path,
        name: overrides.path.split('.').pop() ?? overrides.path,
        delimiter: '.',
        parent: [],
        parentPath: '',
        flags: new Set(),
        listed: true,
        subscribed: true,
        ...overrides
    });
const CONNECTED_ACCOUNT = {
    id: 'account-1',
    provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV,
    connectionParameters: {},
    handle: 'test@example.com',
    workspaceId: 'workspace-1'
};
const MESSAGE_CHANNEL = {
    messageFolderImportPolicy: _types.MessageFolderImportPolicy.ALL_FOLDERS
};
describe('ImapGetAllFoldersService', ()=>{
    let service;
    let mockImapClient;
    let imapFindSentFolderService;
    beforeEach(async ()=>{
        mockImapClient = {
            list: jest.fn().mockResolvedValue([]),
            status: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _imapgetallfoldersservice.ImapGetAllFoldersService,
                {
                    provide: _imapclientprovider.ImapClientProvider,
                    useValue: {
                        getClient: jest.fn().mockResolvedValue(mockImapClient),
                        closeClient: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _imapfindsentfolderservice.ImapFindSentFolderService,
                    useValue: {
                        findSentFolder: jest.fn().mockResolvedValue(null)
                    }
                }
            ]
        }).compile();
        service = module.get(_imapgetallfoldersservice.ImapGetAllFoldersService);
        imapFindSentFolderService = module.get(_imapfindsentfolderservice.ImapFindSentFolderService);
    });
    describe('Noselect folder handling', ()=>{
        it('should not issue STATUS against a \\Noselect folder', async ()=>{
            const mailboxList = [
                createMockMailbox({
                    path: 'INBOX'
                }),
                createMockMailbox({
                    path: 'INBOX.Others',
                    flags: new Set([
                        '\\Noselect'
                    ])
                }),
                createMockMailbox({
                    path: 'INBOX.Others.Sub1',
                    name: 'Sub1',
                    parentPath: 'INBOX.Others'
                })
            ];
            mockImapClient.list.mockResolvedValue(mailboxList);
            mockImapClient.status.mockImplementation(async (path)=>{
                const uidMap = {
                    INBOX: BigInt(1),
                    'INBOX.Others.Sub1': BigInt(2)
                };
                if (path in uidMap) {
                    return {
                        uidValidity: uidMap[path]
                    };
                }
                throw new Error(`Mailbox doesn't exist: ${path}`);
            });
            const result = await service.getAllMessageFolders(CONNECTED_ACCOUNT, MESSAGE_CHANNEL);
            expect(mockImapClient.status).not.toHaveBeenCalledWith('INBOX.Others', expect.anything());
            const paths = result.map((f)=>f.externalId?.split(':')[0]);
            expect(paths).toContain('INBOX');
            expect(paths).toContain('INBOX.Others.Sub1');
            expect(paths).not.toContain('INBOX.Others');
        });
        it('should preserve parent references for children of \\Noselect folders', async ()=>{
            const mailboxList = [
                createMockMailbox({
                    path: 'INBOX.Others',
                    flags: new Set([
                        '\\Noselect'
                    ])
                }),
                createMockMailbox({
                    path: 'INBOX.Others.Sub1',
                    name: 'Sub1',
                    parentPath: 'INBOX.Others'
                }),
                createMockMailbox({
                    path: 'INBOX.Others.Sub2',
                    name: 'Sub2',
                    parentPath: 'INBOX.Others'
                })
            ];
            mockImapClient.list.mockResolvedValue(mailboxList);
            mockImapClient.status.mockImplementation(async (path)=>{
                const uidMap = {
                    'INBOX.Others.Sub1': BigInt(10),
                    'INBOX.Others.Sub2': BigInt(11)
                };
                return {
                    uidValidity: uidMap[path]
                };
            });
            const result = await service.getAllMessageFolders(CONNECTED_ACCOUNT, MESSAGE_CHANNEL);
            expect(result).toHaveLength(2);
            for (const folder of result){
                expect(folder.parentFolderId).toBe('INBOX.Others');
            }
        });
        it('should exclude \\Noselect sent folder from results and skip STATUS', async ()=>{
            const mailboxList = [
                createMockMailbox({
                    path: 'INBOX'
                }),
                createMockMailbox({
                    path: 'Sent',
                    flags: new Set([
                        '\\Noselect'
                    ])
                })
            ];
            mockImapClient.list.mockResolvedValue(mailboxList);
            mockImapClient.status.mockImplementation(async ()=>{
                return {
                    uidValidity: BigInt(1)
                };
            });
            imapFindSentFolderService.findSentFolder.mockResolvedValue({
                path: 'Sent',
                name: 'Sent'
            });
            const result = await service.getAllMessageFolders(CONNECTED_ACCOUNT, MESSAGE_CHANNEL);
            expect(mockImapClient.status).not.toHaveBeenCalledWith('Sent', expect.anything());
            expect(result.find((f)=>f.isSentFolder)).toBeUndefined();
        });
        it.each([
            [
                '\\Noselect'
            ],
            [
                '\\NoSelect'
            ],
            [
                '\\NOSELECT'
            ],
            [
                '\\noselect'
            ]
        ])('should treat %s as non-selectable (RFC 3501 attribute names are case-insensitive)', async (flagSpelling)=>{
            const mailboxList = [
                createMockMailbox({
                    path: 'INBOX'
                }),
                createMockMailbox({
                    path: 'Shared Folders',
                    flags: new Set([
                        flagSpelling
                    ])
                }),
                createMockMailbox({
                    path: 'Shared Folders/team/INBOX',
                    name: 'INBOX',
                    parentPath: 'Shared Folders/team'
                })
            ];
            mockImapClient.list.mockResolvedValue(mailboxList);
            mockImapClient.status.mockImplementation(async (path)=>{
                if (path === 'Shared Folders') {
                    throw new Error(`Mailbox doesn't exist: ${path}`);
                }
                return {
                    uidValidity: BigInt(1)
                };
            });
            const result = await service.getAllMessageFolders(CONNECTED_ACCOUNT, MESSAGE_CHANNEL);
            expect(mockImapClient.status).not.toHaveBeenCalledWith('Shared Folders', expect.anything());
            const paths = result.map((f)=>f.externalId?.split(':')[0]);
            expect(paths).not.toContain('Shared Folders');
        });
    });
});

//# sourceMappingURL=imap-get-all-folders.service.spec.js.map