"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataWithRelationsGqlObjectTypeGenerator", {
    enumerable: true,
    get: function() {
        return ObjectMetadataWithRelationsGqlObjectTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _relationtypeinterface = require("../../../../../metadata-modules/field-metadata/interfaces/relation-type.interface");
const _objecttypedefinitionkindenum = require("../../enums/object-type-definition-kind.enum");
const _argstypegenerator = require("../args-type/args-type.generator");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _computeobjectmetadataobjecttypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-object-type-key.util");
const _getresolverargsutil = require("../../utils/get-resolver-args.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _ismorphorrelationfieldmetadatatypeutil = require("../../../../../utils/is-morph-or-relation-field-metadata-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectMetadataWithRelationsGqlObjectTypeGenerator = class ObjectMetadataWithRelationsGqlObjectTypeGenerator {
    buildAndStore(flatObjectMetadata, flatFieldMetadatas, context) {
        const key = (0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(flatObjectMetadata.nameSingular, _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Plain);
        const gqlType = this.gqlTypesStorage.getGqlTypeByKey(key);
        if (!(0, _utils.isDefined)(gqlType) || !(0, _graphql.isObjectType)(gqlType)) {
            this.logger.error(`Could not find a GraphQL type for ${flatObjectMetadata.id.toString()}`);
            throw new Error(`Could not find a GraphQL type for ${flatObjectMetadata.id.toString()}`);
        }
        const containsRelationOrMorphField = flatFieldMetadatas.some((field)=>(0, _ismorphorrelationfieldmetadatatypeutil.isMorphOrRelationFieldMetadataType)(field.type));
        // Security check to avoid extending an object that does not need to be extended
        if (!containsRelationOrMorphField) {
            this.logger.error(`This object does not need to be extended: ${flatObjectMetadata.id.toString()}`);
            throw new Error(`This object does not need to be extended: ${flatObjectMetadata.id.toString()}`);
        }
        // Extract current object config to extend it
        const config = gqlType.toConfig();
        // Recreate the same object type with the new fields
        this.gqlTypesStorage.addGqlType(key, new _graphql.GraphQLObjectType({
            ...config,
            fields: ()=>({
                    ...config.fields,
                    ...this.generateFields(flatFieldMetadatas, context)
                })
        }));
    }
    generateFields(flatFieldMetadatas, context) {
        const outputFields = {};
        for (const flatFieldMetadata of flatFieldMetadatas){
            if (!(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(flatFieldMetadata)) {
                continue;
            }
            if (!flatFieldMetadata.settings) {
                throw new Error(`Field Metadata of type RELATION or MORPH_RELATION with id ${flatFieldMetadata.id} has no settings`);
            }
            if (!flatFieldMetadata.relationTargetObjectMetadataId) {
                throw new Error(`Field Metadata of type RELATION or MORPH_RELATION with id ${flatFieldMetadata.id} has no relation target object metadata id`);
            }
            const objectMetadataTarget = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: flatFieldMetadata.relationTargetObjectMetadataId,
                flatEntityMaps: context.flatObjectMetadataMaps
            });
            if (!(0, _utils.isDefined)(objectMetadataTarget)) {
                throw new Error(`Field Metadata of type RELATION or MORPH_RELATION with id ${flatFieldMetadata.id} has no relation target object metadata`);
            }
            const targetObjectMetadataGqlObjectType = this.fetchTargetObjectMetadataGqlObjectType(flatFieldMetadata, objectMetadataTarget);
            let argsType = undefined;
            if (flatFieldMetadata.settings?.relationType === _relationtypeinterface.RelationType.ONE_TO_MANY) {
                const args = (0, _getresolverargsutil.getResolverArgs)('findMany');
                argsType = this.argsTypeGenerator.generate({
                    args,
                    objectMetadataSingularName: objectMetadataTarget.nameSingular
                });
            }
            outputFields[flatFieldMetadata.name] = {
                type: targetObjectMetadataGqlObjectType,
                args: argsType,
                description: flatFieldMetadata.description
            };
        }
        return outputFields;
    }
    fetchTargetObjectMetadataGqlObjectType(flatFieldMetadata, objectMetadataTarget) {
        if (!flatFieldMetadata.settings) {
            throw new Error(`Field Metadata of type RELATION or MORPH_RELATION with id ${flatFieldMetadata.id} has no settings`);
        }
        const key = (0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(objectMetadataTarget.nameSingular, flatFieldMetadata.settings.relationType === _relationtypeinterface.RelationType.ONE_TO_MANY ? _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Connection : _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Plain);
        const targetObjectMetadataGqlObjectType = this.gqlTypesStorage.getGqlTypeByKey(key);
        if (!(0, _utils.isDefined)(targetObjectMetadataGqlObjectType) || !(0, _graphql.isObjectType)(targetObjectMetadataGqlObjectType)) {
            this.logger.error(`Could not find a relation type for ${flatFieldMetadata.id}`);
            throw new Error(`Could not find a relation type for ${flatFieldMetadata.id}`);
        }
        return targetObjectMetadataGqlObjectType;
    }
    constructor(argsTypeGenerator, gqlTypesStorage){
        this.argsTypeGenerator = argsTypeGenerator;
        this.gqlTypesStorage = gqlTypesStorage;
        this.logger = new _common.Logger(ObjectMetadataWithRelationsGqlObjectTypeGenerator.name);
    }
};
ObjectMetadataWithRelationsGqlObjectTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _argstypegenerator.ArgsTypeGenerator === "undefined" ? Object : _argstypegenerator.ArgsTypeGenerator,
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], ObjectMetadataWithRelationsGqlObjectTypeGenerator);

//# sourceMappingURL=object-metadata-with-relations-gql-object-type.generator.js.map