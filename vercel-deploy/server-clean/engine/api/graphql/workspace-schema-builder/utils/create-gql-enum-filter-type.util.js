"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createGqlEnumFilterType", {
    enumerable: true,
    get: function() {
        return createGqlEnumFilterType;
    }
});
const _graphql = require("graphql");
const _filterisinputtype = require("../graphql-types/input/filter-is.input-type");
const createGqlEnumFilterType = (enumType)=>{
    return new _graphql.GraphQLInputObjectType({
        name: `${enumType.name}Filter`,
        fields: ()=>({
                eq: {
                    type: enumType
                },
                neq: {
                    type: enumType
                },
                in: {
                    type: new _graphql.GraphQLList(enumType)
                },
                containsAny: {
                    type: new _graphql.GraphQLList(enumType)
                },
                is: {
                    type: _filterisinputtype.FilterIs
                },
                isEmptyArray: {
                    type: _graphql.GraphQLBoolean
                }
            })
    });
};

//# sourceMappingURL=create-gql-enum-filter-type.util.js.map