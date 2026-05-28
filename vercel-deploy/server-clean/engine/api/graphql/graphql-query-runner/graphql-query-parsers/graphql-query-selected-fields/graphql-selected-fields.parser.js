"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlQuerySelectedFieldsParser", {
    enumerable: true,
    get: function() {
        return GraphqlQuerySelectedFieldsParser;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../../metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _graphqlselectedfieldsaggregateparser = require("./graphql-selected-fields-aggregate.parser");
const _graphqlselectedfieldsrelationparser = require("./graphql-selected-fields-relation.parser");
const _iscompositefieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _isflatfieldmetadataoftypeutil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
let GraphqlQuerySelectedFieldsParser = class GraphqlQuerySelectedFieldsParser {
    parse(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    graphqlSelectedFields, flatObjectMetadata, isFromOneToManyRelation) {
        const accumulator = {
            select: {},
            relations: {},
            aggregate: {},
            relationFieldsCount: 0,
            hasAtLeastTwoNestedOneToManyRelations: false
        };
        if (this.isRootConnection(graphqlSelectedFields)) {
            this.parseConnectionField(graphqlSelectedFields, flatObjectMetadata, accumulator, isFromOneToManyRelation);
            return accumulator;
        }
        this.aggregateParser.parse(graphqlSelectedFields, flatObjectMetadata, this.flatFieldMetadataMaps, accumulator);
        this.parseRecordFields(graphqlSelectedFields, flatObjectMetadata, accumulator, isFromOneToManyRelation);
        return accumulator;
    }
    parseRecordFields(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    graphqlSelectedFields, flatObjectMetadata, accumulator, isFromOneToManyRelation) {
        for (const fieldMetadataId of flatObjectMetadata.fieldIds){
            const fieldMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
                flatEntityId: fieldMetadataId,
                flatEntityMaps: this.flatFieldMetadataMaps
            });
            if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(fieldMetadata, _types.FieldMetadataType.RELATION)) {
                const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                    name: fieldMetadata.name
                });
                if ((0, _utils.isDefined)(graphqlSelectedFields[joinColumnName])) {
                    accumulator.select[joinColumnName] = true;
                }
                const graphqlSelectedFieldValue = graphqlSelectedFields[fieldMetadata.name];
                if (!(0, _utils.isDefined)(graphqlSelectedFieldValue)) {
                    continue;
                }
                this.graphqlQuerySelectedFieldsRelationParser.parseRelationField(fieldMetadata, fieldMetadata.name, graphqlSelectedFieldValue, accumulator, isFromOneToManyRelation);
                continue;
            }
            if ((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(fieldMetadata, _types.FieldMetadataType.MORPH_RELATION)) {
                const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                    flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
                    flatEntityMaps: this.flatObjectMetadataMaps
                });
                if (!fieldMetadata.settings?.relationType || !(0, _utils.isDefined)(targetObjectMetadata)) {
                    continue;
                }
                const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
                    name: fieldMetadata.name
                });
                if ((0, _utils.isDefined)(graphqlSelectedFields[joinColumnName])) {
                    accumulator.select[joinColumnName] = true;
                }
                const graphqlSelectedFieldValue = graphqlSelectedFields[fieldMetadata.name];
                if (!(0, _utils.isDefined)(graphqlSelectedFieldValue)) {
                    continue;
                }
                this.graphqlQuerySelectedFieldsRelationParser.parseRelationField(fieldMetadata, fieldMetadata.name, graphqlSelectedFieldValue, accumulator, isFromOneToManyRelation);
                continue;
            }
            if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
                const graphqlSelectedFieldValue = graphqlSelectedFields[fieldMetadata.name];
                if (!(0, _utils.isDefined)(graphqlSelectedFieldValue)) {
                    continue;
                }
                const compositeResult = this.parseCompositeField(fieldMetadata, graphqlSelectedFieldValue);
                Object.assign(accumulator.select, compositeResult);
                continue;
            }
            const graphqlSelectedFieldValue = graphqlSelectedFields[fieldMetadata.name];
            if ((0, _utils.isDefined)(graphqlSelectedFieldValue)) {
                accumulator.select[fieldMetadata.name] = true;
            }
        }
    }
    parseConnectionField(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    graphqlSelectedFields, flatObjectMetadata, accumulator, isFromOneToManyRelation) {
        this.aggregateParser.parse(graphqlSelectedFields, flatObjectMetadata, this.flatFieldMetadataMaps, accumulator);
        const node = graphqlSelectedFields.edges.node;
        this.parseRecordFields(node, flatObjectMetadata, accumulator, isFromOneToManyRelation);
    }
    isRootConnection(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    graphqlSelectedFields) {
        return Object.keys(graphqlSelectedFields).includes('edges');
    }
    parseCompositeField(fieldMetadata, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    fieldValue) {
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
        if (!compositeType) {
            throw new Error(`Composite type definition not found for type: ${fieldMetadata.type}`);
        }
        return Object.keys(fieldValue).filter((subFieldKey)=>subFieldKey !== '__typename').reduce((acc, subFieldKey)=>{
            const subFieldMetadata = compositeType.properties.find((property)=>property.name === subFieldKey);
            if (!subFieldMetadata) {
                throw new Error(`Sub field metadata not found for composite type: ${fieldMetadata.type}`);
            }
            const fullFieldName = `${fieldMetadata.name}${(0, _utils.capitalize)(subFieldKey)}`;
            acc[fullFieldName] = true;
            return acc;
        }, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        {});
    }
    constructor(flatObjectMetadataMaps, flatFieldMetadataMaps){
        this.flatObjectMetadataMaps = flatObjectMetadataMaps;
        this.flatFieldMetadataMaps = flatFieldMetadataMaps;
        this.graphqlQuerySelectedFieldsRelationParser = new _graphqlselectedfieldsrelationparser.GraphqlQuerySelectedFieldsRelationParser(flatObjectMetadataMaps, flatFieldMetadataMaps);
        this.aggregateParser = new _graphqlselectedfieldsaggregateparser.GraphqlQuerySelectedFieldsAggregateParser();
    }
};

//# sourceMappingURL=graphql-selected-fields.parser.js.map