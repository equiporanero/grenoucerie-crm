"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getResolverArgs", {
    enumerable: true,
    get: function() {
        return getResolverArgs;
    }
});
const _graphql = require("graphql");
const _gqlinputtypedefinitionkindenum = require("../enums/gql-input-type-definition-kind.enum");
const _scalars = require("../graphql-types/scalars");
const getResolverArgs = (type)=>{
    switch(type){
        case 'findMany':
            return {
                first: {
                    type: _graphql.GraphQLInt,
                    isNullable: true
                },
                last: {
                    type: _graphql.GraphQLInt,
                    isNullable: true
                },
                offset: {
                    type: _graphql.GraphQLInt,
                    isNullable: true
                },
                before: {
                    type: _graphql.GraphQLString,
                    isNullable: true
                },
                after: {
                    type: _graphql.GraphQLString,
                    isNullable: true
                },
                filter: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                    isNullable: true
                },
                orderBy: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderBy,
                    isNullable: true,
                    isArray: true
                }
            };
        case 'findOne':
        case 'deleteMany':
            return {
                filter: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                    isNullable: false
                }
            };
        case 'createMany':
            return {
                data: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Create,
                    isNullable: false,
                    isArray: true
                },
                upsert: {
                    type: _graphql.GraphQLBoolean,
                    isNullable: true,
                    isArray: false
                }
            };
        case 'createOne':
            return {
                data: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Create,
                    isNullable: false
                },
                upsert: {
                    type: _graphql.GraphQLBoolean,
                    isNullable: true,
                    isArray: false
                }
            };
        case 'updateOne':
            return {
                id: {
                    type: _scalars.UUIDScalarType,
                    isNullable: false
                },
                data: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Update,
                    isNullable: false
                }
            };
        case 'findDuplicates':
            return {
                ids: {
                    type: _scalars.UUIDScalarType,
                    isNullable: true,
                    isArray: true
                },
                data: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Create,
                    isNullable: true,
                    isArray: true
                }
            };
        case 'deleteOne':
            return {
                id: {
                    type: _scalars.UUIDScalarType,
                    isNullable: false
                }
            };
        case 'destroyOne':
            return {
                id: {
                    type: _scalars.UUIDScalarType,
                    isNullable: false
                }
            };
        case 'updateMany':
            return {
                data: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Update,
                    isNullable: false
                },
                filter: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                    isNullable: false
                }
            };
        case 'restoreMany':
            return {
                filter: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                    isNullable: false
                }
            };
        case 'restoreOne':
            return {
                id: {
                    type: _scalars.UUIDScalarType,
                    isNullable: false
                }
            };
        case 'destroyMany':
            return {
                filter: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                    isNullable: false
                }
            };
        case 'mergeMany':
            return {
                ids: {
                    type: _scalars.UUIDScalarType,
                    isNullable: false,
                    isArray: true
                },
                conflictPriorityIndex: {
                    type: _graphql.GraphQLInt,
                    isNullable: false
                },
                dryRun: {
                    type: _graphql.GraphQLBoolean,
                    isNullable: true
                }
            };
        case 'groupBy':
            return {
                groupBy: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.GroupBy,
                    isNullable: false,
                    isArray: true
                },
                filter: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                    isNullable: true
                },
                orderBy: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderByWithGroupBy,
                    isNullable: true,
                    isArray: true
                },
                orderByForRecords: {
                    kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderBy,
                    isNullable: true,
                    isArray: true
                },
                viewId: {
                    type: _scalars.UUIDScalarType,
                    isNullable: true
                },
                limit: {
                    type: _graphql.GraphQLInt,
                    isNullable: true
                },
                offsetForRecords: {
                    type: _graphql.GraphQLInt,
                    isNullable: true
                }
            };
        default:
            throw new Error(`Unknown resolver type: ${type}`);
    }
};

//# sourceMappingURL=get-resolver-args.util.js.map