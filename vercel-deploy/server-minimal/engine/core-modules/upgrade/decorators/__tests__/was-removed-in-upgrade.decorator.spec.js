"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _wasremovedinupgradedecorator = require("../was-removed-in-upgrade.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
describe('WasRemovedInUpgrade', ()=>{
    it('records class-level metadata', ()=>{
        let Example = class Example {
        };
        Example = _ts_decorate([
            (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
                upgradeCommandName: 'upgrade-step-class'
            })
        ], Example);
        expect((0, _wasremovedinupgradedecorator.getWasRemovedInUpgradeClassMetadata)(Example)).toEqual({
            upgradeCommandName: 'upgrade-step-class'
        });
        expect((0, _wasremovedinupgradedecorator.getWasRemovedInUpgradePropertyMetadata)(Example)).toEqual({});
    });
    it('records property-level metadata keyed by property name', ()=>{
        let Example = class Example {
        };
        _ts_decorate([
            (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
                upgradeCommandName: 'upgrade-step-foo'
            }),
            _ts_metadata("design:type", String)
        ], Example.prototype, "foo", void 0);
        _ts_decorate([
            (0, _wasremovedinupgradedecorator.WasRemovedInUpgrade)({
                upgradeCommandName: 'upgrade-step-bar'
            }),
            _ts_metadata("design:type", String)
        ], Example.prototype, "bar", void 0);
        expect((0, _wasremovedinupgradedecorator.getWasRemovedInUpgradePropertyMetadata)(Example)).toEqual({
            foo: {
                upgradeCommandName: 'upgrade-step-foo'
            },
            bar: {
                upgradeCommandName: 'upgrade-step-bar'
            }
        });
        expect((0, _wasremovedinupgradedecorator.getWasRemovedInUpgradeClassMetadata)(Example)).toBeUndefined();
    });
    it('returns an empty map for classes with no decorated properties', ()=>{
        let Example = class Example {
        };
        expect((0, _wasremovedinupgradedecorator.getWasRemovedInUpgradePropertyMetadata)(Example)).toEqual({});
        expect((0, _wasremovedinupgradedecorator.getWasRemovedInUpgradeClassMetadata)(Example)).toBeUndefined();
    });
});

//# sourceMappingURL=was-removed-in-upgrade.decorator.spec.js.map