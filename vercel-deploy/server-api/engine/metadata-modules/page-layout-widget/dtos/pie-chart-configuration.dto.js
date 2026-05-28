"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PieChartConfigurationDTO", {
    enumerable: true,
    get: function() {
        return PieChartConfigurationDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _dategranularityenum = require("../enums/date-granularity.enum");
const _graphorderbyenum = require("../enums/graph-order-by.enum");
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
let PieChartConfigurationDTO = class PieChartConfigurationDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_widgetconfigurationtypetype.WidgetConfigurationType),
    (0, _classvalidator.IsIn)([
        _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART
    ]),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _widgetconfigurationtypetype.WidgetConfigurationType === "undefined" || typeof _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART === "undefined" ? Object : _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART)
], PieChartConfigurationDTO.prototype, "configurationType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.SerializedRelation === "undefined" ? Object : _types.SerializedRelation)
], PieChartConfigurationDTO.prototype, "aggregateFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.AggregateOperations),
    (0, _classvalidator.IsEnum)(_types.AggregateOperations),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.AggregateOperations === "undefined" ? Object : _types.AggregateOperations)
], PieChartConfigurationDTO.prototype, "aggregateOperation", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.SerializedRelation === "undefined" ? Object : _types.SerializedRelation)
], PieChartConfigurationDTO.prototype, "groupByFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], PieChartConfigurationDTO.prototype, "groupBySubFieldName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_dategranularityenum.ObjectRecordGroupByDateGranularity, {
        nullable: true,
        defaultValue: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY
    }),
    (0, _classvalidator.IsEnum)(_dategranularityenum.ObjectRecordGroupByDateGranularity),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _dategranularityenum.ObjectRecordGroupByDateGranularity === "undefined" ? Object : _dategranularityenum.ObjectRecordGroupByDateGranularity)
], PieChartConfigurationDTO.prototype, "dateGranularity", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphorderbyenum.GraphOrderBy, {
        nullable: true,
        defaultValue: _graphorderbyenum.GraphOrderBy.VALUE_DESC
    }),
    (0, _classvalidator.IsEnum)(_graphorderbyenum.GraphOrderBy),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _graphorderbyenum.GraphOrderBy === "undefined" ? Object : _graphorderbyenum.GraphOrderBy)
], PieChartConfigurationDTO.prototype, "orderBy", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            String
        ], {
        nullable: true
    }),
    (0, _classvalidator.IsArray)(),
    (0, _classvalidator.IsString)({
        each: true
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Array)
], PieChartConfigurationDTO.prototype, "manualSortOrder", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: false
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], PieChartConfigurationDTO.prototype, "displayDataLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], PieChartConfigurationDTO.prototype, "showCenterMetric", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], PieChartConfigurationDTO.prototype, "displayLegend", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: false
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], PieChartConfigurationDTO.prototype, "hideEmptyCategory", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], PieChartConfigurationDTO.prototype, "splitMultiValueFields", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], PieChartConfigurationDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], PieChartConfigurationDTO.prototype, "color", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof ChartFilter === "undefined" ? Object : ChartFilter)
], PieChartConfigurationDTO.prototype, "filter", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true,
        defaultValue: 'UTC'
    }),
    (0, _classvalidator.IsTimeZone)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], PieChartConfigurationDTO.prototype, "timezone", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true,
        defaultValue: _constants.CalendarStartDay.MONDAY
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.Max)(7),
    _ts_metadata("design:type", Number)
], PieChartConfigurationDTO.prototype, "firstDayOfTheWeek", void 0);
PieChartConfigurationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('PieChartConfiguration')
], PieChartConfigurationDTO);

//# sourceMappingURL=pie-chart-configuration.dto.js.map