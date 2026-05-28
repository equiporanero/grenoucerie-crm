"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workspaceAutoResolverOpts", {
    enumerable: true,
    get: function() {
        return workspaceAutoResolverOpts;
    }
});
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _updateworkspaceinput = require("./dtos/update-workspace-input");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _workspaceentity = require("./workspace.entity");
const workspaceAutoResolverOpts = [
    {
        EntityClass: _workspaceentity.WorkspaceEntity,
        DTOClass: _workspaceentity.WorkspaceEntity,
        UpdateDTOClass: _updateworkspaceinput.UpdateWorkspaceInput,
        enableTotalCount: true,
        pagingStrategy: _nestjsquerygraphql.PagingStrategies.CURSOR,
        read: {
            many: {
                disabled: true
            },
            one: {
                disabled: true
            }
        },
        create: {
            many: {
                disabled: true
            },
            one: {
                disabled: true
            }
        },
        update: {
            one: {
                disabled: true
            },
            many: {
                disabled: true
            }
        },
        delete: {
            many: {
                disabled: true
            },
            one: {
                disabled: true
            }
        },
        guards: [
            _workspaceauthguard.WorkspaceAuthGuard
        ]
    }
];

//# sourceMappingURL=workspace.auto-resolver-opts.js.map