"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _temporalpolyfill = require("temporal-polyfill");
const _types = require("twenty-shared/types");
const _barchartmaximumnumberofbarsconstant = require("../../constants/bar-chart-maximum-number-of-bars.constant");
const _generatedategroupsinrangeutil = require("../generate-date-groups-in-range.util");
describe('generateDateGroupsInRange', ()=>{
    describe('DAY granularity', ()=>{
        it('should generate daily dates in range', ()=>{
            const result = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
                startDate: _temporalpolyfill.Temporal.PlainDate.from('2024-01-01'),
                endDate: _temporalpolyfill.Temporal.PlainDate.from('2024-01-05'),
                granularity: _types.ObjectRecordGroupByDateGranularity.DAY
            });
            expect(result.dates).toHaveLength(5);
            expect(result.wasTruncated).toBe(false);
            expect(result.dates[0].toString()).toBe('2024-01-01');
            expect(result.dates[4].toString()).toBe('2024-01-05');
        });
        it('should return single date when start equals end', ()=>{
            const result = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
                startDate: _temporalpolyfill.Temporal.PlainDate.from('2024-01-01'),
                endDate: _temporalpolyfill.Temporal.PlainDate.from('2024-01-01'),
                granularity: _types.ObjectRecordGroupByDateGranularity.DAY
            });
            expect(result.dates).toHaveLength(1);
            expect(result.wasTruncated).toBe(false);
            expect(result.dates[0].toString()).toBe('2024-01-01');
        });
    });
    describe('WEEK granularity', ()=>{
        it('should generate weekly dates in range', ()=>{
            const result = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
                startDate: _temporalpolyfill.Temporal.PlainDate.from('2024-01-01'),
                endDate: _temporalpolyfill.Temporal.PlainDate.from('2024-01-29'),
                granularity: _types.ObjectRecordGroupByDateGranularity.WEEK
            });
            expect(result.dates).toHaveLength(5);
            expect(result.wasTruncated).toBe(false);
            expect(result.dates[0].toString()).toBe('2024-01-01');
            expect(result.dates[1].toString()).toBe('2024-01-08');
            expect(result.dates[2].toString()).toBe('2024-01-15');
            expect(result.dates[3].toString()).toBe('2024-01-22');
            expect(result.dates[4].toString()).toBe('2024-01-29');
        });
    });
    describe('MONTH granularity', ()=>{
        it('should generate monthly dates in range', ()=>{
            const result = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
                startDate: _temporalpolyfill.Temporal.PlainDate.from('2024-01-01'),
                endDate: _temporalpolyfill.Temporal.PlainDate.from('2024-04-01'),
                granularity: _types.ObjectRecordGroupByDateGranularity.MONTH
            });
            expect(result.dates).toHaveLength(4);
            expect(result.wasTruncated).toBe(false);
            expect(result.dates[0].toString()).toBe('2024-01-01');
            expect(result.dates[1].toString()).toBe('2024-02-01');
            expect(result.dates[2].toString()).toBe('2024-03-01');
            expect(result.dates[3].toString()).toBe('2024-04-01');
        });
        it('should handle year boundaries', ()=>{
            const result = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
                startDate: _temporalpolyfill.Temporal.PlainDate.from('2023-11-01'),
                endDate: _temporalpolyfill.Temporal.PlainDate.from('2024-02-01'),
                granularity: _types.ObjectRecordGroupByDateGranularity.MONTH
            });
            expect(result.dates).toHaveLength(4);
            expect(result.dates[0].toString()).toBe('2023-11-01');
            expect(result.dates[1].toString()).toBe('2023-12-01');
            expect(result.dates[2].toString()).toBe('2024-01-01');
            expect(result.dates[3].toString()).toBe('2024-02-01');
        });
    });
    describe('QUARTER granularity', ()=>{
        it('should generate quarterly dates in range', ()=>{
            const result = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
                startDate: _temporalpolyfill.Temporal.PlainDate.from('2024-01-01'),
                endDate: _temporalpolyfill.Temporal.PlainDate.from('2024-10-01'),
                granularity: _types.ObjectRecordGroupByDateGranularity.QUARTER
            });
            expect(result.dates).toHaveLength(4);
            expect(result.wasTruncated).toBe(false);
            expect(result.dates[0].toString()).toBe('2024-01-01');
            expect(result.dates[1].toString()).toBe('2024-04-01');
            expect(result.dates[2].toString()).toBe('2024-07-01');
            expect(result.dates[3].toString()).toBe('2024-10-01');
        });
    });
    describe('YEAR granularity', ()=>{
        it('should generate yearly dates in range', ()=>{
            const result = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
                startDate: _temporalpolyfill.Temporal.PlainDate.from('2020-01-01'),
                endDate: _temporalpolyfill.Temporal.PlainDate.from('2024-01-01'),
                granularity: _types.ObjectRecordGroupByDateGranularity.YEAR
            });
            expect(result.dates).toHaveLength(5);
            expect(result.wasTruncated).toBe(false);
            expect(result.dates[0].toString()).toBe('2020-01-01');
            expect(result.dates[1].toString()).toBe('2021-01-01');
            expect(result.dates[2].toString()).toBe('2022-01-01');
            expect(result.dates[3].toString()).toBe('2023-01-01');
            expect(result.dates[4].toString()).toBe('2024-01-01');
        });
    });
    describe('truncation', ()=>{
        it('should truncate when exceeding maximum number of bars', ()=>{
            const startDate = _temporalpolyfill.Temporal.PlainDate.from('2020-01-01');
            const endDate = startDate.add({
                days: _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS + 50
            });
            const result = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
                startDate,
                endDate,
                granularity: _types.ObjectRecordGroupByDateGranularity.DAY
            });
            expect(result.dates).toHaveLength(_barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS);
            expect(result.wasTruncated).toBe(true);
        });
        it('should not truncate when exactly at maximum', ()=>{
            const startDate = _temporalpolyfill.Temporal.PlainDate.from('2020-01-01');
            const endDate = startDate.add({
                days: _barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS - 1
            });
            const result = (0, _generatedategroupsinrangeutil.generateDateGroupsInRange)({
                startDate,
                endDate,
                granularity: _types.ObjectRecordGroupByDateGranularity.DAY
            });
            expect(result.dates).toHaveLength(_barchartmaximumnumberofbarsconstant.BAR_CHART_MAXIMUM_NUMBER_OF_BARS);
            expect(result.wasTruncated).toBe(false);
        });
    });
});

//# sourceMappingURL=generate-date-groups-in-range.util.spec.js.map