"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "provideWorkspaceScopedRepository", {
    enumerable: true,
    get: function() {
        return provideWorkspaceScopedRepository;
    }
});
const _typeorm = require("@nestjs/typeorm");
const _getworkspacescopedrepositorytokenutil = require("./get-workspace-scoped-repository-token.util");
const _workspacescopedrepository = require("./workspace-scoped-repository");
const provideWorkspaceScopedRepository = (entity)=>({
        provide: (0, _getworkspacescopedrepositorytokenutil.getWorkspaceScopedRepositoryToken)(entity),
        useFactory: (repository)=>new _workspacescopedrepository.WorkspaceScopedRepository(repository),
        inject: [
            (0, _typeorm.getRepositoryToken)(entity)
        ]
    });

//# sourceMappingURL=provide-workspace-scoped-repository.js.map