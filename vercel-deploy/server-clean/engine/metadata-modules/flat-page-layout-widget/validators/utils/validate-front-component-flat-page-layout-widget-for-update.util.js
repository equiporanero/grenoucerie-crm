"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateFrontComponentFlatPageLayoutWidgetForUpdate", {
    enumerable: true,
    get: function() {
        return validateFrontComponentFlatPageLayoutWidgetForUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _validatefrontcomponentconfigurationtypeutil = require("./validate-front-component-configuration-type.util");
const validateFrontComponentFlatPageLayoutWidgetForUpdate = (args)=>{
    const { flatEntityToValidate } = args;
    const { universalConfiguration, title } = flatEntityToValidate;
    const errors = [];
    if (!(0, _utils.isDefined)(universalConfiguration)) {
        return [];
    }
    const configurationTypeErrors = (0, _validatefrontcomponentconfigurationtypeutil.validateFrontComponentConfigurationType)({
        universalConfiguration,
        title
    });
    errors.push(...configurationTypeErrors);
    return errors;
};

//# sourceMappingURL=validate-front-component-flat-page-layout-widget-for-update.util.js.map