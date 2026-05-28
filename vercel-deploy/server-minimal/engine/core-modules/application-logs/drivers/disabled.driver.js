"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DisabledApplicationLogDriver", {
    enumerable: true,
    get: function() {
        return DisabledApplicationLogDriver;
    }
});
let DisabledApplicationLogDriver = class DisabledApplicationLogDriver {
    async writeLogs() {
        return;
    }
};

//# sourceMappingURL=disabled.driver.js.map