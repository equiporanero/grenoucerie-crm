"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConfigStorageService", {
    enumerable: true,
    get: function() {
        return ConfigStorageService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _keyvaluepairentity = require("../../key-value-pair/key-value-pair.entity");
const _secretencryptionservice = require("../../secret-encryption/secret-encryption.service");
const _configvariables = require("../config-variables");
const _configvalueconverterservice = require("../conversion/config-value-converter.service");
const _configvariabletypeenum = require("../enums/config-variable-type.enum");
const _twentyconfigexception = require("../twenty-config.exception");
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
let ConfigStorageService = class ConfigStorageService {
    getConfigVariableWhereClause(key) {
        return {
            type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
            ...key ? {
                key
            } : {},
            userId: (0, _typeorm1.IsNull)(),
            workspaceId: (0, _typeorm1.IsNull)()
        };
    }
    getConfigMetadata(key) {
        return _typedreflect.TypedReflect.getMetadata('config-variables', _configvariables.ConfigVariables)?.[key];
    }
    async convertAndSecureValue(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
    value, key, isDecrypt = false) {
        try {
            const convertedValue = isDecrypt ? this.configValueConverter.convertDbValueToAppValue(value, key) : this.configValueConverter.convertAppValueToDbValue(value, key);
            const metadata = this.getConfigMetadata(key);
            const isSensitiveString = metadata?.isSensitive && metadata.type === _configvariabletypeenum.ConfigVariableType.STRING && typeof convertedValue === 'string';
            if (!isSensitiveString) {
                return convertedValue;
            }
            return isDecrypt ? this.secretEncryptionService.decryptVersioned(convertedValue) : this.secretEncryptionService.encryptVersioned(convertedValue);
        } catch (error) {
            throw new _twentyconfigexception.ConfigVariableException(`Failed to convert value for key ${key}: ${error.message}`, _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED);
        }
    }
    async get(key) {
        try {
            const result = await this.keyValuePairRepository.findOne({
                where: this.getConfigVariableWhereClause(key)
            });
            if (result === null) {
                return undefined;
            }
            this.logger.debug(`Fetching config for ${key} in database: ${result?.value}`);
            return await this.convertAndSecureValue(result.value, key, true);
        } catch (error) {
            if (error instanceof _twentyconfigexception.ConfigVariableException) {
                throw error;
            }
            throw new _twentyconfigexception.ConfigVariableException(`Failed to retrieve config variable ${key}: ${error instanceof Error ? error.message : String(error)}`, _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR);
        }
    }
    async set(key, value) {
        try {
            const dbValue = await this.convertAndSecureValue(value, key, false);
            const existingRecord = await this.keyValuePairRepository.findOne({
                where: this.getConfigVariableWhereClause(key)
            });
            if (existingRecord) {
                await this.keyValuePairRepository.update({
                    id: existingRecord.id
                }, {
                    value: dbValue
                });
            } else {
                await this.keyValuePairRepository.insert({
                    key: key,
                    value: dbValue,
                    userId: null,
                    workspaceId: null,
                    type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE
                });
            }
        } catch (error) {
            if (error instanceof _twentyconfigexception.ConfigVariableException) {
                throw error;
            }
            throw new _twentyconfigexception.ConfigVariableException(`Failed to save config variable ${key}: ${error instanceof Error ? error.message : String(error)}`, _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR);
        }
    }
    async delete(key) {
        try {
            await this.keyValuePairRepository.delete(this.getConfigVariableWhereClause(key));
        } catch (error) {
            throw new _twentyconfigexception.ConfigVariableException(`Failed to delete config variable ${key}: ${error instanceof Error ? error.message : String(error)}`, _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR);
        }
    }
    async loadAll() {
        try {
            const configVars = await this.keyValuePairRepository.find({
                where: this.getConfigVariableWhereClause()
            });
            const result = new Map();
            for (const configVar of configVars){
                if (configVar.value !== null) {
                    const key = configVar.key;
                    try {
                        const value = await this.convertAndSecureValue(configVar.value, key, true);
                        if (value !== undefined) {
                            result.set(key, value);
                        }
                    } catch (error) {
                        this.logger.debug(`Skipping invalid config value for key ${key}: ${error instanceof Error ? error.message : String(error)}`);
                        continue;
                    }
                }
            }
            return result;
        } catch (error) {
            throw new _twentyconfigexception.ConfigVariableException(`Failed to load all config variables: ${error instanceof Error ? error.message : String(error)}`, _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR);
        }
    }
    constructor(keyValuePairRepository, configValueConverter, secretEncryptionService){
        this.keyValuePairRepository = keyValuePairRepository;
        this.configValueConverter = configValueConverter;
        this.secretEncryptionService = secretEncryptionService;
        this.logger = new _common.Logger(ConfigStorageService.name);
    }
};
ConfigStorageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_keyvaluepairentity.KeyValuePairEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _configvalueconverterservice.ConfigValueConverterService === "undefined" ? Object : _configvalueconverterservice.ConfigValueConverterService,
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService
    ])
], ConfigStorageService);

//# sourceMappingURL=config-storage.service.js.map