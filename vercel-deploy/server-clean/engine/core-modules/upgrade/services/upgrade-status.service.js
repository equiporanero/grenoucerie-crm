"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeStatusService", {
    enumerable: true,
    get: function() {
        return UpgradeStatusService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _workspace = require("twenty-shared/workspace");
const _typeorm = require("@nestjs/typeorm");
const _coreentitycacheservice = require("../../../core-entity-cache/services/core-entity-cache.service");
const _upgrademigrationservice = require("./upgrade-migration.service");
const _upgradesequencereaderservice = require("./upgrade-sequence-reader.service");
const _upgradestatuscacheservice = require("./upgrade-status-cache.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _typeorm1 = require("typeorm");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const deriveHealth = (migration, lastExpectedCommandName)=>{
    if (migration.status === 'failed') {
        return _types.UpgradeHealthEnum.FAILED;
    }
    if (lastExpectedCommandName !== null && migration.name !== lastExpectedCommandName) {
        return _types.UpgradeHealthEnum.BEHIND;
    }
    return _types.UpgradeHealthEnum.UP_TO_DATE;
};
let UpgradeStatusService = class UpgradeStatusService {
    async getInstanceStatus() {
        const migration = await this.upgradeMigrationService.getLastAttemptedInstanceCommand();
        const sequence = this.upgradeSequenceReaderService.getUpgradeSequence();
        const lastInstanceStep = [
            ...sequence
        ].reverse().find((step)=>step.kind === 'fast-instance' || step.kind === 'slow-instance');
        return await this.buildCursorStatus(migration, lastInstanceStep?.name ?? null);
    }
    async getWorkspaceStatuses(filterWorkspaceIds) {
        const workspaces = await this.loadActiveOrSuspendedWorkspaces(filterWorkspaceIds);
        if (filterWorkspaceIds) {
            const foundIds = new Set(workspaces.map((workspace)=>workspace.id));
            for (const requestedId of filterWorkspaceIds){
                if (!foundIds.has(requestedId)) {
                    this.logger.warn(`Workspace ${requestedId} not found or not active/suspended`);
                }
            }
        }
        const loadedWorkspaceIds = workspaces.map((workspace)=>workspace.id);
        const cursors = await this.upgradeMigrationService.getWorkspaceLastAttemptedCommandName(loadedWorkspaceIds);
        const sequence = this.upgradeSequenceReaderService.getUpgradeSequence();
        const lastStepName = sequence.length > 0 ? sequence[sequence.length - 1].name : null;
        return Promise.all(workspaces.map(async (workspace)=>({
                ...await this.buildCursorStatus(cursors.get(workspace.id) ?? null, lastStepName),
                workspaceId: workspace.id,
                displayName: workspace.displayName ?? null
            })));
    }
    async getInstanceAndAllWorkspacesStatus() {
        const computedAt = await this.upgradeStatusCacheService.getComputedAt();
        if (!(0, _utils.isDefined)(computedAt)) {
            return this.refreshInstanceAndAllWorkspacesStatus();
        }
        const [instanceUpgradeStatus, behindWorkspaceIds, failedWorkspaceIds, upToDateWorkspaceCount] = await Promise.all([
            this.getInstanceStatus(),
            this.upgradeStatusCacheService.getBehindWorkspaceIds(),
            this.upgradeStatusCacheService.getFailedWorkspaceIds(),
            this.upgradeStatusCacheService.getUpToDateWorkspaceCount()
        ]);
        const workspaceNamesById = await this.loadWorkspaceNamesById([
            ...behindWorkspaceIds,
            ...failedWorkspaceIds
        ]);
        return {
            instanceUpgradeStatus,
            workspacesBehind: this.toWorkspaceRefs(behindWorkspaceIds, workspaceNamesById),
            workspacesFailed: this.toWorkspaceRefs(failedWorkspaceIds, workspaceNamesById),
            upToDateWorkspaceCount,
            computedAt
        };
    }
    async refreshInstanceAndAllWorkspacesStatus() {
        this.logger.log('Recomputing upgrade status for all workspaces');
        const [instanceUpgradeStatus, workspaceStatuses] = await Promise.all([
            this.getInstanceStatus(),
            this.getWorkspaceStatuses()
        ]);
        const workspacesBehind = [];
        const workspacesFailed = [];
        let upToDateWorkspaceCount = 0;
        for (const workspaceStatus of workspaceStatuses){
            const workspaceRef = {
                id: workspaceStatus.workspaceId,
                name: workspaceStatus.displayName
            };
            if (workspaceStatus.health === _types.UpgradeHealthEnum.BEHIND) {
                workspacesBehind.push(workspaceRef);
            } else if (workspaceStatus.health === _types.UpgradeHealthEnum.FAILED) {
                workspacesFailed.push(workspaceRef);
            } else if (workspaceStatus.health === _types.UpgradeHealthEnum.UP_TO_DATE) {
                upToDateWorkspaceCount++;
            }
        }
        const computedAt = new Date();
        await this.upgradeStatusCacheService.write({
            behindWorkspaceIds: workspacesBehind.map((workspace)=>workspace.id),
            failedWorkspaceIds: workspacesFailed.map((workspace)=>workspace.id),
            upToDateWorkspaceCount,
            computedAt
        });
        return {
            instanceUpgradeStatus,
            workspacesBehind,
            workspacesFailed,
            upToDateWorkspaceCount,
            computedAt
        };
    }
    async invalidateInstanceAndAllWorkspacesStatus() {
        await this.upgradeStatusCacheService.invalidate();
    }
    async buildCursorStatus(migration, lastExpectedCommandName) {
        if (!migration) {
            return {
                inferredVersion: null,
                health: _types.UpgradeHealthEnum.BEHIND,
                latestCommand: null
            };
        }
        const health = deriveHealth(migration, lastExpectedCommandName);
        return {
            inferredVersion: await this.upgradeMigrationService.getInferredVersion(migration.name),
            health,
            latestCommand: {
                name: migration.name,
                status: migration.status,
                executedByVersion: migration.executedByVersion,
                errorMessage: migration.errorMessage,
                createdAt: migration.createdAt
            }
        };
    }
    async loadActiveOrSuspendedWorkspaces(workspaceIds) {
        return this.workspaceRepository.find({
            select: [
                'id',
                'displayName'
            ],
            where: {
                ...workspaceIds && workspaceIds.length > 0 ? {
                    id: (0, _typeorm1.In)(workspaceIds)
                } : {},
                activationStatus: (0, _typeorm1.In)([
                    _workspace.WorkspaceActivationStatus.ACTIVE,
                    _workspace.WorkspaceActivationStatus.SUSPENDED
                ])
            },
            order: {
                id: 'ASC'
            }
        });
    }
    async loadWorkspaceNamesById(workspaceIds) {
        const namesById = new Map();
        if (workspaceIds.length === 0) {
            return namesById;
        }
        const workspaces = await Promise.all(workspaceIds.map((workspaceId)=>this.coreEntityCacheService.get('workspaceEntity', workspaceId)));
        for (const workspace of workspaces){
            if ((0, _utils.isDefined)(workspace)) {
                namesById.set(workspace.id, workspace.displayName ?? null);
            }
        }
        return namesById;
    }
    toWorkspaceRefs(workspaceIds, workspaceNamesById) {
        return workspaceIds.map((workspaceId)=>({
                id: workspaceId,
                name: workspaceNamesById.get(workspaceId) ?? null
            }));
    }
    constructor(upgradeMigrationService, upgradeSequenceReaderService, workspaceRepository, upgradeStatusCacheService, coreEntityCacheService){
        this.upgradeMigrationService = upgradeMigrationService;
        this.upgradeSequenceReaderService = upgradeSequenceReaderService;
        this.workspaceRepository = workspaceRepository;
        this.upgradeStatusCacheService = upgradeStatusCacheService;
        this.coreEntityCacheService = coreEntityCacheService;
        this.logger = new _common.Logger(UpgradeStatusService.name);
    }
};
UpgradeStatusService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _upgrademigrationservice.UpgradeMigrationService === "undefined" ? Object : _upgrademigrationservice.UpgradeMigrationService,
        typeof _upgradesequencereaderservice.UpgradeSequenceReaderService === "undefined" ? Object : _upgradesequencereaderservice.UpgradeSequenceReaderService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _upgradestatuscacheservice.UpgradeStatusCacheService === "undefined" ? Object : _upgradestatuscacheservice.UpgradeStatusCacheService,
        typeof _coreentitycacheservice.CoreEntityCacheService === "undefined" ? Object : _coreentitycacheservice.CoreEntityCacheService
    ])
], UpgradeStatusService);

//# sourceMappingURL=upgrade-status.service.js.map