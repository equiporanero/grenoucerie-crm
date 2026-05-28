"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlQuerySelectedFieldsRelationParser", {
    enumerable: true,
    get: function() {
        return GraphqlQuerySelectedFieldsRelationParser;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _graphqlselectedfieldsparser = require("./graphql-selected-fields.parser");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
let GraphqlQuerySelectedFieldsRelationParser = class GraphqlQuerySelectedFieldsRelationParser {
    parseRelationField(fieldMetadata, fieldKey, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    fieldValue, accumulator, isFromOneToManyRelation) {
        if (!fieldValue || typeof fieldValue !== 'object') {
            return;
        }
        const isOneToManyRelation = fieldMetadata.settings?.relationType === _types.RelationType.ONE_TO_MANY;
        if (isFromOneToManyRelation && isOneToManyRelation) {
            accumulator.hasAtLeastTwoNestedOneToManyRelations = true;
        }
        accumulator.relations[fieldKey] = true;
        if (!(0, _utils.isDefined)(fieldMetadata.relationTargetObjectMetadataId)) {
            throw new Error(`Relation target object metadata id not found for field ${fieldMetadata.name}`);
        }
        const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
            flatEntityMaps: this.flatObjectMetadataMaps
        });
        const fieldParser = new _graphqlselectedfieldsparser.GraphqlQuerySelectedFieldsParser(this.flatObjectMetadataMaps, this.flatFieldMetadataMaps);
        const relationAccumulator = fieldParser.parse(fieldValue, targetObjectMetadata, isFromOneToManyRelation || isOneToManyRelation);
        accumulator.select[fieldKey] = {
            id: true,
            ...relationAccumulator.select
        };
        accumulator.relations[fieldKey] = relationAccumulator.relations;
        accumulator.aggregate[fieldKey] = relationAccumulator.aggregate;
        accumulator.relationFieldsCount = accumulator.relationFieldsCount + relationAccumulator.relationFieldsCount + 1;
        accumulator.hasAtLeastTwoNestedOneToManyRelations = accumulator.hasAtLeastTwoNestedOneToManyRelations || relationAccumulator.hasAtLeastTwoNestedOneToManyRelations;
    }
    constructor(flatObjectMetadataMaps, flatFieldMetadataMaps){
        this.flatObjectMetadataMaps = flatObjectMetadataMaps;
        this.flatFieldMetadataMaps = flatFieldMetadataMaps;
    }
};

//# sourceMappingURL=graphql-selected-fields-relation.parser.js.map