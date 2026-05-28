"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChartDataGraphqlApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return ChartDataGraphqlApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _chartdataexception = require("../exceptions/chart-data.exception");
const _chartdatagraphqlapiexceptionhandlerutil = require("../utils/chart-data-graphql-api-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ChartDataGraphqlApiExceptionFilter = class ChartDataGraphqlApiExceptionFilter {
    catch(exception, _host) {
        return (0, _chartdatagraphqlapiexceptionhandlerutil.chartDataGraphqlApiExceptionHandler)(exception);
    }
};
ChartDataGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_chartdataexception.ChartDataException)
], ChartDataGraphqlApiExceptionFilter);

//# sourceMappingURL=chart-data-graphql-api-exception.filter.js.map