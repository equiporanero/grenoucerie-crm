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
    get EventLogTable () {
        return _types.EventLogTable;
    },
    get registerEventLogTableEnum () {
        return registerEventLogTableEnum;
    }
});
const _graphql = require("@nestjs/graphql");
const _types = require("twenty-shared/types");
const registerEventLogTableEnum = ()=>{
    (0, _graphql.registerEnumType)(_types.EventLogTable, {
        name: 'EventLogTable'
    });
};

//# sourceMappingURL=event-log-table.enum.js.map