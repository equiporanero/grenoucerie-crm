"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "convertOrderByToFindOptionsOrder", {
    enumerable: true,
    get: function() {
        return convertOrderByToFindOptionsOrder;
    }
});
const _types = require("twenty-shared/types");
const _standarderrormessageconstant = require("../../../../../common/common-query-runners/errors/standard-error-message.constant");
const _graphqlqueryrunnerexception = require("../../../errors/graphql-query-runner.exception");
const convertOrderByToFindOptionsOrder = (direction, isForwardPagination = true)=>{
    switch(direction){
        case _types.OrderByDirection.AscNullsFirst:
            return {
                order: isForwardPagination ? 'ASC' : 'DESC',
                nulls: 'NULLS FIRST'
            };
        case _types.OrderByDirection.AscNullsLast:
            return {
                order: isForwardPagination ? 'ASC' : 'DESC',
                nulls: 'NULLS LAST'
            };
        case _types.OrderByDirection.DescNullsFirst:
            return {
                order: isForwardPagination ? 'DESC' : 'ASC',
                nulls: 'NULLS FIRST'
            };
        case _types.OrderByDirection.DescNullsLast:
            return {
                order: isForwardPagination ? 'DESC' : 'ASC',
                nulls: 'NULLS LAST'
            };
        default:
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Invalid direction: ${direction}`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_DIRECTION, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
    }
};

//# sourceMappingURL=convert-order-by-to-find-options-order.js.map