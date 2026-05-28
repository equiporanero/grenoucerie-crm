"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CONFIG_VARIABLES_MASKING_CONFIG", {
    enumerable: true,
    get: function() {
        return CONFIG_VARIABLES_MASKING_CONFIG;
    }
});
const _configvariablesmaskingstrategiesenum = require("../enums/config-variables-masking-strategies.enum");
const CONFIG_VARIABLES_MASKING_CONFIG = {
    APP_SECRET: {
        strategy: _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.LAST_N_CHARS,
        chars: 5
    },
    PG_DATABASE_URL: {
        strategy: _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.HIDE_PASSWORD
    },
    REDIS_URL: {
        strategy: _configvariablesmaskingstrategiesenum.ConfigVariablesMaskingStrategies.HIDE_PASSWORD
    }
};

//# sourceMappingURL=config-variables-masking-config.js.map