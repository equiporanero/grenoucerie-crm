"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GqlTypeGenerator", {
    enumerable: true,
    get: function() {
        return GqlTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _workspaceresolverbuilderservice = require("../../workspace-resolver-builder/workspace-resolver-builder.service");
const _typegenerators = require("./type-generators");
const _typemapperservice = require("../services/type-mapper.service");
const _gqltypesstorage = require("../storages/gql-types.storage");
const _getflatfieldsforflatobjectmetadatautil = require("../utils/get-flat-fields-for-flat-object-metadata.util");
const _ismorphorrelationfieldmetadatatypeutil = require("../../../../utils/is-morph-or-relation-field-metadata-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GqlTypeGenerator = class GqlTypeGenerator {
    async buildAndStore(context) {
        const gqlTypesStorage = new _gqltypesstorage.GqlTypesStorage();
        const generators = (0, _typegenerators.instantiateTypeGenerators)(gqlTypesStorage, this.typeMapperService, this.workspaceResolverBuilderService);
        const compositeTypeCollection = [
            ..._types.compositeTypeDefinitions.values()
        ];
        this.buildAndStoreCompositeFieldMetadataGqlTypes(compositeTypeCollection, generators);
        generators.groupByDateGranularityInputTypeGenerator.buildAndStore();
        this.buildAndStoreObjectMetadataGqlTypes(context, generators);
        await generators.queryTypeGenerator.buildAndStore(context);
        generators.mutationTypeGenerator.buildAndStore(context);
        return gqlTypesStorage;
    }
    buildAndStoreCompositeFieldMetadataGqlTypes(compositeTypes, generators) {
        for (const compositeType of compositeTypes){
            generators.compositeFieldMetadataGqlEnumTypeGenerator.buildAndStore(compositeType);
            generators.compositeFieldMetadataGqlObjectTypeGenerator.buildAndStore(compositeType);
            generators.compositeFieldMetadataGqlInputTypeGenerator.buildAndStore(compositeType);
        }
    }
    buildAndStoreObjectMetadataGqlTypes(context, generators) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = context;
        const objectMetadataCollection = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined);
        this.logger.log(`Generating metadata objects: [${objectMetadataCollection.map((object)=>object.nameSingular).join(', ')}]`);
        for (const flatObjectMetadata of objectMetadataCollection){
            const fields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps);
            generators.enumFieldMetadataGqlEnumTypeGenerator.buildAndStore(flatObjectMetadata, fields);
            generators.objectMetadataGqlObjectTypeGenerator.buildAndStore(flatObjectMetadata, fields);
            generators.edgeGqlObjectTypeGenerator.buildAndStore(flatObjectMetadata);
            generators.connectionGqlObjectTypeGenerator.buildAndStore(flatObjectMetadata, fields);
            generators.groupByConnectionGqlObjectTypeGenerator.buildAndStore(flatObjectMetadata);
            generators.relationConnectGqlInputTypeGenerator.buildAndStore(flatObjectMetadata, fields, context);
            generators.objectMetadataGqlInputTypeGenerator.buildAndStore(flatObjectMetadata, fields, context);
            if (this.objectContainsRelationOrMorphField(fields)) {
                generators.objectMetadataWithRelationsGqlObjectTypeGenerator.buildAndStore(flatObjectMetadata, fields, context);
            }
        }
    }
    objectContainsRelationOrMorphField(fields) {
        return fields.some((field)=>(0, _ismorphorrelationfieldmetadatatypeutil.isMorphOrRelationFieldMetadataType)(field.type));
    }
    constructor(typeMapperService, workspaceResolverBuilderService){
        this.typeMapperService = typeMapperService;
        this.workspaceResolverBuilderService = workspaceResolverBuilderService;
        this.logger = new _common.Logger(GqlTypeGenerator.name);
    }
};
GqlTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService,
        typeof _workspaceresolverbuilderservice.WorkspaceResolverBuilderService === "undefined" ? Object : _workspaceresolverbuilderservice.WorkspaceResolverBuilderService
    ])
], GqlTypeGenerator);

//# sourceMappingURL=gql-type.generator.js.map