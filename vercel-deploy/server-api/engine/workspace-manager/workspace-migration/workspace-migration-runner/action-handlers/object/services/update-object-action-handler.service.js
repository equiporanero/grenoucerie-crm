"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateObjectActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateObjectActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _flatentitymapsexception = require("../../../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findflatentitybyuniversalidentifierutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _findmanyflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _iscompositeflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-composite-flat-field-metadata.util");
const _isenumflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-enum-flat-field-metadata.util");
const _objectmetadataentity = require("../../../../../../metadata-modules/object-metadata/object-metadata.entity");
const _workspaceschemamanagerservice = require("../../../../../../twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
const _computeobjecttargettableutil = require("../../../../../../utils/compute-object-target-table.util");
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
let UpdateObjectActionHandlerService = class UpdateObjectActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'objectMetadata') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps } = context;
        const flatObjectMetadata = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatObjectMetadataMaps,
            universalIdentifier: action.universalIdentifier
        });
        // TODO remove once https://github.com/twentyhq/core-team-issues/issues/2172 has been resolved
        const { labelIdentifierFieldMetadataUniversalIdentifier, imageIdentifierFieldMetadataUniversalIdentifier, ...restUpdate } = action.update;
        const transpiledUpdate = {
            ...restUpdate
        };
        if ((0, _utils.isDefined)(labelIdentifierFieldMetadataUniversalIdentifier)) {
            const flatFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                flatEntityMaps: allFlatEntityMaps.flatFieldMetadataMaps,
                universalIdentifier: labelIdentifierFieldMetadataUniversalIdentifier
            });
            if (!(0, _utils.isDefined)(flatFieldMetadata)) {
                throw new _flatentitymapsexception.FlatEntityMapsException(`Could not resolve labelIdentifierFieldMetadataUniversalIdentifier to labelIdentifierFieldMetadataId: no fieldMetadata found for universal identifier ${labelIdentifierFieldMetadataUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
            }
            transpiledUpdate.labelIdentifierFieldMetadataId = flatFieldMetadata.id;
        }
        if ((0, _utils.isDefined)(imageIdentifierFieldMetadataUniversalIdentifier)) {
            const flatFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                flatEntityMaps: allFlatEntityMaps.flatFieldMetadataMaps,
                universalIdentifier: imageIdentifierFieldMetadataUniversalIdentifier
            });
            if (!(0, _utils.isDefined)(flatFieldMetadata)) {
                throw new _flatentitymapsexception.FlatEntityMapsException(`Could not resolve imageIdentifierFieldMetadataUniversalIdentifier to imageIdentifierFieldMetadataId: no fieldMetadata found for universal identifier ${imageIdentifierFieldMetadataUniversalIdentifier}`, _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
            }
            transpiledUpdate.imageIdentifierFieldMetadataId = flatFieldMetadata.id;
        }
        return {
            type: 'update',
            metadataName: 'objectMetadata',
            entityId: flatObjectMetadata.id,
            update: transpiledUpdate
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner } = context;
        const objectMetadataRepository = queryRunner.manager.getRepository(_objectmetadataentity.ObjectMetadataEntity);
        await objectMetadataRepository.update(flatAction.entityId, flatAction.update);
    }
    async executeForWorkspaceSchema(context) {
        const { flatAction, queryRunner, allFlatEntityMaps: { flatObjectMetadataMaps, flatFieldMetadataMaps }, workspaceId } = context;
        const { entityId, update } = flatAction;
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatObjectMetadataMaps,
            flatEntityId: entityId
        });
        const { schemaName, tableName: currentTableName } = (0, _getworkspaceschemacontextformigrationutil.getWorkspaceSchemaContextForMigration)({
            workspaceId,
            objectMetadata: flatObjectMetadata
        });
        if ((0, _utils.isDefined)(update.nameSingular)) {
            const updatedFlatObjectMetadata = {
                ...flatObjectMetadata,
                nameSingular: update.nameSingular
            };
            const newTableName = (0, _computeobjecttargettableutil.computeObjectTargetTable)(updatedFlatObjectMetadata);
            if (currentTableName !== newTableName) {
                await this.workspaceSchemaManagerService.tableManager.renameTable({
                    queryRunner,
                    schemaName,
                    oldTableName: currentTableName,
                    newTableName
                });
                const objectFlatFieldMetadatas = (0, _findmanyflatentitybyidinflatentitymapsorthrowutil.findManyFlatEntityByIdInFlatEntityMapsOrThrow)({
                    flatEntityMaps: flatFieldMetadataMaps,
                    flatEntityIds: updatedFlatObjectMetadata.fieldIds
                });
                const enumOrCompositeFlatFieldMetadatas = objectFlatFieldMetadatas.filter((flatFieldMetadata)=>(0, _isenumflatfieldmetadatautil.isEnumFlatFieldMetadata)(flatFieldMetadata) || (0, _iscompositeflatfieldmetadatautil.isCompositeFlatFieldMetadata)(flatFieldMetadata));
                const enumOperations = (0, _workspaceschemaenumoperationsutil.collectEnumOperationsForObject)({
                    flatFieldMetadatas: enumOrCompositeFlatFieldMetadatas,
                    tableName: currentTableName,
                    operation: _workspaceschemaenumoperationsutil.EnumOperation.RENAME,
                    options: {
                        newTableName
                    }
                });
                await (0, _workspaceschemaenumoperationsutil.executeBatchEnumOperations)({
                    enumOperations,
                    queryRunner,
                    schemaName,
                    workspaceSchemaManagerService: this.workspaceSchemaManagerService
                });
            }
        }
    }
    constructor(workspaceSchemaManagerService){
        super(), this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
UpdateObjectActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], UpdateObjectActionHandlerService);

//# sourceMappingURL=update-object-action-handler.service.js.map