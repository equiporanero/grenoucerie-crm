"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RelationConnectGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return RelationConnectGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typemapperservice = require("../../services/type-mapper.service");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _computerelationconnectinputtypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-relation-connect-input-type-key.util");
const _findmanyflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RelationConnectGqlInputTypeGenerator = class RelationConnectGqlInputTypeGenerator {
    buildAndStore(flatObjectMetadata, fields, context) {
        const relationConnectGqlInputType = this.generateRelationConnectInputType(flatObjectMetadata, fields, context);
        const key = (0, _computerelationconnectinputtypekeyutil.computeRelationConnectInputTypeKey)(flatObjectMetadata.id);
        this.gqlTypesStorage.addGqlType(key, relationConnectGqlInputType);
    }
    generateRelationConnectInputType(flatObjectMetadata, fields, context) {
        return new _graphql.GraphQLInputObjectType({
            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}RelationInput`,
            fields: ()=>({
                    [_constants.RELATION_NESTED_QUERY_KEYWORDS.CONNECT]: {
                        type: new _graphql.GraphQLInputObjectType({
                            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}ConnectInput`,
                            fields: this.generateRelationWhereInputType(flatObjectMetadata, fields, context)
                        }),
                        description: `Connect to a ${flatObjectMetadata.nameSingular} record`
                    },
                    [_constants.RELATION_NESTED_QUERY_KEYWORDS.DISCONNECT]: {
                        type: _graphql.GraphQLBoolean,
                        description: `Disconnect from a ${flatObjectMetadata.nameSingular} record`
                    }
                })
        });
    }
    generateRelationWhereInputType(flatObjectMetadata, fields, context) {
        const { flatIndexMaps } = context;
        const indexMetadatas = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
            flatEntityIds: flatObjectMetadata.indexMetadataIds,
            flatEntityMaps: flatIndexMaps
        }).map((flatIndex)=>({
                id: flatIndex.id,
                isUnique: flatIndex.isUnique,
                indexFieldMetadatas: flatIndex.flatIndexFieldMetadatas
            }));
        const objectWithIndexes = {
            id: flatObjectMetadata.id,
            indexMetadatas,
            fields
        };
        const uniqueConstraints = (0, _utils.getUniqueConstraintsFields)(objectWithIndexes);
        const inputFields = {};
        uniqueConstraints.forEach((constraint)=>{
            constraint.forEach((field)=>{
                if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(field.type)) {
                    const compositeType = _types.compositeTypeDefinitions.get(field.type);
                    if (!compositeType) {
                        throw new Error(`Composite type definition not found for field type ${field.type}`);
                    }
                    const uniqueProperties = compositeType.properties.filter((property)=>property.isIncludedInUniqueConstraint);
                    if (uniqueProperties.length > 0) {
                        const compositeFields = {};
                        uniqueProperties.forEach((property)=>{
                            const scalarType = this.typeMapperService.mapToPreBuiltGraphQLInputType({
                                fieldMetadataType: property.type
                            });
                            compositeFields[property.name] = {
                                type: scalarType || _graphql.GraphQLString,
                                description: `Connect by ${property.name}`
                            };
                        });
                        const compositeInputType = new _graphql.GraphQLInputObjectType({
                            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}${(0, _utils.pascalCase)(field.name)}WhereInput`,
                            fields: ()=>compositeFields
                        });
                        inputFields[field.name] = {
                            type: compositeInputType,
                            description: `Connect by ${field.label || field.name}`
                        };
                    }
                } else {
                    const scalarType = this.typeMapperService.mapToPreBuiltGraphQLInputType({
                        fieldMetadataType: field.type,
                        typeOptions: {
                            settings: field.settings,
                            isIdField: field.name === 'id'
                        }
                    });
                    inputFields[field.name] = {
                        type: scalarType || _graphql.GraphQLString,
                        description: `Connect by ${field.label || field.name}`
                    };
                }
            });
        });
        return {
            [_constants.RELATION_NESTED_QUERY_KEYWORDS.CONNECT_WHERE]: {
                type: new _graphql.GraphQLInputObjectType({
                    name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}WhereUniqueInput`,
                    fields: ()=>inputFields
                }),
                description: `Find a ${flatObjectMetadata.nameSingular} record based on its unique fields: ${this.formatConstraints(uniqueConstraints)}`
            }
        };
    }
    formatConstraints(constraints) {
        return constraints.map((constraint)=>constraint.map((field)=>field.name).join(' and ')).join(' or ');
    }
    constructor(typeMapperService, gqlTypesStorage){
        this.typeMapperService = typeMapperService;
        this.gqlTypesStorage = gqlTypesStorage;
    }
};
RelationConnectGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService,
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], RelationConnectGqlInputTypeGenerator);

//# sourceMappingURL=relation-connect-gql-input-type.generator.js.map