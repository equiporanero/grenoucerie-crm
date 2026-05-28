"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _permissionsexception = require("../../permissions.exception");
const _permissionrestapiexceptioncodetohttpstatusutil = require("../permission-rest-api-exception-code-to-http-status.util");
describe('permissionRestApiExceptionCodeToHttpStatus', ()=>{
    it('should return 403 for PERMISSION_DENIED', ()=>{
        expect((0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(_permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED)).toBe(403);
    });
    it('should return 403 for role-related forbidden cases', ()=>{
        expect((0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(_permissionsexception.PermissionsExceptionCode.CANNOT_UPDATE_SELF_ROLE)).toBe(403);
    });
    it('should return 403 for NO_AUTHENTICATION_CONTEXT', ()=>{
        expect((0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(_permissionsexception.PermissionsExceptionCode.NO_AUTHENTICATION_CONTEXT)).toBe(403);
    });
    it('should return 400 for INVALID_ARG', ()=>{
        expect((0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(_permissionsexception.PermissionsExceptionCode.INVALID_ARG)).toBe(400);
    });
    it('should return 400 for permission validation errors', ()=>{
        expect((0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(_permissionsexception.PermissionsExceptionCode.EMPTY_FIELD_PERMISSION_NOT_ALLOWED)).toBe(400);
    });
    it('should return 404 for ROLE_NOT_FOUND', ()=>{
        expect((0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(_permissionsexception.PermissionsExceptionCode.ROLE_NOT_FOUND)).toBe(404);
    });
    it('should return 404 for metadata not found cases', ()=>{
        expect((0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(_permissionsexception.PermissionsExceptionCode.OBJECT_METADATA_NOT_FOUND)).toBe(404);
    });
    it('should return 500 for METHOD_NOT_ALLOWED', ()=>{
        expect((0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(_permissionsexception.PermissionsExceptionCode.METHOD_NOT_ALLOWED)).toBe(500);
    });
    it('should return 500 for internal error codes', ()=>{
        expect((0, _permissionrestapiexceptioncodetohttpstatusutil.permissionRestApiExceptionCodeToHttpStatus)(_permissionsexception.PermissionsExceptionCode.DEFAULT_ROLE_NOT_FOUND)).toBe(500);
    });
});

//# sourceMappingURL=permission-rest-api-exception-code-to-http-status.util.spec.js.map