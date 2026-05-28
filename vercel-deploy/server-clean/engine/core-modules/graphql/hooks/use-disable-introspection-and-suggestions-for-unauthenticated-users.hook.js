"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useDisableIntrospectionAndSuggestionsForUnauthenticatedUsers", {
    enumerable: true,
    get: function() {
        return useDisableIntrospectionAndSuggestionsForUnauthenticatedUsers;
    }
});
const _NoSchemaIntrospectionCustomRule = require("graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule");
const _utils = require("twenty-shared/utils");
const _removesuggestioninerrorsrule = require("../rules/remove-suggestion-in-errors.rule");
const useDisableIntrospectionAndSuggestionsForUnauthenticatedUsers = (isProductionEnvironment)=>({
        onValidate: ({ context, addValidationRule })=>{
            const isAuthenticated = (0, _utils.isDefined)(context.req.workspace);
            if (!isAuthenticated && isProductionEnvironment) {
                addValidationRule(_NoSchemaIntrospectionCustomRule.NoSchemaIntrospectionCustomRule);
                addValidationRule(_removesuggestioninerrorsrule.removeSuggestionInErrorsRule);
            }
        }
    });

//# sourceMappingURL=use-disable-introspection-and-suggestions-for-unauthenticated-users.hook.js.map