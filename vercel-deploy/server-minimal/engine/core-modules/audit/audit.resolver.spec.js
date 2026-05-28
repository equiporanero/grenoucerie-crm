"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _auditexception = require("./audit.exception");
const _auditresolver = require("./audit.resolver");
const _auditservice = require("./services/audit.service");
describe('AuditResolver', ()=>{
    let resolver;
    let auditService;
    beforeEach(async ()=>{
        auditService = {
            createContext: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _auditresolver.AuditResolver,
                {
                    provide: _auditservice.AuditService,
                    useValue: auditService
                }
            ]
        }).compile();
        resolver = module.get(_auditresolver.AuditResolver);
    });
    it('should be defined', ()=>{
        expect(resolver).toBeDefined();
    });
    it('should handle a valid pageview input', async ()=>{
        const mockInsertPageviewEvent = jest.fn().mockResolvedValue('Pageview created');
        auditService.createContext.mockReturnValue({
            createPageviewEvent: mockInsertPageviewEvent,
            insertWorkspaceEvent: jest.fn(),
            createObjectEvent: jest.fn()
        });
        const input = {
            type: 'pageview',
            name: 'Test Page',
            properties: {}
        };
        const result = await resolver.trackAnalytics(input, {
            id: 'workspace-1'
        }, {
            id: 'user-1'
        });
        expect(auditService.createContext).toHaveBeenCalledWith({
            workspaceId: 'workspace-1',
            userId: 'user-1'
        });
        expect(mockInsertPageviewEvent).toHaveBeenCalledWith('Test Page', {});
        expect(result).toBe('Pageview created');
    });
    it('should handle a valid track input', async ()=>{
        const mockInsertWorkspaceEvent = jest.fn().mockResolvedValue('Track created');
        auditService.createContext.mockReturnValue({
            insertWorkspaceEvent: mockInsertWorkspaceEvent,
            createObjectEvent: jest.fn(),
            createPageviewEvent: jest.fn()
        });
        const input = {
            type: 'track',
            event: 'Custom Domain Activated',
            properties: {}
        };
        const result = await resolver.trackAnalytics(input, {
            id: 'workspace-2'
        }, {
            id: 'user-2'
        });
        expect(auditService.createContext).toHaveBeenCalledWith({
            workspaceId: 'workspace-2',
            userId: 'user-2'
        });
        expect(mockInsertWorkspaceEvent).toHaveBeenCalledWith('Custom Domain Activated', {});
        expect(result).toBe('Track created');
    });
    it('should handle object event creation', async ()=>{
        const mockInsertObjectEvent = jest.fn().mockResolvedValue('Object event created');
        auditService.createContext.mockReturnValue({
            insertWorkspaceEvent: jest.fn(),
            createObjectEvent: mockInsertObjectEvent,
            createPageviewEvent: jest.fn()
        });
        const input = {
            event: 'Object Record Created',
            recordId: 'test-record-id',
            objectMetadataId: 'test-object-metadata-id',
            properties: {
                additionalData: 'test-data'
            }
        };
        const result = await resolver.createObjectEvent(input, {
            id: 'workspace-3'
        }, {
            id: 'user-3'
        });
        expect(auditService.createContext).toHaveBeenCalledWith({
            workspaceId: 'workspace-3',
            userId: 'user-3'
        });
        expect(mockInsertObjectEvent).toHaveBeenCalledWith('Object Record Created', {
            additionalData: 'test-data',
            recordId: 'test-record-id',
            objectMetadataId: 'test-object-metadata-id',
            isCustom: true
        });
        expect(result).toBe('Object event created');
    });
    it('should throw an AuditException for invalid input', async ()=>{
        const invalidInput = {
            type: 'invalid'
        };
        await expect(resolver.trackAnalytics(invalidInput, undefined, undefined)).rejects.toThrowError(new _auditexception.AuditException('Invalid analytics input', _auditexception.AuditExceptionCode.INVALID_TYPE));
    });
    it('should throw an AuditException when workspace is missing for createObjectEvent', async ()=>{
        const input = {
            event: 'Object Record Created',
            recordId: 'test-record-id',
            objectMetadataId: 'test-object-metadata-id'
        };
        await expect(resolver.createObjectEvent(input, undefined, undefined)).rejects.toThrowError(new _auditexception.AuditException('Missing workspace', _auditexception.AuditExceptionCode.INVALID_INPUT));
    });
});

//# sourceMappingURL=audit.resolver.spec.js.map