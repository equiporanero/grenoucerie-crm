"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _wasintroducedinupgradedecorator = require("../../../core-modules/upgrade/decorators/was-introduced-in-upgrade.decorator");
const _upgrademigrationservice = require("../../../core-modules/upgrade/services/upgrade-migration.service");
const _upgradesequencereaderservice = require("../../../core-modules/upgrade/services/upgrade-sequence-reader.service");
const _upgradeawareentitymetadataadapter = require("../upgrade-aware-entity-metadata.adapter");
const _upgradeawarerepositorystate = require("../upgrade-aware-repository-state");
const _upgradeawarerepositoryproxy = require("../upgrade-aware-repository.proxy");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const INTRODUCE_STEP = '2.7.0_Introduce_1800000000000';
let UnavailableEntity = class UnavailableEntity {
};
UnavailableEntity = _ts_decorate([
    (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
        upgradeCommandName: INTRODUCE_STEP
    })
], UnavailableEntity);
describe('wrapRepositoryWithUpgradeAwareProxy', ()=>{
    it('short-circuits find() to an empty array when the entity is unavailable', async ()=>{
        const metadata = {
            target: UnavailableEntity,
            tableName: 'unavailableEntity',
            tablePath: 'core.unavailableEntity',
            givenTableName: 'unavailableEntity',
            schema: 'core',
            columns: []
        };
        const dataSource = {
            entityMetadatas: [
                metadata
            ]
        };
        const moduleRef = await _testing.Test.createTestingModule({
            providers: [
                _upgradeawareentitymetadataadapter.UpgradeAwareEntityMetadataAdapter,
                {
                    provide: _upgrademigrationservice.UpgradeMigrationService,
                    useValue: {
                        getLastAttemptedInstanceCommand: jest.fn().mockResolvedValue(null)
                    }
                },
                {
                    provide: _upgradesequencereaderservice.UpgradeSequenceReaderService,
                    useValue: {
                        getUpgradeSequence: jest.fn().mockReturnValue([
                            {
                                name: INTRODUCE_STEP
                            }
                        ])
                    }
                },
                {
                    provide: (0, _typeorm.getDataSourceToken)(),
                    useValue: dataSource
                }
            ]
        }).compile();
        const adapter = moduleRef.get(_upgradeawareentitymetadataadapter.UpgradeAwareEntityMetadataAdapter);
        await adapter.onModuleInit();
        await adapter.refresh();
        const find = jest.fn().mockResolvedValue([
            {
                id: 1
            }
        ]);
        const repository = {
            find
        };
        const wrapped = (0, _upgradeawarerepositoryproxy.wrapRepositoryWithUpgradeAwareProxy)({
            repository,
            entityClass: UnavailableEntity,
            state: _upgradeawarerepositorystate.UpgradeAwareRepositoryState.getInstance()
        });
        await expect(wrapped.find()).resolves.toEqual([]);
        expect(find).not.toHaveBeenCalled();
    });
});

//# sourceMappingURL=upgrade-aware-repository.proxy.spec.js.map