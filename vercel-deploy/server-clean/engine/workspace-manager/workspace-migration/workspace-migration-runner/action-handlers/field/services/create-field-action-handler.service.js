"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateFieldActionHandlerService", {
    enumerable: true,
    get: function() {
        return CreateFieldActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _workspaceschemamanagerservice = require("../../../../../../twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
const _computeobjecttargettableutil = require("../../../../../../utils/compute-object-target-table.util");
const _convertondeleteactiontoondeleteutil = require("../../../../utils/convert-on-delete-action-to-on-delete.util");
const _fromuniversalflatfieldmetadatatoflatfieldmetadatautil = require("./utils/from-universal-flat-field-metadata-to-flat-field-metadata.util");
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
let CreateFieldActionHandlerService = class CreateFieldActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('create', 'fieldMetadata') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const allFieldIdToBeCreatedInActionByUniversalIdentifierMap = new Map();
        allFieldIdToBeCreatedInActionByUniversalIdentifierMap.set(action.flatEntity.universalIdentifier, action.id ?? (0, _uuid.v4)());
        if ((0, _utils.isDefined)(action.relatedUniversalFlatFieldMetadata)) {
            allFieldIdToBeCreatedInActionByUniversalIdentifierMap.set(action.relatedUniversalFlatFieldMetadata.universalIdentifier, action.relatedFieldId ?? (0, _uuid.v4)());
        }
        const universalFlatFieldMetadatas = (0, _utils.isDefined)(action.relatedUniversalFlatFieldMetadata) ? [
            action.flatEntity,
            action.relatedUniversalFlatFieldMetadata
        ] : [
            action.flatEntity
        ];
        const [flatFieldMetadata, relatedFlatFieldMetadata] = universalFlatFieldMetadatas.map((universalFlatFieldMetadata)=>(0, _fromuniversalflatfieldmetadatatoflatfieldmetadatautil.fromUniversalFlatFieldMetadataToFlatFieldMetadata)({
                universalFlatFieldMetadata,
                allFieldIdToBeCreatedInActionByUniversalIdentifierMap,
                allFlatEntityMaps,
                context
            }));
        return {
            type: action.type,
            metadataName: action.metadataName,
            flatEntity: flatFieldMetadata,
            relatedFlatFieldMetadata
        };
    }
    async executeForMetadata(context) {
        const { queryRunner, flatAction } = context;
        const { flatEntity, relatedFlatFieldMetadata } = flatAction;
        await this.insertFlatEntitiesInRepository({
            queryRunner,
            flatEntities: [
                flatEntity,
                relatedFlatFieldMetadata
            ].filter(_utils.isDefined)
        });
    }
    async executeForWorkspaceSchema(context) {
        const { flatAction, queryRunner, allFlatEntityMaps: { flatObjectMetadataMaps }, workspaceId } = context;
        const { flatEntity, relatedFlatFieldMetadata } = flatAction;
        const fieldsByObjectMetadataId = new Map();
        for (const flatFieldMetadata of [
            flatEntity,
            relatedFlatFieldMetadata
        ].filter(_utils.isDefined)){
            const existingFields = fieldsByObjectMetadataId.get(flatFieldMetadata.objectMetadataId);
            if ((0, _utils.isDefined)(existingFields)) {
                existingFields.push(flatFieldMetadata);
            } else {
                fieldsByObjectMetadataId.set(flatFieldMetadata.objectMetadataId, [
                    flatFieldMetadata
                ]);
            }
        }
        for (const [objectMetadataId, objectFlatFieldMetadatas] of fieldsByObjectMetadataId){
            const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityMaps: flatObjectMetadataMaps,
                flatEntityId: objectMetadataId
            });
            const { schemaName, tableName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
                workspaceId,
                objectMetadata: flatObjectMetadata
            });
            for (const flatFieldMetadata of objectFlatFieldMetadatas){
                await this.executeSingleFieldMetadataWorkspaceSchema({
                    flatFieldMetadata,
                    flatObjectMetadata,
                    flatObjectMetadataMaps,
                    queryRunner,
                    schemaName,
                    tableName,
                    workspaceId
                });
            }
        }
    }
    async executeSingleFieldMetadataWorkspaceSchema({ flatFieldMetadata, flatObjectMetadata, flatObjectMetadataMaps, queryRunner, schemaName, tableName, workspaceId }) {
        const enumOperations = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForField)({
            flatFieldMetadata,
            tableName,
            operation: _workspaceschemaenumoperationsutil.EnumOperation.CREATE
        });
        const columnDefinitions = (0, _generatecolumndefinitionsutil.generateColumnDefinitions)({
            flatFieldMetadata,
            flatObjectMetadata,
            workspaceId
        });
        await (0, _workspaceschemaenumoperationsutil.executeBatchEnumOperations)({
            enumOperations,
            queryRunner,
            schemaName,
            workspaceSchemaManagerService: this.workspaceSchemaManagerService
        });
        await this.workspaceSchemaManagerService.columnManager.addColumns({
            queryRunner,
            schemaName,
            tableName,
            columnDefinitions
        });
        if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(flatFieldMetadata) && flatFieldMetadata.settings?.relationType === _types.RelationType.MANY_TO_ONE) {
            const targetFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityMaps: flatObjectMetadataMaps,
                flatEntityId: flatFieldMetadata.relationTargetObjectMetadataId
            });
            const referencedTableName = (0, _computeobjecttargettableutil.computeObjectTargetTable)(targetFlatObjectMetadata);
            const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                name: flatFieldMetadata.name
            });
            await this.workspaceSchemaManagerService.foreignKeyManager.createForeignKey({
                queryRunner,
                schemaName,
                foreignKey: {
                    tableName,
                    columnName: joinColumnName,
                    referencedTableName,
                    referencedColumnName: 'id',
                    onDelete: (0, _convertondeleteactiontoondeleteutil.convertOnDeleteActionToOnDelete)(flatFieldMetadata.settings?.onDelete) ?? 'CASCADE'
                }
            });
        }
    }
    constructor(workspaceSchemaManagerService){
        super(), this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
CreateFieldActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], CreateFieldActionHandlerService);

//# sourceMappingURL=create-field-action-handler.service.js.map