"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ListOrphanedWorkspaceEntitiesCommand", {
    enumerable: true,
    get: function() {
        return ListOrphanedWorkspaceEntitiesCommand;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _chalk = /*#__PURE__*/ _interop_require_default(require("chalk"));
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _migrationcommandrunner = require("./command-runners/migration.command-runner");
const _apikeyentity = require("../../engine/core-modules/api-key/api-key.entity");
const _applicationentity = require("../../engine/core-modules/application/application.entity");
const _approvedaccessdomainentity = require("../../engine/core-modules/approved-access-domain/approved-access-domain.entity");
const _billingcustomerentity = require("../../engine/core-modules/billing/entities/billing-customer.entity");
const _billingentitlemententity = require("../../engine/core-modules/billing/entities/billing-entitlement.entity");
const _billingsubscriptionentity = require("../../engine/core-modules/billing/entities/billing-subscription.entity");
const _emailingdomainentity = require("../../engine/core-modules/emailing-domain/emailing-domain.entity");
const _featureflagentity = require("../../engine/core-modules/feature-flag/feature-flag.entity");
const _fileentity = require("../../engine/core-modules/file/entities/file.entity");
const _publicdomainentity = require("../../engine/core-modules/public-domain/public-domain.entity");
const _workspacessoidentityproviderentity = require("../../engine/core-modules/sso/workspace-sso-identity-provider.entity");
const _userworkspaceentity = require("../../engine/core-modules/user-workspace/user-workspace.entity");
const _webhookentity = require("../../engine/metadata-modules/webhook/entities/webhook.entity");
const _workspaceentity = require("../../engine/core-modules/workspace/workspace.entity");
const _agententity = require("../../engine/metadata-modules/ai/ai-agent/entities/agent.entity");
const _datasourceentity = require("../../engine/metadata-modules/data-source/data-source.entity");
const _fieldmetadataentity = require("../../engine/metadata-modules/field-metadata/field-metadata.entity");
const _indexmetadataentity = require("../../engine/metadata-modules/index-metadata/index-metadata.entity");
const _objectmetadataentity = require("../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _fieldpermissionentity = require("../../engine/metadata-modules/object-permission/field-permission/field-permission.entity");
const _objectpermissionentity = require("../../engine/metadata-modules/object-permission/object-permission.entity");
const _pagelayouttabentity = require("../../engine/metadata-modules/page-layout-tab/entities/page-layout-tab.entity");
const _pagelayoutwidgetentity = require("../../engine/metadata-modules/page-layout-widget/entities/page-layout-widget.entity");
const _pagelayoutentity = require("../../engine/metadata-modules/page-layout/entities/page-layout.entity");
const _rolepermissionflagentity = require("../../engine/metadata-modules/role-permission-flag/role-permission-flag.entity");
const _permissionflagentity = require("../../engine/metadata-modules/permission-flag/permission-flag.entity");
const _roletargetentity = require("../../engine/metadata-modules/role-target/role-target.entity");
const _roleentity = require("../../engine/metadata-modules/role/role.entity");
const _rowlevelpermissionpredicategroupentity = require("../../engine/metadata-modules/row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
const _rowlevelpermissionpredicateentity = require("../../engine/metadata-modules/row-level-permission-predicate/entities/row-level-permission-predicate.entity");
const _searchfieldmetadataentity = require("../../engine/metadata-modules/search-field-metadata/search-field-metadata.entity");
const _logicfunctionlayerentity = require("../../engine/metadata-modules/logic-function-layer/logic-function-layer.entity");
const _logicfunctionentity = require("../../engine/metadata-modules/logic-function/logic-function.entity");
const _skillentity = require("../../engine/metadata-modules/skill/entities/skill.entity");
const _viewfieldentity = require("../../engine/metadata-modules/view-field/entities/view-field.entity");
const _viewfiltergroupentity = require("../../engine/metadata-modules/view-filter-group/entities/view-filter-group.entity");
const _viewfilterentity = require("../../engine/metadata-modules/view-filter/entities/view-filter.entity");
const _viewgroupentity = require("../../engine/metadata-modules/view-group/entities/view-group.entity");
const _viewsortentity = require("../../engine/metadata-modules/view-sort/entities/view-sort.entity");
const _viewentity = require("../../engine/metadata-modules/view/entities/view.entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
// All entities that extend WorkspaceRelatedEntity or SyncableEntity
// Ordered by dependency: CHILDREN FIRST to minimize CASCADE overhead
const WORKSPACE_RELATED_ENTITIES = [
    // Level 4: Deepest children - delete these first to avoid CASCADE overhead
    _viewfieldentity.ViewFieldEntity,
    _viewfilterentity.ViewFilterEntity,
    _viewgroupentity.ViewGroupEntity,
    _viewsortentity.ViewSortEntity,
    _viewfiltergroupentity.ViewFilterGroupEntity,
    _fieldpermissionentity.FieldPermissionEntity,
    _objectpermissionentity.ObjectPermissionEntity,
    _rolepermissionflagentity.RolePermissionFlagEntity,
    _roletargetentity.RoleTargetEntity,
    _searchfieldmetadataentity.SearchFieldMetadataEntity,
    _rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity,
    _pagelayoutwidgetentity.PageLayoutWidgetEntity,
    // Level 3: Mid-level children
    _rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity,
    _viewentity.ViewEntity,
    _indexmetadataentity.IndexMetadataEntity,
    _pagelayouttabentity.PageLayoutTabEntity,
    // Level 2: Children that depend on core entities
    _fieldmetadataentity.FieldMetadataEntity,
    _pagelayoutentity.PageLayoutEntity,
    _permissionflagentity.PermissionFlagEntity,
    _skillentity.SkillEntity,
    _logicfunctionentity.LogicFunctionEntity,
    // Level 1: Core entities with CASCADE deletes - delete after their children
    _objectmetadataentity.ObjectMetadataEntity,
    _roleentity.RoleEntity,
    _agententity.AgentEntity,
    _userworkspaceentity.UserWorkspaceEntity,
    _apikeyentity.ApiKeyEntity,
    _logicfunctionlayerentity.LogicFunctionLayerEntity,
    // Level 0: Independent entities (no foreign keys to other workspace entities)
    _applicationentity.ApplicationEntity,
    _approvedaccessdomainentity.ApprovedAccessDomainEntity,
    _billingcustomerentity.BillingCustomerEntity,
    _billingentitlemententity.BillingEntitlementEntity,
    _billingsubscriptionentity.BillingSubscriptionEntity,
    _datasourceentity.DataSourceEntity,
    _emailingdomainentity.EmailingDomainEntity,
    _featureflagentity.FeatureFlagEntity,
    _fileentity.FileEntity,
    _publicdomainentity.PublicDomainEntity,
    _webhookentity.WebhookEntity,
    _workspacessoidentityproviderentity.WorkspaceSSOIdentityProviderEntity
];
let ListOrphanedWorkspaceEntitiesCommand = class ListOrphanedWorkspaceEntitiesCommand extends _migrationcommandrunner.MigrationCommandRunner {
    async deleteInChunks({ entity, entityName, ids, chunkSize = 2000 }) {
        let totalDeleted = 0;
        const chunks = [];
        let i = 0;
        while(i < ids.length){
            chunks.push(ids.slice(i, i + chunkSize));
            i += chunkSize;
        }
        for (const [index, chunk] of chunks.entries()){
            this.logger.log(_chalk.default.gray(`    Deleting ${entityName} chunk ${index + 1}/${chunks.length} (${chunk.length} records)...`));
            try {
                const result = await this.dataSource.getRepository(entity).createQueryBuilder().delete().from(entity).whereInIds(chunk).execute();
                totalDeleted += result.affected || 0;
            } catch (error) {
                this.logger.warn(_chalk.default.yellow(`    ⚠ Failed to delete chunk ${index + 1}: ${error instanceof Error ? error.message : String(error)}`));
            }
        }
        return totalDeleted;
    }
    async deleteFieldMetadataInChunks(ids) {
        const CHUNK_SIZE = 50;
        let totalDeleted = 0;
        const fieldMetadataRepository = this.dataSource.getRepository(_fieldmetadataentity.FieldMetadataEntity);
        const fields = await fieldMetadataRepository.createQueryBuilder('field').where('field.id IN (:...ids)', {
            ids
        }).getMany();
        const processedIds = new Set();
        const fieldsMap = new Map(fields.map((field)=>[
                field.id,
                field
            ]));
        const chunks = [];
        let currentChunk = [];
        for (const field of fields){
            if (processedIds.has(field.id)) {
                continue;
            }
            currentChunk.push(field.id);
            processedIds.add(field.id);
            if (field.relationTargetFieldMetadataId) {
                const relatedField = fieldsMap.get(field.relationTargetFieldMetadataId);
                if (relatedField && !processedIds.has(relatedField.id)) {
                    currentChunk.push(relatedField.id);
                    processedIds.add(relatedField.id);
                }
            }
            if (currentChunk.length >= CHUNK_SIZE) {
                chunks.push([
                    ...currentChunk
                ]);
                currentChunk = [];
            }
        }
        if (currentChunk.length > 0) {
            chunks.push(currentChunk);
        }
        for (const [index, chunk] of chunks.entries()){
            this.logger.log(_chalk.default.gray(`    Deleting FieldMetadata chunk ${index + 1}/${chunks.length} (${chunk.length} fields with relations)...`));
            try {
                const result = await fieldMetadataRepository.createQueryBuilder().delete().from(_fieldmetadataentity.FieldMetadataEntity).whereInIds(chunk).execute();
                totalDeleted += result.affected || 0;
            } catch (error) {
                this.logger.warn(_chalk.default.yellow(`    ⚠ Failed to delete chunk ${index + 1}: ${error instanceof Error ? error.message : String(error)}`));
            }
        }
        return totalDeleted;
    }
    async runMigrationCommand(_passedParams, options) {
        this.logger.log(_chalk.default.blue('Looking for orphaned records in workspace-related entities...'));
        const allOrphanedRecords = [];
        const orphanedIdsByEntity = new Map();
        for (const entity of WORKSPACE_RELATED_ENTITIES){
            const entityName = typeof entity === 'function' ? entity.name : String(entity);
            try {
                const orphanedRecords = await this.dataSource.getRepository(entity).createQueryBuilder('entity').where((qb)=>{
                    const subQuery = qb.subQuery().select('1').from(_workspaceentity.WorkspaceEntity, 'workspace').where('workspace.id = entity.workspaceId').withDeleted().getQuery();
                    return `NOT EXISTS ${subQuery}`;
                }).select([
                    'entity.id',
                    'entity.workspaceId'
                ]).withDeleted().getMany();
                if (orphanedRecords.length > 0) {
                    const ids = orphanedRecords.map((record)=>record.id);
                    orphanedIdsByEntity.set(entity, ids);
                    for (const record of orphanedRecords){
                        allOrphanedRecords.push({
                            entityName,
                            id: record.id,
                            workspaceId: record.workspaceId
                        });
                    }
                    this.logger.log(_chalk.default.yellow(`  ${entityName}: ${orphanedRecords.length} orphaned record(s)`));
                }
            } catch  {
                this.logger.warn(_chalk.default.gray(`  ${entityName}: Skipped (entity not found in current context)`));
            }
        }
        if (allOrphanedRecords.length === 0) {
            this.logger.log(_chalk.default.green('No orphaned records found.'));
            return;
        }
        this.logger.log(_chalk.default.yellow(`Total: ${allOrphanedRecords.length} orphaned record(s) across ${orphanedIdsByEntity.size} entity type(s)`));
        this.logger.log(_chalk.default.yellow(`${allOrphanedRecords.length} record(s) to be deleted.`));
        this.logger.log(`Deleting ${allOrphanedRecords.length} orphaned record(s)...`);
        this.logger.log(_chalk.default.gray('Note: Some entities may show 0 deleted due to CASCADE deletes from parent entities'));
        const deletionResults = [];
        for (const [entity, ids] of orphanedIdsByEntity){
            const entityName = typeof entity === 'function' ? entity.name : String(entity);
            this.logger.log(_chalk.default.gray(`  Processing ${entityName} (${ids.length} records)...`));
            try {
                let deletedCount = 0;
                if (!options.dryRun) {
                    if (entityName === 'FieldMetadataEntity') {
                        deletedCount = await this.deleteFieldMetadataInChunks(ids);
                    } else {
                        deletedCount = await this.deleteInChunks({
                            entity,
                            ids,
                            entityName
                        });
                    }
                }
                deletionResults.push({
                    entityName,
                    success: true,
                    deletedCount
                });
                this.logger.log(_chalk.default.green(`  ✓ Deleted ${deletedCount} ${entityName} record(s)`));
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                deletionResults.push({
                    entityName,
                    success: false,
                    error: errorMessage
                });
                this.logger.error(_chalk.default.red(`  ✗ Failed to delete ${entityName} records: ${errorMessage}`));
            }
        }
        const successfulDeletions = deletionResults.filter((r)=>r.success);
        const failedDeletions = deletionResults.filter((r)=>!r.success);
        const totalDeleted = successfulDeletions.reduce((sum, r)=>sum + (r.deletedCount || 0), 0);
        this.logger.log(_chalk.default.blue('\n=== Deletion Summary ==='));
        this.logger.log(_chalk.default.green(`Successfully deleted: ${totalDeleted} record(s) across ${successfulDeletions.length} entity type(s)`));
        if (failedDeletions.length > 0) {
            this.logger.log(_chalk.default.red(`Failed deletions: ${failedDeletions.length} entity type(s)`));
            this.logger.log(_chalk.default.red('\nFailed entity types:'));
            for (const failure of failedDeletions){
                this.logger.log(_chalk.default.red(`  - ${failure.entityName}: ${failure.error}`));
            }
        }
    }
    constructor(dataSource){
        super(), this.dataSource = dataSource;
    }
};
ListOrphanedWorkspaceEntitiesCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'workspace:list-and-delete-orphaned-entities',
        description: 'List and optionally delete records from workspace-related entities that reference a workspaceId not present in the workspace table'
    }),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource
    ])
], ListOrphanedWorkspaceEntitiesCommand);

//# sourceMappingURL=list-and-delete-orphaned-workspace-entities.command.js.map