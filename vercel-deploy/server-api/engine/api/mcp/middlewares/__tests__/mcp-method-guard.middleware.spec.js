"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _jsonrpcerrorcodeconst = require("../../constants/json-rpc-error-code.const");
const _mcpmethodguardmiddleware = require("../mcp-method-guard.middleware");
describe('McpMethodGuardMiddleware', ()=>{
    let middleware;
    let mockRes;
    let next;
    beforeEach(()=>{
        middleware = new _mcpmethodguardmiddleware.McpMethodGuardMiddleware();
        next = jest.fn();
        mockRes = {
            setHeader: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    it('should call next() for POST requests', ()=>{
        const req = {
            method: 'POST'
        };
        middleware.use(req, mockRes, next);
        expect(next).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
    });
    it('should return 405 with Allow header for GET requests', ()=>{
        const req = {
            method: 'GET'
        };
        middleware.use(req, mockRes, next);
        expect(next).not.toHaveBeenCalled();
        expect(mockRes.setHeader).toHaveBeenCalledWith('Allow', 'POST');
        expect(mockRes.status).toHaveBeenCalledWith(405);
        expect(mockRes.json).toHaveBeenCalledWith({
            jsonrpc: '2.0',
            error: {
                code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.INVALID_REQUEST,
                message: 'HTTP method GET is not allowed. This MCP endpoint only accepts POST requests.'
            },
            id: null
        });
    });
    it('should return 405 with Allow header for DELETE requests', ()=>{
        const req = {
            method: 'DELETE'
        };
        middleware.use(req, mockRes, next);
        expect(next).not.toHaveBeenCalled();
        expect(mockRes.setHeader).toHaveBeenCalledWith('Allow', 'POST');
        expect(mockRes.status).toHaveBeenCalledWith(405);
        expect(mockRes.json).toHaveBeenCalledWith({
            jsonrpc: '2.0',
            error: {
                code: _jsonrpcerrorcodeconst.JSON_RPC_ERROR_CODE.INVALID_REQUEST,
                message: 'HTTP method DELETE is not allowed. This MCP endpoint only accepts POST requests.'
            },
            id: null
        });
    });
    it('should return 405 for PUT requests', ()=>{
        const req = {
            method: 'PUT'
        };
        middleware.use(req, mockRes, next);
        expect(next).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(405);
    });
});

//# sourceMappingURL=mcp-method-guard.middleware.spec.js.map