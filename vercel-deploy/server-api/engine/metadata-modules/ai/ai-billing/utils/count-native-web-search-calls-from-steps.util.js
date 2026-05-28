"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "countNativeWebSearchCallsFromSteps", {
    enumerable: true,
    get: function() {
        return countNativeWebSearchCallsFromSteps;
    }
});
const WEB_SEARCH_TOOL_NAME = 'web_search';
const countNativeWebSearchCallsFromSteps = (steps)=>steps.reduce((count, step)=>count + step.toolCalls.filter((toolCall)=>toolCall.toolName === WEB_SEARCH_TOOL_NAME).length, 0);

//# sourceMappingURL=count-native-web-search-calls-from-steps.util.js.map