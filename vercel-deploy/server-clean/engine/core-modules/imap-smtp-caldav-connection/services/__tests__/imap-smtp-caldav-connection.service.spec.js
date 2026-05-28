"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _imapsmtpcaldavconnectionvalidatorservice = require("../imap-smtp-caldav-connection-validator.service");
const _imapsmtpcaldavconnectionservice = require("../imap-smtp-caldav-connection.service");
const _securehttpclientservice = require("../../../secure-http-client/secure-http-client.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _caldavclientservice = require("../../../../../modules/calendar/calendar-event-import-manager/drivers/caldav/services/caldav-client.service");
const _caldavfetcheventsservice = require("../../../../../modules/calendar/calendar-event-import-manager/drivers/caldav/services/caldav-fetch-events.service");
describe('ImapSmtpCaldavService', ()=>{
    let service;
    const mockClient = {};
    const mockCalDavClientService = {
        getClient: jest.fn()
    };
    const mockCalDavFetchEventsService = {
        listEventCalendars: jest.fn()
    };
    beforeEach(async ()=>{
        jest.clearAllMocks();
        mockCalDavClientService.getClient.mockResolvedValue(mockClient);
        mockCalDavFetchEventsService.listEventCalendars.mockResolvedValue([
            {
                url: 'https://caldav.example.com/calendars/user/default/'
            }
        ]);
        const module = await _testing.Test.createTestingModule({
            providers: [
                _imapsmtpcaldavconnectionservice.ImapSmtpCaldavService,
                {
                    provide: _securehttpclientservice.SecureHttpClientService,
                    useValue: {}
                },
                {
                    provide: _imapsmtpcaldavconnectionvalidatorservice.ImapSmtpCaldavValidatorService,
                    useValue: {}
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue(true)
                    }
                },
                {
                    provide: _caldavclientservice.CalDavClientService,
                    useValue: mockCalDavClientService
                },
                {
                    provide: _caldavfetcheventsservice.CalDavFetchEventsService,
                    useValue: mockCalDavFetchEventsService
                }
            ]
        }).compile();
        service = module.get(_imapsmtpcaldavconnectionservice.ImapSmtpCaldavService);
    });
    describe('testCaldavConnection', ()=>{
        const params = {
            host: 'https://caldav.example.com',
            port: 443,
            username: 'user@example.com',
            password: 'password123'
        };
        it('builds a CalDAV client and lists its event calendars', async ()=>{
            await service.testCaldavConnection('user@example.com', params);
            expect(mockCalDavClientService.getClient).toHaveBeenCalledWith({
                serverUrl: 'https://caldav.example.com',
                username: 'user@example.com',
                password: 'password123'
            });
            expect(mockCalDavFetchEventsService.listEventCalendars).toHaveBeenCalledWith(mockClient);
        });
        it('falls back to the handle when CALDAV.username is missing', async ()=>{
            await service.testCaldavConnection('handle@example.com', {
                ...params,
                username: undefined
            });
            expect(mockCalDavClientService.getClient).toHaveBeenCalledWith(expect.objectContaining({
                username: 'handle@example.com'
            }));
        });
        it('throws when no event calendars are found', async ()=>{
            mockCalDavFetchEventsService.listEventCalendars.mockResolvedValue([]);
            await expect(service.testCaldavConnection('user@example.com', params)).rejects.toThrow('No calendar with event support found');
        });
    });
});

//# sourceMappingURL=imap-smtp-caldav-connection.service.spec.js.map