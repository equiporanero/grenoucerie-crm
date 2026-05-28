"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateWidgetConfigurationInput", {
    enumerable: true,
    get: function() {
        return validateWidgetConfigurationInput;
    }
});
const _classvalidator = require("class-validator");
const _aggregatechartconfigurationdto = require("../dtos/aggregate-chart-configuration.dto");
const _barchartconfigurationdto = require("../dtos/bar-chart-configuration.dto");
const _fieldconfigurationdto = require("../dtos/field-configuration.dto");
const _frontcomponentconfigurationdto = require("../dtos/front-component-configuration.dto");
const _gaugechartconfigurationdto = require("../dtos/gauge-chart-configuration.dto");
const _iframeconfigurationdto = require("../dtos/iframe-configuration.dto");
const _linechartconfigurationdto = require("../dtos/line-chart-configuration.dto");
const _piechartconfigurationdto = require("../dtos/pie-chart-configuration.dto");
const _recordtableconfigurationdto = require("../dtos/record-table-configuration.dto");
const _standalonerichtextconfigurationdto = require("../dtos/standalone-rich-text-configuration.dto");
const _widgetconfigurationtypetype = require("../enums/widget-configuration-type.type");
const _pagelayoutwidgetexception = require("../exceptions/page-layout-widget.exception");
const _validatewidgetconfigurationbydtoutil = require("./validate-widget-configuration-by-dto.util");
const formatValidationErrors = (errors, parentProperty)=>{
    return errors.map((err)=>{
        const propertyPath = parentProperty ? `${parentProperty}.${err.property}` : err.property;
        if (err.constraints) {
            const constraints = Object.values(err.constraints).join(', ');
            return `${propertyPath}: ${constraints}`;
        }
        if (err.children && err.children.length > 0) {
            return formatValidationErrors(err.children, propertyPath);
        }
        return `${propertyPath}: Unknown error`;
    }).join('; ');
};
const validateWidgetConfigurationInput = ({ configuration })=>{
    if (!(0, _classvalidator.isNotEmptyObject)(configuration)) {
        throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Invalid configuration: not an object', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
    }
    const configurationRecord = configuration;
    if (!Object.prototype.hasOwnProperty.call(configurationRecord, 'configurationType')) {
        throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Invalid configuration: missing configuration type', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
    }
    const configurationType = configurationRecord.configurationType;
    let errors = [];
    switch(configurationType){
        case _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_barchartconfigurationdto.BarChartConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_linechartconfigurationdto.LineChartConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_piechartconfigurationdto.PieChartConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_aggregatechartconfigurationdto.AggregateChartConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.GAUGE_CHART:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_gaugechartconfigurationdto.GaugeChartConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.IFRAME:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_iframeconfigurationdto.IframeConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.STANDALONE_RICH_TEXT:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_standalonerichtextconfigurationdto.StandaloneRichTextConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.FRONT_COMPONENT:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_frontcomponentconfigurationdto.FrontComponentConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.RECORD_TABLE:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_recordtableconfigurationdto.RecordTableConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.VIEW:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('View configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.FIELD:
            errors = (0, _validatewidgetconfigurationbydtoutil.validateWidgetConfigurationByDto)(_fieldconfigurationdto.FieldConfigurationDTO, configuration);
            break;
        case _widgetconfigurationtypetype.WidgetConfigurationType.FIELDS:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Fields configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.TIMELINE:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Timeline configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.TASKS:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Tasks configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.NOTES:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Notes configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.FILES:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Files configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.EMAILS:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Emails configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.CALENDAR:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Calendar configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.FIELD_RICH_TEXT:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Field rich text configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Workflow configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_VERSION:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Workflow version configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        case _widgetconfigurationtypetype.WidgetConfigurationType.WORKFLOW_RUN:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException('Workflow run configuration is not supported yet', _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
        default:
            throw new _pagelayoutwidgetexception.PageLayoutWidgetException(`Invalid configuration type: ${configurationType}`, _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
    }
    if (errors.length > 0) {
        throw new _pagelayoutwidgetexception.PageLayoutWidgetException(formatValidationErrors(errors), _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA);
    }
};

//# sourceMappingURL=validate-widget-configuration-input.util.js.map