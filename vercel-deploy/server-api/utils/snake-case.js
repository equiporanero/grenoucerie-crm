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
    get snakeCase () {
        return snakeCase;
    },
    get snakeCaseDeep () {
        return snakeCaseDeep;
    }
});
const _lodashisobject = /*#__PURE__*/ _interop_require_default(require("lodash.isobject"));
const _lodashsnakecase = /*#__PURE__*/ _interop_require_default(require("lodash.snakecase"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const snakeCase = (text)=>(0, _lodashsnakecase.default)(text);
const snakeCaseDeep = (value)=>{
    // Check if it's an array
    if (Array.isArray(value)) {
        return value.map(snakeCaseDeep);
    }
    // Check if it's an object
    if ((0, _lodashisobject.default)(value)) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const result = {};
        for(const key in value){
            result[snakeCase(key)] = snakeCaseDeep(value[key]);
        }
        return result;
    }
    return value;
};

//# sourceMappingURL=snake-case.js.map