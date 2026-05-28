"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildInsertPrefix", {
    enumerable: true,
    get: function() {
        return buildInsertPrefix;
    }
});
const _removesqlinjectionutil = require("../../../../engine/workspace-manager/workspace-migration/utils/remove-sql-injection.util");
const buildInsertPrefix = (schemaName, tableName, columnNames)=>{
    const escapedColumnNames = columnNames.map(_removesqlinjectionutil.escapeIdentifier).join(', ');
    return `INSERT INTO ${(0, _removesqlinjectionutil.escapeIdentifier)(schemaName)}.${(0, _removesqlinjectionutil.escapeIdentifier)(tableName)} (${escapedColumnNames}) VALUES `;
};

//# sourceMappingURL=build-insert-prefix.util.js.map