"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowThrottlingWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowThrottlingWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _cachestoragedecorator = require("../../../../../engine/core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _throttlerservice = require("../../../../../engine/core-modules/throttler/throttler.service");
const _twentyconfigservice = require("../../../../../engine/core-modules/twenty-config/twenty-config.service");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowrunworkspaceentity = require("../../../common/standard-objects/workflow-run.workspace-entity");
const _notstartedrunsfindoptions = require("../constants/not-started-runs-find-options");
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
let WorkflowThrottlingWorkspaceService = class WorkflowThrottlingWorkspaceService {
    async getRemainingRunsToEnqueueCount(workspaceId) {
        return this.throttlerService.getAvailableTokensCount(this.getWorkflowExecutionSoftThrottleCacheKey(workspaceId), this.twentyConfigService.get('WORKFLOW_EXEC_SOFT_THROTTLE_LIMIT'), this.twentyConfigService.get('WORKFLOW_EXEC_SOFT_THROTTLE_TTL'));
    }
    async consumeRemainingRunsToEnqueueCount(workspaceId, runsToConsume) {
        await this.throttlerService.consumeTokens(this.getWorkflowExecutionSoftThrottleCacheKey(workspaceId), runsToConsume, this.twentyConfigService.get('WORKFLOW_EXEC_SOFT_THROTTLE_LIMIT'), this.twentyConfigService.get('WORKFLOW_EXEC_SOFT_THROTTLE_TTL'));
    }
    async throttleOrThrowIfHardLimitReached(workspaceId) {
        await this.throttlerService.tokenBucketThrottleOrThrow(this.getWorkflowExecutionHardThrottleCacheKey(workspaceId), 1, this.twentyConfigService.get('WORKFLOW_EXEC_HARD_THROTTLE_LIMIT'), this.twentyConfigService.get('WORKFLOW_EXEC_HARD_THROTTLE_TTL'));
    }
    async increaseWorkflowRunNotStartedCount(workspaceId, newlyEnqueuedCount = 1) {
        await this.cacheStorage.incrBy(this.getWorkflowRunNotStartedCountCacheKey(workspaceId), newlyEnqueuedCount);
    }
    async decreaseWorkflowRunNotStartedCount(workspaceId, removedFromQueueCount = 1) {
        await this.cacheStorage.incrBy(this.getWorkflowRunNotStartedCountCacheKey(workspaceId), -removedFromQueueCount);
    }
    async recomputeWorkflowRunNotStartedCount(workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        const currentlyNotStartedWorkflowRunCount = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowRunRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _workflowrunworkspaceentity.WorkflowRunWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            return workflowRunRepository.count({
                where: _notstartedrunsfindoptions.NOT_STARTED_RUNS_FIND_OPTIONS
            });
        }, authContext);
        await this.setWorkflowRunNotStartedCount(workspaceId, currentlyNotStartedWorkflowRunCount);
    }
    async getNotStartedRunsCountFromCache(workspaceId) {
        return this.getCurrentWorkflowRunNotStartedCount(workspaceId);
    }
    async getNotStartedRunsCountFromDatabase(workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowRunRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _workflowrunworkspaceentity.WorkflowRunWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            return workflowRunRepository.count({
                where: _notstartedrunsfindoptions.NOT_STARTED_RUNS_FIND_OPTIONS
            });
        }, authContext);
    }
    async acquireWorkflowEnqueueLock(workspaceId, ttlMs = 60_000) {
        const key = this.getWorkflowEnqueueRunningCacheKey(workspaceId);
        return this.cacheStorage.acquireLock(key, ttlMs);
    }
    async releaseWorkflowEnqueueLock(workspaceId) {
        const key = this.getWorkflowEnqueueRunningCacheKey(workspaceId);
        await this.cacheStorage.releaseLock(key);
    }
    async setWorkflowRunNotStartedCount(workspaceId, count) {
        await this.cacheStorage.set(this.getWorkflowRunNotStartedCountCacheKey(workspaceId), count);
    }
    async getCurrentWorkflowRunNotStartedCount(workspaceId) {
        const key = this.getWorkflowRunNotStartedCountCacheKey(workspaceId);
        const currentCount = await this.cacheStorage.get(key) ?? 0;
        return Math.max(0, currentCount);
    }
    getWorkflowRunNotStartedCountCacheKey(workspaceId) {
        return `workflow-run-not-started-count:${workspaceId}`;
    }
    getWorkflowEnqueueRunningCacheKey(workspaceId) {
        return `workflow-enqueue-running:${workspaceId}`;
    }
    getWorkflowExecutionSoftThrottleCacheKey(workspaceId) {
        return `workflow:execution-soft-throttle:${workspaceId}`;
    }
    getWorkflowExecutionHardThrottleCacheKey(workspaceId) {
        return `workflow:execution-hard-throttle:${workspaceId}`;
    }
    constructor(cacheStorage, globalWorkspaceOrmManager, throttlerService, twentyConfigService){
        this.cacheStorage = cacheStorage;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.throttlerService = throttlerService;
        this.twentyConfigService = twentyConfigService;
    }
};
WorkflowThrottlingWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleWorkflow)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _throttlerservice.ThrottlerService === "undefined" ? Object : _throttlerservice.ThrottlerService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], WorkflowThrottlingWorkspaceService);

//# sourceMappingURL=workflow-throttling.workspace-service.js.map