"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "typeTransformers", {
    enumerable: true,
    get: function() {
        return typeTransformers;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _configvariabletypeenum = require("../enums/config-variable-type.enum");
const _twentyconfigexception = require("../twenty-config.exception");
const _configtransformersutil = require("./config-transformers.util");
const _tryparsejsonarray = require("../../../../utils/try-parse-json-array");
const typeTransformers = {
    [_configvariabletypeenum.ConfigVariableType.BOOLEAN]: {
        toApp: (value)=>{
            if (value === null || value === undefined) return undefined;
            const result = _configtransformersutil.configTransformers.boolean(value);
            if (result !== undefined && typeof result !== 'boolean') {
                throw new _twentyconfigexception.ConfigVariableException(`Expected boolean, got ${typeof result}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            return result;
        },
        toStorage: (value)=>{
            if (typeof value !== 'boolean') {
                throw new _twentyconfigexception.ConfigVariableException(`Expected boolean, got ${typeof value}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            return value;
        },
        getValidators: ()=>[
                (0, _classvalidator.IsBoolean)()
            ],
        getTransformers: ()=>[
                (0, _classtransformer.Transform)(({ value })=>{
                    const result = _configtransformersutil.configTransformers.boolean(value);
                    return result !== undefined ? result : value;
                })
            ]
    },
    [_configvariabletypeenum.ConfigVariableType.NUMBER]: {
        toApp: (value)=>{
            if (value === null || value === undefined) return undefined;
            const result = _configtransformersutil.configTransformers.number(value);
            if (result !== undefined && typeof result !== 'number') {
                throw new _twentyconfigexception.ConfigVariableException(`Expected number, got ${typeof result}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            return result;
        },
        toStorage: (value)=>{
            if (typeof value !== 'number') {
                throw new _twentyconfigexception.ConfigVariableException(`Expected number, got ${typeof value}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            return value;
        },
        getValidators: ()=>[
                (0, _classvalidator.IsNumber)()
            ],
        getTransformers: ()=>[
                (0, _classtransformer.Transform)(({ value })=>{
                    const result = _configtransformersutil.configTransformers.number(value);
                    return result !== undefined ? result : value;
                })
            ]
    },
    [_configvariabletypeenum.ConfigVariableType.STRING]: {
        toApp: (value)=>{
            if (value === null || value === undefined) return undefined;
            const result = _configtransformersutil.configTransformers.string(value);
            if (result !== undefined && typeof result !== 'string') {
                throw new _twentyconfigexception.ConfigVariableException(`Expected string, got ${typeof result}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            return result;
        },
        toStorage: (value)=>{
            if (typeof value !== 'string') {
                throw new _twentyconfigexception.ConfigVariableException(`Expected string, got ${typeof value}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            return value;
        },
        getValidators: ()=>[
                (0, _classvalidator.IsString)()
            ],
        getTransformers: ()=>[]
    },
    [_configvariabletypeenum.ConfigVariableType.ARRAY]: {
        toApp: (value, options)=>{
            if (value === null || value === undefined) return undefined;
            let arrayValue;
            if (Array.isArray(value)) {
                arrayValue = value;
            } else if (typeof value === 'string') {
                try {
                    const parsedArray = JSON.parse(value);
                    if (Array.isArray(parsedArray)) {
                        arrayValue = parsedArray;
                    } else {
                        arrayValue = value.split(',').map((item)=>item.trim());
                    }
                } catch  {
                    arrayValue = value.split(',').map((item)=>item.trim());
                }
            } else {
                arrayValue = [
                    value
                ];
            }
            if (!options || !Array.isArray(options) || options.length === 0) {
                return arrayValue;
            }
            return arrayValue.filter((item)=>options.includes(item));
        },
        toStorage: (value, options)=>{
            if (!Array.isArray(value)) {
                throw new _twentyconfigexception.ConfigVariableException(`Expected array, got ${typeof value}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            if (!options || !Array.isArray(options) || options.length === 0) {
                return value;
            }
            return value.filter((item)=>options.includes(item));
        },
        getValidators: ()=>[
                (0, _classvalidator.IsArray)()
            ],
        getTransformers: ()=>[
                (0, _classtransformer.Transform)(({ value })=>{
                    if (Array.isArray(value)) return value;
                    if (!(0, _classvalidator.isString)(value)) return value;
                    const fromJson = (0, _tryparsejsonarray.tryParseJsonArray)(value);
                    if ((0, _classvalidator.isDefined)(fromJson)) return fromJson;
                    return value.split(',').map((item)=>item.trim()).filter((item)=>item.length > 0);
                })
            ]
    },
    [_configvariabletypeenum.ConfigVariableType.ENUM]: {
        toApp: (value, options)=>{
            if (value === null || value === undefined) return undefined;
            if (!options || !Array.isArray(options) || options.length === 0) {
                return value;
            }
            return options.includes(value) ? value : undefined;
        },
        toStorage: (value, options)=>{
            if (typeof value !== 'string') {
                throw new _twentyconfigexception.ConfigVariableException(`Expected string for enum, got ${typeof value}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            if (!options || !Array.isArray(options) || options.length === 0) {
                return value;
            }
            if (!options.includes(value)) {
                throw new _twentyconfigexception.ConfigVariableException(`Value '${value}' is not a valid option for enum`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            return value;
        },
        getValidators: (options)=>{
            if (!options) {
                return [];
            }
            return [
                (0, _classvalidator.IsEnum)(options)
            ];
        },
        getTransformers: ()=>[]
    },
    [_configvariabletypeenum.ConfigVariableType.JSON]: {
        toApp: (value)=>{
            if (value === null || value === undefined) return undefined;
            if (typeof value === 'object' && !Array.isArray(value)) {
                return value;
            }
            if (typeof value === 'string') {
                try {
                    const parsed = JSON.parse(value);
                    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
                        return parsed;
                    }
                    throw new _twentyconfigexception.ConfigVariableException('Expected JSON object, got non-object value', _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
                } catch (error) {
                    if (error instanceof _twentyconfigexception.ConfigVariableException) {
                        throw error;
                    }
                    throw new _twentyconfigexception.ConfigVariableException(`Failed to parse JSON string: ${error instanceof Error ? error.message : String(error)}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
                }
            }
            throw new _twentyconfigexception.ConfigVariableException(`Expected JSON object or string, got ${typeof value}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
        },
        toStorage: (value)=>{
            if (typeof value !== 'object' || value === null || Array.isArray(value)) {
                throw new _twentyconfigexception.ConfigVariableException(`Expected JSON object, got ${Array.isArray(value) ? 'array' : typeof value}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
            }
            return JSON.parse(JSON.stringify(value));
        },
        getValidators: ()=>[
                (0, _classvalidator.IsObject)()
            ],
        getTransformers: ()=>[
                (0, _classtransformer.Transform)(({ value })=>{
                    if (typeof value === 'string') {
                        try {
                            return JSON.parse(value);
                        } catch  {
                            return value;
                        }
                    }
                    return value;
                })
            ]
    }
};

//# sourceMappingURL=type-transformers.registry.js.map