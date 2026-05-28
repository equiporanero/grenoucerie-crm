"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateGraphConfigurationByType", {
    enumerable: true,
    get: function() {
        return validateGraphConfigurationByType;
    }
});
const _validatebarchartconfigurationutil = require("./validate-bar-chart-configuration.util");
const _validatelinechartconfigurationutil = require("./validate-line-chart-configuration.util");
const _validatepiechartconfigurationutil = require("./validate-pie-chart-configuration.util");
const _widgetconfigurationtypetype = require("../../../page-layout-widget/enums/widget-configuration-type.type");
const validateGraphConfigurationByType = ({ graphUniversalConfiguration, widgetTitle })=>{
    const configurationType = graphUniversalConfiguration.configurationType;
    switch(configurationType){
        case _widgetconfigurationtypetype.WidgetConfigurationType.BAR_CHART:
            return (0, _validatebarchartconfigurationutil.validateBarChartConfiguration)({
                graphUniversalConfiguration,
                widgetTitle
            });
        case _widgetconfigurationtypetype.WidgetConfigurationType.LINE_CHART:
            return (0, _validatelinechartconfigurationutil.validateLineChartConfiguration)({
                graphUniversalConfiguration,
                widgetTitle
            });
        case _widgetconfigurationtypetype.WidgetConfigurationType.PIE_CHART:
            return (0, _validatepiechartconfigurationutil.validatePieChartConfiguration)({
                graphUniversalConfiguration,
                widgetTitle
            });
        case _widgetconfigurationtypetype.WidgetConfigurationType.AGGREGATE_CHART:
        case _widgetconfigurationtypetype.WidgetConfigurationType.GAUGE_CHART:
            return [];
        default:
            return [];
    }
};

//# sourceMappingURL=validate-graph-configuration-by-type.util.js.map