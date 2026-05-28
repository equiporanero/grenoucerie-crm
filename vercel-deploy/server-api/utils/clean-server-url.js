"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cleanServerUrl", {
    enumerable: true,
    get: function() {
        return cleanServerUrl;
    }
});
const cleanServerUrl = (serverUrlEnv)=>{
    if (serverUrlEnv?.endsWith('/')) return serverUrlEnv.substring(0, serverUrlEnv.length - 1);
    return serverUrlEnv;
};

//# sourceMappingURL=clean-server-url.js.map