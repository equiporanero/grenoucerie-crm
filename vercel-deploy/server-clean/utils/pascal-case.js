"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "pascalCaseDeep", {
    enumerable: true,
    get: function() {
        return pascalCaseDeep;
    }
});
const _lodashisobject = /*#__PURE__*/ _interop_require_default(require("lodash.isobject"));
const _utils = require("twenty-shared/utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const pascalCaseDeep = (value)=>{
    // Check if it's an array
    if (Array.isArray(value)) {
        return value.map(pascalCaseDeep);
    }
    // Check if it's an object
    if ((0, _lodashisobject.default)(value)) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        const result = {};
        for(const key in value){
            result[(0, _utils.pascalCase)(key)] = pascalCaseDeep(value[key]);
        }
        return result;
    }
    return value;
};

//# sourceMappingURL=pascal-case.js.map