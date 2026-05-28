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
    get Conjunctions () {
        return Conjunctions;
    },
    get ROOT_FILTER_CONJUNCTION_REGEX () {
        return ROOT_FILTER_CONJUNCTION_REGEX;
    },
    get parseFilter () {
        return parseFilter;
    }
});
const _common = require("@nestjs/common");
const _formatfieldvaluesutil = require("./format-field-values.util");
const _parsebasefilterutil = require("./parse-base-filter.util");
const _parsefiltercontentutil = require("./parse-filter-content.util");
const _restinputrequestparserexception = require("../rest-input-request-parser.exception");
var Conjunctions = /*#__PURE__*/ function(Conjunctions) {
    Conjunctions["or"] = "or";
    Conjunctions["and"] = "and";
    Conjunctions["not"] = "not";
    return Conjunctions;
}({});
const ROOT_FILTER_CONJUNCTION_REGEX = new RegExp(`^(${Object.values(Conjunctions).join('|')})\\((.+)\\)$`);
const parseFilter = (filterQuery)=>{
    const result = {};
    const match = filterQuery.match(ROOT_FILTER_CONJUNCTION_REGEX);
    if (match) {
        const conjunction = match?.[1];
        if (!conjunction) {
            throw new _common.BadRequestException('Error while matching filter query. Conjunction not found');
        }
        const subResult = (0, _parsefiltercontentutil.parseFilterContent)(filterQuery).map((elem)=>parseFilter(elem));
        if (conjunction === "not") {
            if (subResult.length > 1) {
                throw new _restinputrequestparserexception.RestInputRequestParserException(`'filter' invalid. 'not' conjunction should contain only 1 condition. eg: not(field[eq]:1)`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_FILTER_QUERY_PARAM, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "1yoHmO",
                        message: "Invalid filter parameter."
                    }
                });
            }
            // @ts-expect-error legacy noImplicitAny
            result[conjunction] = subResult[0];
        } else {
            // @ts-expect-error legacy noImplicitAny
            result[conjunction] = subResult;
        }
        return result;
    }
    const { fields, comparator, value } = (0, _parsebasefilterutil.parseBaseFilter)(filterQuery);
    const formattedValue = (0, _formatfieldvaluesutil.formatFieldValue)(value, undefined, comparator);
    return fields.reverse().reduce((acc, currentValue)=>{
        return {
            [currentValue]: acc
        };
    }, {
        [comparator]: formattedValue
    });
};

//# sourceMappingURL=parse-filter.util.js.map