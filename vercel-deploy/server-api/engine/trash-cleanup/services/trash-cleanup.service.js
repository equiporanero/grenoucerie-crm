"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TrashCleanupService", {
    enumerable: true,
    get: function() {
        return TrashCleanupService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _workspacemanyorallflatentitymapscacheservice = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _trashcleanupbatchsizeconstant = require("../constants/trash-cleanup-batch-size.constant");
const _trashcleanupmaxrecordsperworkspaceconstant = require("../constants/trash-cleanup-max-records-per-workspace.constant");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../twenty-orm/utils/build-system-auth-context.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TrashCleanupService = class TrashCleanupService {
    async cleanupWorkspaceTrash(input) {
        const { workspaceId, trashRetentionDays } = input;
        const { flatObjectMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps'
            ]
        });
        const objectNames = Object.values(flatObjectMetadataMaps.byUniversalIdentifier ?? {}).map((metadata)=>metadata?.nameSingular).filter(_utils.isDefined);
        if (objectNames.length === 0) {
            this.logger.log(`No objects found in workspace ${workspaceId}`);
            return 0;
        }
        const cutoffDate = this.calculateCutoffDate(trashRetentionDays);
        let deletedCount = 0;
        for (const objectName of objectNames){
            if (deletedCount >= this.maxRecordsPerWorkspace) {
                this.logger.log(`Reached deletion limit (${this.maxRecordsPerWorkspace}) for workspace ${workspaceId}`);
                break;
            }
            const remainingQuota = this.maxRecordsPerWorkspace - deletedCount;
            const deletedForObject = await this.deleteSoftDeletedRecords({
                workspaceId,
                objectName,
                cutoffDate,
                remainingQuota
            });
            if (deletedForObject > 0) {
                this.logger.log(`Deleted ${deletedForObject} record(s) from ${objectName} in workspace ${workspaceId}`);
            }
            deletedCount += deletedForObject;
        }
        this.logger.log(`Deleted ${deletedCount} record(s) from workspace ${workspaceId}`);
        return deletedCount;
    }
    async deleteSoftDeletedRecords({ workspaceId, objectName, cutoffDate, remainingQuota }) {
        if (remainingQuota <= 0) {
            return 0;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const repository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, objectName, {
                shouldBypassPermissionChecks: true
            });
            let deleted = 0;
            while(deleted < remainingQuota){
                const take = Math.min(this.batchSize, remainingQuota - deleted);
                const recordsToDelete = await repository.find({
                    withDeleted: true,
                    select: [
                        'id'
                    ],
                    where: {
                        deletedAt: (0, _typeorm.LessThan)(cutoffDate)
                    },
                    order: {
                        deletedAt: 'ASC'
                    },
                    take,
                    loadEagerRelations: false
                });
                if (recordsToDelete.length === 0) {
                    break;
                }
                await repository.delete({
                    id: (0, _typeorm.In)(recordsToDelete.map((record)=>record.id))
                });
                deleted += recordsToDelete.length;
            }
            return deleted;
        }, authContext);
    }
    calculateCutoffDate(trashRetentionDays) {
        const cutoffDate = new Date();
        cutoffDate.setUTCHours(0, 0, 0, 0);
        cutoffDate.setDate(cutoffDate.getDate() - trashRetentionDays + 1);
        return cutoffDate;
    }
    constructor(flatEntityMapsCacheService, globalWorkspaceOrmManager){
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logger = new _common.Logger(TrashCleanupService.name);
        this.maxRecordsPerWorkspace = _trashcleanupmaxrecordsperworkspaceconstant.TRASH_CLEANUP_MAX_RECORDS_PER_WORKSPACE;
        this.batchSize = _trashcleanupbatchsizeconstant.TRASH_CLEANUP_BATCH_SIZE;
    }
};
TrashCleanupService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], TrashCleanupService);

//# sourceMappingURL=trash-cleanup.service.js.map