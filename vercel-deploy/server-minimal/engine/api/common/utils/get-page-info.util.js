"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPageInfo", {
    enumerable: true,
    get: function() {
        return getPageInfo;
    }
});
const _cursorsutil = require("../../graphql/graphql-query-runner/utils/cursors.util");
const getPageInfo = (records, orderBy, limit, isForwardPagination)=>{
    const { hasNextPage, hasPreviousPage, hasMoreRecords } = (0, _cursorsutil.getPaginationInfo)(records, limit, isForwardPagination);
    if (hasMoreRecords) {
        records.pop();
    }
    const startCursor = records.length > 0 ? (0, _cursorsutil.encodeCursor)(records[0], orderBy) : null;
    const endCursor = records.length > 0 ? (0, _cursorsutil.encodeCursor)(records[records.length - 1], orderBy) : null;
    return {
        startCursor,
        endCursor,
        hasNextPage,
        hasPreviousPage
    };
};

//# sourceMappingURL=get-page-info.util.js.map