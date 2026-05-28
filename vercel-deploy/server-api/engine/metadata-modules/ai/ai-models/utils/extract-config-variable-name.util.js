"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractConfigVariableName", {
    enumerable: true,
    get: function() {
        return extractConfigVariableName;
    }
});
const CONFIG_VAR_TEMPLATE_REGEX = /^\{\{(\w+)\}\}$/;
const extractConfigVariableName = (value)=>{
    if (!value) {
        return undefined;
    }
    const match = CONFIG_VAR_TEMPLATE_REGEX.exec(value);
    return match?.[1];
};

//# sourceMappingURL=extract-config-variable-name.util.js.map