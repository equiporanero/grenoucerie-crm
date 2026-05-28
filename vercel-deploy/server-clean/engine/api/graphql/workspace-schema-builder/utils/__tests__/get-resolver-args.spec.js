"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphql = require("graphql");
const _gqlinputtypedefinitionkindenum = require("../../enums/gql-input-type-definition-kind.enum");
const _scalars = require("../../graphql-types/scalars");
const _getresolverargsutil = require("../get-resolver-args.util");
describe('getResolverArgs', ()=>{
    const expectedOutputs = {
        findMany: {
            first: {
                type: _graphql.GraphQLInt,
                isNullable: true
            },
            last: {
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
            },
            offset: {
                type: _graphql.GraphQLInt,
                isNullable: true
            }
        },
        findOne: {
            filter: {
                kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                isNullable: false
            }
        },
        createMany: {
            data: {
                kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Create,
                isNullable: false,
                isArray: true
            },
            upsert: {
                isArray: false,
                isNullable: true,
                type: _graphql.GraphQLBoolean
            }
        },
        createOne: {
            data: {
                kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Create,
                isNullable: false
            },
            upsert: {
                isArray: false,
                isNullable: true,
                type: _graphql.GraphQLBoolean
            }
        },
        updateOne: {
            id: {
                type: _scalars.UUIDScalarType,
                isNullable: false
            },
            data: {
                kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Update,
                isNullable: false
            }
        },
        deleteOne: {
            id: {
                type: _scalars.UUIDScalarType,
                isNullable: false
            }
        },
        restoreMany: {
            filter: {
                kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                isNullable: false
            }
        },
        destroyMany: {
            filter: {
                kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                isNullable: false
            }
        }
    };
    // Test each resolver type
    Object.entries(expectedOutputs).forEach(([resolverType, expectedOutput])=>{
        it(`should return correct args for ${resolverType} resolver`, ()=>{
            expect((0, _getresolverargsutil.getResolverArgs)(resolverType)).toEqual(expectedOutput);
        });
    });
    // Test for an unknown resolver type
    it('should throw an error for an unknown resolver type', ()=>{
        const unknownType = 'unknownType';
        expect(()=>(0, _getresolverargsutil.getResolverArgs)(unknownType)).toThrow(`Unknown resolver type: ${unknownType}`);
    });
});

//# sourceMappingURL=get-resolver-args.spec.js.map