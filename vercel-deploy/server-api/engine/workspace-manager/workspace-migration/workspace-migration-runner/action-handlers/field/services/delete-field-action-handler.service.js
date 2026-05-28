"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteFieldActionHandlerService", {
    enumerable: true,
    get: function() {
        return DeleteFieldActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _fieldmetadataentity = require("../../../../../../metadata-modules/field-metadata/field-metadata.entity");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _workspaceschemamanagerservice = require("../../../../../../twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
const _generatecolumndefinitionsutil = require("../../../utils/generate-column-definitions.util");
const _getworkspaceschemacontextformigrationutil = require("../../../utils/get-workspace-schema-context-for-migration.util");
const _workspaceschemaenumoperationsutil = require("../../../utils/workspace-schema-enum-operations.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DeleteFieldActionHandlerService = class DeleteFieldActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('delete', 'fieldMetadata') {
    async transpileUniversalActionToFlatAction(context) {
        return this.transpileUniversalDeleteActionToFlatDeleteAction(context);
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const fieldMetadataRepository = queryRunner.manager.getRepository(_fieldmetadataentity.FieldMetadataEntity);
        await fieldMetadataRepository.delete({
            id: flatAction.entityId,
            workspaceId
        });
    }
    async executeForWorkspaceSchema(context) {
        const { flatAction, queryRunner, allFlatEntityMaps: { flatObjectMetadataMaps, flatFieldMetadataMaps }, workspaceId } = context;
        const flatFieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatFieldMetadataMaps,
            flatEntityId: flatAction.entityId
        });
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatObjectMetadataMaps,
            flatEntityId: flatFieldMetadata.objectMetadataId
        });
        const { schemaName, tableName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
            workspaceId,
            objectMetadata: flatObjectMetadata
        });
        const columnDefinitions = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
            flatFieldMetadata,
            flatObjectMetadata,
            workspaceId
        });
        const columnNamesToDrop = columnDefinitions.map((def)=>def.name);
        await this.workspaceSchemaManagerService.columnManager.dropColumns({
            queryRunner,
            schemaName,
            tableName,
            columnNames: columnNamesToDrop,
            cascade: true
        });
        const enumOperations = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForField)({
            flatFieldMetadata,
            tableName,
            operation: _workspaceschemaenumoperationsutil.EnumOperation.DROP
        });
        await (0, _workspaceschemaenumoperationsutil.executeBatchEnumOperations)({
            enumOperations,
            queryRunner,
            schemaName,
            workspaceSchemaManagerService: this.workspaceSchemaManagerService
        });
    }
    constructor(workspaceSchemaManagerService){
        super(), this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
DeleteFieldActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], DeleteFieldActionHandlerService);

//# sourceMappingURL=delete-field-action-handler.service.js.map