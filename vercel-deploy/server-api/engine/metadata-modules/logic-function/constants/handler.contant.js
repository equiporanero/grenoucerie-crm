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
    get DEFAULT_BUILT_HANDLER_PATH () {
        return DEFAULT_BUILT_HANDLER_PATH;
    },
    get DEFAULT_HANDLER_NAME () {
        return DEFAULT_HANDLER_NAME;
    },
    get DEFAULT_SOURCE_HANDLER_PATH () {
        return DEFAULT_SOURCE_HANDLER_PATH;
    },
    get HANDLER_NAME_REGEX () {
        return HANDLER_NAME_REGEX;
    }
});
const DEFAULT_BUILT_HANDLER_PATH = 'src/index.mjs';
const DEFAULT_SOURCE_HANDLER_PATH = 'src/index.ts';
const DEFAULT_HANDLER_NAME = 'main';
const HANDLER_NAME_REGEX = /^[a-zA-Z_$][a-zA-Z0-9_$]*(\.[a-zA-Z_$][a-zA-Z0-9_$]*)*$/;

//# sourceMappingURL=handler.contant.js.map