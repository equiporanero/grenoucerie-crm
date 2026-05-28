"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WidgetConfigurationType", {
    enumerable: true,
    get: function() {
        return WidgetConfigurationType;
    }
});
const _graphql = require("@nestjs/graphql");
const _graphtypeenum = require("./graph-type.enum");
var WidgetConfigurationType = function(WidgetConfigurationType) {
    WidgetConfigurationType[WidgetConfigurationType["AGGREGATE_CHART"] = _graphtypeenum.GraphType.AGGREGATE_CHART] = "AGGREGATE_CHART";
    WidgetConfigurationType[WidgetConfigurationType["GAUGE_CHART"] = _graphtypeenum.GraphType.GAUGE_CHART] = "GAUGE_CHART";
    WidgetConfigurationType[WidgetConfigurationType["PIE_CHART"] = _graphtypeenum.GraphType.PIE_CHART] = "PIE_CHART";
    WidgetConfigurationType[WidgetConfigurationType["BAR_CHART"] = _graphtypeenum.GraphType.BAR_CHART] = "BAR_CHART";
    WidgetConfigurationType[WidgetConfigurationType["LINE_CHART"] = _graphtypeenum.GraphType.LINE_CHART] = "LINE_CHART";
    WidgetConfigurationType["IFRAME"] = "IFRAME";
    WidgetConfigurationType["STANDALONE_RICH_TEXT"] = "STANDALONE_RICH_TEXT";
    WidgetConfigurationType["VIEW"] = "VIEW";
    WidgetConfigurationType["FIELD"] = "FIELD";
    WidgetConfigurationType["FIELDS"] = "FIELDS";
    WidgetConfigurationType["TIMELINE"] = "TIMELINE";
    WidgetConfigurationType["TASKS"] = "TASKS";
    WidgetConfigurationType["NOTES"] = "NOTES";
    WidgetConfigurationType["FILES"] = "FILES";
    WidgetConfigurationType["EMAILS"] = "EMAILS";
    WidgetConfigurationType["CALENDAR"] = "CALENDAR";
    WidgetConfigurationType["FIELD_RICH_TEXT"] = "FIELD_RICH_TEXT";
    WidgetConfigurationType["WORKFLOW"] = "WORKFLOW";
    WidgetConfigurationType["WORKFLOW_VERSION"] = "WORKFLOW_VERSION";
    WidgetConfigurationType["WORKFLOW_RUN"] = "WORKFLOW_RUN";
    WidgetConfigurationType["FRONT_COMPONENT"] = "FRONT_COMPONENT";
    WidgetConfigurationType["RECORD_TABLE"] = "RECORD_TABLE";
    WidgetConfigurationType["EMAIL_THREAD"] = "EMAIL_THREAD";
    return WidgetConfigurationType;
}({});
(0, _graphql.registerEnumType)(WidgetConfigurationType, {
    name: 'WidgetConfigurationType'
});

//# sourceMappingURL=widget-configuration-type.type.js.map