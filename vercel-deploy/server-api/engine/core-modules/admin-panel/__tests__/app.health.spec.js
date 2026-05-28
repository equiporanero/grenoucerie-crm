"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _terminus = require("@nestjs/terminus");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _apphealth = require("../indicators/app.health");
const _workspaceentity = require("../../workspace/workspace.entity");
describe('AppHealthIndicator', ()=>{
    let service;
    let workspaceRepository;
    let healthIndicatorService;
    beforeEach(async ()=>{
        workspaceRepository = {
            count: jest.fn()
        };
        healthIndicatorService = {
            check: jest.fn().mockReturnValue({
                up: jest.fn().mockImplementation((data)=>({
                        app: {
                            status: 'up',
                            ...data
                        }
                    })),
                down: jest.fn().mockImplementation((data)=>({
                        app: {
                            status: 'down',
                            ...data
                        }
                    }))
            })
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _apphealth.AppHealthIndicator,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: workspaceRepository
                },
                {
                    provide: _terminus.HealthIndicatorService,
                    useValue: healthIndicatorService
                }
            ]
        }).compile();
        service = module.get(_apphealth.AppHealthIndicator);
        jest.useFakeTimers();
    });
    afterEach(()=>{
        jest.useRealTimers();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    it('should return up status when no issues and no pending migrations', async ()=>{
        workspaceRepository.count.mockResolvedValue(2);
        const result = await service.isHealthy();
        expect(result.app.status).toBe('up');
        expect(result.app.details.overview.totalWorkspacesCount).toBe(2);
        expect(result.app.details.overview.erroredWorkspaceCount).toBe(0);
        expect(result.app.details.system.nodeVersion).toBeDefined();
        expect(result.app.details.system.timestamp).toBeDefined();
    });
    it('should maintain state history across health checks', async ()=>{
        // First check - healthy state
        workspaceRepository.count.mockResolvedValue(2);
        await service.isHealthy();
        // Second check - error state
        workspaceRepository.count.mockRejectedValue(new Error('Database connection failed'));
        const result = await service.isHealthy();
        expect(result.app.details.stateHistory).toBeDefined();
        expect(result.app.details.stateHistory.age).toBeDefined();
        expect(result.app.details.stateHistory.timestamp).toBeDefined();
        expect(result.app.details.stateHistory.details).toBeDefined();
    });
});

//# sourceMappingURL=app.health.spec.js.map