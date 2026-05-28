"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _cachestoragenamespaceenum = require("../../../../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _exceptionhandlerservice = require("../../../../../../../engine/core-modules/exception-handler/exception-handler.service");
const _workspaceentity = require("../../../../../../../engine/core-modules/workspace/workspace.entity");
const _workflowcrontriggercachekeyconstant = require("../../constants/workflow-cron-trigger-cache-key.constant");
const _workflowcrontriggercachettlconstant = require("../../constants/workflow-cron-trigger-cache-ttl.constant");
const _workflowcrontriggercronjob = require("../workflow-cron-trigger-cron.job");
const _workflowtriggerjob = require("../../../../jobs/workflow-trigger.job");
const WORKSPACE_1 = '20202020-0000-0000-0000-000000000001';
const WORKSPACE_2 = '20202020-0000-0000-0000-000000000002';
const WORKSPACE_3 = '20202020-0000-0000-0000-000000000003';
const mockCoreDataSource = {
    query: jest.fn()
};
const mockWorkspaceRepository = {
    find: jest.fn()
};
const mockMessageQueueService = {
    add: jest.fn()
};
const mockExceptionHandlerService = {
    captureExceptions: jest.fn()
};
const mockCacheStorageService = {
    hashGetValues: jest.fn(),
    hashSet: jest.fn(),
    hashSetWithExpire: jest.fn()
};
describe('WorkflowCronTriggerCronJob', ()=>{
    let job;
    beforeEach(async ()=>{
        jest.clearAllMocks();
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-04-02T15:00:30.000Z'));
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workflowcrontriggercronjob.WorkflowCronTriggerCronJob,
                {
                    provide: (0, _typeorm.getDataSourceToken)(),
                    useValue: mockCoreDataSource
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: mockWorkspaceRepository
                },
                {
                    provide: 'MESSAGE_QUEUE_workflow-queue',
                    useValue: mockMessageQueueService
                },
                {
                    provide: _exceptionhandlerservice.ExceptionHandlerService,
                    useValue: mockExceptionHandlerService
                },
                {
                    provide: _cachestoragenamespaceenum.CacheStorageNamespace.ModuleWorkflow,
                    useValue: mockCacheStorageService
                }
            ]
        }).compile();
        job = module.get(_workflowcrontriggercronjob.WorkflowCronTriggerCronJob);
    });
    afterEach(()=>{
        jest.useRealTimers();
    });
    describe('handle - cache hit', ()=>{
        it('should process cached triggers without querying the database', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([
                JSON.stringify({
                    workspaceId: WORKSPACE_1,
                    workflowId: 'workflow-1',
                    pattern: '* * * * *'
                })
            ]);
            await job.handle();
            expect(mockCacheStorageService.hashGetValues).toHaveBeenCalledWith(_workflowcrontriggercachekeyconstant.WORKFLOW_CRON_TRIGGER_CACHE_KEY);
            expect(mockWorkspaceRepository.find).not.toHaveBeenCalled();
            expect(mockCoreDataSource.query).not.toHaveBeenCalled();
        });
        it('should enqueue jobs for matching cron triggers', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([
                JSON.stringify({
                    workspaceId: WORKSPACE_1,
                    workflowId: 'workflow-1',
                    pattern: '* * * * *'
                })
            ]);
            await job.handle();
            expect(mockMessageQueueService.add).toHaveBeenCalledWith(_workflowtriggerjob.WorkflowTriggerJob.name, {
                workspaceId: WORKSPACE_1,
                workflowId: 'workflow-1',
                payload: {}
            }, {
                retryLimit: 3
            });
        });
        it('should not enqueue jobs when cron pattern does not match', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([
                JSON.stringify({
                    workspaceId: WORKSPACE_1,
                    workflowId: 'workflow-1',
                    pattern: '0 0 1 1 *'
                })
            ]);
            await job.handle();
            expect(mockMessageQueueService.add).not.toHaveBeenCalled();
        });
        it('should skip triggers with undefined pattern', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([
                JSON.stringify({
                    workspaceId: WORKSPACE_1,
                    workflowId: 'workflow-1'
                })
            ]);
            await job.handle();
            expect(mockMessageQueueService.add).not.toHaveBeenCalled();
        });
        it('should not rebuild cache on cache hit', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([
                JSON.stringify({
                    workspaceId: WORKSPACE_1,
                    workflowId: 'workflow-1',
                    pattern: '* * * * *'
                })
            ]);
            await job.handle();
            expect(mockCacheStorageService.hashSet).not.toHaveBeenCalled();
            expect(mockCacheStorageService.hashSetWithExpire).not.toHaveBeenCalled();
        });
    });
    describe('handle - cache miss', ()=>{
        it('should perform full scan when cache is empty', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([]);
            mockWorkspaceRepository.find.mockResolvedValue([
                {
                    id: WORKSPACE_1
                },
                {
                    id: WORKSPACE_2
                },
                {
                    id: WORKSPACE_3
                }
            ]);
            mockCoreDataSource.query.mockResolvedValue([]);
            await job.handle();
            expect(mockWorkspaceRepository.find).toHaveBeenCalled();
            expect(mockCoreDataSource.query).toHaveBeenCalledTimes(3);
        });
        it('should use hashSetWithExpire for every trigger so the TTL is always set', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([]);
            mockWorkspaceRepository.find.mockResolvedValue([
                {
                    id: WORKSPACE_1
                },
                {
                    id: WORKSPACE_2
                },
                {
                    id: WORKSPACE_3
                }
            ]);
            mockCoreDataSource.query.mockResolvedValueOnce([
                {
                    id: 'trigger-1',
                    workflowId: 'workflow-1',
                    settings: {
                        pattern: '* * * * *'
                    }
                }
            ]).mockResolvedValueOnce([]).mockResolvedValueOnce([
                {
                    id: 'trigger-2',
                    workflowId: 'workflow-2',
                    settings: {
                        pattern: '* * * * *'
                    }
                }
            ]);
            await job.handle();
            // hashSet must never be called during a rebuild: any non-atomic write
            // could recreate the key without a TTL if it was flushed/evicted
            // mid-rebuild, leaving cron workflows permanently stuck.
            expect(mockCacheStorageService.hashSet).not.toHaveBeenCalled();
            expect(mockCacheStorageService.hashSetWithExpire).toHaveBeenCalledTimes(2);
            expect(mockCacheStorageService.hashSetWithExpire).toHaveBeenNthCalledWith(1, {
                key: _workflowcrontriggercachekeyconstant.WORKFLOW_CRON_TRIGGER_CACHE_KEY,
                field: 'workflow-1',
                value: JSON.stringify({
                    workspaceId: WORKSPACE_1,
                    workflowId: 'workflow-1',
                    pattern: '* * * * *'
                }),
                ttlMs: _workflowcrontriggercachettlconstant.WORKFLOW_CRON_TRIGGER_CACHE_TTL_MS
            });
            expect(mockCacheStorageService.hashSetWithExpire).toHaveBeenNthCalledWith(2, {
                key: _workflowcrontriggercachekeyconstant.WORKFLOW_CRON_TRIGGER_CACHE_KEY,
                field: 'workflow-2',
                value: JSON.stringify({
                    workspaceId: WORKSPACE_3,
                    workflowId: 'workflow-2',
                    pattern: '* * * * *'
                }),
                ttlMs: _workflowcrontriggercachettlconstant.WORKFLOW_CRON_TRIGGER_CACHE_TTL_MS
            });
        });
        it('should not write to cache when no workspaces have cron triggers', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([]);
            mockWorkspaceRepository.find.mockResolvedValue([
                {
                    id: WORKSPACE_1
                }
            ]);
            mockCoreDataSource.query.mockResolvedValue([]);
            await job.handle();
            expect(mockCacheStorageService.hashSet).not.toHaveBeenCalled();
            expect(mockCacheStorageService.hashSetWithExpire).not.toHaveBeenCalled();
        });
    });
    describe('error handling', ()=>{
        it('should catch errors for cached triggers and continue processing', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([
                'invalid-json',
                JSON.stringify({
                    workspaceId: WORKSPACE_2,
                    workflowId: 'workflow-1',
                    pattern: '* * * * *'
                })
            ]);
            await job.handle();
            expect(mockExceptionHandlerService.captureExceptions).toHaveBeenCalledWith([
                expect.any(Error)
            ]);
            expect(mockMessageQueueService.add).toHaveBeenCalledWith(_workflowtriggerjob.WorkflowTriggerJob.name, {
                workspaceId: WORKSPACE_2,
                workflowId: 'workflow-1',
                payload: {}
            }, {
                retryLimit: 3
            });
        });
        it('should catch errors per workspace during full scan and continue', async ()=>{
            mockCacheStorageService.hashGetValues.mockResolvedValue([]);
            mockWorkspaceRepository.find.mockResolvedValue([
                {
                    id: WORKSPACE_1
                },
                {
                    id: WORKSPACE_2
                }
            ]);
            mockCoreDataSource.query.mockRejectedValueOnce(new Error('Schema not found')).mockResolvedValueOnce([
                {
                    id: 'trigger-1',
                    workflowId: 'workflow-1',
                    settings: {
                        pattern: '* * * * *'
                    }
                }
            ]);
            await job.handle();
            expect(mockExceptionHandlerService.captureExceptions).toHaveBeenCalledWith([
                expect.any(Error)
            ], {
                workspace: {
                    id: WORKSPACE_1
                }
            });
            expect(mockMessageQueueService.add).toHaveBeenCalledWith(_workflowtriggerjob.WorkflowTriggerJob.name, {
                workspaceId: WORKSPACE_2,
                workflowId: 'workflow-1',
                payload: {}
            }, {
                retryLimit: 3
            });
        });
    });
});

//# sourceMappingURL=workflow-cron-trigger-cron.job.spec.js.map