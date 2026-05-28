"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeSuggestionInErrorsRule", {
    enumerable: true,
    get: function() {
        return removeSuggestionInErrorsRule;
    }
});
const removeSuggestionInErrorsRule = (context)=>{
    const originalReportError = context.reportError.bind(context);
    context.reportError = (error)=>{
        error.message = error.message.replace(/ Did you mean[^?]*\?/g, '');
        originalReportError(error);
    };
    return {};
};

//# sourceMappingURL=remove-suggestion-in-errors.rule.js.map