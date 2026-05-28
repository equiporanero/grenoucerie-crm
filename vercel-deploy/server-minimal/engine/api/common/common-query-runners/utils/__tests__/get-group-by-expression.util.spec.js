"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _getgroupbyexpressionutil = require("../get-group-by-expression.util");
const buildDateTimeFieldMetadata = ()=>{
    return {
        type: _types.FieldMetadataType.DATE_TIME,
        name: 'createdAt'
    };
};
const buildGroupByDateField = (overrides = {})=>({
        fieldMetadata: buildDateTimeFieldMetadata(),
        dateGranularity: _types.ObjectRecordGroupByDateGranularity.DAY,
        timeZone: 'America/New_York',
        ...overrides
    });
const buildGroupByRegularField = (overrides = {})=>({
        fieldMetadata: {
            type: _types.FieldMetadataType.MULTI_SELECT,
            name: 'tags'
        },
        ...overrides
    });
describe('getGroupByExpression', ()=>{
    const columnNameWithQuotes = '"company"."createdAt"';
    describe('timezone validation', ()=>{
        it('should accept valid IANA timezones', ()=>{
            const groupByField = buildGroupByDateField({
                timeZone: 'America/New_York'
            });
            const result = (0, _getgroupbyexpressionutil.getGroupByExpression)({
                groupByField,
                columnNameWithQuotes
            });
            expect(result).toContain("'America/New_York'");
        });
        it('should accept UTC timezone', ()=>{
            const groupByField = buildGroupByDateField({
                timeZone: 'UTC'
            });
            const result = (0, _getgroupbyexpressionutil.getGroupByExpression)({
                groupByField,
                columnNameWithQuotes
            });
            expect(result).toContain("'UTC'");
        });
        it('should reject SQL injection in timezone field', ()=>{
            const groupByField = buildGroupByDateField({
                timeZone: "UTC'; DROP TABLE users; --"
            });
            expect(()=>(0, _getgroupbyexpressionutil.getGroupByExpression)({
                    groupByField,
                    columnNameWithQuotes
                })).toThrow();
        });
        it('should reject UNION-based injection in timezone', ()=>{
            const groupByField = buildGroupByDateField({
                timeZone: "UTC') UNION SELECT * FROM pg_shadow --"
            });
            expect(()=>(0, _getgroupbyexpressionutil.getGroupByExpression)({
                    groupByField,
                    columnNameWithQuotes
                })).toThrow();
        });
        it('should reject arbitrary strings as timezone', ()=>{
            const groupByField = buildGroupByDateField({
                timeZone: 'not_a_real_timezone'
            });
            expect(()=>(0, _getgroupbyexpressionutil.getGroupByExpression)({
                    groupByField,
                    columnNameWithQuotes
                })).toThrow();
        });
    });
    describe('missing timezone handling', ()=>{
        it('should throw when timezone is required but not provided', ()=>{
            const groupByField = buildGroupByDateField({
                timeZone: undefined
            });
            expect(()=>(0, _getgroupbyexpressionutil.getGroupByExpression)({
                    groupByField,
                    columnNameWithQuotes
                })).toThrow('Time zone should be specified for a group by date on Day, Week, Month, Quarter or Year');
        });
    });
    describe('granularity without timezone', ()=>{
        it('should return column directly for NONE granularity', ()=>{
            const groupByField = buildGroupByDateField({
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.NONE,
                timeZone: undefined
            });
            const result = (0, _getgroupbyexpressionutil.getGroupByExpression)({
                groupByField,
                columnNameWithQuotes
            });
            expect(result).toBe(columnNameWithQuotes);
        });
        it('should handle DAY_OF_THE_WEEK without timezone', ()=>{
            const groupByField = buildGroupByDateField({
                dateGranularity: _types.ObjectRecordGroupByDateGranularity.DAY_OF_THE_WEEK,
                timeZone: undefined
            });
            const result = (0, _getgroupbyexpressionutil.getGroupByExpression)({
                groupByField,
                columnNameWithQuotes
            });
            expect(result).toContain('TMDay');
            expect(result).not.toContain('AT TIME ZONE');
        });
    });
    describe('array unnest handling', ()=>{
        const arrayColumnNameWithQuotes = '"company"."tags"';
        it('should unnest array fields when split mode is enabled', ()=>{
            const groupByField = buildGroupByRegularField({
                shouldUnnest: true
            });
            const result = (0, _getgroupbyexpressionutil.getGroupByExpression)({
                groupByField,
                columnNameWithQuotes: arrayColumnNameWithQuotes
            });
            expect(result).toBe(`UNNEST(CASE WHEN CARDINALITY(${arrayColumnNameWithQuotes}) > 0 THEN ${arrayColumnNameWithQuotes} ELSE ARRAY[${arrayColumnNameWithQuotes}[1]] END)`);
        });
        it('should keep plain column expression when split mode is disabled', ()=>{
            const groupByField = buildGroupByRegularField({
                shouldUnnest: false
            });
            const result = (0, _getgroupbyexpressionutil.getGroupByExpression)({
                groupByField,
                columnNameWithQuotes: arrayColumnNameWithQuotes
            });
            expect(result).toBe(arrayColumnNameWithQuotes);
        });
    });
});

//# sourceMappingURL=get-group-by-expression.util.spec.js.map