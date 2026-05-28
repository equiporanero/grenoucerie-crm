"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _googleapis = require("googleapis");
const _googleapisserviceavailabilityservice = require("./google-apis-service-availability.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
jest.mock('googleapis', ()=>({
        google: {
            auth: {
                OAuth2: jest.fn().mockImplementation(()=>({
                        setCredentials: jest.fn()
                    }))
            },
            gmail: jest.fn(),
            calendar: jest.fn()
        }
    }));
describe('GoogleApisServiceAvailabilityService', ()=>{
    let service;
    let mockTwentyConfigService;
    beforeEach(async ()=>{
        mockTwentyConfigService = {
            get: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _googleapisserviceavailabilityservice.GoogleApisServiceAvailabilityService,
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: mockTwentyConfigService
                }
            ]
        }).compile();
        service = module.get(_googleapisserviceavailabilityservice.GoogleApisServiceAvailabilityService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('checkServicesAvailability', ()=>{
        it('should return both services available when Gmail and Calendar are enabled and accessible', async ()=>{
            mockTwentyConfigService.get.mockImplementation((key)=>{
                if (key === 'AUTH_GOOGLE_CLIENT_ID') return 'client-id';
                if (key === 'AUTH_GOOGLE_CLIENT_SECRET') return 'client-secret';
                if (key === 'MESSAGING_PROVIDER_GMAIL_ENABLED') return true;
                if (key === 'CALENDAR_PROVIDER_GOOGLE_ENABLED') return true;
                return undefined;
            });
            const mockGmailClient = {
                users: {
                    getProfile: jest.fn().mockResolvedValue({
                        data: {}
                    })
                }
            };
            const mockCalendarClient = {
                events: {
                    list: jest.fn().mockResolvedValue({
                        data: {}
                    })
                }
            };
            _googleapis.google.gmail.mockReturnValue(mockGmailClient);
            _googleapis.google.calendar.mockReturnValue(mockCalendarClient);
            const result = await service.checkServicesAvailability('access-token');
            expect(result).toEqual({
                isMessagingAvailable: true,
                isCalendarAvailable: true
            });
        });
        it('should return messaging unavailable when messaging provider is disabled', async ()=>{
            mockTwentyConfigService.get.mockImplementation((key)=>{
                if (key === 'AUTH_GOOGLE_CLIENT_ID') return 'client-id';
                if (key === 'AUTH_GOOGLE_CLIENT_SECRET') return 'client-secret';
                if (key === 'MESSAGING_PROVIDER_GMAIL_ENABLED') return false;
                if (key === 'CALENDAR_PROVIDER_GOOGLE_ENABLED') return true;
                return undefined;
            });
            const mockCalendarClient = {
                events: {
                    list: jest.fn().mockResolvedValue({
                        data: {}
                    })
                }
            };
            _googleapis.google.calendar.mockReturnValue(mockCalendarClient);
            const result = await service.checkServicesAvailability('access-token');
            expect(result).toEqual({
                isMessagingAvailable: false,
                isCalendarAvailable: true
            });
        });
        it('should return messaging unavailable when messaging service is not enabled in Google Workspace', async ()=>{
            mockTwentyConfigService.get.mockImplementation((key)=>{
                if (key === 'AUTH_GOOGLE_CLIENT_ID') return 'client-id';
                if (key === 'AUTH_GOOGLE_CLIENT_SECRET') return 'client-secret';
                if (key === 'MESSAGING_PROVIDER_GMAIL_ENABLED') return true;
                if (key === 'CALENDAR_PROVIDER_GOOGLE_ENABLED') return true;
                return undefined;
            });
            const gmailServiceNotEnabledError = {
                response: {
                    status: 400,
                    data: {
                        error: {
                            code: 400,
                            message: 'Mail service not enabled',
                            errors: [
                                {
                                    message: 'Mail service not enabled',
                                    domain: 'global',
                                    reason: 'failedPrecondition'
                                }
                            ],
                            status: 'FAILED_PRECONDITION'
                        }
                    }
                }
            };
            const mockGmailClient = {
                users: {
                    getProfile: jest.fn().mockRejectedValue(gmailServiceNotEnabledError)
                }
            };
            const mockCalendarClient = {
                events: {
                    list: jest.fn().mockResolvedValue({
                        data: {}
                    })
                }
            };
            _googleapis.google.gmail.mockReturnValue(mockGmailClient);
            _googleapis.google.calendar.mockReturnValue(mockCalendarClient);
            const result = await service.checkServicesAvailability('access-token');
            expect(result).toEqual({
                isMessagingAvailable: false,
                isCalendarAvailable: true
            });
        });
        it('should return Calendar unavailable when Calendar service is not enabled in Google Workspace', async ()=>{
            mockTwentyConfigService.get.mockImplementation((key)=>{
                if (key === 'AUTH_GOOGLE_CLIENT_ID') return 'client-id';
                if (key === 'AUTH_GOOGLE_CLIENT_SECRET') return 'client-secret';
                if (key === 'MESSAGING_PROVIDER_GMAIL_ENABLED') return true;
                if (key === 'CALENDAR_PROVIDER_GOOGLE_ENABLED') return true;
                return undefined;
            });
            const calendarServiceNotEnabledError = {
                response: {
                    status: 400,
                    data: {
                        error: {
                            code: 400,
                            message: 'Calendar service not enabled',
                            errors: [
                                {
                                    message: 'Calendar service not enabled',
                                    domain: 'global',
                                    reason: 'failedPrecondition'
                                }
                            ],
                            status: 'FAILED_PRECONDITION'
                        }
                    }
                }
            };
            const mockGmailClient = {
                users: {
                    getProfile: jest.fn().mockResolvedValue({
                        data: {}
                    })
                }
            };
            const mockCalendarClient = {
                events: {
                    list: jest.fn().mockRejectedValue(calendarServiceNotEnabledError)
                }
            };
            _googleapis.google.gmail.mockReturnValue(mockGmailClient);
            _googleapis.google.calendar.mockReturnValue(mockCalendarClient);
            const result = await service.checkServicesAvailability('access-token');
            expect(result).toEqual({
                isMessagingAvailable: true,
                isCalendarAvailable: false
            });
        });
        it('should return messaging unavailable when Google returns generic precondition check failed error', async ()=>{
            mockTwentyConfigService.get.mockImplementation((key)=>{
                if (key === 'AUTH_GOOGLE_CLIENT_ID') return 'client-id';
                if (key === 'AUTH_GOOGLE_CLIENT_SECRET') return 'client-secret';
                if (key === 'MESSAGING_PROVIDER_GMAIL_ENABLED') return true;
                if (key === 'CALENDAR_PROVIDER_GOOGLE_ENABLED') return true;
                return undefined;
            });
            const preconditionCheckFailedError = {
                response: {
                    status: 400,
                    data: {
                        error: {
                            code: 400,
                            message: 'Precondition check failed.',
                            errors: [
                                {
                                    message: 'Precondition check failed.',
                                    domain: 'global',
                                    reason: 'failedPrecondition'
                                }
                            ],
                            status: 'FAILED_PRECONDITION'
                        }
                    }
                }
            };
            const mockGmailClient = {
                users: {
                    getProfile: jest.fn().mockRejectedValue(preconditionCheckFailedError)
                }
            };
            const mockCalendarClient = {
                events: {
                    list: jest.fn().mockResolvedValue({
                        data: {}
                    })
                }
            };
            _googleapis.google.gmail.mockReturnValue(mockGmailClient);
            _googleapis.google.calendar.mockReturnValue(mockCalendarClient);
            const result = await service.checkServicesAvailability('access-token');
            expect(result).toEqual({
                isMessagingAvailable: false,
                isCalendarAvailable: true
            });
        });
        it('should return Calendar unavailable when Google returns generic precondition check failed error', async ()=>{
            mockTwentyConfigService.get.mockImplementation((key)=>{
                if (key === 'AUTH_GOOGLE_CLIENT_ID') return 'client-id';
                if (key === 'AUTH_GOOGLE_CLIENT_SECRET') return 'client-secret';
                if (key === 'MESSAGING_PROVIDER_GMAIL_ENABLED') return true;
                if (key === 'CALENDAR_PROVIDER_GOOGLE_ENABLED') return true;
                return undefined;
            });
            const preconditionCheckFailedError = {
                response: {
                    status: 400,
                    data: {
                        error: {
                            code: 400,
                            message: 'Precondition check failed.',
                            errors: [
                                {
                                    message: 'Precondition check failed.',
                                    domain: 'global',
                                    reason: 'failedPrecondition'
                                }
                            ],
                            status: 'FAILED_PRECONDITION'
                        }
                    }
                }
            };
            const mockGmailClient = {
                users: {
                    getProfile: jest.fn().mockResolvedValue({
                        data: {}
                    })
                }
            };
            const mockCalendarClient = {
                events: {
                    list: jest.fn().mockRejectedValue(preconditionCheckFailedError)
                }
            };
            _googleapis.google.gmail.mockReturnValue(mockGmailClient);
            _googleapis.google.calendar.mockReturnValue(mockCalendarClient);
            const result = await service.checkServicesAvailability('access-token');
            expect(result).toEqual({
                isMessagingAvailable: true,
                isCalendarAvailable: false
            });
        });
        it('should throw error for non-service-availability related errors', async ()=>{
            mockTwentyConfigService.get.mockImplementation((key)=>{
                if (key === 'AUTH_GOOGLE_CLIENT_ID') return 'client-id';
                if (key === 'AUTH_GOOGLE_CLIENT_SECRET') return 'client-secret';
                if (key === 'MESSAGING_PROVIDER_GMAIL_ENABLED') return true;
                if (key === 'CALENDAR_PROVIDER_GOOGLE_ENABLED') return true;
                return undefined;
            });
            const rateLimitError = {
                response: {
                    status: 429,
                    data: {
                        error: {
                            code: 429,
                            message: 'Rate Limit Exceeded',
                            errors: [
                                {
                                    message: 'Rate Limit Exceeded',
                                    domain: 'usageLimits',
                                    reason: 'rateLimitExceeded'
                                }
                            ],
                            status: 'RESOURCE_EXHAUSTED'
                        }
                    }
                }
            };
            const mockGmailClient = {
                users: {
                    getProfile: jest.fn().mockRejectedValue(rateLimitError)
                }
            };
            const mockCalendarClient = {
                events: {
                    list: jest.fn().mockResolvedValue({
                        data: {}
                    })
                }
            };
            _googleapis.google.gmail.mockReturnValue(mockGmailClient);
            _googleapis.google.calendar.mockReturnValue(mockCalendarClient);
            await expect(service.checkServicesAvailability('access-token')).rejects.toMatchObject(rateLimitError);
        });
    });
});

//# sourceMappingURL=google-apis-service-availability.service.spec.js.map