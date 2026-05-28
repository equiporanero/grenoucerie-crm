"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _maintenancemodeservice = require("../admin-panel/maintenance-mode.service");
const _clientconfigresolver = require("./client-config.resolver");
describe('ClientConfigResolver', ()=>{
    let resolver;
    let maintenanceModeService;
    const mockUser = {
        id: 'user-id'
    };
    const mockWorkspace = {
        id: 'workspace-id'
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _clientconfigresolver.ClientConfigResolver,
                {
                    provide: _maintenancemodeservice.MaintenanceModeService,
                    useValue: {
                        dismissMaintenanceModeBanner: jest.fn(),
                        isMaintenanceModeBannerDismissed: jest.fn()
                    }
                }
            ]
        }).compile();
        resolver = module.get(_clientconfigresolver.ClientConfigResolver);
        maintenanceModeService = module.get(_maintenancemodeservice.MaintenanceModeService);
    });
    it('should be defined', ()=>{
        expect(resolver).toBeDefined();
    });
    it('should return dismissal state from maintenance mode service', async ()=>{
        jest.spyOn(maintenanceModeService, 'isMaintenanceModeBannerDismissed').mockResolvedValue(true);
        const result = await resolver.isMaintenanceModeBannerDismissed(mockUser, mockWorkspace);
        expect(result).toBe(true);
        expect(maintenanceModeService.isMaintenanceModeBannerDismissed).toHaveBeenCalledWith(mockUser.id, mockWorkspace.id);
    });
    it('should persist dismissal through maintenance mode service', async ()=>{
        jest.spyOn(maintenanceModeService, 'dismissMaintenanceModeBanner').mockResolvedValue();
        const result = await resolver.dismissMaintenanceModeBanner(mockUser, mockWorkspace);
        expect(result).toBe(true);
        expect(maintenanceModeService.dismissMaintenanceModeBanner).toHaveBeenCalledWith(mockUser.id, mockWorkspace.id);
    });
});

//# sourceMappingURL=client-config.resolver.spec.js.map