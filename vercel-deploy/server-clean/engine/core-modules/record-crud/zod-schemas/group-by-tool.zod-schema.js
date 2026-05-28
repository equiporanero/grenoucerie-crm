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
    get generateGroupByToolInputSchema () {
        return generateGroupByToolInputSchema;
    },
    get hasGroupByToolInputSchema () {
        return hasGroupByToolInputSchema;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _zod = require("zod");
const _getavailableaggregationsfromobjectfieldsutil = require("../../../api/graphql/workspace-schema-builder/utils/get-available-aggregations-from-object-fields.util");
const _resolveaggregatefieldkeyutil = require("../utils/resolve-aggregate-field-key.util");
const _recordfilterzodschema = require("./record-filter.zod-schema");
const _iscompositefieldmetadatatypeutil = require("../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _getgroupablesubfieldsforcompositetypeutil = require("../../../metadata-modules/field-metadata/utils/get-groupable-sub-fields-for-composite-type.util");
const _issupportedingroupbyutil = require("../../../metadata-modules/field-metadata/utils/is-supported-in-group-by.util");
const _isfieldmetadataoftypeutil = require("../../../utils/is-field-metadata-of-type.util");
const dateGranularityValues = Object.values(_types.ObjectRecordGroupByDateGranularity).filter((v)=>v !== _types.ObjectRecordGroupByDateGranularity.NONE);
const dateGroupBySchema = _zod.z.object({
    granularity: _zod.z.enum(dateGranularityValues).default(_types.ObjectRecordGroupByDateGranularity.MONTH).describe('Date grouping granularity. Default: MONTH.'),
    weekStartDay: _zod.z.nativeEnum(_types.FirstDayOfTheWeek).optional().describe('First day of week (MONDAY, SUNDAY, SATURDAY). Only used when granularity is WEEK.'),
    timeZone: _zod.z.string().default('UTC').describe('IANA timezone for date groupings (e.g. "America/New_York"). Default: UTC.')
}).strict().describe('Date field grouping configuration');
const buildGroupByEntriesAndDescriptions = (objectMetadata, restrictedFields)=>{
    const groupByEntries = [];
    const fieldNameDescriptions = [];
    for (const field of objectMetadata.fields){
        if (restrictedFields?.[field.id]?.canRead === false) {
            continue;
        }
        if (!(0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(field)) {
            continue;
        }
        if ((0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.RELATION)) {
            if (field.settings?.relationType === _types.RelationType.MANY_TO_ONE) {
                const relationFieldName = `${field.name}Id`;
                groupByEntries.push(_zod.z.object({
                    [relationFieldName]: _zod.z.literal(true)
                }).strict());
                fieldNameDescriptions.push(relationFieldName);
            }
            continue;
        }
        if ((0, _isfieldmetadataoftypeutil.isFieldMetadataEntityOfType)(field, _types.FieldMetadataType.MORPH_RELATION)) {
            continue;
        }
        if ((0, _utils.isFieldMetadataDateKind)(field.type)) {
            groupByEntries.push(_zod.z.object({
                [field.name]: dateGroupBySchema
            }).strict());
            fieldNameDescriptions.push(`${field.name} (date)`);
            continue;
        }
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(field.type)) {
            const subFields = (0, _getgroupablesubfieldsforcompositetypeutil.getGroupableSubFieldsForCompositeType)(field.type);
            if (subFields) {
                for (const subField of subFields){
                    groupByEntries.push(_zod.z.object({
                        [field.name]: _zod.z.object({
                            [subField]: _zod.z.literal(true)
                        }).strict()
                    }).strict());
                    fieldNameDescriptions.push(`${field.name}.${subField}`);
                }
            }
            continue;
        }
        groupByEntries.push(_zod.z.object({
            [field.name]: _zod.z.literal(true)
        }).strict());
        fieldNameDescriptions.push(field.name);
    }
    return {
        groupByEntries,
        fieldNameDescriptions
    };
};
const hasGroupByToolInputSchema = (objectMetadata, restrictedFields)=>{
    return buildGroupByEntriesAndDescriptions(objectMetadata, restrictedFields).groupByEntries.length > 0;
};
const generateGroupByToolInputSchema = (objectMetadata, restrictedFields)=>{
    const { groupByEntries, fieldNameDescriptions } = buildGroupByEntriesAndDescriptions(objectMetadata, restrictedFields);
    if (groupByEntries.length === 0) {
        return null;
    }
    const groupByEntrySchema = groupByEntries.length === 1 ? groupByEntries[0] : _zod.z.union(groupByEntries);
    const { filterShape, filterSchema } = (0, _recordfilterzodschema.generateRecordFilterSchema)(objectMetadata, restrictedFields);
    const availableAggregations = (0, _getavailableaggregationsfromobjectfieldsutil.getAvailableAggregationsFromObjectFields)(objectMetadata.fields.filter((field)=>restrictedFields?.[field.id]?.canRead !== false));
    const availableAggregateFieldNames = Array.from(new Set(Object.values(availableAggregations).filter((aggregation)=>aggregation.aggregateOperation !== _types.AggregateOperations.COUNT).map((aggregation)=>aggregation.subFieldForNumericOperation ? `${aggregation.fromField}.${aggregation.subFieldForNumericOperation}` : aggregation.fromField)));
    return _zod.z.object({
        groupBy: _zod.z.array(groupByEntrySchema).min(1).max(2).describe(`Fields to group by (max 2). Each entry must be an object with exactly one field key. Examples: {"status": true}, {"companyId": true}, {"createdAt": {"granularity": "MONTH", "timeZone": "UTC"}}. Available: ${fieldNameDescriptions.join(', ')}.`),
        aggregateOperation: _zod.z.enum(Object.keys(_types.AggregateOperations)).default(_types.AggregateOperations.COUNT).describe('Aggregate operation to apply per group. Default: COUNT. Any operation other than COUNT requires aggregateFieldName.'),
        aggregateFieldName: _zod.z.string().optional().describe(`Field to aggregate. Required for any operation other than COUNT. Available fields: ${availableAggregateFieldNames.join(', ')}.`),
        limit: _zod.z.number().int().positive().max(100).default(50).describe('Maximum number of groups to return (default: 50, max: 100).'),
        orderBy: _zod.z.enum([
            'ASC',
            'DESC'
        ]).default('DESC').describe('Order groups by aggregate value. DESC (default) gives "top N" behavior.'),
        ...filterShape,
        or: _zod.z.array(filterSchema).optional().describe('OR condition - matches if ANY of the filters match'),
        and: _zod.z.array(filterSchema).optional().describe('AND condition - matches if ALL filters match'),
        not: filterSchema.optional().describe('NOT condition - matches if the filter does NOT match')
    }).strict().superRefine((input, context)=>{
        const aggregateOperation = input.aggregateOperation;
        if (aggregateOperation === _types.AggregateOperations.COUNT) {
            if (input.aggregateFieldName) {
                context.addIssue({
                    code: _zod.z.ZodIssueCode.custom,
                    message: 'aggregateFieldName is not supported for COUNT operation.',
                    path: [
                        'aggregateFieldName'
                    ]
                });
            }
            return;
        }
        if (!input.aggregateFieldName) {
            context.addIssue({
                code: _zod.z.ZodIssueCode.custom,
                message: `aggregateFieldName is required for ${aggregateOperation} operation.`,
                path: [
                    'aggregateFieldName'
                ]
            });
            return;
        }
        const resolvedAggregateFieldKey = (0, _resolveaggregatefieldkeyutil.resolveAggregateFieldKey)(aggregateOperation, input.aggregateFieldName, availableAggregations);
        if (!resolvedAggregateFieldKey) {
            context.addIssue({
                code: _zod.z.ZodIssueCode.custom,
                message: `No aggregation available for ${aggregateOperation} on field "${input.aggregateFieldName}".`,
                path: [
                    'aggregateFieldName'
                ]
            });
        }
    });
};

//# sourceMappingURL=group-by-tool.zod-schema.js.map