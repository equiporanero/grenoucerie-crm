"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AggregateChartConfigurationDTO", {
    enumerable: true,
    get: function() {
        return AggregateChartConfigurationDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _ratioaggregateconfigdto = require("./ratio-aggregate-config.dto");
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
let AggregateChartConfigurationDTO = class AggregateChartConfigurationDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_widgetconfigurationtypetype.WidgetConfigurationType),
    (0, _classvalidator.IsIn)([
        _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART
    ]),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _widgetconfigurationtypetype.WidgetConfigurationType === "undefined" || typeof _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART === "undefined" ? Object : _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART)
], AggregateChartConfigurationDTO.prototype, "configurationType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.SerializedRelation === "undefined" ? Object : _types.SerializedRelation)
], AggregateChartConfigurationDTO.prototype, "aggregateFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.AggregateOperations),
    (0, _classvalidator.IsEnum)(_types.AggregateOperations),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.AggregateOperations === "undefined" ? Object : _types.AggregateOperations)
], AggregateChartConfigurationDTO.prototype, "aggregateOperation", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], AggregateChartConfigurationDTO.prototype, "label", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: false
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], AggregateChartConfigurationDTO.prototype, "displayDataLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], AggregateChartConfigurationDTO.prototype, "format", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], AggregateChartConfigurationDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof ChartFilter === "undefined" ? Object : ChartFilter)
], AggregateChartConfigurationDTO.prototype, "filter", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true,
        defaultValue: 'UTC'
    }),
    (0, _classvalidator.IsTimeZone)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], AggregateChartConfigurationDTO.prototype, "timezone", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true,
        defaultValue: _constants.CalendarStartDay.MONDAY
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.Max)(7),
    _ts_metadata("design:type", Number)
], AggregateChartConfigurationDTO.prototype, "firstDayOfTheWeek", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], AggregateChartConfigurationDTO.prototype, "prefix", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], AggregateChartConfigurationDTO.prototype, "suffix", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_ratioaggregateconfigdto.RatioAggregateConfigDTO, {
        nullable: true
    }),
    (0, _classvalidator.ValidateNested)(),
    (0, _classtransformer.Type)(()=>_ratioaggregateconfigdto.RatioAggregateConfigDTO),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _ratioaggregateconfigdto.RatioAggregateConfigDTO === "undefined" ? Object : _ratioaggregateconfigdto.RatioAggregateConfigDTO)
], AggregateChartConfigurationDTO.prototype, "ratioAggregateConfig", void 0);
AggregateChartConfigurationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AggregateChartConfiguration')
], AggregateChartConfigurationDTO);

//# sourceMappingURL=aggregate-chart-configuration.dto.js.map