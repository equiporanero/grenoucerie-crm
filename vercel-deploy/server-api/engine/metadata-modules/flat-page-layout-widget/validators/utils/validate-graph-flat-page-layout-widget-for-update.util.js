"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateGraphFlatPageLayoutWidgetForUpdate", {
    enumerable: true,
    get: function() {
        return validateGraphFlatPageLayoutWidgetForUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _validatebasegraphfieldsutil = require("./validate-base-graph-fields.util");
const _validategraphconfigurationbytypeutil = require("./validate-graph-configuration-by-type.util");
const _validategraphconfigurationtypeutil = require("./validate-graph-configuration-type.util");
const validateGraphFlatPageLayoutWidgetForUpdate = (args)=>{
    const { flatEntityToValidate } = args;
    const { universalConfiguration, title: widgetTitle } = flatEntityToValidate;
    const errors = [];
    if (!(0, _utils.isDefined)(universalConfiguration)) {
        return [];
    }
    const result = (0, _validategraphconfigurationtypeutil.validateGraphConfigurationType)({
        universalConfiguration,
        widgetTitle
    });
    if (result.status === 'fail') {
        return result.errors;
    }
    const { graphUniversalConfiguration } = result;
    const baseFieldErrors = (0, _validatebasegraphfieldsutil.validateBaseGraphFields)({
        graphUniversalConfiguration,
        widgetTitle
    });
    errors.push(...baseFieldErrors);
    const typeSpecificErrors = (0, _validategraphconfigurationbytypeutil.validateGraphConfigurationByType)({
        graphUniversalConfiguration,
        widgetTitle
    });
    errors.push(...typeSpecificErrors);
    return errors;
};

//# sourceMappingURL=validate-graph-flat-page-layout-widget-for-update.util.js.map