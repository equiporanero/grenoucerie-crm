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
    get DEFAULT_CONJUNCTION () {
        return DEFAULT_CONJUNCTION;
    },
    get addDefaultConjunctionIfMissing () {
        return addDefaultConjunctionIfMissing;
    }
});
const _parsefilterutil = require("./parse-filter.util");
const DEFAULT_CONJUNCTION = _parsefilterutil.Conjunctions.and;
const addDefaultConjunctionIfMissing = (filterQuery)=>{
    if (!_parsefilterutil.ROOT_FILTER_CONJUNCTION_REGEX.test(filterQuery)) {
        return `${DEFAULT_CONJUNCTION}(${filterQuery})`;
    }
    return filterQuery;
};

//# sourceMappingURL=add-default-conjunction.util.js.map