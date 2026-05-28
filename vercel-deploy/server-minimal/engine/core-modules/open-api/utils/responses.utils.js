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
    get getCreateManyResponse201 () {
        return getCreateManyResponse201;
    },
    get getCreateOneResponse201 () {
        return getCreateOneResponse201;
    },
    get getDeleteManyResponse200 () {
        return getDeleteManyResponse200;
    },
    get getDeleteResponse200 () {
        return getDeleteResponse200;
    },
    get getFindDuplicatesResponse200 () {
        return getFindDuplicatesResponse200;
    },
    get getFindManyResponse200 () {
        return getFindManyResponse200;
    },
    get getFindOneResponse200 () {
        return getFindOneResponse200;
    },
    get getGroupByResponse200 () {
        return getGroupByResponse200;
    },
    get getJsonResponse () {
        return getJsonResponse;
    },
    get getMergeManyResponse200 () {
        return getMergeManyResponse200;
    },
    get getRestoreManyResponse200 () {
        return getRestoreManyResponse200;
    },
    get getRestoreOneResponse200 () {
        return getRestoreOneResponse200;
    },
    get getUpdateManyResponse200 () {
        return getUpdateManyResponse200;
    },
    get getUpdateOneResponse200 () {
        return getUpdateOneResponse200;
    }
});
const _utils = require("twenty-shared/utils");
const getFindManyResponse200 = (item)=>{
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [item.namePlural]: {
                                    type: 'array',
                                    items: {
                                        $ref: schemaRef
                                    }
                                }
                            }
                        },
                        pageInfo: {
                            type: 'object',
                            properties: {
                                hasNextPage: {
                                    type: 'boolean'
                                },
                                startCursor: {
                                    type: 'string',
                                    format: 'uuid'
                                },
                                endCursor: {
                                    type: 'string',
                                    format: 'uuid'
                                }
                            }
                        },
                        totalCount: {
                            type: 'integer'
                        }
                    }
                }
            }
        }
    };
};
const getFindOneResponse200 = (item)=>{
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [item.nameSingular]: {
                                    $ref: schemaRef
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getRestoreOneResponse200 = (item)=>{
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`restore${(0, _utils.capitalize)(item.nameSingular)}`]: {
                                    $ref: schemaRef
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getRestoreManyResponse200 = (item)=>{
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`restore${(0, _utils.capitalize)(item.namePlural)}`]: {
                                    type: 'array',
                                    items: {
                                        $ref: schemaRef
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getCreateOneResponse201 = (item, fromMetadata = false)=>{
    const one = fromMetadata ? 'One' : '';
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`create${one}${(0, _utils.capitalize)(item.nameSingular)}`]: {
                                    $ref: schemaRef
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getCreateManyResponse201 = (item)=>{
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`create${(0, _utils.capitalize)(item.namePlural)}`]: {
                                    type: 'array',
                                    items: {
                                        $ref: schemaRef
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getUpdateOneResponse200 = (item, fromMetadata = false)=>{
    const one = fromMetadata ? 'One' : '';
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`update${one}${(0, _utils.capitalize)(item.nameSingular)}`]: {
                                    $ref: schemaRef
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getDeleteManyResponse200 = (item)=>{
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`delete${(0, _utils.capitalize)(item.namePlural)}`]: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: {
                                                type: 'string',
                                                format: 'uuid'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getUpdateManyResponse200 = (item)=>{
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`update${(0, _utils.capitalize)(item.namePlural)}`]: {
                                    type: 'array',
                                    items: {
                                        $ref: schemaRef
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getDeleteResponse200 = (item, fromMetadata = false)=>{
    const one = fromMetadata ? 'One' : '';
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`delete${one}${(0, _utils.capitalize)(item.nameSingular)}`]: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string',
                                            format: 'uuid'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getJsonResponse = ()=>{
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        openapi: {
                            type: 'string'
                        },
                        info: {
                            type: 'object',
                            properties: {
                                title: {
                                    type: 'string'
                                },
                                description: {
                                    type: 'string'
                                },
                                termsOfService: {
                                    type: 'string'
                                },
                                contact: {
                                    type: 'object',
                                    properties: {
                                        email: {
                                            type: 'string'
                                        }
                                    }
                                },
                                license: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string'
                                        },
                                        url: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        },
                        servers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    url: {
                                        type: 'string'
                                    },
                                    description: {
                                        type: 'string'
                                    }
                                }
                            }
                        },
                        components: {
                            type: 'object',
                            properties: {
                                schemas: {
                                    type: 'object'
                                },
                                parameters: {
                                    type: 'object'
                                },
                                responses: {
                                    type: 'object'
                                }
                            }
                        },
                        paths: {
                            type: 'object'
                        },
                        tags: {
                            type: 'object'
                        }
                    }
                }
            }
        }
    };
};
const getFindDuplicatesResponse200 = (item)=>{
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    totalCount: {
                                        type: 'number'
                                    },
                                    pageInfo: {
                                        type: 'object',
                                        properties: {
                                            hasNextPage: {
                                                type: 'boolean'
                                            },
                                            startCursor: {
                                                type: 'string',
                                                format: 'uuid'
                                            },
                                            endCursor: {
                                                type: 'string',
                                                format: 'uuid'
                                            }
                                        }
                                    },
                                    [`${item.nameSingular}Duplicates`]: {
                                        type: 'array',
                                        items: {
                                            $ref: schemaRef
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getMergeManyResponse200 = (item)=>{
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`merge${(0, _utils.capitalize)(item.namePlural)}`]: {
                                    $ref: schemaRef
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
const getGroupByResponse200 = (item)=>{
    const schemaRef = `#/components/schemas/${(0, _utils.capitalize)(item.nameSingular)}ForResponse`;
    return {
        description: 'Successful operation',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'object',
                            properties: {
                                [`${item.namePlural}GroupBy`]: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            groupByDimensionValues: {
                                                type: 'array',
                                                description: 'Array of values representing each dimension in the group',
                                                items: {
                                                    type: 'string'
                                                }
                                            },
                                            records: {
                                                type: 'array',
                                                description: 'Sample of records for this group (only present when include_records_sample is true)',
                                                items: {
                                                    $ref: schemaRef
                                                }
                                            }
                                        },
                                        additionalProperties: {
                                            type: 'number',
                                            description: 'Aggregate values (e.g., countNotEmptyId)'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};

//# sourceMappingURL=responses.utils.js.map