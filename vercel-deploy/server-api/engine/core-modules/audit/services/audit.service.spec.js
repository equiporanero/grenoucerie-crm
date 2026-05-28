"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _auditcontextmock = require("test/utils/audit-context.mock");
const _clickHouseservice = require("../../../../database/clickHouse/clickHouse.service");
const _objectrecordcreated = require("../utils/events/object-event/object-record-created");
const _customdomainactivated = require("../utils/events/workspace-event/custom-domain/custom-domain-activated");
const _exceptionhandlerservice = require("../../exception-handler/exception-handler.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _auditservice = require("./audit.service");
describe('AuditService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                {
                    provide: _auditservice.AuditService,
                    useValue: {
                        createContext: _auditcontextmock.AuditContextMock
                    }
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue(true)
                    }
                },
                {
                    provide: _clickHouseservice.ClickHouseService,
                    useValue: {
                        pushEvent: jest.fn()
                    }
                },
                {
                    provide: _exceptionhandlerservice.ExceptionHandlerService,
                    useValue: {
                        captureExceptions: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_auditservice.AuditService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('createContext', ()=>{
        const mockUserIdAndWorkspaceId = {
            userId: 'test-user-id',
            workspaceId: 'test-workspace-id'
        };
        it('should create a valid context object', ()=>{
            const context = service.createContext(mockUserIdAndWorkspaceId);
            expect(context).toHaveProperty('insertWorkspaceEvent');
            expect(context).toHaveProperty('createObjectEvent');
            expect(context).toHaveProperty('createPageviewEvent');
        });
        it('should call insertWorkspaceEvent with correct parameters', async ()=>{
            const insertWorkspaceEventSpy = jest.fn().mockResolvedValue({
                success: true
            });
            const mockContext = (0, _auditcontextmock.AuditContextMock)({
                insertWorkspaceEvent: insertWorkspaceEventSpy
            });
            jest.spyOn(service, 'createContext').mockReturnValue(mockContext);
            const context = service.createContext(mockUserIdAndWorkspaceId);
            await context.insertWorkspaceEvent(_customdomainactivated.CUSTOM_DOMAIN_ACTIVATED_EVENT, {});
            expect(insertWorkspaceEventSpy).toHaveBeenCalledWith(_customdomainactivated.CUSTOM_DOMAIN_ACTIVATED_EVENT, {});
        });
        it('should call createPageviewEvent with correct parameters', async ()=>{
            const createPageviewEventSpy = jest.fn().mockResolvedValue({
                success: true
            });
            const mockContext = (0, _auditcontextmock.AuditContextMock)({
                createPageviewEvent: createPageviewEventSpy
            });
            jest.spyOn(service, 'createContext').mockReturnValue(mockContext);
            const context = service.createContext(mockUserIdAndWorkspaceId);
            const testPageviewProperties = {
                href: '/test-url',
                locale: '',
                pathname: '',
                referrer: '',
                sessionId: '',
                timeZone: '',
                userAgent: ''
            };
            await context.createPageviewEvent('page-view', testPageviewProperties);
            expect(createPageviewEventSpy).toHaveBeenCalledWith('page-view', testPageviewProperties);
        });
        it('should return success when insertWorkspaceEvent is called', async ()=>{
            const context = service.createContext(mockUserIdAndWorkspaceId);
            const result = await context.insertWorkspaceEvent(_customdomainactivated.CUSTOM_DOMAIN_ACTIVATED_EVENT, {});
            expect(result).toEqual({
                success: true
            });
        });
        it('should return success when createPageviewEvent is called', async ()=>{
            const context = service.createContext(mockUserIdAndWorkspaceId);
            const result = await context.createPageviewEvent('page-view', {});
            expect(result).toEqual({
                success: true
            });
        });
        it('should return success when createObjectEvent is called', async ()=>{
            const context = service.createContext(mockUserIdAndWorkspaceId);
            const result = await context.createObjectEvent(_objectrecordcreated.OBJECT_RECORD_CREATED_EVENT, {
                recordId: 'test-record-id',
                objectMetadataId: 'test-object-metadata-id'
            });
            expect(result).toEqual({
                success: true
            });
        });
    });
});

//# sourceMappingURL=audit.service.spec.js.map