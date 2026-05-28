"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminResolver", {
    enumerable: true,
    get: function() {
        return AdminResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _resolverschemascopekeyconstant = require("../constants/resolver-schema-scope-key.constant");
const AdminResolver = (typeFunc)=>(0, _common.applyDecorators)(typeFunc ? (0, _graphql.Resolver)(typeFunc) : (0, _graphql.Resolver)(), (0, _common.SetMetadata)(_resolverschemascopekeyconstant.RESOLVER_SCHEMA_SCOPE_KEY, 'admin'));

//# sourceMappingURL=admin-resolver.decorator.js.map