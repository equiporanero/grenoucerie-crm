"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setPgDateTypeParser", {
    enumerable: true,
    get: function() {
        return setPgDateTypeParser;
    }
});
const _pg = require("pg");
const _PG_DATE_TYPE_OID = require("./constants/PG_DATE_TYPE_OID");
const setPgDateTypeParser = ()=>{
    _pg.types.setTypeParser(_PG_DATE_TYPE_OID.PG_DATE_TYPE_OID, (val)=>val);
};

//# sourceMappingURL=set-pg-date-type-parser.js.map