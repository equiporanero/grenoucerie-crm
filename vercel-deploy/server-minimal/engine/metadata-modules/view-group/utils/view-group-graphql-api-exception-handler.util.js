"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "viewGroupGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return viewGroupGraphqlApiExceptionHandler;
    }
});
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _viewgroupexception = require("../exceptions/view-group.exception");
const _viewgraphqlapiexceptionhandlerutil = require("../../view/utils/view-graphql-api-exception-handler.util");
const viewGroupGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _viewgroupexception.ViewGroupException) {
        if (error.code === _viewgroupexception.ViewGroupExceptionCode.MISSING_MAIN_GROUP_BY_FIELD_METADATA_ID) {
            throw new _graphqlerrorsutil.UserInputError(error.message, {
                userFriendlyMessage: error.userFriendlyMessage
            });
        }
    }
    return (0, _viewgraphqlapiexceptionhandlerutil.viewGraphqlApiExceptionHandler)(error);
};

//# sourceMappingURL=view-group-graphql-api-exception-handler.util.js.map