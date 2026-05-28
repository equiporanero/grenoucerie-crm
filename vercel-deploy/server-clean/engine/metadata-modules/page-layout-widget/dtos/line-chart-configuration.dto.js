"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LineChartConfigurationDTO", {
    enumerable: true,
    get: function() {
        return LineChartConfigurationDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _graphqltypejson = require("graphql-type-json");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _axisnamedisplayenum = require("../enums/axis-name-display.enum");
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
let LineChartConfigurationDTO = class LineChartConfigurationDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_widgetconfigurationtypetype.WidgetConfigurationType),
    (0, _classvalidator.IsIn)([
        _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART
    ]),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _widgetconfigurationtypetype.WidgetConfigurationType === "undefined" || typeof _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART === "undefined" ? Object : _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART)
], LineChartConfigurationDTO.prototype, "configurationType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.SerializedRelation === "undefined" ? Object : _types.SerializedRelation)
], LineChartConfigurationDTO.prototype, "aggregateFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_types.AggregateOperations),
    (0, _classvalidator.IsEnum)(_types.AggregateOperations),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.AggregateOperations === "undefined" ? Object : _types.AggregateOperations)
], LineChartConfigurationDTO.prototype, "aggregateOperation", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _types.SerializedRelation === "undefined" ? Object : _types.SerializedRelation)
], LineChartConfigurationDTO.prototype, "primaryAxisGroupByFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], LineChartConfigurationDTO.prototype, "primaryAxisGroupBySubFieldName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_dategranularityenum.ObjectRecordGroupByDateGranularity, {
        nullable: true,
        defaultValue: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY
    }),
    (0, _classvalidator.IsEnum)(_dategranularityenum.ObjectRecordGroupByDateGranularity),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _dategranularityenum.ObjectRecordGroupByDateGranularity === "undefined" ? Object : _dategranularityenum.ObjectRecordGroupByDateGranularity)
], LineChartConfigurationDTO.prototype, "primaryAxisDateGranularity", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphorderbyenum.GraphOrderBy, {
        nullable: true,
        defaultValue: _graphorderbyenum.GraphOrderBy.FIELD_ASC
    }),
    (0, _classvalidator.IsEnum)(_graphorderbyenum.GraphOrderBy),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _graphorderbyenum.GraphOrderBy === "undefined" ? Object : _graphorderbyenum.GraphOrderBy)
], LineChartConfigurationDTO.prototype, "primaryAxisOrderBy", void 0);
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
], LineChartConfigurationDTO.prototype, "primaryAxisManualSortOrder", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: true
    }),
    (0, _classvalidator.IsUUID)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _types.SerializedRelation === "undefined" ? Object : _types.SerializedRelation)
], LineChartConfigurationDTO.prototype, "secondaryAxisGroupByFieldMetadataId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], LineChartConfigurationDTO.prototype, "secondaryAxisGroupBySubFieldName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_dategranularityenum.ObjectRecordGroupByDateGranularity, {
        nullable: true,
        defaultValue: _dategranularityenum.ObjectRecordGroupByDateGranularity.DAY
    }),
    (0, _classvalidator.IsEnum)(_dategranularityenum.ObjectRecordGroupByDateGranularity),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _dategranularityenum.ObjectRecordGroupByDateGranularity === "undefined" ? Object : _dategranularityenum.ObjectRecordGroupByDateGranularity)
], LineChartConfigurationDTO.prototype, "secondaryAxisGroupByDateGranularity", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphorderbyenum.GraphOrderBy, {
        nullable: true
    }),
    (0, _classvalidator.IsEnum)(_graphorderbyenum.GraphOrderBy),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _graphorderbyenum.GraphOrderBy === "undefined" ? Object : _graphorderbyenum.GraphOrderBy)
], LineChartConfigurationDTO.prototype, "secondaryAxisOrderBy", void 0);
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
], LineChartConfigurationDTO.prototype, "secondaryAxisManualSortOrder", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], LineChartConfigurationDTO.prototype, "omitNullValues", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], LineChartConfigurationDTO.prototype, "splitMultiValueFields", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_axisnamedisplayenum.AxisNameDisplay, {
        nullable: true,
        defaultValue: _axisnamedisplayenum.AxisNameDisplay.NONE
    }),
    (0, _classvalidator.IsEnum)(_axisnamedisplayenum.AxisNameDisplay),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _axisnamedisplayenum.AxisNameDisplay === "undefined" ? Object : _axisnamedisplayenum.AxisNameDisplay)
], LineChartConfigurationDTO.prototype, "axisNameDisplay", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: false
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], LineChartConfigurationDTO.prototype, "displayDataLabel", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true,
        defaultValue: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], LineChartConfigurationDTO.prototype, "displayLegend", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], LineChartConfigurationDTO.prototype, "rangeMin", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], LineChartConfigurationDTO.prototype, "rangeMax", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], LineChartConfigurationDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], LineChartConfigurationDTO.prototype, "color", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.GraphQLJSON, {
        nullable: true
    }),
    (0, _classvalidator.IsObject)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof ChartFilter === "undefined" ? Object : ChartFilter)
], LineChartConfigurationDTO.prototype, "filter", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], LineChartConfigurationDTO.prototype, "isStacked", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        nullable: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], LineChartConfigurationDTO.prototype, "isCumulative", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true,
        defaultValue: 'UTC'
    }),
    (0, _classvalidator.IsTimeZone)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], LineChartConfigurationDTO.prototype, "timezone", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Int, {
        nullable: true,
        defaultValue: _constants.CalendarStartDay.MONDAY
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.Min)(0),
    (0, _classvalidator.Max)(7),
    _ts_metadata("design:type", Number)
], LineChartConfigurationDTO.prototype, "firstDayOfTheWeek", void 0);
LineChartConfigurationDTO = _ts_decorate([
    (0, _graphql.ObjectType)('LineChartConfiguration')
], LineChartConfigurationDTO);

//# sourceMappingURL=line-chart-configuration.dto.js.map