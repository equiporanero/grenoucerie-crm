"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _emaildriverfactory = require("../email-driver.factory");
const _emaildriverenum = require("../enums/email-driver.enum");
const _configgrouphashservice = require("../../twenty-config/services/config-group-hash.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
describe('EmailDriverFactory', ()=>{
    let factory;
    let twentyConfigService;
    let configGroupHashService;
    const mockTwentyConfigService = {
        get: jest.fn()
    };
    const mockConfigGroupHashService = {
        computeHash: jest.fn().mockReturnValue('')
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _emaildriverfactory.EmailDriverFactory,
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: mockTwentyConfigService
                },
                {
                    provide: _configgrouphashservice.ConfigGroupHashService,
                    useValue: mockConfigGroupHashService
                }
            ]
        }).compile();
        factory = module.get(_emaildriverfactory.EmailDriverFactory);
        twentyConfigService = module.get(_twentyconfigservice.TwentyConfigService);
        configGroupHashService = module.get(_configgrouphashservice.ConfigGroupHashService);
        jest.clearAllMocks();
    });
    describe('buildConfigKey', ()=>{
        it('should return "logger" for logger driver', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(_emaildriverenum.EmailDriver.LOGGER);
            const result = factory['buildConfigKey']();
            expect(result).toBe('logger');
            expect(twentyConfigService.get).toHaveBeenCalledWith('EMAIL_DRIVER');
        });
        it('should return smtp config key for smtp driver', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(_emaildriverenum.EmailDriver.SMTP);
            jest.spyOn(configGroupHashService, 'computeHash').mockReturnValue('smtp-hash-123');
            const result = factory['buildConfigKey']();
            expect(result).toBe('smtp|smtp-hash-123');
            expect(twentyConfigService.get).toHaveBeenCalledWith('EMAIL_DRIVER');
        });
        it('should throw error for unsupported driver', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('invalid-driver');
            expect(()=>factory['buildConfigKey']()).toThrow('Unsupported email driver: invalid-driver');
        });
    });
    describe('createDriver', ()=>{
        it('should create logger driver', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(_emaildriverenum.EmailDriver.LOGGER);
            const driver = factory['createDriver']();
            expect(driver).toBeDefined();
            expect(driver.constructor.name).toBe('LoggerDriver');
        });
        it('should create smtp driver with basic configuration', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                switch(key){
                    case 'EMAIL_DRIVER':
                        return _emaildriverenum.EmailDriver.SMTP;
                    case 'EMAIL_SMTP_HOST':
                        return 'smtp.example.com';
                    case 'EMAIL_SMTP_PORT':
                        return 587;
                    case 'EMAIL_SMTP_USER':
                        return undefined;
                    case 'EMAIL_SMTP_PASSWORD':
                        return undefined;
                    case 'EMAIL_SMTP_NO_TLS':
                        return false;
                    default:
                        return undefined;
                }
            });
            const driver = factory['createDriver']();
            expect(driver).toBeDefined();
            expect(driver.constructor.name).toBe('SmtpDriver');
        });
        it('should throw error when smtp host is missing', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                switch(key){
                    case 'EMAIL_DRIVER':
                        return _emaildriverenum.EmailDriver.SMTP;
                    case 'EMAIL_SMTP_HOST':
                        return undefined;
                    case 'EMAIL_SMTP_PORT':
                        return 587;
                    default:
                        return undefined;
                }
            });
            expect(()=>factory['createDriver']()).toThrow('SMTP driver requires host and port to be defined');
        });
        it('should throw error for invalid driver', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('invalid-driver');
            expect(()=>factory['createDriver']()).toThrow('Invalid email driver: invalid-driver');
        });
    });
    describe('getCurrentDriver', ()=>{
        it('should return current driver for logger', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(_emaildriverenum.EmailDriver.LOGGER);
            const driver = factory.getCurrentDriver();
            expect(driver).toBeDefined();
            expect(driver.constructor.name).toBe('LoggerDriver');
        });
        it('should reuse driver when config key unchanged', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(_emaildriverenum.EmailDriver.LOGGER);
            const driver1 = factory.getCurrentDriver();
            const driver2 = factory.getCurrentDriver();
            expect(driver1).toBe(driver2);
        });
        it('should create new driver when config key changes', ()=>{
            // First call with logger
            jest.spyOn(twentyConfigService, 'get').mockReturnValue(_emaildriverenum.EmailDriver.LOGGER);
            const driver1 = factory.getCurrentDriver();
            // Second call with smtp
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                switch(key){
                    case 'EMAIL_DRIVER':
                        return _emaildriverenum.EmailDriver.SMTP;
                    case 'EMAIL_SMTP_HOST':
                        return 'smtp.example.com';
                    case 'EMAIL_SMTP_PORT':
                        return 587;
                    default:
                        return undefined;
                }
            });
            jest.spyOn(configGroupHashService, 'computeHash').mockReturnValue('smtp-hash-123');
            const driver2 = factory.getCurrentDriver();
            expect(driver1).not.toBe(driver2);
            expect(driver1.constructor.name).toBe('LoggerDriver');
            expect(driver2.constructor.name).toBe('SmtpDriver');
        });
        it('should throw error for unsupported email driver', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockReturnValue('invalid-driver');
            expect(()=>factory.getCurrentDriver()).toThrow('Failed to build config key for EmailDriverFactory. Original error: Unsupported email driver: invalid-driver');
        });
        it('should throw error when driver creation fails after valid config', ()=>{
            jest.spyOn(twentyConfigService, 'get').mockImplementation((key)=>{
                switch(key){
                    case 'EMAIL_DRIVER':
                        return _emaildriverenum.EmailDriver.SMTP;
                    case 'EMAIL_SMTP_HOST':
                        return 'smtp.example.com';
                    case 'EMAIL_SMTP_PORT':
                        return 587;
                    default:
                        return undefined;
                }
            });
            jest.spyOn(configGroupHashService, 'computeHash').mockReturnValue('smtp-hash-123');
            jest.spyOn(factory, 'createDriver').mockImplementation(()=>{
                throw new Error('Driver creation failed');
            });
            expect(()=>factory.getCurrentDriver()).toThrow('Failed to create driver for EmailDriverFactory with config key: smtp|smtp-hash-123. Original error: Driver creation failed');
        });
    });
});

//# sourceMappingURL=email-driver.factory.spec.js.map