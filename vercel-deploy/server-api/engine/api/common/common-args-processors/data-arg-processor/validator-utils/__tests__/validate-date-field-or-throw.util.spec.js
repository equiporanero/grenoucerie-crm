"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatedatefieldorthrowutil = require("../validate-date-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateDateFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return the value when it is a valid ISO date string (YYYY-MM-DD)', ()=>{
            const dateString = '2024-01-15';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid ISO compact date string (YYYYMMDD)', ()=>{
            const dateString = '20240115';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid date with dots (YYYY.MM.DD)', ()=>{
            const dateString = '2024.01.15';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid date with slashes (YYYY/MM/DD)', ()=>{
            const dateString = '2024/01/15';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid date in MM-DD-YYYY format', ()=>{
            const dateString = '01-15-2024';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid date in MM/DD/YYYY format', ()=>{
            const dateString = '01/15/2024';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid date with full month name (MMMM d, yyyy)', ()=>{
            const dateString = 'January 15, 2024';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid date with abbreviated month name (MMM d, yyyy)', ()=>{
            const dateString = 'Jan 15, 2024';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid date in d MMMM yyyy format', ()=>{
            const dateString = '15 January 2024';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid date in d MMM yyyy format', ()=>{
            const dateString = '15 Jan 2024';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid ISO datetime string (time will be ignored by PostgreSQL)', ()=>{
            const datetimeString = '2024-01-15T10:30:00Z';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid datetime with milliseconds', ()=>{
            const datetimeString = '2024-01-15T10:30:00.000Z';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid datetime without timezone', ()=>{
            const datetimeString = '2024-01-15T10:30:00';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid datetime with space separator', ()=>{
            const datetimeString = '2024-01-15 10:30:00';
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a Date object', ()=>{
            const dateObject = new Date('2024-01-15');
            const result = (0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(dateObject, 'testField');
            expect(result).toBe(dateObject);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is just a year', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)('2024', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is year and month only', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)('2024-01', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an invalid date string', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)('invalid-date', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an empty string', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)('', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a boolean', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(true, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an array', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)([], 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an object', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)({}, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(undefined, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a number (timestamp)', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)(1234567890, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a random string', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)('hello world', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a date with invalid month', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)('2024-13-01', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a date with invalid day', ()=>{
            expect(()=>(0, _validatedatefieldorthrowutil.validateDateFieldOrThrow)('2024-02-31', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-date-field-or-throw.util.spec.js.map