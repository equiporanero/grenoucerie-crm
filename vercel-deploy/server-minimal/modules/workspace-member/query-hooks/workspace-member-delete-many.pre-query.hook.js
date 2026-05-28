"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMemberDeleteManyPreQueryHook", {
    enumerable: true,
    get: function() {
        return WorkspaceMemberDeleteManyPreQueryHook;
    }
});
const _commonqueryrunnerexception = require("../../../engine/api/common/common-query-runners/errors/common-query-runner.exception");
const _workspacequeryhookdecorator = require("../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMemberDeleteManyPreQueryHook = class WorkspaceMemberDeleteManyPreQueryHook {
    async execute(_authContext) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException('Please use /deleteUserFromWorkspace to remove a workspace member.', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.BAD_REQUEST, {
            userFriendlyMessage: /*i18n*/ {
                id: "Sguqn/",
                message: "Please use Settings to remove a workspace member."
            }
        });
    }
    constructor(){}
};
WorkspaceMemberDeleteManyPreQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)(`workspaceMember.deleteMany`),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], WorkspaceMemberDeleteManyPreQueryHook);

//# sourceMappingURL=workspace-member-delete-many.pre-query.hook.js.map