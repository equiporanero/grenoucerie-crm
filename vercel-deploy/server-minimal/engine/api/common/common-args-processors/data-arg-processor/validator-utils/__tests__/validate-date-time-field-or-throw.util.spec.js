"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _validatedatetimefieldorthrowutil = require("../validate-date-time-field-or-throw.util");
const _commonqueryrunnerexception = require("../../../../common-query-runners/errors/common-query-runner.exception");
describe('validateDateTimeFieldOrThrow', ()=>{
    describe('valid inputs', ()=>{
        it('should return null when value is null', ()=>{
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(null, 'testField');
            expect(result).toBeNull();
        });
        it('should return the value when it is a valid ISO datetime string with Z timezone', ()=>{
            const datetimeString = '2024-01-15T10:30:00Z';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid ISO datetime string with milliseconds and Z timezone', ()=>{
            const datetimeString = '2024-01-15T10:30:00.000Z';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid ISO datetime string with timezone offset', ()=>{
            const datetimeString = '2024-01-15T10:30:00+02:00';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid ISO datetime string with milliseconds and timezone offset', ()=>{
            const datetimeString = '2024-01-15T10:30:00.000+02:00';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid ISO datetime string without timezone', ()=>{
            const datetimeString = '2024-01-15T10:30:00';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid ISO datetime string with milliseconds without timezone', ()=>{
            const datetimeString = '2024-01-15T10:30:00.000';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid datetime with space separator', ()=>{
            const datetimeString = '2024-01-15 10:30:00';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid datetime with space separator and milliseconds', ()=>{
            const datetimeString = '2024-01-15 10:30:00.000';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid datetime with space separator without seconds', ()=>{
            const datetimeString = '2024-01-15 10:30';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(datetimeString, 'testField');
            expect(result).toBe(datetimeString);
        });
        it('should return the value when it is a valid ISO date string (will be treated as midnight)', ()=>{
            const dateString = '2024-01-15';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid ISO compact date string', ()=>{
            const dateString = '20240115';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a valid date with full month name', ()=>{
            const dateString = 'January 15, 2024';
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(dateString, 'testField');
            expect(result).toBe(dateString);
        });
        it('should return the value when it is a Date object', ()=>{
            const dateObject = new Date('2024-01-15T10:30:00Z');
            const result = (0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(dateObject, 'testField');
            expect(result).toBe(dateObject);
        });
    });
    describe('invalid inputs', ()=>{
        it('should throw when value is just a year', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)('2024', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is year and month only', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)('2024-01', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an invalid datetime string', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)('invalid-datetime', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an empty string', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)('', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a boolean', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(true, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an array', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)([], 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is an object', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)({}, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is undefined', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(undefined, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a number (timestamp)', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)(1234567890, 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a random string', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)('hello world', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a datetime with invalid month', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)('2024-13-01T10:30:00Z', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a datetime with invalid day', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)('2024-02-31T10:30:00Z', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a datetime with invalid hour', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)('2024-01-15T25:30:00Z', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
        it('should throw when value is a datetime with invalid minute', ()=>{
            expect(()=>(0, _validatedatetimefieldorthrowutil.validateDateTimeFieldOrThrow)('2024-01-15T10:60:00Z', 'testField')).toThrow(_commonqueryrunnerexception.CommonQueryRunnerException);
        });
    });
});

//# sourceMappingURL=validate-date-time-field-or-throw.util.spec.js.map