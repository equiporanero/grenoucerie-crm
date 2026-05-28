"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HealthStateManager", {
    enumerable: true,
    get: function() {
        return HealthStateManager;
    }
});
let HealthStateManager = class HealthStateManager {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    updateState(details) {
        this.lastKnownState = {
            timestamp: new Date(),
            details
        };
    }
    getStateWithAge() {
        return this.lastKnownState ? {
            ...this.lastKnownState,
            age: Date.now() - this.lastKnownState.timestamp.getTime()
        } : 'No previous state available';
    }
    constructor(){
        this.lastKnownState = null;
    }
};

//# sourceMappingURL=health-state-manager.util.js.map