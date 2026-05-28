"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "dashboardGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return dashboardGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../engine/core-modules/graphql/utils/graphql-errors.util");
const _dashboardexception = require("../exceptions/dashboard.exception");
const dashboardGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _dashboardexception.DashboardException) {
        switch(error.code){
            case _dashboardexception.DashboardExceptionCode.DASHBOARD_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _dashboardexception.DashboardExceptionCode.PAGE_LAYOUT_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _dashboardexception.DashboardExceptionCode.DASHBOARD_DUPLICATION_FAILED:
                throw new _graphqlerrorsutil.InternalServerError(error.message);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=dashboard-graphql-api-exception-handler.util.js.map