"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _classtransformer = require("class-transformer");
const _casttouppersnakecasedecorator = require("../cast-to-upper-snake-case.decorator");
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
    (0, _casttouppersnakecasedecorator.CastToUpperSnakeCase)(),
    _ts_metadata("design:type", String)
], TestClass.prototype, "value", void 0);
describe('CastToUpperSnakeCase Decorator', ()=>{
    it('should transform lowercase string to UPPER_SNAKE_CASE', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: 'local'
        });
        expect(result.value).toBe('LOCAL');
    });
    it('should transform camelCase string to UPPER_SNAKE_CASE', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: 'camelCase'
        });
        expect(result.value).toBe('CAMEL_CASE');
    });
    it('should transform kebab-case string to UPPER_SNAKE_CASE', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: 'kebab-case'
        });
        expect(result.value).toBe('KEBAB_CASE');
    });
    it('should transform space-separated string to UPPER_SNAKE_CASE', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: 'space separated'
        });
        expect(result.value).toBe('SPACE_SEPARATED');
    });
    it('should handle already UPPER_SNAKE_CASE string', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: 'ALREADY_UPPER_SNAKE'
        });
        expect(result.value).toBe('ALREADY_UPPER_SNAKE');
    });
    it('should handle mixed case with numbers', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: 'test123Value'
        });
        expect(result.value).toBe('TEST_123_VALUE');
    });
    it('should trim whitespace', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: '  local  '
        });
        expect(result.value).toBe('LOCAL');
    });
    it('should handle empty string', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: ''
        });
        expect(result.value).toBe('');
    });
    it('should return undefined for non-string values', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: 123
        });
        expect(result.value).toBeUndefined();
    });
    it('should return undefined for null values', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: null
        });
        expect(result.value).toBeUndefined();
    });
    it('should return undefined for undefined values', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: undefined
        });
        expect(result.value).toBeUndefined();
    });
    it('should handle complex mixed formats', ()=>{
        const result = (0, _classtransformer.plainToClass)(TestClass, {
            value: 'Complex-Mixed_Format test123'
        });
        expect(result.value).toBe('COMPLEX_MIXED_FORMAT_TEST_123');
    });
});

//# sourceMappingURL=cast-to-upper-snake-case.decorator.spec.js.map