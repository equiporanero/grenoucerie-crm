"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ConfigurableModuleClass () {
        return ConfigurableModuleClass;
    },
    get MODULE_OPTIONS_TOKEN () {
        return MODULE_OPTIONS_TOKEN;
    }
});
const _common = require("@nestjs/common");
const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new _common.ConfigurableModuleBuilder({
    moduleName: 'TwentyConfig'
}).setClassMethodName('forRoot').build();

//# sourceMappingURL=twenty-config.module-definition.js.map