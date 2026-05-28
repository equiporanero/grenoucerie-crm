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
    get kebabCase () {
        return kebabCase;
    },
    get kebabCaseDeep () {
        return kebabCaseDeep;
    }
});
const _lodashisobject = /*#__PURE__*/ _interop_require_default(require("lodash.isobject"));
const _lodashkebabcase = /*#__PURE__*/ _interop_require_default(require("lodash.kebabcase"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const kebabCase = (text)=>(0, _lodashkebabcase.default)(text);
const kebabCaseDeep = (value)=>{
    // Check if it's an array
    if (Array.isArray(value)) {
        return value.map(kebabCaseDeep);
    }
    // Check if it's an object
    if ((0, _lodashisobject.default)(value)) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const result = {};
        for(const key in value){
            result[kebabCase(key)] = kebabCaseDeep(value[key]);
        }
        return result;
    }
    return value;
};

//# sourceMappingURL=kebab-case.js.map