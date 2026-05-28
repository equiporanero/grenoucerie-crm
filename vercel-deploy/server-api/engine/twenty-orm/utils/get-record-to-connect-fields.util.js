"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRecordToConnectFields", {
    enumerable: true,
    get: function() {
        return getRecordToConnectFields;
    }
});
const getRecordToConnectFields = (connectQueryConfig)=>{
    return [
        `"${connectQueryConfig.targetObjectName}"."id"`,
        ...connectQueryConfig.recordToConnectConditions[0].map(([field])=>{
            return `"${connectQueryConfig.targetObjectName}"."${field}"`;
        })
    ];
};

//# sourceMappingURL=get-record-to-connect-fields.util.js.map