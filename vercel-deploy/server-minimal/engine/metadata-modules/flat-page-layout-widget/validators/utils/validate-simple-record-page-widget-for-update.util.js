"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateSimpleRecordPageWidgetForUpdate", {
    enumerable: true,
    get: function() {
        return validateSimpleRecordPageWidgetForUpdate;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _pagelayoutwidgetexception = require("../../../page-layout-widget/exceptions/page-layout-widget.exception");
const validateSimpleRecordPageWidgetForUpdate = (expectedConfigurationType)=>(args)=>{
        const { flatEntityToValidate } = args;
        const { universalConfiguration, title: widgetTitle } = flatEntityToValidate;
        if (!(0, _utils.isDefined)(universalConfiguration)) {
            return [];
        }
        const errors = [];
        if (universalConfiguration.configurationType !== expectedConfigurationType) {
            const expectedString = expectedConfigurationType.toString();
            const actualString = universalConfiguration.configurationType?.toString() ?? 'undefined';
            errors.push({
                code: _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "nFIvYZ",
                    message: 'Invalid configuration type for widget "{widgetTitle}". Expected {expectedString}, got {actualString}',
                    values: {
                        widgetTitle: widgetTitle,
                        expectedString: expectedString,
                        actualString: actualString
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "IptMRL",
                    message: "Invalid configuration type for widget"
                },
                value: universalConfiguration.configurationType
            });
        }
        return errors;
    };

//# sourceMappingURL=validate-simple-record-page-widget-for-update.util.js.map