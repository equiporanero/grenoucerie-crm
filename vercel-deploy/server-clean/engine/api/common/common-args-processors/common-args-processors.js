"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonArgsProcessors", {
    enumerable: true,
    get: function() {
        return CommonArgsProcessors;
    }
});
const _dataargprocessorservice = require("./data-arg-processor/data-arg-processor.service");
const _filterargprocessorservice = require("./filter-arg-processor/filter-arg-processor.service");
const _groupbyargprocessorservice = require("./group-by-arg-processor/group-by-arg-processor.service");
const _orderbyargprocessorservice = require("./order-by-arg-processor/order-by-arg-processor.service");
const _orderbywithgroupbyargprocessorservice = require("./order-by-with-group-by-arg-processor/order-by-with-group-by-arg-processor.service");
const _queryrunnerargsfactory = require("./query-runner-args.factory");
const CommonArgsProcessors = [
    _dataargprocessorservice.DataArgProcessorService,
    _filterargprocessorservice.FilterArgProcessorService,
    _groupbyargprocessorservice.GroupByArgProcessorService,
    _orderbyargprocessorservice.OrderByArgProcessorService,
    _orderbywithgroupbyargprocessorservice.OrderByWithGroupByArgProcessorService,
    _queryrunnerargsfactory.QueryRunnerArgsFactory
]; // TODO: Refacto-common Remove QueryRunnerArgsFactory

//# sourceMappingURL=common-args-processors.js.map