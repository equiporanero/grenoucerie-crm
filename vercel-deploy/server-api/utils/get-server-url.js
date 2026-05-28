"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getServerUrl", {
    enumerable: true,
    get: function() {
        return getServerUrl;
    }
});
const _cleanserverurl = require("./clean-server-url");
const getServerUrl = ({ serverUrlEnv, serverUrlFallback })=>{
    return (0, _cleanserverurl.cleanServerUrl)(serverUrlEnv) || serverUrlFallback;
};

//# sourceMappingURL=get-server-url.js.map