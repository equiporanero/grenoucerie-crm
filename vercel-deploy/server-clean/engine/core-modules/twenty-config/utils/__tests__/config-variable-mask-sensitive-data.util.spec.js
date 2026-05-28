"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _configvariablesmaskingstrategiesenum = require("../../enums/config-variables-masking-strategies.enum");
const _configvariablemasksensitivedatautil = require("../config-variable-mask-sensitive-data.util");
describe('configVariableMaskSensitiveData', ()=>{
    describe('LAST_N_CHARS strategy', ()=>{
        it('should mask all but the last 5 characters by default', ()=>{
            const result = (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)('mysecretvalue123', _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS);
            expect(result).toBe('********ue123');
        });
        it('should mask all but the specified number of characters', ()=>{
            const result = (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)('mysecretvalue123', _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS, {
                chars: 3
            });
            expect(result).toBe('********123');
        });
        it('should return all asterisks if value is shorter than mask length', ()=>{
            const result = (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)('123', _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS, {
                chars: 5
            });
            expect(result).toBe('********');
        });
        it('should handle empty string', ()=>{
            const result = (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)('', _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS);
            expect(result).toBe('');
        });
    });
    describe('HIDE_PASSWORD strategy', ()=>{
        it('should mask password in URL', ()=>{
            const result = (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)('postgresql://user:password123@localhost:5432/db', _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.HIDE_PASSWORD);
            expect(result).toBe('postgresql://********:********@localhost:5432/db');
        });
        it('should handle URL without password', ()=>{
            const result = (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)('postgresql://localhost:5432/db', _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.HIDE_PASSWORD);
            expect(result).toBe('postgresql://localhost:5432/db');
        });
        it('should throw error for invalid URLs', ()=>{
            expect(()=>(0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)('not-a-url', _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.HIDE_PASSWORD, {
                    variableName: 'TEST_URL'
                })).toThrow('Invalid URL format for TEST_URL in HIDE_PASSWORD masking strategy');
        });
    });
    describe('edge cases', ()=>{
        it('should handle null value', ()=>{
            const result = (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)(null, _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS);
            expect(result).toBeNull();
        });
        it('should handle undefined value', ()=>{
            const result = (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)(undefined, _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS);
            expect(result).toBeUndefined();
        });
        it('should handle non-string value', ()=>{
            const result = (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)(123, _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS);
            expect(result).toBe(123);
        });
    });
});

//# sourceMappingURL=config-variable-mask-sensitive-data.util.spec.js.map