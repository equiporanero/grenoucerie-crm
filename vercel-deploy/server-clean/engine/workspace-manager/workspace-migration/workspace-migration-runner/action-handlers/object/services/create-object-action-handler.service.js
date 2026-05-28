"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateObjectActionHandlerService", {
    enumerable: true,
    get: function() {
        return CreateObjectActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _uuid = require("uuid");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _allmetadataentitybymetadatanameconstant = require("../../../../../../metadata-modules/flat-entity/constant/all-metadata-entity-by-metadata-name.constant");
const _iscompositeflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-composite-flat-field-metadata.util");
const _isenumflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-enum-flat-field-metadata.util");
const _workspaceschemamanagerservice = require("../../../../../../twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
const _fromuniversalflatfieldmetadatatoflatfieldmetadatautil = require("../../field/services/utils/from-universal-flat-field-metadata-to-flat-field-metadata.util");
const _fromuniversalflatobjectmetadatatoflatobjectmetadatautil = require("./utils/from-universal-flat-object-metadata-to-flat-object-metadata.util");
const _flatentitytoscalarflatentityutil = require("../../../utils/flat-entity-to-scalar-flat-entity.util");
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
let CreateObjectActionHandlerService = class CreateObjectActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('create', 'objectMetadata') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const { fieldIdByUniversalIdentifier, id: providedObjectId } = action;
        const allFieldIdToBeCreatedInActionByUniversalIdentifierMap = new Map();
        for (const universalFlatFieldMetadata of action.universalFlatFieldMetadatas){
            const providedFieldId = fieldIdByUniversalIdentifier?.[universalFlatFieldMetadata.universalIdentifier];
            allFieldIdToBeCreatedInActionByUniversalIdentifierMap.set(universalFlatFieldMetadata.universalIdentifier, providedFieldId ?? (0, _uuid.v4)());
        }
        const flatObjectMetadata = (0, _fromuniversalflatobjectmetadatatoflatobjectmetadatautil.fromUniversalFlatObjectMetadataToFlatObjectMetadata)({
            allFieldIdToBeCreatedInActionByUniversalIdentifierMap,
            allFlatEntityMaps,
            context,
            generatedId: providedObjectId ?? (0, _uuid.v4)(),
            universalFlatObjectMetadata: action.flatEntity
        });
        const flatFieldMetadatas = action.universalFlatFieldMetadatas.map((universalFlatFieldMetadata)=>(0, _fromuniversalflatfieldmetadatatoflatfieldmetadatautil.fromUniversalFlatFieldMetadataToFlatFieldMetadata)({
                objectMetadataId: flatObjectMetadata.id,
                universalFlatFieldMetadata,
                allFieldIdToBeCreatedInActionByUniversalIdentifierMap,
                allFlatEntityMaps,
                context
            }));
        return {
            type: action.type,
            metadataName: action.metadataName,
            flatEntity: flatObjectMetadata,
            flatFieldMetadatas
        };
    }
    async executeForMetadata(context) {
        const { queryRunner, flatAction } = context;
        const { flatEntity: flatObjectMetadata, flatFieldMetadatas } = flatAction;
        await this.insertFlatEntitiesInRepository({
            queryRunner,
            flatEntities: [
                flatObjectMetadata
            ]
        });
        const scalarFieldMetadatas = flatFieldMetadatas.map((flatFieldMetadata)=>(0, _flatentitytoscalarflatentityutil.flatEntityToScalarFlatEntity)({
                metadataName: 'fieldMetadata',
                flatEntity: flatFieldMetadata
            }));
        const fieldMetadataRepository = queryRunner.manager.getRepository(_allmetadataentitybymetadatanameconstant.ALL_METADATA_ENTITY_BY_METADATA_NAME['fieldMetadata']);
        await fieldMetadataRepository.insert(scalarFieldMetadatas);
    }
    async executeForWorkspaceSchema(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { flatEntity: flatObjectMetadata, flatFieldMetadatas } = flatAction;
        const { schemaName, tableName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
            workspaceId,
            objectMetadata: flatObjectMetadata
        });
        const columnDefinitions = flatFieldMetadatas.flatMap((flatFieldMetadata)=>(0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
                flatFieldMetadata,
                flatObjectMetadata,
                workspaceId
            }));
        const enumOrCompositeFlatFieldMetadatas = flatFieldMetadatas.filter((flatFieldMetadata)=>(0, _isenumflatfieldmetadatautil.isEnumFlatFieldMetadata)(flatFieldMetadata) || (0, _iscompositeflatfieldmetadatautil.isCompositeFlatFieldMetadata)(flatFieldMetadata));
        const enumOperations = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForObject)({
            flatFieldMetadatas: enumOrCompositeFlatFieldMetadatas,
            tableName,
            operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE
        });
        await (0, _workspaceschemaenumoperationsutil.executeBatchEnumOperations)({
            enumOperations,
            queryRunner,
            schemaName,
            workspaceSchemaManagerService: this.workspaceSchemaManagerService
        });
        await this.workspaceSchemaManagerService.tableManager.createTable({
            queryRunner,
            schemaName,
            tableName,
            columnDefinitions
        });
    }
    constructor(workspaceSchemaManagerService){
        super(), this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
CreateObjectActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], CreateObjectActionHandlerService);

//# sourceMappingURL=create-object-action-handler.service.js.map