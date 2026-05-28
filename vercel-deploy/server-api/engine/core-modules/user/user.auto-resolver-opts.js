"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userAutoResolverOpts", {
    enumerable: true,
    get: function() {
        return userAutoResolverOpts;
    }
});
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _userentity = require("./user.entity");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const userAutoResolverOpts = [
    {
        EntityClass: _userentity.UserEntity,
        DTOClass: _userentity.UserEntity,
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
            many: {
                disabled: true
            },
            one: {
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

//# sourceMappingURL=user.auto-resolver-opts.js.map