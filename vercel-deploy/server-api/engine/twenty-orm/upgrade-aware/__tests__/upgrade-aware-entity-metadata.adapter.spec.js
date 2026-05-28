"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _wasintroducedinupgradedecorator = require("../../../core-modules/upgrade/decorators/was-introduced-in-upgrade.decorator");
const _wasremovedinupgradedecorator = require("../../../core-modules/upgrade/decorators/was-removed-in-upgrade.decorator");
const _wasrenamedinupgradedecorator = require("../../../core-modules/upgrade/decorators/was-renamed-in-upgrade.decorator");
const _upgrademigrationservice = require("../../../core-modules/upgrade/services/upgrade-migration.service");
const _upgradesequencereaderservice = require("../../../core-modules/upgrade/services/upgrade-sequence-reader.service");
const _upgradeawareentitymetadataadapter = require("../upgrade-aware-entity-metadata.adapter");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const RENAME_STEP = '2.6.0_Rename_1700000000000';
const INTRODUCE_STEP = '2.7.0_AddColumn_1800000000000';
const REMOVE_STEP = '2.7.0_DropColumn_1800000000001';
let RenamedEntity = class RenamedEntity {
};
RenamedEntity = _ts_decorate([
    (0, _wasrenamedinupgradedecorator.WasRenamedInUpgrade)([
        {
            previousName: 'oldEntity',
            upgradeCommandName: RENAME_STEP
        }
    ])
], RenamedEntity);
let EntityWithHideableColumns = class EntityWithHideableColumns {
};
_ts_decorate([
    (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
        upgradeCommandName: INTRODUCE_STEP
    }),
    _ts_metadata("design:type", String)
], EntityWithHideableColumns.prototype, "introducedColumn", void 0);
_ts_decorate([
    (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
        upgradeCommandName: REMOVE_STEP
    }),
    _ts_metadata("design:type", String)
], EntityWithHideableColumns.prototype, "removedColumn", void 0);
const buildColumn = (propertyName)=>({
        propertyName,
        databaseName: propertyName,
        isSelect: true,
        isInsert: true,
        isUpdate: true
    });
describe('UpgradeAwareEntityMetadataAdapter', ()=>{
    it('rewrites tableName / tablePath / givenTableName when the rename step is not yet applied', async ()=>{
        const metadata = {
            target: RenamedEntity,
            tableName: 'newEntity',
            tablePath: 'core.newEntity',
            givenTableName: 'newEntity',
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
                                name: RENAME_STEP
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
        expect(metadata.tableName).toBe('oldEntity');
        expect(metadata.tablePath).toBe('core.oldEntity');
        expect(metadata.givenTableName).toBe('oldEntity');
    });
    it('disables isSelect, isInsert and isUpdate for hidden columns (intro pending + removal applied) while leaving the visible sibling untouched', async ()=>{
        const introducedColumn = buildColumn('introducedColumn');
        const removedColumn = buildColumn('removedColumn');
        const visibleColumn = buildColumn('visibleColumn');
        const metadata = {
            target: EntityWithHideableColumns,
            tableName: 'entityWithHideableColumns',
            tablePath: 'core.entityWithHideableColumns',
            givenTableName: 'entityWithHideableColumns',
            schema: 'core',
            columns: [
                introducedColumn,
                removedColumn,
                visibleColumn
            ]
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
                        getLastAttemptedInstanceCommand: jest.fn().mockResolvedValue({
                            name: REMOVE_STEP,
                            status: 'completed'
                        })
                    }
                },
                {
                    provide: _upgradesequencereaderservice.UpgradeSequenceReaderService,
                    useValue: {
                        getUpgradeSequence: jest.fn().mockReturnValue([
                            {
                                name: REMOVE_STEP
                            },
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
        expect(introducedColumn.isSelect).toBe(false);
        expect(introducedColumn.isInsert).toBe(false);
        expect(introducedColumn.isUpdate).toBe(false);
        expect(removedColumn.isSelect).toBe(false);
        expect(removedColumn.isInsert).toBe(false);
        expect(removedColumn.isUpdate).toBe(false);
        expect(visibleColumn.isSelect).toBe(true);
        expect(visibleColumn.isInsert).toBe(true);
        expect(visibleColumn.isUpdate).toBe(true);
        expect(metadata.columns).toEqual([
            visibleColumn
        ]);
    });
});

//# sourceMappingURL=upgrade-aware-entity-metadata.adapter.spec.js.map