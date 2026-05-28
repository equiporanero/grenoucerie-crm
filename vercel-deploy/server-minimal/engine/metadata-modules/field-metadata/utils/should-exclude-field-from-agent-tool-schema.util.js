"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldExcludeFieldFromAgentToolSchema", {
    enumerable: true,
    get: function() {
        return shouldExcludeFieldFromAgentToolSchema;
    }
});
const shouldExcludeFieldFromAgentToolSchema = (field, excludeId = true)=>{
    const excludedFieldNames = [
        'createdAt',
        'updatedAt',
        'deletedAt',
        'searchVector',
        'createdBy'
    ];
    if (excludeId) {
        excludedFieldNames.push('id');
    }
    return excludedFieldNames.includes(field.name) || field.isSystem;
};

//# sourceMappingURL=should-exclude-field-from-agent-tool-schema.util.js.map