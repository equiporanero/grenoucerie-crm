"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "configVariableMaskSensitiveData", {
    enumerable: true,
    get: function() {
        return configVariableMaskSensitiveData;
    }
});
const _configvariablesmaskingstrategiesenum = require("../enums/config-variables-masking-strategies.enum");
const configVariableMaskSensitiveData = (value, strategy, options)=>{
    if (!value || typeof value !== 'string') return value;
    switch(strategy){
        case _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS:
            {
                const n = Math.max(1, options?.chars ?? 5);
                return value.length > n ? `********${value.slice(-n)}` : '********';
            }
        case _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.HIDE_PASSWORD:
            {
                try {
                    const url = new URL(value);
                    if (url.password) {
                        url.password = '********';
                    }
                    if (url.username) {
                        url.username = '********';
                    }
                    return url.toString();
                } catch  {
                    throw new Error(`Invalid URL format for ${options?.variableName || 'config variable'} in HIDE_PASSWORD masking strategy`);
                }
            }
        default:
            return value;
    }
};

//# sourceMappingURL=config-variable-mask-sensitive-data.util.js.map