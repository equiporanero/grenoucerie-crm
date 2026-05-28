"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformEnumValue", {
    enumerable: true,
    get: function() {
        return transformEnumValue;
    }
});
function transformEnumValue(options) {
    return options?.map((option)=>{
        if (/^\d/.test(option.value)) {
            return {
                ...option,
                value: `_${option.value}`
            };
        }
        return option;
    });
}

//# sourceMappingURL=transform-enum-value.js.map