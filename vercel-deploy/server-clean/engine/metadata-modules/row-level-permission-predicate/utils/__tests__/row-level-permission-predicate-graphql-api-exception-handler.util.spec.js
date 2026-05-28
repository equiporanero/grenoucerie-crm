"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
const _rowlevelpermissionpredicateexception = require("../../exceptions/row-level-permission-predicate.exception");
const _rowlevelpermissionpredicategraphqlapiexceptionhandlerutil = require("../row-level-permission-predicate-graphql-api-exception-handler.util");
describe('rowLevelPermissionPredicateGraphqlApiExceptionHandler', ()=>{
    it('should throw ForbiddenError for ROW_LEVEL_PERMISSION_FEATURE_DISABLED', ()=>{
        const exception = new _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateException('Row level permission predicate feature is disabled.', _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROW_LEVEL_PERMISSION_FEATURE_DISABLED);
        expect(()=>(0, _rowlevelpermissionpredicategraphqlapiexceptionhandlerutil.rowLevelPermissionPredicateGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.ForbiddenError);
    });
    it('should throw NotFoundError for ROW_LEVEL_PERMISSION_PREDICATE_NOT_FOUND', ()=>{
        const exception = new _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateException('Predicate not found', _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROW_LEVEL_PERMISSION_PREDICATE_NOT_FOUND);
        expect(()=>(0, _rowlevelpermissionpredicategraphqlapiexceptionhandlerutil.rowLevelPermissionPredicateGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.NotFoundError);
    });
    it('should throw UserInputError for INVALID_ROW_LEVEL_PERMISSION_PREDICATE_DATA', ()=>{
        const exception = new _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateException('Invalid data', _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.INVALID_ROW_LEVEL_PERMISSION_PREDICATE_DATA);
        expect(()=>(0, _rowlevelpermissionpredicategraphqlapiexceptionhandlerutil.rowLevelPermissionPredicateGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.UserInputError);
    });
    it('should throw InternalServerError for INTERNAL_SERVER_ERROR', ()=>{
        const exception = new _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateException('Unexpected', _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.INTERNAL_SERVER_ERROR);
        expect(()=>(0, _rowlevelpermissionpredicategraphqlapiexceptionhandlerutil.rowLevelPermissionPredicateGraphqlApiExceptionHandler)(exception)).toThrow(_graphqlerrorsutil.InternalServerError);
    });
});

//# sourceMappingURL=row-level-permission-predicate-graphql-api-exception-handler.util.spec.js.map