"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _nodeenvironmentinterface = require("../../twenty-config/interfaces/node-environment.interface");
const _supportinterface = require("../../twenty-config/interfaces/support.interface");
const _interfaces = require("../../captcha/interfaces");
const _clientconfigservice = require("./client-config.service");
const _domainserverconfigservice = require("../../domain/domain-server-config/services/domain-server-config.service");
const _publicfeatureflagconst = require("../../feature-flag/constants/public-feature-flag.const");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _aimodelregistryservice = require("../../../metadata-modules/ai/ai-models/services/ai-model-registry.service");
const _maintenancemodeservice = require("../../admin-panel/maintenance-mode.service");
describe('ClientConfigService', ()=>{
    let service;
    let twentyConfigService;
    let domainServerConfigService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _clientconfigservice.ClientConfigService,
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: _domainserverconfigservice.DomainServerConfigService,
                    useValue: {
                        getFrontUrl: jest.fn()
                    }
                },
                {
                    provide: _aimodelregistryservice.AiModelRegistryService,
                    useValue: {
                        getAdminFilteredModels: jest.fn().mockReturnValue([]),
                        getRecommendedModelIds: jest.fn().mockReturnValue(new Set()),
                        getModelConfig: jest.fn().mockReturnValue(undefined),
                        getResolvedProvidersForAdmin: jest.fn().mockReturnValue({}),
                        getDefaultSpeedModel: jest.fn().mockReturnValue(undefined),
                        getDefaultPerformanceModel: jest.fn().mockReturnValue(undefined)
                    }
                },
                {
                    provide: _maintenancemodeservice.MaintenanceModeService,
                    useValue: {
                        getMaintenanceMode: jest.fn().mockResolvedValue(null)
                    }
                }
            ]
        }).compile();
        service = module.get(_clientconfigservice.ClientConfigService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        domainServerConfigService = module.get(_domainserverconfigservice.DomainServerConfigService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('getClientConfig', ()=>{
        beforeEach(()=>{
            // Setup default mock values
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const mockValues = {
                    IS_BILLING_ENABLED: true,
                    BILLING_PLAN_REQUIRED_LINK: 'https://billing.example.com',
                    BILLING_FREE_TRIAL_WITH_CREDIT_CARD_DURATION_IN_DAYS: 30,
                    BILLING_FREE_TRIAL_WITHOUT_CREDIT_CARD_DURATION_IN_DAYS: 7,
                    AUTH_GOOGLE_ENABLED: true,
                    AUTH_PASSWORD_ENABLED: true,
                    AUTH_MICROSOFT_ENABLED: false,
                    SIGN_IN_PREFILLED: false,
                    IS_MULTIWORKSPACE_ENABLED: true,
                    IS_EMAIL_VERIFICATION_REQUIRED: true,
                    DEFAULT_SUBDOMAIN: 'app',
                    NODE_ENV: _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT,
                    SUPPORT_DRIVER: _supportinterface.SupportDriver.FRONT,
                    SUPPORT_FRONT_CHAT_ID: 'chat-123',
                    SENTRY_ENVIRONMENT: 'development',
                    APP_VERSION: '1.0.0',
                    SENTRY_FRONT_DSN: 'https://sentry.example.com',
                    CAPTCHA_DRIVER: _interfaces.CaptchaDriverType.GOOGLE_RECAPTCHA,
                    CAPTCHA_SITE_KEY: 'site-key-123',
                    MUTATION_MAXIMUM_AFFECTED_RECORDS: 1000,
                    IS_ATTACHMENT_PREVIEW_ENABLED: true,
                    ANALYTICS_ENABLED: true,
                    MESSAGING_PROVIDER_MICROSOFT_ENABLED: false,
                    CALENDAR_PROVIDER_MICROSOFT_ENABLED: false,
                    MESSAGING_PROVIDER_GMAIL_ENABLED: true,
                    CALENDAR_PROVIDER_GOOGLE_ENABLED: true,
                    IS_CONFIG_VARIABLES_IN_DB_ENABLED: false,
                    IS_IMAP_SMTP_CALDAV_ENABLED: false,
                    CALENDAR_BOOKING_PAGE_ID: 'team/twenty/talk-to-us',
                    CLOUDFLARE_API_KEY: undefined,
                    CLOUDFLARE_ZONE_ID: undefined,
                    ALLOW_REQUESTS_TO_TWENTY_ICONS: false,
                    CLICKHOUSE_URL: undefined
                };
                return mockValues[key];
            });
            jest.spyOn(domainServerConfigService, 'getFrontUrl').mockReturnValue({
                hostname: 'app.twenty.com'
            });
        });
        it('should return complete client config with all properties', async ()=>{
            const result = await service.getClientConfig();
            expect(result).toEqual({
                appVersion: '1.0.0',
                billing: {
                    isBillingEnabled: true,
                    billingUrl: 'https://billing.example.com',
                    trialPeriods: [
                        {
                            duration: 30,
                            isCreditCardRequired: true
                        },
                        {
                            duration: 7,
                            isCreditCardRequired: false
                        }
                    ]
                },
                aiModels: [],
                authProviders: {
                    google: true,
                    magicLink: false,
                    password: true,
                    microsoft: false,
                    sso: []
                },
                signInPrefilled: false,
                isMultiWorkspaceEnabled: true,
                isEmailVerificationRequired: true,
                defaultSubdomain: 'app',
                frontDomain: 'app.twenty.com',
                support: {
                    supportDriver: 'FRONT',
                    supportFrontChatId: 'chat-123'
                },
                sentry: {
                    environment: 'development',
                    release: '1.0.0',
                    dsn: 'https://sentry.example.com'
                },
                captcha: {
                    provider: 'GOOGLE_RECAPTCHA',
                    siteKey: 'site-key-123'
                },
                api: {
                    mutationMaximumAffectedRecords: 1000
                },
                isAttachmentPreviewEnabled: true,
                analyticsEnabled: true,
                canManageFeatureFlags: true,
                publicFeatureFlags: _publicfeatureflagconst.PUBLIC_FEATURE_FLAGS,
                isMicrosoftMessagingEnabled: false,
                isMicrosoftCalendarEnabled: false,
                isGoogleMessagingEnabled: true,
                isGoogleCalendarEnabled: true,
                isConfigVariablesInDbEnabled: false,
                isImapSmtpCaldavEnabled: false,
                isEmailGroupEnabled: false,
                allowRequestsToTwentyIcons: false,
                calendarBookingPageId: 'team/twenty/talk-to-us',
                isCloudflareIntegrationEnabled: false,
                isClickHouseConfigured: false
            });
        });
        it('should handle production environment correctly', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                if (key === 'NODE_ENV') return _nodeenvironmentinterface.NodeEnvironment.PRODUCTION;
                if (key === 'IS_BILLING_ENABLED') return false;
                return undefined;
            });
            const result = await service.getClientConfig();
            expect(result.canManageFeatureFlags).toBe(false);
            expect(result.aiModels).toEqual([]);
        });
        it('should handle missing captcha driver', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                if (key === 'CAPTCHA_DRIVER') return undefined;
                if (key === 'CAPTCHA_SITE_KEY') return 'site-key';
                return undefined;
            });
            const result = await service.getClientConfig();
            expect(result.captcha.provider).toBeUndefined();
            expect(result.captcha.siteKey).toBe('site-key');
            expect(result.aiModels).toEqual([]);
        });
        it('should handle missing support driver', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                if (key === 'SUPPORT_DRIVER') return undefined;
                return undefined;
            });
            const result = await service.getClientConfig();
            expect(result.support.supportDriver).toBe(_supportinterface.SupportDriver.NONE);
            expect(result.aiModels).toEqual([]);
        });
        it('should handle billing enabled with feature flags', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                if (key === 'NODE_ENV') return _nodeenvironmentinterface.NodeEnvironment.PRODUCTION;
                if (key === 'IS_BILLING_ENABLED') return true;
                return undefined;
            });
            const result = await service.getClientConfig();
            expect(result.canManageFeatureFlags).toBe(true);
        });
    });
});

//# sourceMappingURL=client-config.service.spec.js.map