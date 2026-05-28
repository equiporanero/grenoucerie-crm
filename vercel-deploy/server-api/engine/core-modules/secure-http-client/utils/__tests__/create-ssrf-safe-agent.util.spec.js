"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _events = require("events");
const _http = /*#__PURE__*/ _interop_require_wildcard(require("http"));
const _https = /*#__PURE__*/ _interop_require_wildcard(require("https"));
const _createssrfsafeagentutil = require("../create-ssrf-safe-agent.util");
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
const createMockSocket = ()=>{
    const emitter = new _events.EventEmitter();
    return Object.assign(emitter, {
        destroy: jest.fn(),
        // Minimal Socket stubs to avoid type errors
        connecting: false,
        writable: true
    });
};
describe('createSsrfSafeAgent', ()=>{
    let mockSocket;
    let createConnectionSpy;
    beforeEach(()=>{
        mockSocket = createMockSocket();
        createConnectionSpy = jest.spyOn(_http.Agent.prototype, 'createConnection').mockReturnValue(mockSocket);
        jest.spyOn(_https.Agent.prototype, 'createConnection').mockReturnValue(mockSocket);
    });
    afterEach(()=>{
        jest.restoreAllMocks();
    });
    describe('agent creation', ()=>{
        it('should return an http.Agent for http protocol', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            expect(agent).toBeInstanceOf(_http.Agent);
        });
        it('should return an https.Agent for https protocol', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('https');
            expect(agent).toBeInstanceOf(_https.Agent);
        });
    });
    describe('IP literal blocking in createConnection', ()=>{
        it('should throw for loopback IP 127.0.0.1', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            expect(()=>{
                agent.createConnection({
                    host: '127.0.0.1'
                }, jest.fn());
            }).toThrow('Request to internal IP address 127.0.0.1 is not allowed.');
        });
        it('should throw for private IP 10.0.0.1', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            expect(()=>{
                agent.createConnection({
                    host: '10.0.0.1'
                }, jest.fn());
            }).toThrow('Request to internal IP address 10.0.0.1 is not allowed.');
        });
        it('should throw for private IP 192.168.1.1', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            expect(()=>{
                agent.createConnection({
                    host: '192.168.1.1'
                }, jest.fn());
            }).toThrow('Request to internal IP address 192.168.1.1 is not allowed.');
        });
        it('should throw for private IP 172.16.0.1', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            expect(()=>{
                agent.createConnection({
                    host: '172.16.0.1'
                }, jest.fn());
            }).toThrow('Request to internal IP address 172.16.0.1 is not allowed.');
        });
        it('should throw for link-local IP 169.254.169.254', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            expect(()=>{
                agent.createConnection({
                    host: '169.254.169.254'
                }, jest.fn());
            }).toThrow('Request to internal IP address 169.254.169.254 is not allowed.');
        });
        it('should allow public IP 93.184.216.34', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: '93.184.216.34'
            }, jest.fn());
            expect(createConnectionSpy).toHaveBeenCalled();
        });
        it('should allow hostnames (validated later via DNS lookup)', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: 'example.com'
            }, jest.fn());
            expect(createConnectionSpy).toHaveBeenCalled();
        });
    });
    describe('DNS lookup validation via socket event', ()=>{
        it('should destroy socket when DNS resolves to loopback IP', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: 'evil.com'
            }, jest.fn());
            mockSocket.emit('lookup', null, '127.0.0.1', 4, 'evil.com');
            expect(mockSocket.destroy).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.stringContaining('127.0.0.1')
            }));
        });
        it('should destroy socket when DNS resolves to 10.x.x.x', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: 'evil.com'
            }, jest.fn());
            mockSocket.emit('lookup', null, '10.0.0.1', 4, 'evil.com');
            expect(mockSocket.destroy).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.stringContaining('10.0.0.1')
            }));
        });
        it('should destroy socket when DNS resolves to 192.168.x.x', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: 'evil.com'
            }, jest.fn());
            mockSocket.emit('lookup', null, '192.168.1.1', 4, 'evil.com');
            expect(mockSocket.destroy).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.stringContaining('192.168.1.1')
            }));
        });
        it('should destroy socket when DNS resolves to cloud metadata IP', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: 'metadata.internal'
            }, jest.fn());
            mockSocket.emit('lookup', null, '169.254.169.254', 4, 'metadata.internal');
            expect(mockSocket.destroy).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.stringContaining('169.254.169.254')
            }));
        });
        it('should not destroy socket when DNS resolves to public IP', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: 'example.com'
            }, jest.fn());
            mockSocket.emit('lookup', null, '93.184.216.34', 4, 'example.com');
            expect(mockSocket.destroy).not.toHaveBeenCalled();
        });
        it('should not destroy socket on DNS lookup error', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: 'nonexistent.example'
            }, jest.fn());
            mockSocket.emit('lookup', new Error('ENOTFOUND'), '', 4, 'nonexistent.example');
            expect(mockSocket.destroy).not.toHaveBeenCalled();
        });
    });
    describe('HTTPS agent', ()=>{
        it('should block private IPs for HTTPS connections', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('https');
            expect(()=>{
                agent.createConnection({
                    host: '127.0.0.1'
                }, jest.fn());
            }).toThrow('Request to internal IP address 127.0.0.1 is not allowed.');
        });
        it('should validate DNS lookups for HTTPS connections', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('https');
            agent.createConnection({
                host: 'evil.com'
            }, jest.fn());
            mockSocket.emit('lookup', null, '10.0.0.1', 4, 'evil.com');
            expect(mockSocket.destroy).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.stringContaining('10.0.0.1')
            }));
        });
    });
    describe('IPv6 handling', ()=>{
        it('should block IPv6 loopback ::1 as IP literal', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            expect(()=>{
                agent.createConnection({
                    host: '::1'
                }, jest.fn());
            }).toThrow('Request to internal IP address ::1 is not allowed.');
        });
        it('should destroy socket when DNS resolves to IPv6 private address', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: 'evil.com'
            }, jest.fn());
            mockSocket.emit('lookup', null, 'fe80::1', 6, 'evil.com');
            expect(mockSocket.destroy).toHaveBeenCalledWith(expect.objectContaining({
                message: expect.stringContaining('fe80::1')
            }));
        });
        it('should allow public IPv6 addresses', ()=>{
            const agent = (0, _createssrfsafeagentutil.createSsrfSafeAgent)('http');
            agent.createConnection({
                host: 'example.com'
            }, jest.fn());
            mockSocket.emit('lookup', null, '2001:4860:4860::8888', 6, 'example.com');
            expect(mockSocket.destroy).not.toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=create-ssrf-safe-agent.util.spec.js.map