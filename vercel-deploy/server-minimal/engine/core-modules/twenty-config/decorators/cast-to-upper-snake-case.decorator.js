"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CastToUpperSnakeCase", {
    enumerable: true,
    get: function() {
        return CastToUpperSnakeCase;
    }
});
const _classtransformer = require("class-transformer");
const _lodashsnakecase = /*#__PURE__*/ _interop_require_default(require("lodash.snakecase"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const CastToUpperSnakeCase = ()=>(0, _classtransformer.Transform)(({ value })=>toUpperSnakeCase(value));
const toUpperSnakeCase = (value)=>{
    if (typeof value === 'string') {
        return (0, _lodashsnakecase.default)(value.trim()).toUpperCase();
    }
    return undefined;
};

//# sourceMappingURL=cast-to-upper-snake-case.decorator.js.map