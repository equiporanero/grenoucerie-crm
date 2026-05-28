/* oxlint-disable no-console */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConsoleListener", {
    enumerable: true,
    get: function() {
        return ConsoleListener;
    }
});
let ConsoleListener = class ConsoleListener {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    intercept(callback) {
        Object.keys(this.originalConsole).forEach((method)=>{
            // @ts-expect-error legacy noImplicitAny
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            console[method] = (...args)=>{
                callback(method, args);
            };
        });
    }
    release() {
        Object.keys(this.originalConsole).forEach((method)=>{
            // @ts-expect-error legacy noImplicitAny
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            console[method] = (...args)=>{
                // @ts-expect-error legacy noImplicitAny
                this.originalConsole[method](...args);
            };
        });
    }
    constructor(){
        this.originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info,
            debug: console.debug
        };
    }
};

//# sourceMappingURL=intercept-console.js.map