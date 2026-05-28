"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WidgetConfiguration", {
    enumerable: true,
    get: function() {
        return WidgetConfiguration;
    }
});
const _graphql = require("@nestjs/graphql");
const _allwidgetconfigurationtypevalidatorbywidgetconfigurationtypeconstant = require("../constants/all-widget-configuration-type-validator-by-widget-configuration-type.constant");
const WidgetConfiguration = (0, _graphql.createUnionType)({
    name: 'WidgetConfiguration',
    types: ()=>Object.values(_allwidgetconfigurationtypevalidatorbywidgetconfigurationtypeconstant.ALL_WIDGET_CONFIGURATION_TYPE_VALIDATOR_BY_WIDGET_CONFIGURATION_TYPE),
    resolveType ({ configurationType }) {
        return _allwidgetconfigurationtypevalidatorbywidgetconfigurationtypeconstant.ALL_WIDGET_CONFIGURATION_TYPE_VALIDATOR_BY_WIDGET_CONFIGURATION_TYPE[configurationType];
    }
});

//# sourceMappingURL=widget-configuration.interface.js.map