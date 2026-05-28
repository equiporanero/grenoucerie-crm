"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _testing = require("@nestjs/testing");
const _core = require("@nestjs/core");
const _upgradesequencereaderservice = require("../upgrade-sequence-reader.service");
const _upgradecommandregistryservice = require("../upgrade-command-registry.service");
const _registeredworkspacecommanddecorator = require("../../decorators/registered-workspace-command.decorator");
const _twentycurrentversionconstant = require("../../constants/twenty-current-version.constant");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const VERSION = _twentycurrentversionconstant.TWENTY_CURRENT_VERSION;
let MinimalWorkspaceCommand = class MinimalWorkspaceCommand {
    async runOnWorkspace() {}
};
MinimalWorkspaceCommand = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)(VERSION, 1770000000000)
], MinimalWorkspaceCommand);
const buildProviderWrapper = (instance)=>({
        instance,
        metatype: instance.constructor
    });
const buildServiceWithMockedSequence = async (mockSequence)=>{
    const module = await _testing.Test.createTestingModule({
        providers: [
            _upgradesequencereaderservice.UpgradeSequenceReaderService,
            _upgradecommandregistryservice.UpgradeCommandRegistryService,
            {
                provide: _core.DiscoveryService,
                useValue: {
                    getProviders: ()=>[
                            new MinimalWorkspaceCommand()
                        ].map(buildProviderWrapper)
                }
            }
        ]
    }).compile();
    const registryService = module.get(_upgradecommandregistryservice.UpgradeCommandRegistryService);
    registryService.onModuleInit();
    const service = module.get(_upgradesequencereaderservice.UpgradeSequenceReaderService);
    jest.spyOn(service, 'getUpgradeSequence').mockReturnValue(mockSequence);
    return service;
};
const noopAsync = async ()=>{};
const makeStep = (kind, name)=>{
    const command = kind === 'workspace' ? {
        runOnWorkspace: noopAsync
    } : kind === 'slow-instance' ? {
        up: noopAsync,
        down: noopAsync,
        runDataMigration: noopAsync
    } : {
        up: noopAsync,
        down: noopAsync
    };
    return {
        kind,
        name,
        command,
        version: VERSION,
        timestamp: 0
    };
};
const makeFastInstance = (name)=>makeStep('fast-instance', name);
const makeWorkspace = (name)=>makeStep('workspace', name);
describe('UpgradeSequenceReaderService', ()=>{
    describe('getInitialCursorForNewWorkspace', ()=>{
        it('should return last workspace command of segment following completed instance command', async ()=>{
            const sequence = [
                makeFastInstance('Ic0'),
                makeWorkspace('Wc0'),
                makeWorkspace('Wc1'),
                makeWorkspace('Wc2')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic0',
                status: 'completed'
            });
            expect(result).toEqual({
                name: 'Wc2',
                status: 'completed'
            });
        });
        it('should return the instance command itself when next step is another instance command', async ()=>{
            const sequence = [
                makeWorkspace('Wc-1'),
                makeFastInstance('Ic0'),
                makeFastInstance('Ic1'),
                makeWorkspace('Wc0'),
                makeWorkspace('Wc1')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic0',
                status: 'completed'
            });
            expect(result).toEqual({
                name: 'Ic0',
                status: 'completed'
            });
        });
        it('should return last workspace command when all instance commands in batch are completed', async ()=>{
            const sequence = [
                makeWorkspace('Wc-1'),
                makeFastInstance('Ic0'),
                makeFastInstance('Ic1'),
                makeWorkspace('Wc0'),
                makeWorkspace('Wc1')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic1',
                status: 'completed'
            });
            expect(result).toEqual({
                name: 'Wc1',
                status: 'completed'
            });
        });
        it('should stop at next instance command boundary', async ()=>{
            const sequence = [
                makeFastInstance('Ic0'),
                makeWorkspace('Wc0'),
                makeWorkspace('Wc1'),
                makeFastInstance('Ic1'),
                makeWorkspace('Wc2')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic0',
                status: 'completed'
            });
            expect(result).toEqual({
                name: 'Wc1',
                status: 'completed'
            });
        });
        it('should return the instance command itself when at end of sequence', async ()=>{
            const sequence = [
                makeWorkspace('Wc0'),
                makeFastInstance('Ic0')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic0',
                status: 'completed'
            });
            expect(result).toEqual({
                name: 'Ic0',
                status: 'completed'
            });
        });
        it('should return the instance command itself when no workspace command exists before it', async ()=>{
            const sequence = [
                makeFastInstance('Ic0'),
                makeFastInstance('Ic1'),
                makeWorkspace('Wc0')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic0',
                status: 'completed'
            });
            expect(result).toEqual({
                name: 'Ic0',
                status: 'completed'
            });
        });
        it('should return final segment when last instance command is completed', async ()=>{
            const sequence = [
                makeWorkspace('Wc0'),
                makeFastInstance('Ic0'),
                makeWorkspace('Wc1'),
                makeFastInstance('Ic1'),
                makeWorkspace('Wc2'),
                makeWorkspace('Wc3')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic1',
                status: 'completed'
            });
            expect(result).toEqual({
                name: 'Wc3',
                status: 'completed'
            });
        });
        it('should handle single workspace command in segment', async ()=>{
            const sequence = [
                makeFastInstance('Ic0'),
                makeWorkspace('Wc0'),
                makeFastInstance('Ic1'),
                makeWorkspace('Wc1')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic0',
                status: 'completed'
            });
            expect(result).toEqual({
                name: 'Wc0',
                status: 'completed'
            });
        });
        it('should return the instance command itself when sequence ends with instance commands batch', async ()=>{
            const sequence = [
                makeFastInstance('Ic0'),
                makeWorkspace('Wc0'),
                makeWorkspace('Wc1'),
                makeFastInstance('Ic1'),
                makeFastInstance('Ic2')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic2',
                status: 'completed'
            });
            expect(result).toEqual({
                name: 'Ic2',
                status: 'completed'
            });
        });
        it('should return the failed instance command when IC failed — not skip forward to WC segment', async ()=>{
            // Sequence: Ic0 → Ic1 → Wc0 → Wc1
            // Ic1 failed → cursor stays at Ic1:failed (does NOT skip to Wc1)
            const sequence = [
                makeFastInstance('Ic0'),
                makeFastInstance('Ic1'),
                makeWorkspace('Wc0'),
                makeWorkspace('Wc1')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic1',
                status: 'failed'
            });
            expect(result).toEqual({
                name: 'Ic1',
                status: 'failed'
            });
        });
        it('should return the failed instance command even when next step is a workspace command', async ()=>{
            // Sequence: Ic0 → Wc0 → Wc1
            // Ic0 failed → cursor stays at Ic0:failed
            const sequence = [
                makeFastInstance('Ic0'),
                makeWorkspace('Wc0'),
                makeWorkspace('Wc1')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic0',
                status: 'failed'
            });
            expect(result).toEqual({
                name: 'Ic0',
                status: 'failed'
            });
        });
        it('should return the failed mid-segment instance command', async ()=>{
            // Sequence: Ic0 → Ic1 → Ic2 → Wc0
            // Ic1 failed (Ic0 completed but Ic1 is the last attempted) → cursor at Ic1:failed
            const sequence = [
                makeFastInstance('Ic0'),
                makeFastInstance('Ic1'),
                makeFastInstance('Ic2'),
                makeWorkspace('Wc0')
            ];
            const service = await buildServiceWithMockedSequence(sequence);
            const result = service.getInitialCursorForNewWorkspace({
                name: 'Ic1',
                status: 'failed'
            });
            expect(result).toEqual({
                name: 'Ic1',
                status: 'failed'
            });
        });
    });
});

//# sourceMappingURL=upgrade-sequence-reader.service.spec.js.map