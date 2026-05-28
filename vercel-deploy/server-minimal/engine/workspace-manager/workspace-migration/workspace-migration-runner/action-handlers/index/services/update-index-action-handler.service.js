"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateIndexActionHandlerService", {
    enumerable: true,
    get: function() {
        return UpdateIndexActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _uuid = require("uuid");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _indexfieldmetadataentity = require("../../../../../../metadata-modules/index-metadata/index-field-metadata.entity");
const _workspaceschemamanagerservice = require("../../../../../../twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
const _getworkspaceschemanameutil = require("../../../../../../workspace-datasource/utils/get-workspace-schema-name.util");
const _fromuniversalflatindextoflatindexutil = require("../utils/from-universal-flat-index-to-flat-index.util");
const _indexactionhandlerutils = require("../utils/index-action-handler.utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let UpdateIndexActionHandlerService = class UpdateIndexActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('update', 'index') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps, workspaceId, flatApplication } = context;
        const flatIndexMetadata = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
            flatEntityMaps: allFlatEntityMaps.flatIndexMaps,
            universalIdentifier: action.universalIdentifier
        });
        const updatedFlatIndex = (0, _fromuniversalflatindextoflatindexutil.fromUniversalFlatIndexToFlatIndex)({
            universalFlatIndexMetadata: action.updatedUniversalFlatIndex,
            indexMetadataId: (0, _uuid.v4)(),
            allFlatEntityMaps,
            workspaceId,
            applicationId: flatApplication.id
        });
        return {
            type: action.type,
            metadataName: action.metadataName,
            entityId: flatIndexMetadata.id,
            update: {},
            updatedFlatIndex
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner, workspaceId } = context;
        const { updatedFlatIndex } = flatAction;
        await (0, _indexactionhandlerutils.deleteIndexMetadata)({
            entityId: flatAction.entityId,
            queryRunner,
            workspaceId
        });
        await this.insertFlatEntitiesInRepository({
            queryRunner,
            flatEntities: [
                updatedFlatIndex
            ]
        });
        const indexFieldMetadataRepository = queryRunner.manager.getRepository(_indexfieldmetadataentity.IndexFieldMetadataEntity);
        const indexFieldMetadataToInsert = updatedFlatIndex.flatIndexFieldMetadatas.map((flatIndexFieldMetadata)=>({
                ...flatIndexFieldMetadata,
                indexMetadataId: updatedFlatIndex.id
            }));
        await indexFieldMetadataRepository.insert(indexFieldMetadataToInsert);
    }
    async executeForWorkspaceSchema(context) {
        const { flatAction, allFlatEntityMaps: { flatIndexMaps, flatObjectMetadataMaps, flatFieldMetadataMaps }, queryRunner, workspaceId } = context;
        const { entityId, updatedFlatIndex } = flatAction;
        // Get the old index to drop it
        const flatIndexMetadataToDelete = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: entityId,
            flatEntityMaps: flatIndexMaps
        });
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        // Drop old index
        await (0, _indexactionhandlerutils.dropIndexFromWorkspaceSchema)({
            indexName: flatIndexMetadataToDelete.name,
            workspaceSchemaManagerService: this.workspaceSchemaManagerService,
            queryRunner,
            schemaName
        });
        // Create new index
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatObjectMetadataMaps,
            flatEntityId: updatedFlatIndex.objectMetadataId
        });
        await (0, _indexactionhandlerutils.createIndexInWorkspaceSchema)({
            flatIndexMetadata: updatedFlatIndex,
            flatObjectMetadata,
            flatFieldMetadataMaps,
            workspaceSchemaManagerService: this.workspaceSchemaManagerService,
            queryRunner,
            workspaceId
        });
    }
    constructor(workspaceSchemaManagerService){
        super(), this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
UpdateIndexActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], UpdateIndexActionHandlerService);

//# sourceMappingURL=update-index-action-handler.service.js.map