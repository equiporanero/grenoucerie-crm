"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistUpdateOnePreQueryHook", {
    enumerable: true,
    get: function() {
        return BlocklistUpdateOnePreQueryHook;
    }
});
const _commonqueryrunnerexception = require("../../../engine/api/common/common-query-runners/errors/common-query-runner.exception");
const _workspacequeryhookdecorator = require("../../../engine/api/graphql/workspace-query-runner/workspace-query-hook/decorators/workspace-query-hook.decorator");
const _isuserauthcontextguard = require("../../../engine/core-modules/auth/guards/is-user-auth-context.guard");
const _blocklistvalidationservice = require("../blocklist-validation-manager/services/blocklist-validation.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BlocklistUpdateOnePreQueryHook = class BlocklistUpdateOnePreQueryHook {
    async execute(authContext, _objectName, payload) {
        if (!(0, _isuserauthcontextguard.isUserAuthContext)(authContext)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException('User id is required', _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_AUTH_CONTEXT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "NJT8W8",
                    message: "User id is required."
                }
            });
        }
        const workspace = authContext.workspace;
        await this.blocklistValidationService.validateBlocklistForUpdateOne(payload, authContext.user.id, workspace.id);
        return payload;
    }
    constructor(blocklistValidationService){
        this.blocklistValidationService = blocklistValidationService;
    }
};
BlocklistUpdateOnePreQueryHook = _ts_decorate([
    (0, _workspacequeryhookdecorator.WorkspaceQueryHook)(`blocklist.updateOne`),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _blocklistvalidationservice.BlocklistValidationService === "undefined" ? Object : _blocklistvalidationservice.BlocklistValidationService
    ])
], BlocklistUpdateOnePreQueryHook);

//# sourceMappingURL=blocklist-update-one.pre-query.hook.js.map