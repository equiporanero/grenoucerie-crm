"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _testing = require("@nestjs/testing");
const _core = require("@nestjs/core");
const _upgradecommandregistryservice = require("../upgrade-command-registry.service");
const _registeredinstancecommanddecorator = require("../../decorators/registered-instance-command.decorator");
const _registeredworkspacecommanddecorator = require("../../decorators/registered-workspace-command.decorator");
const _twentycurrentversionconstant = require("../../constants/twenty-current-version.constant");
const _twentypreviousversionsconstant = require("../../constants/twenty-previous-versions.constant");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const VERSION_A = _twentycurrentversionconstant.TWENTY_CURRENT_VERSION;
const VERSION_B = _twentypreviousversionsconstant.TWENTY_PREVIOUS_VERSIONS[0];
let MigrationA1770000000000 = class MigrationA1770000000000 {
    async up() {}
    async down() {}
    constructor(){
        this.name = 'MigrationA1770000000000';
    }
};
MigrationA1770000000000 = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1770000000000)
], MigrationA1770000000000);
let MigrationB1771000000000 = class MigrationB1771000000000 {
    async up() {}
    async down() {}
    constructor(){
        this.name = 'MigrationB1771000000000';
    }
};
MigrationB1771000000000 = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1771000000000)
], MigrationB1771000000000);
let MigrationC1772000000000 = class MigrationC1772000000000 {
    async up() {}
    async down() {}
    constructor(){
        this.name = 'MigrationC1772000000000';
    }
};
MigrationC1772000000000 = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1772000000000)
], MigrationC1772000000000);
let MigrationD1769000000000 = class MigrationD1769000000000 {
    async up() {}
    async down() {}
    constructor(){
        this.name = 'MigrationD1769000000000';
    }
};
MigrationD1769000000000 = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_B, 1769000000000)
], MigrationD1769000000000);
let UndecoratedMigration1768000000000 = class UndecoratedMigration1768000000000 {
    async up() {}
    async down() {}
    constructor(){
        this.name = 'UndecoratedMigration1768000000000';
    }
};
let WorkspaceCommandA = class WorkspaceCommandA {
    async runOnWorkspace() {}
};
WorkspaceCommandA = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)(VERSION_A, 1773000000000)
], WorkspaceCommandA);
let WorkspaceCommandB = class WorkspaceCommandB {
    async runOnWorkspace() {}
};
WorkspaceCommandB = _ts_decorate([
    (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)(VERSION_A, 1774000000000)
], WorkspaceCommandB);
const buildProviderWrapper = (instance)=>({
        instance,
        metatype: instance.constructor
    });
const buildRegistryService = async (instances)=>{
    const module = await _testing.Test.createTestingModule({
        providers: [
            _upgradecommandregistryservice.UpgradeCommandRegistryService,
            {
                provide: _core.DiscoveryService,
                useValue: {
                    getProviders: ()=>instances.map(buildProviderWrapper)
                }
            }
        ]
    }).compile();
    const service = module.get(_upgradecommandregistryservice.UpgradeCommandRegistryService);
    service.onModuleInit();
    return service;
};
describe('UpgradeCommandRegistryService', ()=>{
    it('should group instance migrations by version', async ()=>{
        const service = await buildRegistryService([
            new MigrationD1769000000000(),
            new MigrationA1770000000000(),
            new MigrationB1771000000000(),
            new MigrationC1772000000000(),
            new WorkspaceCommandA()
        ]);
        const bundleB = service.getBundleForVersion(VERSION_B);
        const bundleA = service.getBundleForVersion(VERSION_A);
        expect(bundleB.fastInstanceCommands.map((entry)=>entry.command.constructor.name)).toStrictEqual([
            'MigrationD1769000000000'
        ]);
        expect(bundleA.fastInstanceCommands.map((entry)=>entry.command.constructor.name)).toStrictEqual([
            'MigrationA1770000000000',
            'MigrationB1771000000000',
            'MigrationC1772000000000'
        ]);
    });
    it('should sort migrations by timestamp within a version bucket', async ()=>{
        const service = await buildRegistryService([
            new MigrationC1772000000000(),
            new MigrationA1770000000000(),
            new MigrationB1771000000000(),
            new WorkspaceCommandA()
        ]);
        const names = service.getBundleForVersion(VERSION_A).fastInstanceCommands.map((entry)=>entry.command.constructor.name);
        expect(names).toStrictEqual([
            'MigrationA1770000000000',
            'MigrationB1771000000000',
            'MigrationC1772000000000'
        ]);
    });
    it('should skip undecorated providers', async ()=>{
        const service = await buildRegistryService([
            new UndecoratedMigration1768000000000(),
            new MigrationA1770000000000(),
            new WorkspaceCommandA()
        ]);
        const bundleA = service.getBundleForVersion(VERSION_A);
        expect(bundleA.fastInstanceCommands).toHaveLength(1);
        expect(bundleA.fastInstanceCommands[0].command.constructor.name).toBe('MigrationA1770000000000');
    });
    it('should throw when no workspace commands are discovered', async ()=>{
        await expect(buildRegistryService([])).rejects.toThrow('Upgrade sequence must contain at least one workspace command');
    });
    it('should return empty array for unsupported version', async ()=>{
        const service = await buildRegistryService([
            new WorkspaceCommandA()
        ]);
        expect(service.getBundleForVersion('99.0.0').fastInstanceCommands).toStrictEqual([]);
    });
    it('should discover workspace commands and sort by timestamp', async ()=>{
        const service = await buildRegistryService([
            new WorkspaceCommandB(),
            new WorkspaceCommandA()
        ]);
        const { workspaceCommands } = service.getBundleForVersion(VERSION_A);
        expect(workspaceCommands.map((entry)=>entry.command.constructor.name)).toStrictEqual([
            'WorkspaceCommandA',
            'WorkspaceCommandB'
        ]);
    });
    it('should discover both instance and workspace commands for the same version', async ()=>{
        const service = await buildRegistryService([
            new MigrationA1770000000000(),
            new WorkspaceCommandA(),
            new MigrationB1771000000000(),
            new WorkspaceCommandB()
        ]);
        const bucket = service.getBundleForVersion(VERSION_A);
        expect(bucket.fastInstanceCommands).toHaveLength(2);
        expect(bucket.workspaceCommands).toHaveLength(2);
    });
    it('should allow same timestamp across different kinds', async ()=>{
        let WorkspaceCommandSameTimestamp = class WorkspaceCommandSameTimestamp {
            async runOnWorkspace() {}
        };
        WorkspaceCommandSameTimestamp = _ts_decorate([
            (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)(VERSION_A, 1770000000000)
        ], WorkspaceCommandSameTimestamp);
        const service = await buildRegistryService([
            new MigrationA1770000000000(),
            new WorkspaceCommandSameTimestamp()
        ]);
        const bucket = service.getBundleForVersion(VERSION_A);
        expect(bucket.fastInstanceCommands).toHaveLength(1);
        expect(bucket.workspaceCommands).toHaveLength(1);
    });
    it('should throw on duplicate timestamps within the same kind', async ()=>{
        let DuplicateInstanceTimestamp = class DuplicateInstanceTimestamp {
            async up() {}
            async down() {}
            constructor(){
                this.name = 'DuplicateInstanceTimestamp';
            }
        };
        DuplicateInstanceTimestamp = _ts_decorate([
            (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1770000000000)
        ], DuplicateInstanceTimestamp);
        await expect(buildRegistryService([
            new MigrationA1770000000000(),
            new DuplicateInstanceTimestamp()
        ])).rejects.toThrow('Duplicate fast-instance command timestamp 1770000000000');
    });
    it('should throw on duplicate computed names across kinds', async ()=>{
        let MigrationA1770000000000_WS = class MigrationA1770000000000_WS {
            async runOnWorkspace() {}
        };
        MigrationA1770000000000_WS = _ts_decorate([
            (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)(VERSION_A, 1770000000000)
        ], MigrationA1770000000000_WS);
        Object.defineProperty(MigrationA1770000000000_WS, 'name', {
            value: 'MigrationA1770000000000'
        });
        await expect(buildRegistryService([
            new MigrationA1770000000000(),
            new MigrationA1770000000000_WS()
        ])).rejects.toThrow(`Duplicate upgrade command name "${VERSION_A}_MigrationA1770000000000_1770000000000"`);
    });
    it('should return all instance commands across versions sorted by timestamp', async ()=>{
        const service = await buildRegistryService([
            new MigrationC1772000000000(),
            new MigrationD1769000000000(),
            new MigrationA1770000000000(),
            new MigrationB1771000000000(),
            new WorkspaceCommandA()
        ]);
        const allCommands = service.getCrossUpgradeSupportedFastInstanceCommands();
        expect(allCommands.map((entry)=>entry.name)).toStrictEqual([
            `${VERSION_B}_MigrationD1769000000000_1769000000000`,
            `${VERSION_A}_MigrationA1770000000000_1770000000000`,
            `${VERSION_A}_MigrationB1771000000000_1771000000000`,
            `${VERSION_A}_MigrationC1772000000000_1772000000000`
        ]);
    });
    it('should return empty array from getCrossUpgradeSupportedFastInstanceCommands when no instance commands registered', async ()=>{
        const service = await buildRegistryService([
            new WorkspaceCommandA()
        ]);
        expect(service.getCrossUpgradeSupportedFastInstanceCommands()).toStrictEqual([]);
    });
    it('should allow same class name with different timestamps across kinds', async ()=>{
        let MigrationA1770000000000_WS = class MigrationA1770000000000_WS {
            async runOnWorkspace() {}
        };
        MigrationA1770000000000_WS = _ts_decorate([
            (0, _registeredworkspacecommanddecorator.RegisteredWorkspaceCommand)(VERSION_A, 1790000000000)
        ], MigrationA1770000000000_WS);
        Object.defineProperty(MigrationA1770000000000_WS, 'name', {
            value: 'MigrationA1770000000000'
        });
        const service = await buildRegistryService([
            new MigrationA1770000000000(),
            new MigrationA1770000000000_WS()
        ]);
        const bucket = service.getBundleForVersion(VERSION_A);
        expect(bucket.fastInstanceCommands).toHaveLength(1);
        expect(bucket.workspaceCommands).toHaveLength(1);
    });
    it('should discover slow instance commands and sort by timestamp', async ()=>{
        let SlowMigrationB1780000000000 = class SlowMigrationB1780000000000 {
            async runDataMigration(_dataSource) {}
            async up() {}
            async down() {}
            constructor(){
                this.name = 'SlowMigrationB1780000000000';
            }
        };
        SlowMigrationB1780000000000 = _ts_decorate([
            (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1780000000000, {
                type: 'slow'
            })
        ], SlowMigrationB1780000000000);
        let SlowMigrationA1779000000000 = class SlowMigrationA1779000000000 {
            async runDataMigration(_dataSource) {}
            async up() {}
            async down() {}
            constructor(){
                this.name = 'SlowMigrationA1779000000000';
            }
        };
        SlowMigrationA1779000000000 = _ts_decorate([
            (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1779000000000, {
                type: 'slow'
            })
        ], SlowMigrationA1779000000000);
        const service = await buildRegistryService([
            new SlowMigrationB1780000000000(),
            new SlowMigrationA1779000000000(),
            new WorkspaceCommandA()
        ]);
        const { slowInstanceCommands } = service.getBundleForVersion(VERSION_A);
        expect(slowInstanceCommands.map((entry)=>entry.command.constructor.name)).toStrictEqual([
            'SlowMigrationA1779000000000',
            'SlowMigrationB1780000000000'
        ]);
    });
    it('should separate fast and slow instance commands in the same version', async ()=>{
        let SlowMigration1780000000000 = class SlowMigration1780000000000 {
            async runDataMigration(_dataSource) {}
            async up() {}
            async down() {}
            constructor(){
                this.name = 'SlowMigration1780000000000';
            }
        };
        SlowMigration1780000000000 = _ts_decorate([
            (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1780000000000, {
                type: 'slow'
            })
        ], SlowMigration1780000000000);
        const service = await buildRegistryService([
            new MigrationA1770000000000(),
            new SlowMigration1780000000000(),
            new WorkspaceCommandA()
        ]);
        const bucket = service.getBundleForVersion(VERSION_A);
        expect(bucket.fastInstanceCommands).toHaveLength(1);
        expect(bucket.slowInstanceCommands).toHaveLength(1);
    });
    it('should throw on duplicate timestamps within slow instance commands', async ()=>{
        let SlowMigrationA1780000000000 = class SlowMigrationA1780000000000 {
            async runDataMigration(_dataSource) {}
            async up() {}
            async down() {}
            constructor(){
                this.name = 'SlowMigrationA1780000000000';
            }
        };
        SlowMigrationA1780000000000 = _ts_decorate([
            (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1780000000000, {
                type: 'slow'
            })
        ], SlowMigrationA1780000000000);
        let SlowMigrationB1780000000000 = class SlowMigrationB1780000000000 {
            async runDataMigration(_dataSource) {}
            async up() {}
            async down() {}
            constructor(){
                this.name = 'SlowMigrationB1780000000000';
            }
        };
        SlowMigrationB1780000000000 = _ts_decorate([
            (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1780000000000, {
                type: 'slow'
            })
        ], SlowMigrationB1780000000000);
        await expect(buildRegistryService([
            new SlowMigrationA1780000000000(),
            new SlowMigrationB1780000000000()
        ])).rejects.toThrow('Duplicate slow-instance command timestamp 1780000000000');
    });
    it('should allow same timestamp across fast and slow instance commands', async ()=>{
        let SlowMigrationSameTimestamp = class SlowMigrationSameTimestamp {
            async runDataMigration(_dataSource) {}
            async up() {}
            async down() {}
            constructor(){
                this.name = 'SlowMigrationSameTimestamp';
            }
        };
        SlowMigrationSameTimestamp = _ts_decorate([
            (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1770000000000, {
                type: 'slow'
            })
        ], SlowMigrationSameTimestamp);
        const service = await buildRegistryService([
            new MigrationA1770000000000(),
            new SlowMigrationSameTimestamp(),
            new WorkspaceCommandA()
        ]);
        const bucket = service.getBundleForVersion(VERSION_A);
        expect(bucket.fastInstanceCommands).toHaveLength(1);
        expect(bucket.slowInstanceCommands).toHaveLength(1);
    });
    it('should return all slow instance commands across versions', async ()=>{
        let SlowMigration1780000000000 = class SlowMigration1780000000000 {
            async runDataMigration(_dataSource) {}
            async up() {}
            async down() {}
            constructor(){
                this.name = 'SlowMigration1780000000000';
            }
        };
        SlowMigration1780000000000 = _ts_decorate([
            (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_A, 1780000000000, {
                type: 'slow'
            })
        ], SlowMigration1780000000000);
        let SlowMigration1768000000000 = class SlowMigration1768000000000 {
            async runDataMigration(_dataSource) {}
            async up() {}
            async down() {}
            constructor(){
                this.name = 'SlowMigration1768000000000';
            }
        };
        SlowMigration1768000000000 = _ts_decorate([
            (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)(VERSION_B, 1768000000000, {
                type: 'slow'
            })
        ], SlowMigration1768000000000);
        const service = await buildRegistryService([
            new SlowMigration1780000000000(),
            new SlowMigration1768000000000(),
            new WorkspaceCommandA()
        ]);
        const allSlowCommands = service.getCrossUpgradeSupportedSlowInstanceCommands();
        expect(allSlowCommands.map((entry)=>entry.name)).toStrictEqual([
            `${VERSION_B}_SlowMigration1768000000000_1768000000000`,
            `${VERSION_A}_SlowMigration1780000000000_1780000000000`
        ]);
    });
});

//# sourceMappingURL=upgrade-command-registry.service.spec.js.map