"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _loggerconstants = require("../logger.constants");
const _loggerservice = require("../logger.service");
describe('LoggerService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _loggerservice.LoggerService,
                {
                    provide: _loggerconstants.LOGGER_DRIVER,
                    useValue: {}
                }
            ]
        }).compile();
        service = module.get(_loggerservice.LoggerService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=logger.service.spec.js.map