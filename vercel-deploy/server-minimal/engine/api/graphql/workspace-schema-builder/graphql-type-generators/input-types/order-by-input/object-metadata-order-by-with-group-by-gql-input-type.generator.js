"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _gqlinputtypedefinitionkindenum = require("../../../enums/gql-input-type-definition-kind.enum");
const _objectmetadataorderbybasegenerator = require("./object-metadata-order-by-base.generator");
const _relationfieldmetadatagqltypegenerator = require("../relation-field-metadata-gql-type.generator");
const _typemapperservice = require("../../../services/type-mapper.service");
const _gqltypesstorage = require("../../../storages/gql-types.storage");
const _computefieldinputtypeoptionsutil = require("../../../utils/compute-field-input-type-options.util");
const _computecompositefieldinputtypekeyutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-composite-field-input-type-key.util");
const _computeobjectmetadatainputtypeutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-input-type.util");
const _getavailableaggregationsfromobjectfieldsutil = require("../../../utils/get-available-aggregations-from-object-fields.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator = class ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator {
    buildAndStore({ flatObjectMetadata, fields, context }) {
        const inputType = new _graphql.GraphQLInputObjectType({
            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}${_gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderByWithGroupBy.toString()}Input`,
            description: flatObjectMetadata.description,
            fields: ()=>this.generateFields(flatObjectMetadata.nameSingular, fields, context)
        });
        const key = (0, _computeobjectmetadatainputtypeutil.computeObjectMetadataInputTypeKey)(flatObjectMetadata.nameSingular, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderByWithGroupBy);
        this.gqlTypesStorage.addGqlType(key, inputType);
    }
    generateFields(objectNameSingular, fields, context) {
        return {
            ...this.generateOrderByOnAggregateFields(objectNameSingular, fields, context),
            ...this.generateOrderByOnDimensionValuesFields(fields, context)
        };
    }
    generateOrderByOnAggregateFields(objectNameSingular, fields, context) {
        const allAggregatedFields = {};
        for (const fieldMetadata of fields){
            const modifiedFieldMetadata = {
                ...fieldMetadata,
                isNullable: true
            };
            const typeOptions = (0, _computefieldinputtypeoptionsutil.computeFieldInputTypeOptions)(modifiedFieldMetadata, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderBy);
            let generatedFields;
            if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata)) {
                generatedFields = this.relationFieldMetadataGqlInputTypeGenerator.generateSimpleRelationFieldOrderByInputType({
                    fieldMetadata,
                    context
                });
            } else if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
                generatedFields = this.generateCompositeFieldOrderByInputType(fieldMetadata, typeOptions);
            } else {
                generatedFields = this.generateAtomicFieldOrderByInputType(fieldMetadata, typeOptions);
            }
            Object.assign(allAggregatedFields, generatedFields);
        }
        const aggregateInputType = new _graphql.GraphQLInputObjectType({
            name: `${(0, _utils.pascalCase)(objectNameSingular)}${_gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderByWithGroupBy.toString()}AggregateInput`,
            description: 'Aggregate-based ordering',
            fields: ()=>allAggregatedFields
        });
        return {
            aggregate: {
                type: aggregateInputType,
                description: 'Order by aggregate values'
            }
        };
    }
    generateOrderByOnDimensionValuesFields(fields, context) {
        return this.objectMetadataOrderByBaseGenerator.generateFields({
            fields,
            logger: this.logger,
            isForGroupBy: true,
            context
        });
    }
    generateCompositeFieldOrderByInputType(fieldMetadata, typeOptions) {
        const key = (0, _computecompositefieldinputtypekeyutil.computeCompositeFieldInputTypeKey)(fieldMetadata.type, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderBy);
        const compositeType = this.gqlTypesStorage.getGqlTypeByKey(key);
        if (!(0, _utils.isDefined)(compositeType) || !(0, _graphql.isInputObjectType)(compositeType)) {
            const message = `Could not find a GraphQL input type for ${fieldMetadata.type} field metadata`;
            this.logger.error(message, {
                fieldMetadata,
                typeOptions
            });
            throw new Error(message);
        }
        const aggregations = this.generateAggregateFieldOrderByInputType(fieldMetadata);
        return aggregations;
    }
    generateAtomicFieldOrderByInputType(fieldMetadata, typeOptions) {
        const orderByType = this.typeMapperService.mapToOrderByType(fieldMetadata.type);
        if (!(0, _utils.isDefined)(orderByType)) {
            const message = `Could not find a GraphQL input type for ${fieldMetadata.type} field metadata`;
            this.logger.error(message, {
                fieldMetadata,
                typeOptions
            });
            throw new Error(message);
        }
        const aggregations = this.generateAggregateFieldOrderByInputType(fieldMetadata);
        return aggregations;
    }
    generateAggregateFieldOrderByInputType(fieldMetadata) {
        const aggregations = (0, _getavailableaggregationsfromobjectfieldsutil.getAvailableAggregationsFromObjectFields)([
            fieldMetadata
        ]);
        let result = {};
        for (const [aggregationKey, aggregationDetails] of Object.entries(aggregations)){
            const orderByWithGroupByType = this.typeMapperService.mapToOrderByWithGroupByType(aggregations[aggregationKey].aggregateOperation);
            if (!(0, _utils.isDefined)(orderByWithGroupByType)) {
                const message = `Could not find a GraphQL input type for ${aggregations.type} aggregation`;
                this.logger.error(message, {
                    aggregations
                });
                throw new Error(message);
            }
            result[aggregationKey] = {
                type: orderByWithGroupByType,
                description: aggregationDetails.description
            };
        }
        return result;
    }
    constructor(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, objectMetadataOrderByBaseGenerator, typeMapperService){
        this.gqlTypesStorage = gqlTypesStorage;
        this.relationFieldMetadataGqlInputTypeGenerator = relationFieldMetadataGqlInputTypeGenerator;
        this.objectMetadataOrderByBaseGenerator = objectMetadataOrderByBaseGenerator;
        this.typeMapperService = typeMapperService;
        this.logger = new _common.Logger(ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator.name);
    }
};
ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _relationfieldmetadatagqltypegenerator.RelationFieldMetadataGqlInputTypeGenerator === "undefined" ? Object : _relationfieldmetadatagqltypegenerator.RelationFieldMetadataGqlInputTypeGenerator,
        typeof _objectmetadataorderbybasegenerator.ObjectMetadataOrderByBaseGenerator === "undefined" ? Object : _objectmetadataorderbybasegenerator.ObjectMetadataOrderByBaseGenerator,
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService
    ])
], ObjectMetadataOrderByWithGroupByGqlInputTypeGenerator);

//# sourceMappingURL=object-metadata-order-by-with-group-by-gql-input-type.generator.js.map