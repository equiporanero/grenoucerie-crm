"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _configvariablesinstancetokensconstants = require("../../constants/config-variables-instance-tokens.constants");
const _configvalueconverterservice = require("../config-value-converter.service");
const _configvariabletypeenum = require("../../enums/config-variable-type.enum");
const _configvariablesgroupenum = require("../../enums/config-variables-group.enum");
const _typetransformersregistry = /*#__PURE__*/ _interop_require_wildcard(require("../../utils/type-transformers.registry"));
const _typedreflect = require("../../../../../utils/typed-reflect");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
jest.mock('src/engine/core-modules/twenty-config/utils/type-transformers.registry', ()=>{
    const createMockTransformer = ()=>({
            toApp: jest.fn().mockImplementation((value)=>value),
            toStorage: jest.fn().mockImplementation((value)=>value),
            getValidators: jest.fn().mockReturnValue([]),
            getTransformers: jest.fn().mockReturnValue([])
        });
    const mockRegistry = {
        boolean: createMockTransformer(),
        number: createMockTransformer(),
        string: createMockTransformer(),
        array: createMockTransformer(),
        enum: createMockTransformer(),
        json: createMockTransformer()
    };
    return {
        typeTransformers: mockRegistry
    };
});
const typeTransformers = _typetransformersregistry.typeTransformers;
describe('ConfigValueConverterService', ()=>{
    let service;
    beforeEach(async ()=>{
        jest.clearAllMocks();
        Object.values(typeTransformers).forEach((transformer)=>{
            transformer.toApp.mockImplementation((value)=>value);
            transformer.toStorage.mockImplementation((value)=>value);
        });
        const mockConfigVariables = {
            CACHE_STORAGE_TTL: 3600 * 24 * 7
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _configvalueconverterservice.ConfigValueConverterService,
                {
                    provide: _configvariablesinstancetokensconstants.CONFIG_VARIABLES_INSTANCE_TOKEN,
                    useValue: mockConfigVariables
                }
            ]
        }).compile();
        service = module.get(_configvalueconverterservice.ConfigValueConverterService);
    });
    describe('convertDbValueToAppValue', ()=>{
        it('should use boolean transformer for boolean type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                AUTH_PASSWORD_ENABLED: {
                    type: _configvariabletypeenum.ConfigVariableType.BOOLEAN,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.ADVANCED_SETTINGS,
                    description: 'Enable or disable password authentication for users'
                }
            });
            typeTransformers.boolean.toApp.mockReturnValueOnce(true);
            const result = service.convertDbValueToAppValue('true', 'AUTH_PASSWORD_ENABLED');
            expect(typeTransformers.boolean.toApp).toHaveBeenCalledWith('true', undefined);
            expect(result).toBe(true);
        });
        it('should use number transformer for number type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                CACHE_STORAGE_TTL: {
                    type: _configvariabletypeenum.ConfigVariableType.NUMBER,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Time-to-live for cache storage in seconds'
                }
            });
            typeTransformers.number.toApp.mockReturnValueOnce(3600 * 24 * 7);
            const result = service.convertDbValueToAppValue('604800', 'CACHE_STORAGE_TTL');
            expect(typeTransformers.number.toApp).toHaveBeenCalledWith('604800', undefined);
            expect(result).toBe(3600 * 24 * 7);
        });
        it('should use string transformer for string type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                FRONTEND_URL: {
                    type: _configvariabletypeenum.ConfigVariableType.STRING,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Frontend URL'
                }
            });
            typeTransformers.string.toApp.mockReturnValueOnce('http://localhost:3000');
            const result = service.convertDbValueToAppValue('http://localhost:3000', 'FRONTEND_URL');
            expect(typeTransformers.string.toApp).toHaveBeenCalledWith('http://localhost:3000', undefined);
            expect(result).toBe('http://localhost:3000');
        });
        it('should use array transformer for array type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                LOG_LEVELS: {
                    type: _configvariabletypeenum.ConfigVariableType.ARRAY,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.LOGGING,
                    description: 'Levels of logging to be captured',
                    options: [
                        'log',
                        'error',
                        'warn',
                        'debug',
                        'verbose'
                    ]
                }
            });
            const expectedResult = [
                'log',
                'error',
                'warn'
            ];
            typeTransformers.array.toApp.mockReturnValueOnce(expectedResult);
            const result = service.convertDbValueToAppValue('log,error,warn', 'LOG_LEVELS');
            expect(typeTransformers.array.toApp).toHaveBeenCalledWith('log,error,warn', [
                'log',
                'error',
                'warn',
                'debug',
                'verbose'
            ]);
            expect(result).toEqual(expectedResult);
        });
        it('should use enum transformer for enum type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                NODE_ENV: {
                    type: _configvariabletypeenum.ConfigVariableType.ENUM,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Node environment',
                    options: [
                        'development',
                        'production',
                        'test'
                    ]
                }
            });
            typeTransformers.enum.toApp.mockReturnValueOnce('development');
            const result = service.convertDbValueToAppValue('development', 'NODE_ENV');
            expect(typeTransformers.enum.toApp).toHaveBeenCalledWith('development', [
                'development',
                'production',
                'test'
            ]);
            expect(result).toBe('development');
        });
        it('should infer type from default value when no metadata is available', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce(undefined);
            typeTransformers.number.toApp.mockReturnValueOnce(3600 * 24 * 7);
            const result = service.convertDbValueToAppValue('604800', 'CACHE_STORAGE_TTL');
            expect(typeTransformers.number.toApp).toHaveBeenCalledWith('604800', undefined);
            expect(result).toBe(3600 * 24 * 7);
        });
        it('should return undefined for null or undefined input', ()=>{
            const result1 = service.convertDbValueToAppValue(null, 'CACHE_STORAGE_TTL');
            const result2 = service.convertDbValueToAppValue(undefined, 'CACHE_STORAGE_TTL');
            expect(result1).toBeUndefined();
            expect(result2).toBeUndefined();
        });
        it('should propagate errors from transformers with context', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                CACHE_STORAGE_TTL: {
                    type: _configvariabletypeenum.ConfigVariableType.NUMBER,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Time-to-live for cache storage in seconds'
                }
            });
            const error = new Error('Test error');
            typeTransformers.number.toApp.mockImplementationOnce(()=>{
                throw error;
            });
            expect(()=>{
                service.convertDbValueToAppValue('not-a-number', 'CACHE_STORAGE_TTL');
            }).toThrow(`Failed to convert CACHE_STORAGE_TTL to app value: Test error`);
        });
    });
    describe('convertAppValueToDbValue', ()=>{
        it('should use boolean transformer for boolean type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                AUTH_PASSWORD_ENABLED: {
                    type: _configvariabletypeenum.ConfigVariableType.BOOLEAN,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.ADVANCED_SETTINGS,
                    description: 'Enable or disable password authentication for users'
                }
            });
            typeTransformers.boolean.toStorage.mockReturnValueOnce(true);
            const result = service.convertAppValueToDbValue(true, 'AUTH_PASSWORD_ENABLED');
            expect(typeTransformers.boolean.toStorage).toHaveBeenCalledWith(true, undefined);
            expect(result).toBe(true);
        });
        it('should use number transformer for number type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                CACHE_STORAGE_TTL: {
                    type: _configvariabletypeenum.ConfigVariableType.NUMBER,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Time-to-live for cache storage in seconds'
                }
            });
            typeTransformers.number.toStorage.mockReturnValueOnce(3600 * 24 * 7);
            const result = service.convertAppValueToDbValue(3600 * 24 * 7, 'CACHE_STORAGE_TTL');
            expect(typeTransformers.number.toStorage).toHaveBeenCalledWith(3600 * 24 * 7, undefined);
            expect(result).toBe(3600 * 24 * 7);
        });
        it('should use string transformer for string type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                FRONTEND_URL: {
                    type: _configvariabletypeenum.ConfigVariableType.STRING,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Frontend URL'
                }
            });
            typeTransformers.string.toStorage.mockReturnValueOnce('http://localhost:3000');
            const result = service.convertAppValueToDbValue('http://localhost:3000', 'FRONTEND_URL');
            expect(typeTransformers.string.toStorage).toHaveBeenCalledWith('http://localhost:3000', undefined);
            expect(result).toBe('http://localhost:3000');
        });
        it('should use array transformer for array type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                LOG_LEVELS: {
                    type: _configvariabletypeenum.ConfigVariableType.ARRAY,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.LOGGING,
                    description: 'Levels of logging to be captured',
                    options: [
                        'log',
                        'error',
                        'warn',
                        'debug',
                        'verbose'
                    ]
                }
            });
            const inputArray = [
                'log',
                'error',
                'warn'
            ];
            const expectedResult = [
                'log',
                'error',
                'warn'
            ];
            typeTransformers.array.toStorage.mockReturnValueOnce(expectedResult);
            const result = service.convertAppValueToDbValue(inputArray, 'LOG_LEVELS');
            expect(typeTransformers.array.toStorage).toHaveBeenCalledWith(inputArray, [
                'log',
                'error',
                'warn',
                'debug',
                'verbose'
            ]);
            expect(result).toEqual(expectedResult);
        });
        it('should use enum transformer for enum type', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                NODE_ENV: {
                    type: _configvariabletypeenum.ConfigVariableType.ENUM,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Node environment',
                    options: [
                        'development',
                        'production',
                        'test'
                    ]
                }
            });
            typeTransformers.enum.toStorage.mockReturnValueOnce('development');
            const result = service.convertAppValueToDbValue('development', 'NODE_ENV');
            expect(typeTransformers.enum.toStorage).toHaveBeenCalledWith('development', [
                'development',
                'production',
                'test'
            ]);
            expect(result).toBe('development');
        });
        it('should infer type from default value when no metadata is available', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce(undefined);
            typeTransformers.number.toStorage.mockReturnValueOnce(3600 * 24 * 7);
            const result = service.convertAppValueToDbValue(3600 * 24 * 7, 'CACHE_STORAGE_TTL');
            expect(typeTransformers.number.toStorage).toHaveBeenCalledWith(3600 * 24 * 7, undefined);
            expect(result).toBe(3600 * 24 * 7);
        });
        it('should return null for null or undefined input', ()=>{
            const result1 = service.convertAppValueToDbValue(null, 'CACHE_STORAGE_TTL');
            const result2 = service.convertAppValueToDbValue(undefined, 'CACHE_STORAGE_TTL');
            expect(result1).toBeNull();
            expect(result2).toBeNull();
        });
        it('should handle object serialization when no transformer is found', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                CUSTOM_OBJECT: {
                    type: 'unknown-type',
                    group: _configvariablesgroupenum.ConfigVariablesGroup.ADVANCED_SETTINGS,
                    description: 'Custom object'
                }
            });
            const obj = {
                key: 'value'
            };
            const result = service.convertAppValueToDbValue(obj, 'CUSTOM_OBJECT');
            expect(result).toEqual(obj);
        });
        it('should propagate errors from transformers with context', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                CACHE_STORAGE_TTL: {
                    type: _configvariabletypeenum.ConfigVariableType.NUMBER,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Time-to-live for cache storage in seconds'
                }
            });
            const error = new Error('Test error');
            typeTransformers.number.toStorage.mockImplementationOnce(()=>{
                throw error;
            });
            expect(()=>{
                service.convertAppValueToDbValue('not-a-number', 'CACHE_STORAGE_TTL');
            }).toThrow(`Failed to convert CACHE_STORAGE_TTL to DB value: Test error`);
        });
    });
    describe('convertAppValueToDbValue bidirectional validation', ()=>{
        it('should validate boolean values when converting to storage', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                AUTH_PASSWORD_ENABLED: {
                    type: _configvariabletypeenum.ConfigVariableType.BOOLEAN,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.ADVANCED_SETTINGS,
                    description: 'Enable or disable password authentication for users'
                }
            });
            typeTransformers.boolean.toStorage.mockImplementationOnce(()=>{
                throw new Error('Expected boolean, got string');
            });
            expect(()=>{
                service.convertAppValueToDbValue('not-a-boolean', 'AUTH_PASSWORD_ENABLED');
            }).toThrow('Failed to convert AUTH_PASSWORD_ENABLED to DB value: Expected boolean, got string');
        });
        it('should validate number values when converting to storage', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                CACHE_STORAGE_TTL: {
                    type: _configvariabletypeenum.ConfigVariableType.NUMBER,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Time-to-live for cache storage in seconds'
                }
            });
            typeTransformers.number.toStorage.mockImplementationOnce(()=>{
                throw new Error('Expected number, got string');
            });
            expect(()=>{
                service.convertAppValueToDbValue('invalid-ttl', 'CACHE_STORAGE_TTL');
            }).toThrow('Failed to convert CACHE_STORAGE_TTL to DB value: Expected number, got string');
        });
        it('should validate string values when converting to storage', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                FRONTEND_URL: {
                    type: _configvariabletypeenum.ConfigVariableType.STRING,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Frontend URL'
                }
            });
            typeTransformers.string.toStorage.mockImplementationOnce(()=>{
                throw new Error('Expected string, got object');
            });
            expect(()=>{
                service.convertAppValueToDbValue({}, 'FRONTEND_URL');
            }).toThrow('Failed to convert FRONTEND_URL to DB value: Expected string, got object');
        });
        it('should validate array values when converting to storage', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                LOG_LEVELS: {
                    type: _configvariabletypeenum.ConfigVariableType.ARRAY,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.LOGGING,
                    description: 'Levels of logging to be captured',
                    options: [
                        'log',
                        'error',
                        'warn',
                        'debug',
                        'verbose'
                    ]
                }
            });
            typeTransformers.array.toStorage.mockImplementationOnce(()=>{
                throw new Error('Expected array, got string');
            });
            expect(()=>{
                service.convertAppValueToDbValue('not-an-array', 'LOG_LEVELS');
            }).toThrow('Failed to convert LOG_LEVELS to DB value: Expected array, got string');
        });
        it('should validate enum values when converting to storage', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                NODE_ENV: {
                    type: _configvariabletypeenum.ConfigVariableType.ENUM,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Node environment',
                    options: [
                        'development',
                        'production',
                        'test'
                    ]
                }
            });
            typeTransformers.enum.toStorage.mockImplementationOnce(()=>{
                throw new Error("Value 'invalid-env' is not a valid option for enum");
            });
            expect(()=>{
                service.convertAppValueToDbValue('invalid-env', 'NODE_ENV');
            }).toThrow("Failed to convert NODE_ENV to DB value: Value 'invalid-env' is not a valid option for enum");
        });
        it('should validate enum values against options', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                NODE_ENV: {
                    type: _configvariabletypeenum.ConfigVariableType.ENUM,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Node environment',
                    options: [
                        'development',
                        'production',
                        'test'
                    ]
                }
            });
            typeTransformers.enum.toStorage.mockImplementation((value, options)=>{
                if (!options?.includes(value)) {
                    throw new Error(`Value '${value}' is not a valid option for enum`);
                }
                return value;
            });
            expect(service.convertAppValueToDbValue('development', 'NODE_ENV')).toBe('development');
            expect(()=>{
                service.convertAppValueToDbValue('staging', 'NODE_ENV');
            }).toThrow("Failed to convert NODE_ENV to DB value: Value 'staging' is not a valid option for enum");
        });
        it('should filter array values based on options when converting to storage', ()=>{
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValueOnce({
                LOG_LEVELS: {
                    type: _configvariabletypeenum.ConfigVariableType.ARRAY,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.LOGGING,
                    description: 'Levels of logging to be captured',
                    options: [
                        'log',
                        'error',
                        'warn',
                        'debug',
                        'verbose'
                    ]
                }
            });
            typeTransformers.array.toStorage.mockImplementation((value, options)=>{
                if (!Array.isArray(value)) {
                    throw new Error(`Expected array, got ${typeof value}`);
                }
                if (!options || !Array.isArray(options) || options.length === 0) {
                    return value;
                }
                return value.filter((item)=>options.includes(item));
            });
            const result = service.convertAppValueToDbValue([
                'log',
                'invalid-level',
                'error'
            ], 'LOG_LEVELS');
            expect(result).toEqual([
                'log',
                'error'
            ]);
            expect(typeTransformers.array.toStorage).toHaveBeenCalledWith([
                'log',
                'invalid-level',
                'error'
            ], [
                'log',
                'error',
                'warn',
                'debug',
                'verbose'
            ]);
        });
    });
});

//# sourceMappingURL=config-value-converter.service.spec.js.map