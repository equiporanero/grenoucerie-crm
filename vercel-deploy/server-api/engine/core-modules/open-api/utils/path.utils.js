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
    get computeBatchPath () {
        return computeBatchPath;
    },
    get computeDuplicatesResultPath () {
        return computeDuplicatesResultPath;
    },
    get computeGroupByResultPath () {
        return computeGroupByResultPath;
    },
    get computeManyResultPath () {
        return computeManyResultPath;
    },
    get computeMergeManyResultPath () {
        return computeMergeManyResultPath;
    },
    get computeOpenApiPath () {
        return computeOpenApiPath;
    },
    get computeRestoreManyResultPath () {
        return computeRestoreManyResultPath;
    },
    get computeRestoreOneResultPath () {
        return computeRestoreOneResultPath;
    },
    get computeSingleResultPath () {
        return computeSingleResultPath;
    }
});
const _utils = require("twenty-shared/utils");
const _requestbodyutils = require("./request-body.utils");
const _responsesutils = require("./responses.utils");
const computeBatchPath = (item, _flatObjectMetadataMaps, _flatFieldMetadataMaps)=>{
    return {
        post: {
            tags: [
                item.namePlural
            ],
            summary: `Create Many ${item.namePlural}`,
            operationId: `createMany${(0, _utils.capitalize)(item.namePlural)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/depth'
                },
                {
                    $ref: '#/components/parameters/upsert'
                }
            ],
            requestBody: (0, _requestbodyutils.getArrayRequestBody)((0, _utils.capitalize)(item.nameSingular)),
            responses: {
                '201': (0, _responsesutils.getCreateManyResponse201)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        }
    };
};
const computeManyResultPath = (item, _flatObjectMetadataMaps, _flatFieldMetadataMaps)=>{
    return {
        get: {
            tags: [
                item.namePlural
            ],
            summary: `Find Many ${item.namePlural}`,
            description: `**order_by**, **filter**, **limit**, **depth**, **starting_after** or **ending_before** can be provided to request your **${item.namePlural}**`,
            operationId: `findMany${(0, _utils.capitalize)(item.namePlural)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/orderBy'
                },
                {
                    $ref: '#/components/parameters/filter'
                },
                {
                    $ref: '#/components/parameters/limit'
                },
                {
                    $ref: '#/components/parameters/depth'
                },
                {
                    $ref: '#/components/parameters/startingAfter'
                },
                {
                    $ref: '#/components/parameters/endingBefore'
                }
            ],
            responses: {
                '200': (0, _responsesutils.getFindManyResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        },
        post: {
            tags: [
                item.namePlural
            ],
            summary: `Create One ${item.nameSingular}`,
            operationId: `createOne${(0, _utils.capitalize)(item.nameSingular)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/depth'
                },
                {
                    $ref: '#/components/parameters/upsert'
                }
            ],
            requestBody: (0, _requestbodyutils.getRequestBody)((0, _utils.capitalize)(item.nameSingular)),
            responses: {
                '201': (0, _responsesutils.getCreateOneResponse201)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        },
        delete: {
            tags: [
                item.namePlural
            ],
            summary: `Delete Many ${item.namePlural}`,
            operationId: `deleteMany${(0, _utils.capitalize)(item.namePlural)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/filter'
                },
                {
                    $ref: '#/components/parameters/softDelete'
                }
            ],
            responses: {
                '200': (0, _responsesutils.getDeleteManyResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        },
        patch: {
            tags: [
                item.namePlural
            ],
            summary: `Update Many ${item.namePlural}`,
            operationId: `updateMany${(0, _utils.capitalize)(item.namePlural)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/depth'
                },
                {
                    $ref: '#/components/parameters/filter'
                }
            ],
            requestBody: (0, _requestbodyutils.getUpdateRequestBody)((0, _utils.capitalize)(item.nameSingular)),
            responses: {
                '200': (0, _responsesutils.getUpdateManyResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        }
    };
};
const computeSingleResultPath = (item, _flatObjectMetadataMaps, _flatFieldMetadataMaps)=>{
    return {
        get: {
            tags: [
                item.namePlural
            ],
            summary: `Find One ${item.nameSingular}`,
            description: `**depth** can be provided to request your **${item.nameSingular}**`,
            operationId: `findOne${(0, _utils.capitalize)(item.nameSingular)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/idPath'
                },
                {
                    $ref: '#/components/parameters/depth'
                }
            ],
            responses: {
                '200': (0, _responsesutils.getFindOneResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        },
        delete: {
            tags: [
                item.namePlural
            ],
            summary: `Delete One ${item.nameSingular}`,
            operationId: `deleteOne${(0, _utils.capitalize)(item.nameSingular)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/idPath'
                },
                {
                    $ref: '#/components/parameters/softDelete'
                }
            ],
            responses: {
                '200': (0, _responsesutils.getDeleteResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        },
        patch: {
            tags: [
                item.namePlural
            ],
            summary: `Update One ${item.nameSingular}`,
            operationId: `UpdateOne${(0, _utils.capitalize)(item.nameSingular)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/idPath'
                },
                {
                    $ref: '#/components/parameters/depth'
                }
            ],
            requestBody: (0, _requestbodyutils.getUpdateRequestBody)((0, _utils.capitalize)(item.nameSingular)),
            responses: {
                '200': (0, _responsesutils.getUpdateOneResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        }
    };
};
const computeOpenApiPath = (serverUrl)=>{
    return {
        get: {
            tags: [
                'General'
            ],
            summary: 'Get Open Api Schema',
            operationId: 'GetOpenApiSchema',
            servers: [
                {
                    url: serverUrl
                }
            ],
            responses: {
                '200': (0, _responsesutils.getJsonResponse)()
            }
        }
    };
};
const computeDuplicatesResultPath = (item, _flatObjectMetadataMaps, _flatFieldMetadataMaps)=>{
    return {
        post: {
            tags: [
                item.namePlural
            ],
            summary: `Find ${item.nameSingular} Duplicates`,
            description: `**depth** can be provided to request your **${item.nameSingular}**`,
            operationId: `find${(0, _utils.capitalize)(item.nameSingular)}Duplicates`,
            parameters: [
                {
                    $ref: '#/components/parameters/depth'
                }
            ],
            requestBody: (0, _requestbodyutils.getFindDuplicatesRequestBody)((0, _utils.capitalize)(item.nameSingular)),
            responses: {
                '200': (0, _responsesutils.getFindDuplicatesResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        }
    };
};
const computeRestoreOneResultPath = (item, _flatObjectMetadataMaps, _flatFieldMetadataMaps)=>{
    return {
        patch: {
            tags: [
                item.namePlural
            ],
            summary: `Restore One ${item.nameSingular}`,
            operationId: `restoreOne${(0, _utils.capitalize)(item.nameSingular)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/idPath'
                },
                {
                    $ref: '#/components/parameters/depth'
                }
            ],
            responses: {
                '200': (0, _responsesutils.getRestoreOneResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        }
    };
};
const computeRestoreManyResultPath = (item, _flatObjectMetadataMaps, _flatFieldMetadataMaps)=>{
    return {
        patch: {
            tags: [
                item.namePlural
            ],
            summary: `Restore Many ${item.namePlural}`,
            operationId: `restoreMany${(0, _utils.capitalize)(item.namePlural)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/filter'
                },
                {
                    $ref: '#/components/parameters/depth'
                }
            ],
            responses: {
                '200': (0, _responsesutils.getRestoreManyResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        }
    };
};
const computeMergeManyResultPath = (item, _flatObjectMetadataMaps, _flatFieldMetadataMaps)=>{
    return {
        patch: {
            tags: [
                item.namePlural
            ],
            summary: `Merge Many ${item.namePlural}`,
            operationId: `mergeMany${(0, _utils.capitalize)(item.namePlural)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/depth'
                }
            ],
            requestBody: (0, _requestbodyutils.getMergeManyRequestBody)(),
            responses: {
                '200': (0, _responsesutils.getMergeManyResponse200)(item),
                '400': {
                    $ref: '#/components/responses/400'
                },
                '401': {
                    $ref: '#/components/responses/401'
                }
            }
        }
    };
};
const computeGroupByResultPath = (item, _flatObjectMetadataMaps, _flatFieldMetadataMaps)=>{
    return {
        get: {
            tags: [
                item.namePlural
            ],
            summary: `Group By ${item.namePlural}`,
            description: `Groups **${item.namePlural}** by specified fields and optionally computes aggregate values for each group.`,
            operationId: `groupBy${(0, _utils.capitalize)(item.namePlural)}`,
            parameters: [
                {
                    $ref: '#/components/parameters/groupBy'
                },
                {
                    $ref: '#/components/parameters/filter'
                },
                {
                    $ref: '#/components/parameters/orderBy'
                },
                {
                    $ref: '#/components/parameters/limit'
                },
                {
                    $ref: '#/components/parameters/viewId'
                },
                {
                    $ref: '#/components/parameters/aggregate'
                },
                {
                    $ref: '#/components/parameters/includeRecordsSample'
                },
                {
                    $ref: '#/components/parameters/orderByForRecords'
                }
            ],
            responses: {
                '200': (0, _responsesutils.getGroupByResponse200)(item)
            }
        }
    };
};

//# sourceMappingURL=path.utils.js.map