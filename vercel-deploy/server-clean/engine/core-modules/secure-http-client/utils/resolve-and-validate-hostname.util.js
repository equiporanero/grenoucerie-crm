"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveAndValidateHostname", {
    enumerable: true,
    get: function() {
        return resolveAndValidateHostname;
    }
});
const _promises = /*#__PURE__*/ _interop_require_wildcard(require("node:dns/promises"));
const _isprivateiputil = require("./is-private-ip.util");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const resolveAndValidateHostname = async (hostnameOrUrl, dnsLookup = _promises.lookup)=>{
    let hostname;
    try {
        const url = new URL(hostnameOrUrl);
        hostname = url.hostname;
    } catch  {
        hostname = hostnameOrUrl;
    }
    const { address: resolvedIp } = await dnsLookup(hostname);
    if ((0, _isprivateiputil.isPrivateIp)(resolvedIp)) {
        throw new Error(`Connection to internal IP address ${resolvedIp} is not allowed.`);
    }
    return resolvedIp;
};

//# sourceMappingURL=resolve-and-validate-hostname.util.js.map