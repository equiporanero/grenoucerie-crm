"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilesObjectType", {
    enumerable: true,
    get: function() {
        return FilesObjectType;
    }
});
const _graphql = require("graphql");
const _scalars = require("../scalars");
const FileObjectType = new _graphql.GraphQLObjectType({
    name: 'FileObject',
    fields: {
        fileId: {
            type: new _graphql.GraphQLNonNull(_scalars.UUIDScalarType)
        },
        label: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
        },
        extension: {
            type: _graphql.GraphQLString
        },
        url: {
            type: _graphql.GraphQLString
        }
    }
});
const FilesObjectType = new _graphql.GraphQLList(FileObjectType);

//# sourceMappingURL=files.object-type.js.map