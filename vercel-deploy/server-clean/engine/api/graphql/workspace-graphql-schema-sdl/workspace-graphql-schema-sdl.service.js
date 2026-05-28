"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceGraphqlSchemaSDLService", {
    enumerable: true,
    get: function() {
        return WorkspaceGraphqlSchemaSDLService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _scalarsexplorerservice = require("../services/scalars-explorer.service");
const _workspacegraphqlschemafactory = require("../workspace-schema-builder/workspace-graphql-schema.factory");
const _flatentitymapsexception = require("../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _getsubflatentitymapsbyapplicationidsorthrowutil = require("../../../metadata-modules/flat-entity/utils/get-sub-flat-entity-maps-by-application-ids-or-throw.util");
const _workspacecachestorageservice = require("../../../workspace-cache-storage/workspace-cache-storage.service");
const _twentystandardapplications = require("../../../workspace-manager/twenty-standard-application/constants/twenty-standard-applications");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceGraphqlSchemaSDLService = class WorkspaceGraphqlSchemaSDLService {
    async getOrComputeSchemaSDL(workspace, applicationId) {
        if (!(0, _guards.isNonEmptyString)(workspace.databaseSchema)) {
            return null;
        }
        const { flatObjectMetadataMaps: allFlatObjectMetadataMaps, flatFieldMetadataMaps: allFlatFieldMetadataMaps, flatIndexMaps: allFlatIndexMaps, flatApplicationMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId: workspace.id,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps',
                'flatIndexMaps',
                'flatApplicationMaps'
            ]
        });
        if (!(0, _utils.isDefined)(allFlatObjectMetadataMaps)) {
            throw new _flatentitymapsexception.FlatEntityMapsException('Object metadata collection not found', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
        if (!(0, _utils.isDefined)(allFlatFieldMetadataMaps)) {
            throw new _flatentitymapsexception.FlatEntityMapsException('Field metadata collection not found', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
        let flatObjectMetadataMaps = allFlatObjectMetadataMaps;
        let flatFieldMetadataMaps = allFlatFieldMetadataMaps;
        let flatIndexMaps = allFlatIndexMaps;
        if ((0, _utils.isDefined)(applicationId)) {
            const twentyStandardApplicationId = flatApplicationMaps?.idByUniversalIdentifier[_twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier];
            const applicationIds = (0, _utils.isDefined)(twentyStandardApplicationId) ? [
                twentyStandardApplicationId,
                applicationId
            ] : [
                applicationId
            ];
            flatObjectMetadataMaps = this.filterFlatEntityMapsByApplicationIds(allFlatObjectMetadataMaps, applicationIds);
            flatFieldMetadataMaps = this.filterFlatEntityMapsByApplicationIds(allFlatFieldMetadataMaps, applicationIds);
            flatObjectMetadataMaps = this.reconcileObjectFieldIdsWithFilteredFieldMaps(flatObjectMetadataMaps, flatFieldMetadataMaps);
            if ((0, _utils.isDefined)(allFlatIndexMaps)) {
                flatIndexMaps = this.filterFlatEntityMapsByApplicationIds(allFlatIndexMaps, applicationIds);
            }
        }
        let metadataVersion = await this.workspaceCacheStorageService.getMetadataVersion(workspace.id);
        if (!(0, _utils.isDefined)(metadataVersion)) {
            metadataVersion = (0, _utils.isDefined)(workspace.metadataVersion) ? workspace.metadataVersion : 0;
            await this.workspaceCacheStorageService.setMetadataVersion(workspace.id, metadataVersion);
        }
        let sdl = await this.workspaceCacheStorageService.getGraphQLTypeDefs(workspace.id, metadataVersion, applicationId);
        let usedScalarNames = await this.workspaceCacheStorageService.getGraphQLUsedScalarNames(workspace.id, metadataVersion, applicationId);
        if (!sdl || !usedScalarNames) {
            const autoGeneratedSchema = await this.workspaceGraphQLSchemaGenerator.generateSchema({
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                flatIndexMaps
            });
            usedScalarNames = this.scalarsExplorerService.getUsedScalarNames(autoGeneratedSchema);
            sdl = (0, _graphql.printSchema)(autoGeneratedSchema);
            await this.workspaceCacheStorageService.setGraphQLTypeDefs(workspace.id, metadataVersion, sdl, applicationId);
            await this.workspaceCacheStorageService.setGraphQLUsedScalarNames(workspace.id, metadataVersion, usedScalarNames, applicationId);
        }
        return {
            sdl,
            usedScalarNames,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        };
    }
    reconcileObjectFieldIdsWithFilteredFieldMaps(flatObjectMetadataMaps, flatFieldMetadataMaps) {
        const filteredFieldIds = new Set(Object.keys(flatFieldMetadataMaps.universalIdentifierById));
        const reconciledByUniversalIdentifier = {};
        for (const [universalId, object] of Object.entries(flatObjectMetadataMaps.byUniversalIdentifier)){
            if (!(0, _utils.isDefined)(object)) continue;
            reconciledByUniversalIdentifier[universalId] = {
                ...object,
                fieldIds: object.fieldIds.filter((id)=>filteredFieldIds.has(id))
            };
        }
        return {
            ...flatObjectMetadataMaps,
            byUniversalIdentifier: reconciledByUniversalIdentifier
        };
    }
    filterFlatEntityMapsByApplicationIds(flatEntityMaps, applicationIds) {
        return (0, _getsubflatentitymapsbyapplicationidsorthrowutil.getSubFlatEntityMapsByApplicationIdsOrThrow)({
            applicationIds,
            flatEntityMaps
        });
    }
    constructor(scalarsExplorerService, workspaceGraphQLSchemaGenerator, workspaceCacheStorageService, workspaceManyOrAllFlatEntityMapsCacheService){
        this.scalarsExplorerService = scalarsExplorerService;
        this.workspaceGraphQLSchemaGenerator = workspaceGraphQLSchemaGenerator;
        this.workspaceCacheStorageService = workspaceCacheStorageService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
    }
};
WorkspaceGraphqlSchemaSDLService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _scalarsexplorerservice.ScalarsExplorerService === "undefined" ? Object : _scalarsexplorerservice.ScalarsExplorerService,
        typeof _workspacegraphqlschemafactory.WorkspaceGraphQLSchemaGenerator === "undefined" ? Object : _workspacegraphqlschemafactory.WorkspaceGraphQLSchemaGenerator,
        typeof _workspacecachestorageservice.WorkspaceCacheStorageService === "undefined" ? Object : _workspacecachestorageservice.WorkspaceCacheStorageService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], WorkspaceGraphqlSchemaSDLService);

//# sourceMappingURL=workspace-graphql-schema-sdl.service.js.map