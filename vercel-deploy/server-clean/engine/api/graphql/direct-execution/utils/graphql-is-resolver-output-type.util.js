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
    get isConnection () {
        return isConnection;
    },
    get isConnectionArray () {
        return isConnectionArray;
    },
    get isGroupByConnection () {
        return isGroupByConnection;
    },
    get isObjectRecord () {
        return isObjectRecord;
    },
    get isObjectRecordArray () {
        return isObjectRecordArray;
    }
});
const _guards = require("@sniptt/guards");
const isObjectRecord = (result)=>{
    return !Array.isArray(result) && (0, _guards.isObject)(result) && 'id' in result;
};
const isObjectRecordArray = (result)=>{
    return Array.isArray(result) && result.every((item)=>isObjectRecord(item));
};
const isConnection = (result)=>{
    return (0, _guards.isObject)(result) && 'edges' in result && 'pageInfo' in result;
};
const isConnectionArray = (result)=>{
    return Array.isArray(result) && result.every((item)=>isConnection(item));
};
const isGroupByConnection = (result)=>{
    return isConnection(result) && 'groupByDimensionValues' in result;
};

//# sourceMappingURL=graphql-is-resolver-output-type.util.js.map