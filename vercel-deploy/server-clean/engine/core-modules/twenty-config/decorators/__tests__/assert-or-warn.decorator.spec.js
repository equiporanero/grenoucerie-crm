"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
require("reflect-metadata");
const _assertorwarndecorator = require("../assert-or-warn.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
describe('AssertOrWarn Decorator', ()=>{
    it('should pass validation if the condition is met', ()=>{
        let ConfigVariables = class ConfigVariables {
        };
        _ts_decorate([
            (0, _assertorwarndecorator.AssertOrWarn)((_object, value)=>value > 10, {
                message: 'Value should be higher than 10'
            }),
            _ts_metadata("design:type", Number)
        ], ConfigVariables.prototype, "someProperty", void 0);
        const validatedConfig = (0, _classtransformer.plainToClass)(ConfigVariables, {
            someProperty: 15
        });
        const warnings = (0, _classvalidator.validateSync)(validatedConfig, {
            groups: [
                'warning'
            ]
        });
        expect(warnings.length).toBe(0);
    });
    it('should provide a warning message if the condition is not met', ()=>{
        let ConfigVariables = class ConfigVariables {
        };
        _ts_decorate([
            (0, _assertorwarndecorator.AssertOrWarn)((_object, value)=>value > 10, {
                message: 'Value should be higher than 10'
            }),
            _ts_metadata("design:type", Number)
        ], ConfigVariables.prototype, "someProperty", void 0);
        const validatedConfig = (0, _classtransformer.plainToClass)(ConfigVariables, {
            someProperty: 9
        });
        const warnings = (0, _classvalidator.validateSync)(validatedConfig, {
            groups: [
                'warning'
            ]
        });
        expect(warnings.length).toBe(1);
        expect(warnings[0].constraints.AssertOrWarn).toBe('Value should be higher than 10');
    });
    it('should not impact errors if the condition is not met', ()=>{
        let ConfigVariables = class ConfigVariables {
        };
        _ts_decorate([
            (0, _classvalidator.IsString)(),
            _ts_metadata("design:type", String)
        ], ConfigVariables.prototype, "unit", void 0);
        _ts_decorate([
            (0, _assertorwarndecorator.AssertOrWarn)((object, value)=>object.unit == 's' && value.toString().length <= 10, {
                message: 'The unit is in seconds but the duration in milliseconds'
            }),
            _ts_metadata("design:type", Number)
        ], ConfigVariables.prototype, "duration", void 0);
        const validatedConfig = (0, _classtransformer.plainToClass)(ConfigVariables, {
            duration: 1731944140876000,
            unit: 's'
        });
        const warnings = (0, _classvalidator.validateSync)(validatedConfig, {
            groups: [
                'warning'
            ]
        });
        const errors = (0, _classvalidator.validateSync)(validatedConfig, {
            strictGroups: true
        });
        expect(errors.length).toBe(0);
        expect(warnings.length).toBe(1);
        expect(warnings[0].constraints.AssertOrWarn).toBe('The unit is in seconds but the duration in milliseconds');
    });
});

//# sourceMappingURL=assert-or-warn.decorator.spec.js.map