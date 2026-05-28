"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateIndexActionHandlerService", {
    enumerable: true,
    get: function() {
        return CreateIndexActionHandlerService;
    }
});
const _common = require("@nestjs/common");
const _uuid = require("uuid");
const _workspacemigrationrunneractionhandlerserviceinterface = require("../../../interfaces/workspace-migration-runner-action-handler-service.interface");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _indexfieldmetadataentity = require("../../../../../../metadata-modules/index-metadata/index-field-metadata.entity");
const _workspaceschemamanagerservice = require("../../../../../../twenty-orm/workspace-schema-manager/workspace-schema-manager.service");
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
let CreateIndexActionHandlerService = class CreateIndexActionHandlerService extends (0, _workspacemigrationrunneractionhandlerserviceinterface.WorkspaceMigrationRunnerActionHandler)('create', 'index') {
    async transpileUniversalActionToFlatAction(context) {
        const { action, allFlatEntityMaps, workspaceId, flatApplication } = context;
        const flatEntity = (0, _fromuniversalflatindextoflatindexutil.fromUniversalFlatIndexToFlatIndex)({
            universalFlatIndexMetadata: action.flatEntity,
            indexMetadataId: action.id ?? (0, _uuid.v4)(),
            allFlatEntityMaps,
            workspaceId,
            applicationId: flatApplication.id
        });
        return {
            type: action.type,
            metadataName: action.metadataName,
            flatEntity
        };
    }
    async executeForMetadata(context) {
        const { flatAction, queryRunner } = context;
        const { flatEntity: flatIndexMetadata } = flatAction;
        await this.insertFlatEntitiesInRepository({
            queryRunner,
            flatEntities: [
                flatIndexMetadata
            ]
        });
        const indexFieldMetadataRepository = queryRunner.manager.getRepository(_indexfieldmetadataentity.IndexFieldMetadataEntity);
        await indexFieldMetadataRepository.insert(flatIndexMetadata.flatIndexFieldMetadatas);
    }
    async executeForWorkspaceSchema(context) {
        const { allFlatEntityMaps: { flatObjectMetadataMaps, flatFieldMetadataMaps }, flatAction: { flatEntity: flatIndexMetadata }, queryRunner, workspaceId } = context;
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatObjectMetadataMaps,
            flatEntityId: flatIndexMetadata.objectMetadataId
        });
        await (0, _indexactionhandlerutils.createIndexInWorkspaceSchema)({
            flatIndexMetadata,
            flatFieldMetadataMaps,
            flatObjectMetadata,
            workspaceSchemaManagerService: this.workspaceSchemaManagerService,
            queryRunner,
            workspaceId
        });
    }
    constructor(workspaceSchemaManagerService){
        super(), this.workspaceSchemaManagerService = workspaceSchemaManagerService;
    }
};
CreateIndexActionHandlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceschemamanagerservice.WorkspaceSchemaManagerService === "undefined" ? Object : _workspaceschemamanagerservice.WorkspaceSchemaManagerService
    ])
], CreateIndexActionHandlerService);

//# sourceMappingURL=create-index-action-handler.service.js.map