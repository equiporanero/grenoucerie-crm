// Strips all characters except [a-zA-Z0-9_].
// Use ONLY for generating safe identifier names (e.g. enum names from table+column).
// For SQL escaping, use escapeIdentifier or escapeLiteral instead.
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
    get escapeIdentifier () {
        return escapeIdentifier;
    },
    get escapeLiteral () {
        return escapeLiteral;
    },
    get removeSqlDDLInjection () {
        return removeSqlDDLInjection;
    }
});
const removeSqlDDLInjection = (value)=>{
    return value.replace(/[^a-zA-Z0-9_]/g, '');
};
const escapeIdentifier = (identifier)=>{
    if (identifier.includes('\0')) {
        throw new Error('Null bytes are not allowed in PostgreSQL identifiers');
    }
    return '"' + identifier.replace(/"/g, '""') + '"';
};
const escapeLiteral = (value)=>{
    if (value.includes('\0')) {
        throw new Error('Null bytes are not allowed in PostgreSQL string literals');
    }
    let hasBackslash = false;
    let escaped = "'";
    for (const char of value){
        if (char === "'") {
            escaped += "''";
        } else if (char === '\\') {
            escaped += '\\\\';
            hasBackslash = true;
        } else {
            escaped += char;
        }
    }
    escaped += "'";
    if (hasBackslash) {
        escaped = 'E' + escaped;
    }
    return escaped;
};

//# sourceMappingURL=remove-sql-injection.util.js.map