"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isSnakeCaseString", {
    enumerable: true,
    get: function() {
        return isSnakeCaseString;
    }
});
const SNAKE_CASE_REGEX = /^(?!.*__)[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$/;
const isSnakeCaseString = (str)=>SNAKE_CASE_REGEX.test(str);

//# sourceMappingURL=is-snake-case-string.js.map