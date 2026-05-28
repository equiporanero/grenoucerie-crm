"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _approvedaccessdomainentity = require("../../../../approved-access-domain/approved-access-domain.entity");
const _domainserverconfigservice = require("../domain-server-config.service");
const _twentyconfigservice = require("../../../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../../../workspace/workspace.entity");
describe('SubdomainManagerService', ()=>{
    let domainServerConfigService;
    let twentyConfigService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _domainserverconfigservice.DomainServerConfigService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_approvedaccessdomainentity.ApprovedAccessDomainEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                }
            ]
        }).compile();
        domainServerConfigService = module.get(_domainserverconfigservice.DomainServerConfigService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
    });
    describe('buildBaseUrl', ()=>{
        it('should build the base URL from environment variables', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com'
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            const result = domainServerConfigService.getBaseUrl();
            expect(result.toString()).toBe('https://example.com/');
        });
        it('should append default subdomain if multiworkspace is enabled', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com',
                    IS_MULTIWORKSPACE_ENABLED: true,
                    DEFAULT_SUBDOMAIN: 'test'
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            const result = domainServerConfigService.getBaseUrl();
            expect(result.toString()).toBe('https://test.example.com/');
        });
    });
});

//# sourceMappingURL=domain-server-config.service.spec.js.map