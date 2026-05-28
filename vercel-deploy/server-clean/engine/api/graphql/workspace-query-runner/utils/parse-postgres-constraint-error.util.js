"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parsePostgresConstraintError", {
    enumerable: true,
    get: function() {
        return parsePostgresConstraintError;
    }
});
const parsePostgresConstraintError = (error)=>{
    const errorDetail = error.detail;
    if (!errorDetail) {
        return null;
    }
    const detailMatch = errorDetail.match(/Key \(([^)]+)\)=\(([^)]+)\)/);
    if (!detailMatch) {
        return null;
    }
    const columnName = detailMatch[1].replace(/^["']|["']$/g, '');
    const conflictingValue = detailMatch[2];
    return {
        columnName,
        conflictingValue
    };
};

//# sourceMappingURL=parse-postgres-constraint-error.util.js.map