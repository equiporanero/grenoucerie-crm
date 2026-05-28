"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _exceptionhandlerconstants = require("../exception-handler.constants");
const _exceptionhandlerservice = require("../exception-handler.service");
describe('ExceptionHandlerService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _exceptionhandlerservice.ExceptionHandlerService,
                {
                    provide: _exceptionhandlerconstants.EXCEPTION_HANDLER_DRIVER,
                    useValue: {}
                }
            ]
        }).compile();
        service = module.get(_exceptionhandlerservice.ExceptionHandlerService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=exception-handler.service.spec.js.map