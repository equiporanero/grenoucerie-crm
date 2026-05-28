"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NormalizeCompositeFieldDefaultsCommand", {
    enumerable: true,
    get: function() {
        return NormalizeCompositeFieldDefaultsCommand;
    }
});
const _nestcommander = require("nest-commander");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _activeorsuspendedworkspacecommandrunner = require("../../command-runners/active-or-suspended-workspace.command-runner");
const _workspaceiteratorservice = require("../../command-runners/workspace-iterator.service");
const _registeredworkspacecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-workspace-command.decorator");
const _computecolumnnameutil = require("../../../../engine/metadata-modules/field-metadata/utils/compute-column-name.util");
const _iscompositefieldmetadatatypeutil = require("../../../../engine/metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _workspacemigrationbuilderexception = require("../../../../engine/workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
const _computeobjecttargettableutil = require("../../../../engine/utils/compute-object-target-table.util");
const _getworkspaceschemanameutil = require("../../../../engine/workspace-datasource/utils/get-workspace-schema-name.util");
const _nullifyemptycompositedefaultvalueutil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/nullify-empty-composite-default-value.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let NormalizeCompositeFieldDefaultsCommand = class NormalizeCompositeFieldDefaultsCommand extends _activeorsuspendedworkspacecommandrunner.ActiveOrSuspendedWorkspaceCommandRunner {
    async runOnWorkspace({ workspaceId, dataSource, options }) {
        if (!dataSource) {
            this.logger.log(`No data source for workspace ${workspaceId}, skipping`);
            return;
        }
        const { flatFieldMetadataMaps, flatObjectMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatFieldMetadataMaps',
            'flatObjectMetadataMaps'
        ]);
        const affectedFields = Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((field)=>(0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(field.type)).filter((field)=>{
            const compositeType = _types.compositeTypeDefinitions.get(field.type);
            if (!(0, _utils.isDefined)(compositeType)) {
                return false;
            }
            const normalizedDefaultValue = (0, _nullifyemptycompositedefaultvalueutil.nullifyEmptyCompositeDefaultValue)({
                defaultValue: field.defaultValue,
                fieldType: field.type
            });
            for (const property of compositeType.properties){
                if (normalizedDefaultValue?.[property.name] !== field.defaultValue?.[property.name]) {
                    return true;
                }
            }
        });
        if (affectedFields.length === 0) {
            this.logger.log(`No composite fields with non-null default values found for workspace ${workspaceId}, skipping`);
            return;
        }
        if (options.dryRun) {
            this.logger.log(`[DRY RUN] Would normalize ${affectedFields.length} composite field(s) for workspace ${workspaceId}: ${affectedFields.map((f)=>f.name).join(', ')}`);
            return;
        }
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        const backfillTargets = [];
        for (const field of affectedFields){
            const flatObjectMetadata = flatObjectMetadataMaps.byUniversalIdentifier[field.objectMetadataUniversalIdentifier];
            if (!(0, _utils.isDefined)(flatObjectMetadata)) {
                this.logger.warn(`Object metadata not found for field ${field.name} (${field.id}), skipping data backfill for this field`);
                continue;
            }
            const tableName = (0, _computeobjecttargettableutil.computeObjectTargetTable)(flatObjectMetadata);
            const compositeType = _types.compositeTypeDefinitions.get(field.type);
            if (!(0, _utils.isDefined)(compositeType)) {
                continue;
            }
            const normalizedDefaultValue = (0, _nullifyemptycompositedefaultvalueutil.nullifyEmptyCompositeDefaultValue)({
                defaultValue: field.defaultValue,
                fieldType: field.type
            });
            for (const property of compositeType.properties){
                if (normalizedDefaultValue?.[property.name] !== field.defaultValue?.[property.name]) {
                    backfillTargets.push({
                        tableName,
                        columnName: (0, _computecolumnnameutil.computeCompositeColumnName)(field.name, property)
                    });
                }
            }
        }
        const fieldsByApplication = affectedFields.reduce((acc, field)=>{
            const key = field.applicationUniversalIdentifier;
            const group = acc.get(key) ?? [];
            group.push(field);
            acc.set(key, group);
            return acc;
        }, new Map());
        for (const [applicationUniversalIdentifier, fields] of fieldsByApplication){
            const flatFieldMetadatasToUpdate = fields.map((field)=>({
                    ...field,
                    defaultValue: (0, _nullifyemptycompositedefaultvalueutil.nullifyEmptyCompositeDefaultValue)({
                        defaultValue: field.defaultValue,
                        fieldType: field.type
                    })
                }));
            const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
                allFlatEntityOperationByMetadataName: {
                    fieldMetadata: {
                        flatEntityToCreate: [],
                        flatEntityToDelete: [],
                        flatEntityToUpdate: flatFieldMetadatasToUpdate
                    }
                },
                workspaceId,
                isSystemBuild: true,
                applicationUniversalIdentifier
            });
            if (validateAndBuildResult.status === 'fail') {
                throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Multiple validation errors occurred while normalizing composite field defaults');
            }
            for (const field of fields){
                this.logger.log(`Normalized defaultValue for composite field "${field.name}" (${field.id}) in workspace ${workspaceId}`);
            }
        }
        await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
            'flatFieldMetadataMaps'
        ]);
        for (const { tableName, columnName } of backfillTargets){
            await dataSource.query(`UPDATE "${schemaName}"."${tableName}"
         SET "${columnName}" = NULL
         WHERE "${columnName}"::text IN ('', '""')`, undefined, undefined, {
                shouldBypassPermissionChecks: true
            });
            this.logger.log(`Backfilled NULL for "${schemaName}"."${tableName}"."${columnName}"`);
        }
    }
    constructor(workspaceIteratorService, workspaceCacheService, workspaceMigrationValidateBuildAndRunService){
        super(workspaceIteratorService), this.workspaceIteratorService = workspaceIteratorService, this.workspaceCacheService = workspaceCacheService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
    }
};
NormalizeCompositeFieldDefaultsCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)('2.5.0', 1778000001000),
    (0, _nestcommander.Command)({
        name: 'upgrade:2-5:normalize-composite-field-defaults',
        description: 'Normalize composite field default values: remove empty-string values from metadata and backfill workspace data with NULL.'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceiteratorservice.WorkspaceIteratorService === "undefined" ? Object : _workspaceiteratorservice.WorkspaceIteratorService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService
    ])
], NormalizeCompositeFieldDefaultsCommand);

//# sourceMappingURL=2-5-workspace-command-1778000001000-normalize-composite-field-defaults.command.js.map