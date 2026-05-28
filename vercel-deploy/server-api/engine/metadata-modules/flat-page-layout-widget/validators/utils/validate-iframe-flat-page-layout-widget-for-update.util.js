"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateIframeFlatPageLayoutWidgetForUpdate", {
    enumerable: true,
    get: function() {
        return validateIframeFlatPageLayoutWidgetForUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _validateiframeconfigurationtypeutil = require("./validate-iframe-configuration-type.util");
const _validateiframeurlutil = require("./validate-iframe-url.util");
const validateIframeFlatPageLayoutWidgetForUpdate = (args)=>{
    const { flatEntityToValidate } = args;
    const { universalConfiguration, title: widgetTitle } = flatEntityToValidate;
    const errors = [];
    if (!(0, _utils.isDefined)(universalConfiguration)) {
        return [];
    }
    const result = (0, _validateiframeconfigurationtypeutil.validateIframeConfigurationType)({
        universalConfiguration,
        widgetTitle
    });
    if (result.status === 'fail') {
        return result.errors;
    }
    const { iframeUniversalConfiguration } = result;
    const urlErrors = (0, _validateiframeurlutil.validateIframeUrl)({
        iframeUniversalConfiguration,
        widgetTitle
    });
    errors.push(...urlErrors);
    return errors;
};

//# sourceMappingURL=validate-iframe-flat-page-layout-widget-for-update.util.js.map