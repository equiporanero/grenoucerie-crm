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
    get camelCase () {
        return camelCase;
    },
    get camelCaseDeep () {
        return camelCaseDeep;
    }
});
const _lodashisobject = /*#__PURE__*/ _interop_require_default(require("lodash.isobject"));
const _lodashcamelcase = /*#__PURE__*/ _interop_require_default(require("lodash.camelcase"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const camelCase = (text)=>(0, _lodashcamelcase.default)(text);
const camelCaseDeep = (value)=>{
    // Check if it's an array
    if (Array.isArray(value)) {
        return value.map(camelCaseDeep);
    }
    // Check if it's an object
    if ((0, _lodashisobject.default)(value)) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const result = {};
        for(const key in value){
            result[camelCase(key)] = camelCaseDeep(value[key]);
        }
        return result;
    }
    return value;
};

//# sourceMappingURL=camel-case.js.map