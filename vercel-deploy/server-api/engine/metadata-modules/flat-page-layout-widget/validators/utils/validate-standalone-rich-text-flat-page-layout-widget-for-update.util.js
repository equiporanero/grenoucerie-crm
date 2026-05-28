"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateStandaloneRichTextFlatPageLayoutWidgetForUpdate", {
    enumerable: true,
    get: function() {
        return validateStandaloneRichTextFlatPageLayoutWidgetForUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _validatestandalonerichtextbodyutil = require("./validate-standalone-rich-text-body.util");
const _validatestandalonerichtextconfigurationtypeutil = require("./validate-standalone-rich-text-configuration-type.util");
const validateStandaloneRichTextFlatPageLayoutWidgetForUpdate = (args)=>{
    const { flatEntityToValidate } = args;
    const { universalConfiguration, title: widgetTitle } = flatEntityToValidate;
    const errors = [];
    if (!(0, _utils.isDefined)(universalConfiguration)) {
        return [];
    }
    const result = (0, _validatestandalonerichtextconfigurationtypeutil.validateStandaloneRichTextConfigurationType)({
        universalConfiguration,
        widgetTitle
    });
    if (result.status === 'fail') {
        return result.errors;
    }
    const { standaloneRichTextUniversalConfiguration } = result;
    const bodyErrors = (0, _validatestandalonerichtextbodyutil.validateStandaloneRichTextBody)({
        standaloneRichTextUniversalConfiguration,
        widgetTitle
    });
    errors.push(...bodyErrors);
    return errors;
};

//# sourceMappingURL=validate-standalone-rich-text-flat-page-layout-widget-for-update.util.js.map