/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RowLevelPermissionPredicateGraphqlApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return RowLevelPermissionPredicateGraphqlApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _rowlevelpermissionpredicateexception = require("../exceptions/row-level-permission-predicate.exception");
const _rowlevelpermissionpredicategraphqlapiexceptionhandlerutil = require("../utils/row-level-permission-predicate-graphql-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RowLevelPermissionPredicateGraphqlApiExceptionFilter = class RowLevelPermissionPredicateGraphqlApiExceptionFilter {
    catch(exception) {
        return (0, _rowlevelpermissionpredicategraphqlapiexceptionhandlerutil.rowLevelPermissionPredicateGraphqlApiExceptionHandler)(exception);
    }
};
RowLevelPermissionPredicateGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_rowlevelpermissionpredicateexception.RowLevelPermissionPredicateException)
], RowLevelPermissionPredicateGraphqlApiExceptionFilter);

//# sourceMappingURL=row-level-permission-predicate-graphql-api-exception.filter.js.map