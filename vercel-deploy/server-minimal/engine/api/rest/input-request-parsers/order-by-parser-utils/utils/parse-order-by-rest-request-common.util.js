"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseOrderBy", {
    enumerable: true,
    get: function() {
        return parseOrderBy;
    }
});
const _types = require("twenty-shared/types");
const _adddefaultorderbyidutil = require("../add-default-order-by-id.util");
const _restinputrequestparserexception = require("../../rest-input-request-parser.exception");
const DEFAULT_ORDER_DIRECTION = _types.OrderByDirection.AscNullsFirst;
const parseOrderBy = (orderByQuery)=>{
    if (typeof orderByQuery !== 'string') {
        return (0, _adddefaultorderbyidutil.addDefaultOrderById)([
            {}
        ]);
    }
    //orderByQuery = field_1[AscNullsFirst],field_2[DescNullsLast],field_3
    const orderByItems = orderByQuery.split(',');
    let result = [];
    let itemDirection = '';
    let itemFields = '';
    for (const orderByItem of orderByItems){
        // orderByItem -> field_1[AscNullsFirst]
        if (orderByItem.includes('[') && orderByItem.includes(']')) {
            const [fieldName, directionWithRightBracket] = orderByItem.split('[');
            const direction = directionWithRightBracket.replace(']', '');
            // fields -> [field_1] ; direction -> AscNullsFirst
            if (!(direction in _types.OrderByDirection)) {
                throw new _restinputrequestparserexception.RestInputRequestParserException(`'order_by' direction '${direction}' invalid. Allowed values are '${Object.values(_types.OrderByDirection).join("', '")}'. eg: ?order_by=field_1[AscNullsFirst],field_2[DescNullsLast],field_3`, _restinputrequestparserexception.RestInputRequestParserExceptionCode.INVALID_ORDER_BY_QUERY_PARAM);
            }
            itemDirection = direction;
            itemFields = fieldName;
        } else {
            // orderByItem -> field_3
            itemDirection = DEFAULT_ORDER_DIRECTION;
            itemFields = orderByItem;
        }
        let fieldResult = {};
        itemFields.split('.').reverse().forEach((field)=>{
            if (Object.keys(fieldResult).length) {
                fieldResult = {
                    [field]: fieldResult
                };
            } else {
                // @ts-expect-error legacy noImplicitAny
                fieldResult[field] = itemDirection;
            }
        }, itemDirection);
        const resultFields = Object.keys(fieldResult).map((key)=>({
                // @ts-expect-error legacy noImplicitAny
                [key]: fieldResult[key]
            }));
        result = [
            ...result,
            ...resultFields
        ];
    }
    return (0, _adddefaultorderbyidutil.addDefaultOrderById)(result);
};

//# sourceMappingURL=parse-order-by-rest-request-common.util.js.map