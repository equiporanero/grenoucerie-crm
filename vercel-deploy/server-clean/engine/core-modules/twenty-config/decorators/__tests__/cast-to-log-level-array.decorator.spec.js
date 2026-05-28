"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _classtransformer = require("class-transformer");
const _casttologlevelarraydecorator = require("../cast-to-log-level-array.decorator");
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
    (0, _casttologlevelarraydecorator.CastToLogLevelArray)(),
    _ts_metadata("design:type", Object)
], TestClass.prototype, "logLevels", void 0);
describe('CastToLogLevelArray Decorator', ()=>{
    it('should cast "log" to ["log"]', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            logLevels: 'log'
        });
        expect(transformedClass.logLevels).toStrictEqual([
            'log'
        ]);
    });
    it('should cast "error" to ["error"]', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            logLevels: 'error'
        });
        expect(transformedClass.logLevels).toStrictEqual([
            'error'
        ]);
    });
    it('should cast "warn" to ["warn"]', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            logLevels: 'warn'
        });
        expect(transformedClass.logLevels).toStrictEqual([
            'warn'
        ]);
    });
    it('should cast "debug" to ["debug"]', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            logLevels: 'debug'
        });
        expect(transformedClass.logLevels).toStrictEqual([
            'debug'
        ]);
    });
    it('should cast "verbose" to ["verbose"]', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            logLevels: 'verbose'
        });
        expect(transformedClass.logLevels).toStrictEqual([
            'verbose'
        ]);
    });
    it('should cast "verbose,error,warn" to ["verbose", "error", "warn"]', ()=>{
        const transformedClass = (0, _classtransformer.plainToClass)(TestClass, {
            logLevels: 'verbose,error,warn'
        });
        expect(transformedClass.logLevels).toStrictEqual([
            'verbose',
            'error',
            'warn'
        ]);
    });
    it('should throw on invalid level "toto" with clear error message', ()=>{
        expect(()=>(0, _classtransformer.plainToClass)(TestClass, {
                logLevels: 'toto'
            })).toThrow('Invalid log level(s): toto. Valid levels are: log, error, warn, debug, verbose');
    });
    it('should throw on "verbose,error,toto" listing only invalid levels', ()=>{
        expect(()=>(0, _classtransformer.plainToClass)(TestClass, {
                logLevels: 'verbose,error,toto'
            })).toThrow('Invalid log level(s): toto. Valid levels are: log, error, warn, debug, verbose');
    });
});

//# sourceMappingURL=cast-to-log-level-array.decorator.spec.js.map