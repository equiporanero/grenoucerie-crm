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
    get decodeCursor () {
        return decodeCursor;
    },
    get encodeCursor () {
        return encodeCursor;
    },
    get encodeCursorData () {
        return encodeCursorData;
    },
    get getCursor () {
        return getCursor;
    },
    get getPaginationInfo () {
        return getPaginationInfo;
    }
});
const _commonqueryrunnerexception = require("../../../common/common-query-runners/errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const decodeCursor = (cursor)=>{
    try {
        return JSON.parse(Buffer.from(cursor, 'base64').toString());
    } catch  {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid cursor: ${cursor}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_CURSOR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
};
const encodeCursor = (objectRecord, order)=>{
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    const orderByValues = {};
    const orderBy = order?.reduce((acc, orderBy)=>({
            ...acc,
            ...orderBy
        }), {});
    const orderByKeys = Object.keys(orderBy ?? {});
    orderByKeys?.forEach((key)=>{
        orderByValues[key] = objectRecord[key];
    });
    const cursorData = {
        ...orderByValues,
        id: objectRecord.id
    };
    return encodeCursorData(cursorData);
};
const encodeCursorData = (cursorData)=>{
    return Buffer.from(JSON.stringify(cursorData)).toString('base64');
};
const getCursor = (// oxlint-disable-next-line @typescripttypescript/no-explicit-any
args)=>{
    if (args.after) return decodeCursor(args.after);
    if (args.before) return decodeCursor(args.before);
    return undefined;
};
const getPaginationInfo = (objectRecords, limit, isForwardPagination)=>{
    const hasMoreRecords = objectRecords.length > limit;
    return {
        hasNextPage: isForwardPagination && hasMoreRecords,
        hasPreviousPage: !isForwardPagination && hasMoreRecords,
        hasMoreRecords
    };
};

//# sourceMappingURL=cursors.util.js.map