"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _workspace = require("twenty-shared/workspace");
const _coreentitycacheservice = require("../../../../core-entity-cache/services/core-entity-cache.service");
const _upgrademigrationservice = require("../upgrade-migration.service");
const _upgradesequencereaderservice = require("../upgrade-sequence-reader.service");
const _upgradestatuscacheservice = require("../upgrade-status-cache.service");
const _upgradestatusservice = require("../upgrade-status.service");
const _workspaceentity = require("../../../workspace/workspace.entity");
const LAST_INSTANCE_COMMAND = '1.23.0_LastInstanceCommand_1780000002000';
const LAST_WORKSPACE_COMMAND = '1.23.0_LastWorkspaceCommand_1780000003000';
const EARLIER_COMMAND = '1.22.0_EarlierCommand_1776000001000';
const MOCK_SEQUENCE = [
    {
        kind: 'fast-instance',
        name: EARLIER_COMMAND
    },
    {
        kind: 'fast-instance',
        name: LAST_INSTANCE_COMMAND
    },
    {
        kind: 'workspace',
        name: LAST_WORKSPACE_COMMAND
    }
];
const buildWorkspaceCacheGetMock = (workspaces)=>{
    const byId = new Map(workspaces.map((workspace)=>[
            workspace.id,
            workspace
        ]));
    return jest.fn(async (_cacheKey, workspaceId)=>{
        const workspace = byId.get(workspaceId);
        if (!workspace) {
            return null;
        }
        return {
            activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE,
            ...workspace
        };
    });
};
describe('UpgradeStatusService', ()=>{
    let service;
    let getLastAttemptedInstanceCommand;
    let getInferredVersion;
    let getWorkspaceLastAttemptedCommandName;
    let workspaceFind;
    let coreEntityCacheGet;
    let cacheGetComputedAt;
    let cacheGetBehindWorkspaceIds;
    let cacheGetFailedWorkspaceIds;
    let cacheGetUpToDateWorkspaceCount;
    let cacheWrite;
    let cacheInvalidate;
    const mockActiveWorkspaces = (workspaces)=>{
        workspaceFind.mockResolvedValue(workspaces);
        coreEntityCacheGet.mockImplementation(buildWorkspaceCacheGetMock(workspaces));
    };
    beforeEach(async ()=>{
        getLastAttemptedInstanceCommand = jest.fn();
        getInferredVersion = jest.fn(async (name)=>{
            if (!name) return null;
            const idx = name.indexOf('_');
            return idx === -1 ? null : name.substring(0, idx);
        });
        getWorkspaceLastAttemptedCommandName = jest.fn();
        workspaceFind = jest.fn().mockResolvedValue([]);
        coreEntityCacheGet = jest.fn().mockResolvedValue(null);
        cacheGetComputedAt = jest.fn();
        cacheGetBehindWorkspaceIds = jest.fn().mockResolvedValue([]);
        cacheGetFailedWorkspaceIds = jest.fn().mockResolvedValue([]);
        cacheGetUpToDateWorkspaceCount = jest.fn().mockResolvedValue(0);
        cacheWrite = jest.fn().mockResolvedValue(undefined);
        cacheInvalidate = jest.fn().mockResolvedValue(undefined);
        const module = await _testing.Test.createTestingModule({
            providers: [
                _upgradestatusservice.UpgradeStatusService,
                {
                    provide: _upgrademigrationservice.UpgradeMigrationService,
                    useValue: {
                        getLastAttemptedInstanceCommand,
                        getInferredVersion,
                        getWorkspaceLastAttemptedCommandName
                    }
                },
                {
                    provide: _upgradesequencereaderservice.UpgradeSequenceReaderService,
                    useValue: {
                        getUpgradeSequence: ()=>MOCK_SEQUENCE
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_workspaceentity.WorkspaceEntity),
                    useValue: {
                        find: workspaceFind
                    }
                },
                {
                    provide: _coreentitycacheservice.CoreEntityCacheService,
                    useValue: {
                        get: coreEntityCacheGet
                    }
                },
                {
                    provide: _upgradestatuscacheservice.UpgradeStatusCacheService,
                    useValue: {
                        getComputedAt: cacheGetComputedAt,
                        getBehindWorkspaceIds: cacheGetBehindWorkspaceIds,
                        getFailedWorkspaceIds: cacheGetFailedWorkspaceIds,
                        getUpToDateWorkspaceCount: cacheGetUpToDateWorkspaceCount,
                        write: cacheWrite,
                        invalidate: cacheInvalidate
                    }
                }
            ]
        }).compile();
        service = module.get(_upgradestatusservice.UpgradeStatusService);
    });
    describe('getInstanceStatus', ()=>{
        it('should return up-to-date when cursor is at last instance command', async ()=>{
            getLastAttemptedInstanceCommand.mockResolvedValue({
                name: LAST_INSTANCE_COMMAND,
                status: 'completed',
                executedByVersion: '1.23.0',
                errorMessage: null,
                createdAt: new Date('2025-06-01T00:00:00Z')
            });
            const result = await service.getInstanceStatus();
            expect(result.health).toBe(_types.UpgradeHealthEnum.UP_TO_DATE);
            expect(result.inferredVersion).toBe('1.23.0');
        });
        it('should return behind when cursor is before last instance command', async ()=>{
            getLastAttemptedInstanceCommand.mockResolvedValue({
                name: EARLIER_COMMAND,
                status: 'completed',
                executedByVersion: '1.22.0',
                errorMessage: null,
                createdAt: new Date('2025-06-01T00:00:00Z')
            });
            const result = await service.getInstanceStatus();
            expect(result.health).toBe(_types.UpgradeHealthEnum.BEHIND);
            expect(result.inferredVersion).toBe('1.22.0');
        });
        it('should return failed when latest instance command failed', async ()=>{
            getLastAttemptedInstanceCommand.mockResolvedValue({
                name: LAST_INSTANCE_COMMAND,
                status: 'failed',
                executedByVersion: '1.23.0',
                errorMessage: 'column does not exist',
                createdAt: new Date('2025-06-01T01:00:00Z')
            });
            const result = await service.getInstanceStatus();
            expect(result.health).toBe(_types.UpgradeHealthEnum.FAILED);
            expect(result.latestCommand?.errorMessage).toBe('column does not exist');
        });
        it('should return behind when no migrations exist', async ()=>{
            getLastAttemptedInstanceCommand.mockResolvedValue(null);
            const result = await service.getInstanceStatus();
            expect(result.health).toBe(_types.UpgradeHealthEnum.BEHIND);
            expect(result.inferredVersion).toBeNull();
            expect(result.latestCommand).toBeNull();
        });
    });
    describe('getWorkspaceStatuses', ()=>{
        it('should return up-to-date for workspace at last command', async ()=>{
            mockActiveWorkspaces([
                {
                    id: 'ws-1',
                    displayName: 'Apple'
                }
            ]);
            getWorkspaceLastAttemptedCommandName.mockResolvedValue(new Map([
                [
                    'ws-1',
                    {
                        workspaceId: 'ws-1',
                        name: LAST_WORKSPACE_COMMAND,
                        status: 'completed',
                        executedByVersion: '1.23.0',
                        errorMessage: null,
                        createdAt: new Date('2025-06-01T00:00:00Z')
                    }
                ]
            ]));
            const results = await service.getWorkspaceStatuses();
            expect(results).toHaveLength(1);
            expect(results[0].health).toBe(_types.UpgradeHealthEnum.UP_TO_DATE);
        });
        it('should return behind for workspace not at last command', async ()=>{
            mockActiveWorkspaces([
                {
                    id: 'ws-1',
                    displayName: 'Apple'
                },
                {
                    id: 'ws-2',
                    displayName: 'Google'
                }
            ]);
            getWorkspaceLastAttemptedCommandName.mockResolvedValue(new Map([
                [
                    'ws-1',
                    {
                        workspaceId: 'ws-1',
                        name: LAST_WORKSPACE_COMMAND,
                        status: 'completed',
                        executedByVersion: '1.23.0',
                        errorMessage: null,
                        createdAt: new Date('2025-06-01T00:00:00Z')
                    }
                ],
                [
                    'ws-2',
                    {
                        workspaceId: 'ws-2',
                        name: EARLIER_COMMAND,
                        status: 'completed',
                        executedByVersion: '1.22.0',
                        errorMessage: null,
                        createdAt: new Date('2025-05-01T00:00:00Z')
                    }
                ]
            ]));
            const results = await service.getWorkspaceStatuses();
            expect(results).toHaveLength(2);
            expect(results[0].health).toBe(_types.UpgradeHealthEnum.UP_TO_DATE);
            expect(results[1].health).toBe(_types.UpgradeHealthEnum.BEHIND);
        });
        it('should return behind for workspace with no migration history', async ()=>{
            mockActiveWorkspaces([
                {
                    id: 'ws-1',
                    displayName: 'Apple'
                }
            ]);
            getWorkspaceLastAttemptedCommandName.mockResolvedValue(new Map());
            const results = await service.getWorkspaceStatuses();
            expect(results).toHaveLength(1);
            expect(results[0].health).toBe(_types.UpgradeHealthEnum.BEHIND);
            expect(results[0].latestCommand).toBeNull();
        });
        it('should return empty array when no workspaces exist', async ()=>{
            mockActiveWorkspaces([]);
            getWorkspaceLastAttemptedCommandName.mockResolvedValue(new Map());
            const results = await service.getWorkspaceStatuses();
            expect(results).toHaveLength(0);
        });
    });
    describe('getInstanceAndAllWorkspacesStatus', ()=>{
        it('should hydrate cached behind/failed ids with display names without calling getWorkspaceStatuses', async ()=>{
            const computedAt = new Date('2025-06-02T10:00:00Z');
            cacheGetComputedAt.mockResolvedValue(computedAt);
            cacheGetBehindWorkspaceIds.mockResolvedValue([
                'ws-2'
            ]);
            cacheGetFailedWorkspaceIds.mockResolvedValue([
                'ws-3'
            ]);
            cacheGetUpToDateWorkspaceCount.mockResolvedValue(5);
            getLastAttemptedInstanceCommand.mockResolvedValue({
                name: LAST_INSTANCE_COMMAND,
                status: 'completed',
                executedByVersion: '1.23.0',
                errorMessage: null,
                createdAt: new Date('2025-06-01T00:00:00Z')
            });
            coreEntityCacheGet.mockImplementation(buildWorkspaceCacheGetMock([
                {
                    id: 'ws-2',
                    displayName: 'Banana'
                },
                {
                    id: 'ws-3',
                    displayName: 'Cherry'
                }
            ]));
            const result = await service.getInstanceAndAllWorkspacesStatus();
            expect(result.workspacesBehind).toEqual([
                {
                    id: 'ws-2',
                    name: 'Banana'
                }
            ]);
            expect(result.workspacesFailed).toEqual([
                {
                    id: 'ws-3',
                    name: 'Cherry'
                }
            ]);
            expect(result.upToDateWorkspaceCount).toBe(5);
            expect(result.computedAt).toEqual(computedAt);
            expect(getWorkspaceLastAttemptedCommandName).not.toHaveBeenCalled();
            expect(cacheWrite).not.toHaveBeenCalled();
        });
        it('should fall back to a refresh when the cache marker is missing', async ()=>{
            cacheGetComputedAt.mockResolvedValue(null);
            getLastAttemptedInstanceCommand.mockResolvedValue(null);
            mockActiveWorkspaces([
                {
                    id: 'ws-1',
                    displayName: 'Apple'
                }
            ]);
            getWorkspaceLastAttemptedCommandName.mockResolvedValue(new Map());
            const result = await service.getInstanceAndAllWorkspacesStatus();
            expect(cacheWrite).toHaveBeenCalledTimes(1);
            expect(result.workspacesBehind).toEqual([
                {
                    id: 'ws-1',
                    name: 'Apple'
                }
            ]);
        });
        it('should use null name when a cached id is missing from the cache', async ()=>{
            cacheGetComputedAt.mockResolvedValue(new Date());
            cacheGetBehindWorkspaceIds.mockResolvedValue([
                'ws-orphan'
            ]);
            getLastAttemptedInstanceCommand.mockResolvedValue(null);
            coreEntityCacheGet.mockResolvedValue(null);
            const result = await service.getInstanceAndAllWorkspacesStatus();
            expect(result.workspacesBehind).toEqual([
                {
                    id: 'ws-orphan',
                    name: null
                }
            ]);
        });
        it('should not query workspace names when both cached id sets are empty', async ()=>{
            cacheGetComputedAt.mockResolvedValue(new Date());
            getLastAttemptedInstanceCommand.mockResolvedValue(null);
            await service.getInstanceAndAllWorkspacesStatus();
            expect(coreEntityCacheGet).not.toHaveBeenCalled();
        });
    });
    describe('refreshInstanceAndAllWorkspacesStatus', ()=>{
        it('should partition workspaces by health, write to cache, and return the fresh payload', async ()=>{
            getLastAttemptedInstanceCommand.mockResolvedValue(null);
            mockActiveWorkspaces([
                {
                    id: 'ws-1',
                    displayName: 'Apple'
                },
                {
                    id: 'ws-2',
                    displayName: 'Banana'
                },
                {
                    id: 'ws-3',
                    displayName: 'Cherry'
                }
            ]);
            getWorkspaceLastAttemptedCommandName.mockResolvedValue(new Map([
                [
                    'ws-1',
                    {
                        workspaceId: 'ws-1',
                        name: LAST_WORKSPACE_COMMAND,
                        status: 'completed',
                        executedByVersion: '1.23.0',
                        errorMessage: null,
                        createdAt: new Date('2025-06-01T00:00:00Z')
                    }
                ],
                [
                    'ws-2',
                    {
                        workspaceId: 'ws-2',
                        name: EARLIER_COMMAND,
                        status: 'completed',
                        executedByVersion: '1.22.0',
                        errorMessage: null,
                        createdAt: new Date('2025-05-01T00:00:00Z')
                    }
                ],
                [
                    'ws-3',
                    {
                        workspaceId: 'ws-3',
                        name: LAST_WORKSPACE_COMMAND,
                        status: 'failed',
                        executedByVersion: '1.23.0',
                        errorMessage: 'boom',
                        createdAt: new Date('2025-06-01T00:00:00Z')
                    }
                ]
            ]));
            const result = await service.refreshInstanceAndAllWorkspacesStatus();
            expect(result.workspacesBehind).toEqual([
                {
                    id: 'ws-2',
                    name: 'Banana'
                }
            ]);
            expect(result.workspacesFailed).toEqual([
                {
                    id: 'ws-3',
                    name: 'Cherry'
                }
            ]);
            expect(result.upToDateWorkspaceCount).toBe(1);
            expect(cacheWrite).toHaveBeenCalledWith({
                behindWorkspaceIds: [
                    'ws-2'
                ],
                failedWorkspaceIds: [
                    'ws-3'
                ],
                upToDateWorkspaceCount: 1,
                computedAt: expect.any(Date)
            });
        });
    });
    describe('invalidateInstanceAndAllWorkspacesStatus', ()=>{
        it('should delegate to the cache service', async ()=>{
            await service.invalidateInstanceAndAllWorkspacesStatus();
            expect(cacheInvalidate).toHaveBeenCalledTimes(1);
        });
    });
});

//# sourceMappingURL=upgrade-status.service.spec.js.map