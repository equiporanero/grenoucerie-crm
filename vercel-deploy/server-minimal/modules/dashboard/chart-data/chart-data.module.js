"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChartDataModule", {
    enumerable: true,
    get: function() {
        return ChartDataModule;
    }
});
const _common = require("@nestjs/common");
const _corecommonapimodule = require("../../../engine/api/common/core-common-api.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _pagelayoutwidgetmodule = require("../../../engine/metadata-modules/page-layout-widget/page-layout-widget.module");
const _twentyormmodule = require("../../../engine/twenty-orm/twenty-orm.module");
const _barchartdataresolver = require("./resolvers/bar-chart-data.resolver");
const _linechartdataresolver = require("./resolvers/line-chart-data.resolver");
const _piechartdataresolver = require("./resolvers/pie-chart-data.resolver");
const _barchartdataservice = require("./services/bar-chart-data.service");
const _chartdataqueryservice = require("./services/chart-data-query.service");
const _linechartdataservice = require("./services/line-chart-data.service");
const _piechartdataservice = require("./services/pie-chart-data.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ChartDataModule = class ChartDataModule {
};
ChartDataModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _corecommonapimodule.CoreCommonApiModule,
            _pagelayoutwidgetmodule.PageLayoutWidgetModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _twentyormmodule.TwentyORMModule
        ],
        providers: [
            _chartdataqueryservice.ChartDataQueryService,
            _piechartdataservice.PieChartDataService,
            _piechartdataresolver.PieChartDataResolver,
            _linechartdataservice.LineChartDataService,
            _linechartdataresolver.LineChartDataResolver,
            _barchartdataservice.BarChartDataService,
            _barchartdataresolver.BarChartDataResolver
        ],
        exports: [
            _piechartdataservice.PieChartDataService,
            _linechartdataservice.LineChartDataService,
            _barchartdataservice.BarChartDataService
        ]
    })
], ChartDataModule);

//# sourceMappingURL=chart-data.module.js.map