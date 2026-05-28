"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatSqlValue", {
    enumerable: true,
    get: function() {
        return formatSqlValue;
    }
});
const _utils = require("twenty-shared/utils");
const _removesqlinjectionutil = require("../../../../engine/workspace-manager/workspace-migration/utils/remove-sql-injection.util");
const formatSqlValue = (value, isJsonColumn = false)=>{
    if (!(0, _utils.isDefined)(value)) return 'NULL';
    if (isJsonColumn) {
        return (0, _removesqlinjectionutil.escapeLiteral)(JSON.stringify(value));
    }
    if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
    if (typeof value === 'number') {
        if (!Number.isFinite(value)) return 'NULL';
        return String(value);
    }
    if (typeof value === 'bigint') return String(value);
    if (value instanceof Date) return (0, _removesqlinjectionutil.escapeLiteral)(value.toISOString());
    if (Array.isArray(value)) {
        if (value.length === 0) return "'{}'";
        if ((0, _utils.isDefined)(value[0]) && typeof value[0] === 'object') {
            return (0, _removesqlinjectionutil.escapeLiteral)(JSON.stringify(value));
        }
        const formattedElements = value.map((element)=>{
            if (!(0, _utils.isDefined)(element)) return 'NULL';
            const stringElement = String(element);
            const escapedElement = stringElement.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
            return `"${escapedElement}"`;
        });
        const arrayLiteral = `{${formattedElements.join(',')}}`;
        return `'${arrayLiteral.replace(/'/g, "''")}'`;
    }
    if (typeof value === 'object') {
        return (0, _removesqlinjectionutil.escapeLiteral)(JSON.stringify(value));
    }
    return (0, _removesqlinjectionutil.escapeLiteral)(String(value));
};

//# sourceMappingURL=format-sql-value.util.js.map