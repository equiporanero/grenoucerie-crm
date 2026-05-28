"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _datefns = require("date-fns");
const _types = require("twenty-shared/types");
const _parseandevaluaterelativedatefilterutil = require("../parse-and-evaluate-relative-date-filter.util");
// TODO: this test should be in twenty-shared, and the logic that is duplicated both front end and back end,
//  should be merged and properly refactored with Temporal to unify and simplify this bug-prone zone of the codebase.
describe('Relative Date Filter Utils', ()=>{
    const now = new Date('2024-01-15T12:00:00Z'); // Monday, January 15, 2024 at noon
    beforeEach(()=>{
        // Mock Date constructor to return a fixed date for consistent testing
        jest.useFakeTimers();
        jest.setSystemTime(now);
    });
    afterEach(()=>{
        jest.useRealTimers();
    });
    describe('parseAndEvaluateRelativeDateFilter', ()=>{
        describe('Edge cases', ()=>{
            it('should handle invalid JSON gracefully', ()=>{
                const invalidJson = 'invalid json';
                expect((0, _parseandevaluaterelativedatefilterutil.parseAndEvaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateString: invalidJson
                })).toBe(false);
            });
            it('should handle missing direction gracefully', ()=>{
                const relativeDateString = JSON.stringify({
                    amount: 1,
                    unit: 'DAY'
                });
                expect((0, _parseandevaluaterelativedatefilterutil.parseAndEvaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateString
                })).toBe(false);
            });
            it('should handle missing unit gracefully', ()=>{
                const relativeDateString = JSON.stringify({
                    direction: 'NEXT',
                    amount: 1
                });
                expect((0, _parseandevaluaterelativedatefilterutil.parseAndEvaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateString
                })).toBe(false);
            });
            it('should handle unknown direction gracefully', ()=>{
                const relativeDateString = JSON.stringify({
                    direction: 'UNKNOWN',
                    amount: 1,
                    unit: 'DAY'
                });
                expect((0, _parseandevaluaterelativedatefilterutil.parseAndEvaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateString
                })).toBe(false);
            });
            it('should handle unknown unit gracefully', ()=>{
                const relativeDateString = JSON.stringify({
                    direction: 'NEXT',
                    amount: 1,
                    unit: 'UNKNOWN'
                });
                expect((0, _parseandevaluaterelativedatefilterutil.parseAndEvaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateString
                })).toBe(false);
            });
        });
    });
    describe('evaluateRelativeDateFilter', ()=>{
        describe('NEXT direction', ()=>{
            it('should return true for dates within the next N seconds', ()=>{
                const relativeDateFilterValue = {
                    direction: 'NEXT',
                    amount: 3,
                    unit: 'SECOND'
                };
                // Dates within the next 3 seconds should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addSeconds)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addSeconds)(now, 2),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addSeconds)(now, 3),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addSeconds)(now, 4),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subSeconds)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the next N minutes', ()=>{
                const relativeDateFilterValue = {
                    direction: 'NEXT',
                    amount: 3,
                    unit: 'MINUTE'
                };
                // Dates within the next 3 minutes should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addMinutes)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addMinutes)(now, 2),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addMinutes)(now, 3),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addMinutes)(now, 4),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMinutes)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the next N hours', ()=>{
                ///
                const relativeDateFilterValue = {
                    direction: 'NEXT',
                    amount: 3,
                    unit: 'HOUR'
                };
                // Dates within the next 3 hours should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addHours)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addHours)(now, 2),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addHours)(now, 3),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addHours)(now, 4),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subHours)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the next N days', ()=>{
                const relativeDateFilterValue = {
                    direction: 'NEXT',
                    amount: 3,
                    unit: 'DAY'
                };
                // Dates within the next 3 days should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 2),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 3),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 4),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the next N weeks', ()=>{
                const relativeDateFilterValue = {
                    direction: 'NEXT',
                    amount: 2,
                    unit: 'WEEK'
                };
                // Dates within the next 2 weeks should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addWeeks)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 10),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addWeeks)(now, 3),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the next N months', ()=>{
                const relativeDateFilterValue = {
                    direction: 'NEXT',
                    amount: 2,
                    unit: 'MONTH'
                };
                // Dates within the next 2 months should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addMonths)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 45),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addMonths)(now, 3),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the next N years', ()=>{
                const relativeDateFilterValue = {
                    direction: 'NEXT',
                    amount: 1,
                    unit: 'YEAR'
                };
                // Dates within the next year should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addMonths)(now, 6),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addMonths)(now, 11),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addYears)(now, 2),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return false when amount is undefined', ()=>{
                const relativeDateFilterValue = {
                    direction: 'NEXT',
                    unit: 'DAY'
                };
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
        });
        describe('PAST direction', ()=>{
            it('should return true for dates within the past N seconds', ()=>{
                const relativeDateFilterValue = {
                    direction: 'PAST',
                    amount: 3,
                    unit: 'SECOND'
                };
                // Dates within the past 3 seconds should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subSeconds)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subSeconds)(now, 2),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subSeconds)(now, 3),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subSeconds)(now, 4),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addSeconds)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the past N minutes', ()=>{
                const relativeDateFilterValue = {
                    direction: 'PAST',
                    amount: 3,
                    unit: 'MINUTE'
                };
                // Dates within the past 3 minutes should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMinutes)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMinutes)(now, 2),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMinutes)(now, 3),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMinutes)(now, 4),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addMinutes)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the past N hours', ()=>{
                const relativeDateFilterValue = {
                    direction: 'PAST',
                    amount: 3,
                    unit: 'HOUR'
                };
                // Dates within the past 3 hours should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subHours)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subHours)(now, 2),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subHours)(now, 3),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subHours)(now, 4),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addHours)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the past N days', ()=>{
                const relativeDateFilterValue = {
                    direction: 'PAST',
                    amount: 3,
                    unit: 'DAY'
                };
                // Dates within the past 3 days should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 2),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 3),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 4),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the past N weeks', ()=>{
                const relativeDateFilterValue = {
                    direction: 'PAST',
                    amount: 2,
                    unit: 'WEEK'
                };
                // Dates within the past 2 weeks should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subWeeks)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 10),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subWeeks)(now, 3),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the past N months', ()=>{
                const relativeDateFilterValue = {
                    direction: 'PAST',
                    amount: 2,
                    unit: 'MONTH'
                };
                // Dates within the past 2 months should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMonths)(now, 1),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 45),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMonths)(now, 3),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within the past N years', ()=>{
                const relativeDateFilterValue = {
                    direction: 'PAST',
                    amount: 1,
                    unit: 'YEAR'
                };
                // Dates within the past year should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMonths)(now, 6),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMonths)(now, 11),
                    relativeDateFilterValue
                })).toBe(true);
                // Dates outside the range should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subYears)(now, 2),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.addDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return false when amount is undefined', ()=>{
                const relativeDateFilterValue = {
                    direction: 'PAST',
                    unit: 'DAY'
                };
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
        });
        describe('THIS direction', ()=>{
            it('should return true for dates within this second', ()=>{
                const relativeDateFilterValue = {
                    direction: 'THIS',
                    unit: 'SECOND'
                };
                // Same second should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateFilterValue
                })).toBe(true);
                // Different seconds should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-15T08:00:00Z'),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subSeconds)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within this minute', ()=>{
                const relativeDateFilterValue = {
                    direction: 'THIS',
                    unit: 'MINUTE'
                };
                // Same minute should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateFilterValue
                })).toBe(true);
                // Different minutes should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-15T08:00:00Z'),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subMinutes)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within this hour', ()=>{
                const relativeDateFilterValue = {
                    direction: 'THIS',
                    unit: 'HOUR'
                };
                // Same hour should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateFilterValue
                })).toBe(true);
                // Different hours should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-15T08:00:00Z'),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subHours)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within this day', ()=>{
                const relativeDateFilterValue = {
                    direction: 'THIS',
                    unit: 'DAY'
                };
                // Same day should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateFilterValue
                })).toBe(true);
                // TODO: this test fails if the exec env is not UTC, should be replaced by Temporal soon
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-15T08:00:00Z'),
                    relativeDateFilterValue
                })).toBe(true);
                // Different days should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: (0, _datefns.subDays)(now, 1),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within this week', ()=>{
                const relativeDateFilterValue = {
                    direction: 'THIS',
                    unit: 'WEEK',
                    firstDayOfTheWeek: _types.FirstDayOfTheWeek.MONDAY
                };
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-16T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-20T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(true);
                // Different weeks should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-13T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-22T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within this month', ()=>{
                const relativeDateFilterValue = {
                    direction: 'THIS',
                    unit: 'MONTH'
                };
                // Same month should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-01T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-31T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(true);
                // Different months should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2023-12-31T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-02-01T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(false);
            });
            it('should return true for dates within this year', ()=>{
                const relativeDateFilterValue = {
                    direction: 'THIS',
                    unit: 'YEAR'
                };
                // Same year should match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: now,
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-01-01T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(true);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2024-12-31T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(true);
                // Different years should not match
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2023-12-31T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(false);
                expect((0, _parseandevaluaterelativedatefilterutil.evaluateRelativeDateFilter)({
                    dateToCheck: new Date('2025-01-01T12:00:00Z'),
                    relativeDateFilterValue
                })).toBe(false);
            });
        });
    });
});

//# sourceMappingURL=evaluate-relative-date-filter.util.spec.js.map