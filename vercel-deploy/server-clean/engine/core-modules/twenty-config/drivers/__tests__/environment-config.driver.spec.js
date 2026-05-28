"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _config = require("@nestjs/config");
const _testing = require("@nestjs/testing");
const _configvariables = require("../../config-variables");
const _configvariablesinstancetokensconstants = require("../../constants/config-variables-instance-tokens.constants");
const _environmentconfigdriver = require("../environment-config.driver");
describe('EnvironmentConfigDriver', ()=>{
    let driver;
    let configService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _environmentconfigdriver.EnvironmentConfigDriver,
                {
                    provide: _config.ConfigService,
                    useValue: {
                        get: jest.fn()
                    }
                },
                {
                    provide: _configvariablesinstancetokensconstants.CONFIG_VARIABLES_INSTANCE_TOKEN,
                    useValue: new _configvariables.ConfigVariables()
                }
            ]
        }).compile();
        driver = module.get(_environmentconfigdriver.EnvironmentConfigDriver);
        configService = module.get(_config.ConfigService);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    it('should be defined', ()=>{
        expect(driver).toBeDefined();
    });
    describe('get', ()=>{
        it('should return value from config service when available', ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const expectedValue = true;
            const defaultValue = new _configvariables.ConfigVariables()[key];
            jest.spyOn(configService, 'get').mockReturnValue(expectedValue);
            const result = driver.get(key);
            expect(result).toBe(expectedValue);
            expect(configService.get).toHaveBeenCalledWith(key, defaultValue);
        });
        it('should return default value when config service returns undefined', ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const defaultValue = new _configvariables.ConfigVariables()[key];
            jest.spyOn(configService, 'get').mockImplementation((_, defaultVal)=>defaultVal);
            const result = driver.get(key);
            expect(result).toBe(defaultValue);
            expect(configService.get).toHaveBeenCalledWith(key, defaultValue);
        });
        it('should handle different config variable types', ()=>{
            const booleanKey = 'AUTH_PASSWORD_ENABLED';
            const stringKey = 'EMAIL_FROM_ADDRESS';
            const numberKey = 'NODE_PORT';
            const defaultValues = new _configvariables.ConfigVariables();
            jest.spyOn(configService, 'get').mockImplementation((key)=>{
                switch(key){
                    case booleanKey:
                        return true;
                    case stringKey:
                        return 'test@example.com';
                    case numberKey:
                        return 3000;
                    default:
                        return undefined;
                }
            });
            expect(driver.get(booleanKey)).toBe(true);
            expect(configService.get).toHaveBeenCalledWith(booleanKey, defaultValues[booleanKey]);
            expect(driver.get(stringKey)).toBe('test@example.com');
            expect(configService.get).toHaveBeenCalledWith(stringKey, defaultValues[stringKey]);
            expect(driver.get(numberKey)).toBe(3000);
            expect(configService.get).toHaveBeenCalledWith(numberKey, defaultValues[numberKey]);
        });
    });
});

//# sourceMappingURL=environment-config.driver.spec.js.map