"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InjectWorkspaceScopedRepository", {
    enumerable: true,
    get: function() {
        return InjectWorkspaceScopedRepository;
    }
});
const _common = require("@nestjs/common");
const _getworkspacescopedrepositorytokenutil = require("./get-workspace-scoped-repository-token.util");
const InjectWorkspaceScopedRepository = (entity)=>(0, _common.Inject)((0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(entity));

//# sourceMappingURL=inject-workspace-scoped-repository.decorator.js.map