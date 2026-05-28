"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
const _permissionsexception = require("../../permissions.exception");
const _permissiongraphqlapiexceptionhandlerutil = require("../permission-graphql-api-exception-handler.util");
describe('permissionGraphqlApiExceptionHandler', ()=>{
    it('should throw ForbiddenError for PERMISSION_DENIED', ()=>{
        const exception = new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED);
        expect(()=>(0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.ForbiddenError);
    });
    it('should throw ForbiddenError for role-related forbidden cases', ()=>{
        const exception = new _permissionsexception.PermissionsException('Cannot update self', _permissionsexception.PermissionsExceptionCode.CANNOT_UPDATE_SELF_ROLE);
        expect(()=>(0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.ForbiddenError);
    });
    it('should throw UserInputError for INVALID_ARG', ()=>{
        const exception = new _permissionsexception.PermissionsException('Invalid argument', _permissionsexception.PermissionsExceptionCode.INVALID_ARG);
        expect(()=>(0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.UserInputError);
    });
    it('should throw UserInputError for permission validation errors', ()=>{
        const exception = new _permissionsexception.PermissionsException('Empty field permission', _permissionsexception.PermissionsExceptionCode.EMPTY_FIELD_PERMISSION_NOT_ALLOWED);
        expect(()=>(0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.UserInputError);
    });
    it('should throw NotFoundError for ROLE_NOT_FOUND', ()=>{
        const exception = new _permissionsexception.PermissionsException('Role not found', _permissionsexception.PermissionsExceptionCode.ROLE_NOT_FOUND);
        expect(()=>(0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.NotFoundError);
    });
    it('should throw NotFoundError for metadata not found cases', ()=>{
        const exception = new _permissionsexception.PermissionsException('Object metadata not found', _permissionsexception.PermissionsExceptionCode.OBJECT_METADATA_NOT_FOUND);
        expect(()=>(0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.NotFoundError);
    });
    it('should rethrow exception for METHOD_NOT_ALLOWED', ()=>{
        const exception = new _permissionsexception.PermissionsException('Method not allowed', _permissionsexception.PermissionsExceptionCode.METHOD_NOT_ALLOWED);
        expect(()=>(0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(exception)).toThrow(exception);
    });
    it('should rethrow exception for internal error codes', ()=>{
        const exception = new _permissionsexception.PermissionsException('Default role not found', _permissionsexception.PermissionsExceptionCode.DEFAULT_ROLE_NOT_FOUND);
        expect(()=>(0, _permissiongraphqlapiexceptionhandlerutil.permissionGraphqlApiExceptionHandler)(exception)).toThrow(exception);
    });
});

//# sourceMappingURL=permission-graphql-api-exception-handler.util.spec.js.map