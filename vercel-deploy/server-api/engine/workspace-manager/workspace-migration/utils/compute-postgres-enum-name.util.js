"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computePostgresEnumName", {
    enumerable: true,
    get: function() {
        return computePostgresEnumName;
    }
});
const _removesqlinjectionutil = require("./remove-sql-injection.util");
const computePostgresEnumName = ({ tableName, columnName })=>{
    return (0, _removesqlinjectionutil.removeSqlDDLInjection)(`${tableName}_${columnName}_enum`);
};

//# sourceMappingURL=compute-postgres-enum-name.util.js.map