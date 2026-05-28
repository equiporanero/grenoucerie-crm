"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigValueConverterService", {
    enumerable: true,
    get: function() {
        return ConfigValueConverterService;
    }
});
const _common = require("@nestjs/common");
const _configvariables = require("../config-variables");
const _configvariablesinstancetokensconstants = require("../constants/config-variables-instance-tokens.constants");
const _configvariabletypeenum = require("../enums/config-variable-type.enum");
const _twentyconfigexception = require("../twenty-config.exception");
const _typetransformersregistry = require("../utils/type-transformers.registry");
const _typedreflect = require("../../../../utils/typed-reflect");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ConfigValueConverterService = class ConfigValueConverterService {
    convertDbValueToAppValue(dbValue, key) {
        if (dbValue === null || dbValue === undefined) {
            return undefined;
        }
        const metadata = this.getConfigVariableMetadata(key);
        const configType = metadata?.type || this.inferTypeFromValue(key);
        const options = metadata?.options;
        try {
            const transformer = _typetransformersregistry.typeTransformers[configType];
            if (!transformer) {
                return dbValue;
            }
            return transformer.toApp(dbValue, options);
        } catch (error) {
            throw new _twentyconfigexception.ConfigVariableException(`Failed to convert ${key} to app value: ${error.message}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
        }
    }
    convertAppValueToDbValue(appValue, key) {
        if (appValue === null || appValue === undefined) {
            return null;
        }
        const metadata = this.getConfigVariableMetadata(key);
        const configType = metadata?.type || this.inferTypeFromValue(key);
        const options = metadata?.options;
        try {
            const transformer = _typetransformersregistry.typeTransformers[configType];
            if (!transformer) {
                if (typeof appValue === 'object') {
                    try {
                        return JSON.parse(JSON.stringify(appValue));
                    } catch (error) {
                        throw new _twentyconfigexception.ConfigVariableException(`Failed to serialize object value: ${error instanceof Error ? error.message : String(error)}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
                    }
                }
                return appValue;
            }
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            return transformer.toStorage(appValue, options);
        } catch (error) {
            if (error instanceof _twentyconfigexception.ConfigVariableException) {
                throw error;
            }
            throw new _twentyconfigexception.ConfigVariableException(`Failed to convert ${key} to DB value: ${error.message}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
        }
    }
    getConfigVariableMetadata(key) {
        const allMetadata = _typedreflect.TypedReflect.getMetadata('config-variables', _configvariables.ConfigVariables.prototype.constructor);
        return allMetadata?.[key];
    }
    inferTypeFromValue(key) {
        const defaultValue = this.configVariables[key];
        if (typeof defaultValue === 'boolean') return _configvariabletypeenum.ConfigVariableType.BOOLEAN;
        if (typeof defaultValue === 'number') return _configvariabletypeenum.ConfigVariableType.NUMBER;
        if (Array.isArray(defaultValue)) return _configvariabletypeenum.ConfigVariableType.ARRAY;
        if (typeof defaultValue === 'object' && defaultValue !== null && !Array.isArray(defaultValue)) {
            return _configvariabletypeenum.ConfigVariableType.JSON;
        }
        return _configvariabletypeenum.ConfigVariableType.STRING;
    }
    constructor(configVariables){
        this.configVariables = configVariables;
    }
};
ConfigValueConverterService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_configvariablesinstancetokensconstants.CONFIG_VARIABLES_INSTANCE_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _configvariables.ConfigVariables === "undefined" ? Object : _configvariables.ConfigVariables
    ])
], ConfigValueConverterService);

//# sourceMappingURL=config-value-converter.service.js.map