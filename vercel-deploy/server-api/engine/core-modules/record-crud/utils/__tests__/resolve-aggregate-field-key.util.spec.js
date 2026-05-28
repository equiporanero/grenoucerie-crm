"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphql = require("graphql");
const _types = require("twenty-shared/types");
const _resolveaggregatefieldkeyutil = require("../resolve-aggregate-field-key.util");
const availableAggregations = {
    totalCount: {
        type: _graphql.GraphQLInt,
        description: 'Total count',
        fromField: '*',
        fromFieldType: _types.FieldMetadataType.UUID,
        aggregateOperation: _types.AggregateOperations.COUNT
    },
    sumEmployees: {
        type: _graphql.GraphQLFloat,
        description: 'Sum of employees',
        fromField: 'employees',
        fromFieldType: _types.FieldMetadataType.NUMBER,
        aggregateOperation: _types.AggregateOperations.SUM
    },
    avgEmployees: {
        type: _graphql.GraphQLFloat,
        description: 'Average of employees',
        fromField: 'employees',
        fromFieldType: _types.FieldMetadataType.NUMBER,
        aggregateOperation: _types.AggregateOperations.AVG
    },
    sumAmountAmountMicros: {
        type: _graphql.GraphQLFloat,
        description: 'Sum of amount',
        fromField: 'amount',
        fromFieldType: _types.FieldMetadataType.CURRENCY,
        fromSubFields: [
            'amountMicros',
            'currencyCode'
        ],
        subFieldForNumericOperation: 'amountMicros',
        aggregateOperation: _types.AggregateOperations.SUM
    },
    avgAmountAmountMicros: {
        type: _graphql.GraphQLFloat,
        description: 'Average of amount',
        fromField: 'amount',
        fromFieldType: _types.FieldMetadataType.CURRENCY,
        fromSubFields: [
            'amountMicros',
            'currencyCode'
        ],
        subFieldForNumericOperation: 'amountMicros',
        aggregateOperation: _types.AggregateOperations.AVG
    }
};
describe('resolveAggregateFieldKey', ()=>{
    it('resolves a simple NUMBER field', ()=>{
        expect((0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)('SUM', 'employees', availableAggregations)).toBe('sumEmployees');
    });
    it('resolves a CURRENCY field with dot notation', ()=>{
        expect((0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)('SUM', 'amount.amountMicros', availableAggregations)).toBe('sumAmountAmountMicros');
    });
    it('resolves a CURRENCY field with just the parent name', ()=>{
        expect((0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)('SUM', 'amount', availableAggregations)).toBe('sumAmountAmountMicros');
    });
    it('rejects an invalid sub-field for a composite type', ()=>{
        expect((0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)('SUM', 'amount.currencyCode', availableAggregations)).toBeNull();
    });
    it('rejects invalid multi-level dot notation', ()=>{
        expect((0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)('SUM', 'amount.amountMicros.extra', availableAggregations)).toBeNull();
    });
    it('returns null for a non-existent field', ()=>{
        expect((0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)('SUM', 'nonExistent', availableAggregations)).toBeNull();
    });
    it('matches the correct operation when multiple exist for the same field', ()=>{
        expect((0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)('AVG', 'employees', availableAggregations)).toBe('avgEmployees');
        expect((0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)('AVG', 'amount.amountMicros', availableAggregations)).toBe('avgAmountAmountMicros');
    });
});

//# sourceMappingURL=resolve-aggregate-field-key.util.spec.js.map