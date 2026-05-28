"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyTypeOptionsForOutputType", {
    enumerable: true,
    get: function() {
        return applyTypeOptionsForOutputType;
    }
});
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _wraptypeingraphqllistutil = require("./wrap-type-in-graphql-list.util");
const applyTypeOptionsForOutputType = (typeRef, options)=>{
    let graphqlType = typeRef;
    if (options.isArray) {
        graphqlType = (0, _wraptypeingraphqllistutil.wrapTypeInGraphQLList)(graphqlType, options.arrayDepth ?? 1, options.nullable ?? false);
    }
    if (options.nullable === false && !(0, _utils.isDefined)(options.defaultValue)) {
        graphqlType = new _graphql.GraphQLNonNull(graphqlType);
    }
    return graphqlType;
};

//# sourceMappingURL=apply-type-options-for-output-type.util.js.map