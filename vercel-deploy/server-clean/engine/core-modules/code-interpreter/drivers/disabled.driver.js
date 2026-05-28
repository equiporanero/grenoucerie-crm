"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DisabledDriver", {
    enumerable: true,
    get: function() {
        return DisabledDriver;
    }
});
let DisabledDriver = class DisabledDriver {
    async execute(_code, _files, _context, _callbacks) {
        throw new Error(this.reason);
    }
    constructor(reason){
        this.reason = reason;
    }
};

//# sourceMappingURL=disabled.driver.js.map