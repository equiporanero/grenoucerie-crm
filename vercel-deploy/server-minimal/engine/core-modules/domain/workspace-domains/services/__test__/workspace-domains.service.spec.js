"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _domainserverconfigservice = require("../../../domain-server-config/services/domain-server-config.service");
const _workspacedomainsservice = require("../workspace-domains.service");
const _publicdomainentity = require("../../../../public-domain/public-domain.entity");
const _twentyconfigservice = require("../../../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../../../workspace/workspace.entity");
describe('WorkspaceDomainsService', ()=>{
    let workspaceDomainsService;
    let twentyConfigService;
    let workspaceRepository;
    let publicDomainRepository;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _domainserverconfigservice.DomainServerConfigService,
                _workspacedomainsservice.WorkspaceDomainsService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_publicdomainentity.PublicDomainEntity),
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
        workspaceRepository = module.get((0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity));
        publicDomainRepository = module.get((0, _typeorm.getRepositoryToken)(_publicdomainentity.PublicDomainEntity));
        workspaceDomainsService = module.get(_workspacedomainsservice.WorkspaceDomainsService);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
    });
    describe('getWorkspaceUrls', ()=>{
        it('should return a URL containing the correct customDomain if customDomain is provided', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com'
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            const result = workspaceDomainsService.getWorkspaceUrls({
                subdomain: 'subdomain',
                customDomain: 'custom-host.com',
                isCustomDomainEnabled: true
            });
            expect(result).toEqual({
                customUrl: 'https://custom-host.com/',
                subdomainUrl: 'https://example.com/'
            });
        });
        it('should return a URL containing the correct subdomain if customDomain is not provided but subdomain is', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com',
                    IS_MULTIWORKSPACE_ENABLED: true
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            const result = workspaceDomainsService.getWorkspaceUrls({
                subdomain: 'subdomain',
                customDomain: null,
                isCustomDomainEnabled: false
            });
            expect(result).toEqual({
                customUrl: undefined,
                subdomainUrl: 'https://subdomain.example.com/'
            });
        });
    });
    describe('buildWorkspaceURL', ()=>{
        it('should build workspace URL with given subdomain', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com',
                    IS_MULTIWORKSPACE_ENABLED: true,
                    DEFAULT_SUBDOMAIN: 'default'
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            const result = workspaceDomainsService.buildWorkspaceURL({
                workspace: {
                    subdomain: 'test',
                    customDomain: null,
                    isCustomDomainEnabled: false
                }
            });
            expect(result.toString()).toBe('https://test.example.com/');
        });
        it('should set the pathname if provided', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com'
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            const result = workspaceDomainsService.buildWorkspaceURL({
                workspace: {
                    subdomain: 'test',
                    customDomain: null,
                    isCustomDomainEnabled: false
                },
                pathname: '/path/to/resource'
            });
            expect(result.pathname).toBe('/path/to/resource');
        });
        it('should set the search parameters if provided', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com'
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            const result = workspaceDomainsService.buildWorkspaceURL({
                workspace: {
                    subdomain: 'test',
                    customDomain: null,
                    isCustomDomainEnabled: false
                },
                searchParams: {
                    foo: 'bar',
                    baz: 123
                }
            });
            expect(result.searchParams.get('foo')).toBe('bar');
            expect(result.searchParams.get('baz')).toBe('123');
        });
    });
    describe('getWorkspaceByOriginOrDefaultWorkspace', ()=>{
        it('should return default workspace if IS_MULTIWORKSPACE_ENABLED=false', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com',
                    IS_MULTIWORKSPACE_ENABLED: false
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            jest.spyOn(workspaceRepository, 'find').mockResolvedValueOnce([
                {
                    id: 'workspace-id'
                }
            ]);
            const result = await workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace('https://example.com');
            expect(result?.id).toEqual('workspace-id');
        });
        it('should return 1st workspace if multiple workspaces when IS_MULTIWORKSPACE_ENABLED=false', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com',
                    IS_MULTIWORKSPACE_ENABLED: false
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            jest.spyOn(workspaceRepository, 'find').mockResolvedValueOnce([
                {
                    id: 'workspace-id1'
                },
                {
                    id: 'workspace-id2'
                }
            ]);
            const result = await workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace('https://example.com');
            expect(result?.id).toEqual('workspace-id1');
        });
        it('should return workspace by subdomain', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com',
                    IS_MULTIWORKSPACE_ENABLED: true
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValueOnce({
                id: 'workspace-id1',
                subdomain: '123'
            });
            const result = await workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace('https://123.example.com');
            expect(result?.id).toEqual('workspace-id1');
        });
        it('should return workspace by customDomain', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com',
                    IS_MULTIWORKSPACE_ENABLED: true
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValueOnce({
                id: 'workspace-id1',
                customDomain: '123.custom.com'
            });
            const result = await workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace('https://123.custom.com');
            expect(result?.id).toEqual('workspace-id1');
        });
        it('should return workspace by publicDomain', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com',
                    IS_MULTIWORKSPACE_ENABLED: true
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValueOnce({
                id: 'workspace-id1'
            });
            jest.spyOn(publicDomainRepository, 'findOne').mockResolvedValueOnce({
                domain: '123.custom.com',
                workspaceId: 'workspace-id1'
            });
            const result = await workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace('https://123.custom.com');
            expect(result?.id).toEqual('workspace-id1');
        });
        it('should return undefined if nothing found', async ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                const env = {
                    FRONTEND_URL: 'https://example.com',
                    IS_MULTIWORKSPACE_ENABLED: true
                };
                // @ts-expect-error legacy noImplicitAny
                return env[key];
            });
            jest.spyOn(workspaceRepository, 'findOne').mockResolvedValueOnce(null);
            jest.spyOn(publicDomainRepository, 'findOne').mockResolvedValueOnce(null);
            const result = await workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace('https://123.custom.com');
            expect(result).toEqual(undefined);
        });
    });
});

//# sourceMappingURL=workspace-domains.service.spec.js.map