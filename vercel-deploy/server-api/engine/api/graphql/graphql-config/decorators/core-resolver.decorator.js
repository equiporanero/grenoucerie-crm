"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoreResolver", {
    enumerable: true,
    get: function() {
        return CoreResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _resolverschemascopekeyconstant = require("../constants/resolver-schema-scope-key.constant");
const CoreResolver = (typeFunc)=>(0, _common.applyDecorators)(typeFunc ? (0, _graphql.Resolver)(typeFunc) : (0, _graphql.Resolver)(), (0, _common.SetMetadata)(_resolverschemascopekeyconstant.RESOLVER_SCHEMA_SCOPE_KEY, 'core'));

//# sourceMappingURL=core-resolver.decorator.js.map