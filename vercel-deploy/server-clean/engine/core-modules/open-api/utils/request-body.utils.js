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
    get getArrayRequestBody () {
        return getArrayRequestBody;
    },
    get getFindDuplicatesRequestBody () {
        return getFindDuplicatesRequestBody;
    },
    get getMergeManyRequestBody () {
        return getMergeManyRequestBody;
    },
    get getRequestBody () {
        return getRequestBody;
    },
    get getUpdateRequestBody () {
        return getUpdateRequestBody;
    }
});
const _uuid = require("uuid");
const getRequestBody = (name)=>{
    return {
        description: 'body',
        required: true,
        content: {
            'application/json': {
                schema: {
                    $ref: `#/components/schemas/${name}`
                }
            }
        }
    };
};
const getUpdateRequestBody = (name)=>{
    return {
        description: 'body',
        required: true,
        content: {
            'application/json': {
                schema: {
                    $ref: `#/components/schemas/${name}ForUpdate`
                }
            }
        }
    };
};
const getArrayRequestBody = (name)=>{
    return {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        $ref: `#/components/schemas/${name}`
                    }
                }
            }
        }
    };
};
const getFindDuplicatesRequestBody = (name)=>{
    return {
        description: 'body',
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                $ref: `#/components/schemas/${name}`
                            }
                        },
                        ids: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'uuid'
                            }
                        }
                    },
                    example: {
                        ids: [
                            (0, _uuid.v4)()
                        ]
                    }
                }
            }
        }
    };
};
const getMergeManyRequestBody = ()=>{
    return {
        description: 'body',
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        ids: {
                            type: 'array',
                            description: 'The IDs of the records to merge',
                            items: {
                                type: 'string',
                                format: 'uuid'
                            }
                        },
                        conflictPriorityIndex: {
                            type: 'number',
                            description: 'The index of the record to use when conflicts occur'
                        },
                        dryRun: {
                            description: 'If true, the merge will not be performed and a preview of the merge will be returned.',
                            type: 'boolean',
                            default: false
                        }
                    },
                    example: {
                        ids: [
                            (0, _uuid.v4)()
                        ],
                        conflictPriorityIndex: 0,
                        dryRun: false
                    },
                    required: [
                        'ids',
                        'conflictPriorityIndex'
                    ]
                }
            }
        }
    };
};

//# sourceMappingURL=request-body.utils.js.map