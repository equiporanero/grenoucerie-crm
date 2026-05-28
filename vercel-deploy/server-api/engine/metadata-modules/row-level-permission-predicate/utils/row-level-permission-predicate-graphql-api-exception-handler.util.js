/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "rowLevelPermissionPredicateGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return rowLevelPermissionPredicateGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _rowlevelpermissionpredicateexception = require("../exceptions/row-level-permission-predicate.exception");
const rowLevelPermissionPredicateGraphqlApiExceptionHandler = (error)=>{
    switch(error.code){
        case _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROW_LEVEL_PERMISSION_FEATURE_DISABLED:
        case _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.UNAUTHORIZED_ROLE_MODIFICATION:
        case _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.UNAUTHORIZED_OBJECT_MODIFICATION:
            throw new _graphqlerrorsutil.ForbiddenError(error);
        case _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.INVALID_ROW_LEVEL_PERMISSION_PREDICATE_DATA:
            throw new _graphqlerrorsutil.UserInputError(error);
        case _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROW_LEVEL_PERMISSION_PREDICATE_NOT_FOUND:
        case _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.FIELD_METADATA_NOT_FOUND:
        case _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.OBJECT_METADATA_NOT_FOUND:
        case _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.ROLE_NOT_FOUND:
            throw new _graphqlerrorsutil.NotFoundError(error);
        case _rowlevelpermissionpredicateexception.RowLevelPermissionPredicateExceptionCode.INTERNAL_SERVER_ERROR:
            throw new _graphqlerrorsutil.InternalServerError(error);
        default:
            {
                return (0, _utils.assertUnreachable)(error.code);
            }
    }
};

//# sourceMappingURL=row-level-permission-predicate-graphql-api-exception-handler.util.js.map