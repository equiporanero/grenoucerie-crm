"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _terminus = require("@nestjs/terminus");
const _testing = require("@nestjs/testing");
const _healthcontroller = require("../health.controller");
describe('HealthController', ()=>{
    let healthController;
    beforeEach(async ()=>{
        const testingModule = await _testing.Test.createTestingModule({
            controllers: [
                _healthcontroller.HealthController
            ],
            providers: [
                {
                    provide: _terminus.HealthCheckService,
                    useValue: {
                        check: jest.fn()
                    }
                }
            ]
        }).compile();
        healthController = testingModule.get(_healthcontroller.HealthController);
    });
    it('should be defined', ()=>{
        expect(healthController).toBeDefined();
    });
});

//# sourceMappingURL=health.controller.spec.js.map