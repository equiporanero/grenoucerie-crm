"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceAuthContextMiddleware", {
    enumerable: true,
    get: function() {
        return WorkspaceAuthContextMiddleware;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _authexception = require("../auth.exception");
const _workspaceauthcontextstorage = require("../storage/workspace-auth-context.storage");
const _buildapikeyauthcontextutil = require("../utils/build-api-key-auth-context.util");
const _buildapplicationauthcontextutil = require("../utils/build-application-auth-context.util");
const _buildpendingactivationuserauthcontextutil = require("../utils/build-pending-activation-user-auth-context.util");
const _builduserauthcontextutil = require("../utils/build-user-auth-context.util");
const _applyworkspacesentrycontextutil = require("../../sentry/utils/apply-workspace-sentry-context.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceAuthContextMiddleware = class WorkspaceAuthContextMiddleware {
    use(req, _res, next) {
        if (!(0, _utils.isDefined)(req.workspace)) {
            next();
            return;
        }
        const authContext = this.buildAuthContext(req);
        (0, _applyworkspacesentrycontextutil.applyWorkspaceSentryContext)(authContext);
        void (0, _workspaceauthcontextstorage.withWorkspaceAuthContext)(authContext, ()=>{
            next();
        });
    }
    buildAuthContext(req) {
        if ((0, _utils.isDefined)(req.apiKey)) {
            return (0, _buildapikeyauthcontextutil.buildApiKeyAuthContext)({
                workspace: req.workspace,
                apiKey: req.apiKey
            });
        }
        if ((0, _utils.isDefined)(req.userWorkspaceId) && (0, _utils.isDefined)(req.workspaceMemberId) && (0, _utils.isDefined)(req.workspaceMember) && (0, _utils.isDefined)(req.user)) {
            return (0, _builduserauthcontextutil.buildUserAuthContext)({
                workspace: req.workspace,
                userWorkspaceId: req.userWorkspaceId,
                user: req.user,
                workspaceMemberId: req.workspaceMemberId,
                workspaceMember: req.workspaceMember
            });
        }
        if ((0, _utils.isDefined)(req.application)) {
            return (0, _buildapplicationauthcontextutil.buildApplicationAuthContext)({
                workspace: req.workspace,
                application: req.application
            });
        }
        if ((0, _utils.isDefined)(req.userWorkspaceId) && (0, _utils.isDefined)(req.user)) {
            return (0, _buildpendingactivationuserauthcontextutil.buildPendingActivationUserAuthContext)({
                workspace: req.workspace,
                userWorkspaceId: req.userWorkspaceId,
                user: req.user
            });
        }
        throw new _authexception.AuthException('No authentication context found', _authexception.AuthExceptionCode.UNAUTHENTICATED);
    }
};
WorkspaceAuthContextMiddleware = _ts_decorate([
    (0, _common.Injectable)()
], WorkspaceAuthContextMiddleware);

//# sourceMappingURL=workspace-auth-context.middleware.js.map