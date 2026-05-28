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
    get computeAggregateParameters () {
        return computeAggregateParameters;
    },
    get computeDepthParameters () {
        return computeDepthParameters;
    },
    get computeEndingBeforeParameters () {
        return computeEndingBeforeParameters;
    },
    get computeFilterParameters () {
        return computeFilterParameters;
    },
    get computeGroupByParameters () {
        return computeGroupByParameters;
    },
    get computeIdPathParameter () {
        return computeIdPathParameter;
    },
    get computeIncludeRecordsSampleParameters () {
        return computeIncludeRecordsSampleParameters;
    },
    get computeLimitParameters () {
        return computeLimitParameters;
    },
    get computeOrderByForRecordsParameters () {
        return computeOrderByForRecordsParameters;
    },
    get computeOrderByParameters () {
        return computeOrderByParameters;
    },
    get computeSoftDeleteParameters () {
        return computeSoftDeleteParameters;
    },
    get computeStartingAfterParameters () {
        return computeStartingAfterParameters;
    },
    get computeUpsertParameters () {
        return computeUpsertParameters;
    },
    get computeViewIdParameters () {
        return computeViewIdParameters;
    }
});
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const computeLimitParameters = (fromMetadata = false)=>{
    return {
        name: 'limit',
        in: 'query',
        description: 'Limits the number of objects returned.',
        required: false,
        schema: {
            type: 'integer',
            minimum: 0,
            maximum: fromMetadata ? 1000 : _constants.QUERY_MAX_RECORDS,
            default: fromMetadata ? 1000 : _constants.QUERY_DEFAULT_LIMIT_RECORDS
        }
    };
};
const computeOrderByParameters = ()=>{
    return {
        name: 'order_by',
        in: 'query',
        description: `Format: **field_name_1,field_name_2[DIRECTION_2]
    Refer to the filter section at the top of the page for more details.`,
        required: false,
        schema: {
            type: 'string'
        },
        examples: {
            simple: {
                value: `createdAt`,
                summary: 'A simple order_by param'
            },
            complex: {
                value: `id[${_types.OrderByDirection.AscNullsFirst}],createdAt[${_types.OrderByDirection.DescNullsLast}]`,
                summary: 'A more complex order_by param'
            }
        }
    };
};
const computeDepthParameters = ()=>{
    return {
        name: 'depth',
        in: 'query',
        description: `Determines the level of nested related objects to include in the response.
    - 0: Primary object only
    - 1: Primary object + direct relations`,
        required: false,
        schema: {
            type: 'integer',
            enum: [
                0,
                1
            ],
            default: 1
        }
    };
};
const computeUpsertParameters = ()=>{
    return {
        name: 'upsert',
        in: 'query',
        description: 'If true, creates the object or updates it if it already exists.',
        required: false,
        schema: {
            type: 'boolean',
            default: false
        }
    };
};
const computeSoftDeleteParameters = ()=>{
    return {
        name: 'soft_delete',
        in: 'query',
        description: 'If true, soft deletes the objects. If false, objects are permanently deleted.',
        required: false,
        schema: {
            type: 'boolean',
            default: false
        }
    };
};
const computeFilterParameters = ()=>{
    return {
        name: 'filter',
        in: 'query',
        description: `Format: field[COMPARATOR]:value,field2[COMPARATOR]:value2.
    For like/ilike, use % as a wildcard (e.g. %value% for substring match).
    Refer to the filter section at the top of the page for more details.`,
        required: false,
        schema: {
            type: 'string'
        },
        examples: {
            simple: {
                value: 'createdAt[gte]:"2023-01-01"',
                description: 'A simple filter param'
            },
            simpleNested: {
                value: 'emails.primaryEmail[eq]:foo99@example.com',
                description: 'A simple composite type filter param'
            },
            complex: {
                value: 'or(createdAt[gte]:"2024-01-01",createdAt[lte]:"2023-01-01",not(id[is]:NULL))',
                description: 'A more complex filter param'
            },
            like: {
                value: 'name[like]:"%value%"',
                description: 'Pattern matching'
            }
        }
    };
};
const computeStartingAfterParameters = ()=>{
    return {
        name: 'starting_after',
        in: 'query',
        description: 'Returns objects starting after a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data',
        required: false,
        schema: {
            type: 'string'
        }
    };
};
const computeEndingBeforeParameters = ()=>{
    return {
        name: 'ending_before',
        in: 'query',
        description: 'Returns objects ending before a specific cursor. You can find cursors in **startCursor** and **endCursor** in **pageInfo** in response data',
        required: false,
        schema: {
            type: 'string'
        }
    };
};
const computeIdPathParameter = ()=>{
    return {
        name: 'id',
        in: 'path',
        description: 'Object id.',
        required: true,
        schema: {
            type: 'string',
            format: 'uuid'
        }
    };
};
const computeGroupByParameters = ()=>{
    return {
        name: 'group_by',
        in: 'query',
        description: `Array of fields to group by. Each element can specify a field and optionally a subfield or granularity for date fields.`,
        required: true,
        schema: {
            type: 'string'
        },
        examples: {
            simple: {
                value: '[{"updatedAt": true}]',
                summary: 'Group by a single field'
            },
            subfield: {
                value: '[{"assignee": {"name": true}}]',
                summary: 'Group by a relation field subfield'
            },
            dateGranularity: {
                value: '[{"createdAt": {"granularity": "MONTH"}}]',
                summary: 'Group by date with granularity (DAY, WEEK, MONTH, YEAR)'
            }
        }
    };
};
const computeViewIdParameters = ()=>{
    return {
        name: 'view_id',
        in: 'query',
        description: 'View ID to apply filters from.',
        required: false,
        schema: {
            type: 'string',
            format: 'uuid'
        }
    };
};
const computeIncludeRecordsSampleParameters = ()=>{
    return {
        name: 'include_records_sample',
        in: 'query',
        description: 'If true, includes a sample of records for each group in the response.',
        required: false,
        schema: {
            type: 'boolean',
            default: false
        }
    };
};
const computeAggregateParameters = ()=>{
    return {
        name: 'aggregate',
        in: 'query',
        description: `Array of aggregate operations to compute for each group.`,
        required: false,
        schema: {
            type: 'string'
        },
        examples: {
            count: {
                value: '["countNotEmptyId"]',
                summary: 'Count non-empty IDs in each group'
            },
            multiple: {
                value: '["countNotEmptyId", "sumAmount"]',
                summary: 'Multiple aggregate operations'
            }
        }
    };
};
const computeOrderByForRecordsParameters = ()=>{
    return {
        name: 'order_by_for_records',
        in: 'query',
        description: `Order by clause for records within each group. Only applicable when include_records_sample is true.`,
        required: false,
        schema: {
            type: 'string'
        },
        examples: {
            simple: {
                value: 'createdAt',
                summary: 'Order records by createdAt'
            }
        }
    };
};

//# sourceMappingURL=parameters.utils.js.map