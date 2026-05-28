"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RebuildUniquePhoneIndexesCommand", {
    enumerable: true,
    get: function() {
        return RebuildUniquePhoneIndexesCommand;
    }
});
const _nestcommander = require("nest-commander");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _guards = require("@sniptt/guards");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _findflatentitybyidinflatentitymapsutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _workspaceschemamanagerservice = require("../../../../engine/twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
const _computeobjecttargettableutil = require("../../../../engine/utils/compute-object-target-table.util");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _indexactionhandlerutils = require("../../../../engine/workspace-manager/workspace-migration/workspace-migration-runner/action-handlers/index/utils/index-action-handler.utils");
const _getworkspaceschemanameutil = require("../../../../engine/workspace-datasource/utils/get-workspace-schema-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const LEGACY_NON_EMPTY_PARTIAL_INDEX_PATTERN = /^"[a-zA-Z][a-zA-Z0-9]*" != ''$/;
let RebuildUniquePhoneIndexesCommand = class RebuildUniquePhoneIndexesCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, dataSource, options }) {
        if (!dataSource) {
            this.logger.log(`No data source for workspace ${workspaceId}, skipping`);
            return;
        }
        const { flatFieldMetadataMaps, flatIndexMaps, flatObjectMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatFieldMetadataMaps',
            'flatIndexMaps',
            'flatObjectMetadataMaps'
        ]);
        const uniquePhoneIndexes = Object.values(flatIndexMaps.byUniversalIdentifier).filter((flatIndex)=>{
            if (!(0, _utils.isDefined)(flatIndex) || !flatIndex.isUnique) {
                return false;
            }
            return flatIndex.flatIndexFieldMetadatas.some((indexField)=>{
                const relatedField = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: indexField.fieldMetadataId,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                return relatedField?.type === _types.FieldMetadataType.PHONES;
            });
        });
        if (uniquePhoneIndexes.length === 0) {
            this.logger.log(`No unique phone indexes found for workspace ${workspaceId}, skipping`);
            return;
        }
        if (options.dryRun) {
            this.logger.log(`[DRY RUN] Would rebuild ${uniquePhoneIndexes.length} unique phone indexes for workspace ${workspaceId}: ${uniquePhoneIndexes.map((index)=>index.name).join(', ')}`);
            return;
        }
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        const queryRunner = dataSource.createQueryRunner();
        let isQueryRunnerConnected = false;
        let isTransactionStarted = false;
        try {
            await queryRunner.connect();
            isQueryRunnerConnected = true;
            await queryRunner.startTransaction();
            isTransactionStarted = true;
            for (const uniquePhoneIndex of uniquePhoneIndexes){
                const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityId: uniquePhoneIndex.objectMetadataId,
                    flatEntityMaps: flatObjectMetadataMaps
                });
                const hasLegacyNonEmptyPartialClause = (0, _guards.isNonEmptyString)(uniquePhoneIndex.indexWhereClause) && LEGACY_NON_EMPTY_PARTIAL_INDEX_PATTERN.test(uniquePhoneIndex.indexWhereClause);
                if (hasLegacyNonEmptyPartialClause) {
                    const tableName = (0, _computeobjecttargettableutil.computeObjectTargetTable)(flatObjectMetadata);
                    const columns = (0, _indexactionhandlerutils.computeFlatIndexFieldColumnNames)({
                        flatIndexFieldMetadatas: uniquePhoneIndex.flatIndexFieldMetadatas,
                        flatFieldMetadataMaps
                    });
                    for (const column of columns){
                        await queryRunner.query(`UPDATE "${schemaName}"."${tableName}"
                  SET "${column}" = NULL
                WHERE "${column}" = ''`);
                    }
                    await queryRunner.query(`UPDATE "core"."indexMetadata"
                SET "indexWhereClause" = NULL
              WHERE id = $1`, [
                        uniquePhoneIndex.id
                    ]);
                }
                await (0, _indexactionhandlerutils.dropIndexFromWorkspaceSchema)({
                    indexName: uniquePhoneIndex.name,
                    workspaceSchemaManagerService: this.workspaceSchemaManagerService,
                    queryRunner,
                    schemaName
                });
                const flatIndexMetadataForRebuild = hasLegacyNonEmptyPartialClause ? {
                    ...uniquePhoneIndex,
                    indexWhereClause: null
                } : uniquePhoneIndex;
                await (0, _indexactionhandlerutils.createIndexInWorkspaceSchema)({
                    flatIndexMetadata: flatIndexMetadataForRebuild,
                    flatObjectMetadata,
                    flatFieldMetadataMaps,
                    workspaceSchemaManagerService: this.workspaceSchemaManagerService,
                    queryRunner,
                    workspaceId
                });
                this.logger.log(`Rebuilt unique phone index ${uniquePhoneIndex.name} for workspace ${workspaceId}${hasLegacyNonEmptyPartialClause ? ' (dropped legacy non-empty partial WHERE clause)' : ''}`);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            if (isTransactionStarted) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally{
            if (isQueryRunnerConnected) {
                await queryRunner.release();
            }
        }
    }
    constructor(workspaceIteratorService, workspaceCacheService, workspaceSchemaManagerService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.workspaceCacheService = workspaceCacheService, this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
RebuildUniquePhoneIndexesCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.5.0', 1778000000000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-5:rebuild-unique-phone-indexes',
        description: 'Rebuild unique phone field indexes to include the phone calling code column.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], RebuildUniquePhoneIndexesCommand);

//# sourceMappingURL=2-5-workspace-command-1778000000000-rebuild-unique-phone-indexes.command.js.map