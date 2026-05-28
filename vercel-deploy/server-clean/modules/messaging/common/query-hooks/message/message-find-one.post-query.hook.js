"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageFindOnePostQueryHook", {
    enumerable: true,
    get: function() {
        return MessageFindOnePostQueryHook;
    }
});
const _workspacequeryhookdecorator = require("../../../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
const _workspacequeryhooktype = require("../../../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/types/workspace-query-hook.type");
const _isuserauthcontextguard = require("../../../../../engine/core-modules/auth/guards/is-user-auth-context.guard");
const _graphqlerrorsutil = require("../../../../../engine/core-modules/graphql/utils/graphql-errors.util");
const _applymessagesvisibilityrestrictionsservice = require("./apply-messages-visibility-restrictions.service");
const _isapikeyauthcontextguard = require("../../../../../engine/core-modules/auth/guards/is-api-key-auth-context.guard");
const _isapplicationauthcontextguard = require("../../../../../engine/core-modules/auth/guards/is-application-auth-context.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessageFindOnePostQueryHook = class MessageFindOnePostQueryHook {
    async execute(authContext, _objectName, payload) {
        // TODO: this check should be removed
        if (!(0, _isuserauthcontextguard.isUserAuthContext)(authContext) && !(0, _isapikeyauthcontextguard.isApiKeyAuthContext)(authContext) && !(0, _isapplicationauthcontextguard.isApplicationAuthContext)(authContext)) {
            throw new _graphqlerrorsutil.ForbiddenError('Authentication error, auth context should be user, apiKey or application');
        }
        const workspace = authContext.workspace;
        if (!workspace) {
            throw new _graphqlerrorsutil.ForbiddenError('Workspace is required');
        }
        const userId = (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.user.id : undefined;
        await this.applyMessagesVisibilityRestrictionsService.applyMessagesVisibilityRestrictions(payload, workspace.id, userId);
    }
    constructor(applyMessagesVisibilityRestrictionsService){
        this.applyMessagesVisibilityRestrictionsService = applyMessagesVisibilityRestrictionsService;
    }
};
MessageFindOnePostQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)({
        key: `message.findOne`,
        type: _workspacequeryhooktype.WorkspaceQueryHookType.POST_HOOK
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applymessagesvisibilityrestrictionsservice.ApplyMessagesVisibilityRestrictionsService === "undefined" ? Object : _applymessagesvisibilityrestrictionsservice.ApplyMessagesVisibilityRestrictionsService
    ])
], MessageFindOnePostQueryHook);

//# sourceMappingURL=message-find-one.post-query.hook.js.map