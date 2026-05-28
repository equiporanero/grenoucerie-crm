"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getWorkspaceScopedRepositoryToken", {
    enumerable: true,
    get: function() {
        return getWorkspaceScopedRepositoryToken;
    }
});
const getEntityName = (entity)=>{
    if (typeof entity === 'function') {
        return entity.name;
    }
    return entity.options?.name ?? entity.constructor.name;
};
const getWorkspaceScopedRepositoryToken = (entity)=>`WorkspaceScopedRepository<${getEntityName(entity)}>`;

//# sourceMappingURL=get-workspace-scoped-repository-token.util.js.map