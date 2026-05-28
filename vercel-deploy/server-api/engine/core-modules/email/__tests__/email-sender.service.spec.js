"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _emaildriverfactory = require("../email-driver.factory");
const _emailsenderservice = require("../email-sender.service");
describe('EmailSenderService', ()=>{
    let service;
    let emailDriverFactory;
    const mockEmailDriverFactory = {
        getCurrentDriver: jest.fn()
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _emailsenderservice.EmailSenderService,
                {
                    provide: _emaildriverfactory.EmailDriverFactory,
                    useValue: mockEmailDriverFactory
                }
            ]
        }).compile();
        service = module.get(_emailsenderservice.EmailSenderService);
        emailDriverFactory = module.get(_emaildriverfactory.EmailDriverFactory);
        jest.clearAllMocks();
    });
    describe('send', ()=>{
        it('should delegate to the current driver', async ()=>{
            const mockDriver = {
                send: jest.fn().mockResolvedValue(undefined)
            };
            mockEmailDriverFactory.getCurrentDriver.mockReturnValue(mockDriver);
            const sendMailOptions = {
                to: 'test@example.com',
                subject: 'Test',
                text: 'Test message'
            };
            await service.send(sendMailOptions);
            expect(emailDriverFactory.getCurrentDriver).toHaveBeenCalled();
            expect(mockDriver.send).toHaveBeenCalledWith(sendMailOptions);
        });
        it('should handle driver errors', async ()=>{
            const mockDriver = {
                send: jest.fn().mockRejectedValue(new Error('Driver error'))
            };
            mockEmailDriverFactory.getCurrentDriver.mockReturnValue(mockDriver);
            const sendMailOptions = {
                to: 'test@example.com',
                subject: 'Test',
                text: 'Test message'
            };
            await expect(service.send(sendMailOptions)).rejects.toThrow('Driver error');
            expect(emailDriverFactory.getCurrentDriver).toHaveBeenCalled();
            expect(mockDriver.send).toHaveBeenCalledWith(sendMailOptions);
        });
    });
});

//# sourceMappingURL=email-sender.service.spec.js.map