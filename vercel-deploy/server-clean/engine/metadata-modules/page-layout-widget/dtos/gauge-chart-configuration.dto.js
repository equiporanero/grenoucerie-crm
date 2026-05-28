"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GaugeChartConfigurationDTO", {
    enumerable: true,
    get: function() {
        return GaugeChartConfigurationDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _widgetconfigurationtypetype = require("../enums/widget-configuration-type.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GaugeChartConfigurationDTO = class GaugeChartConfigurationDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_widgetconfigurationtypetype.WidgetConfigurationType),
    (0, _classvalidator.IsIn)([
        _widgetconfigurationtypetype.WidgetConfigurationType.GAUGE_CHART
    ]),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _widgetconfigurationtypetype.WidgetConfigurationType === "undefined" || typeof _widgetconfigurationtypetype.WidgetConfigurationType.GAUGE_CHART === "undefined" ? Object : _widgetconfigurationtypetype.WidgetConfigurationType.GAUGE_CHART)
], GaugeChartConfigurationDTO.prototype, "configurationType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.SerializedRelation === "undefined" ? Object : _types.SerializedRelation)
], GaugeChartConfigurationDTO.prototype, "aggregateFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.AggregateOperations),
    (0, _classvalidator.IsEnum)(_types.AggregateOperations),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.AggregateOperations === "undefined" ? Object : _types.AggregateOperations)
], GaugeChartConfigurationDTO.prototype, "aggregateOperation", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: false
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], GaugeChartConfigurationDTO.prototype, "displayDataLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], GaugeChartConfigurationDTO.prototype, "color", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], GaugeChartConfigurationDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof ChartFilter === "undefined" ? Object : ChartFilter)
], GaugeChartConfigurationDTO.prototype, "filter", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true,
        defaultValue: 'UTC'
    }),
    (0, _classvalidator.IsTimeZone)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], GaugeChartConfigurationDTO.prototype, "timezone", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true,
        defaultValue: _constants.CalendarStartDay.MONDAY
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.Max)(7),
    _ts_metadata("design:type", Number)
], GaugeChartConfigurationDTO.prototype, "firstDayOfTheWeek", void 0);
GaugeChartConfigurationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('GaugeChartConfiguration')
], GaugeChartConfigurationDTO);

//# sourceMappingURL=gauge-chart-configuration.dto.js.map