"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilesInputType", {
    enumerable: true,
    get: function() {
        return FilesInputType;
    }
});
const _graphql = require("graphql");
const _scalars = require("../scalars");
const FileItemInputType = new _graphql.GraphQLInputObjectType({
    name: 'FileItemInput',
    fields: {
        fileId: {
            type: new _graphql.GraphQLNonNull(_scalars.UUIDScalarType)
        },
        label: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
        }
    }
});
const FilesInputType = new _graphql.GraphQLList(FileItemInputType);

//# sourceMappingURL=files.input-type.js.map