"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withHealthCheckTimeout", {
    enumerable: true,
    get: function() {
        return withHealthCheckTimeout;
    }
});
const _healthindicatorstimeoutconts = require("../constants/health-indicators-timeout.conts");
const withHealthCheckTimeout = async (promise, errorMessage)=>{
    return Promise.race([
        promise,
        new Promise((_, reject)=>setTimeout(()=>reject(new Error(errorMessage)), _healthindicatorstimeoutconts.HEALTH_INDICATORS_TIMEOUT))
    ]);
};

//# sourceMappingURL=health-check-timeout.util.js.map