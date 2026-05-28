"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphqlerrorsutil = require("../../../graphql/utils/graphql-errors.util");
const _workspacegraphqlapiexceptionhandlerutil = require("../workspace-graphql-api-exception-handler.util");
const _workspaceexception = require("../../workspace.exception");
describe('workspaceGraphqlApiExceptionHandler', ()=>{
    it('should throw NotFoundError when WorkspaceExceptionCode is SUBDOMAIN_NOT_FOUND', ()=>{
        const error = new _workspaceexception.WorkspaceException('Subdomain not found', _workspaceexception.WorkspaceExceptionCode.SUBDOMAIN_NOT_FOUND);
        expect(()=>(0, _workspacegraphqlapiexceptionhandlerutil.workspaceGraphqlApiExceptionHandler)(error)).toThrow(_graphqlerrorsutil.NotFoundError);
    });
    it('should throw NotFoundError when WorkspaceExceptionCode is WORKSPACE_NOT_FOUND', ()=>{
        const error = new _workspaceexception.WorkspaceException('Workspace not found', _workspaceexception.WorkspaceExceptionCode.WORKSPACE_NOT_FOUND);
        expect(()=>(0, _workspacegraphqlapiexceptionhandlerutil.workspaceGraphqlApiExceptionHandler)(error)).toThrow(_graphqlerrorsutil.NotFoundError);
    });
    it('should throw ConflictError when WorkspaceExceptionCode is SUBDOMAIN_ALREADY_TAKEN', ()=>{
        const error = new _workspaceexception.WorkspaceException('Subdomain already taken', _workspaceexception.WorkspaceExceptionCode.SUBDOMAIN_ALREADY_TAKEN);
        expect(()=>(0, _workspacegraphqlapiexceptionhandlerutil.workspaceGraphqlApiExceptionHandler)(error)).toThrow(_graphqlerrorsutil.ConflictError);
    });
    it('should throw the original error if it is not a WorkspaceException', ()=>{
        const genericError = new Error('Generic error');
        expect(()=>(0, _workspacegraphqlapiexceptionhandlerutil.workspaceGraphqlApiExceptionHandler)(genericError)).toThrow(genericError);
    });
});

//# sourceMappingURL=workspace-graphql-api-exception-handler.util.spec.js.map