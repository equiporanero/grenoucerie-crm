"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwentyConfigService", {
    enumerable: true,
    get: function() {
        return TwentyConfigService;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _configvariables = require("./config-variables");
const _configvariablesmaskingconfig = require("./constants/config-variables-masking-config");
const _databaseconfigdriver = require("./drivers/database-config.driver");
const _environmentconfigdriver = require("./drivers/environment-config.driver");
const _configsourceenum = require("./enums/config-source.enum");
const _configvariablesmaskingstrategiesenum = require("./enums/config-variables-masking-strategies.enum");
const _twentyconfigexception = require("./twenty-config.exception");
const _configvariablemasksensitivedatautil = require("./utils/config-variable-mask-sensitive-data.util");
const _isenvonlyconfigvarutil = require("./utils/is-env-only-config-var.util");
const _typedreflect = require("../../../utils/typed-reflect");
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
let TwentyConfigService = class TwentyConfigService {
    get(key) {
        if ((0, _isenvonlyconfigvarutil.isEnvOnlyConfigVar)(key)) {
            return this.environmentConfigDriver.get(key);
        }
        if (this.isDatabaseDriverActive) {
            const cachedValueFromDb = this.databaseConfigDriver.get(key);
            if (cachedValueFromDb !== undefined) {
                return cachedValueFromDb;
            }
        }
        return this.environmentConfigDriver.get(key);
    }
    async set(key, value) {
        this.validateDatabaseDriverActive('set');
        this.validateNotEnvOnly(key, 'create');
        this.validateConfigVariableExists(key);
        await this.databaseConfigDriver.set(key, value);
    }
    async update(key, value) {
        this.validateDatabaseDriverActive('update');
        this.validateNotEnvOnly(key, 'update');
        this.validateConfigVariableExists(key);
        await this.databaseConfigDriver.update(key, value);
    }
    getMetadata(key) {
        return this.getConfigMetadata()[key];
    }
    getAll() {
        const result = {};
        const metadata = this.getConfigMetadata();
        Object.entries(metadata).forEach(([key, envMetadata])=>{
            const typedKey = key;
            let value = this.get(typedKey) ?? '';
            const source = this.determineConfigSource(typedKey, value, envMetadata);
            value = this.maskSensitiveValue(typedKey, value, envMetadata);
            result[key] = {
                value,
                metadata: envMetadata,
                source
            };
        });
        return result;
    }
    getVariableWithMetadata(key) {
        const metadata = this.getMetadata(key);
        if (!metadata) {
            return null;
        }
        let value = this.get(key) ?? '';
        const source = this.determineConfigSource(key, value, metadata);
        value = this.maskSensitiveValue(key, value, metadata);
        return {
            value,
            metadata,
            source
        };
    }
    getCacheInfo() {
        const result = {
            usingDatabaseDriver: this.isDatabaseDriverActive
        };
        if (this.isDatabaseDriverActive) {
            return {
                ...result,
                cacheStats: this.databaseConfigDriver.getCacheInfo()
            };
        }
        return result;
    }
    async delete(key) {
        this.validateDatabaseDriverActive('delete');
        this.validateConfigVariableExists(key);
        await this.databaseConfigDriver.delete(key);
    }
    getConfigMetadata() {
        return _typedreflect.TypedReflect.getMetadata('config-variables', _configvariables.ConfigVariables) ?? {};
    }
    validateDatabaseDriverActive(operation) {
        if (!this.isDatabaseDriverActive) {
            throw new _twentyconfigexception.ConfigVariableException(`Database configuration is disabled or unavailable, cannot ${operation} configuration`, _twentyconfigexception.ConfigVariableExceptionCode.DATABASE_CONFIG_DISABLED);
        }
    }
    getLoggingConfig() {
        return this.get('TYPEORM_LOGGING');
    }
    isBillingEnabled() {
        return this.get('IS_BILLING_ENABLED') === true;
    }
    validateNotEnvOnly(key, operation) {
        const metadata = this.getConfigMetadata();
        const envMetadata = metadata[key];
        if (envMetadata?.isEnvOnly) {
            throw new _twentyconfigexception.ConfigVariableException(`Cannot ${operation} environment-only variable: ${key}`, _twentyconfigexception.ConfigVariableExceptionCode.ENVIRONMENT_ONLY_VARIABLE);
        }
    }
    determineConfigSource(key, value, metadata) {
        const configVars = new _configvariables.ConfigVariables();
        if (!this.isDatabaseDriverActive || metadata.isEnvOnly) {
            return value === configVars[key] ? _configsourceenum.ConfigSource.DEFAULT : _configsourceenum.ConfigSource.ENVIRONMENT;
        }
        const dbValue = this.databaseConfigDriver.get(key);
        if (dbValue !== undefined) {
            return _configsourceenum.ConfigSource.DATABASE;
        }
        return value === configVars[key] ? _configsourceenum.ConfigSource.DEFAULT : _configsourceenum.ConfigSource.ENVIRONMENT;
    }
    maskSensitiveValue(key, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    value, metadata) {
        if (key in _configvariablesmaskingconfig.CONFIG_VARIABLES_MASKING_CONFIG) {
            if (!(0, _classvalidator.isString)(value)) {
                return value;
            }
            const varMaskingConfig = _configvariablesmaskingconfig.CONFIG_VARIABLES_MASKING_CONFIG[key];
            const options = varMaskingConfig.strategy === _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS ? {
                chars: varMaskingConfig.chars
            } : undefined;
            return (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)(value, varMaskingConfig.strategy, {
                ...options,
                variableName: key
            });
        }
        if (metadata?.isSensitive) {
            if (!value && value !== false && value !== 0) {
                return value;
            }
            if ((0, _classvalidator.isString)(value)) {
                return (0, _configvariablemasksensitivedatautil.configVariableMaskSensitiveData)(value, _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS, {
                    chars: 4,
                    variableName: key
                });
            }
            return '********';
        }
        return value;
    }
    validateConfigVariableExists(key) {
        const metadata = this.getConfigMetadata();
        const keyExists = key in metadata;
        if (!keyExists) {
            throw new _twentyconfigexception.ConfigVariableException(`Config variable "${key}" does not exist in ConfigVariables`, _twentyconfigexception.ConfigVariableExceptionCode.VARIABLE_NOT_FOUND);
        }
        return true;
    }
    constructor(environmentConfigDriver, databaseConfigDriver){
        this.environmentConfigDriver = environmentConfigDriver;
        this.databaseConfigDriver = databaseConfigDriver;
        this.logger = new _common.Logger(TwentyConfigService.name);
        const isConfigVariablesInDbEnabled = this.environmentConfigDriver.get('IS_CONFIG_VARIABLES_IN_DB_ENABLED');
        this.isDatabaseDriverActive = isConfigVariablesInDbEnabled && !!this.databaseConfigDriver;
        this.logger.log(`Database configuration is ${isConfigVariablesInDbEnabled ? 'enabled' : 'disabled'}`);
        if (isConfigVariablesInDbEnabled && !this.databaseConfigDriver) {
            this.logger.warn('Database config is enabled but driver is not available. Using environment variables only.');
        }
        if (this.isDatabaseDriverActive) {
            this.logger.log('Using database configuration driver');
        // The database driver will load config variables asynchronously via its onModuleInit lifecycle hook
        // In the meantime, we'll use the environment driver -- fallback
        } else {
            this.logger.log('Using environment variables only for configuration');
        }
    }
};
TwentyConfigService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _common.Optional)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _environmentconfigdriver.EnvironmentConfigDriver === "undefined" ? Object : _environmentconfigdriver.EnvironmentConfigDriver,
        typeof _databaseconfigdriver.DatabaseConfigDriver === "undefined" ? Object : _databaseconfigdriver.DatabaseConfigDriver
    ])
], TwentyConfigService);

//# sourceMappingURL=twenty-config.service.js.map