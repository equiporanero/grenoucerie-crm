"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAvailableAggregationsFromObjectFields", {
    enumerable: true,
    get: function() {
        return getAvailableAggregationsFromObjectFields;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphql1 = require("graphql");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _getsubfieldsforaggregateoperationutil = require("../../../../twenty-orm/utils/get-subfields-for-aggregate-operation.util");
const getAvailableAggregationsFromObjectFields = (fields)=>{
    return fields.reduce((acc, field)=>{
        if (field.type === _types.FieldMetadataType.RELATION) {
            return acc;
        }
        const fromSubFields = (0, _getsubfieldsforaggregateoperationutil.getSubfieldsForAggregateOperation)(field.type);
        acc[`countUniqueValues${(0, _utils.capitalize)(field.name)}`] = {
            type: _graphql1.GraphQLInt,
            description: `Number of unique values for ${field.name}`,
            fromField: field.name,
            fromFieldType: field.type,
            fromSubFields,
            aggregateOperation: _types.AggregateOperations.COUNT_UNIQUE_VALUES
        };
        acc[`countEmpty${(0, _utils.capitalize)(field.name)}`] = {
            type: _graphql1.GraphQLInt,
            description: `Number of empty values for ${field.name}`,
            fromField: field.name,
            fromFieldType: field.type,
            fromSubFields,
            aggregateOperation: _types.AggregateOperations.COUNT_EMPTY
        };
        acc[`countNotEmpty${(0, _utils.capitalize)(field.name)}`] = {
            type: _graphql1.GraphQLInt,
            description: `Number of non-empty values for ${field.name}`,
            fromField: field.name,
            fromFieldType: field.type,
            fromSubFields,
            aggregateOperation: _types.AggregateOperations.COUNT_NOT_EMPTY
        };
        acc[`percentageEmpty${(0, _utils.capitalize)(field.name)}`] = {
            type: _graphql1.GraphQLFloat,
            description: `Percentage of empty values for ${field.name}`,
            fromField: field.name,
            fromFieldType: field.type,
            fromSubFields,
            aggregateOperation: _types.AggregateOperations.PERCENTAGE_EMPTY
        };
        acc[`percentageNotEmpty${(0, _utils.capitalize)(field.name)}`] = {
            type: _graphql1.GraphQLFloat,
            description: `Percentage of non-empty values for ${field.name}`,
            fromField: field.name,
            fromFieldType: field.type,
            fromSubFields,
            aggregateOperation: _types.AggregateOperations.PERCENTAGE_NOT_EMPTY
        };
        if ((0, _utils.isFieldMetadataDateKind)(field.type)) {
            acc[`min${(0, _utils.capitalize)(field.name)}`] = {
                type: _graphql.GraphQLISODateTime,
                description: `Earliest date contained in the field ${field.name}`,
                fromField: field.name,
                fromFieldType: field.type,
                aggregateOperation: _types.AggregateOperations.MIN
            };
            acc[`max${(0, _utils.capitalize)(field.name)}`] = {
                type: _graphql.GraphQLISODateTime,
                description: `Latest date contained in the field ${field.name}`,
                fromField: field.name,
                fromFieldType: field.type,
                aggregateOperation: _types.AggregateOperations.MAX
            };
        }
        switch(field.type){
            case _types.FieldMetadataType.BOOLEAN:
                acc[`countTrue${(0, _utils.capitalize)(field.name)}`] = {
                    type: _graphql1.GraphQLInt,
                    description: `Count of true values in the field ${field.name}`,
                    fromField: field.name,
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.COUNT_TRUE
                };
                acc[`countFalse${(0, _utils.capitalize)(field.name)}`] = {
                    type: _graphql1.GraphQLInt,
                    description: `Count of false values in the field ${field.name}`,
                    fromField: field.name,
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.COUNT_FALSE
                };
                break;
            case _types.FieldMetadataType.NUMBER:
                acc[`min${(0, _utils.capitalize)(field.name)}`] = {
                    type: _graphql1.GraphQLFloat,
                    description: `Minimum amount contained in the field ${field.name}`,
                    fromField: field.name,
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.MIN
                };
                acc[`max${(0, _utils.capitalize)(field.name)}`] = {
                    type: _graphql1.GraphQLFloat,
                    description: `Maximum amount contained in the field ${field.name}`,
                    fromField: field.name,
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.MAX
                };
                acc[`avg${(0, _utils.capitalize)(field.name)}`] = {
                    type: _graphql1.GraphQLFloat,
                    description: `Average amount contained in the field ${field.name}`,
                    fromField: field.name,
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.AVG
                };
                acc[`sum${(0, _utils.capitalize)(field.name)}`] = {
                    type: _graphql1.GraphQLFloat,
                    description: `Sum of amounts contained in the field ${field.name}`,
                    fromField: field.name,
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.SUM
                };
                break;
            case _types.FieldMetadataType.CURRENCY:
                acc[`min${(0, _utils.capitalize)(field.name)}AmountMicros`] = {
                    type: _graphql1.GraphQLFloat,
                    description: `Minimum amount contained in the field ${field.name}`,
                    fromField: field.name,
                    fromSubFields: (0, _getsubfieldsforaggregateoperationutil.getSubfieldsForAggregateOperation)(field.type),
                    subFieldForNumericOperation: 'amountMicros',
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.MIN
                };
                acc[`max${(0, _utils.capitalize)(field.name)}AmountMicros`] = {
                    type: _graphql1.GraphQLFloat,
                    description: `Maximal amount contained in the field ${field.name}`,
                    fromField: field.name,
                    fromSubFields: (0, _getsubfieldsforaggregateoperationutil.getSubfieldsForAggregateOperation)(field.type),
                    subFieldForNumericOperation: 'amountMicros',
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.MAX
                };
                acc[`sum${(0, _utils.capitalize)(field.name)}AmountMicros`] = {
                    type: _graphql1.GraphQLFloat,
                    description: `Sum of amounts contained in the field ${field.name}`,
                    fromField: field.name,
                    fromSubFields: (0, _getsubfieldsforaggregateoperationutil.getSubfieldsForAggregateOperation)(field.type),
                    subFieldForNumericOperation: 'amountMicros',
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.SUM
                };
                acc[`avg${(0, _utils.capitalize)(field.name)}AmountMicros`] = {
                    type: _graphql1.GraphQLFloat,
                    description: `Average amount contained in the field ${field.name}`,
                    fromField: field.name,
                    fromSubFields: (0, _getsubfieldsforaggregateoperationutil.getSubfieldsForAggregateOperation)(field.type),
                    subFieldForNumericOperation: 'amountMicros',
                    fromFieldType: field.type,
                    aggregateOperation: _types.AggregateOperations.AVG
                };
                break;
        }
        return acc;
    }, {
        totalCount: {
            type: _graphql1.GraphQLInt,
            description: `Total number of records in the connection`,
            fromField: _constants.FIELD_FOR_TOTAL_COUNT_AGGREGATE_OPERATION,
            fromFieldType: _types.FieldMetadataType.UUID,
            aggregateOperation: _types.AggregateOperations.COUNT
        }
    });
};

//# sourceMappingURL=get-available-aggregations-from-object-fields.util.js.map