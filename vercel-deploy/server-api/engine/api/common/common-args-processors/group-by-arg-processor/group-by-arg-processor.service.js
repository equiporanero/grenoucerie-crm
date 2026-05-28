"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GroupByArgProcessorService", {
    enumerable: true,
    get: function() {
        return GroupByArgProcessorService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _commonqueryrunnerexception = require("../../common-query-runners/errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../../common-query-runners/errors/standard-error-message.constant");
const _validateandtransformgroupbyfieldsorthrowutil = require("./utils/validate-and-transform-group-by-fields-or-throw.util");
const _getavailableaggregationsfromobjectfieldsutil = require("../../../graphql/workspace-schema-builder/utils/get-available-aggregations-from-object-fields.util");
const _findmanyflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps.util");
const _resolveaggregatefieldkeyutil = require("../../../../core-modules/record-crud/utils/resolve-aggregate-field-key.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GroupByArgProcessorService = class GroupByArgProcessorService {
    process({ groupBy }) {
        if (Array.isArray(groupBy)) {
            return groupBy;
        }
        return [
            groupBy
        ];
    }
    validateAndTransformGroupByFieldsOrThrow({ groupBy, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps }) {
        return (0, _validateandtransformgroupbyfieldsorthrowutil.validateAndTransformGroupByFieldsOrThrow)({
            groupBy,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        });
    }
    getAvailableAggregations({ flatObjectMetadata, flatFieldMetadataMaps, restrictedFields }) {
        const objectFields = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
            flatEntityIds: flatObjectMetadata.fieldIds,
            flatEntityMaps: flatFieldMetadataMaps
        }).filter((field)=>restrictedFields?.[field.id]?.canRead !== false);
        return (0, _getavailableaggregationsfromobjectfieldsutil.getAvailableAggregationsFromObjectFields)(objectFields);
    }
    validateAggregateFieldKeysOrThrow({ aggregateFieldKeys, availableAggregations }) {
        const invalidAggregateFieldKeys = aggregateFieldKeys.filter((aggregateFieldKey)=>!(0, _utils.isDefined)(availableAggregations[aggregateFieldKey]));
        if (invalidAggregateFieldKeys.length === 0) {
            return;
        }
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Unknown aggregate field(s): ${invalidAggregateFieldKeys.join(', ')}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    resolveToolAggregateFieldKeyOrThrow({ aggregateOperation, aggregateFieldName, availableAggregations }) {
        if (aggregateOperation === _types.AggregateOperations.COUNT) {
            if (aggregateFieldName) {
                throw new _commonqueryrunnerexception.CommonQueryRunnerException('aggregateFieldName is not supported for COUNT operation', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                    userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
                });
            }
            return 'totalCount';
        }
        if (!aggregateFieldName) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`aggregateFieldName is required for ${aggregateOperation} operation`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        const aggregateFieldKey = (0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)(aggregateOperation, aggregateFieldName, availableAggregations);
        if (!aggregateFieldKey) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`No aggregation available for ${aggregateOperation} on field "${aggregateFieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        return aggregateFieldKey;
    }
};
GroupByArgProcessorService = _ts_decorate([
    (0, _common.Injectable)()
], GroupByArgProcessorService);

//# sourceMappingURL=group-by-arg-processor.service.js.map