"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAndReturnIndexWhereClause", {
    enumerable: true,
    get: function() {
        return validateAndReturnIndexWhereClause;
    }
});
// Allowlist of safe WHERE clause patterns for partial indexes.
// Any new pattern must be reviewed for SQL injection safety before being added.
const ALLOWED_INDEX_WHERE_CLAUSES = new Set([
    '"deletedAt" IS NULL'
]);
const validateAndReturnIndexWhereClause = (clause)=>{
    if (!clause) {
        return undefined;
    }
    if (ALLOWED_INDEX_WHERE_CLAUSES.has(clause)) {
        return clause;
    }
    throw new Error(`Unsupported index WHERE clause: "${clause}". ` + 'Only allowlisted patterns are permitted to prevent SQL injection. ' + 'Add the pattern to ALLOWED_INDEX_WHERE_CLAUSES after security review.');
};

//# sourceMappingURL=validate-index-where-clause.util.js.map