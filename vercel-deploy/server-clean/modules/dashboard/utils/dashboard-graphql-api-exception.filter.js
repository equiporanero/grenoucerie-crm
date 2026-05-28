"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardGraphqlApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return DashboardGraphqlApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _dashboardexception = require("../exceptions/dashboard.exception");
const _dashboardgraphqlapiexceptionhandlerutil = require("./dashboard-graphql-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DashboardGraphqlApiExceptionFilter = class DashboardGraphqlApiExceptionFilter {
    catch(exception, _host) {
        return (0, _dashboardgraphqlapiexceptionhandlerutil.dashboardGraphqlApiExceptionHandler)(exception);
    }
};
DashboardGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_dashboardexception.DashboardException)
], DashboardGraphqlApiExceptionFilter);

//# sourceMappingURL=dashboard-graphql-api-exception.filter.js.map