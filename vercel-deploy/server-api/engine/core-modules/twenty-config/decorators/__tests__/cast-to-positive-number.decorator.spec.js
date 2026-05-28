"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _classtransformer = require("class-transformer");
const _casttopositivenumberdecorator = require("../cast-to-positive-number.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TestClass = class TestClass {
};
_ts_decorate([
    (0, _casttopositivenumberdecorator.CastToPositiveNumber)(),
    _ts_metadata("design:type", Object)
], TestClass.prototype, "numberProperty", void 0);
describe('CastToPositiveNumber Decorator', ()=>{
    it('should cast number to number', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            numberProperty: 123
        });
        expect(transformedClass.numberProperty).toBe(123);
    });
    it('should cast string to number', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            numberProperty: '123'
        });
        expect(transformedClass.numberProperty).toBe(123);
    });
    it('should cast null to undefined', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            numberProperty: null
        });
        expect(transformedClass.numberProperty).toBe(undefined);
    });
    it('should cast negative number to undefined', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            numberProperty: -12
        });
        expect(transformedClass.numberProperty).toBe(undefined);
    });
    it('should cast undefined to undefined', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            numberProperty: undefined
        });
        expect(transformedClass.numberProperty).toBe(undefined);
    });
    it('should cast NaN string to undefined', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            numberProperty: 'toto'
        });
        expect(transformedClass.numberProperty).toBe(undefined);
    });
    it('should cast a negative string to undefined', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            numberProperty: '-123'
        });
        expect(transformedClass.numberProperty).toBe(undefined);
    });
});

//# sourceMappingURL=cast-to-positive-number.decorator.spec.js.map