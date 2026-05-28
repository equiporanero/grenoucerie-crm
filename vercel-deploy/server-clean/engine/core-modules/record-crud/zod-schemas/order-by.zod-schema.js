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
    get ObjectRecordOrderByItemSchema () {
        return ObjectRecordOrderByItemSchema;
    },
    get ObjectRecordOrderBySchema () {
        return ObjectRecordOrderBySchema;
    },
    get OrderByDirectionEnum () {
        return OrderByDirectionEnum;
    }
});
const _zod = require("zod");
const OrderByDirectionEnum = _zod.z.enum([
    'AscNullsFirst',
    'AscNullsLast',
    'DescNullsFirst',
    'DescNullsLast'
]);
const ObjectRecordOrderByItemSchema = _zod.z.object({}).catchall(OrderByDirectionEnum).refine((obj)=>Object.keys(obj).length === 1, {
    message: 'Each orderBy item must specify exactly one field'
}).describe('Object with exactly ONE property: field name as key, OrderByDirection as value. Example: {"employees": "DescNullsLast"}');
const ObjectRecordOrderBySchema = _zod.z.array(ObjectRecordOrderByItemSchema).optional().describe('Array of sort criteria. Each item sorts by one field. Use "DescNullsLast" for descending (top/largest), "AscNullsFirst" for ascending (bottom/smallest). Example: [{"employees": "DescNullsLast"}]');

//# sourceMappingURL=order-by.zod-schema.js.map