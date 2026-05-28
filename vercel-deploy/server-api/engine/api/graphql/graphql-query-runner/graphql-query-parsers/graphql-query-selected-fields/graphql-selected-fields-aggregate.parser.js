"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlQuerySelectedFieldsAggregateParser", {
    enumerable: true,
    get: function() {
        return GraphqlQuerySelectedFieldsAggregateParser;
    }
});
const _utils = require("twenty-shared/utils");
const _getavailableaggregationsfromobjectfieldsutil = require("../../../workspace-schema-builder/utils/get-available-aggregations-from-object-fields.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
let GraphqlQuerySelectedFieldsAggregateParser = class GraphqlQuerySelectedFieldsAggregateParser {
    parse(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    graphqlSelectedFields, flatObjectMetadata, flatFieldMetadataMaps, accumulator) {
        const fields = flatObjectMetadata.fieldIds.map((id)=>(0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: id,
                flatEntityMaps: flatFieldMetadataMaps
            })).filter(_utils.isDefined);
        const availableAggregations = (0, _getavailableaggregationsfromobjectfieldsutil.getAvailableAggregationsFromObjectFields)(fields);
        for (const selectedField of Object.keys(graphqlSelectedFields)){
            const selectedAggregation = availableAggregations[selectedField];
            if (!selectedAggregation) {
                continue;
            }
            accumulator.aggregate[selectedField] = selectedAggregation;
        }
    }
};

//# sourceMappingURL=graphql-selected-fields-aggregate.parser.js.map