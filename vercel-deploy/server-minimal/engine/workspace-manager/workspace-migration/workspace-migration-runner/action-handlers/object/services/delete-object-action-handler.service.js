"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteObjectActionHandlerService", {
    enumerable: true,
    get: function() {
        return DeleteObjectActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _iscompositeflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-composite-flat-field-metadata.util");
const _isenumflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-enum-flat-field-metadata.util");
const _objectmetadataentity = require("../../../../../../metadata-modules/object-metadata/object-metadata.entity");
const _workspaceschemamanagerservice = require("../../../../../../twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
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
let DeleteObjectActionHandlerService = class DeleteObjectActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('delete', 'objectMetadata') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatObjectMetadata = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatObjectMetadataMaps,
            universalIdentifier: action.universalIdentifier
        });
        return {
            type: 'delete',
            metadataName: 'objectMetadata',
            entityId: flatObjectMetadata.id
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner } = context;
        const objectMetadataRepository = queryRunner.manager.getRepository(_objectmetadataentity.ObjectMetadataEntity);
        await objectMetadataRepository.delete(flatAction.entityId);
    }
    async executeForWorkspaceSchema(context) {
        const { flatAction, queryRunner, allFlatEntityMaps: { flatObjectMetadataMaps, flatFieldMetadataMaps }, workspaceId } = context;
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatObjectMetadataMaps,
            flatEntityId: flatAction.entityId
        });
        const { schemaName, tableName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
            workspaceId,
            objectMetadata: flatObjectMetadata
        });
        await this.workspaceSchemaManagerService.tableManager.dropTable({
            queryRunner,
            schemaName,
            tableName,
            cascade: true
        });
        const objectFlatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatFieldMetadataMaps,
            flatEntityIds: flatObjectMetadata.fieldIds
        });
        const enumOrCompositeFlatFieldMetadatas = objectFlatFieldMetadatas.filter((flatFieldMetadata)=>(0, _isenumflatfieldmetadatautil.isEnumFlatFieldMetadata)(flatFieldMetadata) || (0, _iscompositeflatfieldmetadatautil.isCompositeFlatFieldMetadata)(flatFieldMetadata));
        const enumOperations = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForObject)({
            flatFieldMetadatas: enumOrCompositeFlatFieldMetadatas,
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
DeleteObjectActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], DeleteObjectActionHandlerService);

//# sourceMappingURL=delete-object-action-handler.service.js.map