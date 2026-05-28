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
    get ASYNC_OPTIONS_TYPE () {
        return ASYNC_OPTIONS_TYPE;
    },
    get ConfigurableModuleClass () {
        return ConfigurableModuleClass;
    },
    get MODULE_OPTIONS_TOKEN () {
        return MODULE_OPTIONS_TOKEN;
    },
    get OPTIONS_TYPE () {
        return OPTIONS_TYPE;
    }
});
const _common = require("@nestjs/common");
const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } = new _common.ConfigurableModuleBuilder({
    moduleName: 'ExceptionHandlerModule'
}).setClassMethodName('forRoot').build();

//# sourceMappingURL=exception-handler.module-definition.js.map