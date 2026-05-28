"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "replaceLegacyPageEditModeIdentifier", {
    enumerable: true,
    get: function() {
        return replaceLegacyPageEditModeIdentifier;
    }
});
const _utils = require("twenty-shared/utils");
const LEGACY_PAGE_EDIT_MODE_IDENTIFIER = 'isPageInEditMode';
const DASHBOARD_PAGE_LAYOUT_EDIT_MODE_IDENTIFIER = 'isDashboardPageLayoutInEditMode';
const DASHBOARD_PAGE_LAYOUT_EDIT_MODE_EXPRESSION = _utils.conditionalAvailabilityParser.parse(DASHBOARD_PAGE_LAYOUT_EDIT_MODE_IDENTIFIER);
const replaceLegacyPageEditModeIdentifier = (conditionalAvailabilityExpression)=>{
    if (!(0, _utils.isDefined)(conditionalAvailabilityExpression)) {
        return conditionalAvailabilityExpression;
    }
    try {
        const parsedConditionalAvailabilityExpression = _utils.conditionalAvailabilityParser.parse(conditionalAvailabilityExpression);
        if (!parsedConditionalAvailabilityExpression.variables().includes(LEGACY_PAGE_EDIT_MODE_IDENTIFIER)) {
            return conditionalAvailabilityExpression;
        }
        return parsedConditionalAvailabilityExpression.substitute(LEGACY_PAGE_EDIT_MODE_IDENTIFIER, DASHBOARD_PAGE_LAYOUT_EDIT_MODE_EXPRESSION).toString();
    } catch  {
        return conditionalAvailabilityExpression;
    }
};

//# sourceMappingURL=replace-legacy-page-edit-mode-identifier.util.js.map