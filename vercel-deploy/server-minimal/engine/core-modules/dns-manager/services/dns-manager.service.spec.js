"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _cloudflare = /*#__PURE__*/ _interop_require_default(require("cloudflare"));
const _auditcontextmock = require("test/utils/audit-context.mock");
const _auditservice = require("../../audit/services/audit.service");
const _dnsmanagerexception = require("../exceptions/dns-manager.exception");
const _dnsmanagerservice = require("./dns-manager.service");
const _domainserverconfigservice = require("../../domain/domain-server-config/services/domain-server-config.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../workspace/workspace.entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
jest.mock('cloudflare');
describe('DnsManagerService', ()=>{
    let dnsManagerService;
    let twentyConfigService;
    let domainServerConfigService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _dnsmanagerservice.DnsManagerService,
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: _auditservice.AuditService,
                    useValue: {
                        createContext: _auditcontextmock.AuditContextMock
                    }
                },
                {
                    provide: _domainserverconfigservice.DomainServerConfigService,
                    useValue: {
                        getBaseUrl: jest.fn(),
                        getPublicDomainUrl: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: {
                        save: jest.fn()
                    }
                }
            ]
        }).compile();
        dnsManagerService = module.get(_dnsmanagerservice.DnsManagerService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        domainServerConfigService = module.get(_domainserverconfigservice.DomainServerConfigService);
        dnsManagerService.cloudflareClient = {
            customHostnames: {
                list: jest.fn(),
                create: jest.fn()
            }
        };
        jest.clearAllMocks();
    });
    it('should initialize cloudflareClient when CLOUDFLARE_API_KEY is defined', ()=>{
        const mockApiKey = 'test-api-key';
        jest.spyOn(twentyConfigService, 'get').mockReturnValue(mockApiKey);
        const instance = new _dnsmanagerservice.DnsManagerService(twentyConfigService, {});
        expect(twentyConfigService.get).toHaveBeenCalledWith('CLOUDFLARE_API_KEY');
        expect(_cloudflare.default).toHaveBeenCalledWith({
            apiToken: mockApiKey
        });
        expect(instance.cloudflareClient).toBeDefined();
    });
    describe('registerHostname', ()=>{
        it('should throw an error when the hostname is already registered', async ()=>{
            const customDomain = 'example.com';
            jest.spyOn(dnsManagerService, 'getHostnameId').mockResolvedValueOnce('hostname-id');
            await expect(dnsManagerService.registerHostname(customDomain)).rejects.toThrow(_dnsmanagerexception.DnsManagerException);
            expect(dnsManagerService.getHostnameId).toHaveBeenCalledWith(customDomain, undefined);
        });
        it('should register a custom domain successfully', async ()=>{
            const customDomain = 'example.com';
            const createMock = jest.fn().mockResolvedValueOnce({});
            const cloudflareMock = {
                customHostnames: {
                    create: createMock
                }
            };
            jest.spyOn(dnsManagerService, 'getHostnameId').mockResolvedValueOnce(undefined);
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('test-zone-id');
            dnsManagerService.cloudflareClient = cloudflareMock;
            await dnsManagerService.registerHostname(customDomain);
            expect(createMock).toHaveBeenCalledWith({
                zone_id: 'test-zone-id',
                hostname: customDomain,
                ssl: expect.any(Object)
            });
        });
    });
    describe('getHostnameWithRecords', ()=>{
        it('should return undefined if no custom domain details are found', async ()=>{
            const customDomain = 'example.com';
            const cloudflareMock = {
                customHostnames: {
                    list: jest.fn().mockResolvedValueOnce({
                        result: []
                    })
                }
            };
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('test-zone-id');
            dnsManagerService.cloudflareClient = cloudflareMock;
            const result = await dnsManagerService.getHostnameWithRecords(customDomain, {
                isPublicDomain: false
            });
            expect(result).toBeUndefined();
            expect(cloudflareMock.customHostnames.list).toHaveBeenCalledWith({
                zone_id: 'test-zone-id',
                hostname: customDomain
            });
        });
        it('should return even if no record found', async ()=>{
            const customDomain = 'example.com';
            const mockResult = {
                id: 'custom-id',
                hostname: customDomain,
                ownership_verification: undefined,
                verification_errors: [],
                ssl: {
                    dcv_delegation_records: []
                }
            };
            const cloudflareMock = {
                customHostnames: {
                    list: jest.fn().mockResolvedValueOnce({
                        result: [
                            mockResult
                        ]
                    })
                }
            };
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('test-zone-id');
            jest.spyOn(domainServerConfigService, 'getBaseUrl').mockReturnValue(new URL('https://front.domain'));
            dnsManagerService.cloudflareClient = cloudflareMock;
            const result = await dnsManagerService.getHostnameWithRecords(customDomain, {
                isPublicDomain: false
            });
            expect(result).toEqual({
                id: 'custom-id',
                domain: customDomain,
                records: expect.any(Array)
            });
        });
        it('should return domain details if a single result is found', async ()=>{
            const customDomain = 'example.com';
            const mockResult = {
                id: 'custom-id',
                hostname: customDomain,
                ownership_verification: {
                    type: 'txt',
                    name: 'ownership',
                    value: 'value'
                },
                ssl: {
                    validation_records: [
                        {
                            txt_name: 'ssl',
                            txt_value: 'validation'
                        }
                    ]
                },
                verification_errors: []
            };
            const cloudflareMock = {
                customHostnames: {
                    list: jest.fn().mockResolvedValueOnce({
                        result: [
                            mockResult
                        ]
                    })
                }
            };
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('test-zone-id');
            jest.spyOn(domainServerConfigService, 'getBaseUrl').mockReturnValue(new URL('https://front.domain'));
            dnsManagerService.cloudflareClient = cloudflareMock;
            const result = await dnsManagerService.getHostnameWithRecords(customDomain, {
                isPublicDomain: false
            });
            expect(result).toEqual({
                id: 'custom-id',
                domain: customDomain,
                records: expect.any(Array)
            });
            expect(result?.records[0].value === 'https://front.domain');
        });
        it('should return public domain details', async ()=>{
            const customDomain = 'example.com';
            const mockResult = {
                id: 'custom-id',
                hostname: customDomain,
                ownership_verification: {
                    type: 'txt',
                    name: 'ownership',
                    value: 'value'
                },
                ssl: {
                    validation_records: [
                        {
                            txt_name: 'ssl',
                            txt_value: 'validation'
                        }
                    ]
                },
                verification_errors: []
            };
            const cloudflareMock = {
                customHostnames: {
                    list: jest.fn().mockResolvedValueOnce({
                        result: [
                            mockResult
                        ]
                    })
                }
            };
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('test-zone-id');
            jest.spyOn(domainServerConfigService, 'getBaseUrl').mockReturnValue(new URL('https://front.domain'));
            jest.spyOn(domainServerConfigService, 'getPublicDomainUrl').mockReturnValue(new URL('https://front.public-domain'));
            dnsManagerService.cloudflareClient = cloudflareMock;
            const result = await dnsManagerService.getHostnameWithRecords(customDomain, {
                isPublicDomain: true
            });
            expect(result).toEqual({
                id: 'custom-id',
                domain: customDomain,
                records: expect.any(Array)
            });
            expect(result?.records[0].value === 'https://front.public-domain');
        });
        it('should throw an error if multiple results are found', async ()=>{
            const customDomain = 'example.com';
            const cloudflareMock = {
                customHostnames: {
                    list: jest.fn().mockResolvedValueOnce({
                        result: [
                            {},
                            {}
                        ]
                    })
                }
            };
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('test-zone-id');
            dnsManagerService.cloudflareClient = cloudflareMock;
            await expect(dnsManagerService.getHostnameWithRecords(customDomain, {
                isPublicDomain: false
            })).rejects.toThrow(Error);
        });
    });
    describe('updateHostname', ()=>{
        it('should update a custom domain and register a new one', async ()=>{
            const fromHostname = 'old.com';
            const toHostname = 'new.com';
            jest.spyOn(dnsManagerService, 'getHostnameId').mockResolvedValueOnce('old-id');
            jest.spyOn(dnsManagerService, 'deleteHostname').mockResolvedValueOnce(undefined);
            const registerSpy = jest.spyOn(dnsManagerService, 'registerHostname').mockResolvedValueOnce({});
            await dnsManagerService.updateHostname(fromHostname, toHostname);
            expect(dnsManagerService.getHostnameId).toHaveBeenCalledWith(fromHostname, undefined);
            expect(dnsManagerService.deleteHostname).toHaveBeenCalledWith('old-id', undefined);
            expect(registerSpy).toHaveBeenCalledWith(toHostname, undefined);
        });
    });
    describe('deleteHostnameSilently', ()=>{
        it('should delete the custom hostname silently', async ()=>{
            const customDomain = 'example.com';
            jest.spyOn(dnsManagerService, 'getHostnameId').mockResolvedValueOnce('custom-id');
            const deleteMock = jest.fn();
            const cloudflareMock = {
                customHostnames: {
                    delete: deleteMock
                }
            };
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('test-zone-id');
            dnsManagerService.cloudflareClient = cloudflareMock;
            await expect(dnsManagerService.deleteHostnameSilently(customDomain)).resolves.toBeUndefined();
            expect(deleteMock).toHaveBeenCalledWith('custom-id', {
                zone_id: 'test-zone-id'
            });
        });
        it('should silently handle errors', async ()=>{
            const customDomain = 'example.com';
            jest.spyOn(dnsManagerService, 'getHostnameId').mockRejectedValueOnce(new Error('Failure'));
            await expect(dnsManagerService.deleteHostnameSilently(customDomain)).resolves.toBeUndefined();
        });
    });
});

//# sourceMappingURL=dns-manager.service.spec.js.map