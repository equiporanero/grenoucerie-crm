"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataResolver", {
    enumerable: true,
    get: function() {
        return MetadataResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _resolverschemascopekeyconstant = require("../constants/resolver-schema-scope-key.constant");
const MetadataResolver = (typeFunc)=>(0, _common.applyDecorators)(typeFunc ? (0, _graphql.Resolver)(typeFunc) : (0, _graphql.Resolver)(), (0, _common.SetMetadata)(_resolverschemascopekeyconstant.RESOLVER_SCHEMA_SCOPE_KEY, 'metadata'));

//# sourceMappingURL=metadata-resolver.decorator.js.map