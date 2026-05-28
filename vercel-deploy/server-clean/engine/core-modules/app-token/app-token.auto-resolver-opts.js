"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "appTokenAutoResolverOpts", {
    enumerable: true,
    get: function() {
        return appTokenAutoResolverOpts;
    }
});
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _apptokenentity = require("./app-token.entity");
const _createapptokeninput = require("./dtos/create-app-token.input");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const appTokenAutoResolverOpts = [
    {
        EntityClass: _apptokenentity.AppTokenEntity,
        DTOClass: _apptokenentity.AppTokenEntity,
        CreateDTOClass: _createapptokeninput.CreateAppTokenInput,
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

//# sourceMappingURL=app-token.auto-resolver-opts.js.map