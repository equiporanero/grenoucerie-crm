"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseClickHouseOrderBy", {
    enumerable: true,
    get: function() {
        return parseClickHouseOrderBy;
    }
});
const _utils = require("twenty-shared/utils");
const parseClickHouseOrderBy = (orderBy)=>{
    if (!(0, _utils.isDefined)(orderBy) || orderBy.length === 0) {
        return '';
    }
    const orderClauses = [];
    for (const orderItem of orderBy){
        for (const [fieldName, direction] of Object.entries(orderItem)){
            const normalizedDirection = direction.toUpperCase().replace('NULLS_FIRST', 'NULLS FIRST').replace('NULLS_LAST', 'NULLS LAST').replace('ASC_NULLS_FIRST', 'ASC NULLS FIRST').replace('ASC_NULLS_LAST', 'ASC NULLS LAST').replace('DESC_NULLS_FIRST', 'DESC NULLS FIRST').replace('DESC_NULLS_LAST', 'DESC NULLS LAST');
            orderClauses.push(`"${fieldName}" ${normalizedDirection}`);
        }
    }
    return orderClauses.length > 0 ? `ORDER BY ${orderClauses.join(', ')}` : '';
};

//# sourceMappingURL=parse-clickhouse-order-by.util.js.map