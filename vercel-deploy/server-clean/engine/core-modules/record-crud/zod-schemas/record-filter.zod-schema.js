"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateRecordFilterSchema", {
    enumerable: true,
    get: function() {
        return generateRecordFilterSchema;
    }
});
const _types = require("twenty-shared/types");
const _zod = require("zod");
const _fieldfilterszodschema = require("./field-filters.zod-schema");
const _shouldexcludefieldfromagenttoolschemautil = require("../../../metadata-modules/field-metadata/utils/should-exclude-field-from-agent-tool-schema.util");
const _isfieldmetadataoftypeutil = require("../../../utils/is-field-metadata-of-type.util");
const generateRecordFilterSchema = (objectMetadata, restrictedFields)=>{
    const filterShape = {};
    objectMetadata.fields.forEach((field)=>{
        if ((0, _shouldexcludefieldfromagenttoolschemautil.shouldExcludeFieldFromAgentToolSchema)(field)) {
            return;
        }
        if (restrictedFields?.[field.id]?.canRead === false) {
            return;
        }
        const fieldFilter = (0, _fieldfilterszodschema.generateFieldFilterZodSchema)(field);
        if (!fieldFilter) {
            return;
        }
        const isManyToOneRelationField = (0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.RELATION) && field.settings?.relationType === _types.RelationType.MANY_TO_ONE;
        filterShape[isManyToOneRelationField ? `${field.name}Id` : field.name] = fieldFilter;
    });
    const filterSchema = _zod.z.lazy(()=>_zod.z.object({
            ...filterShape,
            or: _zod.z.array(filterSchema).optional().describe('OR condition - matches if ANY of the filters match'),
            and: _zod.z.array(filterSchema).optional().describe('AND condition - matches if ALL filters match'),
            not: filterSchema.optional().describe('NOT condition - matches if the filter does NOT match')
        }).partial());
    return {
        filterShape,
        filterSchema
    };
};

//# sourceMappingURL=record-filter.zod-schema.js.map