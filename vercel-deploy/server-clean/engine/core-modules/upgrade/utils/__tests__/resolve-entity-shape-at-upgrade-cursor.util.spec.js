"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _wasintroducedinupgradedecorator = require("../../decorators/was-introduced-in-upgrade.decorator");
const _wasremovedinupgradedecorator = require("../../decorators/was-removed-in-upgrade.decorator");
const _wasrenamedinupgradedecorator = require("../../decorators/was-renamed-in-upgrade.decorator");
const _resolveentityshapeatupgradecursorutil = require("../resolve-entity-shape-at-upgrade-cursor.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const INTRODUCE_CMD = '2.7.0_IntroduceCommand_1800000000000';
const RENAME_CMD = '2.6.0_RenameCommand_1700000000000';
const PROP_INTRODUCE_CMD = '2.7.0_AddColumnCommand_1800000000001';
const PROP_RENAME_CMD = '2.6.0_RenameColumnCommand_1700000000001';
const PROP_REMOVE_CMD = '2.7.0_DropColumnCommand_1800000000002';
const buildPredicate = (applied)=>{
    const set = new Set(applied);
    return (stepName)=>set.has(stepName);
};
describe('resolveEntityShapeAtUpgradeCursor', ()=>{
    describe('class-level @WasIntroducedInUpgrade', ()=>{
        let IntroducedEntity = class IntroducedEntity {
        };
        IntroducedEntity = _ts_decorate([
            (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
                upgradeCommandName: INTRODUCE_CMD
            })
        ], IntroducedEntity);
        it('should mark entity unavailable before its introduction step applied', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: IntroducedEntity,
                currentTableName: 'introducedEntity',
                currentColumns: [],
                isStepApplied: buildPredicate([])
            });
            expect(result.isAvailable).toBe(false);
        });
        it('should mark entity available once introduction applied', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: IntroducedEntity,
                currentTableName: 'introducedEntity',
                currentColumns: [],
                isStepApplied: buildPredicate([
                    INTRODUCE_CMD
                ])
            });
            expect(result.isAvailable).toBe(true);
        });
    });
    describe('class-level @WasRenamedInUpgrade', ()=>{
        let RenamedEntity = class RenamedEntity {
        };
        RenamedEntity = _ts_decorate([
            (0, _wasrenamedinupgradedecorator.WasRenamedInUpgrade)([
                {
                    previousName: 'oldEntity',
                    upgradeCommandName: RENAME_CMD
                }
            ])
        ], RenamedEntity);
        it('should report historical table name when rename not yet applied', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: RenamedEntity,
                currentTableName: 'newEntity',
                currentColumns: [],
                isStepApplied: buildPredicate([])
            });
            expect(result.effectiveTableName).toBe('oldEntity');
            expect(result.isAvailable).toBe(true);
        });
        it('should report current table name once rename applied', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: RenamedEntity,
                currentTableName: 'newEntity',
                currentColumns: [],
                isStepApplied: buildPredicate([
                    RENAME_CMD
                ])
            });
            expect(result.effectiveTableName).toBe('newEntity');
        });
        it('should walk a multi-step rename history chronologically', ()=>{
            const FIRST_RENAME_CMD = '2.5.0_FirstRename_1600000000000';
            const SECOND_RENAME_CMD = '2.6.0_SecondRename_1700000000000';
            let TwiceRenamedEntity = class TwiceRenamedEntity {
            };
            TwiceRenamedEntity = _ts_decorate([
                (0, _wasrenamedinupgradedecorator.WasRenamedInUpgrade)([
                    {
                        previousName: 'firstName',
                        upgradeCommandName: FIRST_RENAME_CMD
                    },
                    {
                        previousName: 'secondName',
                        upgradeCommandName: SECOND_RENAME_CMD
                    }
                ])
            ], TwiceRenamedEntity);
            expect((0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: TwiceRenamedEntity,
                currentTableName: 'thirdName',
                currentColumns: [],
                isStepApplied: buildPredicate([])
            }).effectiveTableName).toBe('firstName');
            expect((0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: TwiceRenamedEntity,
                currentTableName: 'thirdName',
                currentColumns: [],
                isStepApplied: buildPredicate([
                    FIRST_RENAME_CMD
                ])
            }).effectiveTableName).toBe('secondName');
            expect((0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: TwiceRenamedEntity,
                currentTableName: 'thirdName',
                currentColumns: [],
                isStepApplied: buildPredicate([
                    FIRST_RENAME_CMD,
                    SECOND_RENAME_CMD
                ])
            }).effectiveTableName).toBe('thirdName');
        });
    });
    describe('property-level decorators', ()=>{
        let EntityWithProperties = class EntityWithProperties {
        };
        _ts_decorate([
            (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
                upgradeCommandName: PROP_INTRODUCE_CMD
            }),
            _ts_metadata("design:type", String)
        ], EntityWithProperties.prototype, "newColumn", void 0);
        _ts_decorate([
            (0, _wasrenamedinupgradedecorator.WasRenamedInUpgrade)([
                {
                    previousName: 'oldColumn',
                    upgradeCommandName: PROP_RENAME_CMD
                }
            ]),
            _ts_metadata("design:type", String)
        ], EntityWithProperties.prototype, "renamedColumn", void 0);
        const currentColumns = [
            {
                propertyName: 'newColumn',
                databaseName: 'newColumn'
            },
            {
                propertyName: 'renamedColumn',
                databaseName: 'renamedColumn'
            },
            {
                propertyName: 'untouchedColumn',
                databaseName: 'untouchedColumn'
            }
        ];
        it('should hide not-yet-introduced columns and remap not-yet-renamed columns', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: EntityWithProperties,
                currentTableName: 'entityWithProperties',
                currentColumns,
                isStepApplied: buildPredicate([])
            });
            expect(result.hiddenPropertyNames).toEqual(new Set([
                'newColumn'
            ]));
            expect(Object.fromEntries(result.columnDatabaseNameRemap)).toEqual({
                renamedColumn: 'oldColumn'
            });
        });
        it('should leave both alone once both steps applied', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: EntityWithProperties,
                currentTableName: 'entityWithProperties',
                currentColumns,
                isStepApplied: buildPredicate([
                    PROP_INTRODUCE_CMD,
                    PROP_RENAME_CMD
                ])
            });
            expect(result.hiddenPropertyNames.size).toBe(0);
            expect(result.columnDatabaseNameRemap.size).toBe(0);
        });
        it('should leave undecorated columns untouched in all cases', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: EntityWithProperties,
                currentTableName: 'entityWithProperties',
                currentColumns,
                isStepApplied: buildPredicate([])
            });
            expect(result.hiddenPropertyNames.has('untouchedColumn')).toBe(false);
            expect(result.columnDatabaseNameRemap.has('untouchedColumn')).toBe(false);
        });
    });
    describe('property-level @WasRemovedInUpgrade', ()=>{
        let EntityWithRemovedColumn = class EntityWithRemovedColumn {
        };
        _ts_decorate([
            (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
                upgradeCommandName: PROP_REMOVE_CMD
            }),
            _ts_metadata("design:type", String)
        ], EntityWithRemovedColumn.prototype, "removedColumn", void 0);
        const currentColumns = [
            {
                propertyName: 'removedColumn',
                databaseName: 'removedColumn'
            },
            {
                propertyName: 'untouchedColumn',
                databaseName: 'untouchedColumn'
            }
        ];
        it('should not hide the column before its removal step applied', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: EntityWithRemovedColumn,
                currentTableName: 'entityWithRemovedColumn',
                currentColumns,
                isStepApplied: buildPredicate([])
            });
            expect(result.hiddenPropertyNames.size).toBe(0);
        });
        it('should hide the column once its removal step applied', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: EntityWithRemovedColumn,
                currentTableName: 'entityWithRemovedColumn',
                currentColumns,
                isStepApplied: buildPredicate([
                    PROP_REMOVE_CMD
                ])
            });
            expect(result.hiddenPropertyNames).toEqual(new Set([
                'removedColumn'
            ]));
        });
        it('should leave undecorated siblings untouched at every cursor', ()=>{
            for (const applied of [
                [],
                [
                    PROP_REMOVE_CMD
                ]
            ]){
                const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                    entityClass: EntityWithRemovedColumn,
                    currentTableName: 'entityWithRemovedColumn',
                    currentColumns,
                    isStepApplied: buildPredicate(applied)
                });
                expect(result.hiddenPropertyNames.has('untouchedColumn')).toBe(false);
            }
        });
    });
    describe('property-level intro + remove combined', ()=>{
        let EntityWithIntroAndRemove = class EntityWithIntroAndRemove {
        };
        _ts_decorate([
            (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
                upgradeCommandName: PROP_INTRODUCE_CMD
            }),
            (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
                upgradeCommandName: PROP_REMOVE_CMD
            }),
            _ts_metadata("design:type", String)
        ], EntityWithIntroAndRemove.prototype, "transientColumn", void 0);
        const currentColumns = [
            {
                propertyName: 'transientColumn',
                databaseName: 'transientColumn'
            }
        ];
        it('hides the column before intro applied', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: EntityWithIntroAndRemove,
                currentTableName: 'entityWithIntroAndRemove',
                currentColumns,
                isStepApplied: buildPredicate([])
            });
            expect(result.hiddenPropertyNames).toEqual(new Set([
                'transientColumn'
            ]));
        });
        it('exposes the column between intro and removal', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: EntityWithIntroAndRemove,
                currentTableName: 'entityWithIntroAndRemove',
                currentColumns,
                isStepApplied: buildPredicate([
                    PROP_INTRODUCE_CMD
                ])
            });
            expect(result.hiddenPropertyNames.size).toBe(0);
        });
        it('hides the column once removal applied', ()=>{
            const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
                entityClass: EntityWithIntroAndRemove,
                currentTableName: 'entityWithIntroAndRemove',
                currentColumns,
                isStepApplied: buildPredicate([
                    PROP_INTRODUCE_CMD,
                    PROP_REMOVE_CMD
                ])
            });
            expect(result.hiddenPropertyNames).toEqual(new Set([
                'transientColumn'
            ]));
        });
    });
    it('should treat an entity with no decorators as available and unchanged', ()=>{
        let Plain = class Plain {
        };
        const result = (0, _resolveentityshapeatupgradecursorutil.resolveEntityShapeAtUpgradeCursor)({
            entityClass: Plain,
            currentTableName: 'plain',
            currentColumns: [
                {
                    propertyName: 'id',
                    databaseName: 'id'
                }
            ],
            isStepApplied: buildPredicate([])
        });
        expect(result.isAvailable).toBe(true);
        expect(result.effectiveTableName).toBe('plain');
        expect(result.hiddenPropertyNames.size).toBe(0);
        expect(result.columnDatabaseNameRemap.size).toBe(0);
    });
});

//# sourceMappingURL=resolve-entity-shape-at-upgrade-cursor.util.spec.js.map