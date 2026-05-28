"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _wasintroducedinupgradedecorator = require("../../decorators/was-introduced-in-upgrade.decorator");
const _wasremovedinupgradedecorator = require("../../decorators/was-removed-in-upgrade.decorator");
const _wasrenamedinupgradedecorator = require("../../decorators/was-renamed-in-upgrade.decorator");
const _validateupgradeawareentitydecoratorsutil = require("../validate-upgrade-aware-entity-decorators.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
describe('validateUpgradeAwareEntityDecorators', ()=>{
    const KNOWN_CMD = '2.6.0_KnownCommand_1700000000000';
    const KNOWN_RENAME_CMD = '2.6.0_KnownRename_1700000000001';
    const KNOWN_LATER_RENAME_CMD = '2.7.0_LaterRename_1800000000000';
    const UNKNOWN_CMD = '2.6.0_UnknownCommand_9999999999999';
    const buildStepNameToIndex = (names)=>new Map(names.map((name, index)=>[
                name,
                index
            ]));
    it('should report no problems when every decorator references a known command', ()=>{
        let IntroducedEntity = class IntroducedEntity {
        };
        IntroducedEntity = _ts_decorate([
            (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
                upgradeCommandName: KNOWN_CMD
            })
        ], IntroducedEntity);
        let RenamedEntity = class RenamedEntity {
        };
        RenamedEntity = _ts_decorate([
            (0, _wasrenamedinupgradedecorator.WasRenamedInUpgrade)([
                {
                    previousName: 'oldName',
                    upgradeCommandName: KNOWN_RENAME_CMD
                }
            ])
        ], RenamedEntity);
        expect((0, _validateupgradeawareentitydecoratorsutil.validateUpgradeAwareEntityDecorators)({
            entityClasses: [
                IntroducedEntity,
                RenamedEntity
            ],
            stepNameToIndex: buildStepNameToIndex([
                KNOWN_CMD,
                KNOWN_RENAME_CMD
            ])
        })).toEqual([]);
    });
    it('should report a class-level unknown upgradeCommandName', ()=>{
        let BrokenIntroduced = class BrokenIntroduced {
        };
        BrokenIntroduced = _ts_decorate([
            (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
                upgradeCommandName: UNKNOWN_CMD
            })
        ], BrokenIntroduced);
        const problems = (0, _validateupgradeawareentitydecoratorsutil.validateUpgradeAwareEntityDecorators)({
            entityClasses: [
                BrokenIntroduced
            ],
            stepNameToIndex: buildStepNameToIndex([
                KNOWN_CMD
            ])
        });
        expect(problems).toEqual([
            {
                kind: 'unknown-step-name',
                entityName: 'BrokenIntroduced',
                decorator: '@WasIntroducedInUpgrade',
                scope: 'class',
                upgradeCommandName: UNKNOWN_CMD
            }
        ]);
    });
    it('should report an unknown step name on @WasRemovedInUpgrade', ()=>{
        let BrokenRemoved = class BrokenRemoved {
        };
        _ts_decorate([
            (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
                upgradeCommandName: UNKNOWN_CMD
            }),
            _ts_metadata("design:type", String)
        ], BrokenRemoved.prototype, "doomedColumn", void 0);
        const problems = (0, _validateupgradeawareentitydecoratorsutil.validateUpgradeAwareEntityDecorators)({
            entityClasses: [
                BrokenRemoved
            ],
            stepNameToIndex: buildStepNameToIndex([
                KNOWN_CMD
            ])
        });
        expect(problems).toEqual([
            {
                kind: 'unknown-step-name',
                entityName: 'BrokenRemoved',
                decorator: '@WasRemovedInUpgrade',
                scope: 'property:doomedColumn',
                upgradeCommandName: UNKNOWN_CMD
            }
        ]);
    });
    it('should report when a property is removed before it is introduced', ()=>{
        let BackwardsLifecycle = class BackwardsLifecycle {
        };
        _ts_decorate([
            (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
                upgradeCommandName: KNOWN_LATER_RENAME_CMD
            }),
            (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
                upgradeCommandName: KNOWN_CMD
            }),
            _ts_metadata("design:type", String)
        ], BackwardsLifecycle.prototype, "transientColumn", void 0);
        const problems = (0, _validateupgradeawareentitydecoratorsutil.validateUpgradeAwareEntityDecorators)({
            entityClasses: [
                BackwardsLifecycle
            ],
            stepNameToIndex: buildStepNameToIndex([
                KNOWN_CMD,
                KNOWN_LATER_RENAME_CMD
            ])
        });
        expect(problems).toEqual([
            {
                kind: 'removal-before-introduction',
                entityName: 'BackwardsLifecycle',
                scope: 'property:transientColumn',
                introductionUpgradeCommandName: KNOWN_LATER_RENAME_CMD,
                removalUpgradeCommandName: KNOWN_CMD
            }
        ]);
    });
    it('accepts a property that is introduced before being removed', ()=>{
        let ProperLifecycle = class ProperLifecycle {
        };
        _ts_decorate([
            (0, _wasintroducedinupgradedecorator.WasIntroducedInUpgrade)({
                upgradeCommandName: KNOWN_CMD
            }),
            (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
                upgradeCommandName: KNOWN_LATER_RENAME_CMD
            }),
            _ts_metadata("design:type", String)
        ], ProperLifecycle.prototype, "transientColumn", void 0);
        const problems = (0, _validateupgradeawareentitydecoratorsutil.validateUpgradeAwareEntityDecorators)({
            entityClasses: [
                ProperLifecycle
            ],
            stepNameToIndex: buildStepNameToIndex([
                KNOWN_CMD,
                KNOWN_LATER_RENAME_CMD
            ])
        });
        expect(problems).toEqual([]);
    });
    it('should report a rename history that is out of order versus the sequence', ()=>{
        let ReverseOrdered = class ReverseOrdered {
        };
        ReverseOrdered = _ts_decorate([
            (0, _wasrenamedinupgradedecorator.WasRenamedInUpgrade)([
                {
                    previousName: 'first',
                    upgradeCommandName: KNOWN_LATER_RENAME_CMD
                },
                {
                    previousName: 'second',
                    upgradeCommandName: KNOWN_RENAME_CMD
                }
            ])
        ], ReverseOrdered);
        const problems = (0, _validateupgradeawareentitydecoratorsutil.validateUpgradeAwareEntityDecorators)({
            entityClasses: [
                ReverseOrdered
            ],
            stepNameToIndex: buildStepNameToIndex([
                KNOWN_RENAME_CMD,
                KNOWN_LATER_RENAME_CMD
            ])
        });
        expect(problems).toEqual([
            {
                kind: 'rename-history-out-of-order',
                entityName: 'ReverseOrdered',
                scope: 'class',
                offendingUpgradeCommandName: KNOWN_RENAME_CMD,
                precedingUpgradeCommandName: KNOWN_LATER_RENAME_CMD
            }
        ]);
    });
});

//# sourceMappingURL=validate-upgrade-aware-entity-decorators.util.spec.js.map