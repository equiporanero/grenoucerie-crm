"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "escapeForIlike", {
    enumerable: true,
    get: function() {
        return escapeForIlike;
    }
});
const escapeForIlike = (value)=>value.replace(/[\\%_]/g, '\\$&');

//# sourceMappingURL=escape-for-ilike.js.map