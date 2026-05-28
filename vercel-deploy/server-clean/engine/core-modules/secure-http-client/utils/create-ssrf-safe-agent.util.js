"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createSsrfSafeAgent", {
    enumerable: true,
    get: function() {
        return createSsrfSafeAgent;
    }
});
const _http = /*#__PURE__*/ _interop_require_wildcard(require("http"));
const _https = /*#__PURE__*/ _interop_require_wildcard(require("https"));
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
// Checks whether a hostname is a private IP literal.
// Returns false for domain names — those are validated after DNS
// resolution in the socket 'lookup' event handler.
const isHostnamePrivateIp = (hostname)=>{
    try {
        return (0, _isprivateiputil.isPrivateIp)(hostname);
    } catch  {
        return false;
    }
};
const validateHost = (host)=>{
    if (host && isHostnamePrivateIp(host)) {
        throw new Error(`Request to internal IP address ${host} is not allowed.`);
    }
};
// Validates a resolved IP and destroys the socket if it's private.
// Fails closed: if the IP cannot be parsed, the socket is destroyed.
const attachLookupValidation = (duplex)=>{
    // createConnection returns a net.Socket at runtime; the Duplex
    // return type in @types/node is overly broad.
    const socket = duplex;
    socket.on('lookup', (error, address)=>{
        if (error) {
            return;
        }
        try {
            if ((0, _isprivateiputil.isPrivateIp)(address)) {
                socket.destroy(new Error(`Request to internal IP address ${address} is not allowed.`));
            }
        } catch  {
            socket.destroy(new Error(`Request to unvalidatable IP address ${address} is not allowed.`));
        }
    });
    return socket;
};
// Agents that block connections to private IPs. Validation happens at
// the connection level (createConnection + socket 'lookup' event),
// which means every connection is checked — including those created
// by automatic redirect following.
let SsrfSafeHttpAgent = class SsrfSafeHttpAgent extends _http.Agent {
    createConnection(options, callback) {
        validateHost(options.host ?? undefined);
        return attachLookupValidation(super.createConnection(options, callback));
    }
};
let SsrfSafeHttpsAgent = class SsrfSafeHttpsAgent extends _https.Agent {
    createConnection(options, callback) {
        validateHost(options.host ?? undefined);
        return attachLookupValidation(super.createConnection(options, callback));
    }
};
const createSsrfSafeAgent = (protocol)=>{
    return protocol === 'https' ? new SsrfSafeHttpsAgent() : new SsrfSafeHttpAgent();
};

//# sourceMappingURL=create-ssrf-safe-agent.util.js.map