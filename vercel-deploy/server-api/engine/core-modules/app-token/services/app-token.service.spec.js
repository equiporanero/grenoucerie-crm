"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _apptokenservice = require("./app-token.service");
const _apptokenentity = require("../app-token.entity");
describe('AppTokenService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _apptokenservice.AppTokenService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity),
                    useValue: {}
                }
            ]
        }).compile();
        service = module.get(_apptokenservice.AppTokenService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=app-token.service.spec.js.map