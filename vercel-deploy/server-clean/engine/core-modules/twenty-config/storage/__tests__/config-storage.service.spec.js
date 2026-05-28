"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _keyvaluepairentity = require("../../../key-value-pair/key-value-pair.entity");
const _secretencryptionservice = require("../../../secret-encryption/secret-encryption.service");
const _configvariables = require("../../config-variables");
const _configvalueconverterservice = require("../../conversion/config-value-converter.service");
const _environmentconfigdriver = require("../../drivers/environment-config.driver");
const _configvariabletypeenum = require("../../enums/config-variable-type.enum");
const _configvariablesgroupenum = require("../../enums/config-variables-group.enum");
const _configstorageservice = require("../config-storage.service");
const _twentyconfigexception = require("../../twenty-config.exception");
const _typedreflect = require("../../../../../utils/typed-reflect");
jest.mock('src/engine/core-modules/auth/auth.util', ()=>({
        encryptText: jest.fn((text)=>`${text}`),
        decryptText: jest.fn((text)=>`${text}`)
    }));
describe('ConfigStorageService', ()=>{
    let service;
    let keyValuePairRepository;
    let configValueConverter;
    let secretEncryptionService;
    const createMockKeyValuePair = (key, value)=>({
            id: '1',
            key,
            value: value,
            type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
            userId: null,
            workspaceId: null,
            user: null,
            workspace: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            textValueDeprecated: null,
            deletedAt: null
        });
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _configstorageservice.ConfigStorageService,
                {
                    provide: _configvalueconverterservice.ConfigValueConverterService,
                    useValue: {
                        convertDbValueToAppValue: jest.fn(),
                        convertAppValueToDbValue: jest.fn()
                    }
                },
                {
                    provide: _environmentconfigdriver.EnvironmentConfigDriver,
                    useValue: {
                        get: jest.fn().mockReturnValue('test-secret')
                    }
                },
                _configvariables.ConfigVariables,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_keyvaluepairentity.KeyValuePairEntity),
                    useValue: {
                        findOne: jest.fn(),
                        find: jest.fn(),
                        update: jest.fn(),
                        insert: jest.fn(),
                        delete: jest.fn()
                    }
                },
                {
                    provide: _secretencryptionservice.SecretEncryptionService,
                    useValue: {
                        decryptVersioned: jest.fn((value)=>value),
                        encryptVersioned: jest.fn((value)=>value)
                    }
                }
            ]
        }).compile();
        service = module.get(_configstorageservice.ConfigStorageService);
        keyValuePairRepository = module.get((0, _typeorm.getRepositoryToken)(_keyvaluepairentity.KeyValuePairEntity));
        configValueConverter = module.get(_configvalueconverterservice.ConfigValueConverterService);
        secretEncryptionService = module.get(_secretencryptionservice.SecretEncryptionService);
        jest.clearAllMocks();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('get', ()=>{
        it('should return undefined when key not found', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(null);
            const result = await service.get(key);
            expect(result).toBeUndefined();
            expect(keyValuePairRepository.findOne).toHaveBeenCalledWith({
                where: {
                    type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
                    key: key,
                    userId: (0, _typeorm1.IsNull)(),
                    workspaceId: (0, _typeorm1.IsNull)()
                }
            });
        });
        it('should return converted value when key found', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const storedValue = 'true';
            const convertedValue = true;
            const mockRecord = createMockKeyValuePair(key, storedValue);
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(mockRecord);
            configValueConverter.convertDbValueToAppValue.mockReturnValue(convertedValue);
            const result = await service.get(key);
            expect(result).toBe(convertedValue);
            expect(configValueConverter.convertDbValueToAppValue).toHaveBeenCalledWith(storedValue, key);
        });
        it('should handle conversion errors', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const error = new Error('Conversion error');
            const mockRecord = createMockKeyValuePair(key, 'invalid');
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(mockRecord);
            configValueConverter.convertDbValueToAppValue.mockImplementation(()=>{
                throw error;
            });
            await expect(service.get(key)).rejects.toThrow(_twentyconfigexception.ConfigVariableException);
            await expect(service.get(key)).rejects.toMatchObject({
                code: _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED
            });
        });
        it('should decrypt sensitive string values', async ()=>{
            const key = 'SENSITIVE_CONFIG';
            const originalValue = 'sensitive-value';
            const encryptedValue = 'sensitive-value';
            const mockRecord = createMockKeyValuePair(key, encryptedValue);
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(mockRecord);
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValue({
                [key]: {
                    isSensitive: true,
                    type: _configvariabletypeenum.ConfigVariableType.STRING,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Test sensitive config'
                }
            });
            configValueConverter.convertDbValueToAppValue.mockReturnValue(encryptedValue);
            const result = await service.get(key);
            expect(result).toBe(originalValue);
            expect(secretEncryptionService.decryptVersioned).toHaveBeenCalledWith(encryptedValue);
        });
        it('should handle decryption errors gracefully', async ()=>{
            const key = 'SENSITIVE_CONFIG';
            const encryptedValue = 'encrypted-value';
            const convertedValue = 'converted-value';
            const mockRecord = createMockKeyValuePair(key, encryptedValue);
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(mockRecord);
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValue({
                [key]: {
                    isSensitive: true,
                    type: _configvariabletypeenum.ConfigVariableType.STRING,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Test sensitive config'
                }
            });
            configValueConverter.convertDbValueToAppValue.mockReturnValue(convertedValue);
            const result = await service.get(key);
            expect(result).toBe(convertedValue);
        });
        it('should handle findOne errors', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const error = new Error('Database error');
            jest.spyOn(keyValuePairRepository, 'findOne').mockRejectedValue(error);
            await expect(service.get(key)).rejects.toThrow(_twentyconfigexception.ConfigVariableException);
            await expect(service.get(key)).rejects.toThrow(`Failed to retrieve config variable ${key}: Database error`);
            await expect(service.get(key)).rejects.toMatchObject({
                code: _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR
            });
        });
    });
    describe('set', ()=>{
        it('should update existing record', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const value = true;
            const convertedValue = 'true';
            const mockRecord = createMockKeyValuePair(key, 'false');
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(mockRecord);
            configValueConverter.convertAppValueToDbValue.mockReturnValue(convertedValue);
            await service.set(key, value);
            expect(keyValuePairRepository.update).toHaveBeenCalledWith({
                id: mockRecord.id
            }, {
                value: convertedValue
            });
        });
        it('should insert new record when not found', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const value = true;
            const convertedValue = 'true';
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(null);
            configValueConverter.convertAppValueToDbValue.mockReturnValue(convertedValue);
            await service.set(key, value);
            expect(keyValuePairRepository.insert).toHaveBeenCalledWith({
                key: key,
                value: convertedValue,
                userId: null,
                workspaceId: null,
                type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE
            });
        });
        it('should handle conversion errors', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const value = 'not-a-boolean';
            const error = new Error('Invalid boolean value');
            configValueConverter.convertAppValueToDbValue.mockImplementation(()=>{
                throw error;
            });
            await expect(service.set(key, value)).rejects.toThrow(_twentyconfigexception.ConfigVariableException);
            await expect(service.set(key, value)).rejects.toMatchObject({
                code: _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED
            });
        });
        it('should handle update errors', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const value = true;
            const convertedValue = 'true';
            const error = new Error('Update error');
            const mockRecord = createMockKeyValuePair(key, 'false');
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(mockRecord);
            configValueConverter.convertAppValueToDbValue.mockReturnValue(convertedValue);
            jest.spyOn(keyValuePairRepository, 'update').mockRejectedValue(error);
            await expect(service.set(key, value)).rejects.toThrow(_twentyconfigexception.ConfigVariableException);
            await expect(service.set(key, value)).rejects.toThrow(`Failed to save config variable ${key}: Update error`);
            await expect(service.set(key, value)).rejects.toMatchObject({
                code: _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR
            });
        });
        it('should handle insert errors', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const value = true;
            const convertedValue = 'true';
            const error = new Error('Insert error');
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(null);
            configValueConverter.convertAppValueToDbValue.mockReturnValue(convertedValue);
            jest.spyOn(keyValuePairRepository, 'insert').mockRejectedValue(error);
            await expect(service.set(key, value)).rejects.toThrow(_twentyconfigexception.ConfigVariableException);
            await expect(service.set(key, value)).rejects.toThrow(`Failed to save config variable ${key}: Insert error`);
            await expect(service.set(key, value)).rejects.toMatchObject({
                code: _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR
            });
        });
        it('should encrypt sensitive string values', async ()=>{
            const key = 'SENSITIVE_CONFIG';
            const value = 'sensitive-value';
            const convertedValue = 'sensitive-value';
            const encryptedValue = 'sensitive-value';
            jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(null);
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValue({
                [key]: {
                    isSensitive: true,
                    type: _configvariabletypeenum.ConfigVariableType.STRING,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Test sensitive config'
                }
            });
            configValueConverter.convertAppValueToDbValue.mockReturnValue(convertedValue);
            await service.set(key, value);
            expect(keyValuePairRepository.insert).toHaveBeenCalledWith({
                key: key,
                value: encryptedValue,
                userId: null,
                workspaceId: null,
                type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE
            });
            expect(secretEncryptionService.encryptVersioned).toHaveBeenCalledWith(convertedValue);
        });
    });
    describe('delete', ()=>{
        it('should delete record', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            await service.delete(key);
            expect(keyValuePairRepository.delete).toHaveBeenCalledWith({
                type: _keyvaluepairentity.KeyValuePairType.CONFIG_VARIABLE,
                key: key,
                userId: (0, _typeorm1.IsNull)(),
                workspaceId: (0, _typeorm1.IsNull)()
            });
        });
        it('should handle delete errors', async ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const error = new Error('Delete error');
            jest.spyOn(keyValuePairRepository, 'delete').mockRejectedValue(error);
            await expect(service.delete(key)).rejects.toThrow(_twentyconfigexception.ConfigVariableException);
            await expect(service.delete(key)).rejects.toThrow(`Failed to delete config variable ${key}: Delete error`);
            await expect(service.delete(key)).rejects.toMatchObject({
                code: _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR
            });
        });
    });
    describe('loadAll', ()=>{
        it('should load and convert all config variables', async ()=>{
            const configVars = [
                createMockKeyValuePair('AUTH_PASSWORD_ENABLED', 'true'),
                createMockKeyValuePair('EMAIL_FROM_ADDRESS', 'test@example.com')
            ];
            jest.spyOn(keyValuePairRepository, 'find').mockResolvedValue(configVars);
            configValueConverter.convertDbValueToAppValue.mockImplementation((value, key)=>{
                if (key === 'AUTH_PASSWORD_ENABLED') return true;
                if (key === 'EMAIL_FROM_ADDRESS') return 'test@example.com';
                return value;
            });
            const result = await service.loadAll();
            expect(result.size).toBe(2);
            expect(result.get('AUTH_PASSWORD_ENABLED')).toBe(true);
            expect(result.get('EMAIL_FROM_ADDRESS')).toBe('test@example.com');
        });
        it('should skip invalid values but continue processing', async ()=>{
            const configVars = [
                createMockKeyValuePair('AUTH_PASSWORD_ENABLED', 'invalid'),
                createMockKeyValuePair('EMAIL_FROM_ADDRESS', 'test@example.com')
            ];
            jest.spyOn(keyValuePairRepository, 'find').mockResolvedValue(configVars);
            configValueConverter.convertDbValueToAppValue.mockImplementationOnce(()=>{
                throw new Error('Invalid value');
            }).mockImplementationOnce((value)=>value);
            const result = await service.loadAll();
            expect(result.size).toBe(1);
            expect(result.get('EMAIL_FROM_ADDRESS')).toBe('test@example.com');
        });
        it('should handle find errors', async ()=>{
            const error = new Error('Find error');
            jest.spyOn(keyValuePairRepository, 'find').mockRejectedValue(error);
            await expect(service.loadAll()).rejects.toThrow(_twentyconfigexception.ConfigVariableException);
            await expect(service.loadAll()).rejects.toThrow('Failed to load all config variables: Find error');
            await expect(service.loadAll()).rejects.toMatchObject({
                code: _twentyconfigexception.ConfigVariableExceptionCode.INTERNAL_ERROR
            });
        });
        describe('Null Value Handling', ()=>{
            it('should handle null values in loadAll', async ()=>{
                const configVars = [
                    {
                        ...createMockKeyValuePair('AUTH_PASSWORD_ENABLED', 'true'),
                        value: null
                    },
                    createMockKeyValuePair('EMAIL_FROM_ADDRESS', 'test@example.com')
                ];
                jest.spyOn(keyValuePairRepository, 'find').mockResolvedValue(configVars);
                configValueConverter.convertDbValueToAppValue.mockImplementation((value)=>{
                    if (value === null) throw new Error('Null value');
                    return value;
                });
                const result = await service.loadAll();
                expect(result.size).toBe(1);
                expect(result.get('EMAIL_FROM_ADDRESS')).toBe('test@example.com');
                expect(configValueConverter.convertDbValueToAppValue).toHaveBeenCalledTimes(1); // Only called for non-null value
            });
        });
        it('should decrypt sensitive string values in loadAll', async ()=>{
            const configVars = [
                createMockKeyValuePair('SENSITIVE_CONFIG', 'sensitive-value'),
                createMockKeyValuePair('NORMAL_CONFIG', 'normal-value')
            ];
            jest.spyOn(keyValuePairRepository, 'find').mockResolvedValue(configVars);
            jest.spyOn(_typedreflect.TypedReflect, 'getMetadata').mockReturnValue({
                SENSITIVE_CONFIG: {
                    isSensitive: true,
                    type: _configvariabletypeenum.ConfigVariableType.STRING,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Test sensitive config'
                },
                NORMAL_CONFIG: {
                    type: _configvariabletypeenum.ConfigVariableType.STRING,
                    group: _configvariablesgroupenum.ConfigVariablesGroup.SERVER_CONFIG,
                    description: 'Test normal config'
                }
            });
            configValueConverter.convertDbValueToAppValue.mockImplementation((value)=>value);
            const result = await service.loadAll();
            expect(result.size).toBe(2);
            expect(result.get('SENSITIVE_CONFIG')).toBe('sensitive-value');
            expect(result.get('NORMAL_CONFIG')).toBe('normal-value');
            expect(secretEncryptionService.decryptVersioned).toHaveBeenCalledWith('sensitive-value');
        });
    });
    describe('Edge Cases and Additional Scenarios', ()=>{
        describe('Type Safety', ()=>{
            it('should enforce correct types for boolean config variables', async ()=>{
                const key = 'AUTH_PASSWORD_ENABLED';
                const invalidValue = 'not-a-boolean';
                const mockRecord = createMockKeyValuePair(key, invalidValue);
                jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(mockRecord);
                configValueConverter.convertDbValueToAppValue.mockImplementation(()=>{
                    throw new Error('Invalid boolean value');
                });
                await expect(service.get(key)).rejects.toThrow(_twentyconfigexception.ConfigVariableException);
                await expect(service.get(key)).rejects.toMatchObject({
                    code: _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED
                });
            });
            it('should enforce correct types for string config variables', async ()=>{
                const key = 'EMAIL_FROM_ADDRESS';
                const invalidValue = '123'; // Not a valid email
                const mockRecord = createMockKeyValuePair(key, invalidValue);
                jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValue(mockRecord);
                configValueConverter.convertDbValueToAppValue.mockImplementation(()=>{
                    throw new Error('Invalid string value');
                });
                await expect(service.get(key)).rejects.toThrow(_twentyconfigexception.ConfigVariableException);
                await expect(service.get(key)).rejects.toMatchObject({
                    code: _twentyconfigexception.ConfigVariableExceptionCode.VALIDATION_FAILED
                });
            });
        });
        describe('Concurrent Operations', ()=>{
            it('should handle concurrent get/set operations', async ()=>{
                const key = 'AUTH_PASSWORD_ENABLED';
                const initialValue = true;
                const newValue = false;
                const initialRecord = createMockKeyValuePair(key, 'true');
                const updatedRecord = createMockKeyValuePair(key, 'false');
                jest.spyOn(keyValuePairRepository, 'findOne').mockResolvedValueOnce(initialRecord).mockResolvedValueOnce(initialRecord).mockResolvedValueOnce(updatedRecord);
                configValueConverter.convertDbValueToAppValue.mockReturnValueOnce(initialValue).mockReturnValueOnce(newValue);
                configValueConverter.convertAppValueToDbValue.mockReturnValueOnce('false');
                const firstGet = service.get(key);
                const setOperation = service.set(key, newValue);
                const secondGet = service.get(key);
                const [firstResult, , secondResult] = await Promise.all([
                    firstGet,
                    setOperation,
                    secondGet
                ]);
                expect(firstResult).toBe(initialValue);
                expect(secondResult).toBe(newValue);
            });
            it('should handle concurrent delete operations', async ()=>{
                const key = 'AUTH_PASSWORD_ENABLED';
                jest.spyOn(keyValuePairRepository, 'delete').mockResolvedValueOnce({
                    affected: 1
                }).mockResolvedValueOnce({
                    affected: 0
                });
                const firstDelete = service.delete(key);
                const secondDelete = service.delete(key);
                await Promise.all([
                    firstDelete,
                    secondDelete
                ]);
                expect(keyValuePairRepository.delete).toHaveBeenCalledTimes(2);
            });
        });
    });
});

//# sourceMappingURL=config-storage.service.spec.js.map