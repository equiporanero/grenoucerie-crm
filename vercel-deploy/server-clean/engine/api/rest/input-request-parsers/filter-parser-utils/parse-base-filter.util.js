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
    get FilterComparators () {
        return FilterComparators;
    },
    get parseBaseFilter () {
        return parseBaseFilter;
    }
});
const _common = require("@nestjs/common");
var FilterComparators = /*#__PURE__*/ function(FilterComparators) {
    FilterComparators["eq"] = "eq";
    FilterComparators["neq"] = "neq";
    FilterComparators["in"] = "in";
    FilterComparators["containsAny"] = "containsAny";
    FilterComparators["is"] = "is";
    FilterComparators["gt"] = "gt";
    FilterComparators["gte"] = "gte";
    FilterComparators["lt"] = "lt";
    FilterComparators["lte"] = "lte";
    FilterComparators["startsWith"] = "startsWith";
    FilterComparators["endsWith"] = "endsWith";
    FilterComparators["like"] = "like";
    FilterComparators["ilike"] = "ilike";
    return FilterComparators;
}({});
const parseBaseFilter = (baseFilter)=>{
    if (!baseFilter.match(`^(.+)\\[(.+)\\]:(.+)$`)) {
        throw new _common.BadRequestException(`'filter' invalid for '${baseFilter}'. eg: price[gte]:10`);
    }
    let fields = '';
    let comparator = '';
    let value = '';
    let fillFields = true;
    let fillComparator = false;
    let fillValue = false;
    // baseFilter = field_1.subfield[in]:["2023-00-00 OO:OO:OO","2024-00-00 OO:OO:OO"]
    for (const c of baseFilter){
        if (fillValue) value += c;
        if (c === ']' && !fillValue) fillComparator = false;
        if (c === ':' && !fillComparator) fillValue = true;
        if (fillComparator) comparator += c;
        if (c === '[' && fillFields) {
            fillFields = false;
            fillComparator = true;
        }
        if (fillFields) fields += c;
    }
    // field = field_1.subfield ; comparator = in ; value = ["2023-00-00 OO:OO:OO","2024-00-00 OO:OO:OO"]
    if (!Object.keys(FilterComparators).includes(comparator)) {
        throw new _common.BadRequestException(`'filter' invalid for '${baseFilter}', comparator ${comparator} not in ${Object.keys(FilterComparators).join(', ')}`);
    }
    return {
        fields: fields.split('.'),
        comparator,
        value
    };
};

//# sourceMappingURL=parse-base-filter.util.js.map