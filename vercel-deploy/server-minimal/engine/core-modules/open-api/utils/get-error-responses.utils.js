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
    get get400ErrorResponses () {
        return get400ErrorResponses;
    },
    get get401ErrorResponses () {
        return get401ErrorResponses;
    }
});
const get400ErrorResponses = ()=>{
    return {
        description: 'Bad Request',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        statusCode: {
                            type: 'number'
                        },
                        messages: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        },
                        error: {
                            type: 'string'
                        }
                    },
                    example: {
                        statusCode: 400,
                        message: 'error message',
                        error: 'Bad Request'
                    }
                }
            }
        }
    };
};
const get401ErrorResponses = ()=>{
    return {
        description: 'Unauthorized',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        statusCode: {
                            type: 'number'
                        },
                        message: {
                            type: 'string'
                        },
                        error: {
                            type: 'string'
                        }
                    },
                    example: {
                        statusCode: 401,
                        message: 'Token invalid.',
                        error: 'Unauthorized'
                    }
                }
            }
        }
    };
};

//# sourceMappingURL=get-error-responses.utils.js.map