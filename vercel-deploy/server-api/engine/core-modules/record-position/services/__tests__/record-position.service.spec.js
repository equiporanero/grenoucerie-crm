"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _recordpositionservice = require("../record-position.service");
const _globalworkspaceormmanager = require("../../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
describe('RecordPositionService', ()=>{
    let globalWorkspaceOrmManager;
    let mockRepository;
    let service;
    beforeEach(async ()=>{
        mockRepository = {
            findOneBy: jest.fn(),
            update: jest.fn(),
            minimum: jest.fn().mockResolvedValue(1),
            maximum: jest.fn().mockResolvedValue(1)
        };
        globalWorkspaceOrmManager = {
            getRepository: jest.fn().mockResolvedValue(mockRepository),
            executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _recordpositionservice.RecordPositionService,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: globalWorkspaceOrmManager
                }
            ]
        }).compile();
        service = module.get(_recordpositionservice.RecordPositionService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('buildRecordPosition', ()=>{
        const objectMetadata = {
            isCustom: false,
            nameSingular: 'company'
        };
        const workspaceId = 'workspaceId';
        it('should return the value when value is a number', async ()=>{
            const value = 1;
            const result = await service.buildRecordPosition({
                value,
                objectMetadata,
                workspaceId
            });
            expect(result).toEqual(value);
        });
        it('should return the existing position -1 when value is first', async ()=>{
            const value = 'first';
            const result = await service.buildRecordPosition({
                value,
                objectMetadata,
                workspaceId
            });
            expect(result).toEqual(0);
        });
        it('should return the existing position + 1 when value is last', async ()=>{
            const value = 'last';
            const result = await service.buildRecordPosition({
                value,
                objectMetadata,
                workspaceId
            });
            expect(result).toEqual(2);
        });
    });
});

//# sourceMappingURL=record-position.service.spec.js.map